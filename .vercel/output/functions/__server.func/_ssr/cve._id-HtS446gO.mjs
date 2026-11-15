import { i as __toESM } from "../_runtime.mjs";
import { J as require_react, q as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as usePrefs, S as useIntel, _ as patchOf, d as dueState, m as formatEpss, n as Route, p as formatCvss, y as shortDate } from "./router-CgiERoNf.mjs";
import { i as SourceMarks, n as PatchMark, r as SeverityMark } from "./marks-l87EV4c-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cve._id-HtS446gO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var VECTOR_LABEL = {
	AV: "Attack vector",
	AC: "Complexity",
	AT: "Attack requirements",
	PR: "Privileges",
	UI: "User interaction",
	S: "Scope",
	C: "Confidentiality",
	I: "Integrity",
	A: "Availability",
	VC: "Vulnerable confidentiality",
	VI: "Vulnerable integrity",
	VA: "Vulnerable availability"
};
var VECTOR_VALUE = {
	AV: {
		N: "Network",
		A: "Adjacent",
		L: "Local",
		P: "Physical"
	},
	AC: {
		L: "Low",
		H: "High"
	},
	AT: {
		N: "None",
		P: "Present"
	},
	PR: {
		N: "None",
		L: "Low",
		H: "High"
	},
	UI: {
		N: "None",
		R: "Required"
	},
	S: {
		U: "Unchanged",
		C: "Changed"
	},
	C: {
		N: "None",
		L: "Low",
		H: "High"
	},
	I: {
		N: "None",
		L: "Low",
		H: "High"
	},
	A: {
		N: "None",
		L: "Low",
		H: "High"
	},
	VC: {
		N: "None",
		L: "Low",
		H: "High"
	},
	VI: {
		N: "None",
		L: "Low",
		H: "High"
	},
	VA: {
		N: "None",
		L: "Low",
		H: "High"
	}
};
function CvePage() {
	const { id: raw } = Route.useParams();
	const id = raw.toUpperCase();
	const intel = useIntel();
	const pins = usePrefs((state) => state.pins);
	const togglePin = usePrefs((state) => state.togglePin);
	const names = Object.fromEntries(usePrefs((state) => state.custom).map((item) => [item.id, item.name]));
	const vuln = intel.vulns.find((item) => item.id === id);
	const notes = intel.advisories.filter((item) => item.cves.includes(id) || item.title.toUpperCase().includes(id));
	const [note, setNote] = (0, import_react.useState)("Checking NVD, Red Hat, and EPSS");
	(0, import_react.useEffect)(() => {
		if (!/^CVE-\d{4}-\d{4,7}$/.test(id)) {
			setNote("That is not a CVE id.");
			return;
		}
		let cancel = false;
		setNote("Checking NVD, Red Hat, and EPSS");
		intel.enrich(id).then(() => {
			if (!cancel) setNote("");
		}).catch((error) => {
			if (!cancel) setNote(error instanceof Error ? error.message : "Detail sources did not answer");
		});
		return () => {
			cancel = true;
		};
	}, [id, intel.enrich]);
	const parts = vectorParts(vuln?.vector ?? null);
	const pinned = pins.includes(id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/vulns",
				search: {
					q: id,
					sev: "all",
					sort: "published",
					scope: "all",
					kev: false,
					ransom: false,
					watch: false,
					fix: "any"
				},
				className: "inline-flex min-h-11 items-center text-sm text-muted",
				children: "Back to vulnerabilities"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-widest text-muted",
					children: "Vulnerability"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-4xl sm:text-6xl",
						children: id
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": pinned,
						onClick: () => togglePin(id),
						className: "min-h-11 border border-line px-4 text-sm",
						children: pinned ? "Pinned" : "Pin"
					})]
				}),
				vuln && vuln.title !== vuln.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-3xl text-lg",
					children: vuln.title
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeverityMark, { severity: vuln?.severity ?? "UNKNOWN" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm tabular-nums",
							children: ["CVSS ", formatCvss(vuln?.cvss)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm tabular-nums",
							children: [
								"EPSS ",
								formatEpss(vuln?.epss),
								vuln?.epssPercentile != null ? ` · percentile ${(vuln.epssPercentile * 100).toFixed(0)}` : ""
							]
						}),
						vuln ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceMarks, {
							sources: vuln.sources,
							names
						}) : null,
						vuln ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatchMark, { vuln }) : null
					]
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: note
				}) : null
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-3xl leading-relaxed",
				children: vuln?.summary || "No description is loaded yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border border-line border-l-2 border-l-flame bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "Patch"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatchMark, { vuln }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: vuln ? patchOf(vuln).detail : "No record loaded yet." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted",
									children: "A patch is marked only when NVD tags a reference as a patch, Red Hat lists errata, or an advisory cites a fix. CISA’s required-action line is not treated as a patch."
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "CISA KEV"
						}), vuln?.kev ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Added ",
									shortDate(vuln.kev.dateAdded),
									". ",
									dueLabel(vuln.kev.dueDate),
									" ",
									shortDate(vuln.kev.dueDate),
									"."
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									vuln.vendor || "Vendor unlisted",
									" · ",
									vuln.product || "Product unlisted"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: vuln.kev.ransomware === "Known" ? "Known ransomware use." : "No known ransomware campaign listed." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: vuln.kev.requiredAction })
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "Not in the exploited catalog loaded here."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "CVSS"
						}), parts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
							className: "mt-3 grid grid-cols-2 gap-3 text-sm",
							children: parts.map((part) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted",
								children: part.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: part.value })] }, part.label))
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: vuln?.vector || "No vector loaded."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "border border-line bg-surface p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xs uppercase tracking-widest text-muted",
							children: "Red Hat"
						}), vuln?.redhat ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Product severity ",
									vuln.redhat.severity || "not stated",
									"."
								] }),
								vuln.redhat.statement ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: vuln.redhat.statement }) : null,
								vuln.redhat.packages.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: vuln.redhat.packages.join(", ") }) : null,
								vuln.redhat.bugzilla ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "text-flame",
									href: `https://bugzilla.redhat.com/show_bug.cgi?id=${vuln.redhat.bugzilla}`,
									target: "_blank",
									rel: "noreferrer",
									children: ["Bugzilla ", vuln.redhat.bugzilla]
								}) : null
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted",
							children: "No Red Hat record for this CVE."
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "References"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-3 divide-y divide-line border-y border-line",
				children: [externalLinks(id).map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: link.href,
					target: "_blank",
					rel: "noreferrer",
					className: "flex min-h-11 items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: link.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Open"
					})]
				}) }, link.href)), (vuln?.references ?? []).map((ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: ref.href,
					target: "_blank",
					rel: "noreferrer",
					className: "flex min-h-11 items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "truncate",
						children: ref.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-muted",
						children: "Open"
					})]
				}) }, ref.href))]
			})] }),
			notes.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-2xl",
				children: "Related advisories"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 divide-y divide-line border-y border-line",
				children: notes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						target: "_blank",
						rel: "noreferrer",
						className: "text-sm",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted",
						children: shortDate(item.published)
					})]
				}, item.id))
			})] }) : null
		]
	});
}
function dueLabel(due) {
	const state = dueState(due);
	if (state === "overdue") return "Overdue";
	if (state === "soon") return "Due soon";
	return "Due";
}
function vectorParts(vector) {
	if (!vector || !vector.includes("/")) return [];
	return vector.replace(/^CVSS:\d+(?:\.\d+)?\//, "").split("/").flatMap((pair) => {
		const [key, value] = pair.split(":");
		if (!key || !value) return [];
		return [{
			label: VECTOR_LABEL[key] ?? key,
			value: VECTOR_VALUE[key]?.[value] ?? value
		}];
	});
}
function externalLinks(id) {
	return [
		{
			href: `https://nvd.nist.gov/vuln/detail/${id}`,
			label: "NVD"
		},
		{
			href: `https://www.cve.org/CVERecord?id=${id}`,
			label: "CVE.org"
		},
		{
			href: `https://www.cisa.gov/known-exploited-vulnerabilities-catalog?search_api_fulltext=${id}`,
			label: "CISA catalog search"
		}
	];
}
//#endregion
export { CvePage as component };
