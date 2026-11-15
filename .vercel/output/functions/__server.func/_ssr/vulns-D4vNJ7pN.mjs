import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, b as useNavigate, q as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as usePrefs, S as useIntel, b as sortVulns, c as SEVERITIES, f as filterVulns, i as PageIntro, r as Route$3, u as cn } from "./router-CgiERoNf.mjs";
import { t as VulnList } from "./vuln-list-BocR7ai8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vulns-D4vNJ7pN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 25;
function VulnsPage() {
	const search = Route$3.useSearch();
	const navigate = useNavigate({ from: "/vulns" });
	const intel = useIntel();
	const watch = usePrefs((state) => state.watch);
	const custom = usePrefs((state) => state.custom);
	const names = (0, import_react.useMemo)(() => Object.fromEntries(custom.map((item) => [item.id, item.name])), [custom]);
	const [page, setPage] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		setPage(0);
	}, [
		search.q,
		search.sev,
		search.sort,
		search.scope,
		search.kev,
		search.ransom,
		search.watch,
		search.fix,
		watch
	]);
	const rows = (0, import_react.useMemo)(() => sortVulns(filterVulns(intel.vulns, search, watch), search.sort), [
		intel.vulns,
		search,
		watch
	]);
	const slice = rows.slice(page * PAGE, page * PAGE + PAGE);
	const pages = Math.max(1, Math.ceil(rows.length / PAGE));
	const selected = search.sev === "all" ? /* @__PURE__ */ new Set() : new Set(search.sev.split(","));
	function patch(partial) {
		navigate({ search: (prev) => ({
			...prev,
			...partial
		}) });
	}
	function toggleSeverity(severity) {
		if (search.sev === "all") {
			patch({ sev: severity });
			return;
		}
		const next = new Set(selected);
		if (next.has(severity)) next.delete(severity);
		else next.add(severity);
		patch({ sev: next.size === 0 || next.size === SEVERITIES.length ? "all" : Array.from(next).join(",") });
	}
	function download() {
		const header = [
			"cve",
			"title",
			"severity",
			"cvss",
			"epss",
			"published",
			"kev_due",
			"patch",
			"sources"
		];
		const lines = rows.map((vuln) => [
			vuln.id,
			vuln.title,
			vuln.severity,
			vuln.cvss ?? "",
			vuln.epss ?? "",
			vuln.published ?? "",
			vuln.kev?.dueDate ?? "",
			vuln.patch?.state ?? "unknown",
			vuln.sources.join("|")
		].map((cell) => `"${String(cell).replaceAll("\"", "\"\"")}"`).join(","));
		const blob = new Blob([[header.join(","), ...lines].join("\n")], { type: "text/csv" });
		const url = URL.createObjectURL(blob);
		const anchor = document.createElement("a");
		anchor.href = url;
		anchor.download = "lantern-vulns.csv";
		anchor.click();
		URL.revokeObjectURL(url);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "CVE workbench",
				title: "Vulnerabilities",
				lede: "Filter by severity, keep the view on what is exploited or merely likely to be, and open any CVE for the detail.",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: download,
					className: "min-h-11 border border-line px-4 text-sm",
					children: "Export this view"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: search.sev === "all",
					onClick: () => patch({ sev: "all" }),
					children: "All severities"
				}), SEVERITIES.map((severity) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					pressed: search.sev !== "all" && selected.has(severity),
					onClick: () => toggleSeverity(severity),
					children: severity === "UNKNOWN" ? "Unscored" : severity[0] + severity.slice(1).toLowerCase()
				}, severity))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.scope === "active",
						onClick: () => patch({ scope: "active" }),
						children: "Active window"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.scope === "all",
						onClick: () => patch({ scope: "all" }),
						children: "All loaded"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.kev,
						onClick: () => patch({ kev: !search.kev }),
						children: "Exploited"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.ransom,
						onClick: () => patch({ ransom: !search.ransom }),
						children: "Ransomware"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.watch,
						onClick: () => patch({ watch: !search.watch }),
						children: "Watch list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.fix === "yes",
						onClick: () => patch({ fix: search.fix === "yes" ? "any" : "yes" }),
						children: "Patch known"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						pressed: search.fix === "no",
						onClick: () => patch({ fix: search.fix === "no" ? "any" : "no" }),
						children: "No patch"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ml-auto flex min-h-11 items-center gap-2 text-sm text-muted",
						children: ["Sort", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: search.sort,
							onChange: (event) => patch({ sort: event.target.value }),
							className: "h-11 border border-line bg-bg px-2 text-fg",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "published",
									children: "Published"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "modified",
									children: "Modified"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "cvss",
									children: "CVSS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "epss",
									children: "EPSS"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "due",
									children: "KEV due date"
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					rows.length,
					" shown",
					search.q ? ` for “${search.q}”` : "",
					". Active window keeps the last 45 days, KEV from the last 120, and anything critical, high, or due within three weeks."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VulnList, {
				rows: slice,
				watchTerms: watch,
				names
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 px-3 text-sm disabled:opacity-40",
						disabled: page === 0,
						onClick: () => setPage((value) => value - 1),
						children: "Previous"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm tabular-nums text-muted",
						children: [
							page + 1,
							" / ",
							pages
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "min-h-11 px-3 text-sm disabled:opacity-40",
						disabled: page + 1 >= pages,
						onClick: () => setPage((value) => value + 1),
						children: "Next"
					})
				]
			})
		]
	});
}
function Chip({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: cn("min-h-11 border px-3 text-sm", pressed ? "border-flame bg-flame text-ink" : "border-line text-fg"),
		children
	});
}
//#endregion
export { VulnsPage as component };
