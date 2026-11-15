export type Severity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN";

export type PatchState = "yes" | "no" | "unknown";

export type PatchInfo = {
  state: PatchState;
  detail: string;
};

export type KevRecord = {
  name: string;
  dateAdded: string;
  dueDate: string;
  ransomware: string;
  requiredAction: string;
  notes: string;
};

export type RedHatRecord = {
  severity: string;
  bugzilla: string | null;
  statement: string | null;
  packages: string[];
};

export type IntelRef = {
  href: string;
  label: string;
  source: string;
};

export type Vuln = {
  id: string;
  title: string;
  summary: string;
  severity: Severity;
  cvss: number | null;
  vector: string | null;
  published: string | null;
  modified: string | null;
  sources: string[];
  vendor: string | null;
  product: string | null;
  cwe: string | null;
  kev: KevRecord | null;
  redhat: RedHatRecord | null;
  patch: PatchInfo;
  epss: number | null;
  epssPercentile: number | null;
  references: IntelRef[];
};

export type Advisory = {
  id: string;
  source: string;
  title: string;
  href: string;
  published: string | null;
  summary: string;
  cves: string[];
};

export type Snapshot = {
  generatedAt: string;
  kevCatalog: string | null;
  kevCount: number | null;
  vulns: Vuln[];
  advisories: Advisory[];
};

export type FeedState = "idle" | "live" | "seed" | "error";

export type FeedStatus = {
  id: string;
  state: FeedState;
  message: string;
  fetchedAt: string | null;
  count: number;
};

export type Sighting = {
  country: string;
  sources: number;
  reports: number;
};

export type LoadResult = {
  vulns: Vuln[];
  advisories: Advisory[];
  sightings?: Sighting[];
  meta?: { kevCatalog?: string | null; kevCount?: number | null };
};

export const SEVERITIES: Severity[] = ["CRITICAL", "HIGH", "MEDIUM", "LOW", "UNKNOWN"];

export function emptyVuln(id: string, source: string): Vuln {
  return {
    id,
    title: id,
    summary: "",
    severity: "UNKNOWN",
    cvss: null,
    vector: null,
    published: null,
    modified: null,
    sources: source ? [source] : [],
    vendor: null,
    product: null,
    cwe: null,
    kev: null,
    redhat: null,
    patch: { state: "unknown", detail: "No source has cited a vendor fix yet." },
    epss: null,
    epssPercentile: null,
    references: [],
  };
}
