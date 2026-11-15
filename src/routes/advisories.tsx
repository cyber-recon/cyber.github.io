import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageIntro } from "@/components/shell";
import { BUILTINS } from "@/lib/intel/catalog";
import { shortDate } from "@/lib/intel/format";
import { useIntel } from "@/lib/intel/provider";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/advisories")({
  head: () => ({ meta: [{ title: "Advisories · Lantern" }] }),
  component: AdvisoriesPage,
});

function AdvisoriesPage() {
  const intel = useIntel();
  const custom = usePrefs((state) => state.custom);
  const [source, setSource] = useState("all");
  const names = useMemo(() => {
    const map = new Map(BUILTINS.map((feed) => [feed.id, feed.name]));
    for (const connector of custom) map.set(connector.id, connector.name);
    return map;
  }, [custom]);
  const sources = useMemo(() => Array.from(new Set(intel.advisories.map((item) => item.source))), [intel.advisories]);
  const notes = useMemo(() => {
    return [...intel.advisories]
      .filter((item) => source === "all" || item.source === source)
      .sort((a, b) => (b.published || "").localeCompare(a.published || ""));
  }, [intel.advisories, source]);

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="Notes"
        title="Advisories"
        lede="Cisco, Palo Alto, Unit 42, CISA, NSA, and any RSS connector you add. A note that names one or two CVEs also lands on the vulnerability list."
      />
      <div className="flex gap-2 overflow-x-auto pb-1">
        <FilterChip pressed={source === "all"} onClick={() => setSource("all")}>
          All
        </FilterChip>
        {sources.map((id) => (
          <FilterChip key={id} pressed={source === id} onClick={() => setSource(id)}>
            {names.get(id) ?? id}
          </FilterChip>
        ))}
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {notes.map((note) => (
          <li key={note.id} className="py-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <a href={note.href} target="_blank" rel="noreferrer" className="text-base">
                {note.title}
              </a>
              <span className="text-xs text-muted">{shortDate(note.published)}</span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted">{names.get(note.source) ?? note.source}</p>
            {note.summary ? <p className="mt-2 max-w-3xl text-sm text-muted line-clamp-3">{note.summary}</p> : null}
            {note.cves.length ? (
              <p className="mt-2 flex flex-wrap gap-2">
                {note.cves.map((cve) => (
                  <Link key={cve} to="/cve/$id" params={{ id: cve }} className="text-sm text-flame">
                    {cve}
                  </Link>
                ))}
              </p>
            ) : null}
          </li>
        ))}
        {!notes.length ? <li className="py-8 text-sm text-muted">No advisories for this source yet.</li> : null}
      </ul>
    </div>
  );
}

function FilterChip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn("min-h-11 shrink-0 border px-3 text-sm", pressed ? "border-flame bg-flame text-ink" : "border-line")}
    >
      {children}
    </button>
  );
}
