import type { PatchInfo, PatchState, Vuln } from "./types";

export const UNKNOWN_PATCH: PatchInfo = {
  state: "unknown",
  detail: "No source has cited a vendor fix yet.",
};

const NO_PATCH =
  /\bno patch(?:es)? (?:is |are )?(?:yet )?available\b|\bpatch(?:es)? (?:is |are )?not (?:yet )?available\b|\bno fix(?:es)? (?:is |are )?(?:yet )?available\b|\bfix deferred\b|\bwill not fix\b|\bno update available\b|\bunpatched\b/i;

const YES_PATCH = /\bfixed in\b|\bpatches? (?:are |is )?available\b|\berrata\b|\bRH[SBE]A-\d|\bfixed versions?\b|\bfix available\b/i;

export function patchOf(vuln: Pick<Vuln, "patch"> | { patch?: PatchInfo | null }): PatchInfo {
  const patch = vuln.patch;
  if (!patch || (patch.state !== "yes" && patch.state !== "no" && patch.state !== "unknown")) return UNKNOWN_PATCH;
  return patch;
}

export function mergePatch(a?: PatchInfo | null, b?: PatchInfo | null): PatchInfo {
  const left = a ?? UNKNOWN_PATCH;
  const right = b ?? UNKNOWN_PATCH;
  const rank: Record<PatchState, number> = { unknown: 0, no: 1, yes: 2 };
  if (rank[right.state] !== rank[left.state]) return rank[right.state] > rank[left.state] ? right : left;
  return right.detail.length > left.detail.length ? right : left;
}

export function patchFromText(text: string, source: string): PatchInfo | null {
  if (NO_PATCH.test(text)) return { state: "no", detail: `${source} says a fix is not available yet.` };
  if (YES_PATCH.test(text)) return { state: "yes", detail: `${source} cites a fix.` };
  return null;
}

export function patchFromRedHat(advisories: string[], states: string[]): PatchInfo {
  const errata = advisories.filter((item) => /RH[SBE]A-\d/i.test(item));
  if (errata.length) return { state: "yes", detail: `Red Hat errata ${errata.slice(0, 3).join(", ")}.` };
  const open = states.find((item) => /affected|under investigation|fix deferred|will not fix|out of support/i.test(item));
  if (open) return { state: "no", detail: `Red Hat lists “${open}” and no errata.` };
  return UNKNOWN_PATCH;
}

export function patchFromNvd(hasPatch: boolean, hasMitigation: boolean, summary: string): PatchInfo {
  if (hasPatch) return { state: "yes", detail: "NVD lists a reference tagged as a patch." };
  if (hasMitigation) return { state: "no", detail: "NVD lists a mitigation and no patch reference." };
  return patchFromText(summary, "NVD") ?? UNKNOWN_PATCH;
}
