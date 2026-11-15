import { createFileRoute } from "@tanstack/react-router";

const FEEDS: Record<string, string> = {
  kev: "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json",
  paloalto: "https://security.paloaltonetworks.com/rss.xml",
  unit42: "https://unit42.paloaltonetworks.com/feed/",
  "cisa-advisory": "https://www.cisa.gov/cybersecurity-advisories/all.xml",
  nsa: "https://www.nsa.gov/cybersecurity-guidance/",
  msrc: "https://api.msrc.microsoft.com/update-guide/rss",
  certcc: "https://www.kb.cert.org/vuls/atomfeed/",
  ncsc: "https://www.ncsc.gov.uk/api/1/services/v1/report-rss-feed.xml",
  acsc: "https://www.cyber.gov.au/rss/alerts",
  certfr: "https://www.cert.ssi.gouv.fr/alerte/feed/",
  bsi: "https://wid.cert-bund.de/content/public/securityAdvisory/rss",
  jpcert: "https://www.jpcert.or.jp/english/rss/jpcert-en.rdf",
  dfir: "https://thedfirreport.com/feed/",
  talos: "https://blog.talosintelligence.com/rss/",
  "sans-diary": "https://isc.sans.edu/rssfeed_full.xml",
  projectzero: "https://googleprojectzero.blogspot.com/feeds/posts/default?alt=rss",
  ransomware: "https://api.ransomware.live/v2/recentvictims",
  feodo: "https://feodotracker.abuse.ch/downloads/ipblocklist.json",
  fortinet: "https://www.fortiguard.com/rss/ir.xml",
  redhat: "https://access.redhat.com/hydra/rest/securitydata/cve.json?per_page=40",
};

const NVD_QUERIES: Record<string, string[]> = {
  nvd: [],
  "nvd-win11": ["virtualMatchString=cpe:2.3:o:microsoft:windows_11"],
  "nvd-macos": ["virtualMatchString=cpe:2.3:o:apple:macos", "virtualMatchString=cpe:2.3:o:apple:mac_os_x"],
  "nvd-esxi": ["virtualMatchString=cpe:2.3:o:vmware:esxi"],
  "nvd-vcenter": ["virtualMatchString=cpe:2.3:a:vmware:vcenter_server"],
  "nvd-horizon": ["virtualMatchString=cpe:2.3:a:vmware:horizon", "keywordSearch=VMware%20Horizon"],
  "nvd-omnissa": ["keywordSearch=Omnissa"],
  "nvd-rhel": ["virtualMatchString=cpe:2.3:o:redhat:enterprise_linux"],
  "nvd-panos": ["virtualMatchString=cpe:2.3:o:paloaltonetworks:pan-os"],
  "nvd-cisco": ["keywordSearch=Cisco"],
};

function nvdStamp(date: Date): string {
  return date.toISOString().slice(0, 19) + ".000";
}

function recentNvdQuery(): string {
  const end = new Date();
  const start = new Date(end.getTime() - 6 * 24 * 60 * 60 * 1000);
  return `pubStartDate=${nvdStamp(start)}&pubEndDate=${nvdStamp(end)}`;
}

async function nvdLatest(query: string): Promise<string> {
  const base = `https://services.nvd.nist.gov/rest/json/cves/2.0?${query}&resultsPerPage=20`;
  const first = await fetch(base, { headers: { accept: "application/json" }, signal: AbortSignal.timeout(20000) });
  const body = await first.text();
  if (!first.ok) throw new Error(`Upstream HTTP ${first.status}`);
  const payload = JSON.parse(body) as { totalResults?: number };
  const total = payload.totalResults ?? 0;
  if (total <= 20) return body;
  await new Promise((resolve) => setTimeout(resolve, 6000));
  const second = await fetch(`${base}&startIndex=${Math.max(0, total - 20)}`, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(20000),
  });
  const page = await second.text();
  if (!second.ok) throw new Error(`Upstream HTTP ${second.status}`);
  return page;
}

export const Route = createFileRoute("/api/relay")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const feed = new URL(request.url).searchParams.get("feed") ?? "";
        const nvdQueries = NVD_QUERIES[feed];
        if (nvdQueries) {
          try {
            const queries = nvdQueries.length ? nvdQueries : [recentNvdQuery()];
            let body = await nvdLatest(queries[0]);
            const parsed = JSON.parse(body) as { totalResults?: number };
            if ((parsed.totalResults ?? 0) === 0 && queries[1]) body = await nvdLatest(queries[1]);
            return new Response(body, {
              status: 200,
              headers: { "content-type": "application/json; charset=utf-8", "cache-control": "public, max-age=300" },
            });
          } catch (error) {
            const message = error instanceof Error ? error.message : "NVD failed";
            return new Response(message, {
              status: 200,
              headers: { "content-type": "text/plain; charset=utf-8", "x-lantern-error": "1", "cache-control": "no-store" },
            });
          }
        }
        const target = FEEDS[feed];
        if (!target) return new Response("Unknown feed", { status: 400 });
        try {
          const upstream = await fetch(target, {
            headers: {
              accept: "*/*",
              "user-agent": "Mozilla/5.0 (compatible; LanternThreatFloor/1.0; +https://github.com/cyber-recon)",
            },
            signal: AbortSignal.timeout(18000),
          });
          const body = (await upstream.text()).slice(0, 1_500_000);
          if (!upstream.ok) {
            return new Response(`Upstream HTTP ${upstream.status}`, {
              status: 200,
              headers: {
                "content-type": "text/plain; charset=utf-8",
                "x-lantern-error": "1",
                "cache-control": "no-store",
              },
            });
          }
          return new Response(body, {
            status: 200,
            headers: {
              "content-type": upstream.headers.get("content-type") || "text/plain; charset=utf-8",
              "cache-control": "public, max-age=300",
            },
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Relay failed";
          return new Response(message, {
            status: 200,
            headers: {
              "content-type": "text/plain; charset=utf-8",
              "x-lantern-error": "1",
              "cache-control": "no-store",
            },
          });
        }
      },
    },
  },
});
