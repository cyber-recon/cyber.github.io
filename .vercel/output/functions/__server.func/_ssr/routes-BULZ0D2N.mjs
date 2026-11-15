import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, q as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as usePrefs, S as useIntel, T as wireScore, _ as patchOf, a as fieldClass, d as dueState, g as matchesWatch, h as groupDigits, l as STACK_PRODUCTS, m as formatEpss, o as BUILTINS, u as cn, v as priorityScore, w as utcDay, x as sourceLabel, y as shortDate } from "./router-CgiERoNf.mjs";
import { i as SourceMarks, n as PatchMark, r as SeverityMark, t as Lamp } from "./marks-l87EV4c-.mjs";
import { n as to, r as xn, t as dn } from "../_libs/react-resizable-panels.mjs";
import { n as naturalEarth1, t as index } from "../_libs/d3-geo.mjs";
import { t as feature_default } from "../_libs/topojson-client.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BULZ0D2N.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ATLAS = "https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json";
var ISO = "https://cdn.jsdelivr.net/gh/lukes/ISO-3166-Countries-with-Regional-Codes@master/all/all.json";
var COPY = {
	"sans-map": {
		label: "DShield",
		title: "Reported attack sources",
		body: "Unique addresses SANS sensors logged, and how many reports they filed. Not traffic against your network. Countries with more sensors look louder.",
		primary: "Sources",
		secondary: "Reports"
	},
	feodo: {
		label: "Feodo",
		title: "Botnet controllers",
		body: "Live botnet command servers by the country they are hosted in. Controllers, not victims and not packets.",
		primary: "Controllers",
		secondary: null
	}
};
function ThreatMap({ sightings, mode, available, onMode }) {
	const copy = COPY[mode] ?? COPY["sans-map"];
	const [geo, setGeo] = (0, import_react.useState)(null);
	const [iso, setIso] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
	const [names, setNames] = (0, import_react.useState)(() => /* @__PURE__ */ new Map());
	const [failed, setFailed] = (0, import_react.useState)(false);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [locked, setLocked] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancel = false;
		(async () => {
			try {
				const [atlasRes, isoRes] = await Promise.all([fetch(ATLAS), fetch(ISO)]);
				if (!atlasRes.ok || !isoRes.ok) throw new Error("map");
				const atlas = await atlasRes.json();
				const collection = feature_default(atlas, atlas.objects?.countries);
				const codes = await isoRes.json();
				const numeric = /* @__PURE__ */ new Map();
				const alpha = /* @__PURE__ */ new Map();
				for (const row of codes) {
					if (!row["alpha-2"] || !row["country-code"]) continue;
					const code = row["alpha-2"].toUpperCase();
					numeric.set(String(Number(row["country-code"])), code);
					if (row.name) alpha.set(code, row.name);
				}
				if (!cancel) {
					setGeo(collection);
					setIso(numeric);
					setNames(alpha);
				}
			} catch {
				if (!cancel) setFailed(true);
			}
		})();
		return () => {
			cancel = true;
		};
	}, []);
	const byCountry = (0, import_react.useMemo)(() => new Map(sightings.map((row) => [row.country, row])), [sightings]);
	const max = Math.max(1, ...sightings.map((row) => row.sources));
	const total = sightings.reduce((sum, row) => sum + row.sources, 0) || 1;
	const top = (0, import_react.useMemo)(() => [...sightings].sort((a, b) => b.sources - a.sources).slice(0, 8), [sightings]);
	const focusCode = hover ?? locked;
	const focus = focusCode ? byCountry.get(focusCode) : void 0;
	const pathOf = (0, import_react.useMemo)(() => {
		if (!geo) return null;
		const projection = naturalEarth1().fitSize([640, 320], geo);
		return index(projection);
	}, [geo]);
	function countryName(code) {
		return names.get(code) ?? code;
	}
	function select(code) {
		setLocked((current) => current === code ? null : code);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-line px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: sightings.length ? copy.title : "Where noise on the internet is coming from"
				}), available.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					role: "group",
					"aria-label": "Map source",
					children: available.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": id === mode,
						onClick: () => {
							setHover(null);
							setLocked(null);
							onMode(id);
						},
						className: cn("min-h-11 border px-3 text-sm", id === mode ? "border-flame text-flame" : "border-line text-muted"),
						children: COPY[id]?.label ?? id
					}, id))
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-3xl text-sm text-muted",
				children: sightings.length ? copy.body : "Two public pictures. DShield is attack sources seen by SANS sensors. Feodo is botnet command servers by the country they are hosted in. Neither is a live intercept of your network."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 flex-1 flex-col gap-3 p-3 lg:flex-row",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				onMouseLeave: () => setHover(null),
				children: [geo && pathOf && sightings.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					viewBox: "0 0 640 320",
					className: "mx-auto h-64 w-auto max-w-full",
					role: "img",
					"aria-label": copy.title,
					children: geo.features.map((item, index) => {
						const d = pathOf(item) || "";
						const alpha = iso.get(String(Number(item.id))) ?? "";
						const hit = byCountry.get(alpha);
						const mix = hit ? Math.max(18, Math.round(Math.sqrt(hit.sources / max) * 100)) : 0;
						const active = alpha && alpha === focusCode;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d,
							className: hit ? "cursor-pointer" : void 0,
							fill: hit ? `color-mix(in srgb, var(--color-flame) ${Math.min(mix, 92)}%, var(--color-raised))` : "var(--color-raised)",
							stroke: active ? "var(--color-flame)" : "var(--color-bg)",
							strokeWidth: active ? 1.4 : .6,
							onMouseEnter: () => {
								if (hit) setHover(alpha);
							},
							onClick: () => {
								if (hit) select(alpha);
							},
							children: hit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${countryName(alpha)}: ${groupDigits(hit.sources)} ${copy.primary.toLowerCase()}` }) : null
						}, String(item.id ?? index));
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-8 text-sm text-muted",
					children: failed ? "Chart geometry did not load. Counts are listed when a feed answers." : sightings.length ? "Loading the chart." : "Waiting on DShield or Feodo. The list fills in when a feed answers."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-center gap-3 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quiet" }),
						[
							18,
							40,
							65,
							88
						].map((mix) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block h-2 w-6",
							style: { background: `color-mix(in srgb, var(--color-flame) ${mix}%, var(--color-raised))` }
						}, mix)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loud" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "basis-full",
							children: [
								"Darker means a larger share of ",
								copy.primary.toLowerCase(),
								". Select a country for the exact count."
							]
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full shrink-0 lg:w-52",
				children: [focus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 border border-line bg-bg px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: countryName(focus.country)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-mono text-xs text-muted",
							children: [
								copy.primary,
								" ",
								groupDigits(focus.sources),
								" · ",
								Math.round(focus.sources / total * 100),
								"%"
							]
						}),
						copy.secondary ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-mono text-xs text-muted",
							children: [
								copy.secondary,
								" ",
								groupDigits(focus.reports)
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: locked === focus.country ? "Pinned. Select again to clear." : "Hovering. Select to pin."
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-xs text-muted",
					children: "No country selected."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "space-y-1",
					children: [top.map((row, index) => {
						const width = Math.max(8, Math.round(row.sources / max * 100));
						const active = row.country === focusCode;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => select(row.country),
							onMouseEnter: () => setHover(row.country),
							onMouseLeave: () => setHover(null),
							className: cn("w-full px-1 py-1 text-left", active ? "bg-raised" : void 0),
							"aria-pressed": locked === row.country,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-baseline justify-between gap-3 font-mono text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									index + 1,
									" ",
									countryName(row.country)
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-muted",
									children: groupDigits(row.sources)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block h-1 bg-line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block h-1 bg-flame",
									style: { width: `${width}%` }
								})
							})]
						}) }, row.country);
					}), !top.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-xs text-muted",
						children: "No country counts yet."
					}) : null]
				})]
			})]
		})]
	});
}
var VULN_SEARCH = {
	q: "",
	sev: "all",
	sort: "published",
	scope: "active",
	kev: false,
	ransom: false,
	watch: true,
	fix: "any"
};
function useWide() {
	const [wide, setWide] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const query = window.matchMedia("(min-width: 1024px)");
		const apply = () => setWide(query.matches);
		apply();
		query.addEventListener("change", apply);
		return () => query.removeEventListener("change", apply);
	}, []);
	return wide;
}
function usePrefsHydrated() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (usePrefs.persist.hasHydrated()) setHydrated(true);
		return usePrefs.persist.onFinishHydration(() => setHydrated(true));
	}, []);
	return hydrated;
}
function OpsBoard() {
	const intel = useIntel();
	const watch = usePrefs((state) => state.watch);
	const refreshMin = usePrefs((state) => state.refreshMin);
	const boardLayout = usePrefs((state) => state.boardLayout);
	const setRefreshMin = usePrefs((state) => state.setRefreshMin);
	const setBoardLayout = usePrefs((state) => state.setBoardLayout);
	const custom = usePrefs((state) => state.custom);
	const names = (0, import_react.useMemo)(() => Object.fromEntries(custom.map((item) => [item.id, item.name])), [custom]);
	const hydrated = usePrefsHydrated();
	const wide = useWide();
	const [layoutKey, setLayoutKey] = (0, import_react.useState)(0);
	const [mapMode, setMapMode] = (0, import_react.useState)("sans-map");
	const terms = watch.length ? watch : STACK_PRODUCTS.flatMap((product) => [...product.terms]);
	const stackHits = (0, import_react.useMemo)(() => [...intel.vulns].filter((vuln) => matchesWatch(vuln, terms)).sort((a, b) => priorityScore(b) - priorityScore(a)), [intel.vulns, terms]);
	const queue = (stackHits.length ? stackHits : [...intel.vulns].sort((a, b) => priorityScore(b) - priorityScore(a))).slice(0, 10);
	const wire = (0, import_react.useMemo)(() => {
		return [...intel.advisories].map((note) => ({
			note,
			score: wireScore(note, terms)
		})).filter((item) => item.score > 0).sort((a, b) => b.score - a.score || (b.note.published || "").localeCompare(a.note.published || "")).slice(0, 18);
	}, [intel.advisories, terms]);
	const ticker = wire.slice(0, 12);
	const saved = boardLayout && Object.keys(boardLayout.columns).length ? boardLayout : void 0;
	const mapIds = intel.pictures.map((item) => item.id);
	const activeMap = mapIds.includes(mapMode) ? mapMode : mapIds[0] ?? "sans-map";
	const mapPoints = intel.pictures.find((item) => item.id === activeMap)?.points ?? [];
	const kevRows = (0, import_react.useMemo)(() => intel.vulns.filter((vuln) => vuln.kev), [intel.vulns]);
	const kevRecent = kevRows.filter((vuln) => (vuln.kev?.dateAdded ?? "") >= utcDay(-30)).length;
	const kevDue = kevRows.filter((vuln) => matchesWatch(vuln, terms) && ["overdue", "soon"].includes(dueState(vuln.kev?.dueDate))).length;
	const kevOpen = kevRows.filter((vuln) => patchOf(vuln).state === "no").length;
	function onLayoutChanged(layout) {
		setBoardLayout(layout);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: "Ops floor"
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "font-mono text-xs uppercase tracking-widest text-muted",
							children: ["Auto", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: refreshMin,
								onChange: (event) => setRefreshMin(Number(event.target.value)),
								className: fieldClass("ml-2 font-sans"),
								"aria-label": "Auto refresh",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 5,
										children: "5 min"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 15,
										children: "15 min"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 30,
										children: "30 min"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 0,
										children: "Manual"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setBoardLayout(null);
								setLayoutKey((value) => value + 1);
							},
							className: "min-h-11 border border-line px-3 text-sm",
							children: "Reset layout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: intel.refresh,
							disabled: intel.syncing,
							className: "min-h-11 bg-flame px-4 text-sm text-ink disabled:opacity-60",
							children: intel.syncing ? "Syncing" : "Resync"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:grid-cols-4",
				"aria-label": "Stack",
				children: STACK_PRODUCTS.map((product) => {
					const hits = intel.vulns.filter((vuln) => matchesWatch(vuln, [...product.terms]));
					const exploited = hits.filter((vuln) => vuln.kev).length;
					const top = [...hits].sort((a, b) => priorityScore(b) - priorityScore(a))[0];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/watch",
						className: "bg-surface px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-xs uppercase tracking-widest text-muted",
								children: product.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xl font-semibold tracking-tight",
								children: product.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-mono text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "block",
									children: [
										hits.length,
										" loaded · ",
										exploited,
										" exploited"
									]
								}), top ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block",
									children: top.id
								}) : null]
							})
						]
					}, product.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "border border-line bg-surface",
				"aria-label": "CISA Known Exploited Vulnerabilities",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-line px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-3xl text-sm text-muted",
						children: "CISA known exploited. Evidence of use in the wild. Due dates are a remediation clock, not a patch date."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vulns",
						search: {
							...VULN_SEARCH,
							kev: true,
							watch: false,
							scope: "all",
							sort: "due"
						},
						className: "text-sm text-flame",
						children: "Open the catalog"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-px bg-line sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KevStat, {
							label: "Catalog",
							value: intel.kevCount ? intel.kevCount.toLocaleString() : String(kevRows.length),
							note: intel.kevCatalog ?? "Loaded copy",
							href: {
								...VULN_SEARCH,
								kev: true,
								watch: false,
								scope: "all",
								sort: "due"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KevStat, {
							label: "Added in 30 days",
							value: String(kevRecent),
							note: "New catalog entries",
							href: {
								...VULN_SEARCH,
								kev: true,
								watch: false,
								scope: "active",
								sort: "published"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KevStat, {
							label: "Due on watch",
							value: String(kevDue),
							note: "Overdue or inside 14 days",
							href: {
								...VULN_SEARCH,
								kev: true,
								watch: true,
								scope: "all",
								sort: "due"
							}
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(KevStat, {
							label: "No patch",
							value: String(kevOpen),
							note: "A source said no fix yet",
							href: {
								...VULN_SEARCH,
								kev: true,
								watch: false,
								scope: "all",
								sort: "due",
								fix: "no"
							}
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ticker, { items: ticker.map((item) => ({
				id: item.note.id,
				title: item.note.title,
				href: item.note.href,
				source: sourceLabel(item.note.source, names)
			})) }),
			hydrated && wide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-board",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(to, {
					columns: [{
						id: "main",
						minSize: 320,
						defaultSize: "58%"
					}, {
						id: "side",
						minSize: 280
					}],
					rows: [{
						id: "upper",
						minSize: 120,
						defaultSize: "56%"
					}, {
						id: "lower",
						minSize: 120
					}],
					defaultLayout: saved,
					onLayoutChanged,
					className: "h-full",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(xn, {
							column: 0,
							row: 0,
							className: "min-h-0 min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								title: "Priority",
								meta: stackHits.length ? "Stack first" : "No stack match yet",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Queue, {
									rows: queue,
									names,
									stacked: stackHits.length > 0
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(xn, {
							column: 1,
							row: 0,
							className: "min-h-0 min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								title: "Origins",
								meta: activeMap === "feodo" ? "Feodo C2" : mapPoints.length ? "DShield" : "Waiting",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreatMap, {
									sightings: mapPoints,
									mode: activeMap,
									available: mapIds.length ? mapIds : ["sans-map"],
									onMode: setMapMode
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(xn, {
							column: 0,
							row: 1,
							className: "min-h-0 min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								title: "Wire",
								meta: `${wire.length} kept`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wire, {
									notes: wire.map((item) => item.note),
									names
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(xn, {
							column: 1,
							row: 1,
							className: "min-h-0 min-w-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
								title: "Feeds",
								meta: intel.syncing ? "Syncing" : shortDate(intel.refreshedAt),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedHealth, {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(dn, {
							type: "column",
							column: 1,
							className: "bg-line"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(dn, {
							type: "row",
							row: 1,
							className: "bg-line"
						})
					]
				}, layoutKey)
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						title: "Priority",
						meta: stackHits.length ? "Stack first" : "Floor",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Queue, {
							rows: queue,
							names,
							stacked: stackHits.length > 0
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						title: "Origins",
						meta: activeMap === "feodo" ? "Feodo C2" : mapPoints.length ? "DShield" : "Waiting",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThreatMap, {
							sightings: mapPoints,
							mode: activeMap,
							available: mapIds.length ? mapIds : ["sans-map"],
							onMode: setMapMode
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						title: "Wire",
						meta: `${wire.length} kept`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wire, {
							notes: wire.map((item) => item.note),
							names
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Frame, {
						title: "Feeds",
						meta: shortDate(intel.refreshedAt),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FeedHealth, {})
					})
				]
			})
		]
	});
}
function KevStat({ label, value, note, href }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/vulns",
		search: href,
		className: "bg-surface px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xl font-semibold tracking-tight tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-mono text-xs text-muted",
				children: note
			})
		]
	});
}
function Frame({ title, meta, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "flex h-full min-h-64 flex-col border border-line bg-surface",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex items-center justify-between gap-3 border-b border-line px-3 py-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-mono text-xs uppercase tracking-widest text-muted",
				children: title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-muted",
				children: meta
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-h-0 flex-1 overflow-auto",
			children
		})]
	});
}
function Queue({ rows, names, stacked }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-muted",
		children: "No records in this copy yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
		className: "divide-y divide-line",
		children: [rows.map((vuln) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/cve/$id",
			params: { id: vuln.id },
			className: "grid gap-1 px-3 py-3 sm:grid-cols-[9rem_minmax(0,1fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-sm",
				children: vuln.id
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block truncate text-sm",
					children: vuln.title === vuln.id ? "No title published" : vuln.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-1 flex flex-wrap items-center gap-x-3 gap-y-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: vuln.severity }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatchMark, { vuln }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMarks, {
							sources: vuln.sources,
							names
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-muted",
							children: vuln.kev ? `Due ${shortDate(vuln.kev.dueDate)}` : formatEpss(vuln.epss)
						})
					]
				})]
			})]
		}) }, vuln.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "px-3 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/vulns",
				search: stacked ? VULN_SEARCH : {
					...VULN_SEARCH,
					watch: false
				},
				className: "text-sm text-flame",
				children: stacked ? "All stack matches" : "Full list"
			})
		})]
	});
}
function Wire({ notes, names }) {
	if (!notes.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "p-4 text-sm text-muted",
		children: "No operational notes yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "divide-y divide-line",
		children: [notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "px-3 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: note.href,
				target: "_blank",
				rel: "noreferrer",
				className: "text-sm",
				children: note.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 font-mono text-xs text-muted",
				children: [
					sourceLabel(note.source, names),
					" · ",
					shortDate(note.published),
					note.cves[0] ? ` · ${note.cves[0]}` : ""
				]
			})]
		}, note.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "px-3 py-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/advisories",
				className: "text-sm text-flame",
				children: "All notes"
			})
		})]
	});
}
function FeedHealth() {
	const intel = useIntel();
	const disabled = usePrefs((state) => state.disabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid gap-x-4 sm:grid-cols-2",
			children: BUILTINS.map((feed) => {
				const status = intel.statuses.find((item) => item.id === feed.id);
				const off = disabled.includes(feed.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 border-b border-line/70 py-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lamp, { state: off ? "idle" : status?.state ?? "idle" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm",
							children: feed.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-mono text-xs text-muted",
							children: off ? "Off" : status?.message ?? "Idle"
						})]
					})]
				}, feed.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-xs text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/connectors",
				className: "text-flame",
				children: "Add or mute a feed"
			}), intel.kevCount ? ` · KEV catalog ${intel.kevCount.toLocaleString()}` : ""]
		})]
	});
}
function Ticker({ items }) {
	if (items.length < 2) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ticker overflow-hidden border border-line bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ticker-track flex w-max",
			children: [0, 1].map((copy) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-8 px-4 py-2",
				"aria-hidden": copy === 1 ? true : void 0,
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: item.href,
					target: "_blank",
					rel: "noreferrer",
					className: "whitespace-nowrap font-mono text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: item.source
						}),
						" ",
						item.title
					]
				}, `${copy}-${item.id}`))
			}, copy))
		})
	});
}
var SplitComponent = OpsBoard;
//#endregion
export { SplitComponent as component };
