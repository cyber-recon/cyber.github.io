import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, _ as createFileRoute, b as useNavigate, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, q as require_jsx_runtime, v as createRootRoute, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cn-uPHwjLEL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEED_GROUPS = [
	{
		id: "stack",
		label: "Stack"
	},
	{
		id: "exploited",
		label: "Exploited and scored"
	},
	{
		id: "vendor",
		label: "Vendors"
	},
	{
		id: "gov",
		label: "Government"
	},
	{
		id: "research",
		label: "Research"
	},
	{
		id: "picture",
		label: "Picture and claims"
	}
];
var BUILTINS = [
	{
		id: "nvd-win11",
		name: "Windows 11",
		agency: "NVD",
		blurb: "Latest NVD page for the Windows 11 CPE. Queried one at a time so a shared board stays inside the public rate limit.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:o:microsoft:windows_11"
	},
	{
		id: "nvd-macos",
		name: "macOS",
		agency: "NVD",
		blurb: "Latest NVD page for Apple macOS. Falls back to the older Mac OS X CPE if the new one is empty.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:o:apple:macos",
		fallbackQuery: "virtualMatchString=cpe:2.3:o:apple:mac_os_x"
	},
	{
		id: "nvd-esxi",
		name: "ESXi",
		agency: "NVD",
		blurb: "Latest NVD page for VMware ESXi. Broadcom still files most hypervisor CVEs under the VMware CPE.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:o:vmware:esxi"
	},
	{
		id: "nvd-vcenter",
		name: "vCenter",
		agency: "NVD",
		blurb: "Latest NVD page for VMware vCenter Server. There is no open Broadcom advisory feed.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:a:vmware:vcenter_server"
	},
	{
		id: "nvd-horizon",
		name: "Horizon CPE",
		agency: "NVD",
		blurb: "Latest NVD page for VMware Horizon. If that CPE is empty, a keyword search for VMware Horizon runs instead.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:a:vmware:horizon",
		fallbackQuery: "keywordSearch=VMware%20Horizon"
	},
	{
		id: "nvd-omnissa",
		name: "Omnissa",
		agency: "NVD",
		blurb: "Keyword search for Omnissa. OMSA has no open feed after the Horizon split; this is the public backup.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "keywordSearch=Omnissa"
	},
	{
		id: "nvd-rhel",
		name: "Red Hat Enterprise Linux",
		agency: "NVD",
		blurb: "Latest NVD page for the Enterprise Linux CPE. The Red Hat Product Security API is the errata source and is what decides whether a fix shipped.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:o:redhat:enterprise_linux"
	},
	{
		id: "nvd-panos",
		name: "PAN-OS",
		agency: "NVD",
		blurb: "Latest NVD page for Palo Alto PAN-OS. The PSIRT RSS is the advisory backup when this page is quiet.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "virtualMatchString=cpe:2.3:o:paloaltonetworks:pan-os"
	},
	{
		id: "nvd-cisco",
		name: "Cisco",
		agency: "NVD",
		blurb: "Latest NVD page matching Cisco. PSIRT remains the advisory feed; this keyword search is the CVE backup.",
		direct: null,
		relay: null,
		kind: "nvd-query",
		group: "stack",
		query: "keywordSearch=Cisco"
	},
	{
		id: "msrc",
		name: "MSRC update guide",
		agency: "Microsoft",
		blurb: "Security Update Guide RSS, the Patch Tuesday list. Microsoft blocks browser reads, so this host relays it.",
		direct: null,
		relay: "msrc",
		kind: "rss",
		group: "stack"
	},
	{
		id: "cisa-kev",
		name: "CISA KEV",
		agency: "CISA",
		blurb: "Known Exploited Vulnerabilities. A jsDelivr mirror is read first; the official catalog is the backup.",
		direct: "https://cdn.jsdelivr.net/gh/cisagov/kev-data@develop/known_exploited_vulnerabilities.json",
		relay: "kev",
		kind: "kev",
		group: "exploited"
	},
	{
		id: "nvd",
		name: "NVD recent",
		agency: "NIST",
		blurb: "CVE records published to the National Vulnerability Database in the last six days. Backup when a stack query is quiet.",
		direct: null,
		relay: null,
		kind: "nvd",
		group: "exploited"
	},
	{
		id: "epss",
		name: "FIRST EPSS",
		agency: "FIRST",
		blurb: "Chance a CVE is exploited in the next 30 days. Scored on the priority set, and on any CVE you open.",
		direct: null,
		relay: null,
		kind: "epss",
		group: "exploited"
	},
	{
		id: "redhat",
		name: "Red Hat",
		agency: "Red Hat",
		blurb: "Product Security CVE API, including errata when Red Hat has shipped a fix. Relayed, because Red Hat’s browser header is unreliable.",
		direct: null,
		relay: "redhat",
		kind: "redhat",
		group: "exploited"
	},
	{
		id: "ghsa",
		name: "GitHub advisories",
		agency: "GitHub",
		blurb: "Reviewed critical advisories. Mostly libraries. Open to browsers. Turn it off if dependency noise buries the stack.",
		direct: "https://api.github.com/advisories?severity=critical&per_page=20",
		relay: null,
		kind: "ghsa",
		group: "exploited"
	},
	{
		id: "cisco",
		name: "Cisco PSIRT",
		agency: "Cisco",
		blurb: "Public security-advisory RSS. Open to browsers. A cited fix in the advisory text is marked as a patch. openVuln needs a confidential secret, so this stays on the open feed.",
		direct: "https://sec.cloudapps.cisco.com/security/center/psirtrss20/CiscoSecurityAdvisory.xml",
		relay: null,
		kind: "rss",
		group: "vendor"
	},
	{
		id: "fortinet",
		name: "Fortinet PSIRT",
		agency: "Fortinet",
		blurb: "FortiGuard PSIRT RSS. The browser is blocked, so this host relays it. Useful when an edge device shows up in KEV the same week.",
		direct: null,
		relay: "fortinet",
		kind: "rss",
		group: "vendor"
	},
	{
		id: "paloalto",
		name: "Palo Alto",
		agency: "Palo Alto Networks",
		blurb: "PAN-OS product security advisories. The site blocks browsers, so the host relays the RSS. Advisory text that cites a fix is marked as a patch.",
		direct: null,
		relay: "paloalto",
		kind: "rss",
		group: "vendor"
	},
	{
		id: "unit42",
		name: "Unit 42",
		agency: "Palo Alto Networks",
		blurb: "Threat research, not product advisories. Same browser block. Host relay, then the page.",
		direct: null,
		relay: "unit42",
		kind: "rss",
		group: "research"
	},
	{
		id: "cisa-advisory",
		name: "CISA advisories",
		agency: "CISA",
		blurb: "Alerts and cybersecurity advisories. Separate from the exploited catalog. CISA often blocks direct reads.",
		direct: null,
		relay: "cisa-advisory",
		kind: "rss",
		group: "gov"
	},
	{
		id: "nsa",
		name: "NSA guidance",
		agency: "NSA",
		blurb: "Cybersecurity advisories and CSI notes from the public catalog. No exploit dump, no password surveys.",
		direct: null,
		relay: "nsa",
		kind: "nsa",
		group: "gov"
	},
	{
		id: "certcc",
		name: "CERT/CC notes",
		agency: "CERT/CC",
		blurb: "Vulnerability notes. Slower than KEV and usually deeper. The Atom feed blocks browsers, so the host relays it.",
		direct: null,
		relay: "certcc",
		kind: "rss",
		group: "gov"
	},
	{
		id: "ncsc",
		name: "NCSC-UK",
		agency: "NCSC",
		blurb: "UK National Cyber Security Centre reports. Relayed. Alerts and malware writeups, not awareness posters.",
		direct: null,
		relay: "ncsc",
		kind: "rss",
		group: "gov"
	},
	{
		id: "acsc",
		name: "ACSC",
		agency: "ACSC",
		blurb: "Australian Cyber Security Centre alerts. Relayed. A second government list when CISA is slow to post.",
		direct: null,
		relay: "acsc",
		kind: "rss",
		group: "gov"
	},
	{
		id: "certfr",
		name: "CERT-FR alerts",
		agency: "CERT-FR",
		blurb: "French alert feed, the short high-severity list. Relayed. Titles are often French.",
		direct: null,
		relay: "certfr",
		kind: "rss",
		group: "gov"
	},
	{
		id: "bsi",
		name: "BSI WID",
		agency: "BSI",
		blurb: "German government vulnerability advisories. Relayed. Often earlier on European products. Titles are often German.",
		direct: null,
		relay: "bsi",
		kind: "rss",
		group: "gov"
	},
	{
		id: "jpcert",
		name: "JPCERT/CC",
		agency: "JPCERT",
		blurb: "English notices from Japan CERT. Relayed. A useful backup when a campaign is reported in Asia first.",
		direct: null,
		relay: "jpcert",
		kind: "rss",
		group: "gov"
	},
	{
		id: "dfir",
		name: "DFIR Report",
		agency: "The DFIR Report",
		blurb: "Full intrusion timelines. Relayed. No vendor marketing.",
		direct: null,
		relay: "dfir",
		kind: "rss",
		group: "research"
	},
	{
		id: "talos",
		name: "Cisco Talos",
		agency: "Talos",
		blurb: "Talos research feed. Relayed. Campaign writeups rather than product advisories.",
		direct: null,
		relay: "talos",
		kind: "rss",
		group: "research"
	},
	{
		id: "sans-diary",
		name: "SANS ISC diary",
		agency: "SANS",
		blurb: "Internet Storm Center handler diaries. Relayed. Short observations from working analysts.",
		direct: null,
		relay: "sans-diary",
		kind: "rss",
		group: "research"
	},
	{
		id: "projectzero",
		name: "Project Zero",
		agency: "Google",
		blurb: "Project Zero technical posts. Relayed. Exploit research, not news briefs.",
		direct: null,
		relay: "projectzero",
		kind: "rss",
		group: "research"
	},
	{
		id: "field-wire",
		name: "Field wire",
		agency: "Publishers",
		blurb: "CORS-open backup of publisher stories when the original feed blocks a browser. Password surveys and how-to pieces are dropped. Links go to the publisher.",
		direct: "https://news.resiliencesecurities.com/api/v1/news?category=security&limit=30",
		relay: null,
		kind: "wire",
		group: "research"
	},
	{
		id: "sans-map",
		name: "DShield sources",
		agency: "SANS",
		blurb: "Attack-source counts by country from the Internet Storm Center. Open to browsers. Sensor bias applies. Not a live packet map.",
		direct: "https://isc.sans.edu/api/country/US?json",
		relay: null,
		kind: "sighting",
		group: "picture"
	},
	{
		id: "feodo",
		name: "Feodo C2",
		agency: "abuse.ch",
		blurb: "Feodo Tracker botnet controllers by country. Backup picture if DShield is down. The download blocks browsers, so the host relays it.",
		direct: null,
		relay: "feodo",
		kind: "sighting",
		group: "picture"
	},
	{
		id: "ransomware",
		name: "Ransom claims",
		agency: "ransomware.live",
		blurb: "Recent named ransomware claims. Victim, group, country, and date only. The leak-site pitch is not shown. Relayed.",
		direct: null,
		relay: "ransomware",
		kind: "claims",
		group: "picture"
	}
];
function sourceLabel(id, customNames) {
	return customNames?.[id] ?? BUILTINS.find((feed) => feed.id === id)?.agency ?? id.replace(/^c_/, "");
}
var MONTHS = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"Jun",
	"Jul",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec"
];
function shortDate(iso) {
	if (!iso) return "—";
	const [year, month, date] = iso.slice(0, 10).split("-");
	const monthName = MONTHS[Number(month) - 1];
	if (!year || !monthName || !date) return "—";
	return `${Number(date)} ${monthName} ${year}`;
}
function utcDay(offset = 0) {
	const now = /* @__PURE__ */ new Date();
	now.setUTCDate(now.getUTCDate() + offset);
	return now.toISOString().slice(0, 10);
}
function formatCvss(value) {
	if (value == null || Number.isNaN(value)) return "—";
	return value.toFixed(1);
}
function formatEpss(value) {
	if (value == null || Number.isNaN(value)) return "—";
	const pct = value * 100;
	return `${pct >= 10 ? pct.toFixed(0) : pct.toFixed(1)}%`;
}
function groupDigits(value) {
	return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function toIso(value) {
	if (!value) return null;
	const trimmed = value.trim();
	if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return `${trimmed}T00:00:00Z`;
	const parsed = Date.parse(trimmed);
	if (Number.isNaN(parsed)) return null;
	return new Date(parsed).toISOString().replace(/\.\d{3}Z$/, "Z");
}
function dueState(due, today = utcDay()) {
	if (!due) return "none";
	const day = due.slice(0, 10);
	if (day < today) return "overdue";
	if (day <= utcDay(14)) return "soon";
	return "open";
}
var CVE_RE = /\bCVE-\d{4}-\d{4,7}\b/gi;
function extractCves(text) {
	const found = [];
	for (const match of text.matchAll(CVE_RE)) {
		const id = match[0].toUpperCase();
		if (!found.includes(id)) found.push(id);
	}
	return found;
}
function severityFromText(text) {
	const word = text.match(/severity\s*[:=]\s*(critical|high|important|medium|moderate|low)/i)?.[1]?.toLowerCase();
	if (word === "critical") return "CRITICAL";
	if (word === "high" || word === "important") return "HIGH";
	if (word === "medium" || word === "moderate") return "MEDIUM";
	if (word === "low") return "LOW";
	return "UNKNOWN";
}
function severityFromScore(score) {
	if (score == null || Number.isNaN(score)) return null;
	if (score >= 9) return "CRITICAL";
	if (score >= 7) return "HIGH";
	if (score >= 4) return "MEDIUM";
	if (score > 0) return "LOW";
	return "UNKNOWN";
}
var UNKNOWN_PATCH = {
	state: "unknown",
	detail: "No source has cited a vendor fix yet."
};
var NO_PATCH = /\bno patch(?:es)? (?:is |are )?(?:yet )?available\b|\bpatch(?:es)? (?:is |are )?not (?:yet )?available\b|\bno fix(?:es)? (?:is |are )?(?:yet )?available\b|\bfix deferred\b|\bwill not fix\b|\bno update available\b|\bunpatched\b/i;
var YES_PATCH = /\bfixed in\b|\bpatches? (?:are |is )?available\b|\berrata\b|\bRH[SBE]A-\d|\bfixed versions?\b|\bfix available\b/i;
function patchOf(vuln) {
	const patch = vuln.patch;
	if (!patch || patch.state !== "yes" && patch.state !== "no" && patch.state !== "unknown") return UNKNOWN_PATCH;
	return patch;
}
function mergePatch(a, b) {
	const left = a ?? UNKNOWN_PATCH;
	const right = b ?? UNKNOWN_PATCH;
	const rank = {
		unknown: 0,
		no: 1,
		yes: 2
	};
	if (rank[right.state] !== rank[left.state]) return rank[right.state] > rank[left.state] ? right : left;
	return right.detail.length > left.detail.length ? right : left;
}
function patchFromText(text, source) {
	if (NO_PATCH.test(text)) return {
		state: "no",
		detail: `${source} says a fix is not available yet.`
	};
	if (YES_PATCH.test(text)) return {
		state: "yes",
		detail: `${source} cites a fix.`
	};
	return null;
}
function patchFromRedHat(advisories, states) {
	const errata = advisories.filter((item) => /RH[SBE]A-\d/i.test(item));
	if (errata.length) return {
		state: "yes",
		detail: `Red Hat errata ${errata.slice(0, 3).join(", ")}.`
	};
	const open = states.find((item) => /affected|under investigation|fix deferred|will not fix|out of support/i.test(item));
	if (open) return {
		state: "no",
		detail: `Red Hat lists “${open}” and no errata.`
	};
	return UNKNOWN_PATCH;
}
function patchFromNvd(hasPatch, hasMitigation, summary) {
	if (hasPatch) return {
		state: "yes",
		detail: "NVD lists a reference tagged as a patch."
	};
	if (hasMitigation) return {
		state: "no",
		detail: "NVD lists a mitigation and no patch reference."
	};
	return patchFromText(summary, "NVD") ?? UNKNOWN_PATCH;
}
var SEVERITIES = [
	"CRITICAL",
	"HIGH",
	"MEDIUM",
	"LOW",
	"UNKNOWN"
];
function emptyVuln(id, source) {
	return {
		id,
		title: id,
		summary: "",
		severity: "UNKNOWN",
		cvss: null,
		vector: null,
		published: null,
		modified: null,
		sources: source ? [source] : [],
		vendor: null,
		product: null,
		cwe: null,
		kev: null,
		redhat: null,
		patch: {
			state: "unknown",
			detail: "No source has cited a vendor fix yet."
		},
		epss: null,
		epssPercentile: null,
		references: []
	};
}
function isRecord(value) {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}
function str(value) {
	return typeof value === "string" ? value.trim() : "";
}
function num(value) {
	if (typeof value === "number" && !Number.isNaN(value)) return value;
	if (typeof value === "string" && value.trim()) {
		const parsed = Number(value);
		return Number.isNaN(parsed) ? null : parsed;
	}
	return null;
}
function asSeverity(value) {
	const word = value.toLowerCase();
	if (word === "critical") return "CRITICAL";
	if (word === "high" || word === "important") return "HIGH";
	if (word === "medium" || word === "moderate") return "MEDIUM";
	if (word === "low") return "LOW";
	return "UNKNOWN";
}
function preferSeverity(current, next) {
	const rank = {
		UNKNOWN: 0,
		LOW: 1,
		MEDIUM: 2,
		HIGH: 3,
		CRITICAL: 4
	};
	return rank[next] >= rank[current] ? next : current;
}
function stringList(value) {
	if (!Array.isArray(value)) return [];
	return value.map((item) => typeof item === "string" ? item : isRecord(item) ? str(item.advisory) || str(item.id) : "").map((item) => item.trim()).filter(Boolean);
}
function fixStates(value) {
	if (!Array.isArray(value)) return [];
	return value.filter(isRecord).map((item) => str(item.fix_state)).filter(Boolean);
}
function addRef(vuln, href, label, source) {
	if (!href || vuln.references.some((ref) => ref.href === href) || vuln.references.length >= 8) return;
	vuln.references.push({
		href,
		label: label.slice(0, 140) || href,
		source
	});
}
function parseXml(xml) {
	if (typeof DOMParser === "undefined") throw new Error("Feed parsing runs in the browser");
	const doc = new DOMParser().parseFromString(xml, "text/xml");
	if (doc.querySelector("parsererror")) throw new Error("Feed was not valid XML");
	return doc;
}
function strip(value) {
	return value.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 700);
}
function firstChildText(node, names) {
	const wanted = new Set(names);
	for (const el of Array.from(node.children)) {
		if (!wanted.has(el.localName.toLowerCase())) continue;
		const text = el.textContent?.replace(/\s+/g, " ").trim();
		if (text) return text;
	}
	return "";
}
function parseRss(xml, source) {
	if (/access denied|request blocked|just a moment/i.test(xml.slice(0, 800)) && !xml.includes("<item") && !xml.includes("<entry")) throw new Error("Feed blocked this network");
	const doc = parseXml(xml);
	const nodes = Array.from(doc.querySelectorAll("item"));
	const items = (nodes.length ? nodes : Array.from(doc.querySelectorAll("entry"))).slice(0, 24);
	if (!items.length) throw new Error("Feed returned no advisories");
	return items.map((item) => {
		const title = firstChildText(item, ["title"]) || "Untitled";
		const href = (item.querySelector(":scope > link")?.getAttribute("href") || firstChildText(item, ["link"]) || "").trim();
		const published = toIso(firstChildText(item, [
			"pubdate",
			"published",
			"updated",
			"date"
		]));
		const summary = strip(firstChildText(item, [
			"description",
			"summary",
			"content"
		]));
		const cves = extractCves(`${title} ${summary}`).slice(0, 8);
		return {
			id: `${source}:${href || title.slice(0, 80)}`,
			source,
			title: title.slice(0, 220),
			href,
			published,
			summary,
			cves
		};
	});
}
function parseNsaHtml(html) {
	if (typeof DOMParser === "undefined") throw new Error("Feed parsing runs in the browser");
	if (/access denied/i.test(html.slice(0, 500))) throw new Error("NSA blocked this network");
	const doc = new DOMParser().parseFromString(html, "text/html");
	const advisories = [];
	const seen = /* @__PURE__ */ new Set();
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
		const dateMatch = (anchor.closest("tr")?.textContent || anchor.parentElement?.textContent || "").match(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/);
		const published = dateMatch ? `${dateMatch[3]}-${dateMatch[1].padStart(2, "0")}-${dateMatch[2].padStart(2, "0")}T00:00:00Z` : null;
		advisories.push({
			id: `nsa:${href}:${title.slice(0, 60)}`,
			source: "nsa",
			title,
			href,
			published,
			summary: "From the NSA Cybersecurity Advisories and Guidance catalog.",
			cves: extractCves(title)
		});
		if (advisories.length >= 20) break;
	}
	if (!advisories.length) throw new Error("NSA catalog did not include advisory rows");
	return advisories;
}
function shellsFromAdvisories(items) {
	const shells = [];
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
function parseKev(data, source = "cisa-kev") {
	if (!isRecord(data) || !Array.isArray(data.vulnerabilities)) throw new Error("KEV file was not the expected catalog");
	const file = data;
	const vulns = (file.vulnerabilities ?? []).map((item) => {
		const id = str(item.cveID).toUpperCase();
		const vuln = emptyVuln(id, source);
		const name = str(item.vulnerabilityName);
		vuln.title = name || id;
		vuln.summary = str(item.shortDescription);
		vuln.vendor = str(item.vendorProject) || null;
		vuln.product = str(item.product) || null;
		vuln.published = toIso(str(item.dateAdded));
		const kev = {
			name,
			dateAdded: str(item.dateAdded),
			dueDate: str(item.dueDate),
			ransomware: str(item.knownRansomwareCampaignUse) || "Unknown",
			requiredAction: str(item.requiredAction).slice(0, 500),
			notes: str(item.notes).slice(0, 400)
		};
		vuln.kev = source === "cisa-kev" ? kev : null;
		addRef(vuln, "https://www.cisa.gov/known-exploited-vulnerabilities-catalog", "CISA KEV catalog", source);
		return vuln;
	}).filter((vuln) => vuln.id.startsWith("CVE-"));
	return {
		vulns,
		catalog: file.catalogVersion ?? null,
		count: file.count ?? vulns.length
	};
}
function parseNvd(data) {
	if (!isRecord(data) || !Array.isArray(data.vulnerabilities)) throw new Error("NVD response was not a CVE list");
	return data.vulnerabilities.map((wrap) => nvdCve(wrap)).filter((vuln) => vuln.id.startsWith("CVE-"));
}
function nvdCve(wrap) {
	const record = isRecord(wrap) && isRecord(wrap.cve) ? wrap.cve : isRecord(wrap) ? wrap : {};
	const id = str(record.id).toUpperCase() || "CVE-UNKNOWN";
	const vuln = emptyVuln(id, "nvd");
	const english = (Array.isArray(record.descriptions) ? record.descriptions : []).find((item) => isRecord(item) && item.lang === "en");
	const summary = isRecord(english) ? str(english.value) : "";
	vuln.summary = summary.slice(0, 700);
	vuln.title = summary ? summary.split(". ")[0].slice(0, 180) : id;
	vuln.published = toIso(str(record.published));
	vuln.modified = toIso(str(record.lastModified));
	const chosen = pickMetric(isRecord(record.metrics) ? record.metrics : {});
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
	const firstWeak = (Array.isArray(record.weaknesses) ? record.weaknesses : []).find(isRecord);
	const weakEn = (firstWeak && Array.isArray(firstWeak.description) ? firstWeak.description : []).find((item) => isRecord(item) && item.lang === "en");
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
function pickMetric(metrics) {
	for (const key of [
		"cvssMetricV31",
		"cvssMetricV40",
		"cvssMetricV30",
		"cvssMetricV2"
	]) {
		const arr = metrics[key];
		if (!Array.isArray(arr) || !arr.length) continue;
		const chosen = arr.find((item) => isRecord(item) && item.type === "Primary") ?? arr[0];
		if (isRecord(chosen)) return chosen;
	}
	return null;
}
function parseRedHatList(data) {
	if (!Array.isArray(data)) throw new Error("Red Hat response was not a CVE list");
	return data.filter(isRecord).map((item) => {
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
		const packages = Array.isArray(item.affected_packages) ? item.affected_packages.map((pkg) => typeof pkg === "string" ? pkg : "").filter(Boolean).slice(0, 8) : [];
		vuln.vendor = "Red Hat";
		vuln.product = "Enterprise Linux";
		vuln.redhat = {
			severity: str(item.severity),
			bugzilla: str(item.bugzilla) || null,
			statement: null,
			packages
		};
		vuln.patch = patchFromRedHat(stringList(item.advisories), fixStates(item.package_state));
		if (str(item.resource_url)) addRef(vuln, str(item.resource_url), "Red Hat CVE", "redhat");
		if (str(item.bugzilla)) addRef(vuln, `https://bugzilla.redhat.com/show_bug.cgi?id=${str(item.bugzilla)}`, "Red Hat Bugzilla", "redhat");
		return vuln;
	}).filter((vuln) => vuln.id.startsWith("CVE-"));
}
function parseRedHatDetail(data, id) {
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
	const packages = [];
	const errata = [];
	if (Array.isArray(data.affected_release)) for (const rel of data.affected_release) {
		if (!isRecord(rel)) continue;
		if (str(rel.package)) packages.push(str(rel.package));
		if (str(rel.advisory)) errata.push(str(rel.advisory));
	}
	const states = [];
	if (Array.isArray(data.package_state)) for (const rel of data.package_state) {
		if (!isRecord(rel)) continue;
		if (str(rel.package_name)) packages.push(str(rel.package_name));
		if (str(rel.fix_state)) states.push(str(rel.fix_state));
	}
	vuln.vendor = "Red Hat";
	vuln.product = vuln.product || "Enterprise Linux";
	vuln.redhat = {
		severity: str(data.threat_severity) || str(data.severity),
		bugzilla: bug ? str(bug.id) || null : null,
		statement: statement.slice(0, 700) || null,
		packages: packages.slice(0, 8)
	};
	vuln.patch = patchFromRedHat([...errata, ...stringList(data.advisories)], states);
	if (bug && str(bug.url)) addRef(vuln, str(bug.url), "Red Hat Bugzilla", "redhat");
	addRef(vuln, `https://access.redhat.com/security/cve/${id}`, "Red Hat CVE", "redhat");
	return vuln;
}
function splitCsvLine(line) {
	const out = [];
	let current = "";
	let quoted = false;
	for (let i = 0; i < line.length; i += 1) {
		const ch = line[i];
		if (quoted) {
			if (ch === "\"") {
				if (line[i + 1] === "\"") {
					current += "\"";
					i += 1;
				} else quoted = false;
			} else current += ch;
		} else if (ch === "\"") quoted = true;
		else if (ch === ",") {
			out.push(current.trim());
			current = "";
		} else current += ch;
	}
	out.push(current.trim());
	return out;
}
function parseCsv(text, source) {
	const lines = text.split(/\r?\n/).filter((line) => line.trim());
	if (lines.length < 2) throw new Error("CSV needs a header and at least one row");
	const header = splitCsvLine(lines[0]).map((cell) => cell.toLowerCase());
	const cveIdx = header.findIndex((cell) => cell.includes("cve"));
	if (cveIdx < 0) throw new Error("CSV needs a column with CVE in the name");
	const sevIdx = header.findIndex((cell) => cell.includes("sev"));
	const descIdx = header.findIndex((cell) => /desc|summary|title|name/.test(cell));
	const dateIdx = header.findIndex((cell) => /date|published/.test(cell));
	const scoreIdx = header.findIndex((cell) => /cvss|score/.test(cell));
	const vulns = [];
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
function readCve(record) {
	for (const key of [
		"cveID",
		"CVE",
		"cve",
		"cve_id",
		"cveId"
	]) {
		const ids = extractCves(str(record[key]));
		if (ids.length) return ids[0];
	}
	return extractCves(str(record.id))[0] || "";
}
function unwrapRecords(data) {
	if (Array.isArray(data)) return data.filter(isRecord);
	if (!isRecord(data)) return [];
	for (const key of [
		"vulnerabilities",
		"items",
		"data",
		"cves",
		"results"
	]) if (Array.isArray(data[key])) return data[key].filter(isRecord);
	return [data];
}
function parseLooseJson(data, source) {
	if (isRecord(data) && Array.isArray(data.vulnerabilities) && data.vulnerabilities.some((item) => isRecord(item) && "cveID" in item)) return {
		vulns: parseKev(data, source).vulns,
		advisories: []
	};
	const vulns = [];
	const advisories = [];
	for (const record of unwrapRecords(data).slice(0, 300)) {
		const id = readCve(record);
		if (id) {
			const vuln = emptyVuln(id, source);
			const summary = str(record.shortDescription) || str(record.description) || str(record.summary) || str(record.details);
			vuln.title = (str(record.vulnerabilityName) || str(record.title) || str(record.name) || summary.split(". ")[0] || id).slice(0, 180);
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
			cves: extractCves(`${title} ${summary}`).slice(0, 8)
		});
	}
	if (!vulns.length && !advisories.length) throw new Error("JSON had no CVEs or titled links");
	return {
		vulns,
		advisories
	};
}
var STORY_FLUFF = /password hygiene|bad password|survey|gift card|holiday scam|tips for (families|parents|kids)|what is (a |an )?(vpn|password|phishing)|how to (spot|avoid|stay safe)|% of (americans|users|people)/i;
var STORY_SIGNAL = /cve-\d|exploit|ransomware|0-day|zero-day|kev|vulnerabilit|advisory|patch|breach|intrusion|malware|backdoor|actively|attack/i;
function parseWire(data, source) {
	if (!isRecord(data) || !Array.isArray(data.items)) throw new Error("Wire payload was not the expected list");
	const notes = [];
	for (const row of data.items.filter(isRecord)) {
		const title = str(row.title);
		const href = str(row.url);
		const summary = str(row.summary);
		if (!title || !href.startsWith("https://")) continue;
		const text = `${title} ${summary}`;
		if (STORY_FLUFF.test(text) && !/cve-\d/i.test(text)) continue;
		if (!STORY_SIGNAL.test(text)) continue;
		const publisher = isRecord(row.source) ? str(row.source.name) : "";
		const listed = Array.isArray(row.cves) ? row.cves.filter((item) => typeof item === "string") : [];
		const cves = (listed.length ? listed : extractCves(text)).map((item) => item.toUpperCase()).slice(0, 8);
		notes.push({
			id: `${source}:${href}`,
			source,
			title: title.slice(0, 220),
			href,
			published: toIso(str(row.published)),
			summary: [publisher, summary].filter(Boolean).join(" — ").slice(0, 700),
			cves
		});
		if (notes.length >= 24) break;
	}
	if (!notes.length) throw new Error("Wire had no operational stories");
	return notes;
}
function parseClaims(data, source) {
	if (!Array.isArray(data)) throw new Error("Claims feed was not a list");
	const notes = [];
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
			cves: []
		});
	}
	if (!notes.length) throw new Error("Claims feed had no public records");
	return notes;
}
function parseGhsa(data, source) {
	if (!Array.isArray(data)) throw new Error("GitHub advisories were not a list");
	const vulns = [];
	const advisories = [];
	for (const row of data.filter(isRecord).slice(0, 20)) {
		const ghsa = str(row.ghsa_id).toUpperCase();
		const cve = str(row.cve_id).toUpperCase();
		const title = str(row.summary) || ghsa || cve;
		const href = str(row.html_url);
		const summary = str(row.description);
		const published = toIso(str(row.published_at));
		const id = cve.startsWith("CVE-") ? cve : ghsa;
		if (!id || !title) continue;
		if (href.startsWith("https://")) advisories.push({
			id: `${source}:${href}`,
			source,
			title: title.slice(0, 220),
			href,
			published,
			summary: summary.slice(0, 700),
			cves: cve.startsWith("CVE-") ? [cve] : []
		});
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
	return {
		vulns,
		advisories
	};
}
function parseSansCountries(data) {
	if (!Array.isArray(data)) throw new Error("DShield country list was not an array");
	const rows = [];
	for (const row of data.filter(isRecord)) {
		const country = str(row.country).toUpperCase();
		if (!/^[A-Z]{2}$/.test(country)) continue;
		const sources = num(row.sources) ?? 0;
		const reports = num(row.reports) ?? 0;
		if (sources <= 0) continue;
		rows.push({
			country,
			sources,
			reports
		});
	}
	if (!rows.length) throw new Error("DShield returned no countries");
	return rows;
}
function parseFeodo(data) {
	if (!Array.isArray(data)) throw new Error("Feodo list was not an array");
	const tally = (onlineOnly) => {
		const counts = /* @__PURE__ */ new Map();
		for (const row of data.filter(isRecord)) {
			const country = str(row.country).toUpperCase();
			if (!/^[A-Z]{2}$/.test(country)) continue;
			if (onlineOnly && str(row.status).toLowerCase() === "offline") continue;
			counts.set(country, (counts.get(country) ?? 0) + 1);
		}
		return counts;
	};
	const counts = tally(true).size ? tally(true) : tally(false);
	const rows = Array.from(counts, ([country, sources]) => ({
		country,
		sources,
		reports: sources
	}));
	if (!rows.length) throw new Error("Feodo returned no countries");
	return rows;
}
async function fetchText(url, headers) {
	const response = await fetch(url, {
		signal: AbortSignal.timeout(22e3),
		headers: {
			Accept: "application/json, application/rss+xml, application/atom+xml, application/xml, text/xml, text/html, */*",
			...headers ?? {}
		}
	});
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	if (response.headers.get("x-lantern-error")) throw new Error(await response.text());
	return response.text();
}
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
var nvdTail = Promise.resolve();
var nvdNext = 0;
function nvdSlot(hasKey, task) {
	if (hasKey) return task();
	const run = nvdTail.then(async () => {
		const wait = Math.max(0, nvdNext - Date.now());
		if (wait) await sleep(wait);
		try {
			return await task();
		} finally {
			nvdNext = Date.now() + 6500;
		}
	});
	nvdTail = run.then(() => void 0, () => void 0);
	return run;
}
async function fetchNvd(url, apiKey) {
	const headers = apiKey ? { apiKey } : {};
	return nvdSlot(Boolean(apiKey), async () => {
		try {
			return await fetchText(url, headers);
		} catch (error) {
			const message = error instanceof Error ? error.message : "";
			if (!/HTTP (403|429|503)/.test(message)) throw error;
			await sleep(apiKey ? 2e3 : 8e3);
			return fetchText(url, headers);
		}
	});
}
function relayUrl(base, feed) {
	const trimmed = base.trim() || "/api/relay";
	if (trimmed.startsWith("/")) return `${trimmed}${trimmed.includes("?") ? "&" : "?"}feed=${encodeURIComponent(feed)}`;
	const url = new URL(trimmed);
	url.searchParams.set("feed", feed);
	return url.toString();
}
async function readSource(feed, relayBase) {
	const urls = [feed.direct, ...feed.mirrors ?? []].filter((item) => Boolean(item));
	const errors = [];
	for (const url of urls) try {
		return await fetchText(url);
	} catch (error) {
		errors.push(error instanceof Error ? error.message : "unreachable");
	}
	if (feed.relay) try {
		return await fetchText(relayUrl(relayBase, feed.relay));
	} catch (error) {
		const relayError = error instanceof Error ? error.message : "relay failed";
		errors.push(errors.length ? `host ${relayError}` : relayError);
	}
	throw new Error(errors.join("; ") || "This feed has no address");
}
function nvdStamp$1(date) {
	return date.toISOString().slice(0, 19) + ".000";
}
async function readNvdPage(apiKey, query) {
	const base = `https://services.nvd.nist.gov/rest/json/cves/2.0?${query}&resultsPerPage=20`;
	const firstText = await fetchNvd(base, apiKey);
	const total = JSON.parse(firstText).totalResults ?? 0;
	if (total <= 0) return [];
	return parseNvd(total > 20 ? JSON.parse(await fetchNvd(`${base}&startIndex=${Math.max(0, total - 20)}`, apiKey)) : JSON.parse(firstText));
}
async function loadNvd(apiKey, relayBase) {
	const end = /* @__PURE__ */ new Date();
	return loadNvdFeed(apiKey, relayBase, "nvd", `pubStartDate=${nvdStamp$1(/* @__PURE__ */ new Date(end.getTime() - 5184e5))}&pubEndDate=${nvdStamp$1(end)}`);
}
async function loadNvdQuery(apiKey, relayBase, id, query, fallback) {
	if (!apiKey) try {
		const text = await nvdSlot(false, () => fetchText(relayUrl(relayBase, id)));
		return {
			vulns: parseNvd(JSON.parse(text)),
			advisories: []
		};
	} catch {}
	let vulns = await readNvdPage(apiKey, query);
	if (!vulns.length && fallback) vulns = await readNvdPage(apiKey, fallback);
	return {
		vulns,
		advisories: []
	};
}
async function loadNvdFeed(apiKey, relayBase, id, query) {
	return loadNvdQuery(apiKey, relayBase, id, query);
}
async function loadEpss(ids) {
	const scores = /* @__PURE__ */ new Map();
	for (let index = 0; index < ids.length; index += 40) {
		const chunk = ids.slice(index, index + 40);
		if (!chunk.length) continue;
		const payload = JSON.parse(await fetchText(`https://api.first.org/data/v1/epss?cve=${chunk.join(",")}`));
		for (const row of payload.data ?? []) {
			if (!row.cve) continue;
			const epss = Number(row.epss);
			const percentile = Number(row.percentile);
			if (Number.isNaN(epss)) continue;
			scores.set(row.cve.toUpperCase(), {
				epss,
				percentile: Number.isNaN(percentile) ? 0 : percentile
			});
		}
	}
	return scores;
}
function applyEpss(vulns, scores) {
	if (!scores.size) return vulns;
	return vulns.map((vuln) => {
		const score = scores.get(vuln.id);
		if (!score) return vuln;
		return {
			...vuln,
			epss: score.epss,
			epssPercentile: score.percentile
		};
	});
}
async function enrichVuln(id, apiKey) {
	const headers = apiKey ? { apiKey } : {};
	const [nvd, redhat, epss] = await Promise.allSettled([
		fetchText(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${encodeURIComponent(id)}`, headers).then((text) => parseNvd(JSON.parse(text))),
		fetchText(`https://access.redhat.com/hydra/rest/securitydata/cve/${encodeURIComponent(id)}.json`).then((text) => {
			const detail = parseRedHatDetail(JSON.parse(text), id);
			return detail ? [detail] : [];
		}),
		loadEpss([id])
	]);
	const vulns = [];
	if (nvd.status === "fulfilled") vulns.push(...nvd.value);
	if (redhat.status === "fulfilled") vulns.push(...redhat.value);
	if (epss.status === "fulfilled") {
		const score = epss.value.get(id);
		if (score) {
			const carrier = vulns[0] ? { ...vulns[0] } : null;
			if (carrier) {
				carrier.epss = score.epss;
				carrier.epssPercentile = score.percentile;
				vulns[0] = carrier;
			} else {
				const stub = emptyVuln(id, "epss");
				stub.epss = score.epss;
				stub.epssPercentile = score.percentile;
				vulns.push(stub);
			}
		}
	}
	if (!vulns.length) {
		const reason = [
			nvd,
			redhat,
			epss
		].find((item) => item.status === "rejected");
		throw new Error(reason && reason.status === "rejected" && reason.reason instanceof Error ? reason.reason.message : "No detail sources answered");
	}
	return vulns;
}
async function loadBuiltin(feed, relayBase, apiKey) {
	if (feed.kind === "epss") return {
		vulns: [],
		advisories: []
	};
	if (feed.kind === "nvd") return loadNvd(apiKey, relayBase);
	if (feed.kind === "nvd-query") {
		if (!feed.query) throw new Error("Stack query is missing");
		return loadNvdQuery(apiKey, relayBase, feed.id, feed.query, feed.fallbackQuery);
	}
	const text = await readSource(feed, relayBase);
	if (feed.kind === "kev") {
		const parsed = parseKev(JSON.parse(text));
		return {
			vulns: parsed.vulns,
			advisories: [],
			meta: {
				kevCatalog: parsed.catalog,
				kevCount: parsed.count
			}
		};
	}
	if (feed.kind === "redhat") return {
		vulns: parseRedHatList(JSON.parse(text)),
		advisories: []
	};
	if (feed.kind === "nsa") {
		const advisories = parseNsaHtml(text);
		return {
			advisories,
			vulns: shellsFromAdvisories(advisories)
		};
	}
	if (feed.kind === "sighting") return {
		vulns: [],
		advisories: [],
		sightings: feed.id === "feodo" ? parseFeodo(JSON.parse(text)) : parseSansCountries(JSON.parse(text))
	};
	if (feed.kind === "wire") {
		const advisories = parseWire(JSON.parse(text), feed.id);
		return {
			advisories,
			vulns: shellsFromAdvisories(advisories)
		};
	}
	if (feed.kind === "claims") return {
		advisories: parseClaims(JSON.parse(text), feed.id),
		vulns: []
	};
	if (feed.kind === "ghsa") return parseGhsa(JSON.parse(text), feed.id);
	const advisories = parseRss(text, feed.id);
	return {
		advisories,
		vulns: shellsFromAdvisories(advisories)
	};
}
async function loadCustom(connector) {
	const url = new URL(connector.url);
	if (url.protocol !== "https:") throw new Error("Custom connectors must use https");
	const text = await fetchText(url.toString());
	if (connector.format === "rss") {
		const advisories = parseRss(text, connector.id);
		return {
			advisories,
			vulns: shellsFromAdvisories(advisories)
		};
	}
	if (connector.format === "csv") return {
		vulns: parseCsv(text, connector.id),
		advisories: []
	};
	const parsed = parseLooseJson(JSON.parse(text), connector.id);
	return {
		vulns: parsed.vulns,
		advisories: parsed.advisories
	};
}
var RANK = {
	UNKNOWN: 0,
	LOW: 1,
	MEDIUM: 2,
	HIGH: 3,
	CRITICAL: 4
};
function preferText(current, next, id) {
	const clean = (value) => value.trim();
	const a = clean(current);
	const b = clean(next);
	if (!a || a === id) return b || a;
	if (!b || b === id) return a;
	return b.length > a.length ? b : a;
}
function mergeRefs(a, b) {
	const out = [...a];
	for (const ref of b) {
		if (out.some((item) => item.href === ref.href)) continue;
		if (out.length >= 10) break;
		out.push(ref);
	}
	return out;
}
function mergeVuln(a, b) {
	const sources = Array.from(/* @__PURE__ */ new Set([...a.sources, ...b.sources]));
	const cvss = a.cvss == null ? b.cvss : b.cvss == null ? a.cvss : Math.max(a.cvss, b.cvss);
	const vector = (cvss === b.cvss ? b.vector : a.vector) || a.vector || b.vector;
	let severity = a.severity;
	if (b.cvss != null && (a.cvss == null || b.cvss > a.cvss) && b.severity !== "UNKNOWN") severity = b.severity;
	else if (a.severity === "UNKNOWN") severity = b.severity;
	else if (b.severity !== "UNKNOWN" && a.cvss == null && b.cvss == null && RANK[b.severity] > RANK[a.severity]) severity = b.severity;
	return {
		id: a.id,
		title: preferText(a.title, b.title, a.id),
		summary: preferText(a.summary, b.summary, a.id),
		severity,
		cvss,
		vector,
		published: a.published && b.published ? a.published < b.published ? a.published : b.published : a.published || b.published,
		modified: a.modified && b.modified ? a.modified > b.modified ? a.modified : b.modified : a.modified || b.modified,
		sources,
		vendor: a.vendor || b.vendor,
		product: a.product || b.product,
		cwe: a.cwe || b.cwe,
		kev: a.kev || b.kev,
		redhat: b.redhat ? {
			...b.redhat,
			statement: b.redhat.statement || a.redhat?.statement || null,
			packages: b.redhat.packages.length ? b.redhat.packages : a.redhat?.packages || []
		} : a.redhat,
		patch: mergePatch(a.patch, b.patch),
		epss: b.epss ?? a.epss,
		epssPercentile: b.epssPercentile ?? a.epssPercentile,
		references: mergeRefs(a.references, b.references)
	};
}
function mergeAll(list) {
	const map = /* @__PURE__ */ new Map();
	for (const vuln of list) {
		const id = vuln.id.toUpperCase();
		const prev = map.get(id);
		map.set(id, prev ? mergeVuln(prev, {
			...vuln,
			id
		}) : {
			...vuln,
			id
		});
	}
	return Array.from(map.values());
}
function replaceAdvisories(current, source, incoming) {
	return [...current.filter((item) => item.source !== source), ...incoming];
}
function maskVulns(vulns, enabled) {
	return vulns.map((vuln) => ({
		...vuln,
		sources: vuln.sources.filter((source) => enabled.has(source)),
		kev: enabled.has("cisa-kev") ? vuln.kev : null,
		redhat: enabled.has("redhat") ? vuln.redhat : null
	})).filter((vuln) => vuln.sources.length > 0);
}
function forgetSource(vulns, advisories, source) {
	return {
		vulns: vulns.map((vuln) => ({
			...vuln,
			sources: vuln.sources.filter((item) => item !== source)
		})).filter((vuln) => vuln.sources.length > 0),
		advisories: advisories.filter((item) => item.source !== source)
	};
}
function matchesWatch(vuln, terms) {
	if (!terms.length) return false;
	const blob = `${vuln.id} ${vuln.title} ${vuln.summary} ${vuln.vendor ?? ""} ${vuln.product ?? ""}`.toLowerCase();
	return terms.some((term) => term && blob.includes(term.toLowerCase()));
}
function dateOrEmpty(value) {
	return value || "";
}
function filterVulns(vulns, query, terms, today = utcDay()) {
	const q = query.q.trim().toLowerCase();
	const sevs = query.sev === "all" ? null : new Set(query.sev.split(",").filter(Boolean));
	const recentPub = utcDay(-45);
	const recentKev = utcDay(-120);
	return vulns.filter((vuln) => {
		if (sevs && !sevs.has(vuln.severity)) return false;
		if (query.kev && !vuln.kev) return false;
		if (query.ransom && vuln.kev?.ransomware !== "Known") return false;
		if (query.fix === "yes" && patchOf(vuln).state !== "yes") return false;
		if (query.fix === "no" && patchOf(vuln).state !== "no") return false;
		if (query.watch && !matchesWatch(vuln, terms)) return false;
		if (query.scope === "active") {
			const published = vuln.published?.slice(0, 10) ?? "";
			const added = vuln.kev?.dateAdded ?? "";
			const hot = vuln.severity === "CRITICAL" || vuln.severity === "HIGH";
			const due = vuln.kev?.dueDate ?? "";
			const dueSoon = Boolean(due) && due <= utcDay(21);
			if (!(published >= recentPub || added >= recentKev || hot || dueSoon)) return false;
		}
		if (!q) return true;
		return `${vuln.id} ${vuln.title} ${vuln.summary} ${vuln.vendor ?? ""} ${vuln.product ?? ""} ${vuln.cwe ?? ""}`.toLowerCase().includes(q);
	});
}
function sortVulns(vulns, sort) {
	const copy = [...vulns];
	copy.sort((a, b) => {
		if (sort === "cvss") return (b.cvss ?? -1) - (a.cvss ?? -1);
		if (sort === "epss") return (b.epss ?? -1) - (a.epss ?? -1);
		if (sort === "due") return (a.kev?.dueDate || "9999-99-99").localeCompare(b.kev?.dueDate || "9999-99-99");
		if (sort === "modified") return dateOrEmpty(b.modified).localeCompare(dateOrEmpty(a.modified));
		return dateOrEmpty(b.published).localeCompare(dateOrEmpty(a.published));
	});
	return copy;
}
function priorityScore(vuln, today = utcDay()) {
	let score = vuln.cvss ?? 0;
	if (vuln.kev) score += 12;
	if (vuln.kev && patchOf(vuln).state === "no") score += 4;
	const due = vuln.kev?.dueDate;
	if (due && due < today) score += 8;
	else if (due && due <= utcDay(14)) score += 4;
	if (vuln.epss != null) score += vuln.epss * 10;
	if (vuln.severity === "CRITICAL") score += 3;
	if (vuln.severity === "HIGH") score += 1;
	return score;
}
function priorityIds(vulns, limit) {
	return [...vulns].sort((a, b) => priorityScore(b) - priorityScore(a)).slice(0, limit).map((vuln) => vuln.id);
}
var WIRE_FLUFF = /password hygiene|bad password|survey|gift card|holiday scam|how to stay safe|what is a vpn|percent of americans|chose a bad password/i;
function wireScore(note, terms) {
	const text = `${note.title} ${note.summary}`;
	const fluff = WIRE_FLUFF.test(text);
	if (fluff && !note.cves.length) return 0;
	let score = 1;
	const blob = text.toLowerCase();
	if (terms.some((term) => term && blob.includes(term.toLowerCase()))) score += 10;
	if (note.cves.length) score += 4;
	const day = note.published?.slice(0, 10) ?? "";
	if (day >= utcDay(-7)) score += 3;
	else if (day >= utcDay(-30)) score += 1;
	if ([
		"cisa-advisory",
		"msrc",
		"certcc",
		"ncsc",
		"acsc",
		"nsa",
		"paloalto",
		"cisco",
		"fortinet",
		"certfr",
		"bsi"
	].includes(note.source)) score += 2;
	if (fluff) score -= 3;
	return score;
}
var SNAPSHOT = {
	generatedAt: "2026-11-15T04:25:05Z",
	kevCatalog: "2026.11.13",
	kevCount: 1781,
	vulns: [
		{
			"id": "CVE-2026-114713",
			"title": "UnrealIRCd Improper Neutralization of Delimiters Vulnerability",
			"summary": "UnrealIRCd UnrealIRCd contains an improper neutralization of delimiters vulnerability that allows any user on a network with two or more linked servers to inject server-to-server commands that are executed with server authority.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-13T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "UnrealIRCd",
			"product": "UnrealIRCd",
			"cwe": null,
			"kev": {
				"name": "UnrealIRCd Improper Neutralization of Delimiters Vulnerability",
				"dateAdded": "2026-11-13",
				"dueDate": "2026-11-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://forums.unrealircd.org/viewtopic.php?t=9487 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-114713"
			},
			"redhat": null,
			"epss": .00508,
			"epssPercentile": .43896,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-123039",
			"title": "Check Point Multiple Products Incorrect Permission Assignment for Critical Resource Vulnerability",
			"summary": "Check Point Firewall, Multi-Domain Security Management Server, Scalable Platforms, Security Gateway, and Security Management Server contain an incorrect permissions assignment for critical resources vulnerability when the Gaia OS DynamicCLI daemon runs as root and listens on a world-writable local socket without authenticating connecting processes. An authenticated local user can send a command to the socket and have it executed as root.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-13T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Check Point",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Check Point Multiple Products Incorrect Permission Assignment for Critical Resource Vulnerability",
				"dateAdded": "2026-11-13",
				"dueDate": "2026-11-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.checkpoint.com/results/sk/sk1000362 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-123039"
			},
			"redhat": null,
			"epss": .02191,
			"epssPercentile": .82739,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-124194",
			"title": "Microsoft Office Outlook Missing User Interaction for Potentially Unsafe Action Vulnerability",
			"summary": "Microsoft Office Outlook contains a missing user interaction for potentially unsafe action vulnerability that allows an unauthorized attacker to perform spoofing over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Office",
			"cwe": null,
			"kev": {
				"name": "Microsoft Office Outlook Missing User Interaction for Potentially Unsafe Action Vulnerability",
				"dateAdded": "2026-11-10",
				"dueDate": "2026-11-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-124194 ; https://nvd.nist.gov/vuln/detail/CVE-2026-124194"
			},
			"redhat": null,
			"epss": .0162,
			"epssPercentile": .7647,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-111793",
			"title": "Openwave Messaging Limited Webtop Media Transcoder Incorrect Resource Transfer Between Spheres Vulnerability",
			"summary": "Openwave Messaging Limited Webtop Media Transcoder contains an incorrect resource transfer between spheres vulnerability that may allow an authenticated user to process and convert unintended document types if bypassing the Webmail experience.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Openwave Messaging Limited",
			"product": "Webtop Media Transcoder",
			"cwe": null,
			"kev": {
				"name": "Openwave Messaging Limited Webtop Media Transcoder Incorrect Resource Transfer Between Spheres Vulnerability",
				"dateAdded": "2026-11-10",
				"dueDate": "2026-11-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/GISOpenwave/security-advisories-public/blob/main/CAN-2026-2032674.md ; https://jvn.jp/en/vu/JVNVU93403064/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd."
			},
			"redhat": null,
			"epss": .00638,
			"epssPercentile": .51153,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20320",
			"title": "Cisco BroadWorks Improper Restriction of XML External Entity Reference Vulnerability",
			"summary": "Cisco BroadWorks contains an improper restriction of XML external entity reference vulnerability that could allow an unauthenticated, remote attacker to read sensitive configuration information on an affected system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "BroadWorks",
			"cwe": null,
			"kev": {
				"name": "Cisco BroadWorks Improper Restriction of XML External Entity Reference Vulnerability",
				"dateAdded": "2026-11-10",
				"dueDate": "2026-11-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-bworks-xxe-uwUd7CEt ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detai"
			},
			"redhat": null,
			"epss": .00976,
			"epssPercentile": .62656,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-111560",
			"title": "Barracuda Networks Multiple Products OS Command Injection Vulnerability",
			"summary": "Barracuda Networks Email Security Gateway (ESG), Load Balancer, Application Delivery Controller (ADC), Message Archiver (BMA), WAF Control Center (WCC), Web Application Firewall (WAF), and Web Security Gateway (WSG) contain an OS command injection vulnerability. This vulnerability could allow an authenticated administrator to inject OS commands that execute with root privileges when the crafted timezone value is subsequently processed. This vulnerability can be chained with CVE-2026-116606",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Barracuda Networks",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Barracuda Networks Multiple Products OS Command Injection Vulnerability",
				"dateAdded": "2026-11-10",
				"dueDate": "2026-11-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection ; https://github.com/mandiant/Vulnerability-Disclosures/blob/master/2026/MNDT-2026-0041.md ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guid"
			},
			"redhat": null,
			"epss": .09082,
			"epssPercentile": .95375,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-116606",
			"title": "Barracuda Networks Email Security Gateway (ESG) Authentication Bypass Using an Alternate Path or Channel Vulnerability",
			"summary": "Barracuda Networks Email Security Gateway (ESG) contains an authentication bypass using an alternate path or channel that could allow an unauthenticated remote attacker to invoke a configuration-import function and restore a crafted, compatible backup archive, resulting in unauthorized modification of the appliance’s global configuration. This vulnerability can be chained with CVE-2026-111560.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Barracuda Networks",
			"product": "Barracuda Email Security Gateway (ESG)",
			"cwe": null,
			"kev": {
				"name": "Barracuda Networks Email Security Gateway (ESG) Authentication Bypass Using an Alternate Path or Channel Vulnerability",
				"dateAdded": "2026-11-10",
				"dueDate": "2026-11-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://trust.barracuda.com/security/pre-authentication-authorization-bypass-command-injection ; https://github.com/mandiant/Vulnerability-Disclosures/blob/master/2026/MNDT-2026-0042.md ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guid"
			},
			"redhat": null,
			"epss": .10947,
			"epssPercentile": .95956,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-125350",
			"title": "Google Chromium Use-After-Free Vulnerability",
			"summary": "Google Chromium contains a use-after-free vulnerability in the XML component that could allow a remote attacker to execute arbitrary code inside the sandbox via a specially crafted webpage. This vulnerability could affect multiple web browsers that utilize Chromium, including, but not limited to, Google Chrome, Microsoft Edge, and Opera.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Google",
			"product": "Chromium",
			"cwe": null,
			"kev": {
				"name": "Google Chromium Use-After-Free Vulnerability",
				"dateAdded": "2026-11-10",
				"dueDate": "2026-11-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://chromereleases.googleblog.com/2026/11/stable-channel-update-for-desktop_018223192.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-1"
			},
			"redhat": null,
			"epss": .00962,
			"epssPercentile": .62184,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-102895",
			"title": "GPUStack Improper Authentication Vulnerability",
			"summary": "GPUStack contains an improper authentication vulnerability which could allow unauthenticated administrative access, including user and model changes, persistent administrator API-key creation, disclosure of worker and cloud-provider secrets, and code execution through POST /v2/inference-backends/from-yaml.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "GPUStack",
			"product": "GPUStack",
			"cwe": null,
			"kev": {
				"name": "GPUStack Improper Authentication Vulnerability",
				"dateAdded": "2026-11-09",
				"dueDate": "2026-11-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://github.com/gpustack/gpustack/security/advisories/GHSA-gj9m-f8ph-pmhr ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requ"
			},
			"redhat": null,
			"epss": .00517,
			"epssPercentile": .44564,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-123158",
			"title": "OpenBSD OpenSSH Unexpected Status Code or Return Value Vulnerability",
			"summary": "OpenBSD OpenSSH on Linux contains an unexpected status code or return value vulnerability that could allow for authentication bypass.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "OpenBSD",
			"product": "OpenSSH",
			"cwe": null,
			"kev": {
				"name": "OpenBSD OpenSSH Unexpected Status Code or Return Value Vulnerability",
				"dateAdded": "2026-11-09",
				"dueDate": "2026-11-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://www.openssh.org/releasenotes.html ; https://alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass/ ; https://github.com/openssh/openssh-portable/commit/4353fdc43ef646c43a8dda7025cc1a89"
			},
			"redhat": null,
			"epss": .189,
			"epssPercentile": .97341,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-116779",
			"title": "SignalWire FreeSwitch Code Injection Vulnerability",
			"summary": "SignalWire FreeSwitch contains a code injection vulnerability that permits configuration and credential disclosure, arbitrary call control, and command execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SignalWire",
			"product": "FreeSwitch",
			"cwe": null,
			"kev": {
				"name": "SignalWire FreeSwitch Code Injection Vulnerability",
				"dateAdded": "2026-11-09",
				"dueDate": "2026-11-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://github.com/signalwire/freeswitch/security/advisories/GHSA-mg63-h38w-8p9p ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Re"
			},
			"redhat": null,
			"epss": .02473,
			"epssPercentile": .84795,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-123218",
			"title": "IBM Aspera Faspex Incorrect Authorization Vulnerability",
			"summary": "IBM Aspera Faspex contains an incorrect authorization vulnerability that could allow an authenticated user to craft a specific message to bypass authorization, causing privilege escalations.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "IBM",
			"product": "Aspera Faspex",
			"cwe": null,
			"kev": {
				"name": "IBM Aspera Faspex Incorrect Authorization Vulnerability",
				"dateAdded": "2026-11-09",
				"dueDate": "2026-11-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.ibm.com/support/pages/node/7295921 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-123218"
			},
			"redhat": null,
			"epss": .00535,
			"epssPercentile": .45707,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-19868",
			"title": "SonicWall SonicOS SSLVPN Use of Single-factor Authentication Vulnerability",
			"summary": "SonicWall SonicOS SSLVPN contains a use of single-factor authentication vulnerability that may allow a user with valid credentials for an alternate authentication method to bypass SAML authentication controls. Successful exploitation may also bypass SAML-enforced multi-factor authentication (MFA).",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-06T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SonicWall",
			"product": "SonicOS SSLVPN",
			"cwe": null,
			"kev": {
				"name": "SonicWall SonicOS SSLVPN Use of Single-factor Authentication Vulnerability",
				"dateAdded": "2026-11-06",
				"dueDate": "2026-11-20",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0014 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-19868"
			},
			"redhat": null,
			"epss": .00532,
			"epssPercentile": .45539,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2024-27834",
			"title": "Apple Multiple Products Improper Authentication Vulnerability",
			"summary": "Apple iOS, iPadOS, macOS, Safari, tvOS and watchOS 10.5 contain an improper authentication vulnerability which could allow an attacker with arbitrary read and write capability to bypass pointer authentication.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-04T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Apple",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Apple Multiple Products Improper Authentication Vulnerability",
				"dateAdded": "2026-11-04",
				"dueDate": "2026-11-18",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.apple.com/en-us/120896 ; https://support.apple.com/en-us/120898 ; https://support.apple.com/en-us/120901 ; https://support.apple.com/en-us/120902 ; https://support.apple.com/en-us/120903 ; https://support.apple.com/en-us/120905 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cis"
			},
			"redhat": null,
			"epss": .01502,
			"epssPercentile": .74724,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-119977",
			"title": "WordPress WordPress Core Time-of-check Time-of-use (TOCTOU) Race Condition Vulnerability",
			"summary": "WordPress WordPress Core contains a time-of-check time-of-use (TOCTOU) race condition vulnerability that could allow unauthenticated attackers to execute code on the server during the upgrade window. This is due to predictable, web-accessible staging paths used during full-package core upgrades.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-03T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "WordPress",
			"product": "WordPress Core",
			"cwe": null,
			"kev": {
				"name": "WordPress WordPress Core Time-of-check Time-of-use (TOCTOU) Race Condition Vulnerability",
				"dateAdded": "2026-11-03",
				"dueDate": "2026-11-06",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://wordpress.org/news/2026/10/wordpress-7-1-4 ; https://www.wordfence.com/threat-intel/vulnerabilities/wordpress-core/wordpress-core-470-713-unauthenticated-upgrade-window-staged-installer-remote-code-execution ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives"
			},
			"redhat": null,
			"epss": .01199,
			"epssPercentile": .68666,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-118527",
			"title": "Ivanti Connect Secure Generation of Predictable Numbers or Identifiers Vulnerability",
			"summary": "Ivanti Connect Secure contains a generation of predictable numbers or identifiers vulnerability that allows a remote authenticated attacker to upload files with attacker-controlled content to a known location on disk. This vulnerability can be chained with CVE-2026-104935 and CVE-2026-111357.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-30T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ivanti",
			"product": "Connect Secure",
			"cwe": null,
			"kev": {
				"name": "Ivanti Connect Secure Generation of Predictable Numbers or Identifiers Vulnerability",
				"dateAdded": "2026-10-30",
				"dueDate": "2026-11-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://hub.ivanti.com/s/article/Security-Advisory-Ivanti-Connect-Secure-CVE-2026-104935?language=en_US ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": .00822,
			"epssPercentile": .57883,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-111357",
			"title": "Ivanti Connect Secure Missing Authentication for Critical Function Vulnerability",
			"summary": "Ivanti Connect Secure contains a missing authentication for critical function vulnerability that could allow a local authenticated attacker to escalate their privileges. This vulnerability can be chained with CVE-2026-104935 and CVE-2026-118527.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-30T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ivanti",
			"product": "Connect Secure",
			"cwe": null,
			"kev": {
				"name": "Ivanti Connect Secure Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-10-30",
				"dueDate": "2026-11-02",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://hub.ivanti.com/s/article/Security-Advisory-Ivanti-Connect-Secure-CVE-2026-104935?language=en_US ; https://www.cisa.gov/news-events/alerts/2026/10/13/cisa-urges-patching-newly-exploited-vulnerability-ivanti-connect-secure ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-even"
			},
			"redhat": null,
			"epss": .00533,
			"epssPercentile": .45585,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-97229",
			"title": "GitLab Community Edition and Enterprise Edition Integer Overflow or Wraparound Vulnerability",
			"summary": "GitLab Community Edition and Enterprise Edition contain a integer overflow or wraparound vulnerability that could allow an unauthenticated user to execute arbitrary code on the GitLab server via a specially crafted regular expression in a CI/CD configuration, due to insufficient regular expression validation.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-29T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "GitLab",
			"product": "Community Edition and Enterprise Edition",
			"cwe": null,
			"kev": {
				"name": "GitLab Community Edition and Enterprise Edition Integer Overflow or Wraparound Vulnerability",
				"dateAdded": "2026-10-29",
				"dueDate": "2026-11-01",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "Other products can potentially be affected by the same underlying Ruby/Onigmo Integer Overflow issue in CI/CD Regular Expression Compiler. For more information please see: https://www.ruby-lang.org/en/news/2026/10/23/regexp-fixes-for-gitlab-cves ; https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-4-2-released/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-priori"
			},
			"redhat": null,
			"epss": .69289,
			"epssPercentile": .99369,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-76418",
			"title": "Cisco Secure Firewall ASA Software and Cisco Secure FTD Software Unchecked Return Value to NULL Pointer Dereference Vulnerability",
			"summary": "Cisco Secure Firewall ASA Software and Cisco Secure FTD Software contains an unchecked return value to NULL pointer dereference vulnerability that could allow an unauthenticated, remote attacker to cause the device to reload unexpectedly, resulting in a denial of service (DoS) condition.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-29T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Secure Firewall ASA Software and Cisco Secure FTD Software",
			"cwe": null,
			"kev": {
				"name": "Cisco Secure Firewall ASA Software and Cisco Secure FTD Software Unchecked Return Value to NULL Pointer Dereference Vulnerability",
				"dateAdded": "2026-10-29",
				"dueDate": "2026-11-01",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/v"
			},
			"redhat": null,
			"epss": .00821,
			"epssPercentile": .57859,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-41709",
			"title": "Broadcom VMWare ESX Insufficient Logging Vulnerability",
			"summary": "Broadcom VMWare ESX contains an insufficient logging vulnerability that could allow a malicious actor with admin access to perform certain operations without being logged.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-28T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Broadcom",
			"product": "VMware ESX",
			"cwe": null,
			"kev": {
				"name": "Broadcom VMWare ESX Insufficient Logging Vulnerability",
				"dateAdded": "2026-10-28",
				"dueDate": "2026-11-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38017 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vul"
			},
			"redhat": null,
			"epss": .00689,
			"epssPercentile": .53319,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-46300",
			"title": "Linux Kernel Missing Initialization of a Variable Vulnerability",
			"summary": "Linux Kernel contains a missing initialization of a variable vulnerability that could allow for unintended modification of page-cache-backed data via failure to preserve the shared-fragment marker during socket buffer coalescing, causing ESP input processing to decrypt shared fragments in place. This vulnerability can be chained with CVE-2026-109618 and CVE-2026-109619 to implant PHP webshells and run commands as root.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-28T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Linux",
			"product": "Kernel",
			"cwe": null,
			"kev": {
				"name": "Linux Kernel Missing Initialization of a Variable Vulnerability",
				"dateAdded": "2026-10-28",
				"dueDate": "2026-10-31",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://git.kernel.org/stable/c/3599e6b3cc1ada96883d496a50a210d3afbb6987 ; https://git.kernel.org/stable/c/2f2b16022a2e10ca7bccfb98db5ed2ec0f72641c ; https://git.kernel.org/stable/c/9d3e5fd19fe1063bf607219e85"
			},
			"redhat": null,
			"epss": .1613,
			"epssPercentile": .96979,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48356",
			"title": "Adobe Commerce and Magento Unrestricted Upload of File with Dangerous Type Vulnerability",
			"summary": "Adobe Commerce and Magento contain an unrestricted upload of file with dangerous type vulnerability that could result in arbitrary code execution in the context of the current user, potentially gaining elevated access or control over the victim's account or session.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Adobe",
			"product": "Commerce and Magento",
			"cwe": null,
			"kev": {
				"name": "Adobe Commerce and Magento Unrestricted Upload of File with Dangerous Type Vulnerability",
				"dateAdded": "2026-10-27",
				"dueDate": "2026-11-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.adobe.com/trust/security/products/commerce/apsb26-73.html ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-48356"
			},
			"redhat": null,
			"epss": .47472,
			"epssPercentile": .98862,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-111497",
			"title": "Google Brotli Unchecked Return Value Vulnerability",
			"summary": "Google Brotli contains an unchecked return value vulnerability that allows a remote unauthenticated attacker to corrupt adjacent decoder state memory, disclose sensitive memory contents, cause a denial of service, or potentially execute arbitrary code using a crafted Brotli-compressed stream.",
			"severity": "CRITICAL",
			"cvss": null,
			"vector": null,
			"published": "2026-10-27T00:00:00Z",
			"modified": null,
			"sources": [
				"cisa-kev",
				"cisco",
				"paloalto"
			],
			"vendor": "Google",
			"product": "Brotli",
			"cwe": null,
			"kev": {
				"name": "Google Brotli Unchecked Return Value Vulnerability",
				"dateAdded": "2026-10-27",
				"dueDate": "2026-11-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://github.com/google/brotli/releases/tag/v1.2.1 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.ci"
			},
			"redhat": null,
			"epss": .82641,
			"epssPercentile": .99673,
			"references": [
				{
					"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
					"label": "CISA KEV catalog",
					"source": "cisa-kev"
				},
				{
					"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-oct2026-node-js-Jj3SQ19u?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20Node.js%20and%20Brotli%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
					"label": "Vulnerabilities in Node.js and Brotli Affecting Cisco Products: October 2026",
					"source": "cisco"
				},
				{
					"href": "https://security.paloaltonetworks.com/CVE-2026-111497",
					"label": "CVE-2026-111497 Portfolio Status: Impact of Brotli Vulnerability (CVE-2026-111497) on Palo Alto Networks Products (Sever",
					"source": "paloalto"
				}
			]
		},
		{
			"id": "CVE-2026-109618",
			"title": "PHP Memory Corruption Vulnerability",
			"summary": "PHP contains an out-of-memory corruption vulnerability that allows for unauthenticated remote code execution.",
			"severity": "CRITICAL",
			"cvss": null,
			"vector": null,
			"published": "2026-10-26T00:00:00Z",
			"modified": null,
			"sources": [
				"cisa-kev",
				"cisco",
				"paloalto",
				"unit42"
			],
			"vendor": "PHP Group",
			"product": "PHP",
			"cwe": null,
			"kev": {
				"name": "PHP Memory Corruption Vulnerability",
				"dateAdded": "2026-10-26",
				"dueDate": "2026-10-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://www.php.net/ ; https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-"
			},
			"redhat": null,
			"epss": .99999,
			"epssPercentile": .99999,
			"references": [
				{
					"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
					"label": "CISA KEV catalog",
					"source": "cisa-kev"
				},
				{
					"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-php-october26-Jj384Daq?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20PHP%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
					"label": "Vulnerabilities in PHP Affecting Cisco Products: October 2026",
					"source": "cisco"
				},
				{
					"href": "https://security.paloaltonetworks.com/CVE-2026-109618",
					"label": "CVE-2026-109618 Impact of Critical Vulnerabilities in PHP (CVE-2026-109618, CVE-2026-109619) on Palo Alto Networks Produ",
					"source": "paloalto"
				},
				{
					"href": "https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/",
					"label": "Threat Brief: Critical Vulnerabilities in PHP: CVE-2026-109618, CVE-2026-109619 (Updated October 29)",
					"source": "unit42"
				}
			]
		},
		{
			"id": "CVE-2026-109619",
			"title": "PHP Stale Internal Request-State Vulnerability",
			"summary": "PHP contains a stale internal request-state vulnerability that allows for unauthenticated remote code execution.",
			"severity": "CRITICAL",
			"cvss": null,
			"vector": null,
			"published": "2026-10-26T00:00:00Z",
			"modified": null,
			"sources": [
				"cisa-kev",
				"cisco",
				"paloalto",
				"unit42"
			],
			"vendor": "PHP Group",
			"product": "PHP",
			"cwe": null,
			"kev": {
				"name": "PHP Stale Internal Request-State Vulnerability",
				"dateAdded": "2026-10-26",
				"dueDate": "2026-10-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://www.php.net/ ; https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-"
			},
			"redhat": null,
			"epss": .99999,
			"epssPercentile": .99999,
			"references": [
				{
					"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
					"label": "CISA KEV catalog",
					"source": "cisa-kev"
				},
				{
					"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-php-october26-Jj384Daq?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20PHP%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
					"label": "Vulnerabilities in PHP Affecting Cisco Products: October 2026",
					"source": "cisco"
				},
				{
					"href": "https://security.paloaltonetworks.com/CVE-2026-109618",
					"label": "CVE-2026-109618 Impact of Critical Vulnerabilities in PHP (CVE-2026-109618, CVE-2026-109619) on Palo Alto Networks Produ",
					"source": "paloalto"
				},
				{
					"href": "https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/",
					"label": "Threat Brief: Critical Vulnerabilities in PHP: CVE-2026-109618, CVE-2026-109619 (Updated October 29)",
					"source": "unit42"
				}
			]
		},
		{
			"id": "CVE-2026-114625",
			"title": "Arista VeloCloud Orchestrator SQL Injection Vulnerability",
			"summary": "Arista VeloCloud Orchestrator on-prem contains a SQL injection vulnerability that may allow a remote attacker to access privileged internal functionality and impact the VCO host. Successful exploitation may compromise the confidentiality, integrity, and availability of the orchestrator and data managed by the orchestrator.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-23T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Arista",
			"product": "VeloCloud Orchestrator",
			"cwe": null,
			"kev": {
				"name": "Arista VeloCloud Orchestrator SQL Injection Vulnerability",
				"dateAdded": "2026-10-23",
				"dueDate": "2026-10-26",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.arista.com/en/support/advisories-notices/security-advisory/24838-security-advisory-0199 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": .01025,
			"epssPercentile": .64099,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-110447",
			"title": "Collabora Online – Built-in CODE Server OS Command Injection Vulnerability",
			"summary": "Collabora Collabora Online – Built-in CODE Server when used within the NextCloud platform contains an OS command injection vulnerability that allows for remote code execution when the CODE server isn't running.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-23T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Collabora",
			"product": "Collabora Online – Built-in CODE Server",
			"cwe": null,
			"kev": {
				"name": "Collabora Online – Built-in CODE Server OS Command Injection Vulnerability",
				"dateAdded": "2026-10-23",
				"dueDate": "2026-10-26",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://help.nextcloud.com/t/to-collabora-built-in-user-update-asap/250516 ; https://github.com/CollaboraOnline/online/security/advisories/GHSA-g3vx-3m76-fghh ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-"
			},
			"redhat": null,
			"epss": .73307,
			"epssPercentile": .99469,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-106931",
			"title": "EG Secure Solutions SiteGuard Server Edition OS Command Injection Vulnerability",
			"summary": "EG Secure Solutions SiteGuard Server Edition contains an OS command injection vulnerability which may allow an attacker to execute arbitrary OS commands with root or SYSTEM privileges on the system running the affected product.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "EG Secure Solutions",
			"product": "SiteGuard Server Edition",
			"cwe": null,
			"kev": {
				"name": "EG Secure Solutions SiteGuard Server Edition OS Command Injection Vulnerability",
				"dateAdded": "2026-10-20",
				"dueDate": "2026-10-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.eg-secure.co.jp/siteguard/news/alert-202610-1 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-106931"
			},
			"redhat": null,
			"epss": .02528,
			"epssPercentile": .85157,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-96656",
			"title": "Plex Media Server External Control of File Name or Path Vulnerability",
			"summary": "Plex Media Server contains an external control of file name or path vulnerability which can allow an admin user to write arbitrary files that may be executed on load. This vulnerability can be chained with CVE-2026-96652, CVE-2026-96654, and CVE-2026-96655.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Plex",
			"product": "Media Server",
			"cwe": null,
			"kev": {
				"name": "Plex Media Server External Control of File Name or Path Vulnerability",
				"dateAdded": "2026-10-20",
				"dueDate": "2026-10-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": .19767,
			"epssPercentile": .9745,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-96655",
			"title": "Plex Media Server Server-Side Request Forgery (SSRF) Vulnerability",
			"summary": "Plex Media Server contains a server-side request forgery (SSRF) vulnerability that could allow an authenticated user to request arbitrary internal or external addresses via the '/video/:/transcode/universal' path parameter. This vulnerability can be chained with CVE-2026-96652, CVE-2026-96654, and CVE-2026-96656.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Plex",
			"product": "Media Server",
			"cwe": null,
			"kev": {
				"name": "Plex Media Server Server-Side Request Forgery (SSRF) Vulnerability",
				"dateAdded": "2026-10-20",
				"dueDate": "2026-11-03",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": .10724,
			"epssPercentile": .95892,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-96654",
			"title": "Plex Media Server Improper Neutralization of Encoded URI Schemes in a Web Page Vulnerability",
			"summary": "Plex Media Server contains an improper neutralization of encoded URI schemes in a web page vulnerability that could allow an attacker to call other plugins' functions and supply their own parameters. This vulnerability can be chained with CVE-2026-96652, CVE-2026-96655, and CVE-2026-96656.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Plex",
			"product": "Media Server",
			"cwe": null,
			"kev": {
				"name": "Plex Media Server Improper Neutralization of Encoded URI Schemes in a Web Page Vulnerability",
				"dateAdded": "2026-10-20",
				"dueDate": "2026-10-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": .12689,
			"epssPercentile": .96324,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-96652",
			"title": "Plex Media Server Server-Side Request Forgery (SSRF) Vulnerability",
			"summary": "Plex Media Server contains a server-side request forgery (SSRF) vulnerability which could allow an attacker using any X-Plex-Token value to include a full URL in the 'protocol' parameter and force the Plex server to POST to the attacker's chosen destination. This vulnerability can be chained with CVE-2026-96654, CVE-2026-96655, and CVE-2026-96656.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Plex",
			"product": "Media Server",
			"cwe": null,
			"kev": {
				"name": "Plex Media Server Server-Side Request Forgery (SSRF) Vulnerability",
				"dateAdded": "2026-10-20",
				"dueDate": "2026-11-03",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://forums.plex.tv/t/important-security-update-for-plex-media-server-v1-43-2-and-earlier/942319 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": .11886,
			"epssPercentile": .96168,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-110936",
			"title": "Siemens Software Center Uncontrolled Search Path Element Vulnerability",
			"summary": "Siemens Software Center contains an uncontrolled search path element vulnerability that could allow an authenticated local attacker to place a specially crafted DLL in a directory that the application searches, leading to arbitrary code execution with the privileges of the affected application.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Siemens",
			"product": "Software Center",
			"cwe": null,
			"kev": {
				"name": "Siemens Software Center Uncontrolled Search Path Element Vulnerability",
				"dateAdded": "2026-10-20",
				"dueDate": "2026-11-03",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://productcert.siemens.com/productcert/html/ssa-580366.html ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-110936"
			},
			"redhat": null,
			"epss": .00967,
			"epssPercentile": .62285,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-102764",
			"title": "BeyondTrust Remote Support Authentication Bypass by Spoofing Vulnerability",
			"summary": "BeyondTrust Remote Support contains an authentication bypass by spoofing vulnerability that could allow a remote attacker to perform file operations on the appliance.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "BeyondTrust",
			"product": "Remote Support",
			"cwe": null,
			"kev": {
				"name": "BeyondTrust Remote Support Authentication Bypass by Spoofing Vulnerability",
				"dateAdded": "2026-10-16",
				"dueDate": "2026-10-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.beyondtrust.com/trust-center/security-advisories/bt26-05 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-102764"
			},
			"redhat": null,
			"epss": .79485,
			"epssPercentile": .9961,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-61624",
			"title": "Fortinet Multiple Products Path Traversal Vulnerability",
			"summary": "FortiOS, FortiPAM, FortiProxy, and FortiSwitchManager contain a path traversal vulnerability that may allow an authenticated attacker with admin profile and at least read-write permissions to write or delete arbitrary files via specific CLI commands.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Fortinet",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Fortinet Multiple Products Path Traversal Vulnerability",
				"dateAdded": "2026-10-16",
				"dueDate": "2026-10-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://fortiguard.fortinet.com/psirt/FG-IR-26-122 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2025-61624"
			},
			"redhat": null,
			"epss": .01395,
			"epssPercentile": .72838,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-21589",
			"title": "Atlassian Multiple Products Files or Directories Accessible to External Parties Vulnerability",
			"summary": "Multiple Atlassian products (Bitbucket Data Center ,Confluence Data Center, Jira Service Management Data Center, Jira Software Data Center, Bamboo Data Center, Crowd Data Center, Crucible and Fisheye) contain a files or directories accessible to external parties vulnerability which could allow an unauthenticated attacker to access specific files within the web application root directory in affected versions.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-15T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Atlassian",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Atlassian Multiple Products Files or Directories Accessible to External Parties Vulnerability",
				"dateAdded": "2026-10-15",
				"dueDate": "2026-10-18",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://confluence.atlassian.com/security/cve-2026-21589-arbitrary-file-access-vulnerability-impacts-multiple-products-1870495748.html?ref=labs.watchtowr.com ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security"
			},
			"redhat": null,
			"epss": .99664,
			"epssPercentile": .9995,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-105134",
			"title": "Ahsay AhsayCBS Command Injection Vulnerability",
			"summary": "Ahsay AhsayCBS contains a command injection vulnerability that could allow a remote attacker to execute operating system commands via manipulation of the random parameter in the Replication Receiver component’s /rps/api/json/UpdateReceivers.do endpoint. This vulnerability can be chained with CVE-2026-105133.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ahsay",
			"product": "AhsayCBS",
			"cwe": null,
			"kev": {
				"name": "Ahsay AhsayCBS Command Injection Vulnerability",
				"dateAdded": "2026-10-14",
				"dueDate": "2026-10-17",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.ahsay.com/en/company/announcements/patch-cve-105133-105134-update ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-105134"
			},
			"redhat": null,
			"epss": .81763,
			"epssPercentile": .99652,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-76519",
			"title": "Cisco Secure Email Gateway Relative Path Traversal Vulnerability",
			"summary": "Cisco Secure Email Gateway contains a relative path traversal vulnerability that could allow an unauthenticated, remote attacker to write arbitrary files on the underlying operating system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Secure Email Gateway",
			"cwe": null,
			"kev": {
				"name": "Cisco Secure Email Gateway Relative Path Traversal Vulnerability",
				"dateAdded": "2026-10-14",
				"dueDate": "2026-10-17",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-esa-afw-zqYJkjxp ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": .06227,
			"epssPercentile": .93647,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-105133",
			"title": "Ahsay AhsayCBS Improper Authentication Vulnerability",
			"summary": "Ahsay AhsayCBS contains an improper authentication vulnerability that could allow a remote attacker to bypass authentication via manipulation of the random parameter in the API component’s checkSysPwd function. This vulnerability can be chained with CVE-2026-105134.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ahsay",
			"product": "AhsayCBS",
			"cwe": null,
			"kev": {
				"name": "Ahsay AhsayCBS Improper Authentication Vulnerability",
				"dateAdded": "2026-10-14",
				"dueDate": "2026-10-17",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.ahsay.com/en/company/announcements/patch-cve-105133-105134-update ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-105133"
			},
			"redhat": null,
			"epss": .84478,
			"epssPercentile": .99707,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-0322",
			"title": "Palo Alto Networks PAN-OS Code Injection Vulnerability",
			"summary": "Palo Alto Networks PAN-OS contains a code injection vulnerability that could allow an authenticated attacker with network access to execute arbitrary code with root privileges on the firewall.",
			"severity": "HIGH",
			"cvss": null,
			"vector": null,
			"published": "2026-10-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev", "paloalto"],
			"vendor": "Palo Alto Networks",
			"product": "PAN-OS",
			"cwe": null,
			"kev": {
				"name": "Palo Alto Networks PAN-OS Code Injection Vulnerability",
				"dateAdded": "2026-10-14",
				"dueDate": "2026-10-17",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://security.paloaltonetworks.com/CVE-2026-0322 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-0322"
			},
			"redhat": null,
			"epss": .02147,
			"epssPercentile": .82402,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}, {
				"href": "https://security.paloaltonetworks.com/CVE-2026-0322",
				"label": "CVE-2026-0322 PAN-OS: Authenticated Remote Code Execution (RCE) in the Management Interface (Severity: HIGH)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-104935",
			"title": "Ivanti Connect Secure Authentication Bypass by Spoofing Vulnerability",
			"summary": "Ivanti Connect Secure contains an authentication bypass by spoofing vulnerability that allows a remote unauthenticated attacker to execute arbitrary commands.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-13T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ivanti",
			"product": "Connect Secure",
			"cwe": null,
			"kev": {
				"name": "Ivanti Connect Secure Authentication Bypass by Spoofing Vulnerability",
				"dateAdded": "2026-10-13",
				"dueDate": "2026-10-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https:/forums.ivanti.com/s/article/Security-Advisory-Ivanti-Connect-Secure-CVE-2026-104935 ; https://nvd.nist.gov/vuln/detail/CVE-2026-104935"
			},
			"redhat": null,
			"epss": .88936,
			"epssPercentile": .99782,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-96951",
			"title": "Microsoft Windows Command Injection Vulnerability",
			"summary": "Microsoft Windows Shell contains a command injection vulnerability that allows an unauthorized attacker to bypass a security feature over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-13T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Windows",
			"cwe": null,
			"kev": {
				"name": "Microsoft Windows Command Injection Vulnerability",
				"dateAdded": "2026-10-13",
				"dueDate": "2026-10-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-96951 ; BOD 26-04: BOD 26-04: Prioritizing Security Updates Based on Risk | CISA ; Forensics Triage Requirements: BOD 26-04: Implementation Guidance for Prioritizing Security Updates Based on Risk | CISA ;  https://nvd.nist.gov/vuln/detail/CVE-2026-96951"
			},
			"redhat": null,
			"epss": .09813,
			"epssPercentile": .95623,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2015-5477",
			"title": "ISC BIND Data Processing Errors Vulnerability",
			"summary": "ISC BIND contains a data processing errors vulnerability that could allow remote attackers to cause a denial of service via TKEY queries.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "ISC",
			"product": "BIND",
			"cwe": null,
			"kev": {
				"name": "ISC BIND Data Processing Errors Vulnerability",
				"dateAdded": "2026-10-08",
				"dueDate": "2026-10-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability could affect an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://web.archive.org/web/20150729014733/https://kb.isc.org/article/AA-01272 ; https://access.redhat.com/errata/RHSA-2015:1513.html; https://supportportal.juniper.net/s/article/2016-01-Security-Bulletin-"
			},
			"redhat": null,
			"epss": .99584,
			"epssPercentile": .99947,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2016-3081",
			"title": "Apache Struts Command Injection Vulnerability",
			"summary": "Apache Struts contains a command injection vulnerability that could allow remote attackers to execute arbitrary code via method:prefix when Dynamic Method Invocation is enabled.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Apache",
			"product": "Struts",
			"cwe": null,
			"kev": {
				"name": "Apache Struts Command Injection Vulnerability",
				"dateAdded": "2026-10-08",
				"dueDate": "2026-10-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability could affect an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://cwiki.apache.org/confluence/display/WW/S2-032 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://"
			},
			"redhat": null,
			"epss": .96916,
			"epssPercentile": .99889,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2023-22894",
			"title": "Strapi Cleartext Storage of Sensitive Information Vulnerability",
			"summary": "Strapi contains a cleartext storage of sensitive information vulnerability that could allow attackers with access to the admin panel to discover sensitive user details via the query filter. The impacted product(s) could be end-of-life (EoL) and/or end-of-service (EoS). Users are advised to discontinue use and/or transition to a supported version. This vulnerability can be chained with CVE-2023-22621 to achieve remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Strapi",
			"product": "Strapi",
			"cwe": null,
			"kev": {
				"name": "Strapi Cleartext Storage of Sensitive Information Vulnerability",
				"dateAdded": "2026-10-08",
				"dueDate": "2026-10-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability could affect an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://strapi.io/blog/security-disclosure-of-vulnerabilities-cve ; https://github.com/strapi/strapi/releases ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-update"
			},
			"redhat": null,
			"epss": .04114,
			"epssPercentile": .90941,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2021-3199",
			"title": "ONLYOFFICE Docs Server Path Traversal Vulnerability",
			"summary": "ONLYOFFICE Docs contains a path traversal vulnerability that can occur when JWT is used, via a /.. sequence in an image upload parameter and could allow for remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "ONLYOFFICE",
			"product": "Docs",
			"cwe": null,
			"kev": {
				"name": "ONLYOFFICE Docs Server Path Traversal Vulnerability",
				"dateAdded": "2026-10-08",
				"dueDate": "2026-10-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability could affect an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://github.com/ONLYOFFICE/DocumentServer/blob/903fe5ab7a275bd69c3c3346af2d21cf87ebeabf/CHANGELOG.md#563 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-update"
			},
			"redhat": null,
			"epss": .30244,
			"epssPercentile": .98251,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2015-3306",
			"title": "ProFTPD Improper Access Control Vulnerability",
			"summary": "ProFTPD contains an improper access control vulnerability that could allow remote attackers to read and write to arbitrary files via the site cpfr and site cpto commands.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "ProFTPD",
			"product": "ProFTPD",
			"cwe": null,
			"kev": {
				"name": "ProFTPD Improper Access Control Vulnerability",
				"dateAdded": "2026-10-08",
				"dueDate": "2026-10-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability could affect an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: http://www.proftpd.org/ ; https://lists.debian.org/debian-security-announce/2015/msg00154.html ; https://lists.opensuse.org/archives/list/updates@lists.opensuse.org/message/WE6YZRG5UVXMGQ7IVDRYBPIWV4M6UUGM"
			},
			"redhat": null,
			"epss": .99497,
			"epssPercentile": .99945,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-88779",
			"title": "Citrix NetScaler Improper Restriction of Operations within the Bounds of a Memory Buffer Vulnerability",
			"summary": "Citrix NetScaler ADC (formerly Citrix ADC) and Citrix NetScaler Gateway (formerly Citrix Gateway) contain an improper restriction of operations within the bounds of a memory buffer vulnerability that could allow for a denial of service.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-04T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Citrix",
			"product": "NetScaler",
			"cwe": null,
			"kev": {
				"name": "Citrix NetScaler Improper Restriction of Operations within the Bounds of a Memory Buffer Vulnerability",
				"dateAdded": "2026-10-04",
				"dueDate": "2026-10-07",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX697174 ; https://community.citrix.com/techzone-blogs/110_security-updates/understanding-and-addressing-cve-2026-88779-in-citrix-netscaler-adc-and-citrix-netscaler-gateway/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.c"
			},
			"redhat": null,
			"epss": .11388,
			"epssPercentile": .96062,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-102490",
			"title": "Zammad GmbH Zammad Improper Privilege Management Vulnerability",
			"summary": "Zammad GmbH Zammad contains an improper privilege management vulnerability that can allow the local zammad user to escalate privileges to root. This vulnerability can be chained with CVE-2026-102489.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Zammad GmbH",
			"product": "Zammad",
			"cwe": null,
			"kev": {
				"name": "Zammad GmbH Zammad Improper Privilege Management Vulnerability",
				"dateAdded": "2026-10-02",
				"dueDate": "2026-10-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://zammad.com/en/product/releases/ ; https://community.zammad.org/t/take-care-local-privilege-escalation-cve-2026-102490-is-reported-as-being-actively-exploited/21297/2 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-priorit"
			},
			"redhat": null,
			"epss": .10936,
			"epssPercentile": .95953,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-102489",
			"title": "Zammad GmbH Zammad Session Fixation Vulnerability",
			"summary": "Zammad GmbH Zammad contains a session fixation vulnerability that can lead to remote code execution as the zammad user. This vulnerability can be chained with CVE-2026-102490.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Zammad GmbH",
			"product": "Zammad",
			"cwe": null,
			"kev": {
				"name": "Zammad GmbH Zammad Session Fixation Vulnerability",
				"dateAdded": "2026-10-02",
				"dueDate": "2026-10-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://zammad.com/en/product/releases/ ; https://community.zammad.org/t/take-care-local-privilege-escalation-cve-2026-102490-is-reported-as-being-actively-exploited/21297/2 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-priorit"
			},
			"redhat": null,
			"epss": .49915,
			"epssPercentile": .98919,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-104286",
			"title": "Fortinet FortiMail Path Traversal Vulnerability",
			"summary": "Fortinet FortiMail contains a path traversal and an improper neutralization of NULL byte or NULL character vulnerability that may allow an unauthenticated attacker to write arbitrary files on the underlying system via crafted HTTP or HTTPS requests.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-01T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Fortinet",
			"product": "FortiMail",
			"cwe": null,
			"kev": {
				"name": "Fortinet FortiMail Path Traversal Vulnerability",
				"dateAdded": "2026-10-01",
				"dueDate": "2026-10-04",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://fortiguard.fortinet.com/psirt/FG-IR-26-175 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-104286"
			},
			"redhat": null,
			"epss": .04573,
			"epssPercentile": .91765,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-76504",
			"title": "Cisco Catalyst SD-WAN Manager Hex Encoding Vulnerability",
			"summary": "Cisco Catalyst SD-WAN Manager contains a hex encoding vulnerability that could allow an unauthenticated, remote attacker to access an affected system with privileges of the admin user due to improper handling of URI encoding in an HTTP request.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-30T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Catalyst SD-WAN Manager",
			"cwe": null,
			"kev": {
				"name": "Cisco Catalyst SD-WAN Manager Hex Encoding Vulnerability",
				"dateAdded": "2026-09-30",
				"dueDate": "2026-10-03",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-webauth-xr8beuuU ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/"
			},
			"redhat": null,
			"epss": .38928,
			"epssPercentile": .98611,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-86950",
			"title": "Apple Multiple Products Out-of-Bounds Write Vulnerability",
			"summary": "Apple iOS, macOS, and iPadOS contain an out-of-bounds write vulnerability in CoreGraphics that may lead to arbitrary code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-29T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Apple",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Apple Multiple Products Out-of-Bounds Write Vulnerability",
				"dateAdded": "2026-09-29",
				"dueDate": "2026-10-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.apple.com/en-us/149226 ; https://support.apple.com/en-us/149228 ; https://support.apple.com/en-us/149229 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist."
			},
			"redhat": null,
			"epss": .26166,
			"epssPercentile": .98023,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-88772",
			"title": "Citrix NetScaler Improper Restriction of Operations within the Bounds of a Memory Buffer Vulnerability",
			"summary": "Citrix NetScaler ADC and NetScaler Gateway contain an improper restriction of operations within the bounds of a memory buffer vulnerability that could allow for remote code execution or denial of service",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Citrix",
			"product": "NetScaler",
			"cwe": null,
			"kev": {
				"name": "Citrix NetScaler Improper Restriction of Operations within the Bounds of a Memory Buffer Vulnerability",
				"dateAdded": "2026-09-27",
				"dueDate": "2026-09-30",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "Running the provided IOCs in the NetScaler console may help identify indicators of exploitation. Customers must conduct forensic triage as directed by BOD 26‑04 and follow Citrix’s published guidance for mitigations. For more information, please see: https://community.citrix.com/techzone-blogs/110_security-updates/netscaler-adc-and-netscaler-gateway-security-bulletin-for-cve-2026-88771-through-cve"
			},
			"redhat": null,
			"epss": .76566,
			"epssPercentile": .99549,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-88771",
			"title": "Citrix NetScaler Improper Input Validation Vulnerability",
			"summary": "Citrix NetScaler ADC and NetScaler Gateway contain an improper input validation vulnerability that could allow an unauthenticated attacker to execute arbitrary commands.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Citrix",
			"product": "NetScaler",
			"cwe": null,
			"kev": {
				"name": "Citrix NetScaler Improper Input Validation Vulnerability",
				"dateAdded": "2026-09-27",
				"dueDate": "2026-09-30",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "Running the provided IOCs in the NetScaler console may help identify indicators of exploitation. Customers must conduct forensic triage as directed by BOD 26‑04 and follow Citrix’s published guidance for mitigations. For more information, please see: https://community.citrix.com/techzone-blogs/110_security-updates/netscaler-adc-and-netscaler-gateway-security-bulletin-for-cve-2026-88771-through-cve"
			},
			"redhat": null,
			"epss": .81894,
			"epssPercentile": .99657,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-67279",
			"title": "Mikrotik RouterOS Improper Enforcement of Behavioral Workflow Vulnerability",
			"summary": "Mikrotik RouterOS contains an improper enforcement of behavioral workflow vulnerability that could allow an unauthenticated client to open a session channel and send an exec request. This vulnerability can be chained to achieve unauthenticated exploitation of CVE-2026-86060.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-25T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "MikroTik",
			"product": "RouterOS",
			"cwe": null,
			"kev": {
				"name": "Mikrotik RouterOS Improper Enforcement of Behavioral Workflow Vulnerability",
				"dateAdded": "2026-09-25",
				"dueDate": "2026-09-28",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://mikrotik.com/supportsec/september-2026-vulnerability ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-67279"
			},
			"redhat": null,
			"epss": .02277,
			"epssPercentile": .83401,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-65660",
			"title": "Microsoft SharePoint Code Injection Vulnerability",
			"summary": "Microsoft SharePoint contains a code injection vulnerability which could allow an authorized attacker to execute code over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-25T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SharePoint",
			"cwe": null,
			"kev": {
				"name": "Microsoft SharePoint Code Injection Vulnerability",
				"dateAdded": "2026-09-25",
				"dueDate": "2026-09-28",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-65660 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-65660"
			},
			"redhat": null,
			"epss": .09852,
			"epssPercentile": .95635,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-87902",
			"title": "WordPress Core Remote File Inclusion Vulnerability",
			"summary": "WordPress Core contains a remote file inclusion vulnerability which could allow an unauthenticated attacker to make page-template resolution include a chosen readable local `.php` file outside the active theme directories, leading to remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-25T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "WordPress",
			"product": "Core",
			"cwe": null,
			"kev": {
				"name": "WordPress Core Remote File Inclusion Vulnerability",
				"dateAdded": "2026-09-25",
				"dueDate": "2026-09-28",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/WordPress/wordpress-develop/security/advisories/GHSA-7hp8-65ch-5whp ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-87902"
			},
			"redhat": null,
			"epss": .95769,
			"epssPercentile": .99874,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-5430",
			"title": "WSO2 Multiple Products Path Traversal Vulnerability",
			"summary": "WSO2 API Control Plane, API Manager, Traffic Manager & Universal Gateway contain a path traversal vulnerability that could allow for unrestricted file upload and lead to remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-24T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "WSO2",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "WSO2 Multiple Products Path Traversal Vulnerability",
				"dateAdded": "2026-09-24",
				"dueDate": "2026-09-27",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://security.docs.wso2.com/en/latest/security-announcements/security-advisories/2026/WSO2-2026-5328/ ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detai"
			},
			"redhat": null,
			"epss": .2239,
			"epssPercentile": .97732,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-71362",
			"title": "Adobe Commerce and Magento Incorrect Authorization Vulnerability",
			"summary": "Adobe Commerce and Magento contains an incorrect authorization vulnerability that could allow an attacker to leverage this vulnerability to gain elevated access to sensitive resources without any user interaction.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-24T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Adobe",
			"product": "Commerce and Magento",
			"cwe": null,
			"kev": {
				"name": "Adobe Commerce and Magento Incorrect Authorization Vulnerability",
				"dateAdded": "2026-09-24",
				"dueDate": "2026-09-27",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://helpx.adobe.com/security/products/magento/apsb26-92.html ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-71362"
			},
			"redhat": null,
			"epss": .91677,
			"epssPercentile": .99818,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-93952",
			"title": "Arista VeloCloud Orchestrator Improper Input Validation Vulnerability",
			"summary": "Arista VeloCloud Orchestrator (VCO) on-prem contains an improper input validation vulnerability that may allow a remote attacker to access privileged internal functionality and impact the VCO host. Successful exploitation may compromise the confidentiality, integrity, and availability of the orchestrator and data managed by the orchestrator.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-22T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Arista",
			"product": "VeloCloud Orchestrator",
			"cwe": null,
			"kev": {
				"name": "Arista VeloCloud Orchestrator Improper Input Validation Vulnerability",
				"dateAdded": "2026-09-22",
				"dueDate": "2026-09-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.arista.com/en/support/advisories-notices/security-advisory/24765-security-advisory-0183 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": .01384,
			"epssPercentile": .7264,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-94127",
			"title": "F5 BIG-IP APM Heap-based Buffer Overflow Vulnerability",
			"summary": "F5 BIG-IP APM contains a heap-based buffer overflow vulnerability when access policy and an OAuth profile are configured on a virtual server. This vulnerability could allow an unauthenticated attacker to perform remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-22T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "F5",
			"product": "BIG-IP APM",
			"cwe": null,
			"kev": {
				"name": "F5 BIG-IP APM Heap-based Buffer Overflow Vulnerability",
				"dateAdded": "2026-09-22",
				"dueDate": "2026-09-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "For temporary mitigation to allow for proactive forensic triage, apply the vendor-provided iRule. Once completed, install the final vendor patch as soon as possible. For more information please see: https://my.f5.com/manage/s/article/K000162605 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.ci"
			},
			"redhat": null,
			"epss": .2655,
			"epssPercentile": .98044,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-93616",
			"title": "Check Point Multiple Products Path Traversal Vulnerability",
			"summary": "Check Point Security Management Server, Multi-Domain Security Management Server, Log Server, Multi-Domain Log Server, and SmartEvent contain a path traversal vulnerability that allows an unauthenticated attacker to upload and execute arbitrary scripts.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-22T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Check Point",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Check Point Multiple Products Path Traversal Vulnerability",
				"dateAdded": "2026-09-22",
				"dueDate": "2026-09-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.checkpoint.com/results/sk/sk1000171/ ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-93616"
			},
			"redhat": null,
			"epss": .91605,
			"epssPercentile": .99817,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-85102",
			"title": "Check Point Multiple Products Improper Certificate Validation Vulnerability",
			"summary": "Check Point Security Gateway and Check Point Spark Firewall using Site to Site VPN or Remote Access VPN contain an improper certificate validation vulnerability which could allow an unauthenticated remote attacker to execute arbitrary code on the Gateway.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-22T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Check Point",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Check Point Multiple Products Improper Certificate Validation Vulnerability",
				"dateAdded": "2026-09-22",
				"dueDate": "2026-09-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.checkpoint.com/results/sk/sk1000117 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-85102"
			},
			"redhat": null,
			"epss": .5414,
			"epssPercentile": .99024,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-7273",
			"title": "Zyxel GS1900 Series Switches Stack-Based Buffer Overflow Vulnerability",
			"summary": "Zyxel GS1900 series switches contain a stack-based buffer overflow vulnerability in the CGI program which could allow a LAN-based, unauthenticated attacker to exploit the flaw and potentially execute OS commands via a crafted HTTP request.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-21T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Zyxel",
			"product": "GS1900 Series Switches",
			"cwe": null,
			"kev": {
				"name": "Zyxel GS1900 Series Switches Stack-Based Buffer Overflow Vulnerability",
				"dateAdded": "2026-09-21",
				"dueDate": "2026-09-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.zyxel.com/global/en/support/security-advisories/zyxel-security-advisory-for-stack-based-buffer-overflow-vulnerability-in-gs1900-series-switches-06-16-2026 ; ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing"
			},
			"redhat": null,
			"epss": .02734,
			"epssPercentile": .86345,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-39964",
			"title": "Linux Kernel Race Condition Vulnerability",
			"summary": "Linux Kernel contains a race condition vulnerability which allows concurrent writes to the same AF_ALG socket causing data to be unpredictably interleaved and creating inconsistencies in the socket's internal state.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Linux",
			"product": "Kernel",
			"cwe": null,
			"kev": {
				"name": "Linux Kernel Race Condition Vulnerability",
				"dateAdded": "2026-09-18",
				"dueDate": "2026-09-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://git.kernel.org/stable/c/0f28c4adbc4a97437874c9b669fd7958a8c6d6ce; https://git.kernel.org/stable/c/e4c1ec11132ec466f7362a95f36a506ce4dc08c9; https://git.kernel.org/stable/c/1f323a48e9b5ebfe6dc7d130fdf5"
			},
			"redhat": null,
			"epss": .01607,
			"epssPercentile": .76291,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-53266",
			"title": "Linux Kernel Out-of-Bounds Write Vulnerability",
			"summary": "Linux Kernel contains an out-of-bounds write vulnerability in the ebtables SNAT target which allows an ARP sender hardware address rewrite to write directly into a nonlinear socket-buffer fragment backed by a splice-imported file page. The impacted product(s) could be end-of-life (EoL) and/or end-of-service (EoS). Users are advised to discontinue use and/or transition to a supported version.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Linux",
			"product": "Kernel",
			"cwe": null,
			"kev": {
				"name": "Linux Kernel Out-of-Bounds Write Vulnerability",
				"dateAdded": "2026-09-18",
				"dueDate": "2026-09-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://git.kernel.org/stable/c/bf84ad7c7a9ede46e31afaa41a1ba06a159e8c87; https://git.kernel.org/stable/c/76280b78cc9f23bdc6438e10ad6dff148ef8375b; https://git.kernel.org/stable/c/b7e91939ba9be805a62a257fa4e2"
			},
			"redhat": null,
			"epss": .00934,
			"epssPercentile": .61312,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-39682",
			"title": "Linux Kernel Improper Check for Unusual or Exceptional Conditions Vulnerability",
			"summary": "Linux Kernel contains an improper check for unusual or exceptional conditions vulnerability in the TLS receive path which allows a zero-length record retrieved from the rx_list to bypass the intended recvmsg() record-type handling, potentially causing subsequent TLS records to be processed using incorrect zero-copy and queuing assumptions. The impacted product(s) could be end-of-life (EoL) and/or end-of-service (EoS). Users are advised to discontinue use and/or transition to a supported version.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Linux",
			"product": "Kernel",
			"cwe": null,
			"kev": {
				"name": "Linux Kernel Improper Check for Unusual or Exceptional Conditions Vulnerability",
				"dateAdded": "2026-09-18",
				"dueDate": "2026-09-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://git.kernel.org/stable/c/2902c3ebcca52ca845c03182000e8d71d3a5196f; https://git.kernel.org/stable/c/c09dd3773b5950e9cfb6c9b9a5f6e36d06c62677; https://git.kernel.org/stable/c/3439c15ae91a517cf3c650ea15a8"
			},
			"redhat": null,
			"epss": .03312,
			"epssPercentile": .88762,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-58704",
			"title": "Google Pixel Improper Authorization Vulnerability",
			"summary": "Google Pixel devices contain an improper authorization vulnerability in the cellular modem. A logic error may allow an attacker to bypass permission checks and escalate privileges.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Google",
			"product": "Pixel",
			"cwe": null,
			"kev": {
				"name": "Google Pixel Improper Authorization Vulnerability",
				"dateAdded": "2026-09-16",
				"dueDate": "2026-09-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://source.android.com/docs/security/bulletin/pixel/2026/2026-09-01 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-58704"
			},
			"redhat": null,
			"epss": .00625,
			"epssPercentile": .50562,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-76460",
			"title": "Cisco Identity Services Engine Incorrect Use of Privileged APIs Vulnerability",
			"summary": "Cisco Identity Services Engine (ISE) and Cisco ISE Passive Identity Connector (ISE-PIC) contain an incorrect use of privileged APIs vulnerability that could allow an unauthenticated, remote attacker to gain unauthorized access to the affected device by bypassing the web-based management interface.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Identity Services Engine",
			"cwe": null,
			"kev": {
				"name": "Cisco Identity Services Engine Incorrect Use of Privileged APIs Vulnerability",
				"dateAdded": "2026-09-16",
				"dueDate": "2026-09-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ISE-ABP-VNSW7Tn5 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/C"
			},
			"redhat": null,
			"epss": .75599,
			"epssPercentile": .99527,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-87886",
			"title": "Acronis Backup Incorrect Default Permissions Vulnerability",
			"summary": "Acronis Backup plugin for cPanel & WHM and extension for Plesk contains an incorrect default permissions vulnerability that could allow for privilege escalation.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Acronis",
			"product": "Backup",
			"cwe": null,
			"kev": {
				"name": "Acronis Backup Incorrect Default Permissions Vulnerability",
				"dateAdded": "2026-09-16",
				"dueDate": "2026-09-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://security-advisory.acronis.com/advisories/SEC-10986 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-87886"
			},
			"redhat": null,
			"epss": .00233,
			"epssPercentile": .14312,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-76461",
			"title": "Cisco Secure Email Gateway SQL Injection Vulnerability",
			"summary": "Cisco AsyncOS software for Cisco Secure Email Gateway (SEG) contains a SQL injection vulnerability that could allow an unauthenticated, remote attacker to execute arbitrary commands with root privileges on the underlying operating system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Secure Email Gateway",
			"cwe": null,
			"kev": {
				"name": "Cisco Secure Email Gateway SQL Injection Vulnerability",
				"dateAdded": "2026-09-14",
				"dueDate": "2026-09-17",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-esa-inj-2bLVGmhX ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/C"
			},
			"redhat": null,
			"epss": .4016,
			"epssPercentile": .9866,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-84869",
			"title": "ConnectWise ScreenConnect Improper Privilege Management and Missing Authorization Vulnerability",
			"summary": "ConnectWise ScreenConnect contains both an improper privilege management and missing authorization vulnerability that may allow an attacker to transfer and execute files through an active remote session without authorization or host confirmation.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "ConnectWise",
			"product": "ScreenConnect",
			"cwe": null,
			"kev": {
				"name": "ConnectWise ScreenConnect Improper Privilege Management and Missing Authorization Vulnerability",
				"dateAdded": "2026-09-11",
				"dueDate": "2026-09-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.connectwise.com/company/trust/security-bulletins/2026-09-08-screenconnect-bulletin ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-8"
			},
			"redhat": null,
			"epss": .01173,
			"epssPercentile": .67983,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-42016",
			"title": "JFrog Artifactory Incorrect Authorization Vulnerability",
			"summary": "JFrog Artifactory contains an incorrect authorization vulnerability that leads to a privilege escalation attack due to a validation check of the token signature/issuer and not the token’s scope.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "JFrog",
			"product": "Artifactory",
			"cwe": null,
			"kev": {
				"name": "JFrog Artifactory Incorrect Authorization Vulnerability",
				"dateAdded": "2026-09-11",
				"dueDate": "2026-09-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://docs.jfrog.com/releases/docs/jfrog-security-advisories ; https://docs.jfrog.com/releases/docs/artifactory-self-managed-releases ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; ht"
			},
			"redhat": null,
			"epss": .08643,
			"epssPercentile": .95194,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-42018",
			"title": "JFrog Artifactory Improper Authentication Vulnerability",
			"summary": "JFrog Artifactory contains an improper authentication vulnerability that could return an internal anonymous-user token to an unauthenticated caller when anonymous access is disabled, potentially exposing sensitive resources.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "JFrog",
			"product": "Artifactory",
			"cwe": null,
			"kev": {
				"name": "JFrog Artifactory Improper Authentication Vulnerability",
				"dateAdded": "2026-09-11",
				"dueDate": "2026-09-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://docs.jfrog.com/releases/docs/jfrog-security-advisories ; https://docs.jfrog.com/releases/docs/artifactory-self-managed-releases ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; ht"
			},
			"redhat": null,
			"epss": .09983,
			"epssPercentile": .95675,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-85706",
			"title": "GitLab Community Edition and Enterprise Edition Path Traversal Vulnerability",
			"summary": "GitLab Community Edition and Enterprise Edition contains a path traversal vulnerability that allows an unauthenticated user to read arbitrary files due to an improper path confinement and missing authentication enforcement in the repository commits API.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "GitLab",
			"product": "Community Edition and Enterprise Edition",
			"cwe": null,
			"kev": {
				"name": "GitLab Community Edition and Enterprise Edition Path Traversal Vulnerability",
				"dateAdded": "2026-09-11",
				"dueDate": "2026-09-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://docs.gitlab.com/releases/patches/patch-release-gitlab-19-3-2-released/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-85706"
			},
			"redhat": null,
			"epss": .97355,
			"epssPercentile": .99899,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-86060",
			"title": "MikroTik RouterOS Improper Neutralization of Argument Delimiters in a Command Vulnerability",
			"summary": "MikroTik RouterOS contains an improper neutralization of argument delimiters in a command vulnerability which allows an attacker to change the trusted RouterOS policy mask, leading to privilege escalation.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "MikroTik",
			"product": "RouterOS",
			"cwe": null,
			"kev": {
				"name": "MikroTik RouterOS Improper Neutralization of Argument Delimiters in a Command Vulnerability",
				"dateAdded": "2026-09-10",
				"dueDate": "2026-09-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://mikrotik.com/supportsec/september-2026-vulnerability ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-86060"
			},
			"redhat": null,
			"epss": .06392,
			"epssPercentile": .93778,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-67277",
			"title": "MikroTik RouterOS Missing Authentication for Critical Function Vulnerability",
			"summary": "MikroTik RouterOS contains a missing authentication for critical function vulnerability which allows kernel memory disclosure and denial of service in the btest service.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "MikroTik",
			"product": "RouterOS",
			"cwe": null,
			"kev": {
				"name": "MikroTik RouterOS Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-09-10",
				"dueDate": "2026-09-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://mikrotik.com/supportsec/september-2026-vulnerability/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-67277"
			},
			"redhat": null,
			"epss": .0156,
			"epssPercentile": .75644,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-19490",
			"title": "Citrix NetScaler Authentication Bypass Using an Alternate Path or Channel Vulnerability",
			"summary": "Citrix NetScaler ADC and NetScaler Gateway contain an authentication-bypass vulnerability involving an alternate path or channel. When the NetScaler appliance is configured as an AAA virtual server or as a Gateway (SSL VPN, ICA Proxy, CVPN, or RDP Proxy), an unauthenticated remote threat actor may be able to bypass authentication.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Citrix",
			"product": "NetScaler",
			"cwe": null,
			"kev": {
				"name": "Citrix NetScaler Authentication Bypass Using an Alternate Path or Channel Vulnerability",
				"dateAdded": "2026-09-09",
				"dueDate": "2026-09-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.citrix.com/external/article/CTX696939/netscaler-adc-and-netscaler-gateway-secu.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2"
			},
			"redhat": null,
			"epss": .33262,
			"epssPercentile": .98396,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-25249",
			"title": "Fortinet Multiple Products Heap-based Buffer Overflow Vulnerability",
			"summary": "Fortinet FortiOS, FortiSwitchManager, and FortiSASE contain a heap-based buffer overflow vulnerability that allows an attacker to execute unauthorized code or commands via specially crafted packets.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Fortinet",
			"product": "Multiple Products",
			"cwe": null,
			"kev": {
				"name": "Fortinet Multiple Products Heap-based Buffer Overflow Vulnerability",
				"dateAdded": "2026-09-09",
				"dueDate": "2026-09-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://fortiguard.fortinet.com/psirt/FG-IR-25-084 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2025-25249"
			},
			"redhat": null,
			"epss": .03742,
			"epssPercentile": .90034,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-87491",
			"title": "Google Chromium V8 Out of Bounds Write Vulnerability",
			"summary": "Google Chromium V8 contains an out of bounds write vulnerability that allows a remote attacker to execute arbitrary code inside the sandbox via a crafted HTML page. This vulnerability could affect multiple web browsers that utilize Chromium, including, but not limited to, Google Chrome, Microsoft Edge, and Opera.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Google",
			"product": "Chromium V8",
			"cwe": null,
			"kev": {
				"name": "Google Chromium V8 Out of Bounds Write Vulnerability",
				"dateAdded": "2026-09-09",
				"dueDate": "2026-09-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_0808145027.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20079",
			"title": "Cisco Firewall Management Center Authentication Bypass Using an Alternate Path or Channel Vulnerability",
			"summary": "Cisco Secure Firewall Management Center (FMC) Software and Cisco Security Cloud Control (SCC) Firewall Management contain an authentication Bypass using an alternate path or channel vulnerability that could allow an unauthenticated, remote attacker to bypass authentication and execute script files on an affected device to obtain root access to the underlying operating system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Secure Firewall Management Center (FMC) and Security Cloud Control (SCC) Firewall Management",
			"cwe": null,
			"kev": {
				"name": "Cisco Firewall Management Center Authentication Bypass Using an Alternate Path or Channel Vulnerability",
				"dateAdded": "2026-09-09",
				"dueDate": "2026-09-12",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-onprem-fmc-authbypass-5JPp45V2 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-75650",
			"title": "Adobe Commerce and Magento Improper Neutralization of Special Elements Used in a Template Engine Vulnerability",
			"summary": "Adobe Commerce and Magento Open Source contain an improper neutralization of special elements used in a template engine vulnerability that could allow an attacker to execute arbitrary code.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Adobe",
			"product": "Commerce and Magento",
			"cwe": null,
			"kev": {
				"name": "Adobe Commerce and Magento Improper Neutralization of Special Elements Used in a Template Engine Vulnerability",
				"dateAdded": "2026-09-08",
				"dueDate": "2026-09-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://helpx.adobe.com/security/products/magento/apsb26-146.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-75650"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-81963",
			"title": "Microsoft Windows Link Following Vulnerability",
			"summary": "Microsoft Windows Update Stack contains a link following vulnerability that allows a local attacker to escalate privileges locally up to SYSTEM.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Windows",
			"cwe": null,
			"kev": {
				"name": "Microsoft Windows Link Following Vulnerability",
				"dateAdded": "2026-09-08",
				"dueDate": "2026-09-22",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-81963 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-81963"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-86218",
			"title": "N-able N-central Static Code Injection Vulnerability",
			"summary": "N-able N-central contains a static code injection vulnerability that could allow for pre-authentication remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "N-able",
			"product": "N-central",
			"cwe": null,
			"kev": {
				"name": "N-able N-central Static Code Injection Vulnerability",
				"dateAdded": "2026-09-08",
				"dueDate": "2026-09-11",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://status.n-able.com/2026/09/06/n-central-2026-3-hotfix-4-cve-2026-86218/ ; https://me.n-able.com/s/security-advisory/aArVy0000002Ld3KAE/cve202686218-preauthentication-remote-code-execution ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementa"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-85880",
			"title": "Microsoft Windows Heap-Based Buffer Overflow Vulnerability",
			"summary": "Microsoft Windows Advanced Local Procedure Call contains a heap-based buffer overflow vulnerability that allows an attacker to elevate privileges locally.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Windows",
			"cwe": null,
			"kev": {
				"name": "Microsoft Windows Heap-Based Buffer Overflow Vulnerability",
				"dateAdded": "2026-09-08",
				"dueDate": "2026-09-22",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-85880 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-85880"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-85046",
			"title": "Google Chromium V8 Type Confusion Vulnerability",
			"summary": "Google Chromium V8 contains a type confusion vulnerability that allows a remote attacker to execute arbitrary code inside the sandbox via a crafted HTML page. This vulnerability could affect multiple web browsers that utilize Chromium, including, but not limited to, Google Chrome, Microsoft Edge, and Opera.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-04T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Google",
			"product": "Chromium V8",
			"cwe": null,
			"kev": {
				"name": "Google Chromium V8 Type Confusion Vulnerability",
				"dateAdded": "2026-09-04",
				"dueDate": "2026-09-18",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://chromereleases.googleblog.com/2026/09/stable-channel-update-for-desktop_01882797386.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-59822",
			"title": "BerriAI LiteLLM Improper Authentication Vulnerability",
			"summary": "BerriAI LiteLLM contains an improper authentication vulnerability in the MCP Streamable HTTP endpoint that could allow an unauthenticated attacker to establish an authenticated MCP session using an arbitrary Bearer token.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "BerriAI",
			"product": "LiteLLM",
			"cwe": null,
			"kev": {
				"name": "BerriAI LiteLLM Improper Authentication Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/BerriAI/litellm/security/advisories/GHSA-7488-6r32-c95q ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-59822"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48710",
			"title": "Kludex Starlette HTTP Request/Response Smuggling Vulnerability",
			"summary": "Kludex Starlette contains a HTTP request/response smuggling vulnerability that could allow attackers to inject paths into the host part, prepending the actual path leading to issues such as authentication bypass when the authentication depends on the reconstructed URL’s path. This vulnerability could be chaned with CVE-2026-42271.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Kludex",
			"product": "Starlette",
			"cwe": null,
			"kev": {
				"name": "Kludex Starlette HTTP Request/Response Smuggling Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://github.com/Kludex/starlette/security/advisories/GHSA-86qp-5c8j-p5mr ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Require"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-49869",
			"title": "Kestra OSS OS Command Injection Vulnerability",
			"summary": "Kestra OSS contains an OS command injection vulnerability that could allow an unauthenticated remote attacker to create and execute arbitrary workflows without credentials.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Kestra",
			"product": "Kestra OSS",
			"cwe": null,
			"kev": {
				"name": "Kestra OSS OS Command Injection Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://github.com/kestra-io/kestra/security/advisories/GHSA-5vc5-wxxq-3fjx ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Require"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-82329",
			"title": "JFrog Artifactory Improper Authentication Vulnerability",
			"summary": "JFrog Artifactory contains an improper authentication vulnerability that under default configuration can allow an unauthenticated attacker with network access to obtain administrative privileges.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "JFrog",
			"product": "Artifactory",
			"cwe": null,
			"kev": {
				"name": "JFrog Artifactory Improper Authentication Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://docs.jfrog.com/releases/docs/jfrog-security-advisories ; https://docs.jfrog.com/releases/docs/artifactory-self-managed-releases ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; ht"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-9586",
			"title": "Sangoma Switchvox SQL Injection Vulnerability",
			"summary": "Sangoma Switchvox contains a SQL injection vulnerability which allows an unauthenticated remote attacker to execute arbitrary SQL statements against the backend PostgreSQL database using a single crafted request, including database operations and remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Sangoma",
			"product": "Switchvox",
			"cwe": null,
			"kev": {
				"name": "Sangoma Switchvox SQL Injection Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sangomakb.atlassian.net/wiki/spaces/Switchvox/pages/1802371073/Switchvox+-+Release+Notes+Version+8.4.0.2+July+14+2026 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd."
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-83548",
			"title": "SonicWall SMA1000 Appliances Server-Side Request Forgery Vulnerability",
			"summary": "SonicWall SMA1000 Appliances contains a server-side request forgery vulnerability that could allow a remote unauthenticated attacker to gain unauthorized access to sensitive functionality and perform unauthorized operations.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SonicWall",
			"product": "SMA1000 Appliances",
			"cwe": null,
			"kev": {
				"name": "SonicWall SMA1000 Appliances Server-Side Request Forgery Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0016 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-83548"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-83549",
			"title": "SonicWall SMA1000 Appliances OS Command Injection Vulnerability",
			"summary": "SonicWall SMA1000 Appliances contains an OS command injection vulnerability that could enable a remote authenticated attacker as administrator to execute arbitrary OS commands, resulting in remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-09-02T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SonicWall",
			"product": "SMA1000 Appliances",
			"cwe": null,
			"kev": {
				"name": "SonicWall SMA1000 Appliances OS Command Injection Vulnerability",
				"dateAdded": "2026-09-02",
				"dueDate": "2026-09-05",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0016 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-83549"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-82078",
			"title": "PaperCut NG/MF Unsafe Reflection Vulnerability",
			"summary": "PaperCut NG/MF contains an unsafe reflection vulnerability that allows an attacker to manipulate system configuration parameters and execute arbitrary Java bytecode residing on the application classpath under the security context of the PaperCut server process. This vulnerability can be chained with CVE-2026-81578.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-31T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "PaperCut",
			"product": "NG/MF",
			"cwe": null,
			"kev": {
				"name": "PaperCut NG/MF Unsafe Reflection Vulnerability",
				"dateAdded": "2026-08-31",
				"dueDate": "2026-09-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.papercut.com/kb/Main/security-bulletin-27-aug-2026-urgent-security-advisory/?lid=2oneu2wt0ct4 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-81578",
			"title": "PaperCut NG/MF Missing Authentication for Critical Function Vulnerability",
			"summary": "PaperCut NG/MF contains a missing authentication for critical function vulnerability which allows an unauthenticated remote attacker to modify certain system configurations. This vulnerability can be chained with CVE-2026-82078.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-31T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "PaperCut",
			"product": "NG/MF",
			"cwe": null,
			"kev": {
				"name": "PaperCut NG/MF Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-08-31",
				"dueDate": "2026-09-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.papercut.com/kb/Main/security-bulletin-27-aug-2026-urgent-security-advisory/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-81578"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2023-49105",
			"title": "ownCloud Improper Authentication Vulnerability",
			"summary": "ownCloud contains an improper authentication vulnerability that allows an attacker to access, modify, or delete any file without authentication if the username of a victim is known, and the victim has no signing-key configured.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "ownCloud",
			"product": "ownCloud",
			"cwe": null,
			"kev": {
				"name": "ownCloud Improper Authentication Vulnerability",
				"dateAdded": "2026-08-27",
				"dueDate": "2026-08-30",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://owncloud.org/security ; https://owncloud.com/security-advisories/webdav-api-authentication-bypass-using-pre-signed-urls/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://n"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-53362",
			"title": "Linux Kernel Unspecified Vulnerability",
			"summary": "Linux Kernel contains an unspecified vulnerability that can allow for privilege escalation via IPv6 networking subsystem. This vulnerability can impact multiple products, including but not limited to Suse, Red Hat, and other products using Linux.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Linux",
			"product": "Kernel",
			"cwe": null,
			"kev": {
				"name": "Linux Kernel Unspecified Vulnerability",
				"dateAdded": "2026-08-27",
				"dueDate": "2026-08-30",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: ; https://git.kernel.org/stable/c/14200d435af9a9eeb444f529fc2f689a236b7962; https://git.kernel.org/stable/c/65fb14cbebb0cd0eff903a22d33537ddc8b95769; https://git.kernel.org/stable/c/46f201f8b4c39633a1fa3dc12459"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-66384",
			"title": "JFrog Artifactory Improper Limitation of a Pathname to a Restricted Directory Vulnerability",
			"summary": "JFrog Artifactory contains an improper limitation of a pathname to a restricted directory vulnerability. This can allow an authenticated user to write data outside the intended Docker cache path under specific remote-repository conditions.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "JFrog",
			"product": "Artifactory",
			"cwe": null,
			"kev": {
				"name": "JFrog Artifactory Improper Limitation of a Pathname to a Restricted Directory Vulnerability",
				"dateAdded": "2026-08-27",
				"dueDate": "2026-09-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://docs.jfrog.com/releases/docs/jfrog-security-advisories ; https://docs.jfrog.com/releases/docs/artifactory-self-managed-releases ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; ht"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2021-23758",
			"title": "Ajax.NET Professional Deserialization of Untrusted Data Vulnerability",
			"summary": "Ajax.NET Professional (AjaxPro) contains a deserialization of untrusted data vulnerability that could allow for remote code execution via arbitrary .NET classes. The impacted product(s) could be end-of-life (EoL) and/or end-of-service (EoS). Users are advised to discontinue use and/or transition to a supported version.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-26T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ajax.NET Professional",
			"product": "Ajax.NET Professional",
			"cwe": null,
			"kev": {
				"name": "Ajax.NET Professional Deserialization of Untrusted Data Vulnerability",
				"dateAdded": "2026-08-26",
				"dueDate": "2026-09-09",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://github.com/michaelschwarz/Ajax.NET-Professional/commit/b0e63be5f0bb20dfce507cb8a1a9568f6e73de57 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-ris"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2015-3246",
			"title": "Red Hat Libuser Race Condition Vulnerability",
			"summary": "Red Hat libuser contains a race condition vulnerability that allows authenticated local users to corrupt the /etc/passwd file to cause a denial of service or privilege escalation.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-26T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Red Hat",
			"product": "Libuser",
			"cwe": null,
			"kev": {
				"name": "Red Hat Libuser Race Condition Vulnerability",
				"dateAdded": "2026-08-26",
				"dueDate": "2026-09-09",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://access.redhat.com/articles/1537873 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2015-5287",
			"title": "Red Hat Automatic Bug Reporting Tool Privilege Escalation Vulnerability",
			"summary": "Red Hat Automatic Bug Reporting Tool (ABRT) contains a privilege escalation vulnerability that could allow local users with certain permissions to gain privileges via a symlink attack on a file with a predictable name. The impacted product(s) could be end-of-life (EoL) and/or end-of-service (EoS). Users are advised to discontinue use and/or transition to a supported version.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-26T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Red Hat",
			"product": "Automatic Bug Reporting Tool",
			"cwe": null,
			"kev": {
				"name": "Red Hat Automatic Bug Reporting Tool Privilege Escalation Vulnerability",
				"dateAdded": "2026-08-26",
				"dueDate": "2026-09-09",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://github.com/abrt/abrt/commit/3c1b60cfa62d39e5fff5a53a5bc53dae189e740e ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requir"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2022-0995",
			"title": "Linux Kernel Out-of-Bounds Write Vulnerability",
			"summary": "Linux Kernel contains an out-of-bounds memory write vulnerability which could allow a local user to gain privileged access or cause a denial of service on the system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-26T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Linux",
			"product": "Kernel",
			"cwe": null,
			"kev": {
				"name": "Linux Kernel Out-of-Bounds Write Vulnerability",
				"dateAdded": "2026-08-26",
				"dueDate": "2026-08-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects an open-source component, third-party library, protocol, or proprietary implementation that could be used by different products. For more information, please see: https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/commit/?id=93ce93587d36493f2f86921fa79921b3cba63fbb ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-up"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-8452",
			"title": "Citrix NetScaler ADC and NetScaler Gateway Improper Restriction of Operations within the Bounds of a Memory Buffer Vulnerability",
			"summary": "Citrix NetScaler ADC and NetScaler Gateway contain an improper restriction of operations within the bounds of a memory buffer vulnerability which could lead to denial of service.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-26T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Citrix",
			"product": "NetScaler ADC and NetScaler Gateway",
			"cwe": null,
			"kev": {
				"name": "Citrix NetScaler ADC and NetScaler Gateway Improper Restriction of Operations within the Bounds of a Memory Buffer Vulnerability",
				"dateAdded": "2026-08-26",
				"dueDate": "2026-08-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.citrix.com/support-home/kbsearch/article?articleNumber=CTX696604 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-8452"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2019-1068",
			"title": "Microsoft SQL Server Remote Code Execution Vulnerability",
			"summary": "Microsoft SQL Server contains a remote code execution vulnerability that could allow an attacker to execute code in the context of the SQL Server Database Engine service account.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-26T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SQL Server",
			"cwe": null,
			"kev": {
				"name": "Microsoft SQL Server Remote Code Execution Vulnerability",
				"dateAdded": "2026-08-26",
				"dueDate": "2026-08-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2019-1068 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2019-1068"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-60004",
			"title": "Gitea Code Injection Vulnerability",
			"summary": "Gitea contains a code injection vulnerability that allows an attacker with repository write access to send a malicious patch to the diffpatch API endpoint to plant an executable Git hook and run shell commands as the Gitea service account.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-25T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Gitea",
			"product": "Gitea",
			"cwe": null,
			"kev": {
				"name": "Gitea Code Injection Vulnerability",
				"dateAdded": "2026-08-25",
				"dueDate": "2026-08-28",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/go-gitea/gitea/security/advisories/GHSA-rcr6-4jqh-j84m ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-60004"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-21962",
			"title": "Oracle HTTP Server and Oracle Weblogic Server Proxy Plug-in Improper Access Control Vulnerability",
			"summary": "Oracle HTTP Server and Oracle Weblogic Server Proxy Plug-in contain an improper access control vulnerability that can result in unauthorized creation, deletion or modification access to critical data as well as unauthorized access to critical data or complete access to all Oracle HTTP Server and Oracle Weblogic Server Proxy Plug-in accessible data.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-24T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Oracle",
			"product": "HTTP Server and Oracle Weblogic Server Proxy Plug-in",
			"cwe": null,
			"kev": {
				"name": "Oracle HTTP Server and Oracle Weblogic Server Proxy Plug-in Improper Access Control Vulnerability",
				"dateAdded": "2026-08-24",
				"dueDate": "2026-08-27",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.oracle.com/security-alerts/cpujan2026.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-21962"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-73570",
			"title": "Zimbra Collaboration Suite (ZCS) OS Command Injection Vulnerability",
			"summary": "Zimbra Collaboration Suite (ZCS) contains an OS command injection vulnerability which could allow an unauthenticated attacker to send specially crafted SMTP requests that may result in execution of arbitrary operating system commands as the Zimbra user.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-21T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Synacor",
			"product": "Zimbra Collaboration Suite (ZCS)",
			"cwe": null,
			"kev": {
				"name": "Zimbra Collaboration Suite (ZCS) OS Command Injection Vulnerability",
				"dateAdded": "2026-08-21",
				"dueDate": "2026-08-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://wiki.zimbra.com/wiki/Zimbra_Security_Advisories ; https://blog.zimbra.com/2026/07/patch-release-update-zimbra-10-1-20/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-72530",
			"title": "TrueConf Server Code Injection Vulnerability",
			"summary": "TrueConf Server contains a code injection vulnerability that could allow an unauthorized remote attacker with network access via port 4307/TCP to use a specially crafted script to break out of the isolated environment and execute arbitrary code on the host system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "TrueConf",
			"product": "Server",
			"cwe": null,
			"kev": {
				"name": "TrueConf Server Code Injection Vulnerability",
				"dateAdded": "2026-08-20",
				"dueDate": "2026-09-03",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://trueconf.com/blog/news/security-fixes-updates-and-advisories ; https://ics-cert.kaspersky.com/advisories/2026/08/11/trueconf-server-breakout-from-isolated-environment/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prior"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-72529",
			"title": "TrueConf Server Missing Authentication for Critical Function Vulnerability",
			"summary": "TrueConf Server contains a missing authentication for critical function vulnerability which could allow a remote unauthorized attacker with network access via port 4307/TCP to execute an arbitrary script.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-20T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "TrueConf",
			"product": "Server",
			"cwe": null,
			"kev": {
				"name": "TrueConf Server Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-08-20",
				"dueDate": "2026-08-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://trueconf.com/blog/news/security-fixes-updates-and-advisories ; https://ics-cert.kaspersky.com/advisories/2026/08/11/trueconf-server-missing-authentication-for-critical-function/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guid"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-64849",
			"title": "MLflow Server-Side Request Forgery Vulnerability",
			"summary": "MLflow contains a server-side request forgery vulnerability that can allow attackers to reach internal or cloud metadata services and receive response_status and response_body.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-19T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "MLflow",
			"product": "MLflow",
			"cwe": null,
			"kev": {
				"name": "MLflow Server-Side Request Forgery Vulnerability",
				"dateAdded": "2026-08-19",
				"dueDate": "2026-09-02",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/mlflow/mlflow/pull/24258 ; https://github.com/mlflow/mlflow/issues/24179 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-6484"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-33824",
			"title": "Microsoft Internet Key Exchange (IKE) Service Extensions Double Free Vulnerability",
			"summary": "Microsoft Internet Key Exchange (IKE) Service Extensions contains a double free vulnerability that could enable remote code execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Internet Key Exchange (IKE) Service Extensions",
			"cwe": null,
			"kev": {
				"name": "Microsoft Internet Key Exchange (IKE) Service Extensions Double Free Vulnerability",
				"dateAdded": "2026-08-18",
				"dueDate": "2026-08-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-33824 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-33824"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-59310",
			"title": "Broadcom VMware vCenter Path Traversal Vulnerability",
			"summary": "Broadcom VMware vCenter contains a path traversal vulnerability which could allow a threat actor with network access to vCenter to execute arbitrary code.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Broadcom",
			"product": "VMware vCenter",
			"cwe": null,
			"kev": {
				"name": "Broadcom VMware vCenter Path Traversal Vulnerability",
				"dateAdded": "2026-08-18",
				"dueDate": "2026-08-21",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.broadcom.com/web/ecx/support-content-notification/-/external/content/SecurityAdvisories/0/38017 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-55040",
			"title": "Microsoft SharePoint Weak Authentication Vulnerability",
			"summary": "Microsoft SharePoint contains a weak authentication vulnerability which allows an unauthorized attacker to bypass a security feature over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SharePoint",
			"cwe": null,
			"kev": {
				"name": "Microsoft SharePoint Weak Authentication Vulnerability",
				"dateAdded": "2026-08-18",
				"dueDate": "2026-08-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-55040 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-55040"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-65400",
			"title": "Apple macOS Improper Authentication Vulnerability",
			"summary": "Apple macOS contains an improper authentication vulnerability that could allow an attacker on the network to authenticate to Screen Sharing without valid credentials.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Apple",
			"product": "macOS",
			"cwe": null,
			"kev": {
				"name": "Apple macOS Improper Authentication Vulnerability",
				"dateAdded": "2026-08-18",
				"dueDate": "2026-08-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.apple.com/en-us/148170; https://support.apple.com/en-us/148171; https://support.apple.com/en-us/148172 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.go"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-62593",
			"title": "Ray-Project Ray Code Injection Vulnerability",
			"summary": "Ray-Project Ray contains a code injection vulnerability that could allow remote code execution. Developers using Ray as a development tool may be exposed to this vulnerability exploitable through Firefox and Safari.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-17T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ray-Project",
			"product": "Ray",
			"cwe": null,
			"kev": {
				"name": "Ray-Project Ray Code Injection Vulnerability",
				"dateAdded": "2026-08-17",
				"dueDate": "2026-08-20",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/ray-project/ray/security/advisories/GHSA-q279-jhrf-cc6v ; https://github.com/ray-project/ray/commit/70e7c72780bdec075dba6cad1afe0832772bfe09 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20349",
			"title": "Cisco Secure Firewall Adaptive Security Appliance (ASA) and Secure Firewall Threat Defense (FTD) Heap Inspection Vulnerability",
			"summary": "Cisco Secure Firewall Adaptive Security Appliance (ASA) and Secure Firewall Threat Defense (FTD) contain a heap inspection vulnerability that could allow an unauthenticated, remote attacker to cause the device to reload unexpectedly, resulting in a denial of service (DoS) condition.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Secure Firewall Adaptive Security Appliance (ASA) and Secure Firewall Threat Defense (FTD)",
			"cwe": null,
			"kev": {
				"name": "Cisco Secure Firewall Adaptive Security Appliance (ASA) and Secure Firewall Threat Defense (FTD) Heap Inspection Vulnerability",
				"dateAdded": "2026-08-11",
				"dueDate": "2026-08-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-vpn-dos-dzv4mQFF ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/d"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-68820",
			"title": "Microsoft Windows Ancillary Function Driver for WinSock Use-After-Free Vulnerability",
			"summary": "Microsoft Windows Ancillary Function Driver for WinSock contains a use-after-free vulnerability that allows an authorized attacker to elevate privileges locally.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Windows Ancillary Function Driver for WinSock",
			"cwe": null,
			"kev": {
				"name": "Microsoft Windows Ancillary Function Driver for WinSock Use-After-Free Vulnerability",
				"dateAdded": "2026-08-11",
				"dueDate": "2026-08-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://portal.msrc.microsoft.com/en-US/security-guidance/advisory/CVE-2026-68820 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-68820"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-72898",
			"title": "Metabase SQL Injection Vulnerability",
			"summary": "Metabase contains a SQL Injection vulnerability that allows an unauthenticated remote attacker to inject arbitrary SQL into the Metabase application database, which can give them administrator access to the instance. From there, the attacker could change the application configuration, steal stored credentials for the connected databases, read any data accessible through those connections, and export data.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Metabase",
			"product": "Metabase",
			"cwe": null,
			"kev": {
				"name": "Metabase SQL Injection Vulnerability",
				"dateAdded": "2026-08-11",
				"dueDate": "2026-08-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.metabase.com/blog/security-update ; https://github.com/metabase/metabase/security/advisories/GHSA-vwf4-m7j8-wcjf ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.n"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-8037",
			"title": "Progress LoadMaster Command Injection Vulnerability",
			"summary": "Progress LoadMaster contains a command injection vulnerability that allows an un-authenticated attacker to execute arbitrary commands on the LoadMaster appliance by exploiting unsanitized input in multiple command endpoints.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-07T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Progress",
			"product": "LoadMaster",
			"cwe": null,
			"kev": {
				"name": "Progress LoadMaster Command Injection Vulnerability",
				"dateAdded": "2026-08-07",
				"dueDate": "2026-08-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://community.progress.com/s/article/LoadMaster-Critical-Security-Bulletin-June-2026-CVE-2026-8037-CVE-2026-33691 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-63077",
			"title": "JetBrains TeamCity Deserialization of Untrusted Data Vulnerability",
			"summary": "JetBrains TeamCity contains a deserialization of untrusted data vulnerability that could allow unauthenticated remote code execution via the agent polling protocol.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-05T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "JetBrains",
			"product": "TeamCity",
			"cwe": null,
			"kev": {
				"name": "JetBrains TeamCity Deserialization of Untrusted Data Vulnerability",
				"dateAdded": "2026-08-05",
				"dueDate": "2026-08-08",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://blog.jetbrains.com/teamcity/2026/07/cve-2026-63077/; https://www.jetbrains.com/privacy-security/issues-fixed/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-18556",
			"title": "N-able N-central Authentication Bypass Using an Alternate Path or Channel Vulnerability",
			"summary": "N-able N-central contains an authentication bypass using an alternate path or channel that allows for authentication bypass.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-04T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "N-able",
			"product": "N-central",
			"cwe": null,
			"kev": {
				"name": "N-able N-central Authentication Bypass Using an Alternate Path or Channel Vulnerability",
				"dateAdded": "2026-08-04",
				"dueDate": "2026-08-07",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://uptime.n-able.com/ ; https://status.n-able.com/2026/08/02/n-central-2026-3-hotfix-1-mitigation-for-cve-2026-18577/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nis"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-34486",
			"title": "Apache Tomcat Missing Encryption of Sensitive Data Vulnerability",
			"summary": "Apache Tomcat contains a missing encryption of sensitive data vulnerability that allows the bypass of the EncryptInterceptor. This vulnerability can be chained with CVE‑2025‑24813.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-04T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Apache",
			"product": "Tomcat",
			"cwe": null,
			"kev": {
				"name": "Apache Tomcat Missing Encryption of Sensitive Data Vulnerability",
				"dateAdded": "2026-08-04",
				"dueDate": "2026-08-07",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://lists.apache.org/thread/9510k5p5zdvt9pkkgtyp85mvwxo2qrly ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-34486"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-9198",
			"title": "IBM Langflow Code Injection Vulnerability",
			"summary": "Langflow contains a code injection vulnerability that allows unauthenticated attackers to achieve full remote code execution on default Langflow deployments.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-04T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "IBM",
			"product": "Langflow",
			"cwe": null,
			"kev": {
				"name": "IBM Langflow Code Injection Vulnerability",
				"dateAdded": "2026-08-04",
				"dueDate": "2026-08-07",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.ibm.com/support/pages/node/7278927 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-9198"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-18577",
			"title": "N-able N-central Authentication Bypass Using an Alternate Path or Channel Vulnerability",
			"summary": "N-able N-central contains an authentication bypass using an alternate path or channel allows for authentication bypass and account takeover in N-central. This vulnerability is the result of an incomplete patch for CVE-2026-18556.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-08-03T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "N-able",
			"product": "N-central",
			"cwe": null,
			"kev": {
				"name": "N-able N-central Authentication Bypass Using an Alternate Path or Channel Vulnerability",
				"dateAdded": "2026-08-03",
				"dueDate": "2026-08-06",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://documentation.n-able.com/N-central/Release_Notes/GA/Content/N-central_2026.3_HF1_Release_Notes.htm ; https://status.n-able.com/2026/08/02/n-central-2026-3-hotfix-1-mitigation-for-cve-2026-18577/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-im"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20316",
			"title": "Cisco Secure Firewall Management Center Use of Hard-coded Password Vulnerability",
			"summary": "Cisco Secure Firewall Management Center (FMC) formerly known as Firepower Management Center contains a use of hard-coded password vulnerability that could allow an unauthenticated, remote attacker to log in to an affected device using a low-privileged account to access sensitive data within the impacted systems.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-29T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Secure Firewall Management Center (FMC)",
			"cwe": null,
			"kev": {
				"name": "Cisco Secure Firewall Management Center Use of Hard-coded Password Vulnerability",
				"dateAdded": "2026-07-29",
				"dueDate": "2026-08-01",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-fmc-static-cred-BET3Cjh ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/d"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-68686",
			"title": "Fortinet FortiOS Exposure of Sensitive Information to an Unauthorized Actor Vulnerability",
			"summary": "Fortinet FortiOS contains an exposure of sensitive information to an unauthorized actor vulnerability. This may allow a remote unauthenticated attacker to bypass the patch developed for the symbolic link persistency mechanism observed in some post-exploit cases, via crafted HTTP requests. An attacker would need first to have compromised the product via another vulnerability, at filesystem level.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Fortinet",
			"product": "FortiOS",
			"cwe": null,
			"kev": {
				"name": "Fortinet FortiOS Exposure of Sensitive Information to an Unauthorized Actor Vulnerability",
				"dateAdded": "2026-07-27",
				"dueDate": "2026-08-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://fortiguard.fortinet.com/psirt/FG-IR-25-934 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2025-68686"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-16812",
			"title": "Arista VeloCloud Orchestrator On-Prem OS Command Injection Vulnerability",
			"summary": "Arista VeloCloud Orchestrator On-Prem contains an OS command injection vulnerability that may allow a remote attacker to access privileged internal functionality and impact the VCO host. Successful exploitation may compromise the confidentiality, integrity, and availability of the orchestrator and data managed by the orchestrator.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-27T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Arista",
			"product": "VeloCloud Orchestrator",
			"cwe": null,
			"kev": {
				"name": "Arista VeloCloud Orchestrator On-Prem OS Command Injection Vulnerability",
				"dateAdded": "2026-07-27",
				"dueDate": "2026-07-30",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.arista.com/en/support/advisories-notices/security-advisory/24364-security-advisory-0144 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-16232",
			"title": "Check Point SmartConsole Improper Authentication Vulnerability",
			"summary": "Check Point SmartConsole contains an improper authentication vulnerability which could allow an unauthenticated remote attacker to obtain an application login token and use it to authenticate with full administrative privileges.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-22T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Check Point",
			"product": "SmartConsole",
			"cwe": null,
			"kev": {
				"name": "Check Point SmartConsole Improper Authentication Vulnerability",
				"dateAdded": "2026-07-22",
				"dueDate": "2026-07-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://support.checkpoint.com/results/sk/sk185169/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-16232"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-50522",
			"title": "Microsoft SharePoint Deserialization of Untrusted Data Vulnerability",
			"summary": "Microsoft SharePoint contains a deserialization of untrusted data vulnerability which could allow an unauthorized attacker to execute code over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-22T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SharePoint",
			"cwe": null,
			"kev": {
				"name": "Microsoft SharePoint Deserialization of Untrusted Data Vulnerability",
				"dateAdded": "2026-07-22",
				"dueDate": "2026-07-25",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-50522 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-50522"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-60137",
			"title": "WordPress Core SQL Injection Vulnerability",
			"summary": "WordPress Core contains a SQL injection vulnerability when a plugin or theme passes untrusted input to the parameter. This vulnerability can be chained with CVE-2026-63030 to allow an unauthenticated attacker to gain remote code execution on default WordPress installations.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-21T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "WordPress",
			"product": "Core",
			"cwe": null,
			"kev": {
				"name": "WordPress Core SQL Injection Vulnerability",
				"dateAdded": "2026-07-21",
				"dueDate": "2026-08-04",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://wordpress.org/news/2026/07/wordpress-7-0-2-release/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-60137"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-63030",
			"title": "WordPress Core Interpretation Conflict Vulnerability",
			"summary": "WordPress Core contains an interpretation conflict vulnerability that could allow an attacker to perform SQL Injection and achieve Remote Code Execution. This vulnerability can be chained with CVE-2026-60137.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-21T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "WordPress",
			"product": "Core",
			"cwe": null,
			"kev": {
				"name": "WordPress Core Interpretation Conflict Vulnerability",
				"dateAdded": "2026-07-21",
				"dueDate": "2026-07-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://wordpress.org/news/2026/07/wordpress-7-0-2-release/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-63030"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-0770",
			"title": "Langflow Inclusion of Functionality from Untrusted Control Sphere Vulnerability",
			"summary": "Langflow contains an inclusion of functionality from untrusted control sphere vulnerability that allows remote attackers to execute arbitrary code on affected installations.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-21T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Langflow",
			"product": "Langflow",
			"cwe": null,
			"kev": {
				"name": "Langflow Inclusion of Functionality from Untrusted Control Sphere Vulnerability",
				"dateAdded": "2026-07-21",
				"dueDate": "2026-07-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/langflow-ai/langflow/releases/tag/v1.9.0 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-0770"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2021-27137",
			"title": "DD-WRT Stack-Based Buffer Overflow Vulnerability",
			"summary": "DD-WRT contains a stack-based buffer overflow vulnerability that could allow an unauthenticated attacker to overflow an internal buffer used by UPnP and trigger a code execution vulnerability.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-21T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "DD-WRT",
			"product": "DD-WRT",
			"cwe": null,
			"kev": {
				"name": "DD-WRT Stack-Based Buffer Overflow Vulnerability",
				"dateAdded": "2026-07-21",
				"dueDate": "2026-07-24",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "This vulnerability affects a common open-source component, third-party library, proprietary implementation, or a protocol used by different products. Please check with specific vendors for information on patching status. For more information, please see: https://svn.dd-wrt.com/changeset/45724 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-ris"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-58644",
			"title": "Microsoft SharePoint Deserialization of Untrusted Data Vulnerability",
			"summary": "Microsoft SharePoint contains a deserialization of untrusted data vulnerability that allows an unauthorized attacker to execute code over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SharePoint",
			"cwe": null,
			"kev": {
				"name": "Microsoft SharePoint Deserialization of Untrusted Data Vulnerability",
				"dateAdded": "2026-07-16",
				"dueDate": "2026-07-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-58644 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-58644"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-25089",
			"title": "Fortinet FortiSandbox OS Command Injection Vulnerability",
			"summary": "Fortinet FortiSandbox, FortiSandbox Cloud, and FortiSandbox PaaS contain an OS command injection vulnerability that allows an unauthenticated attacker to execute unauthorized commands via specifically crafted HTTP requests.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Fortinet",
			"product": "FortiSandbox",
			"cwe": null,
			"kev": {
				"name": "Fortinet FortiSandbox OS Command Injection Vulnerability",
				"dateAdded": "2026-07-16",
				"dueDate": "2026-07-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://fortiguard.fortinet.com/psirt/FG-IR-26-141 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-25089"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-39808",
			"title": "Fortinet FortiSandbox OS Command Injection Vulnerability",
			"summary": "Fortinet FortiSandbox contains an OS command injection vulnerability that could allow an unauthenticated attacker to execute unauthorized code or commands via crafted HTTP requests.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Fortinet",
			"product": "FortiSandbox",
			"cwe": null,
			"kev": {
				"name": "Fortinet FortiSandbox OS Command Injection Vulnerability",
				"dateAdded": "2026-07-16",
				"dueDate": "2026-07-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://fortiguard.fortinet.com/psirt/FG-IR-26-100 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-39808"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-46817",
			"title": "Oracle E-Business Suite Improper Privilege Management Vulnerability",
			"summary": "Oracle E-Business Suite contains an improper privilege management vulnerability that allows an unauthenticated attacker with network access via HTTP to compromise Oracle Payments. Successful attacks of this vulnerability can result in takeover of Oracle Payments.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-15T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Oracle",
			"product": "E-Business Suite",
			"cwe": null,
			"kev": {
				"name": "Oracle E-Business Suite Improper Privilege Management Vulnerability",
				"dateAdded": "2026-07-15",
				"dueDate": "2026-07-18",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.oracle.com/security-alerts/cspumay2026.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-46817"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2023-4346",
			"title": "KNX Association KNX Protocol Connection Authorization Option 1 Overly Restrictive Account Lockout Mechanism Vulnerability",
			"summary": "KNX Association KNX Protocol Connection Authorization Option 1 contains an overly restrictive account lockout mechanism vulnerability that could allow an attacker to purge all devices without additional security options enabled and set a BCU key to lock the device.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-15T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "KNX Association",
			"product": "KNX Protocol Connection Authorization Option 1",
			"cwe": null,
			"kev": {
				"name": "KNX Association KNX Protocol Connection Authorization Option 1 Overly Restrictive Account Lockout Mechanism Vulnerability",
				"dateAdded": "2026-07-15",
				"dueDate": "2026-07-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.cisa.gov/news-events/ics-advisories/icsa-23-236-01 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2023-4346"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-56155",
			"title": "Microsoft Active Directory Federation Services Insufficient Granularity of Access Control Vulnerability",
			"summary": "Microsoft Active Directory Federation Services contains an insufficient granularity of access control vulnerability that allows an authorized attacker to elevate privileges locally.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "Active Directory Federation Services",
			"cwe": null,
			"kev": {
				"name": "Microsoft Active Directory Federation Services Insufficient Granularity of Access Control Vulnerability",
				"dateAdded": "2026-07-14",
				"dueDate": "2026-07-28",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-56155 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-56155; https://learn."
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-56164",
			"title": "Microsoft SharePoint Server Missing Authentication for Critical Function Vulnerability",
			"summary": "Microsoft SharePoint contains a missing authentication for critical function vulnerability that allows an unauthorized attacker to elevate privileges over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SharePoint Server",
			"cwe": null,
			"kev": {
				"name": "Microsoft SharePoint Server Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-07-14",
				"dueDate": "2026-07-17",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/en-US/vulnerability/CVE-2026-56164 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-56164"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-15409",
			"title": "SonicWall SMA1000 Appliances Server-Side Request Forgery Vulnerability",
			"summary": "SonicWall SMA1000 Appliances contain a server-side request forgery vulnerability that could allow a remote unauthenticated attacker to potentially cause the appliance to make requests to unintended location.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SonicWall",
			"product": "SMA1000 Appliances",
			"cwe": null,
			"kev": {
				"name": "SonicWall SMA1000 Appliances Server-Side Request Forgery Vulnerability",
				"dateAdded": "2026-07-14",
				"dueDate": "2026-07-17",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0008 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-15409"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-15410",
			"title": "SonicWall SMA1000 Appliances Code Injection Vulnerability",
			"summary": "SonicWall SMA1000 Appliances contain a code injection vulnerability which in specific conditions could potentially enable a remote authenticated attacker as administrator to execute arbitrary OS commands.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-14T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SonicWall",
			"product": "SMA1000 Appliances",
			"cwe": null,
			"kev": {
				"name": "SonicWall SMA1000 Appliances Code Injection Vulnerability",
				"dateAdded": "2026-07-14",
				"dueDate": "2026-07-17",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://psirt.global.sonicwall.com/vuln-detail/SNWLID-2026-0008 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-15410"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2008-4128",
			"title": "Cisco IOS Cross-Site Request Forgery Vulnerability",
			"summary": "Cisco IOS 12.4 contains multiple cross-site forgery vulnerabilities that allows remote attackers to execute arbitrary commands via (1) a certain \"show privilege\" command to the /level/15/exec/- URI, and (2) a certain \"alias exec\" command to the /level/15/exec/-/configure/http URI.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-13T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "IOS",
			"cwe": null,
			"kev": {
				"name": "Cisco IOS Cross-Site Request Forgery Vulnerability",
				"dateAdded": "2026-07-13",
				"dueDate": "2026-07-16",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.cisco.com/c/en/us/obsolete/ios-nx-os-software/cisco-ios-software-releases-12-4-mainline.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-56291",
			"title": "Balbooa Forms Unrestricted Upload of File with Dangerous Type Vulnerability",
			"summary": "Balbooa Forms contains an unrestricted upload of file with dangerous type vulnerability that allows an unauthenticated arbitrary file upload which could allow uploading of executable files leading to full RCE.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Balbooa",
			"product": "Forms",
			"cwe": null,
			"kev": {
				"name": "Balbooa Forms Unrestricted Upload of File with Dangerous Type Vulnerability",
				"dateAdded": "2026-07-10",
				"dueDate": "2026-07-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.balbooa.com/joomla-forms ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-56291"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48939",
			"title": "iCagenda Unrestricted Upload of File with Dangerous Type Vulnerability",
			"summary": "iCagenda contains an unrestricted upload of file with dangerous type vulnerability that allows the upload of arbitrary files in the file attachment feature, ultimately resulting in PHP code upload and execution.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-10T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "iCagenda",
			"product": "iCagenda",
			"cwe": null,
			"kev": {
				"name": "iCagenda Unrestricted Upload of File with Dangerous Type Vulnerability",
				"dateAdded": "2026-07-10",
				"dueDate": "2026-07-13",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.icagenda.com/#download ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-48939"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48908",
			"title": "JoomShaper SP Page Builder Unrestricted Upload of File with Dangerous Type Vulnerability",
			"summary": "JoomShaper SP Page Builder contains an unrestricted upload of file with dangerous type vulnerability that allows unauthenticated users to upload arbitrary files, ultimately resulting in the upload and execution of PHP code.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-07T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "JoomShaper",
			"product": "SP Page Builder",
			"cwe": null,
			"kev": {
				"name": "JoomShaper SP Page Builder Unrestricted Upload of File with Dangerous Type Vulnerability",
				"dateAdded": "2026-07-07",
				"dueDate": "2026-07-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://extensions.joomla.org/extension/sp-page-builder/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-48908"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-55255",
			"title": "Langflow Authorization Bypass Through User-Controlled Key Vulnerability",
			"summary": "Langflow contains an authorization bypass through user-controlled key vulnerability which allows an authenticated attacker to execute any flow belonging to another user by specifying the victim's flow ID in the request.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-07T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Langflow",
			"product": "Langflow",
			"cwe": null,
			"kev": {
				"name": "Langflow Authorization Bypass Through User-Controlled Key Vulnerability",
				"dateAdded": "2026-07-07",
				"dueDate": "2026-07-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://github.com/langflow-ai/langflow/security/advisories/GHSA-qrpv-q767-xqq2 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-55255"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-56290",
			"title": "Joomlack Page Builder Improper Access Control Vulnerability",
			"summary": "Joomlack Page Builder contains an improper access control vulnerability that could allow for remote code execution via unauthenticated arbitrary file upload.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-07T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Joomlack",
			"product": "Page Builder",
			"cwe": null,
			"kev": {
				"name": "Joomlack Page Builder Improper Access Control Vulnerability",
				"dateAdded": "2026-07-07",
				"dueDate": "2026-07-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.joomlack.fr/en/joomla-extensions/page-builder-ck ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-56290"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48282",
			"title": "Adobe ColdFusion Path Traversal Vulnerability",
			"summary": "Adobe ColdFusion contains a path traversal vulnerability that could lead to arbitrary code execution in the context of the current user.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-07T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Adobe",
			"product": "ColdFusion",
			"cwe": null,
			"kev": {
				"name": "Adobe ColdFusion Path Traversal Vulnerability",
				"dateAdded": "2026-07-07",
				"dueDate": "2026-07-10",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://helpx.adobe.com/security/products/coldfusion/apsb26-68.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-48282"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-45659",
			"title": "Microsoft SharePoint Server Deserialization of Untrusted Data Vulnerability",
			"summary": "Microsoft SharePoint Server contains a deserialization of untrusted data vulnerability which allows an authorized attacker to execute code over a network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-07-01T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Microsoft",
			"product": "SharePoint Server",
			"cwe": null,
			"kev": {
				"name": "Microsoft SharePoint Server Deserialization of Untrusted Data Vulnerability",
				"dateAdded": "2026-07-01",
				"dueDate": "2026-07-04",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://msrc.microsoft.com/update-guide/vulnerability/CVE-2026-45659 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-45659"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48558",
			"title": "SimpleHelp Authentication Bypass Vulnerability",
			"summary": "SimpleHelp contains an authentication bypass vulnerability in the OIDC authentication flow. When OIDC authentication is configured, identity tokens submitted during login are accepted without verifying their cryptographic signature. In a vulnerable configuration, a remote, unauthenticated attacker can submit a forged token containing arbitrary identity claims to obtain a fully authenticated technician session. In some configurations, this may also allow bypass of multi-factor authentication.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-29T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "SimpleHelp ",
			"product": "SimpleHelp",
			"cwe": null,
			"kev": {
				"name": "SimpleHelp Authentication Bypass Vulnerability",
				"dateAdded": "2026-06-29",
				"dueDate": "2026-07-02",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://simple-help.com/security/simplehelp-security-update-2026-05 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-48558"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-12569",
			"title": "PTC Windchill and FlexPLM Improper Input Validation Vulnerability",
			"summary": "PTC Windchill and FlexPLM contains an improper input validation vulnerability allowing an unauthenticated, remote attacker to execute arbitrary code by sending a malicious request to the network.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-25T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "PTC",
			"product": "Windchill and FlexPLM",
			"cwe": null,
			"kev": {
				"name": "PTC Windchill and FlexPLM Improper Input Validation Vulnerability",
				"dateAdded": "2026-06-25",
				"dueDate": "2026-06-28",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.ptc.com/en/support/article/CS473270 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-12569"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20230",
			"title": "Cisco Unified Communications Manager Server-Side Request Forgery (SSRF) Vulnerability",
			"summary": "Cisco Unified Communications Manager (Unified CM) and Cisco Unified Communications Manager Session Management Edition (Unified CM SME) contain a server-side request forgery (SSRF) Vulnerability that could allow an unauthenticated, remote attacker to write files to the underlying operating system that could be used later to elevate to root.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-25T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Unified Communications Manager",
			"cwe": null,
			"kev": {
				"name": "Cisco Unified Communications Manager Server-Side Request Forgery (SSRF) Vulnerability",
				"dateAdded": "2026-06-25",
				"dueDate": "2026-06-28",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.cisco.com/c/en/us/support/docs/csa/cisco-sa-cucm-ssrf-cXPnHcW.html ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-20230"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2025-67038",
			"title": "Lantronix EDS5000 Code Injection Vulnerability",
			"summary": "Lantronix EDS5000 contains a code injection vulnerability that could allow attackers to inject arbitrary OS commands into the username parameter. Injected commands are executed with root privileges.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-23T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Lantronix",
			"product": "EDS5000",
			"cwe": null,
			"kev": {
				"name": "Lantronix EDS5000 Code Injection Vulnerability",
				"dateAdded": "2026-06-23",
				"dueDate": "2026-06-26",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://ltrxdev.atlassian.net/wiki/spaces/LTRXTS/pages/2538438657/Latest+Firmware+for+the+EDS5000+series+EDS5008+EDS5016+EDS5032 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://n"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-34910",
			"title": "Ubiquiti UniFi OS Improper Input Validation Vulnerability",
			"summary": "Ubiquiti UniFi OS contains an improper input validation vulnerability which could allow a malicious actor with access to the network to conduct command injection.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-23T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ubiquiti",
			"product": "UniFi OS",
			"cwe": null,
			"kev": {
				"name": "Ubiquiti UniFi OS Improper Input Validation Vulnerability",
				"dateAdded": "2026-06-23",
				"dueDate": "2026-06-26",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://community.ui.com/releases/Security-Advisory-Bulletin-064-064/84811c09-4cf4-42ab-bd61-cc994445963b ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-34909",
			"title": "Ubiquiti UniFi OS Path Traversal Vulnerability",
			"summary": "Ubiquiti UniFi OS contains a path traversal vulnerability which could allow a malicious actor with access to the network to access files on the underlying system that could be manipulated to access an underlying account.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-23T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ubiquiti",
			"product": "UniFi OS",
			"cwe": null,
			"kev": {
				"name": "Ubiquiti UniFi OS Path Traversal Vulnerability",
				"dateAdded": "2026-06-23",
				"dueDate": "2026-06-26",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://community.ui.com/releases/Security-Advisory-Bulletin-064-064/84811c09-4cf4-42ab-bd61-cc994445963b ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-34908",
			"title": "Ubiquiti UniFi OS Improper Access Control Vulnerability",
			"summary": "Ubiquiti UniFi OS contains an improper access control vulnerability which could allow a malicious actor with access to the network to make unauthorized changes to the system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-23T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ubiquiti",
			"product": "UniFi OS",
			"cwe": null,
			"kev": {
				"name": "Ubiquiti UniFi OS Improper Access Control Vulnerability",
				"dateAdded": "2026-06-23",
				"dueDate": "2026-06-26",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://community.ui.com/releases/Security-Advisory-Bulletin-064-064/84811c09-4cf4-42ab-bd61-cc994445963b ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20253",
			"title": "Splunk Enterprise Missing Authentication for Critical Function Vulnerability",
			"summary": "Splunk Enterprise contains a missing authentication for critical function vulnerability which could allow an unauthenticated user to create or truncate arbitrary files through a PostgreSQL sidecar service endpoint.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-18T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Splunk",
			"product": "Enterprise",
			"cwe": null,
			"kev": {
				"name": "Splunk Enterprise Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-06-18",
				"dueDate": "2026-06-21",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://advisory.splunk.com/advisories/SVD-2026-0603 ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-20253"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-48907",
			"title": "Widget Factory Joomla Content Editor Improper Access Control Vulnerability",
			"summary": "Widget Factory Joomla Content Editor contains an improper access control vulnerability which could allow for upload and execution of PHP code via the creation of new editor profiles for unauthenticated users.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-16T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Widget Factory",
			"product": "Joomla Content Editor",
			"cwe": null,
			"kev": {
				"name": "Widget Factory Joomla Content Editor Improper Access Control Vulnerability",
				"dateAdded": "2026-06-16",
				"dueDate": "2026-06-19",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.joomlacontenteditor.net/news/jce-security-update-and-a-free-patch-for-older-sites ; https://www.joomlacontenteditor.net/support/changelog/editor ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-up"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-54420",
			"title": "LiteSpeed cPanel Plugin UNIX Symbolic Link (Symlink) Following Vulnerability",
			"summary": "LiteSpeed cPanel plugin contains a UNIX symbolic link (Symlink) following vulnerability that could allow a user with FTP or web shell access on a shared hosting server running CloudLinux/CageFS.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-15T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "LiteSpeed",
			"product": "cPanel Plugin",
			"cwe": null,
			"kev": {
				"name": "LiteSpeed cPanel Plugin UNIX Symbolic Link (Symlink) Following Vulnerability",
				"dateAdded": "2026-06-15",
				"dueDate": "2026-06-18",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://blog.litespeedtech.com/2026/06/01/security-update-for-litespeed-cpanel-plugin-2/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE-2026-54420"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20262",
			"title": "Cisco Catalyst SD-WAN Manager Directory or Path Traversal Vulnerability",
			"summary": "Cisco Catalyst SD-WAN Manager contains a directory or path traversal vulnerability that could allow an authenticated, remote attacker to create a file or overwrite any file on the filesystem of an affected system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-15T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Catalyst SD-WAN Manager",
			"cwe": null,
			"kev": {
				"name": "Cisco Catalyst SD-WAN Manager Directory or Path Traversal Vulnerability",
				"dateAdded": "2026-06-15",
				"dueDate": "2026-06-29",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-arbfw-c2rZvQ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-35273",
			"title": "Oracle PeopleSoft Enterprise PeopleTools Missing Authentication for Critical Function Vulnerability",
			"summary": "Oracle PeopleSoft Enterprise PeopleTools contains a missing authentication for critical function vulnerability which could allow an unauthenticated attacker to obtain takeover of PeopleSoft Enterprise PeopleTools.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-12T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Oracle",
			"product": "PeopleSoft Enterprise PeopleTools",
			"cwe": null,
			"kev": {
				"name": "Oracle PeopleSoft Enterprise PeopleTools Missing Authentication for Critical Function Vulnerability",
				"dateAdded": "2026-06-12",
				"dueDate": "2026-06-15",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://www.oracle.com/security-alerts/alert-cve-2026-35273.html ; https://support.oracle.com/signin/ ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/detail/CVE"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-10520",
			"title": "Ivanti Sentry OS Command Injection Vulnerability",
			"summary": "Ivanti Sentry (formerly known as MobileIron Sentry) contains an OS command injection vulnerability which could allow a remote unauthenticated user to achieve root-level remote code execution. This vulnerability can be successfully exploited in cases where the Sentry appliance is in an unmanaged state with its endpoints externally reachable. The use of mTLS with EPMM or restricted HTTPS access through Neurons for MDM makes interfaces inaccessible to external actors.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-11T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Ivanti",
			"product": "Sentry",
			"cwe": null,
			"kev": {
				"name": "Ivanti Sentry OS Command Injection Vulnerability",
				"dateAdded": "2026-06-11",
				"dueDate": "2026-06-14",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations in accordance with vendor instructions, ensuring compliance with CISA’s BOD 26-04 Prioritizing Security Updates Based on Risk (see URL in Notes) guidance and CISA’s “Forensics Triage Requirements” (see URL in Notes). Follow applicable BOD 26-04 guidance for cloud services or discontinue use of the product if mitigations are unavailable. Stakeholders are responsible for evaluating each asset's internet exposure and ensuring adherence to BOD 26-04 patching guidelines.",
				"notes": "https://hub.ivanti.com/s/article/Security-Advisory-Ivanti-Sentry-CVE-2026-10520-CVE-2026-10523?language=en_US ; BOD 26-04: https://www.cisa.gov/news-events/directives/bod-26-04-prioritizing-security-updates-based-risk ; Forensics Triage Requirements: https://www.cisa.gov/news-events/directives/bod-26-04-implementation-guidance-prioritizing-security-updates-based-risk ; https://nvd.nist.gov/vuln/de"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-11645",
			"title": "Google Chromium V8 Out-of-Bounds Read and Write Vulnerability",
			"summary": "Google Chromium V8 out-of-bounds read and write vulnerability that could allow a remote attacker to execute arbitrary code inside a sandbox via a crafted HTML page. This vulnerability could affect multiple web browsers that utilize Chromium, including, but not limited to, Google Chrome, Microsoft Edge, and Opera.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Google",
			"product": "Chromium V8",
			"cwe": null,
			"kev": {
				"name": "Google Chromium V8 Out-of-Bounds Read and Write Vulnerability",
				"dateAdded": "2026-06-09",
				"dueDate": "2026-06-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations per vendor instructions, follow applicable BOD 22-01 guidance for cloud services, or discontinue use of the product if mitigations are unavailable.",
				"notes": "https://chromereleases.googleblog.com/2026/06/stable-channel-update-for-desktop_0153744567.html ; https://issues.chromium.org/issues/506689381 ; https://nvd.nist.gov/vuln/detail/CVE-2026-11645"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-7473",
			"title": "Arista Extensible Operating System Incomplete Comparison with Missing Factors Vulnerability",
			"summary": "Arista Extensible Operating System (EOS) contains an incomplete comparison with missing factors vulnerability when the switch incorrectly decapsulate and forwards other unexpected tunneled packet with a destination IP matching its configured decapsulation IP.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Arista",
			"product": "Extensible Operating System",
			"cwe": null,
			"kev": {
				"name": "Arista Extensible Operating System Incomplete Comparison with Missing Factors Vulnerability",
				"dateAdded": "2026-06-09",
				"dueDate": "2026-06-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations per vendor instructions, follow applicable BOD 22-01 guidance for cloud services, or discontinue use of the product if mitigations are unavailable.",
				"notes": "https://www.arista.com/en/support/advisories-notices/security-advisory/24005-security-advisory-0137 ; https://nvd.nist.gov/vuln/detail/CVE-2026-7473"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-20245",
			"title": "Cisco Catalyst SD-WAN Manager Improper Encoding or Escaping of Output Vulnerability",
			"summary": "Cisco Catalyst SD-WAN Manager formerly SD-WAN vManage contains an improper encoding or escaping of output vulnerability. This vulnerability could allow an authenticated, local attacker to execute arbitrary commands as root by supplying a crafted file to the affected system.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-09T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Cisco",
			"product": "Catalyst SD-WAN Manager",
			"cwe": null,
			"kev": {
				"name": "Cisco Catalyst SD-WAN Manager Improper Encoding or Escaping of Output Vulnerability",
				"dateAdded": "2026-06-09",
				"dueDate": "2026-06-23",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations per vendor instructions, follow applicable BOD 22-01 guidance for cloud services, or discontinue use of the product if mitigations are unavailable.",
				"notes": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-privesc-4uxFrdzx ; https://nvd.nist.gov/vuln/detail/CVE-2026-20245"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-42271",
			"title": "BerriAI LiteLLM Command Injection Vulnerability",
			"summary": "BerriAI LiteLLM contains a command injection vulnerability that could allow any authenticated user, including holders of low-privilege internal-user keys, to run arbitrary commands on the host.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "BerriAI",
			"product": "LiteLLM",
			"cwe": null,
			"kev": {
				"name": "BerriAI LiteLLM Command Injection Vulnerability",
				"dateAdded": "2026-06-08",
				"dueDate": "2026-06-22",
				"ransomware": "Unknown",
				"requiredAction": "Apply mitigations per vendor instructions, follow applicable BOD 22-01 guidance for cloud services, or discontinue use of the product if mitigations are unavailable.",
				"notes": "This vulnerability affects a common open-source component, third-party library, or a protocol used by different products. Please check with specific vendors for information on patching status. For more information, please see: https://github.com/BerriAI/litellm/security/advisories/GHSA-v4p8-mg3p-g94g ; https://github.com/BerriAI/litellm/releases/tag/v1.83.7-stable ; https://nvd.nist.gov/vuln/detai"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-50751",
			"title": "Check Point Security Gateway Improper Authentication Vulnerability",
			"summary": "Check Point Security Gateway contains an improper authentication vulnerability in IKEv1 key exchange that could allow an unauthenticated remote attacker to bypass user authentication and establish a remote access VPN connection without a valid user password.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-06-08T00:00:00Z",
			"modified": null,
			"sources": ["cisa-kev"],
			"vendor": "Check Point",
			"product": "Security Gateway",
			"cwe": null,
			"kev": {
				"name": "Check Point Security Gateway Improper Authentication Vulnerability",
				"dateAdded": "2026-06-08",
				"dueDate": "2026-06-11",
				"ransomware": "Known",
				"requiredAction": "Apply mitigations per vendor instructions, follow applicable BOD 22-01 guidance for cloud services, or discontinue use of the product if mitigations are unavailable.",
				"notes": "https://blog.checkpoint.com/security/check-point-releases-important-hotfix-for-vulnerabilities-in-deprecated-ikev1-vpn-protocol/ ; https://support.checkpoint.com/results/sk/sk185033?_gl=1*1wqeqhc*_gcl_au*MTI1MzE5MjI2LjE3ODA5MzQ1NTM. ; https://nvd.nist.gov/vuln/detail/CVE-2026-50751"
			},
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
				"label": "CISA KEV catalog",
				"source": "cisa-kev"
			}]
		},
		{
			"id": "CVE-2026-110331",
			"title": "abrt: abrt: incomplete CVE-2026-54228/54229 fix — completeness gate bypassed via attacker-supplied count element",
			"summary": "",
			"severity": "HIGH",
			"cvss": 7.8,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-13T20:53:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2552067",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-110331.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2552067",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-110330",
			"title": "abrt: abrt: abrt-server trusts client-supplied PID= allowing unprivileged read of other processes' /proc environ",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.5,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N",
			"published": "2026-11-13T20:52:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2552065",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-110330.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2552065",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-128088",
			"title": "russh: russh: SSH agent lock bypass via unverified state during confirmation",
			"summary": "",
			"severity": "LOW",
			"cvss": 2.2,
			"vector": "CVSS:3.1/AV:L/AC:H/PR:L/UI:R/S:U/C:N/I:L/A:N",
			"published": "2026-11-13T19:07:42Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-367",
			"kev": null,
			"redhat": {
				"severity": "low",
				"bugzilla": "2573422",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-128088.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2573422",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-128087",
			"title": "russh: russh: Information disclosure via premature callback execution prior to host verification",
			"summary": "",
			"severity": "LOW",
			"cvss": 3.7,
			"vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N",
			"published": "2026-11-13T19:03:26Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-322",
			"kev": null,
			"redhat": {
				"severity": "low",
				"bugzilla": "2573415",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-128087.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2573415",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-128086",
			"title": "go.opentelemetry.io/otel: go.opentelemetry.io/otel/baggage: go.opentelemetry.io/otel/propagation: OpenTelemetry Go: Denial of Service via crafted baggage headers",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
			"published": "2026-11-13T18:54:15Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-770",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2573410",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-128086.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2573410",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-128085",
			"title": "go.opentelemetry.io/otel/sdk: go.opentelemetry.io/otel/sdk/log: go.opentelemetry.io/otel/trace: OpenTelemetry-Go: Denial of Service via attribute truncation bypass using Unicode re",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L",
			"published": "2026-11-13T18:53:14Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-135",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2573405",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-128085.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2573405",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-123177",
			"title": "dnf5: dnf5daemon-server: dnf5daemon-server: unauthenticated privileged cmdline package fetch/open via add_cmdline_packages",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.4,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:H",
			"published": "2026-11-13T12:00:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2567426",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-123177.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2567426",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-128824",
			"title": "quay: quay: reflected XSS via image_id in v1 registry error responses",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N",
			"published": "2026-11-13T08:13:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572952",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-128824.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572952",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-126206",
			"title": "loofah: Loofah: Cross-site scripting via improper data URI validation",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 6.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
			"published": "2026-11-12T20:51:36Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572831",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-126206.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572831",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-86324",
			"title": "foreman: authorization flaw in the Foreman::Controller::UserAware handling used by Api::V2::SshKeysController",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N",
			"published": "2026-11-12T18:50:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2529291",
				"statement": null,
				"packages": [
					"foreman-0:3.18.0.19-1.el9sat",
					"foreman-0:3.16.0.29-1.el9sat",
					"foreman-0:3.12.0.26-1.el8sat",
					"foreman-0:3.12.0.26-1.el9sat",
					"foreman-0:3.14.0.26-1.el9sat"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-86324.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2529291",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-86323",
			"title": "foreman: authorization flaw in the mail-notification endpoints implemented by Api::V2::MailNotificationsController",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N",
			"published": "2026-11-12T18:49:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2529290",
				"statement": null,
				"packages": [
					"foreman-0:3.18.0.19-1.el9sat",
					"foreman-0:3.16.0.29-1.el9sat",
					"foreman-0:3.12.0.26-1.el8sat",
					"foreman-0:3.12.0.26-1.el9sat",
					"foreman-0:3.14.0.26-1.el9sat"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-86323.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2529290",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-86322",
			"title": "foreman: authorization flaw in the Foreman::Controller::UserAware#find_user handling used by Api::V2::PersonalAccessTokensController",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T18:48:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2529289",
				"statement": null,
				"packages": [
					"foreman-0:3.18.0.19-1.el9sat",
					"foreman-0:3.16.0.29-1.el9sat",
					"foreman-0:3.12.0.26-1.el8sat",
					"foreman-0:3.12.0.26-1.el9sat",
					"foreman-0:3.14.0.26-1.el9sat"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-86322.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2529289",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-107443",
			"title": "foreman: foreman: API host template render discloses secrets to view_hosts users (incomplete CVE-2026-96659 fix)",
			"summary": "",
			"severity": "HIGH",
			"cvss": 7.7,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:N/A:N",
			"published": "2026-11-12T18:47:12Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2547760",
				"statement": null,
				"packages": [
					"foreman-0:3.18.0.19-1.el9sat",
					"foreman-0:3.16.0.29-1.el9sat",
					"foreman-0:3.12.0.26-1.el8sat",
					"foreman-0:3.12.0.26-1.el9sat",
					"foreman-0:3.14.0.26-1.el9sat"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-107443.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2547760",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-107360",
			"title": "rubygem-safemode: safemode: Jail allow-list bypass via op-assign expressions",
			"summary": "",
			"severity": "CRITICAL",
			"cvss": 9.6,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N",
			"published": "2026-11-12T18:46:45Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-183",
			"kev": null,
			"redhat": {
				"severity": "critical",
				"bugzilla": "2547645",
				"statement": null,
				"packages": ["rubygem-safemode-0:1.5.0-3.el8sat", "rubygem-safemode-0:1.5.0-3.el9sat"]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-107360.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2547645",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-107152",
			"title": "rubygem-smart_proxy_dynflow: Dynflow console authorizes any client certificate the capsule CA signed",
			"summary": "",
			"severity": "HIGH",
			"cvss": 7.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:L/A:N",
			"published": "2026-11-12T18:46:00Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-287",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2547374",
				"statement": null,
				"packages": [
					"rubygem-smart_proxy_dynflow-0:1.0.0-3.el9sat",
					"rubygem-smart_proxy_dynflow-0:0.9.4-2.el9sat",
					"rubygem-smart_proxy_dynflow-0:0.9.3-2.el9sat",
					"rubygem-smart_proxy_dynflow-0:0.9.3-2.el8sat"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-107152.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2547374",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-127101",
			"title": "sssd: sssd: NULL pointer dereference in PAM responder when protocol version negotiation is skipped",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.5,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H",
			"published": "2026-11-12T16:37:13Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-476",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572592",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-127101.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572592",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-127100",
			"title": "sssd: sssd: Local denial of service through unchecked OAuth2 JSON code type in PAM responder",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.5,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H",
			"published": "2026-11-12T16:37:05Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-476",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572591",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-127100.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572591",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-127099",
			"title": "sssd: sssd: Stack buffer overflow during RSA certificate-to-SSH key conversion",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.9,
			"vector": "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:L/A:H",
			"published": "2026-11-12T16:36:54Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-121",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572590",
				"statement": null,
				"packages": []
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-127099.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572590",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-6467",
			"title": "postgresql: postgresql: Privilege escalation via uncontrolled search path in extension management",
			"summary": "",
			"severity": "HIGH",
			"cvss": 7.2,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:32Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-427",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572538",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-6467.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572538",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-6460",
			"title": "postgresql: postgresql: Arbitrary code execution via type confusion in data definition commands",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:32Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572578",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-6460.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572578",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-18447",
			"title": "postgresql: postgresql: Arbitrary code execution via type confusion in SQL-language functions",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:31Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572532",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-18447.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572532",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-16240",
			"title": "postgresql: postgresql: Information disclosure in pg_basebackup via crafted backup manifest",
			"summary": "",
			"severity": "LOW",
			"cvss": 3.7,
			"vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:L/I:N/A:N",
			"published": "2026-11-12T14:15:31Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-134",
			"kev": null,
			"redhat": {
				"severity": "low",
				"bugzilla": "2572537",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-16240.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572537",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-14661",
			"title": "postgresql: postgresql: Persistent Denial of Service via arbitrary file append in sslkeylogfile parameter",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:H",
			"published": "2026-11-12T14:15:30Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-73",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572565",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-14661.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572565",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-16237",
			"title": "postgresql: postgresql: Security restriction bypass via INSERT ON CONFLICT on auto-updatable views",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 5.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N",
			"published": "2026-11-12T14:15:30Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572574",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-16237.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572574",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120154",
			"title": "postgresql: PostgreSQL: Row-level security bypass via INSERT ON CONFLICT DO UPDATE",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N",
			"published": "2026-11-12T14:15:29Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-268",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572552",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120154.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572552",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120153",
			"title": "postgresql: postgresql: arbitrary code execution via SQL injection in extension-script substitutions",
			"summary": "",
			"severity": "HIGH",
			"cvss": 7.2,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:29Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-89",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572571",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120153.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572571",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120152",
			"title": "postgresql: postgresql: Information disclosure via use-after-free in pg_show_all_settings()",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N",
			"published": "2026-11-12T14:15:28Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-825",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572564",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120152.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572564",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120150",
			"title": "postgresql: postgresql: Arbitrary code execution via use-after-free in expanded-record domain checks",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:27Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-825",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572547",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120150.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572547",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120151",
			"title": "postgresql: postgresql: Arbitrary code execution via PL/pgSQL type confusion",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:27Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572556",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120151.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572556",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120149",
			"title": "postgresql: postgresql: Arbitrary code execution via foreign batch inserts",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:26Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-787",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572548",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120149.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572548",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120148",
			"title": "postgresql: postgresql: Arbitrary code execution via type confusion in extended statistics",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:N",
			"published": "2026-11-12T14:15:25Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572555",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120148.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572555",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120147",
			"title": "postgresql: postgresql: Arbitrary code execution via use-after-free in dblink extension",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:25Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-825",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572559",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120147.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572559",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120146",
			"title": "postgresql: PostgreSQL: Authorization bypass via REASSIGN OWNED command",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N",
			"published": "2026-11-12T14:15:24Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-267",
			"kev": null,
			"redhat": {
				"severity": "moderate",
				"bugzilla": "2572575",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120146.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572575",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120144",
			"title": "postgresql: PostgreSQL: Arbitrary code execution via incomplete type-cache invalidation",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:23Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572533",
				"statement": null,
				"packages": [
					"postgresql17-main-17.11-1.2.hum1",
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120144.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572533",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120145",
			"title": "postgresql: postgresql: Arbitrary code execution via system catalog replication target",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:23Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-250",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572553",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120145.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572553",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120143",
			"title": "postgresql: postgresql: Arbitrary code execution via use-after-free in trigger functions",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:22Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-825",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572542",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120143.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572542",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120142",
			"title": "postgresql: postgresql: Arbitrary code execution via type confusion in anonymous RECORD types",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:22Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572549",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120142.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572549",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120141",
			"title": "postgresql: postgresql: Arbitrary code execution via type confusion in materialized set-returning functions",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:21Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-843",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572531",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120141.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572531",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-116336",
			"title": "postgresql: postgresql: Arbitrary code execution via dropped index in REINDEX CONCURRENTLY",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:20Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-825",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572563",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-116336.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572563",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-120139",
			"title": "postgresql: postgresql: Arbitrary code execution via integer wraparound in tuple-size calculations",
			"summary": "",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-12T14:15:20Z",
			"modified": null,
			"sources": ["redhat"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-190",
			"kev": null,
			"redhat": {
				"severity": "important",
				"bugzilla": "2572580",
				"statement": null,
				"packages": [
					"postgresql18-main-18.7-0.1.hum1",
					"libpq-main-18.7-0.1.hum1",
					"postgresql17-main-17.12-0.1.hum1"
				]
			},
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://access.redhat.com/hydra/rest/securitydata/cve/CVE-2026-120139.json",
				"label": "Red Hat CVE",
				"source": "redhat"
			}, {
				"href": "https://bugzilla.redhat.com/show_bug.cgi?id=2572580",
				"label": "Red Hat Bugzilla",
				"source": "redhat"
			}]
		},
		{
			"id": "CVE-2026-129254",
			"title": "A flaw has been found in Opixido OCMS up to b7c15660aba83d96677c1a9abaa69c082a24f21c",
			"summary": "A flaw has been found in Opixido OCMS up to b7c15660aba83d96677c1a9abaa69c082a24f21c. This impacts an unknown function of the file admin/TUI/index.php of the component Admin TUI. This manipulation of the argument img causes cross site scripting. The attack can be initiated remotely. The exploit has been published and may be used. Continious delivery with rolling releases is used by this product. Therefore, no version details of affected nor updated releases are available. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N",
			"published": "2026-11-14T13:17:21Z",
			"modified": "2026-11-14T13:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://drive.google.com/file/d/13Hq-o7MxVw-gw6gI1aZtelqIUt7hR3AE/view?usp=sharing",
					"label": "https://drive.google.com/file/d/13Hq-o7MxVw-gw6gI1aZtelqIUt7hR3AE/view?usp=sharing",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Usama-Hanif131/CVE-2026-129254/blob/main/README.md",
					"label": "https://github.com/Usama-Hanif131/CVE-2026-129254/blob/main/README.md",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129254",
					"label": "https://vuldb.com/cve/CVE-2026-129254",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1042949",
					"label": "https://vuldb.com/submit/1042949",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437282",
					"label": "https://vuldb.com/vuln/437282",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437282/cti",
					"label": "https://vuldb.com/vuln/437282/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129255",
			"title": "A vulnerability was identified in CoolerMaster MASTERPLUS+ 1.9.6",
			"summary": "A vulnerability was identified in CoolerMaster MASTERPLUS+ 1.9.6. This affects the function sub_11504 in the library WinRing0x64.sys of the component Device Driver. The manipulation of the argument PhysicalAddress leads to incorrect default permissions. The attack can only be performed from a local environment. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-14T13:17:21Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-266",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://vuldb.com/cve/CVE-2026-129255",
					"label": "https://vuldb.com/cve/CVE-2026-129255",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1042970",
					"label": "https://vuldb.com/submit/1042970",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437286",
					"label": "https://vuldb.com/vuln/437286",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437286/cti",
					"label": "https://vuldb.com/vuln/437286/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129428",
			"title": "Pulse from 5.0.17 before 6.8.0 contains a missing authorization vulnerability in the /api/ai/approvals endpoints that allows authenticated viewer-level users to manage approval req",
			"summary": "Pulse from 5.0.17 before 6.8.0 contains a missing authorization vulnerability in the /api/ai/approvals endpoints that allows authenticated viewer-level users to manage approval requests. Attackers can list pending requests to expose proposed commands and targets, and approve or deny other users' requests, altering decision and audit state.",
			"severity": "MEDIUM",
			"cvss": 5.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/rcourtman/Pulse",
					"label": "https://github.com/rcourtman/Pulse",
					"source": "nvd"
				},
				{
					"href": "https://github.com/rcourtman/Pulse/blob/v6.7.0/internal/api/ai_handlers.go#L7686",
					"label": "https://github.com/rcourtman/Pulse/blob/v6.7.0/internal/api/ai_handlers.go#L7686",
					"source": "nvd"
				},
				{
					"href": "https://github.com/rcourtman/Pulse/commit/f05119d97ea3bc1980886d8c62dda7ce8fd39d4e",
					"label": "https://github.com/rcourtman/Pulse/commit/f05119d97ea3bc1980886d8c62dda7ce8fd39d4e",
					"source": "nvd"
				},
				{
					"href": "https://github.com/rcourtman/Pulse/pull/4127",
					"label": "https://github.com/rcourtman/Pulse/pull/4127",
					"source": "nvd"
				},
				{
					"href": "https://github.com/rcourtman/Pulse/releases/tag/v6.8.0",
					"label": "https://github.com/rcourtman/Pulse/releases/tag/v6.8.0",
					"source": "nvd"
				},
				{
					"href": "https://github.com/rcourtman/Pulse/security/advisories/GHSA-9vxw-m79f-gxxr",
					"label": "https://github.com/rcourtman/Pulse/security/advisories/GHSA-9vxw-m79f-gxxr",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129429",
			"title": "Frappe india-payroll before 16.0.4 contains a missing authorization vulnerability in the get_employee_details, compute_tax_comparison and set_tax_regime methods of tax_regime_selec",
			"summary": "Frappe india-payroll before 16.0.4 contains a missing authorization vulnerability in the get_employee_details, compute_tax_comparison and set_tax_regime methods of tax_regime_selector.py that allows authenticated low-privileged users to access other employees' payroll data. Attackers can supply another employee identifier to read base pay and earning and deduction components, or change the tax regime on draft Salary Structure Assignments to affect tax withholding.",
			"severity": "HIGH",
			"cvss": 7.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:L/A:N",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/frappe/india-payroll",
					"label": "https://github.com/frappe/india-payroll",
					"source": "nvd"
				},
				{
					"href": "https://github.com/frappe/india-payroll/blob/9c1fc91b34de8a55df58aa5f2dbabff95dedb4d1/india_payroll/india_payroll/page/tax_regime_selector/tax_regime_selector.py#L207-L215",
					"label": "https://github.com/frappe/india-payroll/blob/9c1fc91b34de8a55df58aa5f2dbabff95dedb4d1/india_payroll/india_payroll/page/tax_regime_selector/t",
					"source": "nvd"
				},
				{
					"href": "https://github.com/frappe/india-payroll/commit/78de736298a340ecb971826a5df10e7204773cef",
					"label": "https://github.com/frappe/india-payroll/commit/78de736298a340ecb971826a5df10e7204773cef",
					"source": "nvd"
				},
				{
					"href": "https://github.com/frappe/india-payroll/commit/bdb988f172663db4054f9c3fc23833f10c3b60b0",
					"label": "https://github.com/frappe/india-payroll/commit/bdb988f172663db4054f9c3fc23833f10c3b60b0",
					"source": "nvd"
				},
				{
					"href": "https://github.com/frappe/india-payroll/releases/tag/v16.0.4",
					"label": "https://github.com/frappe/india-payroll/releases/tag/v16.0.4",
					"source": "nvd"
				},
				{
					"href": "https://github.com/frappe/india-payroll/security/advisories/GHSA-758f-34xj-xvcc",
					"label": "https://github.com/frappe/india-payroll/security/advisories/GHSA-758f-34xj-xvcc",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129430",
			"title": "Axeloz Filesharing before 2.14.3 contains a stored cross-site scripting vulnerability that allows authenticated users to inject script by storing raw HTML or javascript: Markdown l",
			"summary": "Axeloz Filesharing before 2.14.3 contains a stored cross-site scripting vulnerability that allows authenticated users to inject script by storing raw HTML or javascript: Markdown links in bundle descriptions. Recipients viewing the public bundle preview page execute the script via Alpine x-html, letting attackers steal the owner_token from localStorage and issue owner-scoped requests against victim bundles.",
			"severity": "MEDIUM",
			"cvss": 5.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:N",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/axeloz/filesharing",
					"label": "https://github.com/axeloz/filesharing",
					"source": "nvd"
				},
				{
					"href": "https://github.com/axeloz/filesharing/blob/e865be1f09f8eb5a46c4b9a16635de892b093d8f/app/Http/Resources/BundleResource.php#L33",
					"label": "https://github.com/axeloz/filesharing/blob/e865be1f09f8eb5a46c4b9a16635de892b093d8f/app/Http/Resources/BundleResource.php#L33",
					"source": "nvd"
				},
				{
					"href": "https://github.com/axeloz/filesharing/commit/366ee452aba636858d55b82068ecc35f6d08b6d6",
					"label": "https://github.com/axeloz/filesharing/commit/366ee452aba636858d55b82068ecc35f6d08b6d6",
					"source": "nvd"
				},
				{
					"href": "https://github.com/axeloz/filesharing/commit/eebc80a77c0e3fe3b8467245ba89fa49f2d35928",
					"label": "https://github.com/axeloz/filesharing/commit/eebc80a77c0e3fe3b8467245ba89fa49f2d35928",
					"source": "nvd"
				},
				{
					"href": "https://github.com/axeloz/filesharing/pull/90",
					"label": "https://github.com/axeloz/filesharing/pull/90",
					"source": "nvd"
				},
				{
					"href": "https://github.com/axeloz/filesharing/releases/tag/2.14.3",
					"label": "https://github.com/axeloz/filesharing/releases/tag/2.14.3",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129431",
			"title": "Ettercap through 0.8.5.1 contains a heap out-of-bounds read vulnerability in dissector_socks() in src/dissectors/ec_socks.c that allows network-adjacent attackers to read heap memo",
			"summary": "Ettercap through 0.8.5.1 contains a heap out-of-bounds read vulnerability in dissector_socks() in src/dissectors/ec_socks.c that allows network-adjacent attackers to read heap memory via unchecked SOCKS5 username/password lengths. Attackers can send a crafted SOCKS5 authentication packet observed by Ettercap to read up to 255 bytes past the heap buffer, disclosing memory printed and logged as captured credentials.",
			"severity": "MEDIUM",
			"cvss": 6.5,
			"vector": "CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-125",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/Ettercap/ettercap",
					"label": "https://github.com/Ettercap/ettercap",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Ettercap/ettercap/blob/v0.8.5.1/src/dissectors/ec_socks.c#L108-L124",
					"label": "https://github.com/Ettercap/ettercap/blob/v0.8.5.1/src/dissectors/ec_socks.c#L108-L124",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Ettercap/ettercap/pull/1340",
					"label": "https://github.com/Ettercap/ettercap/pull/1340",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/ettercap-through-0.8.5.1-heap-out-of-bounds-read-via-socks5-dissector",
					"label": "https://www.vulncheck.com/advisories/ettercap-through-0.8.5.1-heap-out-of-bounds-read-via-socks5-dissector",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129432",
			"title": "Ettercap through 0.8.5.1 contains a heap out-of-bounds read vulnerability in dissector_mountd() in src/dissectors/ec_mountd.c that validates RPC credential and directory lengths in",
			"summary": "Ettercap through 0.8.5.1 contains a heap out-of-bounds read vulnerability in dissector_mountd() in src/dissectors/ec_mountd.c that validates RPC credential and directory lengths independently rather than against the packet end. Network-adjacent attackers can send a crafted MOUNT MNT call to read up to 100 bytes past the heap buffer, leaking memory to the console and logs.",
			"severity": "MEDIUM",
			"cvss": 6.5,
			"vector": "CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-125",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/Ettercap/ettercap",
					"label": "https://github.com/Ettercap/ettercap",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Ettercap/ettercap/blob/v0.8.5.1/src/dissectors/ec_mountd.c#L88-L103",
					"label": "https://github.com/Ettercap/ettercap/blob/v0.8.5.1/src/dissectors/ec_mountd.c#L88-L103",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Ettercap/ettercap/pull/1341",
					"label": "https://github.com/Ettercap/ettercap/pull/1341",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/ettercap-through-0.8.5.1-heap-out-of-bounds-read-in-nfs-mountd-dissector",
					"label": "https://www.vulncheck.com/advisories/ettercap-through-0.8.5.1-heap-out-of-bounds-read-in-nfs-mountd-dissector",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129433",
			"title": "Dokploy before 0.31.1 contains an OS command injection vulnerability in getComposeContainerCommand() that allows authenticated organization members to execute shell commands via th",
			"summary": "Dokploy before 0.31.1 contains an OS command injection vulnerability in getComposeContainerCommand() that allows authenticated organization members to execute shell commands via the serviceName parameter. Attackers can store serviceName values with shell metacharacters through backup.create or backup.update tRPC procedures, executing commands as root when scheduled backups run and taking over the host via the mounted Docker socket.",
			"severity": "CRITICAL",
			"cvss": 9.9,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-78",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/Dokploy/dokploy",
					"label": "https://github.com/Dokploy/dokploy",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Dokploy/dokploy/blob/v0.31.0/packages/server/src/utils/backups/utils.ts#L152",
					"label": "https://github.com/Dokploy/dokploy/blob/v0.31.0/packages/server/src/utils/backups/utils.ts#L152",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Dokploy/dokploy/commit/b24006e16e95a10ce3daf739d06ac783e5c70ba0",
					"label": "https://github.com/Dokploy/dokploy/commit/b24006e16e95a10ce3daf739d06ac783e5c70ba0",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Dokploy/dokploy/pull/5908",
					"label": "https://github.com/Dokploy/dokploy/pull/5908",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Dokploy/dokploy/releases/tag/v0.31.1",
					"label": "https://github.com/Dokploy/dokploy/releases/tag/v0.31.1",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Dokploy/dokploy/security/advisories/GHSA-j329-jw7j-rxjm",
					"label": "https://github.com/Dokploy/dokploy/security/advisories/GHSA-j329-jw7j-rxjm",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-18053",
			"title": "The MemberDash plugin for WordPress is vulnerable to Privilege Escalation in all versions up to, and including, 1.8.7",
			"summary": "The MemberDash plugin for WordPress is vulnerable to Privilege Escalation in all versions up to, and including, 1.8.7. This is due to a mass-assignment vulnerability in the `user_account_manager()` function's edit_profile branch, where all submitted `$_POST` fields are iterated and directly assigned to the current member object via the `MS_Model` `__set()` magic method with no field allowlist and no capability or ownership check on the submitted `id` parameter. This makes it possible for authenticated attackers, with subscriber-level access and above, to inject an arbitrary user ID via the `id` parameter — overwriting any WordPress user's email address and password, including the site admini",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-14T13:17:22Z",
			"modified": "2026-11-14T13:17:23Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://docs.nexcess.com/software/changelogs/learndash/memberdash/",
				"label": "https://docs.nexcess.com/software/changelogs/learndash/memberdash/",
				"source": "nvd"
			}, {
				"href": "https://www.wordfence.com/threat-intel/vulnerabilities/id/70d0bc5e-8db6-4a42-af19-d41280ec1207?source=cve",
				"label": "https://www.wordfence.com/threat-intel/vulnerabilities/id/70d0bc5e-8db6-4a42-af19-d41280ec1207?source=cve",
				"source": "nvd"
			}]
		},
		{
			"id": "CVE-2026-19907",
			"title": "The Shipo plugin for WordPress is vulnerable to Authentication Bypass in versions 1.6 through 1.8.0",
			"summary": "The Shipo plugin for WordPress is vulnerable to Authentication Bypass in versions 1.6 through 1.8.0. This is due to the `authenticate_rest_user()` function parsing the `LOGGED_IN_COOKIE` value and authenticating the named user without verifying the cookie's cryptographic signature. The function's intended `/wp-json/shipo/` route restriction can also be bypassed by placing that substring in the query string of an unrelated REST endpoint. This makes it possible for unauthenticated attackers who know an existing username to impersonate that user, including an administrator, and perform authorized actions through the REST API, including creating another administrator account.",
			"severity": "CRITICAL",
			"cvss": 9.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-14T13:17:23Z",
			"modified": "2026-11-14T13:17:23Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-287",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://plugins.trac.wordpress.org/changeset/3701532/shipo",
				"label": "https://plugins.trac.wordpress.org/changeset/3701532/shipo",
				"source": "nvd"
			}, {
				"href": "https://www.wordfence.com/threat-intel/vulnerabilities/id/ce5ea515-5ae1-4771-9bfb-5a0f4b3fce22?source=cve",
				"label": "https://www.wordfence.com/threat-intel/vulnerabilities/id/ce5ea515-5ae1-4771-9bfb-5a0f4b3fce22?source=cve",
				"source": "nvd"
			}]
		},
		{
			"id": "CVE-2011-10042",
			"title": "HTTP::Session versions before 0.43 for Perl allow memcached command injection via unfiltered session ids in HTTP::Session::Store::Memcached.\n\nThe session id from the client's cooki",
			"summary": "HTTP::Session versions before 0.43 for Perl allow memcached command injection via unfiltered session ids in HTTP::Session::Store::Memcached.\n\nThe session id from the client's cookie reaches memcached unchanged as the cache key.\n\nA CR and LF in the session id end the cache command early, and the server reads the bytes after them as further commands.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-14T14:17:21Z",
			"modified": "2026-11-14T21:16:49Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-93",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/tokuhirom/http-session/commit/039345db9bc9311868019fde67b89c355114a3d3.patch",
					"label": "https://github.com/tokuhirom/http-session/commit/039345db9bc9311868019fde67b89c355114a3d3.patch",
					"source": "nvd"
				},
				{
					"href": "https://metacpan.org/release/TOKUHIROM/HTTP-Session-0.42/changes",
					"label": "https://metacpan.org/release/TOKUHIROM/HTTP-Session-0.42/changes",
					"source": "nvd"
				},
				{
					"href": "http://www.openwall.com/lists/oss-security/2026/11/14/10",
					"label": "http://www.openwall.com/lists/oss-security/2026/11/14/10",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129258",
			"title": "A vulnerability was identified in Tenda AC18 15.03.05.05_multi/15.03.05.19 Build 6318",
			"summary": "A vulnerability was identified in Tenda AC18 15.03.05.05_multi/15.03.05.19 Build 6318. Affected by this vulnerability is an unknown functionality of the file /cgi-bin/upgrade of the component Firmware Upgrade Handler. Such manipulation of the argument upgradeFile leads to insufficient verification of data authenticity. The attack may be launched remotely. The exploit is publicly available and might be used.",
			"severity": "CRITICAL",
			"cvss": 9.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-14T15:16:58Z",
			"modified": "2026-11-14T15:16:58Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-345",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/longqx223/Tenda-ac-18-V15.03.05.05-/blob/main/2026-10-19-Tenda-AC18-unsigned-firmware-update-advisory-EN.pdf",
					"label": "https://github.com/longqx223/Tenda-ac-18-V15.03.05.05-/blob/main/2026-10-19-Tenda-AC18-unsigned-firmware-update-advisory-EN.pdf",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129258",
					"label": "https://vuldb.com/cve/CVE-2026-129258",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043033",
					"label": "https://vuldb.com/submit/1043033",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437295",
					"label": "https://vuldb.com/vuln/437295",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437295/cti",
					"label": "https://vuldb.com/vuln/437295/cti",
					"source": "nvd"
				},
				{
					"href": "https://www.tenda.com.cn/",
					"label": "https://www.tenda.com.cn/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129259",
			"title": "A weakness has been identified in Mereithhh VanBlog up to 0.54.0",
			"summary": "A weakness has been identified in Mereithhh VanBlog up to 0.54.0. This affects an unknown part of the file packages/server/src/types/access/access.ts of the component Image Upload Endpoint. Executing a manipulation can lead to cross site scripting. The attack can be executed remotely. The exploit has been made available to the public and could be used for attacks. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "LOW",
			"cvss": 3.5,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:N/I:L/A:N",
			"published": "2026-11-14T15:16:58Z",
			"modified": "2026-11-14T15:16:58Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "http://note.geronimo.xin/post/70",
					"label": "http://note.geronimo.xin/post/70",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129259",
					"label": "https://vuldb.com/cve/CVE-2026-129259",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043136",
					"label": "https://vuldb.com/submit/1043136",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437297",
					"label": "https://vuldb.com/vuln/437297",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437297/cti",
					"label": "https://vuldb.com/vuln/437297/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-110531",
			"title": "The FV Player 8 plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'fv_player_videos' parameter in all versions up to, and including, 8.1.9 due to insufficie",
			"summary": "The FV Player 8 plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'fv_player_videos' parameter in all versions up to, and including, 8.1.9 due to insufficient input sanitization and output escaping. This makes it possible for authenticated attackers, with subscriber-level access and above, to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page. This requires the administrator-controlled \"Allow visitors to upload videos to their profile\" setting to be enabled, without which the vulnerable save routine is inaccessible to Subscriber-level users.",
			"severity": "MEDIUM",
			"cvss": 6.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:L/A:N",
			"published": "2026-11-14T16:17:02Z",
			"modified": "2026-11-14T16:17:03Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/foliovision/fv-wordpress-flowplayer/commit/1c936e8100989c34e08415adfcb5ea3db2109902",
					"label": "https://github.com/foliovision/fv-wordpress-flowplayer/commit/1c936e8100989c34e08415adfcb5ea3db2109902",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/freedom-video-player/modules/overlay-popup.module.js#L95",
					"label": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/freedom-video-player/modules/overlay-popup.module.js#L95",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/custom-videos.php#L115",
					"label": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/custom-videos.php#L115",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/custom-videos.php#L757",
					"label": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/custom-videos.php#L757",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/custom-videos.php#L790",
					"label": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/custom-videos.php#L790",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/email-subscription.php#L762",
					"label": "https://plugins.trac.wordpress.org/browser/fv-player/trunk/models/email-subscription.php#L762",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-116753",
			"title": "The Multi Step for Contact Form 7 plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'multipart field name (array key)' parameter in all versions up to, and ",
			"summary": "The Multi Step for Contact Form 7 plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'multipart field name (array key)' parameter in all versions up to, and including, 2.9.1 due to insufficient input sanitization and output escaping. This makes it possible for unauthenticated attackers to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page. Successful exploitation requires the target CF7 form to have the 'Save every step' option enabled and the Database for Contact Form 7 companion plugin to be active with its 'Expandable' table option enabled, both of which are disabled by default.",
			"severity": "HIGH",
			"cvss": 7.2,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:L/A:N",
			"published": "2026-11-14T16:17:03Z",
			"modified": "2026-11-14T16:17:03Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.1/inc/frontend/validation.php#L20",
					"label": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.1/inc/frontend/validation.php#L20",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.1/inc/frontend/validation.php#L291",
					"label": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.1/inc/frontend/validation.php#L291",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.1/inc/frontend/validation.php#L330",
					"label": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.1/inc/frontend/validation.php#L330",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.2/inc/frontend/validation.php",
					"label": "https://plugins.trac.wordpress.org/browser/cf7-multi-step/tags/2.9.2/inc/frontend/validation.php",
					"source": "nvd"
				},
				{
					"href": "https://wordpress.org/plugins/cf7-multi-step/",
					"label": "https://wordpress.org/plugins/cf7-multi-step/",
					"source": "nvd"
				},
				{
					"href": "https://www.wordfence.com/threat-intel/vulnerabilities/id/b9700627-97f2-4da1-a984-934062bd5014?source=cve",
					"label": "https://www.wordfence.com/threat-intel/vulnerabilities/id/b9700627-97f2-4da1-a984-934062bd5014?source=cve",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-120687",
			"title": "The Lightbox & Modal Popup WordPress Plugin – FooBox plugin for WordPress is vulnerable to Stored DOM-Based Cross-Site Scripting via the 'img alt attribute inside .wp-caption conta",
			"summary": "The Lightbox & Modal Popup WordPress Plugin – FooBox plugin for WordPress is vulnerable to Stored DOM-Based Cross-Site Scripting via the 'img alt attribute inside .wp-caption container' parameter in all versions up to, and including, 2.8.7 due to insufficient input sanitization and output escaping. This makes it possible for unauthenticated attackers to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page. This is exploitable by Subscriber-level users when bbPress is installed, as its bbp_filter_kses filter chain permits img and pre tags while preserving numeric character references inside attribute values, allowing encoded payloads to bypass save",
			"severity": "HIGH",
			"cvss": 7.2,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:L/A:N",
			"published": "2026-11-14T16:17:03Z",
			"modified": "2026-11-14T16:17:04Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://plugins.trac.wordpress.org/browser/foobox-image-lightbox/tags/2.8.7/free/includes/class-script-generator.php#L175",
					"label": "https://plugins.trac.wordpress.org/browser/foobox-image-lightbox/tags/2.8.7/free/includes/class-script-generator.php#L175",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/foobox-image-lightbox/tags/2.8.7/free/js/foobox.free.min.js",
					"label": "https://plugins.trac.wordpress.org/browser/foobox-image-lightbox/tags/2.8.7/free/js/foobox.free.min.js",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/changeset/3789888/foobox-image-lightbox",
					"label": "https://plugins.trac.wordpress.org/changeset/3789888/foobox-image-lightbox",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/changeset?reponame=&new=3789888%40foobox-image-lightbox%2Ftags%2F2.8.8&old=3741260%40foobox-image-lightbox%2Ftags%2F2.8.7",
					"label": "https://plugins.trac.wordpress.org/changeset?reponame=&new=3789888%40foobox-image-lightbox%2Ftags%2F2.8.8&old=3741260%40foobox-image-lightbo",
					"source": "nvd"
				},
				{
					"href": "https://www.wordfence.com/threat-intel/vulnerabilities/id/66b5a5a2-8f70-4a85-ad03-8bd159cafdf5?source=cve",
					"label": "https://www.wordfence.com/threat-intel/vulnerabilities/id/66b5a5a2-8f70-4a85-ad03-8bd159cafdf5?source=cve",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-127115",
			"title": "The BuddyForms plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'buddyforms_form_content' parameter in all versions up to, and including, 2.10.6 due to ins",
			"summary": "The BuddyForms plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'buddyforms_form_content' parameter in all versions up to, and including, 2.10.6 due to insufficient input sanitization and output escaping. This makes it possible for unauthenticated attackers to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page. This is exploitable when a form configured with the public_submit option is published — a condition met by the plugin's bundled Post Simple template out of the box.",
			"severity": "MEDIUM",
			"cvss": 5.4,
			"vector": "CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:L/I:L/A:N",
			"published": "2026-11-14T16:17:04Z",
			"modified": "2026-11-14T16:17:04Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/Themekraft/buddyforms/pull/783/files",
					"label": "https://github.com/Themekraft/buddyforms/pull/783/files",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/form/form-ajax.php#L140",
					"label": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/form/form-ajax.php#L140",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/form/form-ajax.php#L145",
					"label": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/form/form-ajax.php#L145",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/form/form-control.php#L663",
					"label": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/form/form-control.php#L663",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/functions.php#L2518",
					"label": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/functions.php#L2518",
					"source": "nvd"
				},
				{
					"href": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/functions.php#L270",
					"label": "https://plugins.trac.wordpress.org/browser/buddyforms/tags/2.10.6/includes/functions.php#L270",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129260",
			"title": "A security vulnerability has been detected in Mereithhh VanBlog up to 0.54.0",
			"summary": "A security vulnerability has been detected in Mereithhh VanBlog up to 0.54.0. This vulnerability affects the function fs.readFileSync of the file local.provider.ts of the component Custom Page Handler. The manipulation of the argument path leads to path traversal. The attack is possible to be carried out remotely. The exploit has been disclosed publicly and may be used. Upgrading to version test-20261013 is able to resolve this issue. The identifier of the patch is d63aa163f10b6dc1080e2368fe8e71aa95b765cb. Upgrading the affected component is advised.",
			"severity": "MEDIUM",
			"cvss": 6.6,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:L/I:L/A:L",
			"published": "2026-11-14T16:17:04Z",
			"modified": "2026-11-14T16:17:04Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-22",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "http://note.geronimo.xin/post/71",
					"label": "http://note.geronimo.xin/post/71",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Mereithhh/vanblog/",
					"label": "https://github.com/Mereithhh/vanblog/",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Mereithhh/vanblog/commit/d63aa163f10b6dc1080e2368fe8e71aa95b765cb",
					"label": "https://github.com/Mereithhh/vanblog/commit/d63aa163f10b6dc1080e2368fe8e71aa95b765cb",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Mereithhh/vanblog/pull/524",
					"label": "https://github.com/Mereithhh/vanblog/pull/524",
					"source": "nvd"
				},
				{
					"href": "https://github.com/Mereithhh/vanblog/releases/tag/test-20261013",
					"label": "https://github.com/Mereithhh/vanblog/releases/tag/test-20261013",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129260",
					"label": "https://vuldb.com/cve/CVE-2026-129260",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129261",
			"title": "A vulnerability was found in Kingston FURY CTRL RGB Control Software up to 2.0.66.0",
			"summary": "A vulnerability was found in Kingston FURY CTRL RGB Control Software up to 2.0.66.0. The impacted element is an unknown function in the library NTIOLib_X64.sys of the component IOCTL Handler. Performing a manipulation results in exposed ioctl with insufficient access control. The attack is only possible with local access.",
			"severity": "HIGH",
			"cvss": 8.2,
			"vector": "CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-14T16:17:04Z",
			"modified": "2026-11-14T16:17:04Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-782",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://vuldb.com/cve/CVE-2026-129261",
					"label": "https://vuldb.com/cve/CVE-2026-129261",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043190",
					"label": "https://vuldb.com/submit/1043190",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437302",
					"label": "https://vuldb.com/vuln/437302",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437302/cti",
					"label": "https://vuldb.com/vuln/437302/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129262",
			"title": "A weakness has been identified in Wuxi Wubang Security Software Wubang Five-in-One Safety Production Management Information System up to 3.5",
			"summary": "A weakness has been identified in Wuxi Wubang Security Software Wubang Five-in-One Safety Production Management Information System up to 3.5. Affected by this vulnerability is the function DiyFileUpload of the file /ws.asmx. This manipulation causes unrestricted upload. Remote exploitation of the attack is possible. The exploit has been made available to the public and could be used for attacks. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "HIGH",
			"cvss": 7.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L",
			"published": "2026-11-14T17:16:52Z",
			"modified": "2026-11-14T17:16:52Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-284",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/Rookie506/CVE/issues/3",
					"label": "https://github.com/Rookie506/CVE/issues/3",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129262",
					"label": "https://vuldb.com/cve/CVE-2026-129262",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043317",
					"label": "https://vuldb.com/submit/1043317",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437306",
					"label": "https://vuldb.com/vuln/437306",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437306/cti",
					"label": "https://vuldb.com/vuln/437306/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129264",
			"title": "A security vulnerability has been detected in sox_ng up to 14.8.1",
			"summary": "A security vulnerability has been detected in sox_ng up to 14.8.1. Affected by this issue is the function read_samples_voc of the file src/voc.c of the component VOC Decoder. Such manipulation leads to out-of-bounds write. The attack can be executed remotely. The exploit has been disclosed publicly and may be used. The name of the patch is 0b40408b. A patch should be applied to remediate this issue. The vendor was contacted early, responded in a very professional manner and quickly released a fixed version of the affected product.",
			"severity": "MEDIUM",
			"cvss": 5.5,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:L/I:L/A:L",
			"published": "2026-11-14T17:16:53Z",
			"modified": "2026-11-14T17:16:53Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-119",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://codeberg.org/sox_ng/sox_ng/commit/0b40408b",
					"label": "https://codeberg.org/sox_ng/sox_ng/commit/0b40408b",
					"source": "nvd"
				},
				{
					"href": "https://codeberg.org/sox_ng/sox_ng/issues/873",
					"label": "https://codeberg.org/sox_ng/sox_ng/issues/873",
					"source": "nvd"
				},
				{
					"href": "https://codeberg.org/suyuanwang/Test_sox/",
					"label": "https://codeberg.org/suyuanwang/Test_sox/",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129264",
					"label": "https://vuldb.com/cve/CVE-2026-129264",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043408",
					"label": "https://vuldb.com/submit/1043408",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437307",
					"label": "https://vuldb.com/vuln/437307",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129267",
			"title": "A vulnerability was found in sergix44 XBackBone up to 3.8.2",
			"summary": "A vulnerability was found in sergix44 XBackBone up to 3.8.2. Impacted is the function MediaController::getRawById of the file app/Controllers/MediaController.php. The manipulation results in cross site scripting. It is possible to launch the attack remotely. The exploit has been made public and could be used. The pull request to fix this issue awaits acceptance.",
			"severity": "LOW",
			"cvss": 3.5,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:N/I:L/A:N",
			"published": "2026-11-14T18:17:20Z",
			"modified": "2026-11-14T18:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/sergix44/xbackbone/",
					"label": "https://github.com/sergix44/xbackbone/",
					"source": "nvd"
				},
				{
					"href": "https://github.com/sergix44/xbackbone/pull/673",
					"label": "https://github.com/sergix44/xbackbone/pull/673",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129267",
					"label": "https://vuldb.com/cve/CVE-2026-129267",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043413",
					"label": "https://vuldb.com/submit/1043413",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437311",
					"label": "https://vuldb.com/vuln/437311",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437311/cti",
					"label": "https://vuldb.com/vuln/437311/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129447",
			"title": "Kroki before 0.36.0 contains a reflected cross-site scripting vulnerability in the /dbml/svg endpoint that allows unauthenticated attackers to inject javascript: hyperlinks by supp",
			"summary": "Kroki before 0.36.0 contains a reflected cross-site scripting vulnerability in the /dbml/svg endpoint that allows unauthenticated attackers to inject javascript: hyperlinks by supplying crafted DBML table url, headercolor, or TableGroup color settings. Attackers can send a crafted SVG link that, when opened and the table header clicked, executes attacker JavaScript in the Kroki origin.",
			"severity": "MEDIUM",
			"cvss": 6.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N",
			"published": "2026-11-14T18:17:21Z",
			"modified": "2026-11-14T18:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/yuzutech/kroki/blob/v0.35.0/dbml/index.js#L13",
					"label": "https://github.com/yuzutech/kroki/blob/v0.35.0/dbml/index.js#L13",
					"source": "nvd"
				},
				{
					"href": "https://github.com/yuzutech/kroki/commit/b57e1bdc39df9521b249db0dbd56c5e0a8b7e33d",
					"label": "https://github.com/yuzutech/kroki/commit/b57e1bdc39df9521b249db0dbd56c5e0a8b7e33d",
					"source": "nvd"
				},
				{
					"href": "https://github.com/yuzutech/kroki/releases/tag/v0.36.0",
					"label": "https://github.com/yuzutech/kroki/releases/tag/v0.36.0",
					"source": "nvd"
				},
				{
					"href": "https://github.com/yuzutech/kroki/security/advisories/GHSA-fr36-wcx2-7gfq",
					"label": "https://github.com/yuzutech/kroki/security/advisories/GHSA-fr36-wcx2-7gfq",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/kroki-before-0.36.0-reflected-xss-via-dbml-table-urls",
					"label": "https://www.vulncheck.com/advisories/kroki-before-0.36.0-reflected-xss-via-dbml-table-urls",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2015-10149",
			"title": "Dancer versions before 1.3400 for Perl pass unvalidated session ids from the session cookie to the session engine.\n\nread_session_id returns the cookie value as the session id witho",
			"summary": "Dancer versions before 1.3400 for Perl pass unvalidated session ids from the session cookie to the session engine.\n\nread_session_id returns the cookie value as the session id without checking its characters, and Dancer hands it to the session engine to load the session.\n\nA remote attacker may cause path traversal or injection in a session engine that uses the id in a file path, cache command or query without checking it.",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-11-14T20:17:39Z",
			"modified": "2026-11-14T23:16:46Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-1286",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/PerlDancer/Dancer/commit/5a68fddbaef903fd3bd58517ce585cde986716e4.patch",
					"label": "https://github.com/PerlDancer/Dancer/commit/5a68fddbaef903fd3bd58517ce585cde986716e4.patch",
					"source": "nvd"
				},
				{
					"href": "https://github.com/PerlDancer/Dancer/issues/1117",
					"label": "https://github.com/PerlDancer/Dancer/issues/1117",
					"source": "nvd"
				},
				{
					"href": "https://github.com/PerlDancer/Dancer/issues/1118",
					"label": "https://github.com/PerlDancer/Dancer/issues/1118",
					"source": "nvd"
				},
				{
					"href": "https://github.com/PerlDancer/Dancer/pull/1172",
					"label": "https://github.com/PerlDancer/Dancer/pull/1172",
					"source": "nvd"
				},
				{
					"href": "https://metacpan.org/release/BIGPRESH/Dancer-1.3400/changes",
					"label": "https://metacpan.org/release/BIGPRESH/Dancer-1.3400/changes",
					"source": "nvd"
				},
				{
					"href": "http://www.openwall.com/lists/oss-security/2026/11/14/15",
					"label": "http://www.openwall.com/lists/oss-security/2026/11/14/15",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129456",
			"title": "In FRRouting, bgpd accepts a Tunnel Encapsulation attribute (type 23) whose outer TLV length does not match the length of the attribute: the mismatch is only logged and the attribu",
			"summary": "In FRRouting, bgpd accepts a Tunnel Encapsulation attribute (type 23) whose outer TLV length does not match the length of the attribute: the mismatch is only logged and the attribute is processed anyway. A BGP neighbor can send UPDATE messages carrying such an attribute that put the reference count of the attribute's interned sub-TLV chain out of balance, so that the chain is freed while routes stored by bgpd (Adj-RIB-In entries and RIB paths) still point to it. When those routes are later replaced, withdrawn or cleared, for example when the session goes down, bgpd reads the freed memory, decrements a reference count inside it and frees it a second time. In the reporter's build without Addre",
			"severity": "HIGH",
			"cvss": 7.7,
			"vector": "CVSS:4.0/AV:N/AC:H/AT:P/PR:L/UI:N/VC:H/VI:H/VA:H/SC:N/SI:N/SA:L/E:X/CR:X/IR:X/AR:X/MAV:X/MAC:X/MAT:X/MPR:X/MUI:X/MVC:X/MVI:X/MVA:X/MSC:X/MSI:X/MSA:X/S:X/AU:N/R:A/V:X/RE:X/U:X",
			"published": "2026-11-14T20:17:40Z",
			"modified": "2026-11-14T20:17:40Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-415",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/FRRouting/frr/commit/abef07b500e19baa924d157ab03809b93730e619",
					"label": "https://github.com/FRRouting/frr/commit/abef07b500e19baa924d157ab03809b93730e619",
					"source": "nvd"
				},
				{
					"href": "https://github.com/FRRouting/frr/commit/bebf95f02bc0dccc6a1841f0c8cbcba1f617d655",
					"label": "https://github.com/FRRouting/frr/commit/bebf95f02bc0dccc6a1841f0c8cbcba1f617d655",
					"source": "nvd"
				},
				{
					"href": "https://github.com/FRRouting/frr/issues/20874",
					"label": "https://github.com/FRRouting/frr/issues/20874",
					"source": "nvd"
				},
				{
					"href": "https://github.com/FRRouting/frr/pull/21176/changes/1238ac4a06e5c23595e8bf626856f297d0c302a2",
					"label": "https://github.com/FRRouting/frr/pull/21176/changes/1238ac4a06e5c23595e8bf626856f297d0c302a2",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129351",
			"title": "A security vulnerability has been detected in TRENDnet TEW-657BRM 1.00.1",
			"summary": "A security vulnerability has been detected in TRENDnet TEW-657BRM 1.00.1. This vulnerability affects the function sprintf of the file /setup.cgi of the component mini_httpd. Such manipulation leads to out-of-bounds write. The attack can be executed remotely. The exploit has been disclosed publicly and may be used. The vendor explains: \"\"I am not able to confirm if such vulnerability exists as the product has been EOL for more than 15 years. We will send out an announcement letting customers know.\" This vulnerability only affects products that are no longer supported by the maintainer.",
			"severity": "CRITICAL",
			"cvss": 10,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-14T23:16:47Z",
			"modified": "2026-11-14T23:16:47Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-119",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/TRENDnet-TEW-657BRM-mini_httpd.md",
					"label": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/TRENDnet-TEW-657BRM-",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129351",
					"label": "https://vuldb.com/cve/CVE-2026-129351",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043518",
					"label": "https://vuldb.com/submit/1043518",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437397",
					"label": "https://vuldb.com/vuln/437397",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437397/cti",
					"label": "https://vuldb.com/vuln/437397/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129352",
			"title": "A vulnerability was detected in TRENDnet TEW-657BRM 1.00.1",
			"summary": "A vulnerability was detected in TRENDnet TEW-657BRM 1.00.1. This issue affects some unknown processing of the file /usr/sbin/upgrade_flash.cgi. Performing a manipulation of the argument boundary results in stack-based buffer overflow. The attack is possible to be carried out remotely. The exploit is now public and may be used. The vendor explains: \"\"I am not able to confirm if such vulnerability exists as the product has been EOL for more than 15 years. We will send out an announcement letting customers know.\"",
			"severity": "CRITICAL",
			"cvss": 9.1,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-14T23:16:48Z",
			"modified": "2026-11-14T23:16:48Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-119",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/TRENDnet-TEW-657BRM-upgrade_flash.md",
					"label": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/TRENDnet-TEW-657BRM-",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129352",
					"label": "https://vuldb.com/cve/CVE-2026-129352",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043522",
					"label": "https://vuldb.com/submit/1043522",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437398",
					"label": "https://vuldb.com/vuln/437398",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437398/cti",
					"label": "https://vuldb.com/vuln/437398/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129353",
			"title": "A vulnerability was detected in D-Link DIR-600L 2.17/2.17b02",
			"summary": "A vulnerability was detected in D-Link DIR-600L 2.17/2.17b02. Affected by this vulnerability is the function authenticationcgi_main of the file authentication.cgi. Performing a manipulation of the argument id/password results in stack-based buffer overflow. Remote exploitation of the attack is possible. The exploit is now public and may be used.",
			"severity": "CRITICAL",
			"cvss": 10,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-15T00:16:51Z",
			"modified": "2026-11-15T00:16:51Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-119",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/D-Link-DIR-600L-authentication-cgi.md",
					"label": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/D-Link-DIR-600L-auth",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129353",
					"label": "https://vuldb.com/cve/CVE-2026-129353",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043523",
					"label": "https://vuldb.com/submit/1043523",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437416",
					"label": "https://vuldb.com/vuln/437416",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437416/cti",
					"label": "https://vuldb.com/vuln/437416/cti",
					"source": "nvd"
				},
				{
					"href": "https://www.dlink.com/",
					"label": "https://www.dlink.com/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129354",
			"title": "A flaw has been found in D-Link DIR-600L 2.17b02",
			"summary": "A flaw has been found in D-Link DIR-600L 2.17b02. Affected by this issue is the function hnap_main of the file htdocs/cgibin of the component HNAP Handler. Executing a manipulation can lead to stack-based buffer overflow. The attack can be executed remotely. The exploit has been published and may be used.",
			"severity": "CRITICAL",
			"cvss": 10,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
			"published": "2026-11-15T01:18:03Z",
			"modified": "2026-11-15T01:18:03Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-119",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/D-Link-DIR-600L-HNAP-SOAPAction.md",
					"label": "https://github.com/ruanyi101/router-firmware-security-advisories/blob/main/router-firmware-GitHub-advisories/advisories/D-Link-DIR-600L-HNAP",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129354",
					"label": "https://vuldb.com/cve/CVE-2026-129354",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043526",
					"label": "https://vuldb.com/submit/1043526",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437417",
					"label": "https://vuldb.com/vuln/437417",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437417/cti",
					"label": "https://vuldb.com/vuln/437417/cti",
					"source": "nvd"
				},
				{
					"href": "https://www.dlink.com/",
					"label": "https://www.dlink.com/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129355",
			"title": "A vulnerability has been found in sigoden dufs up to 0.46.0",
			"summary": "A vulnerability has been found in sigoden dufs up to 0.46.0. This affects an unknown part of the file src/server.rs of the component WebDAV COPY Operation Handler. The manipulation leads to incorrect authorization. The attack is possible to be carried out remotely. Upgrading to version 0.47.0 is able to mitigate this issue. The identifier of the patch is fba13dffb9c65b5e5e26419f64de709200277a04. It is advisable to upgrade the affected component.",
			"severity": "MEDIUM",
			"cvss": 6.5,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:L",
			"published": "2026-11-15T01:18:03Z",
			"modified": "2026-11-15T01:18:03Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-285",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/sigoden/dufs/",
					"label": "https://github.com/sigoden/dufs/",
					"source": "nvd"
				},
				{
					"href": "https://github.com/sigoden/dufs/commit/fba13dffb9c65b5e5e26419f64de709200277a04",
					"label": "https://github.com/sigoden/dufs/commit/fba13dffb9c65b5e5e26419f64de709200277a04",
					"source": "nvd"
				},
				{
					"href": "https://github.com/sigoden/dufs/pull/753",
					"label": "https://github.com/sigoden/dufs/pull/753",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129355",
					"label": "https://vuldb.com/cve/CVE-2026-129355",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043822",
					"label": "https://vuldb.com/submit/1043822",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437418",
					"label": "https://vuldb.com/vuln/437418",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129356",
			"title": "A vulnerability was found in vllm-project vllm 0.30.0/0.31.0",
			"summary": "A vulnerability was found in vllm-project vllm 0.30.0/0.31.0. This vulnerability affects unknown code of the file single_type_kv_cache_manager.py of the component Common Prefix Handler. The manipulation results in race condition. The attack may be performed from remote. Attacks of this nature are highly complex. It is stated that the exploitability is difficult. The exploit has been made public and could be used. Upgrading to version 0.32.0 is able to resolve this issue. The patch is identified as e687a251bb056fa527846633f7a1b0a6c0f42374. You should upgrade the affected component.",
			"severity": "MEDIUM",
			"cvss": 5,
			"vector": "CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:L/I:L/A:L",
			"published": "2026-11-15T02:17:20Z",
			"modified": "2026-11-15T02:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-362",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/vllm-project/vllm/",
					"label": "https://github.com/vllm-project/vllm/",
					"source": "nvd"
				},
				{
					"href": "https://github.com/vllm-project/vllm/commit/e687a251bb056fa527846633f7a1b0a6c0f42374",
					"label": "https://github.com/vllm-project/vllm/commit/e687a251bb056fa527846633f7a1b0a6c0f42374",
					"source": "nvd"
				},
				{
					"href": "https://github.com/vllm-project/vllm/issues/61673",
					"label": "https://github.com/vllm-project/vllm/issues/61673",
					"source": "nvd"
				},
				{
					"href": "https://github.com/vllm-project/vllm/pull/61126",
					"label": "https://github.com/vllm-project/vllm/pull/61126",
					"source": "nvd"
				},
				{
					"href": "https://github.com/vllm-project/vllm/releases/tag/v0.32.0",
					"label": "https://github.com/vllm-project/vllm/releases/tag/v0.32.0",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129356",
					"label": "https://vuldb.com/cve/CVE-2026-129356",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129454",
			"title": "Zr.Admin.NET commit 85cff6a through commit eb9228a contains an insecure direct object reference vulnerability in GET /workflow/instance/{instanceId} that lets logged-in users view ",
			"summary": "Zr.Admin.NET commit 85cff6a through commit eb9228a contains an insecure direct object reference vulnerability in GET /workflow/instance/{instanceId} that lets logged-in users view others' workflow instances. Authenticated low-privilege attackers can enumerate sequential instance IDs to read other users' approval requests, including submitted form contents, applicant details and approval records.",
			"severity": "MEDIUM",
			"cvss": 6.5,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N",
			"published": "2026-11-15T02:17:21Z",
			"modified": "2026-11-15T02:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Workflow/Controllers/WfFlowInstanceController.cs#L49-L57",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Workflow/Controllers/WfFlowInstanceController.cs#L",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Workflow/Service/WfFlowInstanceService.cs#L173-L176",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Workflow/Service/WfFlowInstanceService.cs#L173-L17",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/commit/85cff6ae22389c241d3a4efe178273966650f7ca",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/commit/85cff6ae22389c241d3a4efe178273966650f7ca",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"source": "nvd"
				},
				{
					"href": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"label": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/zr-admin-net-commit-85cff6a-through-eb9228a-idor-via-workflow-instance-endpoint",
					"label": "https://www.vulncheck.com/advisories/zr-admin-net-commit-85cff6a-through-eb9228a-idor-via-workflow-instance-endpoint",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129455",
			"title": "Zr.Admin.NET commit e6ceaf4 through commit eb9228a contains an insecure direct object reference vulnerability in FrontArticleController that allows authenticated users to change ot",
			"summary": "Zr.Admin.NET commit e6ceaf4 through commit eb9228a contains an insecure direct object reference vulnerability in FrontArticleController that allows authenticated users to change other users' article visibility and pin state. Attackers can send PUT /front/article/changePublic with their own UserId in the body to make private articles public, then read them anonymously via GET /front/article/{id}.",
			"severity": "MEDIUM",
			"cvss": 5.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:N",
			"published": "2026-11-15T02:17:21Z",
			"modified": "2026-11-15T02:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/Content/FrontArticleController.cs#L122-L148",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/Content/FrontArticleContr",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Service/Content/ArticleService.cs#L402-L437",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Service/Content/ArticleService.cs#L402-L437",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"source": "nvd"
				},
				{
					"href": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"label": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/zr-admin-net-commit-e6ceaf4-through-eb9228a-idor-via-front-article-api",
					"label": "https://www.vulncheck.com/advisories/zr-admin-net-commit-e6ceaf4-through-eb9228a-idor-via-front-article-api",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129464",
			"title": "Zr.Admin.NET commit 0ee1ab8 through commit eb9228a contains a path traversal vulnerability that allows any logged-in user to read arbitrary server files via the path parameter of /",
			"summary": "Zr.Admin.NET commit 0ee1ab8 through commit eb9228a contains a path traversal vulnerability that allows any logged-in user to read arbitrary server files via the path parameter of /common/DownloadFile. Attackers can supply absolute paths or ../ sequences to read appsettings files and use the JwtSettings SecretKey to forge administrator tokens.",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-15T02:17:21Z",
			"modified": "2026-11-15T02:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-22",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/Infrastructure/Controllers/BaseController.cs#L110-L119",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/Infrastructure/Controllers/BaseController.cs#L110-L11",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/CommonController.cs#L220-L241",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/CommonController.cs#L220-",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/commit/0ee1ab8af5e3861766746d25acba1184111befcb",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/commit/0ee1ab8af5e3861766746d25acba1184111befcb",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"source": "nvd"
				},
				{
					"href": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"label": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/zr-admin-net-commit-0ee1ab8-through-eb9228a-path-traversal-via-downloadfile",
					"label": "https://www.vulncheck.com/advisories/zr-admin-net-commit-0ee1ab8-through-eb9228a-path-traversal-via-downloadfile",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129465",
			"title": "Zr.Admin.NET commit af07ffc through commit eb9228a contains an insecure direct object reference vulnerability in SysProfileController.UpdateProfile that allows any authenticated us",
			"summary": "Zr.Admin.NET commit af07ffc through commit eb9228a contains an insecure direct object reference vulnerability in SysProfileController.UpdateProfile that allows any authenticated user to modify other accounts via UserId. Attackers can set the administrator's phone number to one they control, request an SMS code via /checkMobile, and log in through /PhoneLogin to take over the administrator account.",
			"severity": "HIGH",
			"cvss": 8.8,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H",
			"published": "2026-11-15T02:17:21Z",
			"modified": "2026-11-15T02:17:21Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-639",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/SysLoginController.cs#L516-L559",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/SysLoginController",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/SysProfileController.cs#L62-L75",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/SysProfileControll",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.ServiceCore/Services/SysUserService.cs#L220-L236",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.ServiceCore/Services/SysUserService.cs#L220-L236",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/commit/af07ffc5d18e7876d3780d1ff5ee776b80950399",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/commit/af07ffc5d18e7876d3780d1ff5ee776b80950399",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"source": "nvd"
				},
				{
					"href": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"label": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129466",
			"title": "Zr.Admin.NET commit 1845017 through commit eb9228a contains a missing authorization vulnerability in TasksController.Get that allows any logged-in user to read scheduled task detai",
			"summary": "Zr.Admin.NET commit 1845017 through commit eb9228a contains a missing authorization vulnerability in TasksController.Get that allows any logged-in user to read scheduled task details without the monitor:job permission. Attackers can obtain task ids from the unprotected /monitor/jobLog/list endpoint and retrieve job parameters, API URLs, cron expressions, and stored SQL statements.",
			"severity": "MEDIUM",
			"cvss": 4.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N",
			"published": "2026-11-15T02:17:21Z",
			"modified": "2026-11-15T02:17:22Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/TasksController.cs#L145-L157",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/TasksController.cs",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/TasksController.cs#L84-L120",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/TasksController.cs",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/TasksLogController.cs#L31-L46",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/blob/eb9228a23014f6000c06cab2f10ae0d44ecbbd3a/ZR.Admin.WebApi/Controllers/System/TasksLogController",
					"source": "nvd"
				},
				{
					"href": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"label": "https://github.com/izhaorui/Zr.Admin.NET/issues/27",
					"source": "nvd"
				},
				{
					"href": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"label": "https://vul.yulun.ac.cn/20261114/zr-admin-net/",
					"source": "nvd"
				},
				{
					"href": "https://www.vulncheck.com/advisories/zr-admin-net-commit-1845017-through-eb9228a-missing-authorization-via-system-tasks-get",
					"label": "https://www.vulncheck.com/advisories/zr-admin-net-commit-1845017-through-eb9228a-missing-authorization-via-system-tasks-get",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129357",
			"title": "A vulnerability was determined in Linux Foundation Magma up to 1.9.0",
			"summary": "A vulnerability was determined in Linux Foundation Magma up to 1.9.0. This issue affects the function hostOrgMiddleware of the file nms/server/host/middleware.ts of the component Host Middleware. This manipulation of the argument role causes missing authorization. It is possible to initiate the attack remotely. The exploit has been publicly disclosed and may be utilized. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "MEDIUM",
			"cvss": 6.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L",
			"published": "2026-11-15T03:16:46Z",
			"modified": "2026-11-15T03:16:50Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-862",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/aymencdm/magma_pocs/blob/main/01-rbac-poc.sh",
					"label": "https://github.com/aymencdm/magma_pocs/blob/main/01-rbac-poc.sh",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129357",
					"label": "https://vuldb.com/cve/CVE-2026-129357",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1043997",
					"label": "https://vuldb.com/submit/1043997",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1044007",
					"label": "https://vuldb.com/submit/1044007",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437420",
					"label": "https://vuldb.com/vuln/437420",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437420/cti",
					"label": "https://vuldb.com/vuln/437420/cti",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129358",
			"title": "A vulnerability was identified in Linux Foundation Magma up to 1.9.0",
			"summary": "A vulnerability was identified in Linux Foundation Magma up to 1.9.0. Impacted is the function handleReact of the file nms/server/main/routes.ts of the component NMS. Such manipulation leads to cross site scripting. It is possible to launch the attack remotely. The exploit is publicly available and might be used. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "LOW",
			"cvss": 2.4,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:N/I:L/A:N",
			"published": "2026-11-15T03:16:51Z",
			"modified": "2026-11-15T03:16:51Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-79",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://github.com/aymencdm/magma_pocs/blob/main/02-xss-poc.sh",
					"label": "https://github.com/aymencdm/magma_pocs/blob/main/02-xss-poc.sh",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/cve/CVE-2026-129358",
					"label": "https://vuldb.com/cve/CVE-2026-129358",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1044004",
					"label": "https://vuldb.com/submit/1044004",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437421",
					"label": "https://vuldb.com/vuln/437421",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437421/cti",
					"label": "https://vuldb.com/vuln/437421/cti",
					"source": "nvd"
				},
				{
					"href": "https://www.linuxfoundation.org/",
					"label": "https://www.linuxfoundation.org/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129359",
			"title": "A security flaw has been discovered in Linux Foundation Magma up to 1.9.0",
			"summary": "A security flaw has been discovered in Linux Foundation Magma up to 1.9.0. The affected element is an unknown function of the file orc8r/lib/go/registry/interceptors.go. Performing a manipulation results in hard-coded credentials. The attack can be initiated remotely. The exploit has been released to the public and may be used for attacks. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "HIGH",
			"cvss": 7.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L",
			"published": "2026-11-15T03:16:51Z",
			"modified": "2026-11-15T03:16:52Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-259",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://vuldb.com/cve/CVE-2026-129359",
					"label": "https://vuldb.com/cve/CVE-2026-129359",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1044005",
					"label": "https://vuldb.com/submit/1044005",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437422",
					"label": "https://vuldb.com/vuln/437422",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437422/cti",
					"label": "https://vuldb.com/vuln/437422/cti",
					"source": "nvd"
				},
				{
					"href": "https://www.linuxfoundation.org/",
					"label": "https://www.linuxfoundation.org/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-129360",
			"title": "A weakness has been identified in Linux Foundation Magma up to 1.9.0",
			"summary": "A weakness has been identified in Linux Foundation Magma up to 1.9.0. The impacted element is an unknown function of the file orc8r/cloud/go/services/obsidian/access/operator.go of the component Obsidian REST. Executing a manipulation of the argument X-Magma-Client-Cert-Serial can lead to authentication bypass by spoofing. The attack can be launched remotely. The vendor was contacted early about this disclosure but did not respond in any way.",
			"severity": "HIGH",
			"cvss": 7.3,
			"vector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L",
			"published": "2026-11-15T04:16:45Z",
			"modified": "2026-11-15T04:16:45Z",
			"sources": ["nvd"],
			"vendor": null,
			"product": null,
			"cwe": "CWE-287",
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [
				{
					"href": "https://vuldb.com/cve/CVE-2026-129360",
					"label": "https://vuldb.com/cve/CVE-2026-129360",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/submit/1044006",
					"label": "https://vuldb.com/submit/1044006",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437423",
					"label": "https://vuldb.com/vuln/437423",
					"source": "nvd"
				},
				{
					"href": "https://vuldb.com/vuln/437423/cti",
					"label": "https://vuldb.com/vuln/437423/cti",
					"source": "nvd"
				},
				{
					"href": "https://www.linuxfoundation.org/",
					"label": "https://www.linuxfoundation.org/",
					"source": "nvd"
				}
			]
		},
		{
			"id": "CVE-2026-105482",
			"title": "Vulnerabilities in Node.js and Brotli Affecting Cisco Products: October 2026",
			"summary": "On October 21, 2026, Node.js announced the availability of fixes for multiple vulnerabilities across the following supported release lines: 22.x, 24.x, and 26.x. These vulnerabilities impact critical operations such as the Brotli decoder, DNS resolution, and TLS certificate validation. The vulnerabilities pose risks for remote code execution and traffic interception. For more information, see Node.js Security Release . The following vulnerabilities have a Security Impact Rating (SIR) of High and are addressed in this advisory: CVE-2026-111497 - Brotli decoder out-of-bounds write; potential remote code execution CVE-2026-105482 - DNS resolution truncation involving embedded NUL characters CVE",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": null,
			"modified": null,
			"sources": ["cisco"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-oct2026-node-js-Jj3SQ19u?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20Node.js%20and%20Brotli%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
				"label": "Vulnerabilities in Node.js and Brotli Affecting Cisco Products: October 2026",
				"source": "cisco"
			}]
		},
		{
			"id": "CVE-2026-20043",
			"title": "Multiple Cisco Products Snort 3 Security Hardening Release: October 2026",
			"summary": "As part of Cisco's ongoing commitment to proactive security and product quality, the Cisco owned Open Source Snort 3 Software engineering team has conducted a comprehensive internal security review. This review resulted in software hardening releases that address multiple internally discovered vulnerabilities. The vulnerabilities tracked by CVE-2026-20043 are related to issues concerning out-of-bounds writes that are grouped under the Common Weakness Enumeration (CWE) Base CWE-787. As part of Cisco's ongoing commitment to proactive security and product quality, the Cisco-owned Open Source Snort 3 engineering team has conducted a comprehensive internal security review. This review resulted in",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": null,
			"modified": null,
			"sources": ["cisco"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hardening-snort3-ybgmhTQe?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Multiple%20Cisco%20Products%20Snort%203%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
				"label": "Multiple Cisco Products Snort 3 Security Hardening Release: October 2026",
				"source": "cisco"
			}]
		},
		{
			"id": "CVE-2026-0326",
			"title": "CVE-2026-0326 PAN-OS: Buffer Overflow Vulnerability in Protocol and Service Processing (Severity: LOW)",
			"summary": "",
			"severity": "LOW",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0326",
				"label": "CVE-2026-0326 PAN-OS: Buffer Overflow Vulnerability in Protocol and Service Processing (Severity: LOW)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0327",
			"title": "CVE-2026-0327 PAN-OS: Privilege Escalation Vulnerability in GlobalProtect (Severity: LOW)",
			"summary": "",
			"severity": "LOW",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0327",
				"label": "CVE-2026-0327 PAN-OS: Privilege Escalation Vulnerability in GlobalProtect (Severity: LOW)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0330",
			"title": "CVE-2026-0330 PAN-OS: Authenticated Remote Code Execution (RCE) in Panorama (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0330",
				"label": "CVE-2026-0330 PAN-OS: Authenticated Remote Code Execution (RCE) in Panorama (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0329",
			"title": "CVE-2026-0329 PAN-OS: Buffer Overflow Vulnerability (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0329",
				"label": "CVE-2026-0329 PAN-OS: Buffer Overflow Vulnerability (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0323",
			"title": "CVE-2026-0323 Checkov by Prisma Cloud: Server-Side Request Forgery Vulnerability (Severity: LOW)",
			"summary": "",
			"severity": "LOW",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0323",
				"label": "CVE-2026-0323 Checkov by Prisma Cloud: Server-Side Request Forgery Vulnerability (Severity: LOW)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0331",
			"title": "CVE-2026-0331 PAN-OS: Sensitive Information Disclosure Vulnerability (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0331",
				"label": "CVE-2026-0331 PAN-OS: Sensitive Information Disclosure Vulnerability (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0328",
			"title": "CVE-2026-0328 PAN-OS: User Impersonation through GlobalProtect Portal (Severity: LOW)",
			"summary": "",
			"severity": "LOW",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0328",
				"label": "CVE-2026-0328 PAN-OS: User Impersonation through GlobalProtect Portal (Severity: LOW)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0325",
			"title": "CVE-2026-0325 PAN-OS: GlobalProtect Authorization Bypass Vulnerability (Severity: LOW)",
			"summary": "",
			"severity": "LOW",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0325",
				"label": "CVE-2026-0325 PAN-OS: GlobalProtect Authorization Bypass Vulnerability (Severity: LOW)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0324",
			"title": "CVE-2026-0324 GlobalProtect App: Incorrect Privilege Management Vulnerability in OPSWAT MetaDefender Endpoint Security SDK on Windows (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-11-11T17:00:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0324",
				"label": "CVE-2026-0324 GlobalProtect App: Incorrect Privilege Management Vulnerability in OPSWAT MetaDefender Endpoint Security S",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0250",
			"title": "CVE-2026-0250 GlobalProtect App: Buffer Overflow Vulnerability during connection to Portal or Gateway (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-11-10T07:15:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0250",
				"label": "CVE-2026-0250 GlobalProtect App: Buffer Overflow Vulnerability during connection to Portal or Gateway (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0307",
			"title": "CVE-2026-0307 GlobalProtect App: Local Privilege Escalation Vulnerabilities (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-10-17T00:55:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0307",
				"label": "CVE-2026-0307 GlobalProtect App: Local Privilege Escalation Vulnerabilities (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0321",
			"title": "CVE-2026-0321 PAN-OS: Denial of Service (DoS) Vulnerabilities in Network Services (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-10-15T18:30:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0321",
				"label": "CVE-2026-0321 PAN-OS: Denial of Service (DoS) Vulnerabilities in Network Services (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0316",
			"title": "CVE-2026-0316 PAN-OS: Stored Cross-Site Scripting (XSS) Vulnerability (Severity: LOW)",
			"summary": "",
			"severity": "LOW",
			"cvss": null,
			"vector": null,
			"published": "2026-10-15T18:30:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0316",
				"label": "CVE-2026-0316 PAN-OS: Stored Cross-Site Scripting (XSS) Vulnerability (Severity: LOW)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0320",
			"title": "CVE-2026-0320 PAN-OS: Authenticated Admin Command Injection Vulnerability (Severity: MEDIUM)",
			"summary": "",
			"severity": "MEDIUM",
			"cvss": null,
			"vector": null,
			"published": "2026-10-15T18:30:00Z",
			"modified": null,
			"sources": ["paloalto"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://security.paloaltonetworks.com/CVE-2026-0320",
				"label": "CVE-2026-0320 PAN-OS: Authenticated Admin Command Injection Vulnerability (Severity: MEDIUM)",
				"source": "paloalto"
			}]
		},
		{
			"id": "CVE-2026-0257",
			"title": "Active Exploitation of May 2026 PAN-OS CVE-2026-0257 (Updated October 20)",
			"summary": "Ransomware operators including Spikey Scorpius (aka Qilin) and Tarnished Scorpius (aka Inc) are exploiting PAN-OS vulnerability CVE-2026-0257. The post Active Exploitation of May 2026 PAN-OS CVE-2026-0257 (Updated October 20) appeared first on Unit 42 .",
			"severity": "UNKNOWN",
			"cvss": null,
			"vector": null,
			"published": "2026-10-20T20:30:42Z",
			"modified": null,
			"sources": ["unit42"],
			"vendor": null,
			"product": null,
			"cwe": null,
			"kev": null,
			"redhat": null,
			"epss": null,
			"epssPercentile": null,
			"references": [{
				"href": "https://unit42.paloaltonetworks.com/active-exploitation-of-pan-os-cve-2026-0257/",
				"label": "Active Exploitation of May 2026 PAN-OS CVE-2026-0257 (Updated October 20)",
				"source": "unit42"
			}]
		}
	],
	advisories: [
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-oct2026-node-js-Jj3SQ19u?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20Node.js%20and%20Brotli%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
			"source": "cisco",
			"title": "Vulnerabilities in Node.js and Brotli Affecting Cisco Products: October 2026",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-oct2026-node-js-Jj3SQ19u?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20Node.js%20and%20Brotli%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
			"published": null,
			"summary": "On October 21, 2026, Node.js announced the availability of fixes for multiple vulnerabilities across the following supported release lines: 22.x, 24.x, and 26.x. These vulnerabilities impact critical operations such as the Brotli decoder, DNS resolution, and TLS certificate validation. The vulnerabilities pose risks for remote code execution and traffic interception. For more information, see Node.js Security Release . The following vulnerabilities have a Security Impact Rating (SIR) of High and are addressed in this advisory: CVE-2026-111497 - Brotli decoder out-of-bounds write; potential remote code execution CVE-2026-105482 - DNS resolution truncation involving embedded NUL characters CVE",
			"cves": ["CVE-2026-111497", "CVE-2026-105482"]
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-emudhra-info-ScS22A1r?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Informational%20for%20Emergency%20Distrust%20of%20eMudhra%20Root%20and%20Intermediate%20Certificate%20Authorities%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Informational for Emergency Distrust of eMudhra Root and Intermediate Certificate Authorities",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-emudhra-info-ScS22A1r?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Informational%20for%20Emergency%20Distrust%20of%20eMudhra%20Root%20and%20Intermediate%20Certificate%20Authorities%26vs_k=1",
			"published": null,
			"summary": "Between October 17 and October 20, 2026, a critical security compromise involving Certificate Authorities that are managed by eMudhra was uncovered. A security researcher demonstrated that the private keys for eight eMudhra intermediate certificates were fundamentally broken due to an unprecedented error in their Key Generation Ceremony (KGC) in April 2025. This allows anyone to brute-force acquire these private keys within seconds. For more information, see eMudhra Intermediate CA Compromise and the Cisco Talos blog post Compromised eMudhra intermediate certificates . For information about Splunk products and offerings, see Compromised eMudhra Intermediate Certificate Authorities on Splunk ",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-bworks-xxe-uwUd7CEt?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20BroadWorks%20Out-of-Band%20Blind%20XML%20External%20Entity%20Injection%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco BroadWorks Out-of-Band Blind XML External Entity Injection Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-bworks-xxe-uwUd7CEt?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20BroadWorks%20Out-of-Band%20Blind%20XML%20External%20Entity%20Injection%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the Open Client Interface (OCI) XML Parser of Cisco BroadWorks could allow an unauthenticated, remote attacker to read sensitive configuration information on an affected system. This vulnerability exists because XML entries are improperly parsed due to external entity resolution being allowed by default. An attacker could exploit this vulnerability by sending a crafted XML message to the Open Client Interface – Provisioning (OCI-P) service. A successful exploit could allow the attacker to view sensitive files from the filesystem with the privileges of the Cisco BroadWorks user. Cisco has released software updates that address this vulnerability. There are no workarounds th",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ise-auth-bypass-1-MxcTNgwx?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Identity%20Services%20Engine%20Authorization%20Bypass%20Vulnerabilities%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Identity Services Engine Authorization Bypass Vulnerabilities",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ise-auth-bypass-1-MxcTNgwx?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Identity%20Services%20Engine%20Authorization%20Bypass%20Vulnerabilities%26vs_k=1",
			"published": null,
			"summary": "Multiple vulnerabilities in the web-based management interface of Cisco Identity Services Engine (ISE) and Cisco ISE Passive Identity Connector (ISE-PIC) could allow an authenticated, remote attacker to modify parts of the configuration on an affected device. These vulnerabilities are due to the lack of server-side validation of Administrator permissions. An attacker could exploit these vulnerabilities by submitting a crafted HTTP request to an affected system. A successful exploit could allow the attacker to modify descriptions of files on specific pages. To exploit these vulnerabilities, an attacker would need valid Administrator credentials. Cisco has released software updates that addres",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hardening-meraki-os-drbEX9GH?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Meraki%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Meraki Security Hardening Release: October 2026",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hardening-meraki-os-drbEX9GH?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Meraki%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"published": null,
			"summary": "As part of Cisco's ongoing commitment to proactive security and product quality, engineering teams conducted a comprehensive internal security review. This review resulted in software hardening releases that address multiple internally discovered vulnerabilities. These vulnerabilities were found during internal testing and are not known to be actively exploited. To assist customers in patching and streamline the disclosure process, Cisco has grouped these issues by their underlying vulnerability class — Common Weakness Enumeration (CWE) — and assigned a single Common Vulnerabilities and Exposures identifier (CVE ID) to each CWE grouping. Cisco has released software updates that address these",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-php-october26-Jj384Daq?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20PHP%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
			"source": "cisco",
			"title": "Vulnerabilities in PHP Affecting Cisco Products: October 2026",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-php-october26-Jj384Daq?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Vulnerabilities%20in%20PHP%20Affecting%20Cisco%20Products:%20October%202026%26vs_k=1",
			"published": null,
			"summary": "On October 21, the PHP Foundation announced the availability of a Critical PHP Security release addressing two critical vulnerabilities: CVE-2026-109618 - RCE via OOM corruption CVE-2026-109619 - RCE via stale global state For information about these vulnerabilities, see the advisories GHSA-w8hw-w9fx-j79w and GHSA-6wmf-4rv5-p3rp . These vulnerabilities are being referenced as PHP2shell. For information about Splunk products and offerings, see Vulnerabilities in PHP (CVE-2026-109618, CVE-2026-109619) on Splunk Products - October 2026 . Important: If a product is not listed within this advisory, Cisco's review indicates that the product is not affected by this vulnerability. This advisory will",
			"cves": ["CVE-2026-109618", "CVE-2026-109619"]
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ise-cert-mE9BD5GO?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Identity%20Services%20Engine%20Authorization%20Bypass%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Identity Services Engine Authorization Bypass Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-ise-cert-mE9BD5GO?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Identity%20Services%20Engine%20Authorization%20Bypass%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the authorization mechanism of Cisco Identity Services Engine (ISE) and Cisco ISE Passive Identity Connector (ISE-PIC) could allow an unauthenticated, remote attacker to obtain an endpoint identity certificate. This vulnerability is due to improper authorization checks. An attacker could exploit this vulnerability by sending a crafted request to an affected device. A successful exploit could allow the attacker to bypass authorization to obtain an endpoint certificate. Cisco has released software updates that address this vulnerability. There are no workarounds that address this vulnerability. This advisory is available at the following link: https://sec.cloudapps.cisco.com",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-notice-I8z3n6lK?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Advance%20Notification%20for%20Publication%20of%20November%204,%202026,%20Security%20Advisories%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Advance Notification for Publication of November 4, 2026, Security Advisories",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-notice-I8z3n6lK?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Advance%20Notification%20for%20Publication%20of%20November%204,%202026,%20Security%20Advisories%26vs_k=1",
			"published": null,
			"summary": "On November 4, 2026, the Cisco Product Security Incident Response Team (PSIRT) published the following advisories: Cisco Security Advisory CVE ID Security Impact Rating CVSS Base Score Cisco UCS Central Software Remote Code Execution Vulnerability CVE-2026-76506 High 7.6 Cisco Unified Communications Manager Cross-Site Scripting Vulnerability CVE-2026-76419 Medium 6.1 Cisco Identity Services Engine Authorization Bypass Vulnerability CVE-2026-20241 Medium 5.3 To remediate the vulnerabilities that were disclosed on November 4, 2026, Cisco strongly recommends that customers upgrade to the fixed software that is indicated in the advisories. Important: The Cisco PSIRT does not plan to publish any ",
			"cves": [
				"CVE-2026-76506",
				"CVE-2026-76419",
				"CVE-2026-20241"
			]
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-cucm-xss-5mQn2U5z?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Unified%20Communications%20Manager%20Cross-Site%20Scripting%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Unified Communications Manager Cross-Site Scripting Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-cucm-xss-5mQn2U5z?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Unified%20Communications%20Manager%20Cross-Site%20Scripting%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the web-based management interface of Cisco Unified Communications Manager (Unified CM) and Cisco Unified Communications Manager Session Management Edition (Unified CM SME) could allow an unauthenticated, remote attacker to conduct a cross-site scripting (XSS) attack against a user of the interface. This vulnerability exists because the web-based management interface does not properly validate user-supplied input. An attacker could exploit this vulnerability by persuading a user of the interface to click a crafted link. A successful exploit could allow the attacker to execute arbitrary script code in the context of the affected interface or access sensitive, browser-based ",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-cucs-rce-LzHSFRDQ?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20UCS%20Central%20Software%20Remote%20Code%20Execution%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco UCS Central Software Remote Code Execution Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-cucs-rce-LzHSFRDQ?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20UCS%20Central%20Software%20Remote%20Code%20Execution%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the web-based management interface of Cisco UCS Central Software could allow an authenticated, remote attacker to achieve remote code execution or conduct information disclosure attacks on an affected device. This vulnerability is due to insufficient validation of user-supplied input in an HTTP request. An attacker could exploit this vulnerability by sending a crafted HTTP request to an affected endpoint on an affected device. A successful exploit could allow the attacker to execute arbitrary commands, write arbitrary files to the filesystem, and obtain sensitive information. To exploit this vulnerability, the attacker must have valid user credentials on the affected devic",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-esa-inj-2bLVGmhX?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Secure%20Email%20Gateway%20SQL%20Injection%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Secure Email Gateway SQL Injection Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-esa-inj-2bLVGmhX?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Secure%20Email%20Gateway%20SQL%20Injection%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the email parsing of Cisco AsyncOS Software for Cisco Secure Email Gateway could allow an unauthenticated, remote attacker to execute arbitrary commands with root privileges on the underlying operating system. This vulnerability is due to insufficient validation in the email parsing logic. An attacker could exploit this vulnerability by sending a crafted email message that contains malicious SQL statements through an affected device. A successful exploit could allow the attacker to execute arbitrary SQL statements, leading to command execution with root privileges on the underlying operating system. Cisco has released software updates that address this vulnerability. There",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-finesse-ssrf-mmSuyugS?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Finesse%20Server-Side%20Request%20Forgery%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Finesse Server-Side Request Forgery Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-finesse-ssrf-mmSuyugS?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Finesse%20Server-Side%20Request%20Forgery%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the web-based management interface of Cisco Finesse could allow an unauthenticated, remote attacker to conduct server-side request forgery (SSRF) attacks through an affected device. This vulnerability is due to improper input validation for specific HTTP requests. An attacker could exploit this vulnerability by sending a crafted HTTP request to an affected device. A successful exploit could allow the attacker to obtain limited sensitive information for services that are associated with the affected device. Cisco plans to release software updates that address this vulnerability. There are no workarounds that address this vulnerability. This advisory is available at the foll",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-rpa-EHchtZk?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Catalyst%20SD-WAN%20Controller%20Authentication%20Bypass%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Catalyst SD-WAN Controller Authentication Bypass Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-sdwan-rpa-EHchtZk?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Catalyst%20SD-WAN%20Controller%20Authentication%20Bypass%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the peering authentication in Cisco Catalyst SD-WAN Controller, formerly SD-WAN vSmart, Cisco Catalyst SD-WAN Manager, formerly SD-WAN vManage, and Cisco Catalyst SD-WAN Validator, formerly SD-WAN vBond, could allow an unauthenticated, remote attacker to bypass authentication and obtain administrative privileges on an affected system. This vulnerability exists because the peering authentication mechanism in an affected system is not working properly. An attacker could exploit this vulnerability by sending crafted requests to an affected system. A successful exploit could allow the attacker to log in to an affected Cisco Catalyst SD-WAN Controller as an internal, high-privi",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Secure%20Firewall%20Adaptive%20Security%20Appliance%20and%20Secure%20Firewall%20Threat%20Defense%20Software%20Remote%20Access%20SSL%20VPN%20Tunnel%20Denial%20of%20Service%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Secure Firewall Adaptive Security Appliance and Secure Firewall Threat Defense Software Remote Access SSL VPN Tunnel Denial of Service Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-asaftd-tunnel-dos-s6mgkb75?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Secure%20Firewall%20Adaptive%20Security%20Appliance%20and%20Secure%20Firewall%20Threat%20Defense%20Software%20Remote%20Access%20SSL%20VPN%20Tunnel%20Denial%20of%20Service%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "A vulnerability in the Remote Access SSL VPN service of Cisco Secure Firewall Adaptive Security Appliance (ASA) Software and Cisco Secure Firewall Threat Defense (FTD) Software could allow an unauthenticated, remote attacker to cause the device to reload unexpectedly, resulting in a denial of service (DoS) condition. This vulnerability is due to logic errors when secondary authentication is configured on a tunnel group. An attacker could exploit this vulnerability by sending a crafted request when connecting to the SSL remote access VPN. A successful exploit could allow the attacker to cause the affected device to reload, resulting in a DoS condition. Cisco has released software updates that",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-voice-hardening-twgbH9e3?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Unified%20Communications%20Products%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Unified Communications Products Security Hardening Release: October 2026",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-voice-hardening-twgbH9e3?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Unified%20Communications%20Products%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"published": null,
			"summary": "As part of Cisco's ongoing commitment to proactive security and product quality, engineering teams for Cisco Emergency Responder, Cisco Prime Collaboration Deployment, Cisco Unified Communications Manager (Unified CM), Cisco Unified Communications Manager IM & Presence Service (Unified CM IM&P), Cisco Unified Communications Manager Session Management Edition (Unified CM SME), and Cisco Unity Connection have conducted a comprehensive internal security review. This review resulted in software hardening releases that address multiple internally discovered vulnerabilities. These vulnerabilities were found during internal testing and are not known to be actively exploited. To assist customers in ",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-exwy-hardening-FhcqBVcs?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Expressway%20Series%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"source": "cisco",
			"title": "Cisco Expressway Series Security Hardening Release: October 2026",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-exwy-hardening-FhcqBVcs?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Cisco%20Expressway%20Series%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"published": null,
			"summary": "As part of Cisco's ongoing commitment to proactive security and product quality, the Cisco Expressway Series software engineering team has conducted a comprehensive internal security review. This review resulted in a software hardening release that addresses multiple internally discovered vulnerabilities. These vulnerabilities were found during internal testing and are not known to be actively exploited. To assist customers in patching and streamline the disclosure process, Cisco has grouped these issues by their underlying vulnerability class - Common Weakness Enumeration (CWE) - and assigned a single Common Vulnerabilities and Exposures identifier (CVE ID) to each CWE grouping. Cisco Expre",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-snort3-mime-vulns-bkXjcKkt?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Multiple%20Cisco%20Products%20Snort%203%20SMTP%20MIME%20Denial%20of%20Service%20Vulnerability%26vs_k=1",
			"source": "cisco",
			"title": "Multiple Cisco Products Snort 3 SMTP MIME Denial of Service Vulnerability",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-snort3-mime-vulns-bkXjcKkt?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Multiple%20Cisco%20Products%20Snort%203%20SMTP%20MIME%20Denial%20of%20Service%20Vulnerability%26vs_k=1",
			"published": null,
			"summary": "Multiple Cisco products are affected by a vulnerability in the Snort 3 SMTP MIME Decoder that could allow an unauthenticated, remote attacker to cause the Snort 3 Detection Engine to restart. This vulnerability is due to a lack of error checking when the MIME fields of the SMTP header are parsed. An attacker could exploit this vulnerability by sending crafted SMTP packets through an established connection to be parsed by Snort 3. A successful exploit could allow the attacker to cause a denial of service (DoS) condition when the Snort 3 Detection Engine unexpectedly restarts. Cisco has released software updates that address this vulnerability. There are no workarounds that address this vulner",
			"cves": []
		},
		{
			"id": "cisco:https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hardening-snort3-ybgmhTQe?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Multiple%20Cisco%20Products%20Snort%203%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"source": "cisco",
			"title": "Multiple Cisco Products Snort 3 Security Hardening Release: October 2026",
			"href": "https://sec.cloudapps.cisco.com/security/center/content/CiscoSecurityAdvisory/cisco-sa-hardening-snort3-ybgmhTQe?vs_f=Cisco%20Security%20Advisory%26vs_cat=Security%20Intelligence%26vs_type=RSS%26vs_p=Multiple%20Cisco%20Products%20Snort%203%20Security%20Hardening%20Release:%20October%202026%26vs_k=1",
			"published": null,
			"summary": "As part of Cisco's ongoing commitment to proactive security and product quality, the Cisco owned Open Source Snort 3 Software engineering team has conducted a comprehensive internal security review. This review resulted in software hardening releases that address multiple internally discovered vulnerabilities. The vulnerabilities tracked by CVE-2026-20043 are related to issues concerning out-of-bounds writes that are grouped under the Common Weakness Enumeration (CWE) Base CWE-787. As part of Cisco's ongoing commitment to proactive security and product quality, the Cisco-owned Open Source Snort 3 engineering team has conducted a comprehensive internal security review. This review resulted in",
			"cves": ["CVE-2026-20043"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0326",
			"source": "paloalto",
			"title": "CVE-2026-0326 PAN-OS: Buffer Overflow Vulnerability in Protocol and Service Processing (Severity: LOW)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0326",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0326"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0327",
			"source": "paloalto",
			"title": "CVE-2026-0327 PAN-OS: Privilege Escalation Vulnerability in GlobalProtect (Severity: LOW)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0327",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0327"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0330",
			"source": "paloalto",
			"title": "CVE-2026-0330 PAN-OS: Authenticated Remote Code Execution (RCE) in Panorama (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0330",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0330"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/PAN-SA-2026-0014",
			"source": "paloalto",
			"title": "PAN-SA-2026-0014 Chromium: Monthly Vulnerability Update (November 2026) (Severity: HIGH)",
			"href": "https://security.paloaltonetworks.com/PAN-SA-2026-0014",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": []
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0329",
			"source": "paloalto",
			"title": "CVE-2026-0329 PAN-OS: Buffer Overflow Vulnerability (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0329",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0329"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0323",
			"source": "paloalto",
			"title": "CVE-2026-0323 Checkov by Prisma Cloud: Server-Side Request Forgery Vulnerability (Severity: LOW)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0323",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0323"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0331",
			"source": "paloalto",
			"title": "CVE-2026-0331 PAN-OS: Sensitive Information Disclosure Vulnerability (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0331",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0331"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0328",
			"source": "paloalto",
			"title": "CVE-2026-0328 PAN-OS: User Impersonation through GlobalProtect Portal (Severity: LOW)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0328",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0328"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0325",
			"source": "paloalto",
			"title": "CVE-2026-0325 PAN-OS: GlobalProtect Authorization Bypass Vulnerability (Severity: LOW)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0325",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0325"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0324",
			"source": "paloalto",
			"title": "CVE-2026-0324 GlobalProtect App: Incorrect Privilege Management Vulnerability in OPSWAT MetaDefender Endpoint Security SDK on Windows (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0324",
			"published": "2026-11-11T17:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-0324"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0250",
			"source": "paloalto",
			"title": "CVE-2026-0250 GlobalProtect App: Buffer Overflow Vulnerability during connection to Portal or Gateway (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0250",
			"published": "2026-11-10T07:15:00Z",
			"summary": "",
			"cves": ["CVE-2026-0250"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-111497",
			"source": "paloalto",
			"title": "CVE-2026-111497 Portfolio Status: Impact of Brotli Vulnerability (CVE-2026-111497) on Palo Alto Networks Products (Severity: CRITICAL)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-111497",
			"published": "2026-11-09T21:00:00Z",
			"summary": "",
			"cves": ["CVE-2026-111497"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-109618",
			"source": "paloalto",
			"title": "CVE-2026-109618 Impact of Critical Vulnerabilities in PHP (CVE-2026-109618, CVE-2026-109619) on Palo Alto Networks Products  (Severity: CRITICAL)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-109618",
			"published": "2026-10-29T23:54:00Z",
			"summary": "",
			"cves": ["CVE-2026-109618", "CVE-2026-109619"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0307",
			"source": "paloalto",
			"title": "CVE-2026-0307 GlobalProtect App: Local Privilege Escalation Vulnerabilities (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0307",
			"published": "2026-10-17T00:55:00Z",
			"summary": "",
			"cves": ["CVE-2026-0307"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0321",
			"source": "paloalto",
			"title": "CVE-2026-0321 PAN-OS: Denial of Service (DoS) Vulnerabilities in Network Services (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0321",
			"published": "2026-10-15T18:30:00Z",
			"summary": "",
			"cves": ["CVE-2026-0321"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0316",
			"source": "paloalto",
			"title": "CVE-2026-0316 PAN-OS: Stored Cross-Site Scripting (XSS) Vulnerability (Severity: LOW)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0316",
			"published": "2026-10-15T18:30:00Z",
			"summary": "",
			"cves": ["CVE-2026-0316"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0322",
			"source": "paloalto",
			"title": "CVE-2026-0322 PAN-OS: Authenticated Remote Code Execution (RCE) in the Management Interface (Severity: HIGH)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0322",
			"published": "2026-10-15T18:30:00Z",
			"summary": "",
			"cves": ["CVE-2026-0322"]
		},
		{
			"id": "paloalto:https://security.paloaltonetworks.com/CVE-2026-0320",
			"source": "paloalto",
			"title": "CVE-2026-0320 PAN-OS: Authenticated Admin Command Injection Vulnerability (Severity: MEDIUM)",
			"href": "https://security.paloaltonetworks.com/CVE-2026-0320",
			"published": "2026-10-15T18:30:00Z",
			"summary": "",
			"cves": ["CVE-2026-0320"]
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/cairn-framework-ai-autonomous-attacks/",
			"source": "unit42",
			"title": "Attackers Use Autonomous AI to Target Semiconductor, Defense and Civil Society Sectors",
			"href": "https://unit42.paloaltonetworks.com/cairn-framework-ai-autonomous-attacks/",
			"published": "2026-11-12T15:00:31Z",
			"summary": "Our analysis of how attackers used the open-source Cairn AI agent framework to autonomously breach semiconductor, defense and civic targets. The post Attackers Use Autonomous AI to Target Semiconductor, Defense and Civil Society Sectors appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/artex-and-ai-powered-red-teaming-tools/",
			"source": "unit42",
			"title": "ARTEX and AI-Powered Red Teaming Tools: What Defenders Need to Know",
			"href": "https://unit42.paloaltonetworks.com/artex-and-ai-powered-red-teaming-tools/",
			"published": "2026-11-11T23:00:53Z",
			"summary": "Learn what Unit 42 discovered about attacker use of AI-powered red team tools, and how to mitigate these attacks. The post ARTEX and AI-Powered Red Teaming Tools: What Defenders Need to Know appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/falcon-c2-browser-compromise/",
			"source": "unit42",
			"title": "The XG Files: Falcon C2 Flying Under The (Browser) Radar",
			"href": "https://unit42.paloaltonetworks.com/falcon-c2-browser-compromise/",
			"published": "2026-11-11T15:00:23Z",
			"summary": "We uncover Falcon C2, a browser-based threat framework targeting governments via malicious scripts, extensions, and the Antino implant. The post The XG Files: Falcon C2 Flying Under The (Browser) Radar appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/europes-refrigeration-systems-attacks/",
			"source": "unit42",
			"title": "Turning Up the Heat: Inside the Attacks on Europe’s Refrigeration Systems",
			"href": "https://unit42.paloaltonetworks.com/europes-refrigeration-systems-attacks/",
			"published": "2026-11-06T21:15:09Z",
			"summary": "Unit 42 examines recent cyberattacks targeting European refrigeration systems and outlines defense and mitigation strategies. The post Turning Up the Heat: Inside the Attacks on Europe’s Refrigeration Systems appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/u42-threat-intelligence-highlights-oct-2026/",
			"source": "unit42",
			"title": "Unit 42 Threat Intelligence Highlights - Nov. 2, 2026",
			"href": "https://unit42.paloaltonetworks.com/u42-threat-intelligence-highlights-oct-2026/",
			"published": "2026-11-02T23:00:45Z",
			"summary": "Unit 42 details recent threat intelligence, highlighting cyberespionage, financial extortion, and the rapid adoption of AI across offensive workflows. The post Unit 42 Threat Intelligence Highlights - Nov. 2, 2026 appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/",
			"source": "unit42",
			"title": "Threat Brief: Critical Vulnerabilities in PHP: CVE-2026-109618, CVE-2026-109619 (Updated October 29)",
			"href": "https://unit42.paloaltonetworks.com/cve-2026-109618-cve-2026-109619/",
			"published": "2026-10-29T18:00:34Z",
			"summary": "CVE-2026-109618 and CVE-2026-109619 are Critical vulnerabilities in PHP, a scripting language used globally for web servers and CMS systems. The post Threat Brief: Critical Vulnerabilities in PHP: CVE-2026-109618, CVE-2026-109619 (Updated October 29) appeared first on Unit 42 .",
			"cves": ["CVE-2026-109618", "CVE-2026-109619"]
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/unwrapping-retail-cyber-threats/",
			"source": "unit42",
			"title": "Unwrapping Retail Peak Season Cyber Threats",
			"href": "https://unit42.paloaltonetworks.com/unwrapping-retail-cyber-threats/",
			"published": "2026-10-28T18:00:10Z",
			"summary": "Unit 42 explores key peak shopping season retail cyber threats, from ransomware to AI attacks, and shares how to defend operations and customer trust. The post Unwrapping Retail Peak Season Cyber Threats appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/emudhra-certificate-compromise/",
			"source": "unit42",
			"title": "EMudhra Intermediate CA Certificates Compromised",
			"href": "https://unit42.paloaltonetworks.com/emudhra-certificate-compromise/",
			"published": "2026-10-22T17:15:32Z",
			"summary": "Eight compromised eMudhra intermediate CA private keys risk unauthorized TLS signing and MitM interception. Read our analysis and containment guide. The post EMudhra Intermediate CA Certificates Compromised appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/current-landscape-oauth-attacks/",
			"source": "unit42",
			"title": "The Current Landscape of OAuth Attacks",
			"href": "https://unit42.paloaltonetworks.com/current-landscape-oauth-attacks/",
			"published": "2026-10-22T17:00:25Z",
			"summary": "Unit 42 explores modern OAuth threats and actionable steps organizations can take to protect their environments. The post The Current Landscape of OAuth Attacks appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/ai-assisted-cybercrime-analysis/",
			"source": "unit42",
			"title": "“Next Exploit Opportunities”: How a Threat Actor Used AI to Help Plan and Execute Multiple Types of Cybercrime Activities",
			"href": "https://unit42.paloaltonetworks.com/ai-assisted-cybercrime-analysis/",
			"published": "2026-10-21T14:00:24Z",
			"summary": "An investigation into a threat actor bypassing AI safety controls to coordinate credential theft, VoIP fraud planning, and database exfiltration. The post “Next Exploit Opportunities”: How a Threat Actor Used AI to Help Plan and Execute Multiple Types of Cybercrime Activities appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/active-exploitation-of-pan-os-cve-2026-0257/",
			"source": "unit42",
			"title": "Active Exploitation of May 2026 PAN-OS CVE-2026-0257 (Updated October 20)",
			"href": "https://unit42.paloaltonetworks.com/active-exploitation-of-pan-os-cve-2026-0257/",
			"published": "2026-10-20T20:30:42Z",
			"summary": "Ransomware operators including Spikey Scorpius (aka Qilin) and Tarnished Scorpius (aka Inc) are exploiting PAN-OS vulnerability CVE-2026-0257. The post Active Exploitation of May 2026 PAN-OS CVE-2026-0257 (Updated October 20) appeared first on Unit 42 .",
			"cves": ["CVE-2026-0257"]
		},
		{
			"id": "unit42:https://unit42.paloaltonetworks.com/top-5-initial-access-vectors-september-2026/",
			"source": "unit42",
			"title": "Top 5 Initial Access Threat Vectors Observed by Unit 42 in September 2026",
			"href": "https://unit42.paloaltonetworks.com/top-5-initial-access-vectors-september-2026/",
			"published": "2026-10-16T17:47:54Z",
			"summary": "Unit 42 details the top initial access vectors adversaries use to breach organizations, led by edge exploits, credential abuse and phishing The post Top 5 Initial Access Threat Vectors Observed by Unit 42 in September 2026 appeared first on Unit 42 .",
			"cves": []
		},
		{
			"id": "nsa:CSI: Post-quantum questions to ask your vendors",
			"source": "nsa",
			"title": "CSI: Post-quantum questions to ask your vendors",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-11-04T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:Key Practices for Incident Readiness and Response in Super Intelligence Training and Evalu",
			"source": "nsa",
			"title": "Key Practices for Incident Readiness and Response in Super Intelligence Training and Evaluation",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-10-16T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:CSI: Commercial National Security Algorithm Suite 2.0 and Quantum Computing FAQ",
			"source": "nsa",
			"title": "CSI: Commercial National Security Algorithm Suite 2.0 and Quantum Computing FAQ",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-10-13T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:CSI: Hardening DoW Critical OT Environments With ZT Principles",
			"source": "nsa",
			"title": "CSI: Hardening DoW Critical OT Environments With ZT Principles",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-10-08T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:CSA: Chinese Government-linked Cyber Threat Actors Combine Automated and Hands-on Hacking ",
			"source": "nsa",
			"title": "CSA: Chinese Government-linked Cyber Threat Actors Combine Automated and Hands-on Hacking Tools",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-10-08T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:CSA: China-Based Artificial Intelligence Companies Conducting Industrial-Scale Distillatio",
			"source": "nsa",
			"title": "CSA: China-Based Artificial Intelligence Companies Conducting Industrial-Scale Distillation Campaigns",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-09-08T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:Joint CSA: China-Linked Hacking Group QTFY Targets Military and Critical Infrastructure",
			"source": "nsa",
			"title": "Joint CSA: China-Linked Hacking Group QTFY Targets Military and Critical Infrastructure",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-08-26T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:CSA: Defending Against an Active Threat to Siemens S7 Series PLCs",
			"source": "nsa",
			"title": "CSA: Defending Against an Active Threat to Siemens S7 Series PLCs",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-08-19T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:Joint CSA: #StopRansomware: Gunra",
			"source": "nsa",
			"title": "Joint CSA: #StopRansomware: Gunra",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-08-10T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		},
		{
			"id": "nsa:Joint CSA: Iranian-Affiliated Cyber Actors Exploit PLCs Across US Critical Infrastructure",
			"source": "nsa",
			"title": "Joint CSA: Iranian-Affiliated Cyber Actors Exploit PLCs Across US Critical Infrastructure",
			"href": "https://www.nsa.gov/cybersecurity-guidance/",
			"published": "2026-07-22T00:00:00Z",
			"summary": "Indexed from NSA Cybersecurity Advisories and Guidance. NSA does not publish a browser-readable feed; the catalog is the source of the document.",
			"cves": []
		}
	]
};
var STACK_PRODUCTS = [
	{
		id: "win11",
		label: "Windows 11",
		detail: "Workstation",
		terms: ["Windows 11", "windows_11"]
	},
	{
		id: "macos",
		label: "macOS",
		detail: "Workstation",
		terms: ["macOS", "Mac OS X"]
	},
	{
		id: "vsphere",
		label: "vSphere",
		detail: "ESXi / vCenter",
		terms: [
			"ESXi",
			"vSphere",
			"vCenter"
		]
	},
	{
		id: "horizon",
		label: "Horizon",
		detail: "Omnissa",
		terms: [
			"Omnissa",
			"VMware Horizon",
			"Horizon Client",
			"Horizon Agent"
		]
	},
	{
		id: "redhat",
		label: "Red Hat",
		detail: "RHEL",
		terms: [
			"Red Hat",
			"RHEL",
			"Enterprise Linux"
		]
	},
	{
		id: "panos",
		label: "PAN-OS",
		detail: "Palo Alto",
		terms: [
			"PAN-OS",
			"Palo Alto",
			"GlobalProtect"
		]
	},
	{
		id: "cisco",
		label: "Cisco",
		detail: "IOS / ASA",
		terms: [
			"Cisco",
			"IOS XE",
			"ASA",
			"Firepower",
			"NX-OS"
		]
	}
];
var DEFAULT_WATCH = STACK_PRODUCTS.flatMap((product) => [...product.terms]);
var usePrefs = create()(persist((set) => ({
	disabled: [],
	custom: [],
	nvdKey: "",
	relayBase: "/api/relay",
	watch: [],
	pins: [],
	stackSeeded: false,
	refreshMin: 15,
	boardLayout: null,
	setDisabled: (id, off) => set((state) => ({ disabled: off ? Array.from(/* @__PURE__ */ new Set([...state.disabled, id])) : state.disabled.filter((item) => item !== id) })),
	addCustom: (input) => {
		const id = `c_${Math.random().toString(36).slice(2, 10)}`;
		set((state) => ({ custom: [...state.custom, {
			id,
			name: input.name.trim(),
			format: input.format,
			url: input.url.trim(),
			enabled: true
		}] }));
		return id;
	},
	removeCustom: (id) => set((state) => ({ custom: state.custom.filter((item) => item.id !== id) })),
	setNvdKey: (nvdKey) => set({ nvdKey }),
	setRelayBase: (relayBase) => set({ relayBase }),
	addWatch: (term) => set((state) => {
		const clean = term.trim();
		if (!clean) return state;
		if (state.watch.some((item) => item.toLowerCase() === clean.toLowerCase())) return state;
		return { watch: [...state.watch, clean] };
	}),
	removeWatch: (term) => set((state) => ({ watch: state.watch.filter((item) => item !== term) })),
	togglePin: (id) => set((state) => ({ pins: state.pins.includes(id) ? state.pins.filter((item) => item !== id) : [id, ...state.pins] })),
	setRefreshMin: (refreshMin) => set({ refreshMin }),
	setBoardLayout: (boardLayout) => set({ boardLayout }),
	importPrefs: (data) => set((state) => ({
		disabled: Array.isArray(data.disabled) ? data.disabled.filter((item) => typeof item === "string") : state.disabled,
		custom: Array.isArray(data.custom) ? data.custom.filter(isCustom) : state.custom,
		nvdKey: typeof data.nvdKey === "string" ? data.nvdKey : state.nvdKey,
		relayBase: typeof data.relayBase === "string" && data.relayBase.trim() ? data.relayBase : state.relayBase,
		watch: Array.isArray(data.watch) ? data.watch.filter((item) => typeof item === "string") : state.watch,
		pins: Array.isArray(data.pins) ? data.pins.filter((item) => typeof item === "string") : state.pins,
		refreshMin: asRefresh(data.refreshMin, state.refreshMin),
		boardLayout: data.boardLayout === null ? null : isLayout(data.boardLayout) ? data.boardLayout : state.boardLayout
	}))
}), {
	name: "lantern-prefs-v1",
	skipHydration: true
}));
function isCustom(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return typeof record.id === "string" && typeof record.name === "string" && (record.format === "json" || record.format === "rss" || record.format === "csv") && typeof record.url === "string" && typeof record.enabled === "boolean";
}
function isNumMap(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return false;
	return Object.values(value).every((item) => typeof item === "number" && Number.isFinite(item));
}
function isLayout(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return isNumMap(record.columns) && isNumMap(record.rows);
}
function asRefresh(value, fallback) {
	return value === 0 || value === 5 || value === 15 || value === 30 ? value : fallback;
}
function enabledSet(disabled, custom) {
	const set = /* @__PURE__ */ new Set();
	for (const feed of BUILTINS) if (!disabled.includes(feed.id)) set.add(feed.id);
	for (const connector of custom) if (connector.enabled && !disabled.includes(connector.id)) set.add(connector.id);
	return set;
}
var CACHE_KEY = "lantern-intel-v1";
var IntelContext = (0, import_react.createContext)(null);
function initialBundle() {
	return {
		vulns: SNAPSHOT.vulns,
		advisories: SNAPSHOT.advisories,
		kevCatalog: SNAPSHOT.kevCatalog,
		kevCount: SNAPSHOT.kevCount,
		refreshedAt: SNAPSHOT.generatedAt
	};
}
function statusesFor(bundle) {
	return BUILTINS.map((feed) => {
		const vulnCount = bundle.vulns.filter((vuln) => vuln.sources.includes(feed.id)).length;
		const noteCount = bundle.advisories.filter((item) => item.source === feed.id).length;
		const epssCount = feed.id === "epss" ? bundle.vulns.filter((vuln) => vuln.epss != null).length : 0;
		const count = feed.id === "epss" ? epssCount : vulnCount + noteCount;
		return {
			id: feed.id,
			state: count > 0 ? "seed" : "idle",
			message: count > 0 ? "Published copy" : "Waiting for the first sync",
			fetchedAt: count > 0 ? bundle.refreshedAt : null,
			count
		};
	});
}
async function settle(id, task) {
	try {
		return {
			id,
			ok: true,
			result: await task()
		};
	} catch (error) {
		return {
			id,
			ok: false,
			error: error instanceof Error ? error.message : "Failed"
		};
	}
}
function readPictures(value) {
	if (!Array.isArray(value)) return [];
	const out = [];
	for (const item of value) {
		if (!item || typeof item !== "object") continue;
		const row = item;
		if (typeof row.id !== "string" || !Array.isArray(row.points)) continue;
		const points = row.points.filter((point) => point && typeof point.country === "string" && typeof point.sources === "number" && typeof point.reports === "number");
		if (!points.length) continue;
		out.push({
			id: row.id,
			points,
			fetchedAt: typeof row.fetchedAt === "string" ? row.fetchedAt : ""
		});
	}
	return out;
}
function IntelProvider({ children }) {
	const [bundle, setBundle] = (0, import_react.useState)(initialBundle);
	const [statuses, setStatuses] = (0, import_react.useState)(() => statusesFor(initialBundle()));
	const [picture, setPicture] = (0, import_react.useState)(null);
	const [pictures, setPictures] = (0, import_react.useState)([]);
	const [syncing, setSyncing] = (0, import_react.useState)(false);
	const [ready, setReady] = (0, import_react.useState)(false);
	const bundleRef = (0, import_react.useRef)(bundle);
	const pictureRef = (0, import_react.useRef)(picture);
	const picturesRef = (0, import_react.useRef)(pictures);
	const inflight = (0, import_react.useRef)(false);
	bundleRef.current = bundle;
	pictureRef.current = picture;
	picturesRef.current = pictures;
	const disabled = usePrefs((state) => state.disabled);
	const custom = usePrefs((state) => state.custom);
	const refreshMin = usePrefs((state) => state.refreshMin);
	const enabled = (0, import_react.useMemo)(() => enabledSet(disabled, custom), [disabled, custom]);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			if (raw) {
				const cached = JSON.parse(raw);
				if (cached.generatedAt && cached.generatedAt > SNAPSHOT.generatedAt && Array.isArray(cached.vulns)) {
					const next = {
						vulns: cached.vulns,
						advisories: Array.isArray(cached.advisories) ? cached.advisories : [],
						kevCatalog: cached.kevCatalog ?? null,
						kevCount: cached.kevCount ?? null,
						refreshedAt: cached.generatedAt
					};
					bundleRef.current = next;
					setBundle(next);
					setStatuses(statusesFor(next));
				}
				const stored = readPictures(cached.pictures);
				if (stored.length) {
					picturesRef.current = stored;
					setPictures(stored);
					setPicture(stored.find((item) => item.id === "sans-map") ?? stored[0] ?? null);
				}
			}
		} catch {}
		Promise.resolve(usePrefs.persist.rehydrate()).then(() => setReady(true));
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		const prefs = usePrefs.getState();
		if (prefs.stackSeeded) {
			const hasWindows = prefs.watch.some((term) => term.toLowerCase() === "windows 11");
			const hasPan = prefs.watch.some((term) => term.toLowerCase() === "pan-os");
			if (hasWindows && !hasPan) {
				const extra = STACK_PRODUCTS.filter((product) => product.id === "redhat" || product.id === "panos" || product.id === "cisco").flatMap((product) => [...product.terms]);
				for (const term of extra) prefs.addWatch(term);
			}
			return;
		}
		for (const term of DEFAULT_WATCH) prefs.addWatch(term);
		usePrefs.setState({ stackSeeded: true });
	}, [ready]);
	const refresh = (0, import_react.useCallback)(() => {
		if (inflight.current) return;
		inflight.current = true;
		setSyncing(true);
		(async () => {
			const prefs = usePrefs.getState();
			const on = enabledSet(prefs.disabled, prefs.custom);
			const writeStatus = (status) => {
				setStatuses((current) => {
					const map = new Map(current.map((item) => [item.id, item]));
					map.set(status.id, status);
					return Array.from(map.values());
				});
			};
			const take = (id, result) => {
				const current = bundleRef.current;
				const next = {
					vulns: result.vulns.length ? mergeAll([...current.vulns, ...result.vulns]) : current.vulns,
					advisories: result.advisories.length ? replaceAdvisories(current.advisories, id, result.advisories) : current.advisories,
					kevCatalog: result.meta?.kevCatalog ?? current.kevCatalog,
					kevCount: result.meta?.kevCount ?? current.kevCount,
					refreshedAt: (/* @__PURE__ */ new Date()).toISOString().replace(/\.\d{3}Z$/, "Z")
				};
				bundleRef.current = next;
				setBundle(next);
				if (result.sightings?.length) {
					const incoming = {
						id,
						points: result.sightings,
						fetchedAt: next.refreshedAt ?? ""
					};
					const map = new Map(picturesRef.current.map((item) => [item.id, item]));
					map.set(incoming.id, incoming);
					const list = Array.from(map.values());
					picturesRef.current = list;
					setPictures(list);
					const kept = list.find((item) => item.id === "sans-map") ?? list[0] ?? incoming;
					pictureRef.current = kept;
					setPicture(kept);
				}
				const count = result.vulns.length + result.advisories.length + (result.sightings?.length ?? 0);
				writeStatus({
					id,
					state: "live",
					message: count ? `Live · ${count} records` : "Live · nothing new",
					fetchedAt: next.refreshedAt,
					count
				});
			};
			const jobs = [...BUILTINS.filter((feed) => feed.kind !== "epss" && on.has(feed.id)).map((feed) => settle(feed.id, () => loadBuiltin(feed, prefs.relayBase, prefs.nvdKey)).then((item) => {
				if (item.ok) take(item.id, item.result);
				else writeStatus({
					id: item.id,
					state: "error",
					message: `Last copy kept · ${item.error}`,
					fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
					count: 0
				});
				return item;
			})), ...prefs.custom.filter((connector) => on.has(connector.id)).map((connector) => settle(connector.id, () => loadCustom(connector)).then((item) => {
				if (item.ok) take(item.id, item.result);
				else writeStatus({
					id: item.id,
					state: "error",
					message: `Last copy kept · ${item.error}`,
					fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
					count: 0
				});
				return item;
			}))];
			await Promise.all(jobs);
			if (on.has("epss")) try {
				const scores = await loadEpss(priorityIds(bundleRef.current.vulns, 80));
				const vulns = applyEpss(bundleRef.current.vulns, scores);
				const next = {
					...bundleRef.current,
					vulns
				};
				bundleRef.current = next;
				setBundle(next);
				writeStatus({
					id: "epss",
					state: "live",
					message: `Live · ${scores.size} scores`,
					fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
					count: scores.size
				});
			} catch (error) {
				writeStatus({
					id: "epss",
					state: "error",
					message: `Last scores kept · ${error instanceof Error ? error.message : "EPSS failed"}`,
					fetchedAt: (/* @__PURE__ */ new Date()).toISOString(),
					count: 0
				});
			}
			try {
				const cached = {
					...bundleRef.current,
					generatedAt: bundleRef.current.refreshedAt ?? (/* @__PURE__ */ new Date()).toISOString(),
					pictures: picturesRef.current
				};
				localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
			} catch {}
		})().finally(() => {
			inflight.current = false;
			setSyncing(false);
		});
	}, []);
	(0, import_react.useEffect)(() => {
		if (!ready) return;
		refresh();
		const onVis = () => {
			if (document.hidden) return;
			const every = usePrefs.getState().refreshMin;
			if (!every) return;
			const at = bundleRef.current.refreshedAt;
			if (!at || Date.now() - Date.parse(at) > every * 60 * 1e3) refresh();
		};
		document.addEventListener("visibilitychange", onVis);
		if (!refreshMin) return () => document.removeEventListener("visibilitychange", onVis);
		const timer = window.setInterval(() => {
			if (!document.hidden) refresh();
		}, refreshMin * 60 * 1e3);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, [
		ready,
		refresh,
		refreshMin
	]);
	const enrich = (0, import_react.useCallback)(async (id) => {
		const pieces = await enrichVuln(id.toUpperCase(), usePrefs.getState().nvdKey);
		setBundle((current) => {
			const next = {
				...current,
				vulns: mergeAll([...current.vulns, ...pieces])
			};
			bundleRef.current = next;
			return next;
		});
	}, []);
	const forget = (0, import_react.useCallback)((source) => {
		setBundle((current) => {
			const stripped = forgetSource(current.vulns, current.advisories, source);
			const next = {
				...current,
				...stripped
			};
			bundleRef.current = next;
			return next;
		});
		setStatuses((current) => current.filter((status) => status.id !== source));
		setPicture((current) => current?.id === source ? null : current);
		setPictures((current) => {
			const next = current.filter((item) => item.id !== source);
			picturesRef.current = next;
			return next;
		});
	}, []);
	const visiblePicture = picture && enabled.has(picture.id) ? picture : null;
	const visiblePictures = pictures.filter((item) => enabled.has(item.id));
	const value = (0, import_react.useMemo)(() => ({
		vulns: maskVulns(bundle.vulns, enabled),
		advisories: bundle.advisories.filter((item) => enabled.has(item.source)),
		statuses,
		syncing,
		refreshedAt: bundle.refreshedAt,
		kevCatalog: bundle.kevCatalog,
		kevCount: bundle.kevCount,
		picture: visiblePicture ?? visiblePictures.find((item) => item.id === "sans-map") ?? visiblePictures[0] ?? null,
		pictures: visiblePictures,
		refresh,
		enrich,
		forget
	}), [
		bundle,
		enabled,
		statuses,
		syncing,
		visiblePicture,
		visiblePictures,
		refresh,
		enrich,
		forget
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntelContext.Provider, {
		value,
		children
	});
}
function useIntel() {
	const value = (0, import_react.useContext)(IntelContext);
	if (!value) throw new Error("Intel is only available inside the floor");
	return value;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CgiERoNf.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function NotFound() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-widest text-muted",
				children: "Missing"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl",
				children: "No such board"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-lg text-muted",
				children: "That path is not on the floor."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "mt-6 inline-flex min-h-11 items-center text-flame",
				children: "Return to the floor"
			})
		]
	});
}
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 bg-bg px-6 text-center text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-flame",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted",
				children: errorMessage(error)
			})
		]
	});
}
/**
* Path-based preview hosts serve the dev server under `/{port_id}/` and strip
* that prefix before forwarding, so SSR sees `/` while the browser URL keeps the
* prefix. TanStack Start resets `basepath` on hydration, so a `rewrite` keeps
* client routing and generated links aligned with the public URL.
*/
var PATH_BASED_PREVIEW_HOSTS = /* @__PURE__ */ new Set([
	"preview.grok.genai.mil",
	"preview.grok.mil",
	"preview.grokgsac.com"
]);
var PORT_ID_PREFIX = /^\/hds-[a-z0-9]+-\d+-[a-z0-9]+(?=\/|$)/i;
function previewPathPrefix(hostname, pathname) {
	if (!PATH_BASED_PREVIEW_HOSTS.has(hostname.toLowerCase())) return void 0;
	return PORT_ID_PREFIX.exec(pathname)?.[0];
}
function prefixRewrite(prefix) {
	return {
		input: ({ url }) => {
			if (url.pathname === prefix) url.pathname = "/";
			else if (url.pathname.startsWith(`${prefix}/`)) url.pathname = url.pathname.slice(prefix.length);
			return url;
		},
		output: ({ url }) => {
			url.pathname = `${prefix}${url.pathname}`;
			return url;
		}
	};
}
function previewPathRewrite() {
	if (typeof window === "undefined") return void 0;
	const prefix = previewPathPrefix(window.location.hostname, window.location.pathname);
	return prefix ? prefixRewrite(prefix) : void 0;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var NAV = [
	{
		to: "/",
		label: "Floor",
		exact: true
	},
	{
		to: "/vulns",
		label: "Vulnerabilities",
		exact: false
	},
	{
		to: "/advisories",
		label: "Advisories",
		exact: false
	},
	{
		to: "/watch",
		label: "Watch",
		exact: false
	},
	{
		to: "/connectors",
		label: "Connectors",
		exact: false
	}
];
function Shell({ children }) {
	const navigate = useNavigate();
	const { syncing } = useIntel();
	const searchRef = (0, import_react.useRef)(null);
	const [clock, setClock] = (0, import_react.useState)("UTC");
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const now = /* @__PURE__ */ new Date();
			const hours = String(now.getUTCHours()).padStart(2, "0");
			const minutes = String(now.getUTCMinutes()).padStart(2, "0");
			const seconds = String(now.getUTCSeconds()).padStart(2, "0");
			setClock(`${hours}:${minutes}:${seconds}Z`);
		};
		tick();
		const timer = window.setInterval(tick, 1e3);
		return () => window.clearInterval(timer);
	}, []);
	(0, import_react.useEffect)(() => {
		const onKey = (event) => {
			const target = event.target;
			if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;
			if (event.key === "/") {
				event.preventDefault();
				searchRef.current?.focus();
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);
	function onSearch(event) {
		event.preventDefault();
		const q = new FormData(event.currentTarget).get("q");
		navigate({
			to: "/vulns",
			search: {
				q: typeof q === "string" ? q : "",
				sev: "all",
				sort: "published",
				scope: "active",
				kev: false,
				ransom: false,
				watch: false,
				fix: "any"
			}
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "#content",
				className: "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:bg-surface focus:px-3 focus:py-2",
				children: "Skip to content"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "col-start-1 flex min-h-11 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block font-display text-2xl font-semibold leading-none tracking-tight",
									children: "Lantern"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block font-mono text-xs uppercase tracking-widest text-muted",
									children: "Ops floor"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "col-start-2 justify-self-end font-mono text-xs tabular-nums text-muted sm:col-start-3",
								"aria-label": "Zulu time",
								children: [clock, syncing ? " · SYNC" : ""]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "col-span-2 sm:col-span-1 sm:col-start-2",
								onSubmit: onSearch,
								role: "search",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "sr-only",
									htmlFor: "floor-search",
									children: "Search vulnerabilities"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									suppressHydrationWarning: true,
									id: "floor-search",
									ref: searchRef,
									name: "q",
									placeholder: "Search a CVE, vendor, or product",
									className: "h-11 w-full border border-line bg-surface px-3 text-sm text-fg placeholder:text-muted"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-1 overflow-x-auto px-2 lg:px-6",
						"aria-label": "Sections",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							activeOptions: { exact: item.exact },
							className: "shrink-0 border-b-2 border-transparent px-3 py-3 text-sm text-muted",
							activeProps: { className: "shrink-0 border-b-2 border-flame px-3 py-3 text-sm text-fg" },
							children: item.label
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "border-t border-line px-4 py-1 font-mono text-xs uppercase tracking-widest text-muted lg:px-8",
						children: "Lantern · open-source intelligence · no clearance required"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				id: "content",
				className: "px-4 py-4 lg:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-screen-2xl",
					children
				})
			})
		]
	});
}
function Mark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: "size-8",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				fill: "var(--color-surface)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6",
				y: "14",
				width: "20",
				height: "2",
				fill: "var(--color-fg)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "14",
				y: "6",
				width: "4",
				height: "20",
				fill: "var(--color-flame)"
			})
		]
	});
}
function PageIntro({ eyebrow, title, lede, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: eyebrow
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-2 font-display text-4xl sm:text-5xl",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-muted",
					children: lede
				})
			]
		}), action]
	});
}
function fieldClass(extra) {
	return cn("h-11 border border-line bg-bg px-3 text-sm text-fg placeholder:text-muted", extra);
}
var styles_default = "/assets/styles-y4VPxYGZ.css";
var Route$7 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Lantern" },
			{
				name: "description",
				content: "Lantern is an open ops floor for CISA’s known-exploited catalog and vendor advisories, including Red Hat, PAN-OS, and Cisco."
			},
			{
				name: "theme-color",
				content: "#0e100d"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&display=swap"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntelProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$5 = () => import("./routes-BULZ0D2N.mjs");
var Route$6 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Ops floor · Lantern" }] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./advisories-CEXqtXoR.mjs");
var Route$5 = createFileRoute("/advisories")({
	head: () => ({ meta: [{ title: "Advisories · Lantern" }] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./connectors-C_8GfJtt.mjs");
var Route$4 = createFileRoute("/connectors")({
	head: () => ({ meta: [{ title: "Connectors · Lantern" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./vulns-D4vNJ7pN.mjs");
var Route$3 = createFileRoute("/vulns")({
	head: () => ({ meta: [{ title: "Vulnerabilities · Lantern" }] }),
	validateSearch: (search) => ({
		q: typeof search.q === "string" ? search.q : "",
		sev: typeof search.sev === "string" && search.sev ? search.sev : "all",
		sort: isSort(search.sort) ? search.sort : "published",
		scope: search.scope === "all" ? "all" : "active",
		kev: flag(search.kev),
		ransom: flag(search.ransom),
		watch: flag(search.watch),
		fix: search.fix === "yes" || search.fix === "no" ? search.fix : "any"
	}),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
function isSort(value) {
	return value === "published" || value === "cvss" || value === "epss" || value === "due" || value === "modified";
}
function flag(value) {
	return value === true || value === "1" || value === "true";
}
var $$splitComponentImporter$1 = () => import("./watch-DBNLcC2q.mjs");
var Route$2 = createFileRoute("/watch")({
	head: () => ({ meta: [{ title: "Watch · Lantern" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var FEEDS = {
	kev: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
	paloalto: "https://security.paloaltonetworks.com/rss.xml",
	unit42: "https://unit42.paloaltonetworks.com/feed/",
	"cisa-advisory": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
	nsa: "https://www.nsa.gov/cybersecurity-guidance/",
	msrc: "https://api.msrc.microsoft.com/update-guide/rss",
	certcc: "https://www.kb.cert.org/vuls/atomfeed/",
	ncsc: "https://www.ncsc.gov.uk/api/1/services/v1/report-rss-feed.xml",
	acsc: "https://www.cyber.gov.au/rss/alerts",
	certfr: "https://www.cert.ssi.gouv.fr/alerte/feed/",
	bsi: "https://wid.cert-bund.de/content/public/securityAdvisory/rss",
	jpcert: "https://www.jpcert.or.jp/english/rss/jpcert-en.rdf",
	dfir: "https://thedfirreport.com/feed/",
	talos: "https://blog.talosintelligence.com/rss/",
	"sans-diary": "https://isc.sans.edu/rssfeed_full.xml",
	projectzero: "https://googleprojectzero.blogspot.com/feeds/posts/default?alt=rss",
	ransomware: "https://api.ransomware.live/v2/recentvictims",
	feodo: "https://feodotracker.abuse.ch/downloads/ipblocklist.json",
	fortinet: "https://www.fortiguard.com/rss/ir.xml",
	redhat: "https://access.redhat.com/hydra/rest/securitydata/cve.json?per_page=40"
};
var NVD_QUERIES = {
	nvd: [],
	"nvd-win11": ["virtualMatchString=cpe:2.3:o:microsoft:windows_11"],
	"nvd-macos": ["virtualMatchString=cpe:2.3:o:apple:macos", "virtualMatchString=cpe:2.3:o:apple:mac_os_x"],
	"nvd-esxi": ["virtualMatchString=cpe:2.3:o:vmware:esxi"],
	"nvd-vcenter": ["virtualMatchString=cpe:2.3:a:vmware:vcenter_server"],
	"nvd-horizon": ["virtualMatchString=cpe:2.3:a:vmware:horizon", "keywordSearch=VMware%20Horizon"],
	"nvd-omnissa": ["keywordSearch=Omnissa"],
	"nvd-rhel": ["virtualMatchString=cpe:2.3:o:redhat:enterprise_linux"],
	"nvd-panos": ["virtualMatchString=cpe:2.3:o:paloaltonetworks:pan-os"],
	"nvd-cisco": ["keywordSearch=Cisco"]
};
function nvdStamp(date) {
	return date.toISOString().slice(0, 19) + ".000";
}
function recentNvdQuery() {
	const end = /* @__PURE__ */ new Date();
	return `pubStartDate=${nvdStamp(/* @__PURE__ */ new Date(end.getTime() - 5184e5))}&pubEndDate=${nvdStamp(end)}`;
}
async function nvdLatest(query) {
	const base = `https://services.nvd.nist.gov/rest/json/cves/2.0?${query}&resultsPerPage=20`;
	const first = await fetch(base, {
		headers: { accept: "application/json" },
		signal: AbortSignal.timeout(2e4)
	});
	const body = await first.text();
	if (!first.ok) throw new Error(`Upstream HTTP ${first.status}`);
	const total = JSON.parse(body).totalResults ?? 0;
	if (total <= 20) return body;
	await new Promise((resolve) => setTimeout(resolve, 6e3));
	const second = await fetch(`${base}&startIndex=${Math.max(0, total - 20)}`, {
		headers: { accept: "application/json" },
		signal: AbortSignal.timeout(2e4)
	});
	const page = await second.text();
	if (!second.ok) throw new Error(`Upstream HTTP ${second.status}`);
	return page;
}
var Route$1 = createFileRoute("/api/relay")({ server: { handlers: { GET: async ({ request }) => {
	const feed = new URL(request.url).searchParams.get("feed") ?? "";
	const nvdQueries = NVD_QUERIES[feed];
	if (nvdQueries) try {
		const queries = nvdQueries.length ? nvdQueries : [recentNvdQuery()];
		let body = await nvdLatest(queries[0]);
		if ((JSON.parse(body).totalResults ?? 0) === 0 && queries[1]) body = await nvdLatest(queries[1]);
		return new Response(body, {
			status: 200,
			headers: {
				"content-type": "application/json; charset=utf-8",
				"cache-control": "public, max-age=300"
			}
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "NVD failed";
		return new Response(message, {
			status: 200,
			headers: {
				"content-type": "text/plain; charset=utf-8",
				"x-lantern-error": "1",
				"cache-control": "no-store"
			}
		});
	}
	const target = FEEDS[feed];
	if (!target) return new Response("Unknown feed", { status: 400 });
	try {
		const upstream = await fetch(target, {
			headers: {
				accept: "*/*",
				"user-agent": "Mozilla/5.0 (compatible; LanternThreatFloor/1.0; +https://github.com/cyber-recon)"
			},
			signal: AbortSignal.timeout(18e3)
		});
		const body = (await upstream.text()).slice(0, 15e5);
		if (!upstream.ok) return new Response(`Upstream HTTP ${upstream.status}`, {
			status: 200,
			headers: {
				"content-type": "text/plain; charset=utf-8",
				"x-lantern-error": "1",
				"cache-control": "no-store"
			}
		});
		return new Response(body, {
			status: 200,
			headers: {
				"content-type": upstream.headers.get("content-type") || "text/plain; charset=utf-8",
				"cache-control": "public, max-age=300"
			}
		});
	} catch (error) {
		const message = error instanceof Error ? error.message : "Relay failed";
		return new Response(message, {
			status: 200,
			headers: {
				"content-type": "text/plain; charset=utf-8",
				"x-lantern-error": "1",
				"cache-control": "no-store"
			}
		});
	}
} } } });
var $$splitComponentImporter = () => import("./cve._id-HtS446gO.mjs");
var Route = createFileRoute("/cve/$id")({
	head: ({ params }) => ({ meta: [{ title: `${params.id.toUpperCase()} · Lantern` }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$6.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$7
	}),
	AdvisoriesRoute: Route$5.update({
		id: "/advisories",
		path: "/advisories",
		getParentRoute: () => Route$7
	}),
	ConnectorsRoute: Route$4.update({
		id: "/connectors",
		path: "/connectors",
		getParentRoute: () => Route$7
	}),
	VulnsRoute: Route$3.update({
		id: "/vulns",
		path: "/vulns",
		getParentRoute: () => Route$7
	}),
	WatchRoute: Route$2.update({
		id: "/watch",
		path: "/watch",
		getParentRoute: () => Route$7
	}),
	ApiRelayRoute: Route$1.update({
		id: "/api/relay",
		path: "/api/relay",
		getParentRoute: () => Route$7
	}),
	CveIdRoute: Route.update({
		id: "/cve/$id",
		path: "/cve/$id",
		getParentRoute: () => Route$7
	})
};
var routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		rewrite: previewPathRewrite(),
		defaultErrorComponent: AppErrorComponent,
		defaultNotFoundComponent: NotFound
	});
}
//#endregion
export { usePrefs as C, useIntel as S, wireScore as T, patchOf as _, fieldClass as a, sortVulns as b, SEVERITIES as c, dueState as d, filterVulns as f, matchesWatch as g, groupDigits as h, PageIntro as i, STACK_PRODUCTS as l, formatEpss as m, Route as n, BUILTINS as o, formatCvss as p, Route$3 as r, FEED_GROUPS as s, router_exports as t, cn as u, priorityScore as v, utcDay as w, sourceLabel as x, shortDate as y };
