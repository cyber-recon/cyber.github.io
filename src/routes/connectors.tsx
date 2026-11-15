import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Lamp } from "@/components/marks";
import { PageIntro, fieldClass } from "@/components/shell";
import { BUILTINS, FEED_GROUPS } from "@/lib/intel/catalog";
import { useIntel } from "@/lib/intel/provider";
import { usePrefs, type ConnectorFormat } from "@/lib/prefs";

export const Route = createFileRoute("/connectors")({
  head: () => ({ meta: [{ title: "Connectors · Lantern" }] }),
  component: ConnectorsPage,
});

function ConnectorsPage() {
  const intel = useIntel();
  const disabled = usePrefs((state) => state.disabled);
  const custom = usePrefs((state) => state.custom);
  const nvdKey = usePrefs((state) => state.nvdKey);
  const relayBase = usePrefs((state) => state.relayBase);
  const setDisabled = usePrefs((state) => state.setDisabled);
  const addCustom = usePrefs((state) => state.addCustom);
  const removeCustom = usePrefs((state) => state.removeCustom);
  const setNvdKey = usePrefs((state) => state.setNvdKey);
  const setRelayBase = usePrefs((state) => state.setRelayBase);
  const importPrefs = usePrefs((state) => state.importPrefs);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<ConnectorFormat>("json");
  const [formError, setFormError] = useState("");
  const [includeKey, setIncludeKey] = useState(false);
  const [keyDraft, setKeyDraft] = useState(nvdKey);
  const [relayDraft, setRelayDraft] = useState(relayBase);

  useEffect(() => {
    setKeyDraft(nvdKey);
    setRelayDraft(relayBase);
  }, [nvdKey, relayBase]);

  function addConnector(event: FormEvent) {
    event.preventDefault();
    setFormError("");
    try {
      const parsed = new URL(url);
      if (parsed.protocol !== "https:") throw new Error("Use an https URL");
      if (!name.trim()) throw new Error("Name the connector");
      addCustom({ name, format, url });
      setName("");
      setUrl("");
      intel.refresh();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Could not add that connector");
    }
  }

  function exportSettings() {
    const state = usePrefs.getState();
    const blob = new Blob(
      [JSON.stringify({
        disabled: state.disabled,
        custom: state.custom,
        relayBase: state.relayBase,
        watch: state.watch,
        pins: state.pins,
        refreshMin: state.refreshMin,
        boardLayout: state.boardLayout,
        ...(includeKey && state.nvdKey ? { nvdKey: state.nvdKey } : {}),
      }, null, 2)],
      { type: "application/json" },
    );
    const href = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = href;
    anchor.download = "lantern-settings.json";
    anchor.click();
    URL.revokeObjectURL(href);
  }

  async function importSettings(file: File | undefined) {
    if (!file) return;
    const data = JSON.parse(await file.text()) as Record<string, unknown>;
    importPrefs({
      disabled: Array.isArray(data.disabled) ? data.disabled.filter((item): item is string => typeof item === "string") : undefined,
      custom: Array.isArray(data.custom) ? (data.custom as never) : undefined,
      nvdKey: typeof data.nvdKey === "string" ? data.nvdKey : undefined,
      relayBase: typeof data.relayBase === "string" ? data.relayBase : undefined,
      watch: Array.isArray(data.watch) ? data.watch.filter((item): item is string => typeof item === "string") : undefined,
      pins: Array.isArray(data.pins) ? data.pins.filter((item): item is string => typeof item === "string") : undefined,
      refreshMin: data.refreshMin === 0 || data.refreshMin === 5 || data.refreshMin === 15 || data.refreshMin === 30 ? data.refreshMin : undefined,
      boardLayout:
        data.boardLayout && typeof data.boardLayout === "object"
          ? (data.boardLayout as { columns: Record<string, number>; rows: Record<string, number> })
          : undefined,
    });
    intel.refresh();
  }

  return (
    <div className="space-y-12">
      <PageIntro
        eyebrow="Sources"
        title="Connectors"
        lede="Stack queries, government lists, vendor advisories, and two pictures of the internet. Keys stay in this browser. Export leaves the NVD key out unless you opt in."
        action={
          <button type="button" onClick={intel.refresh} disabled={intel.syncing} className="min-h-11 border border-line px-4 text-sm disabled:opacity-60">
            {intel.syncing ? "Syncing" : "Resync"}
          </button>
        }
      />

      <div className="space-y-8">
        {FEED_GROUPS.map((group) => (
          <section key={group.id}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-muted">{group.label}</h2>
            <ul className="mt-2 divide-y divide-line border-y border-line">
              {BUILTINS.filter((feed) => feed.group === group.id).map((feed) => {
                const status = intel.statuses.find((item) => item.id === feed.id);
                const off = disabled.includes(feed.id);
                return (
                  <li key={feed.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <Lamp state={off ? "idle" : (status?.state ?? "idle")} />
                        <h3 className="text-base">{feed.name}</h3>
                        <span className="font-mono text-xs uppercase tracking-widest text-muted">{feed.agency}</span>
                      </div>
                      <p className="mt-2 max-w-2xl text-sm text-muted">{feed.blurb}</p>
                      <p className="mt-1 text-xs text-muted">{off ? "Off" : (status?.message ?? "Idle")}</p>
                    </div>
                    <button type="button" aria-pressed={!off} onClick={() => setDisabled(feed.id, !off)} className="min-h-11 min-w-20 border border-line px-3 text-sm">
                      {off ? "Off" : "On"}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
      {custom.length ? (
        <section>
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted">Custom</h2>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {custom.map((connector) => {
              const status = intel.statuses.find((item) => item.id === connector.id);
              const off = disabled.includes(connector.id);
              return (
                <li key={connector.id} className="grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                  <div>
                    <div className="flex items-center gap-3">
                      <Lamp state={off ? "idle" : (status?.state ?? "idle")} />
                      <h3 className="text-base">{connector.name}</h3>
                      <span className="font-mono text-xs uppercase tracking-widest text-muted">{connector.format}</span>
                    </div>
                    <p className="mt-2 truncate text-sm text-muted">{connector.url}</p>
                    <p className="mt-1 text-xs text-muted">{off ? "Off" : (status?.message ?? "Waiting")}</p>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" aria-pressed={!off} onClick={() => setDisabled(connector.id, !off)} className="min-h-11 border border-line px-3 text-sm">
                      {off ? "Off" : "On"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        removeCustom(connector.id);
                        intel.forget(connector.id);
                      }}
                      className="min-h-11 border border-line px-3 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      <section className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={addConnector} className="space-y-3 border border-line bg-surface p-4">
          <h2 className="font-display text-2xl">Custom connector</h2>
          <p className="text-sm text-muted">
            The URL has to answer the browser directly, with CORS open. JSON can be a CVE list or a KEV-shaped catalog. RSS and CSV need a CVE column or CVE ids in the text.
          </p>
          <label className="block text-sm">
            Name
            <input value={name} onChange={(event) => setName(event.target.value)} className={fieldClass("mt-1 w-full")} />
          </label>
          <label className="block text-sm">
            Format
            <select value={format} onChange={(event) => setFormat(event.target.value as ConnectorFormat)} className={fieldClass("mt-1 w-full")}>
              <option value="json">JSON</option>
              <option value="rss">RSS or Atom</option>
              <option value="csv">CSV</option>
            </select>
          </label>
          <label className="block text-sm">
            URL
            <input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com/cves.json" className={fieldClass("mt-1 w-full")} />
          </label>
          {formError ? <p className="text-sm text-flame">{formError}</p> : null}
          <button type="submit" className="min-h-11 bg-flame px-4 text-sm text-ink">
            Add and sync
          </button>
        </form>
        <div className="space-y-6">
          <form
            className="space-y-3 border border-line p-4"
            onSubmit={(event) => {
              event.preventDefault();
              setNvdKey(keyDraft.trim());
              setRelayBase(relayDraft.trim() || "/api/relay");
              intel.refresh();
            }}
          >
            <h2 className="font-display text-2xl">NVD key</h2>
            <p className="text-sm text-muted">
              NIST does not allow an API key to be shared, and a key shipped in a public site — including a GitHub Pages repo — can be copied and will be revoked. Leave this blank on the team board. The public rate limit is enough; stack queries wait their turn. A personal key stays in this browser and is sent only to nvd.nist.gov.
            </p>
            <label className="block text-sm">
              Personal key, optional
              <input value={keyDraft} onChange={(event) => setKeyDraft(event.target.value)} type="password" autoComplete="off" spellCheck={false} className={fieldClass("mt-1 w-full")} />
            </label>
            <label className="block text-sm">
              Relay base
              <input value={relayDraft} onChange={(event) => setRelayDraft(event.target.value)} className={fieldClass("mt-1 w-full")} />
            </label>
            <p className="text-sm text-muted">
              Feeds that block a browser are read through this host when the board is served with a relay. A pure github.io copy has no relay, so those feeds keep the last copy saved in the browser. Point this at an https service you control that accepts ?feed= and the feed id, if you later host the page yourself.
            </p>
            <button type="submit" className="min-h-11 border border-line px-4 text-sm">
              Save and resync
            </button>
          </form>
          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={exportSettings} className="min-h-11 border border-line px-4 text-sm">
              Export settings
            </button>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-line px-3 text-sm">
              <input type="checkbox" checked={includeKey} onChange={(event) => setIncludeKey(event.target.checked)} />
              Include key
            </label>
            <label className="inline-flex min-h-11 cursor-pointer items-center border border-line px-4 text-sm">
              Import settings
              <input
                type="file"
                accept="application/json"
                className="sr-only"
                onChange={(event) => {
                  void importSettings(event.target.files?.[0]).catch(() => setFormError("That settings file could not be read"));
                }}
              />
            </label>
          </div>
        </div>
      </section>
    </div>
  );
}
