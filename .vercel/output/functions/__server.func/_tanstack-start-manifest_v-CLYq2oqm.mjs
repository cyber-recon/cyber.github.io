//#region node_modules/.nitro/vite/services/ssr/assets/_tanstack-start-manifest_v-CLYq2oqm.js
var tsrStartManifest = () => ({ routes: {
	__root__: {
		filePath: "/workspace/src/routes/__root.tsx",
		children: [
			"/",
			"/advisories",
			"/connectors",
			"/vulns",
			"/watch",
			"/api/relay",
			"/cve/$id"
		],
		preloads: [
			"/assets/index-CJmPPh-x.js",
			"/assets/rolldown-runtime-CbXtAM7H.js",
			"/assets/cn-Gcaf2znZ.js",
			"/assets/preload-helper-Dknptsz8.js"
		],
		scripts: [{ attrs: {
			type: "module",
			async: !0,
			src: "/assets/index-CJmPPh-x.js"
		} }]
	},
	"/": {
		filePath: "/workspace/src/routes/index.tsx",
		children: void 0,
		preloads: ["/assets/routes-DbTAzgfT.js", "/assets/marks-CH9aF-Hx.js"]
	},
	"/advisories": {
		filePath: "/workspace/src/routes/advisories.tsx",
		children: void 0,
		preloads: ["/assets/advisories-DeUTcSaS.js"]
	},
	"/connectors": {
		filePath: "/workspace/src/routes/connectors.tsx",
		children: void 0,
		preloads: ["/assets/connectors-GkH4bv9W.js", "/assets/marks-CH9aF-Hx.js"]
	},
	"/vulns": {
		filePath: "/workspace/src/routes/vulns.tsx",
		children: void 0,
		preloads: ["/assets/vulns-BqBUVYHY.js", "/assets/vuln-list-BXIE9r4V.js"]
	},
	"/watch": {
		filePath: "/workspace/src/routes/watch.tsx",
		children: void 0,
		preloads: ["/assets/watch-BVh_OQvo.js", "/assets/vuln-list-BXIE9r4V.js"]
	},
	"/cve/$id": {
		filePath: "/workspace/src/routes/cve.$id.tsx",
		children: void 0,
		preloads: ["/assets/cve._id-cjs7duwP.js", "/assets/marks-CH9aF-Hx.js"]
	}
} });
//#endregion
export { tsrStartManifest };
