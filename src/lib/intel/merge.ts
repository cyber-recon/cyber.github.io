import { mergePatch } from "./patch";
import type { Advisory, Severity, Vuln } from "./types";

const RANK: Record<Severity, number> = { UNKNOWN: 0, LOW: 1, MEDIUM: 2, HIGH: 3, CRITICAL: 4 };

function preferText(current: string, next: string, id: string): string {
  const clean = (value: string) => value.trim();
  const a = clean(current);
  const b = clean(next);
  if (!a || a === id) return b || a;
  if (!b || b === id) return a;
  return b.length > a.length ? b : a;
}

function mergeRefs(a: Vuln["references"], b: Vuln["references"]): Vuln["references"] {
  const out = [...a];
  for (const ref of b) {
    if (out.some((item) => item.href === ref.href)) continue;
    if (out.length >= 10) break;
    out.push(ref);
  }
  return out;
}

export function mergeVuln(a: Vuln, b: Vuln): Vuln {
  const sources = Array.from(new Set([...a.sources, ...b.sources]));
  const cvss = a.cvss == null ? b.cvss : b.cvss == null ? a.cvss : Math.max(a.cvss, b.cvss);
  const vector = (cvss === b.cvss ? b.vector : a.vector) || a.vector || b.vector;
  let severity: Severity = a.severity;
  if (b.cvss != null && (a.cvss == null || b.cvss > a.cvss) && b.severity !== "UNKNOWN") severity = b.severity;
  else if (a.severity === "UNKNOWN") severity = b.severity;
  else if (b.severity !== "UNKNOWN" && a.cvss == null && b.cvss == null && RANK[b.severity] > RANK[a.severity]) {
    severity = b.severity;
  }
  return {
    id: a.id,
    title: preferText(a.title, b.title, a.id),
    summary: preferText(a.summary, b.summary, a.id),
    severity,
    cvss,
    vector,
    published: a.published && b.published ? (a.published < b.published ? a.published : b.published) : a.published || b.published,
    modified: a.modified && b.modified ? (a.modified > b.modified ? a.modified : b.modified) : a.modified || b.modified,
    sources,
    vendor: a.vendor || b.vendor,
    product: a.product || b.product,
    cwe: a.cwe || b.cwe,
    kev: a.kev || b.kev,
    redhat: b.redhat
      ? { ...b.redhat, statement: b.redhat.statement || a.redhat?.statement || null, packages: b.redhat.packages.length ? b.redhat.packages : a.redhat?.packages || [] }
      : a.redhat,
    patch: mergePatch(a.patch, b.patch),
    epss: b.epss ?? a.epss,
    epssPercentile: b.epssPercentile ?? a.epssPercentile,
    references: mergeRefs(a.references, b.references),
  };
}

export function mergeAll(list: Vuln[]): Vuln[] {
  const map = new Map<string, Vuln>();
  for (const vuln of list) {
    const id = vuln.id.toUpperCase();
    const prev = map.get(id);
    map.set(id, prev ? mergeVuln(prev, { ...vuln, id }) : { ...vuln, id });
  }
  return Array.from(map.values());
}

export function replaceAdvisories(current: Advisory[], source: string, incoming: Advisory[]): Advisory[] {
  return [...current.filter((item) => item.source !== source), ...incoming];
}

export function maskVulns(vulns: Vuln[], enabled: Set<string>): Vuln[] {
  return vulns
    .map((vuln) => ({
      ...vuln,
      sources: vuln.sources.filter((source) => enabled.has(source)),
      kev: enabled.has("cisa-kev") ? vuln.kev : null,
      redhat: enabled.has("redhat") ? vuln.redhat : null,
    }))
    .filter((vuln) => vuln.sources.length > 0);
}

export function forgetSource(vulns: Vuln[], advisories: Advisory[], source: string): { vulns: Vuln[]; advisories: Advisory[] } {
  return {
    vulns: vulns
      .map((vuln) => ({ ...vuln, sources: vuln.sources.filter((item) => item !== source) }))
      .filter((vuln) => vuln.sources.length > 0),
    advisories: advisories.filter((item) => item.source !== source),
  };
}
