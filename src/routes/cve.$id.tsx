import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PatchMark, SeverityMark, SourceMarks } from "@/components/marks";
import { dueState, formatCvss, formatEpss, shortDate } from "@/lib/intel/format";
import { patchOf } from "@/lib/intel/patch";
import { useIntel } from "@/lib/intel/provider";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/cve/$id")({
  head: ({ params }) => ({ meta: [{ title: `${params.id.toUpperCase()} · Lantern` }] }),
  component: CvePage,
});

const VECTOR_LABEL: Record<string, string> = {
  AV: "Attack vector",
  AC: "Complexity",
  AT: "Attack requirements",
  PR: "Privileges",
  UI: "User interaction",
  S: "Scope",
  C: "Confidentiality",
  I: "Integrity",
  A: "Availability",
  VC: "Vulnerable confidentiality",
  VI: "Vulnerable integrity",
  VA: "Vulnerable availability",
};

const VECTOR_VALUE: Record<string, Record<string, string>> = {
  AV: { N: "Network", A: "Adjacent", L: "Local", P: "Physical" },
  AC: { L: "Low", H: "High" },
  AT: { N: "None", P: "Present" },
  PR: { N: "None", L: "Low", H: "High" },
  UI: { N: "None", R: "Required" },
  S: { U: "Unchanged", C: "Changed" },
  C: { N: "None", L: "Low", H: "High" },
  I: { N: "None", L: "Low", H: "High" },
  A: { N: "None", L: "Low", H: "High" },
  VC: { N: "None", L: "Low", H: "High" },
  VI: { N: "None", L: "Low", H: "High" },
  VA: { N: "None", L: "Low", H: "High" },
};

function CvePage() {
  const { id: raw } = Route.useParams();
  const id = raw.toUpperCase();
  const intel = useIntel();
  const pins = usePrefs((state) => state.pins);
  const togglePin = usePrefs((state) => state.togglePin);
  const names = Object.fromEntries(usePrefs((state) => state.custom).map((item) => [item.id, item.name]));
  const vuln = intel.vulns.find((item) => item.id === id);
  const notes = intel.advisories.filter((item) => item.cves.includes(id) || item.title.toUpperCase().includes(id));
  const [note, setNote] = useState("Checking NVD, Red Hat, and EPSS");

  useEffect(() => {
    if (!/^CVE-\d{4}-\d{4,7}$/.test(id)) {
      setNote("That is not a CVE id.");
      return;
    }
    let cancel = false;
    setNote("Checking NVD, Red Hat, and EPSS");
    void intel
      .enrich(id)
      .then(() => {
        if (!cancel) setNote("");
      })
      .catch((error: unknown) => {
        if (!cancel) setNote(error instanceof Error ? error.message : "Detail sources did not answer");
      });
    return () => {
      cancel = true;
    };
  }, [id, intel.enrich]);

  const parts = vectorParts(vuln?.vector ?? null);
  const pinned = pins.includes(id);

  return (
    <article className="space-y-8">
      <Link to="/vulns" search={{ q: id, sev: "all", sort: "published", scope: "all", kev: false, ransom: false, watch: false, fix: "any" }} className="inline-flex min-h-11 items-center text-sm text-muted">
        Back to vulnerabilities
      </Link>
      <header>
        <p className="text-xs uppercase tracking-widest text-muted">Vulnerability</p>
        <div className="mt-2 flex flex-wrap items-start justify-between gap-4">
          <h1 className="font-display text-4xl sm:text-6xl">{id}</h1>
          <button
            type="button"
            aria-pressed={pinned}
            onClick={() => togglePin(id)}
            className="min-h-11 border border-line px-4 text-sm"
          >
            {pinned ? "Pinned" : "Pin"}
          </button>
        </div>
        {vuln && vuln.title !== vuln.id ? <p className="mt-4 max-w-3xl text-lg">{vuln.title}</p> : null}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <SeverityMark severity={vuln?.severity ?? "UNKNOWN"} />
          <span className="text-sm tabular-nums">CVSS {formatCvss(vuln?.cvss)}</span>
          <span className="text-sm tabular-nums">
            EPSS {formatEpss(vuln?.epss)}
            {vuln?.epssPercentile != null ? ` · percentile ${(vuln.epssPercentile * 100).toFixed(0)}` : ""}
          </span>
          {vuln ? <SourceMarks sources={vuln.sources} names={names} /> : null}
          {vuln ? <PatchMark vuln={vuln} /> : null}
        </div>
        {note ? <p className="mt-3 text-sm text-muted">{note}</p> : null}
      </header>

      <p className="max-w-3xl leading-relaxed">{vuln?.summary || "No description is loaded yet."}</p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <section className="border border-line border-l-2 border-l-flame bg-surface p-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Patch</h2>
          <div className="mt-3 space-y-3 text-sm">
            <PatchMark vuln={vuln} />
            <p>{vuln ? patchOf(vuln).detail : "No record loaded yet."}</p>
            <p className="text-muted">
              A patch is marked only when NVD tags a reference as a patch, Red Hat lists errata, or an advisory cites a fix. CISA’s required-action line is not treated as a patch.
            </p>
          </div>
        </section>
        <section className="border border-line bg-surface p-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">CISA KEV</h2>
          {vuln?.kev ? (
            <div className="mt-3 space-y-3 text-sm">
              <p>
                Added {shortDate(vuln.kev.dateAdded)}. {dueLabel(vuln.kev.dueDate)} {shortDate(vuln.kev.dueDate)}.
              </p>
              <p>
                {vuln.vendor || "Vendor unlisted"} · {vuln.product || "Product unlisted"}
              </p>
              <p>{vuln.kev.ransomware === "Known" ? "Known ransomware use." : "No known ransomware campaign listed."}</p>
              <p>{vuln.kev.requiredAction}</p>
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">Not in the exploited catalog loaded here.</p>
          )}
        </section>
        <section className="border border-line bg-surface p-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">CVSS</h2>
          {parts.length ? (
            <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
              {parts.map((part) => (
                <div key={part.label}>
                  <dt className="text-xs text-muted">{part.label}</dt>
                  <dd>{part.value}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="mt-3 text-sm text-muted">{vuln?.vector || "No vector loaded."}</p>
          )}
        </section>
        <section className="border border-line bg-surface p-4">
          <h2 className="text-xs uppercase tracking-widest text-muted">Red Hat</h2>
          {vuln?.redhat ? (
            <div className="mt-3 space-y-3 text-sm">
              <p>Product severity {vuln.redhat.severity || "not stated"}.</p>
              {vuln.redhat.statement ? <p>{vuln.redhat.statement}</p> : null}
              {vuln.redhat.packages.length ? <p>{vuln.redhat.packages.join(", ")}</p> : null}
              {vuln.redhat.bugzilla ? (
                <a className="text-flame" href={`https://bugzilla.redhat.com/show_bug.cgi?id=${vuln.redhat.bugzilla}`} target="_blank" rel="noreferrer">
                  Bugzilla {vuln.redhat.bugzilla}
                </a>
              ) : null}
            </div>
          ) : (
            <p className="mt-3 text-sm text-muted">No Red Hat record for this CVE.</p>
          )}
        </section>
      </div>

      <section>
        <h2 className="font-display text-2xl">References</h2>
        <ul className="mt-3 divide-y divide-line border-y border-line">
          {externalLinks(id).map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between gap-3 text-sm">
                <span>{link.label}</span>
                <span className="text-muted">Open</span>
              </a>
            </li>
          ))}
          {(vuln?.references ?? []).map((ref) => (
            <li key={ref.href}>
              <a href={ref.href} target="_blank" rel="noreferrer" className="flex min-h-11 items-center justify-between gap-3 text-sm">
                <span className="truncate">{ref.label}</span>
                <span className="shrink-0 text-muted">Open</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {notes.length ? (
        <section>
          <h2 className="font-display text-2xl">Related advisories</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {notes.map((item) => (
              <li key={item.id} className="py-3">
                <a href={item.href} target="_blank" rel="noreferrer" className="text-sm">
                  {item.title}
                </a>
                <p className="mt-1 text-xs text-muted">{shortDate(item.published)}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}

function dueLabel(due: string): string {
  const state = dueState(due);
  if (state === "overdue") return "Overdue";
  if (state === "soon") return "Due soon";
  return "Due";
}

function vectorParts(vector: string | null): { label: string; value: string }[] {
  if (!vector || !vector.includes("/")) return [];
  const body = vector.replace(/^CVSS:\d+(?:\.\d+)?\//, "");
  return body.split("/").flatMap((pair) => {
    const [key, value] = pair.split(":");
    if (!key || !value) return [];
    return [{ label: VECTOR_LABEL[key] ?? key, value: VECTOR_VALUE[key]?.[value] ?? value }];
  });
}

function externalLinks(id: string) {
  return [
    { href: `https://nvd.nist.gov/vuln/detail/${id}`, label: "NVD" },
    { href: `https://www.cve.org/CVERecord?id=${id}`, label: "CVE.org" },
    { href: `https://www.cisa.gov/known-exploited-vulnerabilities-catalog?search_api_fulltext=${id}`, label: "CISA catalog search" },
  ];
}
