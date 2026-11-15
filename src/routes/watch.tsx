import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { PageIntro, fieldClass } from "@/components/shell";
import { VulnList } from "@/components/vuln-list";
import { useIntel } from "@/lib/intel/provider";
import { matchesWatch } from "@/lib/intel/select";
import { STACK_PRODUCTS } from "@/lib/intel/stack";
import { usePrefs } from "@/lib/prefs";

export const Route = createFileRoute("/watch")({
  head: () => ({ meta: [{ title: "Watch · Lantern" }] }),
  component: WatchPage,
});

function WatchPage() {
  const watch = usePrefs((state) => state.watch);
  const pins = usePrefs((state) => state.pins);
  const addWatch = usePrefs((state) => state.addWatch);
  const removeWatch = usePrefs((state) => state.removeWatch);
  const togglePin = usePrefs((state) => state.togglePin);
  const intel = useIntel();
  const [draft, setDraft] = useState("");
  const names = useMemo(() => Object.fromEntries(usePrefs.getState().custom.map((item) => [item.id, item.name])), []);
  const matches = useMemo(() => intel.vulns.filter((vuln) => matchesWatch(vuln, watch)), [intel.vulns, watch]);
  const pinned = intel.vulns.filter((vuln) => pins.includes(vuln.id));

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    addWatch(draft);
    setDraft("");
  }

  return (
    <div className="space-y-10">
      <PageIntro
        eyebrow="Your stack"
        title="Watch"
        lede="A term matches a vendor, product, or word on a loaded CVE. Presets cover the workstations and hypervisors, plus Red Hat, PAN-OS, and Cisco."
      />
      <form onSubmit={onSubmit} className="flex flex-wrap gap-2">
        <label className="sr-only" htmlFor="watch-term">
          Watch term
        </label>
        <input
          id="watch-term"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="PAN-OS"
          className={fieldClass("w-full sm:w-64")}
        />
        <button type="submit" className="min-h-11 bg-flame px-4 text-sm text-ink">
          Add term
        </button>
      </form>
      <div className="flex flex-wrap gap-2">
        {STACK_PRODUCTS.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => {
              for (const term of product.terms) addWatch(term);
            }}
            className="min-h-11 border border-line px-3 text-sm"
          >
            Add {product.label}
          </button>
        ))}
      </div>
      <ul className="flex flex-wrap gap-2">
        {watch.map((term) => (
          <li key={term}>
            <button type="button" onClick={() => removeWatch(term)} className="min-h-11 border border-line px-3 text-sm">
              {term} <span className="text-muted">Remove</span>
            </button>
          </li>
        ))}
        {!watch.length ? <li className="text-sm text-muted">No terms yet.</li> : null}
      </ul>
      <section>
        <h2 className="font-display text-2xl">Matches</h2>
        <div className="mt-4">
          {watch.length ? <VulnList rows={matches.slice(0, 40)} watchTerms={watch} names={names} /> : <p className="text-sm text-muted">Add a term to search the loaded set.</p>}
        </div>
      </section>
      <section>
        <h2 className="font-display text-2xl">Pinned</h2>
        <ul className="mt-4 divide-y divide-line border-y border-line">
          {pins.map((id) => {
            const vuln = pinned.find((item) => item.id === id);
            return (
              <li key={id} className="flex items-center justify-between gap-3 py-3">
                <span>
                  <span className="font-display text-lg">{id}</span>
                  {vuln && vuln.title !== id ? <span className="mt-1 block text-sm text-muted">{vuln.title}</span> : null}
                </span>
                <button type="button" onClick={() => togglePin(id)} className="min-h-11 px-3 text-sm text-muted">
                  Unpin
                </button>
              </li>
            );
          })}
          {!pins.length ? <li className="py-4 text-sm text-muted">Pin a CVE from its page. Pins stay on this browser.</li> : null}
        </ul>
      </section>
    </div>
  );
}
