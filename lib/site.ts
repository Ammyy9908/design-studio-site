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
} as const;

export const navLinks = [
  { id: "make", label: "Formats" },
  { id: "websites", label: "Websites" },
  { id: "templates", label: "Templates" },
  { id: "together", label: "Teamwork" },
  { id: "faq", label: "FAQ" },
] as const;
