import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BUILTINS } from "@/lib/intel/catalog";

export type ConnectorFormat = "json" | "rss" | "csv";

export type CustomConnector = {
  id: string;
  name: string;
  format: ConnectorFormat;
  url: string;
  enabled: boolean;
};

export type BoardLayout = {
  columns: Record<string, number>;
  rows: Record<string, number>;
};

export type RefreshMin = 0 | 5 | 15 | 30;

type PrefsState = {
  disabled: string[];
  custom: CustomConnector[];
  nvdKey: string;
  relayBase: string;
  watch: string[];
  pins: string[];
  stackSeeded: boolean;
  refreshMin: RefreshMin;
  boardLayout: BoardLayout | null;
  setDisabled: (id: string, off: boolean) => void;
  addCustom: (input: { name: string; format: ConnectorFormat; url: string }) => string;
  removeCustom: (id: string) => void;
  setNvdKey: (key: string) => void;
  setRelayBase: (value: string) => void;
  addWatch: (term: string) => void;
  removeWatch: (term: string) => void;
  togglePin: (id: string) => void;
  setRefreshMin: (value: RefreshMin) => void;
  setBoardLayout: (layout: BoardLayout | null) => void;
  importPrefs: (
    data: Partial<Pick<PrefsState, "disabled" | "custom" | "nvdKey" | "relayBase" | "watch" | "pins" | "refreshMin" | "boardLayout">>,
  ) => void;
};

export const usePrefs = create<PrefsState>()(
  persist(
    (set) => ({
      disabled: [],
      custom: [],
      nvdKey: "",
      relayBase: "/api/relay",
      watch: [],
      pins: [],
      stackSeeded: false,
      refreshMin: 15,
      boardLayout: null,
      setDisabled: (id, off) =>
        set((state) => ({
          disabled: off ? Array.from(new Set([...state.disabled, id])) : state.disabled.filter((item) => item !== id),
        })),
      addCustom: (input) => {
        const id = `c_${Math.random().toString(36).slice(2, 10)}`;
        set((state) => ({
          custom: [
            ...state.custom,
            { id, name: input.name.trim(), format: input.format, url: input.url.trim(), enabled: true },
          ],
        }));
        return id;
      },
      removeCustom: (id) => set((state) => ({ custom: state.custom.filter((item) => item.id !== id) })),
      setNvdKey: (nvdKey) => set({ nvdKey }),
      setRelayBase: (relayBase) => set({ relayBase }),
      addWatch: (term) =>
        set((state) => {
          const clean = term.trim();
          if (!clean) return state;
          if (state.watch.some((item) => item.toLowerCase() === clean.toLowerCase())) return state;
          return { watch: [...state.watch, clean] };
        }),
      removeWatch: (term) => set((state) => ({ watch: state.watch.filter((item) => item !== term) })),
      togglePin: (id) =>
        set((state) => ({
          pins: state.pins.includes(id) ? state.pins.filter((item) => item !== id) : [id, ...state.pins],
        })),
      setRefreshMin: (refreshMin) => set({ refreshMin }),
      setBoardLayout: (boardLayout) => set({ boardLayout }),
      importPrefs: (data) =>
        set((state) => ({
          disabled: Array.isArray(data.disabled) ? data.disabled.filter((item) => typeof item === "string") : state.disabled,
          custom: Array.isArray(data.custom) ? data.custom.filter(isCustom) : state.custom,
          nvdKey: typeof data.nvdKey === "string" ? data.nvdKey : state.nvdKey,
          relayBase: typeof data.relayBase === "string" && data.relayBase.trim() ? data.relayBase : state.relayBase,
          watch: Array.isArray(data.watch) ? data.watch.filter((item) => typeof item === "string") : state.watch,
          pins: Array.isArray(data.pins) ? data.pins.filter((item) => typeof item === "string") : state.pins,
          refreshMin: asRefresh(data.refreshMin, state.refreshMin),
          boardLayout: data.boardLayout === null ? null : isLayout(data.boardLayout) ? data.boardLayout : state.boardLayout,
        })),
    }),
    { name: "lantern-prefs-v1", skipHydration: true },
  ),
);

function isCustom(value: unknown): value is CustomConnector {
  if (!value || typeof value !== "object") return false;
  const record = value as CustomConnector;
  return (
    typeof record.id === "string" &&
    typeof record.name === "string" &&
    (record.format === "json" || record.format === "rss" || record.format === "csv") &&
    typeof record.url === "string" &&
    typeof record.enabled === "boolean"
  );
}

function isNumMap(value: unknown): value is Record<string, number> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((item) => typeof item === "number" && Number.isFinite(item));
}

function isLayout(value: unknown): value is BoardLayout {
  if (!value || typeof value !== "object") return false;
  const record = value as BoardLayout;
  return isNumMap(record.columns) && isNumMap(record.rows);
}

function asRefresh(value: unknown, fallback: RefreshMin): RefreshMin {
  return value === 0 || value === 5 || value === 15 || value === 30 ? value : fallback;
}

export function enabledSet(disabled: string[], custom: CustomConnector[]): Set<string> {
  const set = new Set<string>();
  for (const feed of BUILTINS) {
    if (!disabled.includes(feed.id)) set.add(feed.id);
  }
  for (const connector of custom) {
    if (connector.enabled && !disabled.includes(connector.id)) set.add(connector.id);
  }
  return set;
}
