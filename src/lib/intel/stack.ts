export const STACK_PRODUCTS = [
  {
    id: "win11",
    label: "Windows 11",
    detail: "Workstation",
    terms: ["Windows 11", "windows_11"],
  },
  {
    id: "macos",
    label: "macOS",
    detail: "Workstation",
    terms: ["macOS", "Mac OS X"],
  },
  {
    id: "vsphere",
    label: "vSphere",
    detail: "ESXi / vCenter",
    terms: ["ESXi", "vSphere", "vCenter"],
  },
  {
    id: "horizon",
    label: "Horizon",
    detail: "Omnissa",
    terms: ["Omnissa", "VMware Horizon", "Horizon Client", "Horizon Agent"],
  },
  {
    id: "redhat",
    label: "Red Hat",
    detail: "RHEL",
    terms: ["Red Hat", "RHEL", "Enterprise Linux"],
  },
  {
    id: "panos",
    label: "PAN-OS",
    detail: "Palo Alto",
    terms: ["PAN-OS", "Palo Alto", "GlobalProtect"],
  },
  {
    id: "cisco",
    label: "Cisco",
    detail: "IOS / ASA",
    terms: ["Cisco", "IOS XE", "ASA", "Firepower", "NX-OS"],
  },
] as const;

export const DEFAULT_WATCH = STACK_PRODUCTS.flatMap((product) => [...product.terms]);
