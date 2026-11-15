import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, q as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as usePrefs, S as useIntel, a as fieldClass, i as PageIntro, o as BUILTINS, s as FEED_GROUPS } from "./router-CgiERoNf.mjs";
import { t as Lamp } from "./marks-l87EV4c-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/connectors-C_8GfJtt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
	const [name, setName] = (0, import_react.useState)("");
	const [url, setUrl] = (0, import_react.useState)("");
	const [format, setFormat] = (0, import_react.useState)("json");
	const [formError, setFormError] = (0, import_react.useState)("");
	const [includeKey, setIncludeKey] = (0, import_react.useState)(false);
	const [keyDraft, setKeyDraft] = (0, import_react.useState)(nvdKey);
	const [relayDraft, setRelayDraft] = (0, import_react.useState)(relayBase);
	(0, import_react.useEffect)(() => {
		setKeyDraft(nvdKey);
		setRelayDraft(relayBase);
	}, [nvdKey, relayBase]);
	function addConnector(event) {
		event.preventDefault();
		setFormError("");
		try {
			if (new URL(url).protocol !== "https:") throw new Error("Use an https URL");
			if (!name.trim()) throw new Error("Name the connector");
			addCustom({
				name,
				format,
				url
			});
			setName("");
			setUrl("");
			intel.refresh();
		} catch (error) {
			setFormError(error instanceof Error ? error.message : "Could not add that connector");
		}
	}
	function exportSettings() {
		const state = usePrefs.getState();
		const blob = new Blob([JSON.stringify({
			disabled: state.disabled,
			custom: state.custom,
			relayBase: state.relayBase,
			watch: state.watch,
			pins: state.pins,
			refreshMin: state.refreshMin,
			boardLayout: state.boardLayout,
			...includeKey && state.nvdKey ? { nvdKey: state.nvdKey } : {}
		}, null, 2)], { type: "application/json" });
		const href = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = href;
		anchor.download = "lantern-settings.json";
		anchor.click();
		URL.revokeObjectURL(href);
	}
	async function importSettings(file) {
		if (!file) return;
		const data = JSON.parse(await file.text());
		importPrefs({
			disabled: Array.isArray(data.disabled) ? data.disabled.filter((item) => typeof item === "string") : void 0,
			custom: Array.isArray(data.custom) ? data.custom : void 0,
			nvdKey: typeof data.nvdKey === "string" ? data.nvdKey : void 0,
			relayBase: typeof data.relayBase === "string" ? data.relayBase : void 0,
			watch: Array.isArray(data.watch) ? data.watch.filter((item) => typeof item === "string") : void 0,
			pins: Array.isArray(data.pins) ? data.pins.filter((item) => typeof item === "string") : void 0,
			refreshMin: data.refreshMin === 0 || data.refreshMin === 5 || data.refreshMin === 15 || data.refreshMin === 30 ? data.refreshMin : void 0,
			boardLayout: data.boardLayout && typeof data.boardLayout === "object" ? data.boardLayout : void 0
		});
		intel.refresh();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Sources",
				title: "Connectors",
				lede: "Stack queries, government lists, vendor advisories, and two pictures of the internet. Keys stay in this browser. Export leaves the NVD key out unless you opt in.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: intel.refresh,
					disabled: intel.syncing,
					className: "min-h-11 border border-line px-4 text-sm disabled:opacity-60",
					children: intel.syncing ? "Syncing" : "Resync"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-8",
				children: FEED_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-mono text-xs uppercase tracking-widest text-muted",
					children: group.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 divide-y divide-line border-y border-line",
					children: BUILTINS.filter((feed) => feed.group === group.id).map((feed) => {
						const status = intel.statuses.find((item) => item.id === feed.id);
						const off = disabled.includes(feed.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { state: off ? "idle" : status?.state ?? "idle" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "text-base",
											children: feed.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-mono text-xs uppercase tracking-widest text-muted",
											children: feed.agency
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 max-w-2xl text-sm text-muted",
									children: feed.blurb
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted",
									children: off ? "Off" : status?.message ?? "Idle"
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": !off,
								onClick: () => setDisabled(feed.id, !off),
								className: "min-h-11 min-w-20 border border-line px-3 text-sm",
								children: off ? "Off" : "On"
							})]
						}, feed.id);
					})
				})] }, group.id))
			}),
			custom.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: "Custom"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 divide-y divide-line border-y border-line",
				children: custom.map((connector) => {
					const status = intel.statuses.find((item) => item.id === connector.id);
					const off = disabled.includes(connector.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid gap-3 py-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { state: off ? "idle" : status?.state ?? "idle" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base",
										children: connector.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-xs uppercase tracking-widest text-muted",
										children: connector.format
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 truncate text-sm text-muted",
								children: connector.url
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted",
								children: off ? "Off" : status?.message ?? "Waiting"
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": !off,
								onClick: () => setDisabled(connector.id, !off),
								className: "min-h-11 border border-line px-3 text-sm",
								children: off ? "Off" : "On"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									removeCustom(connector.id);
									intel.forget(connector.id);
								},
								className: "min-h-11 border border-line px-3 text-sm",
								children: "Remove"
							})]
						})]
					}, connector.id);
				})
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-8 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: addConnector,
					className: "space-y-3 border border-line bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-2xl",
							children: "Custom connector"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "The URL has to answer the browser directly, with CORS open. JSON can be a CVE list or a KEV-shaped catalog. RSS and CSV need a CVE column or CVE ids in the text."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: name,
								onChange: (event) => setName(event.target.value),
								className: fieldClass("mt-1 w-full")
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["Format", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: format,
								onChange: (event) => setFormat(event.target.value),
								className: fieldClass("mt-1 w-full"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "json",
										children: "JSON"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "rss",
										children: "RSS or Atom"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "csv",
										children: "CSV"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "block text-sm",
							children: ["URL", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: url,
								onChange: (event) => setUrl(event.target.value),
								placeholder: "https://example.com/cves.json",
								className: fieldClass("mt-1 w-full")
							})]
						}),
						formError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-flame",
							children: formError
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							className: "min-h-11 bg-flame px-4 text-sm text-ink",
							children: "Add and sync"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "space-y-3 border border-line p-4",
						onSubmit: (event) => {
							event.preventDefault();
							setNvdKey(keyDraft.trim());
							setRelayBase(relayDraft.trim() || "/api/relay");
							intel.refresh();
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl",
								children: "NVD key"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "NIST does not allow an API key to be shared, and a key shipped in a public site — including a GitHub Pages repo — can be copied and will be revoked. Leave this blank on the team board. The public rate limit is enough; stack queries wait their turn. A personal key stays in this browser and is sent only to nvd.nist.gov."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Personal key, optional", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: keyDraft,
									onChange: (event) => setKeyDraft(event.target.value),
									type: "password",
									autoComplete: "off",
									spellCheck: false,
									className: fieldClass("mt-1 w-full")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-sm",
								children: ["Relay base", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: relayDraft,
									onChange: (event) => setRelayDraft(event.target.value),
									className: fieldClass("mt-1 w-full")
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Feeds that block a browser are read through this host when the board is served with a relay. A pure github.io copy has no relay, so those feeds keep the last copy saved in the browser. Point this at an https service you control that accepts ?feed= and the feed id, if you later host the page yourself."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "min-h-11 border border-line px-4 text-sm",
								children: "Save and resync"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: exportSettings,
								className: "min-h-11 border border-line px-4 text-sm",
								children: "Export settings"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex min-h-11 cursor-pointer items-center gap-2 border border-line px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: includeKey,
									onChange: (event) => setIncludeKey(event.target.checked)
								}), "Include key"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "inline-flex min-h-11 cursor-pointer items-center border border-line px-4 text-sm",
								children: ["Import settings", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "application/json",
									className: "sr-only",
									onChange: (event) => {
										importSettings(event.target.files?.[0]).catch(() => setFormError("That settings file could not be read"));
									}
								})]
							})
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { ConnectorsPage as component };
