import type { Severity } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function shortDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const day = iso.slice(0, 10);
  const [year, month, date] = day.split("-");
  const monthName = MONTHS[Number(month) - 1];
  if (!year || !monthName || !date) return "—";
  return `${Number(date)} ${monthName} ${year}`;
}

export function utcDay(offset = 0): string {
  const now = new Date();
  now.setUTCDate(now.getUTCDate() + offset);
  return now.toISOString().slice(0, 10);
}

export function formatCvss(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  return value.toFixed(1);
}

export function formatEpss(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  const pct = value * 100;
  return `${pct >= 10 ? pct.toFixed(0) : pct.toFixed(1)}%`;
}

export function groupDigits(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function toIso(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return `${trimmed}T00:00:00Z`;
  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) return null;
  return new Date(parsed).toISOString().replace(/\.\d{3}Z$/, "Z");
}

export function dueState(due: string | null | undefined, today = utcDay()): "overdue" | "soon" | "open" | "none" {
  if (!due) return "none";
  const day = due.slice(0, 10);
  if (day < today) return "overdue";
  if (day <= utcDay(14)) return "soon";
  return "open";
}

const CVE_RE = /\bCVE-\d{4}-\d{4,7}\b/gi;

export function extractCves(text: string): string[] {
  const found: string[] = [];
  for (const match of text.matchAll(CVE_RE)) {
    const id = match[0].toUpperCase();
    if (!found.includes(id)) found.push(id);
  }
  return found;
}

export function severityFromText(text: string): Severity {
  const match = text.match(/severity\s*[:=]\s*(critical|high|important|medium|moderate|low)/i);
  const word = match?.[1]?.toLowerCase();
  if (word === "critical") return "CRITICAL";
  if (word === "high" || word === "important") return "HIGH";
  if (word === "medium" || word === "moderate") return "MEDIUM";
  if (word === "low") return "LOW";
  return "UNKNOWN";
}

export function severityFromScore(score: number | null): Severity | null {
  if (score == null || Number.isNaN(score)) return null;
  if (score >= 9) return "CRITICAL";
  if (score >= 7) return "HIGH";
  if (score >= 4) return "MEDIUM";
  if (score > 0) return "LOW";
  return "UNKNOWN";
}
