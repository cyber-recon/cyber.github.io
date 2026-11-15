import { q as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as patchOf, u as cn, x as sourceLabel } from "./router-CgiERoNf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marks-l87EV4c-.js
var import_jsx_runtime = require_jsx_runtime();
var SEVERITY_WORD = {
	CRITICAL: "Critical",
	HIGH: "High",
	MEDIUM: "Medium",
	LOW: "Low",
	UNKNOWN: "Unscored"
};
function SeverityMark({ severity }) {
	const hot = severity === "CRITICAL" || severity === "HIGH";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wide", hot ? "text-flame" : "text-muted"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-1.5 rounded-full", hot ? "bg-flame" : "bg-line"),
			"aria-hidden": "true"
		}), SEVERITY_WORD[severity]]
	});
}
function PatchMark({ vuln, patch }) {
	const info = patch ?? (vuln ? patchOf(vuln) : {
		state: "unknown",
		detail: "No source has cited a vendor fix yet."
	});
	const label = info.state === "yes" ? "Patch" : info.state === "no" ? "No patch" : "Patch unknown";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("text-xs uppercase tracking-wide", info.state === "no" ? "text-flame" : "text-muted"),
		title: info.detail,
		children: label
	});
}
function SourceMarks({ sources, names }) {
	const unique = Array.from(new Set(sources)).slice(0, 4);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-xs text-muted",
		children: unique.map((source, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [index > 0 ? " · " : "", sourceLabel(source, names)] }, source))
	});
}
function Lamp({ state }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-block size-2.5 shrink-0 rounded-full", state === "live" && "bg-flame", state === "seed" && "bg-muted", state === "error" && "border border-flame bg-transparent", state === "idle" && "bg-line"),
		"aria-hidden": "true"
	});
}
//#endregion
export { SourceMarks as i, PatchMark as n, SeverityMark as r, Lamp as t };
