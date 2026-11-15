import { extractCves, severityFromScore, severityFromText, toIso } from "./format";
import { patchFromNvd, patchFromRedHat, patchFromText } from "./patch";
import { emptyVuln, type Advisory, type KevRecord, type Severity, type Sighting, type Vuln } from "./types";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function num(value: unknown): number | null {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
}

function asSeverity(value: string): Severity {
  const word = value.toLowerCase();
  if (word === "critical") return "CRITICAL";
  if (word === "high" || word === "important") return "HIGH";
  if (word === "medium" || word === "moderate") return "MEDIUM";
  if (word === "low") return "LOW";
  return "UNKNOWN";
}

function preferSeverity(current: Severity, next: Severity): Severity {
  const rank: Record<Severity, number> = { UNKNOWN: 0, LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };
  return rank[next] >= rank[current] ? next : current;
}

function stringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? item : isRecord(item) ? str(item.advisory) || str(item.id) : ""))
    .map((item) => item.trim())
    .filter(Boolean);
}

function fixStates(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isRecord).map((item) => str(item.fix_state)).filter(Boolean);
}

function addRef(vuln: Vuln, href: string, label: string, source: string) {
  if (!href || vuln.references.some((ref) => ref.href === href) || vuln.references.length >= 8) return;
  vuln.references.push({ href, label: label.slice(0, 140) || href, source });
}

export function parseXml(xml: string): Document {
  if (typeof DOMParser === "undefined") throw new Error("Feed parsing runs in the browser");
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  if (doc.querySelector("parsererror")) throw new Error("Feed was not valid XML");
  return doc;
}

function strip(value: string): string {
  return value
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 700);
}

function firstChildText(node: Element, names: string[]): string {
  const wanted = new Set(names);
  for (const el of Array.from(node.children)) {
    if (!wanted.has(el.localName.toLowerCase())) continue;
    const text = el.textContent?.replace(/\s+/g, " ").trim();
    if (text) return text;
  }
  return "";
}

export function parseRss(xml: string, source: string): Advisory[] {
  if (/access denied|request blocked|just a moment/i.test(xml.slice(0, 800)) && !xml.includes("<item") && !xml.includes("<entry")) {
    throw new Error("Feed blocked this network");
  }
  const doc = parseXml(xml);
  const nodes = Array.from(doc.querySelectorAll("item"));
  const entries = nodes.length ? nodes : Array.from(doc.querySelectorAll("entry"));
  const items = entries.slice(0, 24);
  if (!items.length) throw new Error("Feed returned no advisories");
  return items.map((item) => {
    const title = firstChildText(item, ["title"]) || "Untitled";
    const link = item.querySelector(":scope > link");
    const href = (link?.getAttribute("href") || firstChildText(item, ["link"]) || "").trim();
    const published = toIso(firstChildText(item, ["pubdate", "published", "updated", "date"]));
    const summary = strip(firstChildText(item, ["description", "summary", "content"]));
    const cves = extractCves(`${title} ${summary}`).slice(0, 8);
    return {
      id: `${source}:${href || title.slice(0, 80)}`,
      source,
      title: title.slice(0, 220),
      href,
      published,
      summary,
      cves,
    };
  });
}

export function parseNsaHtml(html: string): Advisory[] {
  if (typeof DOMParser === "undefined") throw new Error("Feed parsing runs in the browser");
  if (/access denied/i.test(html.slice(0, 500))) throw new Error("NSA blocked this network");
  const doc = new DOMParser().parseFromString(html, "text/html");
  const advisories: Advisory[] = [];
  const seen = new Set<string>();
  for (const anchor of Array.from(doc.querySelectorAll("a"))) {
    const title = (anchor.textContent || "").replace(/\s+/g, " ").trim();
    if (title.length < 16 || title.length > 220) continue;
    if (!/^(CSI|CSA|CTR|Joint|Fact Sheet|Public Service)\b/i.test(title)) continue;
    const hrefAttr = anchor.getAttribute("href") || "";
    let href = "https://www.nsa.gov/cybersecurity-guidance/";
    try {
      href = new URL(hrefAttr || href, "https://www.nsa.gov").href;
    } catch {
      href = "https://www.nsa.gov/cybersecurity-guidance/";
    }
    if (seen.has(title)) continue;
    seen.add(title);
    const row = anchor.closest("tr")?.textContent || anchor.parentElement?.textContent || "";
    const dateMatch = row.match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
    const published = dateMatch
      ? `${dateMatch[3]}-${dateMatch[1].padStart(2, "0")}-${dateMatch[2].padStart(2, "0")}T00:00:00Z`
      : null;
    advisories.push({
      id: `nsa:${href}:${title.slice(0, 60)}`,
      source: "nsa",
      title,
      href,
      published,
      summary: "From the NSA Cybersecurity Advisories and Guidance catalog.",
      cves: extractCves(title),
    });
    if (advisories.length >= 20) break;
  }
  if (!advisories.length) throw new Error("NSA catalog did not include advisory rows");
  return advisories;
}

export function shellsFromAdvisories(items: Advisory[]): Vuln[] {
  const shells: Vuln[] = [];
  for (const item of items) {
    const titled = item.cves.filter((id) => item.title.toUpperCase().includes(id));
    const use = titled.length ? titled : item.cves.length <= 2 ? item.cves : [];
    for (const id of use) {
      const vuln = emptyVuln(id, item.source);
      vuln.title = item.title.slice(0, 180);
      vuln.summary = item.summary;
      vuln.published = item.published;
      vuln.severity = severityFromText(item.title);
      const cited = patchFromText(`${item.title} ${item.summary}`, item.source === "paloalto" ? "Palo Alto" : item.source === "cisco" ? "Cisco" : item.source === "redhat" ? "Red Hat" : "Advisory");
      if (cited) vuln.patch = cited;
      if (item.source === "cisco") vuln.vendor = "Cisco";
      if (item.source === "paloalto") {
        vuln.vendor = "Palo Alto Networks";
        if (/pan-os|globalprotect/i.test(`${item.title} ${item.summary}`)) vuln.product = "PAN-OS";
      }
      if (item.source === "redhat") vuln.vendor = "Red Hat";
      if (item.href) addRef(vuln, item.href, item.title.slice(0, 120), item.source);
      shells.push(vuln);
    }
  }
  return shells;
}

type KevFile = {
  catalogVersion?: string;
  count?: number;
  vulnerabilities?: Array<Record<string, unknown>>;
};

export function parseKev(data: unknown, source = "cisa-kev"): { vulns: Vuln[]; catalog: string | null; count: number | null } {
  if (!isRecord(data) || !Array.isArray(data.vulnerabilities)) {
    throw new Error("KEV file was not the expected catalog");
  }
  const file = data as KevFile;
  const vulns = (file.vulnerabilities ?? [])
    .map((item) => {
    const id = str(item.cveID).toUpperCase();
    const vuln = emptyVuln(id, source);
    const name = str(item.vulnerabilityName);
    vuln.title = name || id;
    vuln.summary = str(item.shortDescription);
    vuln.vendor = str(item.vendorProject) || null;
    vuln.product = str(item.product) || null;
    vuln.published = toIso(str(item.dateAdded));
    const kev: KevRecord = {
      name,
      dateAdded: str(item.dateAdded),
      dueDate: str(item.dueDate),
      ransomware: str(item.knownRansomwareCampaignUse) || "Unknown",
      requiredAction: str(item.requiredAction).slice(0, 500),
      notes: str(item.notes).slice(0, 400),
    };
    vuln.kev = source === "cisa-kev" ? kev : null;
    addRef(vuln, "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", "CISA KEV catalog", source);
    return vuln;
    })
    .filter((vuln) => vuln.id.startsWith("CVE-"));
  return { vulns, catalog: file.catalogVersion ?? null, count: file.count ?? vulns.length };
}

export function parseNvd(data: unknown): Vuln[] {
  if (!isRecord(data) || !Array.isArray(data.vulnerabilities)) {
    throw new Error("NVD response was not a CVE list");
  }
  return data.vulnerabilities.map((wrap) => nvdCve(wrap)).filter((vuln) => vuln.id.startsWith("CVE-"));
}

function nvdCve(wrap: unknown): Vuln {
  const record = isRecord(wrap) && isRecord(wrap.cve) ? wrap.cve : isRecord(wrap) ? wrap : {};
  const id = str(record.id).toUpperCase() || "CVE-UNKNOWN";
  const vuln = emptyVuln(id, "nvd");
  const descriptions = Array.isArray(record.descriptions) ? record.descriptions : [];
  const english = descriptions.find((item) => isRecord(item) && item.lang === "en");
  const summary = isRecord(english) ? str(english.value) : "";
  vuln.summary = summary.slice(0, 700);
  vuln.title = summary ? summary.split(". ")[0].slice(0, 180) : id;
  vuln.published = toIso(str(record.published));
  vuln.modified = toIso(str(record.lastModified));
  const metrics = isRecord(record.metrics) ? record.metrics : {};
  const chosen = pickMetric(metrics);
  if (chosen) {
    const cvss = isRecord(chosen.cvssData) ? chosen.cvssData : {};
    vuln.cvss = num(cvss.baseScore);
    vuln.vector = str(cvss.vectorString) || null;
    const sev = str(cvss.baseSeverity).toUpperCase();
    if (sev === "CRITICAL" || sev === "HIGH" || sev === "MEDIUM" || sev === "LOW") vuln.severity = sev;
    else {
      const scored = severityFromScore(vuln.cvss);
      if (scored) vuln.severity = scored;
    }
  }
  const weaknesses = Array.isArray(record.weaknesses) ? record.weaknesses : [];
  const firstWeak = weaknesses.find(isRecord);
  const weakDesc = firstWeak && Array.isArray(firstWeak.description) ? firstWeak.description : [];
  const weakEn = weakDesc.find((item) => isRecord(item) && item.lang === "en");
  vuln.cwe = isRecord(weakEn) ? str(weakEn.value) || null : null;
  const refs = Array.isArray(record.references) ? record.references : [];
  let hasPatch = false;
  let hasMitigation = false;
  for (const ref of refs.slice(0, 8)) {
    if (!isRecord(ref)) continue;
    const tags = Array.isArray(ref.tags) ? ref.tags.map((tag) => str(tag).toLowerCase()) : [];
    if (tags.includes("patch")) hasPatch = true;
    if (tags.includes("mitigation")) hasMitigation = true;
    const label = tags.includes("patch") ? "Patch" : tags.includes("vendor advisory") ? "Vendor advisory" : tags.includes("mitigation") ? "Mitigation" : "Reference";
    addRef(vuln, str(ref.url), label, "nvd");
  }
  vuln.patch = patchFromNvd(hasPatch, hasMitigation, vuln.summary);
  const configs = Array.isArray(record.configurations) ? record.configurations : [];
  for (const block of configs) {
    if (!isRecord(block) || !Array.isArray(block.nodes)) continue;
    for (const node of block.nodes) {
      if (!isRecord(node) || !Array.isArray(node.cpeMatch)) continue;
      for (const match of node.cpeMatch) {
        if (!isRecord(match)) continue;
        const parts = str(match.criteria).split(":");
        if (parts.length > 4) {
          vuln.vendor = parts[3] || null;
          vuln.product = parts[4] || null;
          return vuln;
        }
      }
    }
  }
  return vuln;
}

function pickMetric(metrics: Record<string, unknown>): Record<string, unknown> | null {
  for (const key of ["cvssMetricV31", "cvssMetricV40", "cvssMetricV30", "cvssMetricV2"]) {
    const arr = metrics[key];
    if (!Array.isArray(arr) || !arr.length) continue;
    const primary = arr.find((item) => isRecord(item) && item.type === "Primary");
    const chosen = primary ?? arr[0];
    if (isRecord(chosen)) return chosen;
  }
  return null;
}

export function parseRedHatList(data: unknown): Vuln[] {
  if (!Array.isArray(data)) throw new Error("Red Hat response was not a CVE list");
  return data
    .filter(isRecord)
    .map((item) => {
    const id = str(item.CVE).toUpperCase();
    const vuln = emptyVuln(id, "redhat");
    const desc = str(item.bugzilla_description);
    vuln.title = desc.slice(0, 180) || id;
    vuln.summary = desc.slice(0, 700);
    vuln.severity = asSeverity(str(item.severity));
    const score = num(item.cvss3_score);
    vuln.cvss = score;
    vuln.vector = str(item.cvss3_scoring_vector) || null;
    const scored = severityFromScore(score);
    if (scored) vuln.severity = preferSeverity(vuln.severity, scored);
    vuln.published = toIso(str(item.public_date));
    vuln.cwe = str(item.CWE) || null;
    const packages = Array.isArray(item.affected_packages)
      ? item.affected_packages.map((pkg) => (typeof pkg === "string" ? pkg : "")).filter(Boolean).slice(0, 8)
      : [];
    vuln.vendor = "Red Hat";
    vuln.product = "Enterprise Linux";
    vuln.redhat = {
      severity: str(item.severity),
      bugzilla: str(item.bugzilla) || null,
      statement: null,
      packages,
    };
    vuln.patch = patchFromRedHat(stringList(item.advisories), fixStates(item.package_state));
    if (str(item.resource_url)) addRef(vuln, str(item.resource_url), "Red Hat CVE", "redhat");
    if (str(item.bugzilla)) {
      addRef(vuln, `https://bugzilla.redhat.com/show_bug.cgi?id=${str(item.bugzilla)}`, "Red Hat Bugzilla", "redhat");
    }
    return vuln;
    })
    .filter((vuln) => vuln.id.startsWith("CVE-"));
}

export function parseRedHatDetail(data: unknown, id: string): Vuln | null {
  if (!isRecord(data) || typeof data.message === "string") return null;
  const vuln = emptyVuln(id, "redhat");
  const bug = isRecord(data.bugzilla) ? data.bugzilla : null;
  const desc = bug ? str(bug.description) : str(data.bugzilla_description);
  vuln.title = desc.slice(0, 180) || id;
  const statement = str(data.statement) || str(data.details);
  vuln.summary = (statement || desc).slice(0, 700);
  vuln.severity = asSeverity(str(data.threat_severity) || str(data.severity));
  const cvss3 = isRecord(data.cvss3) ? data.cvss3 : null;
  const score = num(cvss3?.cvss3_base_score) ?? num(data.cvss3_score);
  vuln.cvss = score;
  vuln.vector = (cvss3 ? str(cvss3.cvss3_scoring_vector) : "") || str(data.cvss3_scoring_vector) || null;
  const scored = severityFromScore(score);
  if (scored) vuln.severity = preferSeverity(vuln.severity, scored);
  vuln.published = toIso(str(data.public_date));
  vuln.cwe = str(data.cwe) || null;
  const packages: string[] = [];
  const errata: string[] = [];
  if (Array.isArray(data.affected_release)) {
    for (const rel of data.affected_release) {
      if (!isRecord(rel)) continue;
      if (str(rel.package)) packages.push(str(rel.package));
      if (str(rel.advisory)) errata.push(str(rel.advisory));
    }
  }
  const states: string[] = [];
  if (Array.isArray(data.package_state)) {
    for (const rel of data.package_state) {
      if (!isRecord(rel)) continue;
      if (str(rel.package_name)) packages.push(str(rel.package_name));
      if (str(rel.fix_state)) states.push(str(rel.fix_state));
    }
  }
  vuln.vendor = "Red Hat";
  vuln.product = vuln.product || "Enterprise Linux";
  vuln.redhat = {
    severity: str(data.threat_severity) || str(data.severity),
    bugzilla: bug ? str(bug.id) || null : null,
    statement: statement.slice(0, 700) || null,
    packages: packages.slice(0, 8),
  };
  vuln.patch = patchFromRedHat([...errata, ...stringList(data.advisories)], states);
  if (bug && str(bug.url)) addRef(vuln, str(bug.url), "Red Hat Bugzilla", "redhat");
  addRef(vuln, `https://access.redhat.com/security/cve/${id}`, "Red Hat CVE", "redhat");
  return vuln;
}

function splitCsvLine(line: string): string[] {
  const out: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (quoted) {
      if (ch === '"') {
        if (line[i + 1] === '"') {
          current += '"';
          i += 1;
        } else quoted = false;
      } else current += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") {
      out.push(current.trim());
      current = "";
    } else current += ch;
  }
  out.push(current.trim());
  return out;
}

export function parseCsv(text: string, source: string): Vuln[] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) throw new Error("CSV needs a header and at least one row");
  const header = splitCsvLine(lines[0]).map((cell) => cell.toLowerCase());
  const cveIdx = header.findIndex((cell) => cell.includes("cve"));
  if (cveIdx < 0) throw new Error("CSV needs a column with CVE in the name");
  const sevIdx = header.findIndex((cell) => cell.includes("sev"));
  const descIdx = header.findIndex((cell) => /desc|summary|title|name/.test(cell));
  const dateIdx = header.findIndex((cell) => /date|published/.test(cell));
  const scoreIdx = header.findIndex((cell) => /cvss|score/.test(cell));
  const vulns: Vuln[] = [];
  for (const line of lines.slice(1, 301)) {
    const cells = splitCsvLine(line);
    const ids = extractCves(cells[cveIdx] || "");
    if (!ids.length) continue;
    const vuln = emptyVuln(ids[0], source);
    const desc = descIdx >= 0 ? cells[descIdx] || "" : "";
    vuln.title = desc.slice(0, 180) || ids[0];
    vuln.summary = desc.slice(0, 700);
    vuln.severity = sevIdx >= 0 ? asSeverity(cells[sevIdx] || "") : "UNKNOWN";
    vuln.cvss = scoreIdx >= 0 ? num(cells[scoreIdx]) : null;
    const scored = severityFromScore(vuln.cvss);
    if (scored) vuln.severity = preferSeverity(vuln.severity, scored);
    vuln.published = dateIdx >= 0 ? toIso(cells[dateIdx]) : null;
    vulns.push(vuln);
  }
  if (!vulns.length) throw new Error("No CVE rows in that CSV");
  return vulns;
}

function readCve(record: Record<string, unknown>): string {
  for (const key of ["cveID", "CVE", "cve", "cve_id", "cveId"]) {
    const ids = extractCves(str(record[key]));
    if (ids.length) return ids[0];
  }
  const id = str(record.id);
  const ids = extractCves(id);
  return ids[0] || "";
}

function unwrapRecords(data: unknown): Record<string, unknown>[] {
  if (Array.isArray(data)) return data.filter(isRecord);
  if (!isRecord(data)) return [];
  for (const key of ["vulnerabilities", "items", "data", "cves", "results"]) {
    if (Array.isArray(data[key])) return data[key].filter(isRecord);
  }
  return [data];
}

export function parseLooseJson(data: unknown, source: string): { vulns: Vuln[]; advisories: Advisory[] } {
  if (isRecord(data) && Array.isArray(data.vulnerabilities) && data.vulnerabilities.some((item) => isRecord(item) && "cveID" in item)) {
    return { vulns: parseKev(data, source).vulns, advisories: [] };
  }
  const vulns: Vuln[] = [];
  const advisories: Advisory[] = [];
  for (const record of unwrapRecords(data).slice(0, 300)) {
    const id = readCve(record);
    if (id) {
      const vuln = emptyVuln(id, source);
      const summary = str(record.shortDescription) || str(record.description) || str(record.summary) || str(record.details);
      const title = str(record.vulnerabilityName) || str(record.title) || str(record.name) || summary.split(". ")[0];
      vuln.title = (title || id).slice(0, 180);
      vuln.summary = summary.slice(0, 700);
      vuln.severity = asSeverity(str(record.severity) || str(record.threat_severity));
      vuln.cvss = num(record.cvss) ?? num(record.cvss3_score) ?? num(record.cvssScore);
      const scored = severityFromScore(vuln.cvss);
      if (scored) vuln.severity = preferSeverity(vuln.severity, scored);
      vuln.published = toIso(str(record.published) || str(record.public_date) || str(record.dateAdded) || str(record.date));
      vuln.vendor = str(record.vendor) || str(record.vendorProject) || null;
      vuln.product = str(record.product) || null;
      const href = str(record.url) || str(record.link) || str(record.href);
      if (href) addRef(vuln, href, vuln.title, source);
      vulns.push(vuln);
      continue;
    }
    const title = str(record.title) || str(record.name);
    const href = str(record.link) || str(record.url) || str(record.href);
    if (!title || !href) continue;
    const summary = str(record.summary) || str(record.description);
    advisories.push({
      id: `${source}:${href}`,
      source,
      title: title.slice(0, 220),
      href,
      published: toIso(str(record.published) || str(record.pubDate) || str(record.date)),
      summary: summary.slice(0, 700),
      cves: extractCves(`${title} ${summary}`).slice(0, 8),
    });
  }
  if (!vulns.length && !advisories.length) throw new Error("JSON had no CVEs or titled links");
  return { vulns, advisories };
}

const STORY_FLUFF = /password hygiene|bad password|survey|gift card|holiday scam|tips for (families|parents|kids)|what is (a |an )?(vpn|password|phishing)|how to (spot|avoid|stay safe)|% of (americans|users|people)/i;
const STORY_SIGNAL = /cve-\d|exploit|ransomware|0-day|zero-day|kev|vulnerabilit|advisory|patch|breach|intrusion|malware|backdoor|actively|attack/i;

export function parseWire(data: unknown, source: string): Advisory[] {
  if (!isRecord(data) || !Array.isArray(data.items)) throw new Error("Wire payload was not the expected list");
  const notes: Advisory[] = [];
  for (const row of data.items.filter(isRecord)) {
    const title = str(row.title);
    const href = str(row.url);
    const summary = str(row.summary);
    if (!title || !href.startsWith("https://")) continue;
    const text = `${title} ${summary}`;
    if (STORY_FLUFF.test(text) && !/cve-\d/i.test(text)) continue;
    if (!STORY_SIGNAL.test(text)) continue;
    const publisher = isRecord(row.source) ? str(row.source.name) : "";
    const listed = Array.isArray(row.cves) ? row.cves.filter((item): item is string => typeof item === "string") : [];
    const cves = (listed.length ? listed : extractCves(text)).map((item) => item.toUpperCase()).slice(0, 8);
    notes.push({
      id: `${source}:${href}`,
      source,
      title: title.slice(0, 220),
      href,
      published: toIso(str(row.published)),
      summary: [publisher, summary].filter(Boolean).join(" — ").slice(0, 700),
      cves,
    });
    if (notes.length >= 24) break;
  }
  if (!notes.length) throw new Error("Wire had no operational stories");
  return notes;
}

export function parseClaims(data: unknown, source: string): Advisory[] {
  if (!Array.isArray(data)) throw new Error("Claims feed was not a list");
  const notes: Advisory[] = [];
  for (const row of data.filter(isRecord).slice(0, 30)) {
    const victim = str(row.victim);
    const group = str(row.group) || "an unnamed group";
    const href = str(row.url);
    if (!victim || !href.startsWith("https://")) continue;
    const country = str(row.country);
    const activity = str(row.activity);
    notes.push({
      id: `${source}:${href}`,
      source,
      title: `${victim} claimed by ${group}`.slice(0, 220),
      href,
      published: toIso(str(row.discovered) || str(row.attackdate)),
      summary: [country ? `Country ${country}` : "", activity].filter(Boolean).join(" · ") || "Named ransomware claim.",
      cves: [],
    });
  }
  if (!notes.length) throw new Error("Claims feed had no public records");
  return notes;
}

export function parseGhsa(data: unknown, source: string): { vulns: Vuln[]; advisories: Advisory[] } {
  if (!Array.isArray(data)) throw new Error("GitHub advisories were not a list");
  const vulns: Vuln[] = [];
  const advisories: Advisory[] = [];
  for (const row of data.filter(isRecord).slice(0, 20)) {
    const ghsa = str(row.ghsa_id).toUpperCase();
    const cve = str(row.cve_id).toUpperCase();
    const title = str(row.summary) || ghsa || cve;
    const href = str(row.html_url);
    const summary = str(row.description);
    const published = toIso(str(row.published_at));
    const id = cve.startsWith("CVE-") ? cve : ghsa;
    if (!id || !title) continue;
    if (href.startsWith("https://")) {
      advisories.push({
        id: `${source}:${href}`,
        source,
        title: title.slice(0, 220),
        href,
        published,
        summary: summary.slice(0, 700),
        cves: cve.startsWith("CVE-") ? [cve] : [],
      });
    }
    const vuln = emptyVuln(id, source);
    vuln.title = title.slice(0, 180);
    vuln.summary = summary.slice(0, 700);
    vuln.published = published;
    const severity = str(row.severity).toUpperCase();
    if (severity === "CRITICAL" || severity === "HIGH" || severity === "MEDIUM" || severity === "LOW") vuln.severity = severity;
    if (href.startsWith("https://")) addRef(vuln, href, title.slice(0, 120), source);
    vulns.push(vuln);
  }
  if (!vulns.length && !advisories.length) throw new Error("GitHub returned no advisories");
  return { vulns, advisories };
}

export function parseSansCountries(data: unknown): Sighting[] {
  if (!Array.isArray(data)) throw new Error("DShield country list was not an array");
  const rows: Sighting[] = [];
  for (const row of data.filter(isRecord)) {
    const country = str(row.country).toUpperCase();
    if (!/^[A-Z]{2}$/.test(country)) continue;
    const sources = num(row.sources) ?? 0;
    const reports = num(row.reports) ?? 0;
    if (sources <= 0) continue;
    rows.push({ country, sources, reports });
  }
  if (!rows.length) throw new Error("DShield returned no countries");
  return rows;
}

export function parseFeodo(data: unknown): Sighting[] {
  if (!Array.isArray(data)) throw new Error("Feodo list was not an array");
  const tally = (onlineOnly: boolean) => {
    const counts = new Map<string, number>();
    for (const row of data.filter(isRecord)) {
      const country = str(row.country).toUpperCase();
      if (!/^[A-Z]{2}$/.test(country)) continue;
      if (onlineOnly && str(row.status).toLowerCase() === "offline") continue;
      counts.set(country, (counts.get(country) ?? 0) + 1);
    }
    return counts;
  };
  const counts = tally(true).size ? tally(true) : tally(false);
  const rows = Array.from(counts, ([country, sources]) => ({ country, sources, reports: sources }));
  if (!rows.length) throw new Error("Feodo returned no countries");
  return rows;
}
