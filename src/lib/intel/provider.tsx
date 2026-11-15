import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { BUILTINS } from "./catalog";
import { applyEpss, enrichVuln, loadBuiltin, loadCustom, loadEpss } from "./feeds";
import { maskVulns, mergeAll, replaceAdvisories, forgetSource } from "./merge";
import { priorityIds } from "./select";
import { SNAPSHOT } from "./snapshot";
import { DEFAULT_WATCH, STACK_PRODUCTS } from "./stack";
import type { Advisory, FeedStatus, Sighting, Snapshot, Vuln } from "./types";
import { enabledSet, usePrefs, type CustomConnector } from "@/lib/prefs";

type Bundle = {
  vulns: Vuln[];
  advisories: Advisory[];
  kevCatalog: string | null;
  kevCount: number | null;
  refreshedAt: string | null;
};

export type Picture = {
  id: string;
  points: Sighting[];
  fetchedAt: string;
};

type IntelValue = {
  vulns: Vuln[];
  advisories: Advisory[];
  statuses: FeedStatus[];
  syncing: boolean;
  refreshedAt: string | null;
  kevCatalog: string | null;
  kevCount: number | null;
  picture: Picture | null;
  pictures: Picture[];
  refresh: () => void;
  enrich: (id: string) => Promise<void>;
  forget: (source: string) => void;
};

const CACHE_KEY = "lantern-intel-v1";
const IntelContext = createContext<IntelValue | null>(null);

function initialBundle(): Bundle {
  return {
    vulns: SNAPSHOT.vulns,
    advisories: SNAPSHOT.advisories,
    kevCatalog: SNAPSHOT.kevCatalog,
    kevCount: SNAPSHOT.kevCount,
    refreshedAt: SNAPSHOT.generatedAt,
  };
}

function statusesFor(bundle: Bundle): FeedStatus[] {
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
      count,
    };
  });
}

async function settle(id: string, task: () => Promise<import("./types").LoadResult>) {
  try {
    const result = await task();
    return { id, ok: true as const, result };
  } catch (error) {
    return { id, ok: false as const, error: error instanceof Error ? error.message : "Failed" };
  }
}

function readPictures(value: unknown): Picture[] {
  if (!Array.isArray(value)) return [];
  const out: Picture[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") continue;
    const row = item as Picture;
    if (typeof row.id !== "string" || !Array.isArray(row.points)) continue;
    const points = row.points.filter(
      (point) => point && typeof point.country === "string" && typeof point.sources === "number" && typeof point.reports === "number",
    );
    if (!points.length) continue;
    out.push({ id: row.id, points, fetchedAt: typeof row.fetchedAt === "string" ? row.fetchedAt : "" });
  }
  return out;
}

export function IntelProvider({ children }: { children: ReactNode }) {
  const [bundle, setBundle] = useState<Bundle>(initialBundle);
  const [statuses, setStatuses] = useState<FeedStatus[]>(() => statusesFor(initialBundle()));
  const [picture, setPicture] = useState<Picture | null>(null);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [ready, setReady] = useState(false);
  const bundleRef = useRef(bundle);
  const pictureRef = useRef(picture);
  const picturesRef = useRef(pictures);
  const inflight = useRef(false);
  bundleRef.current = bundle;
  pictureRef.current = picture;
  picturesRef.current = pictures;
  const disabled = usePrefs((state) => state.disabled);
  const custom = usePrefs((state) => state.custom);
  const refreshMin = usePrefs((state) => state.refreshMin);
  const enabled = useMemo(() => enabledSet(disabled, custom), [disabled, custom]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as Snapshot & { refreshedAt?: string };
        if (cached.generatedAt && cached.generatedAt > SNAPSHOT.generatedAt && Array.isArray(cached.vulns)) {
          const next: Bundle = {
            vulns: cached.vulns,
            advisories: Array.isArray(cached.advisories) ? cached.advisories : [],
            kevCatalog: cached.kevCatalog ?? null,
            kevCount: cached.kevCount ?? null,
            refreshedAt: cached.generatedAt,
          };
          bundleRef.current = next;
          setBundle(next);
          setStatuses(statusesFor(next));
        }
        const stored = readPictures((cached as { pictures?: unknown }).pictures);
        if (stored.length) {
          picturesRef.current = stored;
          setPictures(stored);
          setPicture(stored.find((item) => item.id === "sans-map") ?? stored[0] ?? null);
        }
      }
    } catch {
      /* Ignore a broken local copy. */
    }
    void Promise.resolve(usePrefs.persist.rehydrate()).then(() => setReady(true));
  }, []);

  useEffect(() => {
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

  const refresh = useCallback(() => {
    if (inflight.current) return;
    inflight.current = true;
    setSyncing(true);
    void (async () => {
      const prefs = usePrefs.getState();
      const on = enabledSet(prefs.disabled, prefs.custom);
      const writeStatus = (status: FeedStatus) => {
        setStatuses((current) => {
          const map = new Map(current.map((item) => [item.id, item]));
          map.set(status.id, status);
          return Array.from(map.values());
        });
      };
      const take = (id: string, result: import("./types").LoadResult) => {
        const current = bundleRef.current;
        const vulns = result.vulns.length ? mergeAll([...current.vulns, ...result.vulns]) : current.vulns;
        const advisories = result.advisories.length ? replaceAdvisories(current.advisories, id, result.advisories) : current.advisories;
        const next: Bundle = {
          vulns,
          advisories,
          kevCatalog: result.meta?.kevCatalog ?? current.kevCatalog,
          kevCount: result.meta?.kevCount ?? current.kevCount,
          refreshedAt: new Date().toISOString().replace(/\.\d{3}Z$/, "Z"),
        };
        bundleRef.current = next;
        setBundle(next);
        if (result.sightings?.length) {
          const incoming: Picture = { id, points: result.sightings, fetchedAt: next.refreshedAt ?? "" };
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
          count,
        });
      };
      const jobs = [
        ...BUILTINS.filter((feed) => feed.kind !== "epss" && on.has(feed.id)).map((feed) =>
          settle(feed.id, () => loadBuiltin(feed, prefs.relayBase, prefs.nvdKey)).then((item) => {
            if (item.ok) take(item.id, item.result);
            else {
              writeStatus({
                id: item.id,
                state: "error",
                message: `Last copy kept · ${item.error}`,
                fetchedAt: new Date().toISOString(),
                count: 0,
              });
            }
            return item;
          }),
        ),
        ...prefs.custom
          .filter((connector) => on.has(connector.id))
          .map((connector: CustomConnector) =>
            settle(connector.id, () => loadCustom(connector)).then((item) => {
              if (item.ok) take(item.id, item.result);
              else {
                writeStatus({
                  id: item.id,
                  state: "error",
                  message: `Last copy kept · ${item.error}`,
                  fetchedAt: new Date().toISOString(),
                  count: 0,
                });
              }
              return item;
            }),
          ),
      ];
      await Promise.all(jobs);
      if (on.has("epss")) {
        try {
          const scores = await loadEpss(priorityIds(bundleRef.current.vulns, 80));
          const vulns = applyEpss(bundleRef.current.vulns, scores);
          const next = { ...bundleRef.current, vulns };
          bundleRef.current = next;
          setBundle(next);
          writeStatus({
            id: "epss",
            state: "live",
            message: `Live · ${scores.size} scores`,
            fetchedAt: new Date().toISOString(),
            count: scores.size,
          });
        } catch (error) {
          writeStatus({
            id: "epss",
            state: "error",
            message: `Last scores kept · ${error instanceof Error ? error.message : "EPSS failed"}`,
            fetchedAt: new Date().toISOString(),
            count: 0,
          });
        }
      }
      try {
        const cached: Snapshot & { pictures: Picture[] } = {
          ...bundleRef.current,
          generatedAt: bundleRef.current.refreshedAt ?? new Date().toISOString(),
          pictures: picturesRef.current,
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
      } catch {
        /* Quota or private mode. The floor still works. */
      }
    })().finally(() => {
      inflight.current = false;
      setSyncing(false);
    });
  }, []);

  useEffect(() => {
    if (!ready) return;
    refresh();
    const onVis = () => {
      if (document.hidden) return;
      const every = usePrefs.getState().refreshMin;
      if (!every) return;
      const at = bundleRef.current.refreshedAt;
      if (!at || Date.now() - Date.parse(at) > every * 60 * 1000) refresh();
    };
    document.addEventListener("visibilitychange", onVis);
    if (!refreshMin) return () => document.removeEventListener("visibilitychange", onVis);
    const timer = window.setInterval(() => {
      if (!document.hidden) refresh();
    }, refreshMin * 60 * 1000);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ready, refresh, refreshMin]);

  const enrich = useCallback(async (id: string) => {
    const pieces = await enrichVuln(id.toUpperCase(), usePrefs.getState().nvdKey);
    setBundle((current) => {
      const next = { ...current, vulns: mergeAll([...current.vulns, ...pieces]) };
      bundleRef.current = next;
      return next;
    });
  }, []);

  const forget = useCallback((source: string) => {
    setBundle((current) => {
      const stripped = forgetSource(current.vulns, current.advisories, source);
      const next = { ...current, ...stripped };
      bundleRef.current = next;
      return next;
    });
    setStatuses((current) => current.filter((status) => status.id !== source));
    setPicture((current) => (current?.id === source ? null : current));
    setPictures((current) => {
      const next = current.filter((item) => item.id !== source);
      picturesRef.current = next;
      return next;
    });
  }, []);

  const visiblePicture = picture && enabled.has(picture.id) ? picture : null;
  const visiblePictures = pictures.filter((item) => enabled.has(item.id));

  const value = useMemo<IntelValue>(
    () => ({
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
      forget,
    }),
    [bundle, enabled, statuses, syncing, visiblePicture, visiblePictures, refresh, enrich, forget],
  );

  return <IntelContext.Provider value={value}>{children}</IntelContext.Provider>;
}

export function useIntel(): IntelValue {
  const value = useContext(IntelContext);
  if (!value) throw new Error("Intel is only available inside the floor");
  return value;
}
