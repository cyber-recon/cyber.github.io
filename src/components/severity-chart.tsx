import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { utcDay } from "@/lib/intel/format";
import type { Vuln } from "@/lib/intel/types";

export function SeverityChart({ vulns }: { vulns: Vuln[] }) {
  const [ready, setReady] = useState(false);
  const data = useMemo(() => buildDays(vulns), [vulns]);
  useEffect(() => setReady(true), []);
  if (!ready) return <div className="h-44" />;
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barCategoryGap={4}>
          <XAxis dataKey="label" tick={{ fill: "var(--color-muted)", fontSize: 11 }} axisLine={false} tickLine={false} interval={1} />
          <Tooltip
            cursor={{ fill: "var(--color-raised)" }}
            contentStyle={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-line)",
              color: "var(--color-fg)",
              fontSize: 12,
            }}
          />
          <Bar dataKey="critical" stackId="mix" fill="var(--color-flame)" />
          <Bar dataKey="high" stackId="mix" fill="var(--color-fg)" />
          <Bar dataKey="medium" stackId="mix" fill="var(--color-muted)" />
          <Bar dataKey="low" stackId="mix" fill="var(--color-line)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function buildDays(vulns: Vuln[]) {
  const days = [];
  for (let offset = -13; offset <= 0; offset += 1) {
    const iso = utcDay(offset);
    days.push({ day: iso, label: iso.slice(5), critical: 0, high: 0, medium: 0, low: 0 });
  }
  const index = new Map(days.map((day, position) => [day.day, position]));
  for (const vuln of vulns) {
    const day = (vuln.published || vuln.kev?.dateAdded || "").slice(0, 10);
    const slot = index.get(day);
    if (slot == null) continue;
    if (vuln.severity === "CRITICAL") days[slot].critical += 1;
    else if (vuln.severity === "HIGH") days[slot].high += 1;
    else if (vuln.severity === "MEDIUM") days[slot].medium += 1;
    else if (vuln.severity === "LOW") days[slot].low += 1;
  }
  return days;
}
