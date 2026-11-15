import type { BuiltinFeed } from "./catalog";
import { utcDay } from "./format";
import {
  parseClaims,
  parseCsv,
  parseFeodo,
  parseGhsa,
  parseKev,
  parseLooseJson,
  parseNsaHtml,
  parseNvd,
  parseRedHatDetail,
  parseRedHatList,
  parseRss,
  parseSansCountries,
  parseWire,
  shellsFromAdvisories,
} from "./parse";
import { emptyVuln, type LoadResult, type Vuln } from "./types";

async function fetchText(url: string, headers?: Record<string, string>): Promise<string> {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(22000),
    headers: {
      Accept: "application/json, application/rss+xml, application/atom+xml, application/xml, text/xml, text/html, */*",
      ...(headers ?? {}),
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  if (response.headers.get("x-lantern-error")) throw new Error(await response.text());
  return response.text();
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let nvdTail: Promise<void> = Promise.resolve();
let nvdNext = 0;

function nvdSlot<T>(hasKey: boolean, task: () => Promise<T>): Promise<T> {
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
  nvdTail = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function fetchNvd(url: string, apiKey: string): Promise<string> {
  const headers: Record<string, string> = apiKey ? { apiKey } : {};
  return nvdSlot(Boolean(apiKey), async () => {
    try {
      return await fetchText(url, headers);
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (!/HTTP (403|429|503)/.test(message)) throw error;
      await sleep(apiKey ? 2000 : 8000);
      return fetchText(url, headers);
    }
  });
}

export function relayUrl(base: string, feed: string): string {
  const trimmed = base.trim() || "/api/relay";
  if (trimmed.startsWith("/")) {
    const join = trimmed.includes("?") ? "&" : "?";
    return `${trimmed}${join}feed=${encodeURIComponent(feed)}`;
  }
  const url = new URL(trimmed);
  url.searchParams.set("feed", feed);
  return url.toString();
}

async function readSource(feed: Pick<BuiltinFeed, "direct" | "mirrors" | "relay">, relayBase: string): Promise<string> {
  const urls = [feed.direct, ...(feed.mirrors ?? [])].filter((item): item is string => Boolean(item));
  const errors: string[] = [];
  for (const url of urls) {
    try {
      return await fetchText(url);
    } catch (error) {
      errors.push(error instanceof Error ? error.message : "unreachable");
    }
  }
  if (feed.relay) {
    try {
      return await fetchText(relayUrl(relayBase, feed.relay));
    } catch (error) {
      const relayError = error instanceof Error ? error.message : "relay failed";
      errors.push(errors.length ? `host ${relayError}` : relayError);
    }
  }
  throw new Error(errors.join("; ") || "This feed has no address");
}

function nvdStamp(date: Date): string {
  return date.toISOString().slice(0, 19) + ".000";
}

async function readNvdPage(apiKey: string, query: string): Promise<Vuln[]> {
  const base = `https://services.nvd.nist.gov/rest/json/cves/2.0?${query}&resultsPerPage=20`;
  const firstText = await fetchNvd(base, apiKey);
  const first = JSON.parse(firstText) as { totalResults?: number };
  const total = first.totalResults ?? 0;
  if (total <= 0) return [];
  const payload = total > 20 ? JSON.parse(await fetchNvd(`${base}&startIndex=${Math.max(0, total - 20)}`, apiKey)) : JSON.parse(firstText);
  return parseNvd(payload);
}

async function loadNvd(apiKey: string, relayBase: string): Promise<LoadResult> {
  const end = new Date();
  const start = new Date(end.getTime() - 6 * 24 * 60 * 60 * 1000);
  const query = `pubStartDate=${nvdStamp(start)}&pubEndDate=${nvdStamp(end)}`;
  return loadNvdFeed(apiKey, relayBase, "nvd", query);
}

async function loadNvdQuery(apiKey: string, relayBase: string, id: string, query: string, fallback?: string): Promise<LoadResult> {
  if (!apiKey) {
    try {
      const text = await nvdSlot(false, () => fetchText(relayUrl(relayBase, id)));
      return { vulns: parseNvd(JSON.parse(text) as unknown), advisories: [] };
    } catch {
      /* Public rate limit, straight from the browser. */
    }
  }
  let vulns = await readNvdPage(apiKey, query);
  if (!vulns.length && fallback) vulns = await readNvdPage(apiKey, fallback);
  return { vulns, advisories: [] };
}

async function loadNvdFeed(apiKey: string, relayBase: string, id: string, query: string): Promise<LoadResult> {
  return loadNvdQuery(apiKey, relayBase, id, query);
}

export async function loadEpss(ids: string[]): Promise<Map<string, { epss: number; percentile: number }>> {
  const scores = new Map<string, { epss: number; percentile: number }>();
  for (let index = 0; index < ids.length; index += 40) {
    const chunk = ids.slice(index, index + 40);
    if (!chunk.length) continue;
    const payload = JSON.parse(await fetchText(`https://api.first.org/data/v1/epss?cve=${chunk.join(",")}`)) as {
      data?: Array<{ cve?: string; epss?: string; percentile?: string }>;
    };
    for (const row of payload.data ?? []) {
      if (!row.cve) continue;
      const epss = Number(row.epss);
      const percentile = Number(row.percentile);
      if (Number.isNaN(epss)) continue;
      scores.set(row.cve.toUpperCase(), { epss, percentile: Number.isNaN(percentile) ? 0 : percentile });
    }
  }
  return scores;
}

export function applyEpss(vulns: Vuln[], scores: Map<string, { epss: number; percentile: number }>): Vuln[] {
  if (!scores.size) return vulns;
  return vulns.map((vuln) => {
    const score = scores.get(vuln.id);
    if (!score) return vuln;
    return { ...vuln, epss: score.epss, epssPercentile: score.percentile };
  });
}

export async function enrichVuln(id: string, apiKey: string): Promise<Vuln[]> {
  const headers: Record<string, string> = apiKey ? { apiKey } : {};
  const [nvd, redhat, epss] = await Promise.allSettled([
    fetchText(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${encodeURIComponent(id)}`, headers).then((text) =>
      parseNvd(JSON.parse(text) as unknown),
    ),
    fetchText(`https://access.redhat.com/hydra/rest/securitydata/cve/${encodeURIComponent(id)}.json`).then((text) => {
      const detail = parseRedHatDetail(JSON.parse(text) as unknown, id);
      return detail ? [detail] : [];
    }),
    loadEpss([id]),
  ]);
  const vulns: Vuln[] = [];
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
    const reason = [nvd, redhat, epss].find((item) => item.status === "rejected");
    throw new Error(reason && reason.status === "rejected" && reason.reason instanceof Error ? reason.reason.message : "No detail sources answered");
  }
  return vulns;
}

export async function loadBuiltin(feed: BuiltinFeed, relayBase: string, apiKey: string): Promise<LoadResult> {
  if (feed.kind === "epss") return { vulns: [], advisories: [] };
  if (feed.kind === "nvd") return loadNvd(apiKey, relayBase);
  if (feed.kind === "nvd-query") {
    if (!feed.query) throw new Error("Stack query is missing");
    return loadNvdQuery(apiKey, relayBase, feed.id, feed.query, feed.fallbackQuery);
  }
  const text = await readSource(feed, relayBase);
  if (feed.kind === "kev") {
    const parsed = parseKev(JSON.parse(text) as unknown);
    return { vulns: parsed.vulns, advisories: [], meta: { kevCatalog: parsed.catalog, kevCount: parsed.count } };
  }
  if (feed.kind === "redhat") return { vulns: parseRedHatList(JSON.parse(text) as unknown), advisories: [] };
  if (feed.kind === "nsa") {
    const advisories = parseNsaHtml(text);
    return { advisories, vulns: shellsFromAdvisories(advisories) };
  }
  if (feed.kind === "sighting") {
    const sightings = feed.id === "feodo" ? parseFeodo(JSON.parse(text) as unknown) : parseSansCountries(JSON.parse(text) as unknown);
    return { vulns: [], advisories: [], sightings };
  }
  if (feed.kind === "wire") {
    const advisories = parseWire(JSON.parse(text) as unknown, feed.id);
    return { advisories, vulns: shellsFromAdvisories(advisories) };
  }
  if (feed.kind === "claims") {
    return { advisories: parseClaims(JSON.parse(text) as unknown, feed.id), vulns: [] };
  }
  if (feed.kind === "ghsa") {
    return parseGhsa(JSON.parse(text) as unknown, feed.id);
  }
  const advisories = parseRss(text, feed.id);
  return { advisories, vulns: shellsFromAdvisories(advisories) };
}

export async function loadCustom(connector: { id: string; format: "json" | "rss" | "csv"; url: string }): Promise<LoadResult> {
  const url = new URL(connector.url);
  if (url.protocol !== "https:") throw new Error("Custom connectors must use https");
  const text = await fetchText(url.toString());
  if (connector.format === "rss") {
    const advisories = parseRss(text, connector.id);
    return { advisories, vulns: shellsFromAdvisories(advisories) };
  }
  if (connector.format === "csv") return { vulns: parseCsv(text, connector.id), advisories: [] };
  const parsed = parseLooseJson(JSON.parse(text) as unknown, connector.id);
  return { vulns: parsed.vulns, advisories: parsed.advisories };
}

export function windowLabel(): string {
  return `${utcDay(-6)} to ${utcDay()}`;
}
