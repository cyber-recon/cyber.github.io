import { Link } from "@tanstack/react-router";
import { SeverityMark, PatchMark, SourceMarks } from "@/components/marks";
import { dueState, formatCvss, formatEpss, shortDate } from "@/lib/intel/format";
import { matchesWatch } from "@/lib/intel/select";
import type { Vuln } from "@/lib/intel/types";

export function VulnList({
  rows,
  watchTerms = [],
  names,
}: {
  rows: Vuln[];
  watchTerms?: string[];
  names?: Record<string, string>;
}) {
  if (!rows.length) {
    return <p className="border border-line bg-surface px-4 py-8 text-muted">Nothing in this cut of the floor.</p>;
  }
  return (
    <>
      <div className="hidden md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-widest text-muted">
              <th className="py-3 pr-4 font-medium">CVE</th>
              <th className="py-3 pr-4 font-medium">Issue</th>
              <th className="py-3 pr-4 font-medium">Severity</th>
              <th className="py-3 pr-4 font-medium">CVSS</th>
              <th className="py-3 pr-4 font-medium">EPSS</th>
              <th className="py-3 pr-4 font-medium">When</th>
              <th className="py-3 font-medium">Sources</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((vuln) => (
              <tr key={vuln.id} className="border-b border-line transition-colors duration-150 hover:bg-surface">
                <td className="py-3 pr-4 align-top">
                  <Link to="/cve/$id" params={{ id: vuln.id }} className="font-display text-lg leading-tight">
                    {vuln.id}
                  </Link>
                  {matchesWatch(vuln, watchTerms) ? <div className="mt-1 text-xs text-flame">Watch</div> : null}
                </td>
                <td className="max-w-sm py-3 pr-4 align-top text-sm">
                  <div>{vuln.title === vuln.id ? "No title published" : vuln.title}</div>
                  <Meta vuln={vuln} />
                </td>
                <td className="py-3 pr-4 align-top">
                  <SeverityMark severity={vuln.severity} />
                  <div className="mt-1">
                    <PatchMark vuln={vuln} />
                  </div>
                </td>
                <td className="py-3 pr-4 align-top text-sm tabular-nums">{formatCvss(vuln.cvss)}</td>
                <td className="py-3 pr-4 align-top text-sm tabular-nums">{formatEpss(vuln.epss)}</td>
                <td className="py-3 pr-4 align-top text-sm text-muted">
                  {vuln.kev ? <Due due={vuln.kev.dueDate} added={vuln.kev.dateAdded} /> : shortDate(vuln.published)}
                </td>
                <td className="py-3 align-top">
                  <SourceMarks sources={vuln.sources} names={names} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="divide-y divide-line border-y border-line md:hidden">
        {rows.map((vuln) => (
          <li key={vuln.id}>
            <Link to="/cve/$id" params={{ id: vuln.id }} className="block py-4">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-xl">{vuln.id}</span>
                <SeverityMark severity={vuln.severity} />
              </div>
              <p className="mt-2 text-sm">{vuln.title === vuln.id ? "No title published" : vuln.title}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
                <span className="tabular-nums">CVSS {formatCvss(vuln.cvss)}</span>
                <span className="tabular-nums">EPSS {formatEpss(vuln.epss)}</span>
                <span>{vuln.kev ? shortDate(vuln.kev.dateAdded) : shortDate(vuln.published)}</span>
                {matchesWatch(vuln, watchTerms) ? <span className="text-flame">Watch</span> : null}
                <PatchMark vuln={vuln} />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function Meta({ vuln }: { vuln: Vuln }) {
  const bits = [vuln.vendor, vuln.product].filter(Boolean);
  if (!bits.length && !vuln.kev) return null;
  return (
    <p className="mt-1 text-xs text-muted">
      {bits.join(" · ")}
      {vuln.kev ? `${bits.length ? " · " : ""}Exploited` : ""}
      {vuln.kev?.ransomware === "Known" ? " · Ransomware" : ""}
    </p>
  );
}

function Due({ due, added }: { due: string; added: string }) {
  const state = dueState(due);
  const label = state === "overdue" ? "Overdue" : state === "soon" ? "Due soon" : "Due";
  return (
    <span>
      <span className={state === "overdue" ? "block text-flame" : "block"}>
        {label} {shortDate(due)}
      </span>
      <span className="block text-xs">Added {shortDate(added)}</span>
    </span>
  );
}
