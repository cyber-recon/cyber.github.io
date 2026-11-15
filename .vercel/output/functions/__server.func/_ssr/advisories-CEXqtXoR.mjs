import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, q as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as usePrefs, S as useIntel, i as PageIntro, o as BUILTINS, u as cn, y as shortDate } from "./router-CgiERoNf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/advisories-CEXqtXoR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdvisoriesPage() {
	const intel = useIntel();
	const custom = usePrefs((state) => state.custom);
	const [source, setSource] = (0, import_react.useState)("all");
	const names = (0, import_react.useMemo)(() => {
		const map = new Map(BUILTINS.map((feed) => [feed.id, feed.name]));
		for (const connector of custom) map.set(connector.id, connector.name);
		return map;
	}, [custom]);
	const sources = (0, import_react.useMemo)(() => Array.from(new Set(intel.advisories.map((item) => item.source))), [intel.advisories]);
	const notes = (0, import_react.useMemo)(() => {
		return [...intel.advisories].filter((item) => source === "all" || item.source === source).sort((a, b) => (b.published || "").localeCompare(a.published || ""));
	}, [intel.advisories, source]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Notes",
				title: "Advisories",
				lede: "Cisco, Palo Alto, Unit 42, CISA, NSA, and any RSS connector you add. A note that names one or two CVEs also lands on the vulnerability list."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 overflow-x-auto pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					pressed: source === "all",
					onClick: () => setSource("all"),
					children: "All"
				}), sources.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChip, {
					pressed: source === id,
					onClick: () => setSource(id),
					children: names.get(id) ?? id
				}, id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "divide-y divide-line border-y border-line",
				children: [notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-baseline justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: note.href,
								target: "_blank",
								rel: "noreferrer",
								className: "text-base",
								children: note.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: shortDate(note.published)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs uppercase tracking-widest text-muted",
							children: names.get(note.source) ?? note.source
						}),
						note.summary ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-3xl text-sm text-muted line-clamp-3",
							children: note.summary
						}) : null,
						note.cves.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex flex-wrap gap-2",
							children: note.cves.map((cve) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cve/$id",
								params: { id: cve },
								className: "text-sm text-flame",
								children: cve
							}, cve))
						}) : null
					]
				}, note.id)), !notes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-8 text-sm text-muted",
					children: "No advisories for this source yet."
				}) : null]
			})
		]
	});
}
function FilterChip({ pressed, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: cn("min-h-11 shrink-0 border px-3 text-sm", pressed ? "border-flame bg-flame text-ink" : "border-line"),
		children
	});
}
//#endregion
export { AdvisoriesPage as component };
