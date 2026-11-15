import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { PageIntro } from "@/components/shell";
import { VulnList } from "@/components/vuln-list";
import { useIntel } from "@/lib/intel/provider";
import { filterVulns, sortVulns, type SortKey, type VulnQuery } from "@/lib/intel/select";
import { SEVERITIES } from "@/lib/intel/types";
import { usePrefs } from "@/lib/prefs";
import { cn } from "@/lib/cn";

const PAGE = 25;

export const Route = createFileRoute("/vulns")({
  head: () => ({ meta: [{ title: "Vulnerabilities · Lantern" }] }),
  validateSearch: (search: Record<string, unknown>): VulnQuery => ({
    q: typeof search.q === "string" ? search.q : "",
    sev: typeof search.sev === "string" && search.sev ? search.sev : "all",
    sort: isSort(search.sort) ? search.sort : "published",
    scope: search.scope === "all" ? "all" : "active",
    kev: flag(search.kev),
    ransom: flag(search.ransom),
    watch: flag(search.watch),
    fix: search.fix === "yes" || search.fix === "no" ? search.fix : "any",
  }),
  component: VulnsPage,
});

function isSort(value: unknown): value is SortKey {
  return value === "published" || value === "cvss" || value === "epss" || value === "due" || value === "modified";
}

function flag(value: unknown): boolean {
  return value === true || value === "1" || value === "true";
}

function VulnsPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/vulns" });
  const intel = useIntel();
  const watch = usePrefs((state) => state.watch);
  const custom = usePrefs((state) => state.custom);
  const names = useMemo(() => Object.fromEntries(custom.map((item) => [item.id, item.name])), [custom]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [search.q, search.sev, search.sort, search.scope, search.kev, search.ransom, search.watch, search.fix, watch]);

  const rows = useMemo(() => sortVulns(filterVulns(intel.vulns, search, watch), search.sort), [intel.vulns, search, watch]);
  const slice = rows.slice(page * PAGE, page * PAGE + PAGE);
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const selected = search.sev === "all" ? new Set<string>() : new Set(search.sev.split(","));

  function patch(partial: Partial<VulnQuery>) {
    void navigate({ search: (prev) => ({ ...prev, ...partial }) });
  }

  function toggleSeverity(severity: string) {
    if (search.sev === "all") {
      patch({ sev: severity });
      return;
    }
    const next = new Set(selected);
    if (next.has(severity)) next.delete(severity);
    else next.add(severity);
    patch({ sev: next.size === 0 || next.size === SEVERITIES.length ? "all" : Array.from(next).join(",") });
  }

  function download() {
    const header = ["cve", "title", "severity", "cvss", "epss", "published", "kev_due", "patch", "sources"];
    const lines = rows.map((vuln) =>
      [vuln.id, vuln.title, vuln.severity, vuln.cvss ?? "", vuln.epss ?? "", vuln.published ?? "", vuln.kev?.dueDate ?? "", vuln.patch?.state ?? "unknown", vuln.sources.join("|")]
        .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
        .join(","),
    );
    const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "lantern-vulns.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <PageIntro
        eyebrow="CVE workbench"
        title="Vulnerabilities"
        lede="Filter by severity, keep the view on what is exploited or merely likely to be, and open any CVE for the detail."
        action={
          <button type="button" onClick={download} className="min-h-11 border border-line px-4 text-sm">
            Export this view
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        <Chip pressed={search.sev === "all"} onClick={() => patch({ sev: "all" })}>
          All severities
        </Chip>
        {SEVERITIES.map((severity) => (
          <Chip key={severity} pressed={search.sev !== "all" && selected.has(severity)} onClick={() => toggleSeverity(severity)}>
            {severity === "UNKNOWN" ? "Unscored" : severity[0] + severity.slice(1).toLowerCase()}
          </Chip>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Chip pressed={search.scope === "active"} onClick={() => patch({ scope: "active" })}>
          Active window
        </Chip>
        <Chip pressed={search.scope === "all"} onClick={() => patch({ scope: "all" })}>
          All loaded
        </Chip>
        <Chip pressed={search.kev} onClick={() => patch({ kev: !search.kev })}>
          Exploited
        </Chip>
        <Chip pressed={search.ransom} onClick={() => patch({ ransom: !search.ransom })}>
          Ransomware
        </Chip>
        <Chip pressed={search.watch} onClick={() => patch({ watch: !search.watch })}>
          Watch list
        </Chip>
        <Chip pressed={search.fix === "yes"} onClick={() => patch({ fix: search.fix === "yes" ? "any" : "yes" })}>
          Patch known
        </Chip>
        <Chip pressed={search.fix === "no"} onClick={() => patch({ fix: search.fix === "no" ? "any" : "no" })}>
          No patch
        </Chip>
        <label className="ml-auto flex min-h-11 items-center gap-2 text-sm text-muted">
          Sort
          <select
            value={search.sort}
            onChange={(event) => patch({ sort: event.target.value as SortKey })}
            className="h-11 border border-line bg-bg px-2 text-fg"
          >
            <option value="published">Published</option>
            <option value="modified">Modified</option>
            <option value="cvss">CVSS</option>
            <option value="epss">EPSS</option>
            <option value="due">KEV due date</option>
          </select>
        </label>
      </div>

      <p className="text-sm text-muted">
        {rows.length} shown{search.q ? ` for “${search.q}”` : ""}. Active window keeps the last 45 days, KEV from the last 120, and anything critical, high, or due within three weeks.
      </p>
      <VulnList rows={slice} watchTerms={watch} names={names} />
      <div className="flex items-center justify-between gap-3">
        <button type="button" className="min-h-11 px-3 text-sm disabled:opacity-40" disabled={page === 0} onClick={() => setPage((value) => value - 1)}>
          Previous
        </button>
        <p className="text-sm tabular-nums text-muted">
          {page + 1} / {pages}
        </p>
        <button
          type="button"
          className="min-h-11 px-3 text-sm disabled:opacity-40"
          disabled={page + 1 >= pages}
          onClick={() => setPage((value) => value + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn("min-h-11 border px-3 text-sm", pressed ? "border-flame bg-flame text-ink" : "border-line text-fg")}
    >
      {children}
    </button>
  );
}
