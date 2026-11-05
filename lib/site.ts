// Release details shown across the page. Update these when a new build ships.
// The installers live in the makora-builds R2 bucket, served at downloads.makora.design. Each release
// overwrites Makora-mac.dmg, Makora-windows.zip and the two design-studio-server-linux-*.zip bundles there,
// so these links stay the same.
const downloads = "https://downloads.makora.design";

export const release = {
  version: "0.1.88",
  mac: {
    label: "Download for Mac",
    href: `${downloads}/Makora-mac.dmg`,
    requirements: "macOS 12 or later · Apple silicon (M1 or newer)",
  },
  // A zip for now (unzip, then run Makora.exe); an installer needs makensis, which runs
  // only under Rosetta on Apple silicon build machines.
  windows: {
    label: "Download for Windows",
    href: `${downloads}/Makora-windows.zip`,
    requirements: "Windows 10 or later · 64-bit · unzip, then run Makora.exe",
  },
  // The self-hosted server, one bundle per CPU architecture (made by deploy/self-hosted/make-bundle.sh
  // in the app repository): the server image (docker load), compose file and settings template.
  server: {
    requirements: "Linux · Docker 24+",
    amd64: { label: "Server bundle · x86-64", href: `${downloads}/design-studio-server-linux-amd64.zip` },
    arm64: { label: "Server bundle · arm64", href: `${downloads}/design-studio-server-linux-arm64.zip` },
  },
} as const;

// The site's public address: link previews, the sitemap and canonical links are built from it.
export const siteUrl = "https://www.makora.design";

// The Privacy Policy and Terms of Service. Change `updated` whenever either page changes.
export const legal = {
  contactEmail: "support@makora.design",
  updated: "4 November 2026",
} as const;

/** The developer site: docs for building apps, and the portal for listing them. */

export const navLinks = [
  { id: "make", label: "Formats", href: "/#make" },
  { id: "websites", label: "Websites", href: "/#websites" },
  { id: "apps", label: "Apps", href: "/#apps" },
  { id: "templates", label: "Templates", href: "/#templates" },
  { id: "together", label: "Teamwork", href: "/#together" },
  { id: "self-hosted", label: "Self-Hosted", href: "/self-hosted/" },
  { id: "developers", label: "Developers", href: "/developers/" },
  { id: "faq", label: "FAQ", href: "/#faq" },
] as const;

