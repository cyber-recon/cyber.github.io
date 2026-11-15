import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { useIntel } from "@/lib/intel/provider";
import { cn } from "@/lib/cn";

const NAV = [
  { to: "/", label: "Floor", exact: true },
  { to: "/vulns", label: "Vulnerabilities", exact: false },
  { to: "/advisories", label: "Advisories", exact: false },
  { to: "/watch", label: "Watch", exact: false },
  { to: "/connectors", label: "Connectors", exact: false },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const { syncing } = useIntel();
  const searchRef = useRef<HTMLInputElement>(null);
  const [clock, setClock] = useState("UTC");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setClock(`${hours}:${minutes}:${seconds}Z`);
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.tagName === "SELECT")) return;
      if (event.key === "/") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = new FormData(event.currentTarget).get("q");
    void navigate({
      to: "/vulns",
      search: {
        q: typeof q === "string" ? q : "",
        sev: "all",
        sort: "published",
        scope: "active",
        kev: false,
        ransom: false,
        watch: false,
        fix: "any",
      },
    });
  }

  return (
    <div className="min-h-screen bg-bg text-fg">
      <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-40 focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8">
          <Link to="/" className="col-start-1 flex min-h-11 items-center gap-3">
            <Mark />
            <span>
              <span className="block font-display text-2xl font-semibold leading-none tracking-tight">Lantern</span>
              <span className="mt-1 block font-mono text-xs uppercase tracking-widest text-muted">Ops floor</span>
            </span>
          </Link>
          <p className="col-start-2 justify-self-end font-mono text-xs tabular-nums text-muted sm:col-start-3" aria-label="Zulu time">
            {clock}{syncing ? " · SYNC" : ""}
          </p>
          <form className="col-span-2 sm:col-span-1 sm:col-start-2" onSubmit={onSearch} role="search">
            <label className="sr-only" htmlFor="floor-search">
              Search vulnerabilities
            </label>
            <input
              suppressHydrationWarning
              id="floor-search"
              ref={searchRef}
              name="q"
              placeholder="Search a CVE, vendor, or product"
              className="h-11 w-full border border-line bg-surface px-3 text-sm text-fg placeholder:text-muted"
            />
          </form>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-2 lg:px-6" aria-label="Sections">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.exact }}
              className="shrink-0 border-b-2 border-transparent px-3 py-3 text-sm text-muted"
              activeProps={{ className: "shrink-0 border-b-2 border-flame px-3 py-3 text-sm text-fg" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="border-t border-line px-4 py-1 font-mono text-xs uppercase tracking-widest text-muted lg:px-8">
          Lantern · open-source intelligence · no clearance required
        </p>
      </header>
      <main id="content" className="px-4 py-4 lg:px-6">
        <div className="mx-auto max-w-screen-2xl">{children}</div>
      </main>
    </div>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8" aria-hidden="true">
      <rect width="32" height="32" fill="var(--color-surface)" />
      <rect x="6" y="14" width="20" height="2" fill="var(--color-fg)" />
      <rect x="14" y="6" width="4" height="20" fill="var(--color-flame)" />
    </svg>
  );
}

export function PageIntro({ eyebrow, title, lede, action }: { eyebrow: string; title: string; lede: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-widest text-muted">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-3 text-muted">{lede}</p>
      </div>
      {action}
    </div>
  );
}

export function fieldClass(extra?: string) {
  return cn("h-11 border border-line bg-bg px-3 text-sm text-fg placeholder:text-muted", extra);
}
