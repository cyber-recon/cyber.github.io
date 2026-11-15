import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Cell, Grid, Gridline } from "react-resizable-panels";
import { Lamp, PatchMark, SeverityMark, SourceMarks } from "@/components/marks";
import { ThreatMap } from "@/components/threat-map";
import { fieldClass } from "@/components/shell";
import { BUILTINS, sourceLabel } from "@/lib/intel/catalog";
import { dueState, formatEpss, shortDate, utcDay } from "@/lib/intel/format";
import { useIntel } from "@/lib/intel/provider";
import { patchOf } from "@/lib/intel/patch";
import { matchesWatch, priorityScore, wireScore, type VulnQuery } from "@/lib/intel/select";
import { STACK_PRODUCTS } from "@/lib/intel/stack";
import { usePrefs, type BoardLayout, type RefreshMin } from "@/lib/prefs";

const VULN_SEARCH = {
  q: "",
  sev: "all",
  sort: "published",
  scope: "active",
  kev: false,
  ransom: false,
  watch: true,
  fix: "any",
} as const;

function useWide(): boolean {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const apply = () => setWide(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);
  return wide;
}

function usePrefsHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    if (usePrefs.persist.hasHydrated()) setHydrated(true);
    return usePrefs.persist.onFinishHydration(() => setHydrated(true));
  }, []);
  return hydrated;
}

export function OpsBoard() {
  const intel = useIntel();
  const watch = usePrefs((state) => state.watch);
  const refreshMin = usePrefs((state) => state.refreshMin);
  const boardLayout = usePrefs((state) => state.boardLayout);
  const setRefreshMin = usePrefs((state) => state.setRefreshMin);
  const setBoardLayout = usePrefs((state) => state.setBoardLayout);
  const custom = usePrefs((state) => state.custom);
  const names = useMemo(() => Object.fromEntries(custom.map((item) => [item.id, item.name])), [custom]);
  const hydrated = usePrefsHydrated();
  const wide = useWide();
  const [layoutKey, setLayoutKey] = useState(0);
  const [mapMode, setMapMode] = useState("sans-map");
  const terms = watch.length ? watch : STACK_PRODUCTS.flatMap((product) => [...product.terms]);

  const stackHits = useMemo(
    () => [...intel.vulns].filter((vuln) => matchesWatch(vuln, terms)).sort((a, b) => priorityScore(b) - priorityScore(a)),
    [intel.vulns, terms],
  );
  const queue = (stackHits.length ? stackHits : [...intel.vulns].sort((a, b) => priorityScore(b) - priorityScore(a))).slice(0, 10);
  const wire = useMemo(() => {
    return [...intel.advisories]
      .map((note) => ({ note, score: wireScore(note, terms) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || (b.note.published || "").localeCompare(a.note.published || ""))
      .slice(0, 18);
  }, [intel.advisories, terms]);
  const ticker = wire.slice(0, 12);
  const saved = boardLayout && Object.keys(boardLayout.columns).length ? boardLayout : undefined;
  const mapIds = intel.pictures.map((item) => item.id);
  const activeMap = mapIds.includes(mapMode) ? mapMode : (mapIds[0] ?? "sans-map");
  const mapPoints = intel.pictures.find((item) => item.id === activeMap)?.points ?? [];
  const kevRows = useMemo(() => intel.vulns.filter((vuln) => vuln.kev), [intel.vulns]);
  const kevRecent = kevRows.filter((vuln) => (vuln.kev?.dateAdded ?? "") >= utcDay(-30)).length;
  const kevDue = kevRows.filter((vuln) => matchesWatch(vuln, terms) && ["overdue", "soon"].includes(dueState(vuln.kev?.dueDate))).length;
  const kevOpen = kevRows.filter((vuln) => patchOf(vuln).state === "no").length;

  function onLayoutChanged(layout: BoardLayout) {
    setBoardLayout(layout);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Ops floor</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="font-mono text-xs uppercase tracking-widest text-muted">
            Auto
            <select
              value={refreshMin}
              onChange={(event) => setRefreshMin(Number(event.target.value) as RefreshMin)}
              className={fieldClass("ml-2 font-sans")}
              aria-label="Auto refresh"
            >
              <option value={5}>5 min</option>
              <option value={15}>15 min</option>
              <option value={30}>30 min</option>
              <option value={0}>Manual</option>
            </select>
          </label>
          <button type="button" onClick={() => { setBoardLayout(null); setLayoutKey((value) => value + 1); }} className="min-h-11 border border-line px-3 text-sm">
            Reset layout
          </button>
          <button type="button" onClick={intel.refresh} disabled={intel.syncing} className="min-h-11 bg-flame px-4 text-sm text-ink disabled:opacity-60">
            {intel.syncing ? "Syncing" : "Resync"}
          </button>
        </div>
      </div>

      <section className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4" aria-label="Stack">
        {STACK_PRODUCTS.map((product) => {
          const hits = intel.vulns.filter((vuln) => matchesWatch(vuln, [...product.terms]));
          const exploited = hits.filter((vuln) => vuln.kev).length;
          const top = [...hits].sort((a, b) => priorityScore(b) - priorityScore(a))[0];
          return (
            <Link key={product.id} to="/watch" className="bg-surface px-3 py-2">
              <div className="font-mono text-xs uppercase tracking-widest text-muted">{product.detail}</div>
              <div className="text-xl font-semibold tracking-tight">{product.label}</div>
              <div className="font-mono text-xs text-muted">
                <span className="block">
                  {hits.length} loaded · {exploited} exploited
                </span>
                {top ? <span className="block">{top.id}</span> : null}
              </div>
            </Link>
          );
        })}
      </section>

      <section className="border border-line bg-surface" aria-label="CISA Known Exploited Vulnerabilities">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-3 py-2">
          <p className="max-w-3xl text-sm text-muted">
            CISA known exploited. Evidence of use in the wild. Due dates are a remediation clock, not a patch date.
          </p>
          <Link to="/vulns" search={{ ...VULN_SEARCH, kev: true, watch: false, scope: "all", sort: "due" }} className="text-sm text-flame">
            Open the catalog
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
          <KevStat label="Catalog" value={intel.kevCount ? intel.kevCount.toLocaleString() : String(kevRows.length)} note={intel.kevCatalog ?? "Loaded copy"} href={{ ...VULN_SEARCH, kev: true, watch: false, scope: "all", sort: "due" }} />
          <KevStat label="Added in 30 days" value={String(kevRecent)} note="New catalog entries" href={{ ...VULN_SEARCH, kev: true, watch: false, scope: "active", sort: "published" }} />
          <KevStat label="Due on watch" value={String(kevDue)} note="Overdue or inside 14 days" href={{ ...VULN_SEARCH, kev: true, watch: true, scope: "all", sort: "due" }} />
          <KevStat label="No patch" value={String(kevOpen)} note="A source said no fix yet" href={{ ...VULN_SEARCH, kev: true, watch: false, scope: "all", sort: "due", fix: "no" }} />
        </div>
      </section>

      <Ticker items={ticker.map((item) => ({ id: item.note.id, title: item.note.title, href: item.note.href, source: sourceLabel(item.note.source, names) }))} />

      {hydrated && wide ? (
        <div className="h-board">
          <Grid
            key={layoutKey}
            columns={[{ id: "main", minSize: 320, defaultSize: "58%" }, { id: "side", minSize: 280 }]}
            rows={[{ id: "upper", minSize: 120, defaultSize: "56%" }, { id: "lower", minSize: 120 }]}
            defaultLayout={saved}
            onLayoutChanged={onLayoutChanged}
            className="h-full"
          >
            <Cell column={0} row={0} className="min-h-0 min-w-0">
              <Frame title="Priority" meta={stackHits.length ? "Stack first" : "No stack match yet"}>
                <Queue rows={queue} names={names} stacked={stackHits.length > 0} />
              </Frame>
            </Cell>
            <Cell column={1} row={0} className="min-h-0 min-w-0">
              <Frame title="Origins" meta={activeMap === "feodo" ? "Feodo C2" : mapPoints.length ? "DShield" : "Waiting"}>
                <ThreatMap sightings={mapPoints} mode={activeMap} available={mapIds.length ? mapIds : ["sans-map"]} onMode={setMapMode} />
              </Frame>
            </Cell>
            <Cell column={0} row={1} className="min-h-0 min-w-0">
              <Frame title="Wire" meta={`${wire.length} kept`}>
                <Wire notes={wire.map((item) => item.note)} names={names} />
              </Frame>
            </Cell>
            <Cell column={1} row={1} className="min-h-0 min-w-0">
              <Frame title="Feeds" meta={intel.syncing ? "Syncing" : shortDate(intel.refreshedAt)}>
                <FeedHealth />
              </Frame>
            </Cell>
            <Gridline type="column" column={1} className="bg-line" />
            <Gridline type="row" row={1} className="bg-line" />
          </Grid>
        </div>
      ) : (
        <div className="space-y-4">
          <Frame title="Priority" meta={stackHits.length ? "Stack first" : "Floor"}>
            <Queue rows={queue} names={names} stacked={stackHits.length > 0} />
          </Frame>
          <Frame title="Origins" meta={activeMap === "feodo" ? "Feodo C2" : mapPoints.length ? "DShield" : "Waiting"}>
            <ThreatMap sightings={mapPoints} mode={activeMap} available={mapIds.length ? mapIds : ["sans-map"]} onMode={setMapMode} />
          </Frame>
          <Frame title="Wire" meta={`${wire.length} kept`}>
            <Wire notes={wire.map((item) => item.note)} names={names} />
          </Frame>
          <Frame title="Feeds" meta={shortDate(intel.refreshedAt)}>
            <FeedHealth />
          </Frame>
        </div>
      )}
    </div>
  );
}

function KevStat({
  label,
  value,
  note,
  href,
}: {
  label: string;
  value: string;
  note: string;
  href: VulnQuery;
}) {
  return (
    <Link to="/vulns" search={href} className="bg-surface px-3 py-2">
      <div className="font-mono text-xs uppercase tracking-widest text-muted">{label}</div>
      <div className="text-xl font-semibold tracking-tight tabular-nums">{value}</div>
      <div className="font-mono text-xs text-muted">{note}</div>
    </Link>
  );
}

function Frame({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <section className="flex h-full min-h-64 flex-col border border-line bg-surface">
      <header className="flex items-center justify-between gap-3 border-b border-line px-3 py-2">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{title}</h2>
        <span className="font-mono text-xs text-muted">{meta}</span>
      </header>
      <div className="min-h-0 flex-1 overflow-auto">{children}</div>
    </section>
  );
}

function Queue({
  rows,
  names,
  stacked,
}: {
  rows: ReturnType<typeof useIntel>["vulns"];
  names: Record<string, string>;
  stacked: boolean;
}) {
  if (!rows.length) return <p className="p-4 text-sm text-muted">No records in this copy yet.</p>;
  return (
    <ol className="divide-y divide-line">
      {rows.map((vuln) => (
        <li key={vuln.id}>
          <Link to="/cve/$id" params={{ id: vuln.id }} className="grid gap-1 px-3 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
            <span className="font-mono text-sm">{vuln.id}</span>
            <span className="min-w-0">
              <span className="block truncate text-sm">{vuln.title === vuln.id ? "No title published" : vuln.title}</span>
              <span className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <SeverityMark severity={vuln.severity} />
                <PatchMark vuln={vuln} />
                <SourceMarks sources={vuln.sources} names={names} />
                <span className="font-mono text-xs text-muted">{vuln.kev ? `Due ${shortDate(vuln.kev.dueDate)}` : formatEpss(vuln.epss)}</span>
              </span>
            </span>
          </Link>
        </li>
      ))}
      <li className="px-3 py-3">
        <Link to="/vulns" search={stacked ? VULN_SEARCH : { ...VULN_SEARCH, watch: false }} className="text-sm text-flame">
          {stacked ? "All stack matches" : "Full list"}
        </Link>
      </li>
    </ol>
  );
}

function Wire({ notes, names }: { notes: ReturnType<typeof useIntel>["advisories"]; names: Record<string, string> }) {
  if (!notes.length) return <p className="p-4 text-sm text-muted">No operational notes yet.</p>;
  return (
    <ul className="divide-y divide-line">
      {notes.map((note) => (
        <li key={note.id} className="px-3 py-3">
          <a href={note.href} target="_blank" rel="noreferrer" className="text-sm">
            {note.title}
          </a>
          <p className="mt-1 font-mono text-xs text-muted">
            {sourceLabel(note.source, names)} · {shortDate(note.published)}
            {note.cves[0] ? ` · ${note.cves[0]}` : ""}
          </p>
        </li>
      ))}
      <li className="px-3 py-3">
        <Link to="/advisories" className="text-sm text-flame">
          All notes
        </Link>
      </li>
    </ul>
  );
}

function FeedHealth() {
  const intel = useIntel();
  const disabled = usePrefs((state) => state.disabled);
  return (
    <div className="p-3">
      <ul className="grid gap-x-4 sm:grid-cols-2">
        {BUILTINS.map((feed) => {
          const status = intel.statuses.find((item) => item.id === feed.id);
          const off = disabled.includes(feed.id);
          return (
            <li key={feed.id} className="flex items-start gap-2 border-b border-line/70 py-1.5">
              <span className="mt-1">
                <Lamp state={off ? "idle" : (status?.state ?? "idle")} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm">{feed.name}</span>
                <span className="block truncate font-mono text-xs text-muted">{off ? "Off" : (status?.message ?? "Idle")}</span>
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted">
        <Link to="/connectors" className="text-flame">
          Add or mute a feed
        </Link>
        {intel.kevCount ? ` · KEV catalog ${intel.kevCount.toLocaleString()}` : ""}
      </p>
    </div>
  );
}

function Ticker({ items }: { items: { id: string; title: string; href: string; source: string }[] }) {
  if (items.length < 2) return null;
  return (
    <div className="ticker overflow-hidden border border-line bg-bg">
      <div className="ticker-track flex w-max">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-8 px-4 py-2" aria-hidden={copy === 1 ? true : undefined}>
            {items.map((item) => (
              <a key={`${copy}-${item.id}`} href={item.href} target="_blank" rel="noreferrer" className="whitespace-nowrap font-mono text-xs text-muted">
                <span className="text-flame">{item.source}</span> {item.title}
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
