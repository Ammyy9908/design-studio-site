// Release details shown across the page. Update these when a new build ships.
export const release = {
  version: "0.1.0",
  mac: {
    label: "Download for Mac",
    href: "downloads/Design-Studio-mac.dmg",
    requirements: "macOS 12 or later · Apple silicon (M1 or newer)",
  },
  windows: {
    label: "Download for Windows",
    href: "downloads/Design-Studio-windows.exe",
    requirements: "Windows 10 or later · 64-bit",
  },
  // The self-hosted server, one bundle per CPU architecture (made by deploy/self-hosted/make-bundle.sh
  // in the app repository): the server image (docker load), compose file and settings template.
  server: {
    requirements: "Linux · Docker 24+",
    amd64: { label: "Server bundle · x86-64", href: "downloads/design-studio-server-0.1.0-linux-amd64.zip" },
    arm64: { label: "Server bundle · arm64", href: "downloads/design-studio-server-0.1.0-linux-arm64.zip" },
  },
} as const;

export const navLinks = [
  { id: "make", label: "Formats", href: "/#make" },
  { id: "websites", label: "Websites", href: "/#websites" },
  { id: "templates", label: "Templates", href: "/#templates" },
  { id: "together", label: "Teamwork", href: "/#together" },
  { id: "self-hosted", label: "Self-Hosted", href: "/self-hosted/" },
  { id: "faq", label: "FAQ", href: "/#faq" },
] as const;

