import { utcDay } from "./format";
import { patchOf } from "./patch";
import type { Advisory, Severity, Vuln } from "./types";

export type SortKey = "published" | "cvss" | "epss" | "due" | "modified";
export type Scope = "active" | "all";

export type VulnQuery = {
  q: string;
  sev: string;
  sort: SortKey;
  scope: Scope;
  kev: boolean;
  ransom: boolean;
  watch: boolean;
  fix: "any" | "yes" | "no";
};

export const SORTS: SortKey[] = ["published", "cvss", "epss", "due", "modified"];

export function matchesWatch(vuln: Vuln, terms: string[]): boolean {
  if (!terms.length) return false;
  const blob = `${vuln.id} ${vuln.title} ${vuln.summary} ${vuln.vendor ?? ""} ${vuln.product ?? ""}`.toLowerCase();
  return terms.some((term) => term && blob.includes(term.toLowerCase()));
}

function dateOrEmpty(value: string | null): string {
  return value || "";
}

export function filterVulns(vulns: Vuln[], query: VulnQuery, terms: string[], today = utcDay()): Vuln[] {
  const q = query.q.trim().toLowerCase();
  const sevs = query.sev === "all" ? null : new Set(query.sev.split(",").filter(Boolean));
  const recentPub = utcDay(-45);
  const recentKev = utcDay(-120);
  return vulns.filter((vuln) => {
    if (sevs && !sevs.has(vuln.severity as Severity)) return false;
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
    const blob = `${vuln.id} ${vuln.title} ${vuln.summary} ${vuln.vendor ?? ""} ${vuln.product ?? ""} ${vuln.cwe ?? ""}`.toLowerCase();
    return blob.includes(q);
  });
}

export function sortVulns(vulns: Vuln[], sort: SortKey): Vuln[] {
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

export function priorityScore(vuln: Vuln, today = utcDay()): number {
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

export function priorityIds(vulns: Vuln[], limit: number): string[] {
  return [...vulns]
    .sort((a, b) => priorityScore(b) - priorityScore(a))
    .slice(0, limit)
    .map((vuln) => vuln.id);
}

const WIRE_FLUFF = /password hygiene|bad password|survey|gift card|holiday scam|how to stay safe|what is a vpn|percent of americans|chose a bad password/i;

export function wireScore(note: Advisory, terms: string[]): number {
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
  if (["cisa-advisory", "msrc", "certcc", "ncsc", "acsc", "nsa", "paloalto", "cisco", "fortinet", "certfr", "bsi"].includes(note.source)) {
    score += 2;
  }
  if (fluff) score -= 3;
  return score;
}
