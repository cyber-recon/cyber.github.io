#!/usr/bin/env python3
"""One-shot builder for the baked Lantern snapshot. Not part of the app runtime."""
import html
import json
import re
import ssl
import urllib.request
from collections import Counter
from datetime import datetime, timedelta, timezone
from xml.etree import ElementTree as ET

UA = {"User-Agent": "LanternThreatFloor/1.0", "Accept": "*/*"}
CTX = ssl.create_default_context()
CVE_RE = re.compile(r"CVE-\d{4}-\d{4,7}", re.I)
SEV_MAP = {
    "critical": "CRITICAL",
    "important": "HIGH",
    "high": "HIGH",
    "moderate": "MEDIUM",
    "medium": "MEDIUM",
    "low": "LOW",
}


def get(url, timeout=45):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=timeout, context=CTX) as response:
        return response.read()


def iso(value):
    if not value:
        return None
    text = value.strip()
    if re.match(r"^\d{4}-\d{2}-\d{2}$", text):
        return text + "T00:00:00Z"
    try:
        dt = datetime.fromisoformat(text.replace("Z", "+00:00"))
        return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    except ValueError:
        pass
    for fmt in ("%a, %d %b %Y %H:%M:%S %z", "%a, %d %b %Y %H:%M:%S"):
        try:
            dt = datetime.strptime(text[:31].strip(), fmt)
            if dt.tzinfo is None:
                dt = dt.replace(tzinfo=timezone.utc)
            return dt.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        except ValueError:
            continue
    return None


def sev_of(text):
    if not text:
        return "UNKNOWN"
    match = re.search(
        r"severity\s*[:=]\s*(critical|high|important|medium|moderate|low)",
        text,
        re.I,
    )
    if match:
        return SEV_MAP[match.group(1).lower()]
    return "UNKNOWN"


def score_sev(score):
    if score is None:
        return None
    if score >= 9:
        return "CRITICAL"
    if score >= 7:
        return "HIGH"
    if score >= 4:
        return "MEDIUM"
    if score > 0:
        return "LOW"
    return "UNKNOWN"


def strip_html(value):
    text = re.sub(r"<[^>]+>", " ", value or "")
    text = html.unescape(text)
    text = re.sub(r"\s+", " ", text).strip()
    return text[:700]


vulns = {}


def ensure(cve_id):
    cve_id = cve_id.upper()
    if cve_id not in vulns:
        vulns[cve_id] = {
            "id": cve_id,
            "title": cve_id,
            "summary": "",
            "severity": "UNKNOWN",
            "cvss": None,
            "vector": None,
            "published": None,
            "modified": None,
            "sources": [],
            "vendor": None,
            "product": None,
            "cwe": None,
            "kev": None,
            "redhat": None,
            "epss": None,
            "epssPercentile": None,
            "references": [],
        }
    return vulns[cve_id]


def add_source(vuln, source):
    if source not in vuln["sources"]:
        vuln["sources"].append(source)


def add_ref(vuln, href, label, source):
    if not href:
        return
    if any(ref["href"] == href for ref in vuln["references"]):
        return
    if len(vuln["references"]) >= 8:
        return
    vuln["references"].append({"href": href, "label": label[:140], "source": source})


def prefer_sev(old, new):
    rank = {"UNKNOWN": 0, "LOW": 1, "MEDIUM": 2, "HIGH": 3, "CRITICAL": 4}
    return new if rank.get(new, 0) >= rank.get(old, 0) else old


raw = json.loads(
    get("https://cdn.jsdelivr.net/gh/cisagov/kev-data@develop/known_exploited_vulnerabilities.json")
)
catalog = raw.get("catalogVersion")
kev_count = raw.get("count")
cut = (datetime.now(timezone.utc).date() - timedelta(days=160)).isoformat()
kev_kept = 0
for item in raw.get("vulnerabilities", []):
    if item.get("dateAdded", "") < cut:
        continue
    vuln = ensure(item["cveID"])
    add_source(vuln, "cisa-kev")
    vuln["title"] = item.get("vulnerabilityName") or vuln["title"]
    vuln["summary"] = item.get("shortDescription") or vuln["summary"]
    vuln["vendor"] = item.get("vendorProject")
    vuln["product"] = item.get("product")
    vuln["published"] = vuln["published"] or iso(item.get("dateAdded"))
    vuln["kev"] = {
        "name": item.get("vulnerabilityName") or "",
        "dateAdded": item.get("dateAdded") or "",
        "dueDate": item.get("dueDate") or "",
        "ransomware": item.get("knownRansomwareCampaignUse") or "Unknown",
        "requiredAction": (item.get("requiredAction") or "")[:500],
        "notes": (item.get("notes") or "")[:400],
    }
    add_ref(
        vuln,
        "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
        "CISA KEV catalog",
        "cisa-kev",
    )
    kev_kept += 1
print("kev kept", kev_kept, "catalog", catalog, "total", kev_count)

rh = json.loads(get("https://access.redhat.com/hydra/rest/securitydata/cve.json?per_page=40"))
print("rh", len(rh))
for item in rh:
    cve_id = item.get("CVE")
    if not cve_id:
        continue
    vuln = ensure(cve_id)
    add_source(vuln, "redhat")
    desc = item.get("bugzilla_description") or ""
    if desc and (vuln["title"] == vuln["id"] or len(desc) > len(vuln["title"])):
        vuln["title"] = desc[:180]
    sev = SEV_MAP.get((item.get("severity") or "").lower(), "UNKNOWN")
    vuln["severity"] = prefer_sev(vuln["severity"], sev)
    score = item.get("cvss3_score")
    try:
        score = float(score) if score is not None else None
    except (TypeError, ValueError):
        score = None
    if score is not None and vuln["cvss"] is None:
        vuln["cvss"] = score
        vuln["vector"] = item.get("cvss3_scoring_vector")
        scored = score_sev(score)
        if scored:
            vuln["severity"] = prefer_sev(vuln["severity"], scored)
    vuln["published"] = vuln["published"] or iso(item.get("public_date"))
    vuln["cwe"] = vuln["cwe"] or item.get("CWE")
    packages = item.get("affected_packages") or []
    names = []
    if isinstance(packages, list):
        names = [p if isinstance(p, str) else str(p) for p in packages][:8]
    vuln["redhat"] = {
        "severity": item.get("severity") or "",
        "bugzilla": str(item.get("bugzilla") or "") or None,
        "statement": None,
        "packages": names,
    }
    if item.get("resource_url"):
        add_ref(vuln, item["resource_url"], "Red Hat CVE", "redhat")
    if item.get("bugzilla"):
        add_ref(
            vuln,
            f"https://bugzilla.redhat.com/show_bug.cgi?id={item['bugzilla']}",
            "Red Hat Bugzilla",
            "redhat",
        )

end = datetime.now(timezone.utc)
start = end - timedelta(days=6)

def nvd_fmt(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%S.000")

base = (
    "https://services.nvd.nist.gov/rest/json/cves/2.0"
    f"?pubStartDate={nvd_fmt(start)}&pubEndDate={nvd_fmt(end)}&resultsPerPage=40"
)
nvd = json.loads(get(base, timeout=70))
total = nvd.get("totalResults", 0)
print("nvd total", total)
if total > 40:
    nvd = json.loads(get(base + f"&startIndex={max(0, total - 40)}", timeout=70))

ssvc_sample = None
for wrap in nvd.get("vulnerabilities") or []:
    cve = wrap["cve"]
    vuln = ensure(cve["id"])
    add_source(vuln, "nvd")
    descriptions = cve.get("descriptions") or []
    english = next((d.get("value") for d in descriptions if d.get("lang") == "en"), "")
    if english:
        vuln["summary"] = english[:700]
        if vuln["title"] == vuln["id"]:
            vuln["title"] = english.split(". ")[0][:180]
    vuln["published"] = iso(cve.get("published")) or vuln["published"]
    vuln["modified"] = iso(cve.get("lastModified")) or vuln["modified"]
    metrics = cve.get("metrics") or {}
    if ssvc_sample is None and metrics.get("ssvcV203"):
        ssvc_sample = metrics["ssvcV203"]
    chosen = None
    for key in ("cvssMetricV31", "cvssMetricV40", "cvssMetricV30"):
        arr = metrics.get(key) or []
        if not arr:
            continue
        chosen = next((m for m in arr if m.get("type") == "Primary"), arr[0])
        break
    if chosen:
        data = chosen.get("cvssData") or {}
        vuln["cvss"] = data.get("baseScore")
        vuln["vector"] = data.get("vectorString")
        sev = (data.get("baseSeverity") or "").upper()
        if sev in ("CRITICAL", "HIGH", "MEDIUM", "LOW"):
            vuln["severity"] = sev
    weaknesses = cve.get("weaknesses") or []
    if weaknesses and not vuln["cwe"]:
        ds = weaknesses[0].get("description") or []
        vuln["cwe"] = next((d.get("value") for d in ds if d.get("lang") == "en"), None)
    for ref in (cve.get("references") or [])[:6]:
        add_ref(vuln, ref.get("url"), (ref.get("url") or "Reference")[:140], "nvd")
    if not vuln["vendor"]:
        for block in cve.get("configurations") or []:
            for node in block.get("nodes") or []:
                for match in node.get("cpeMatch") or []:
                    parts = (match.get("criteria") or "").split(":")
                    if len(parts) > 4:
                        vuln["vendor"] = parts[3]
                        vuln["product"] = parts[4]
                        break
print("ssvc", json.dumps(ssvc_sample)[:600] if ssvc_sample else None)

advisories = []


def rss_items(xml_bytes, source, limit=18):
    root = ET.fromstring(xml_bytes)
    found = []
    for item in root.iter("item"):
        title = (item.findtext("title") or "").strip()
        link = (item.findtext("link") or "").strip()
        pub = item.findtext("pubDate") or ""
        desc = strip_html(item.findtext("description") or "")
        cves = []
        for cve_id in CVE_RE.findall(title + " " + desc):
            upper = cve_id.upper()
            if upper not in cves:
                cves.append(upper)
        found.append(
            {
                "title": title,
                "href": link,
                "published": iso(pub),
                "summary": desc,
                "cves": cves[:8],
                "source": source,
            }
        )
        if len(found) >= limit:
            break
    return found


def absorb(items):
    for item in items:
        advisories.append(
            {
                "id": f"{item['source']}:{item['href'] or item['title'][:80]}",
                "source": item["source"],
                "title": item["title"][:220],
                "href": item["href"],
                "published": item["published"],
                "summary": item["summary"],
                "cves": item["cves"],
            }
        )
        title_cves = [c.upper() for c in CVE_RE.findall(item["title"])]
        use = title_cves or (item["cves"] if len(item["cves"]) <= 2 else [])
        for cve_id in use:
            vuln = ensure(cve_id)
            add_source(vuln, item["source"])
            if vuln["title"] == vuln["id"]:
                vuln["title"] = item["title"][:180]
            if not vuln["summary"]:
                vuln["summary"] = item["summary"]
            if not vuln["published"]:
                vuln["published"] = item["published"]
            sev = sev_of(item["title"])
            if sev != "UNKNOWN":
                vuln["severity"] = prefer_sev(vuln["severity"], sev)
            add_ref(vuln, item["href"], item["title"][:120] or item["source"], item["source"])


for label, url, source, limit in (
    ("cisco", "https://sec.cloudapps.cisco.com/security/center/psirtrss20/CiscoSecurityAdvisory.xml", "cisco", 18),
    ("palo", "https://security.paloaltonetworks.com/rss.xml", "paloalto", 18),
    ("unit42", "https://unit42.paloaltonetworks.com/feed/", "unit42", 12),
):
    try:
        absorb(rss_items(get(url, timeout=30), source, limit))
        print(label, "ok", sum(1 for a in advisories if a["source"] == source))
    except Exception as exc:
        print(label, "fail", exc)

nsa_seed = [
    ("CSI: Post-quantum questions to ask your vendors", "2026-11-04"),
    ("Key Practices for Incident Readiness and Response in Super Intelligence Training and Evaluation", "2026-10-16"),
    ("CSI: Commercial National Security Algorithm Suite 2.0 and Quantum Computing FAQ", "2026-10-13"),
    ("CSI: Hardening DoW Critical OT Environments With ZT Principles", "2026-10-08"),
    ("CSA: Chinese Government-linked Cyber Threat Actors Combine Automated and Hands-on Hacking Tools", "2026-10-08"),
    ("CSA: China-Based Artificial Intelligence Companies Conducting Industrial-Scale Distillation Campaigns", "2026-09-08"),
    ("Joint CSA: China-Linked Hacking Group QTFY Targets Military and Critical Infrastructure", "2026-08-26"),
    ("CSA: Defending Against an Active Threat to Siemens S7 Series PLCs", "2026-08-19"),
    ("Joint CSA: #StopRansomware: Gunra", "2026-08-10"),
    ("Joint CSA: Iranian-Affiliated Cyber Actors Exploit PLCs Across US Critical Infrastructure", "2026-07-22"),
]
for title, day in nsa_seed:
    advisories.append(
        {
            "id": "nsa:" + title[:90],
            "source": "nsa",
            "title": title,
            "href": "https://www.nsa.gov/cybersecurity-guidance/",
            "published": day + "T00:00:00Z",
            "summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
            "cves": [],
        }
    )


def rank(vuln):
    pri = 0 if vuln["kev"] else 2
    if vuln["severity"] == "CRITICAL":
        pri -= 1
    published = (vuln["published"] or "0").replace("-", "")[:8]
    return (pri, -int(published or 0))


ids = [vuln["id"] for vuln in sorted(vulns.values(), key=rank)][:80]
epss_hits = 0
for index in range(0, len(ids), 40):
    chunk = ids[index : index + 40]
    data = json.loads(get("https://api.first.org/data/v1/epss?cve=" + ",".join(chunk), timeout=30))
    for row in data.get("data") or []:
        vuln = vulns.get(row["cve"].upper())
        if not vuln:
            continue
        vuln["epss"] = float(row["epss"])
        vuln["epssPercentile"] = float(row["percentile"])
        epss_hits += 1

snap = {
    "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
    "kevCatalog": catalog,
    "kevCount": kev_count,
    "vulns": list(vulns.values()),
    "advisories": advisories,
}
payload = json.dumps(snap)
with open("/workspace/src/data/snapshot.json", "w", encoding="utf-8") as handle:
    handle.write(payload)
print("bytes", len(payload), "vulns", len(vulns), "ads", len(advisories), "epss", epss_hits)
print(Counter(v["severity"] for v in vulns.values()))
print("with kev", sum(1 for v in vulns.values() if v["kev"]))
