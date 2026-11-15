import { cn } from "@/lib/cn";
import { sourceLabel } from "@/lib/intel/catalog";
import { patchOf } from "@/lib/intel/patch";
import type { FeedState, PatchInfo, Severity, Vuln } from "@/lib/intel/types";

const SEVERITY_WORD: Record<Severity, string> = {
  CRITICAL: "Critical",
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
  UNKNOWN: "Unscored",
};

export function SeverityMark({ severity }: { severity: Severity }) {
  const hot = severity === "CRITICAL" || severity === "HIGH";
  return (
    <span className={cn("inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide", hot ? "text-flame" : "text-muted")}>
      <span className={cn("size-1.5 rounded-full", hot ? "bg-flame" : "bg-line")} aria-hidden="true" />
      {SEVERITY_WORD[severity]}
    </span>
  );
}

export function PatchMark({ vuln, patch }: { vuln?: Pick<Vuln, "patch">; patch?: PatchInfo }) {
  const info = patch ?? (vuln ? patchOf(vuln) : { state: "unknown" as const, detail: "No source has cited a vendor fix yet." });
  const label = info.state === "yes" ? "Patch" : info.state === "no" ? "No patch" : "Patch unknown";
  return (
    <span className={cn("text-xs uppercase tracking-wide", info.state === "no" ? "text-flame" : "text-muted")} title={info.detail}>
      {label}
    </span>
  );
}
export function SourceMarks({ sources, names }: { sources: string[]; names?: Record<string, string> }) {
  const unique = Array.from(new Set(sources)).slice(0, 4);
  return (
    <span className="text-xs text-muted">
      {unique.map((source, index) => (
        <span key={source}>
          {index > 0 ? " · " : ""}
          {sourceLabel(source, names)}
        </span>
      ))}
    </span>
  );
}

export function Lamp({ state }: { state: FeedState }) {
  return (
    <span
      className={cn(
        "inline-block size-2.5 shrink-0 rounded-full",
        state === "live" && "bg-flame",
        state === "seed" && "bg-muted",
        state === "error" && "border border-flame bg-transparent",
        state === "idle" && "bg-line",
      )}
      aria-hidden="true"
    />
  );
}
