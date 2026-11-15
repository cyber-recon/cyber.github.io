import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, q as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as usePrefs, S as useIntel, a as fieldClass, g as matchesWatch, i as PageIntro, l as STACK_PRODUCTS } from "./router-CgiERoNf.mjs";
import { t as VulnList } from "./vuln-list-BocR7ai8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/watch-DBNLcC2q.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WatchPage() {
	const watch = usePrefs((state) => state.watch);
	const pins = usePrefs((state) => state.pins);
	const addWatch = usePrefs((state) => state.addWatch);
	const removeWatch = usePrefs((state) => state.removeWatch);
	const togglePin = usePrefs((state) => state.togglePin);
	const intel = useIntel();
	const [draft, setDraft] = (0, import_react.useState)("");
	const names = (0, import_react.useMemo)(() => Object.fromEntries(usePrefs.getState().custom.map((item) => [item.id, item.name])), []);
	const matches = (0, import_react.useMemo)(() => intel.vulns.filter((vuln) => matchesWatch(vuln, watch)), [intel.vulns, watch]);
	const pinned = intel.vulns.filter((vuln) => pins.includes(vuln.id));
	function onSubmit(event) {
		event.preventDefault();
		addWatch(draft);
		setDraft("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageIntro, {
				eyebrow: "Your stack",
				title: "Watch",
				lede: "A term matches a vendor, product, or word on a loaded CVE. Presets cover the workstations and hypervisors, plus Red Hat, PAN-OS, and Cisco."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "sr-only",
						htmlFor: "watch-term",
						children: "Watch term"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: "watch-term",
						value: draft,
						onChange: (event) => setDraft(event.target.value),
						placeholder: "PAN-OS",
						className: fieldClass("w-full sm:w-64")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						className: "min-h-11 bg-flame px-4 text-sm text-ink",
						children: "Add term"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: STACK_PRODUCTS.map((product) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						for (const term of product.terms) addWatch(term);
					},
					className: "min-h-11 border border-line px-3 text-sm",
					children: ["Add ", product.label]
				}, product.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "flex flex-wrap gap-2",
				children: [watch.map((term) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => removeWatch(term),
					className: "min-h-11 border border-line px-3 text-sm",
					children: [
						term,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Remove"
						})
					]
				}) }, term)), !watch.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted",
					children: "No terms yet."
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Matches"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: watch.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VulnList, {
					rows: matches.slice(0, 40),
					watchTerms: watch,
					names
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Add a term to search the loaded set."
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Pinned"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 divide-y divide-line border-y border-line",
				children: [pins.map((id) => {
					const vuln = pinned.find((item) => item.id === id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between gap-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							children: id
						}), vuln && vuln.title !== id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-sm text-muted",
							children: vuln.title
						}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => togglePin(id),
							className: "min-h-11 px-3 text-sm text-muted",
							children: "Unpin"
						})]
					}, id);
				}), !pins.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "py-4 text-sm text-muted",
					children: "Pin a CVE from its page. Pins stay on this browser."
				}) : null]
			})] })
		]
	});
}
//#endregion
export { WatchPage as component };
