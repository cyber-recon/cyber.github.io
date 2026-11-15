import { q as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as dueState, g as matchesWatch, m as formatEpss, p as formatCvss, y as shortDate } from "./router-CgiERoNf.mjs";
import { i as SourceMarks, n as PatchMark, r as SeverityMark } from "./marks-l87EV4c-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vuln-list-BocR7ai8.js
var import_jsx_runtime = require_jsx_runtime();
function VulnList({ rows, watchTerms = [], names }) {
	if (!rows.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "border border-line bg-surface px-4 py-8 text-muted",
		children: "Nothing in this cut of the floor."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "hidden md:block",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full border-collapse text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line text-xs uppercase tracking-widest text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-4 font-medium",
						children: "CVE"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-4 font-medium",
						children: "Issue"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-4 font-medium",
						children: "Severity"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-4 font-medium",
						children: "CVSS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-4 font-medium",
						children: "EPSS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 pr-4 font-medium",
						children: "When"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "py-3 font-medium",
						children: "Sources"
					})
				]
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((vuln) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-b border-line transition-colors duration-150 hover:bg-surface",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-3 pr-4 align-top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cve/$id",
							params: { id: vuln.id },
							className: "font-display text-lg leading-tight",
							children: vuln.id
						}), matchesWatch(vuln, watchTerms) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-flame",
							children: "Watch"
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "max-w-sm py-3 pr-4 align-top text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: vuln.title === vuln.id ? "No title published" : vuln.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { vuln })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "py-3 pr-4 align-top",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: vuln.severity }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatchMark, { vuln })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 align-top text-sm tabular-nums",
						children: formatCvss(vuln.cvss)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 align-top text-sm tabular-nums",
						children: formatEpss(vuln.epss)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 pr-4 align-top text-sm text-muted",
						children: vuln.kev ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Due, {
							due: vuln.kev.dueDate,
							added: vuln.kev.dateAdded
						}) : shortDate(vuln.published)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "py-3 align-top",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMarks, {
							sources: vuln.sources,
							names
						})
					})
				]
			}, vuln.id)) })]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "divide-y divide-line border-y border-line md:hidden",
		children: rows.map((vuln) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/cve/$id",
			params: { id: vuln.id },
			className: "block py-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-xl",
						children: vuln.id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: vuln.severity })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: vuln.title === vuln.id ? "No title published" : vuln.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: ["CVSS ", formatCvss(vuln.cvss)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: ["EPSS ", formatEpss(vuln.epss)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vuln.kev ? shortDate(vuln.kev.dateAdded) : shortDate(vuln.published) }),
						matchesWatch(vuln, watchTerms) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-flame",
							children: "Watch"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatchMark, { vuln })
					]
				})
			]
		}) }, vuln.id))
	})] });
}
function Meta({ vuln }) {
	const bits = [vuln.vendor, vuln.product].filter(Boolean);
	if (!bits.length && !vuln.kev) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "mt-1 text-xs text-muted",
		children: [
			bits.join(" · "),
			vuln.kev ? `${bits.length ? " · " : ""}Exploited` : "",
			vuln.kev?.ransomware === "Known" ? " · Ransomware" : ""
		]
	});
}
function Due({ due, added }) {
	const state = dueState(due);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: state === "overdue" ? "block text-flame" : "block",
		children: [
			state === "overdue" ? "Overdue" : state === "soon" ? "Due soon" : "Due",
			" ",
			shortDate(due)
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "block text-xs",
		children: ["Added ", shortDate(added)]
	})] });
}
//#endregion
export { VulnList as t };
