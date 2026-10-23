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
  // The self-hosted server: compose file, settings template and the server image (docker load).
  server: {
    label: "Download server bundle",
    href: "downloads/design-studio-server.zip",
    requirements: "Linux x86-64 or arm64 · Docker 24+",
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

