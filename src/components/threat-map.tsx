import { useEffect, useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import { groupDigits } from "@/lib/intel/format";
import type { Sighting } from "@/lib/intel/types";
import { cn } from "@/lib/cn";

type GeoFeature = { id?: string | number; type: string; geometry: unknown };
type Collection = { type: "FeatureCollection"; features: GeoFeature[] };

const ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
const ISO = "https://cdn.jsdelivr.net/gh/lukes/ISO-3166-Countries-with-Regional-Codes@master/all/all.json";

const COPY: Record<string, { label: string; title: string; body: string; primary: string; secondary: string | null }> = {
  "sans-map": {
    label: "DShield",
    title: "Reported attack sources",
    body: "Unique addresses SANS sensors logged, and how many reports they filed. Not traffic against your network. Countries with more sensors look louder.",
    primary: "Sources",
    secondary: "Reports",
  },
  feodo: {
    label: "Feodo",
    title: "Botnet controllers",
    body: "Live botnet command servers by the country they are hosted in. Controllers, not victims and not packets.",
    primary: "Controllers",
    secondary: null,
  },
};

export function ThreatMap({
  sightings,
  mode,
  available,
  onMode,
}: {
  sightings: Sighting[];
  mode: string;
  available: string[];
  onMode: (id: string) => void;
}) {
  const copy = COPY[mode] ?? COPY["sans-map"];
  const [geo, setGeo] = useState<Collection | null>(null);
  const [iso, setIso] = useState<Map<string, string>>(() => new Map());
  const [names, setNames] = useState<Map<string, string>>(() => new Map());
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<string | null>(null);
  const [locked, setLocked] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    void (async () => {
      try {
        const [atlasRes, isoRes] = await Promise.all([fetch(ATLAS), fetch(ISO)]);
        if (!atlasRes.ok || !isoRes.ok) throw new Error("map");
        const atlas = (await atlasRes.json()) as { objects?: { countries?: unknown } };
        const collection = feature(atlas, atlas.objects?.countries) as Collection;
        const codes = (await isoRes.json()) as Array<{ name?: string; "alpha-2"?: string; "country-code"?: string }>;
        const numeric = new Map<string, string>();
        const alpha = new Map<string, string>();
        for (const row of codes) {
          if (!row["alpha-2"] || !row["country-code"]) continue;
          const code = row["alpha-2"].toUpperCase();
          numeric.set(String(Number(row["country-code"])), code);
          if (row.name) alpha.set(code, row.name);
        }
        if (!cancel) {
          setGeo(collection);
          setIso(numeric);
          setNames(alpha);
        }
      } catch {
        if (!cancel) setFailed(true);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const byCountry = useMemo(() => new Map(sightings.map((row) => [row.country, row])), [sightings]);
  const max = Math.max(1, ...sightings.map((row) => row.sources));
  const total = sightings.reduce((sum, row) => sum + row.sources, 0) || 1;
  const top = useMemo(() => [...sightings].sort((a, b) => b.sources - a.sources).slice(0, 8), [sightings]);
  const focusCode = hover ?? locked;
  const focus = focusCode ? byCountry.get(focusCode) : undefined;
  const pathOf = useMemo(() => {
    if (!geo) return null;
    const projection = geoNaturalEarth1().fitSize([640, 320], geo);
    return geoPath(projection);
  }, [geo]);

  function countryName(code: string): string {
    return names.get(code) ?? code;
  }

  function select(code: string) {
    setLocked((current) => (current === code ? null : code));
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-line px-3 py-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-medium">{sightings.length ? copy.title : "Where noise on the internet is coming from"}</h3>
          {available.length > 1 ? (
            <div className="flex gap-2" role="group" aria-label="Map source">
              {available.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={id === mode}
                  onClick={() => {
                    setHover(null);
                    setLocked(null);
                    onMode(id);
                  }}
                  className={cn("min-h-11 border px-3 text-sm", id === mode ? "border-flame text-flame" : "border-line text-muted")}
                >
                  {COPY[id]?.label ?? id}
                </button>
              ))}
            </div>
          ) : null}
        </div>
        <p className="mt-2 max-w-3xl text-sm text-muted">{sightings.length ? copy.body : "Two public pictures. DShield is attack sources seen by SANS sensors. Feodo is botnet command servers by the country they are hosted in. Neither is a live intercept of your network."}</p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-3 p-3 lg:flex-row">
        <div className="min-w-0 flex-1" onMouseLeave={() => setHover(null)}>
          {geo && pathOf && sightings.length ? (
            <svg viewBox="0 0 640 320" className="mx-auto h-64 w-auto max-w-full" role="img" aria-label={copy.title}>
              {geo.features.map((item, index) => {
                const d = pathOf(item) || "";
                const alpha = iso.get(String(Number(item.id))) ?? "";
                const hit = byCountry.get(alpha);
                const mix = hit ? Math.max(18, Math.round(Math.sqrt(hit.sources / max) * 100)) : 0;
                const active = alpha && alpha === focusCode;
                return (
                  <path
                    key={String(item.id ?? index)}
                    d={d}
                    className={hit ? "cursor-pointer" : undefined}
                    fill={hit ? `color-mix(in srgb, var(--color-flame) ${Math.min(mix, 92)}%, var(--color-raised))` : "var(--color-raised)"}
                    stroke={active ? "var(--color-flame)" : "var(--color-bg)"}
                    strokeWidth={active ? 1.4 : 0.6}
                    onMouseEnter={() => {
                      if (hit) setHover(alpha);
                    }}
                    onClick={() => {
                      if (hit) select(alpha);
                    }}
                  >
                    {hit ? <title>{`${countryName(alpha)}: ${groupDigits(hit.sources)} ${copy.primary.toLowerCase()}`}</title> : null}
                  </path>
                );
              })}
            </svg>
          ) : (
            <p className="py-8 text-sm text-muted">
              {failed ? "Chart geometry did not load. Counts are listed when a feed answers." : sightings.length ? "Loading the chart." : "Waiting on DShield or Feodo. The list fills in when a feed answers."}
            </p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted">
            <span>Quiet</span>
            {[18, 40, 65, 88].map((mix) => (
              <span
                key={mix}
                className="inline-block h-2 w-6"
                style={{ background: `color-mix(in srgb, var(--color-flame) ${mix}%, var(--color-raised))` }}
              />
            ))}
            <span>Loud</span>
            <span className="basis-full">Darker means a larger share of {copy.primary.toLowerCase()}. Select a country for the exact count.</span>
          </div>
        </div>
        <div className="w-full shrink-0 lg:w-52">
          {focus ? (
            <div className="mb-3 border border-line bg-bg px-3 py-2">
              <p className="text-sm">{countryName(focus.country)}</p>
              <p className="mt-1 font-mono text-xs text-muted">
                {copy.primary} {groupDigits(focus.sources)} · {Math.round((focus.sources / total) * 100)}%
              </p>
              {copy.secondary ? (
                <p className="font-mono text-xs text-muted">
                  {copy.secondary} {groupDigits(focus.reports)}
                </p>
              ) : null}
              <p className="mt-1 text-xs text-muted">{locked === focus.country ? "Pinned. Select again to clear." : "Hovering. Select to pin."}</p>
            </div>
          ) : (
            <p className="mb-3 text-xs text-muted">No country selected.</p>
          )}
          <ol className="space-y-1">
            {top.map((row, index) => {
              const width = Math.max(8, Math.round((row.sources / max) * 100));
              const active = row.country === focusCode;
              return (
                <li key={row.country}>
                  <button
                    type="button"
                    onClick={() => select(row.country)}
                    onMouseEnter={() => setHover(row.country)}
                    onMouseLeave={() => setHover(null)}
                    className={cn("w-full px-1 py-1 text-left", active ? "bg-raised" : undefined)}
                    aria-pressed={locked === row.country}
                  >
                    <span className="flex items-baseline justify-between gap-3 font-mono text-xs">
                      <span>
                        {index + 1} {countryName(row.country)}
                      </span>
                      <span className="tabular-nums text-muted">{groupDigits(row.sources)}</span>
                    </span>
                    <span className="mt-1 block h-1 bg-line">
                      <span className="block h-1 bg-flame" style={{ width: `${width}%` }} />
                    </span>
                  </button>
                </li>
              );
            })}
            {!top.length ? <li className="text-xs text-muted">No country counts yet.</li> : null}
          </ol>
        </div>
      </div>
    </div>
  );
}
