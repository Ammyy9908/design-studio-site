"use client";

import { useEffect, useState } from "react";

const THEME_COLORS = { light: "#ffffff", dark: "#161a17" };

function systemTheme() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Browser bars keep following the system through the meta tags' media, so a chosen theme has to overwrite them. */
function paintBrowserBars(theme: "light" | "dark") {
  document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((m) => {
    m.content = THEME_COLORS[theme];
  });
}

/** Light and dark switch. With no saved choice the site follows the system; `layout.tsx` applies a saved one before paint. */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sync = () => {
      const chosen = document.documentElement.dataset.theme as "light" | "dark" | undefined;
      const theme = chosen ?? systemTheme();
      setDark(theme === "dark");
      paintBrowserBars(theme);
    };
    sync();
    const system = window.matchMedia("(prefers-color-scheme: dark)");
    system.addEventListener("change", sync);
    return () => system.removeEventListener("change", sync);
  }, []);

  const toggle = () => {
    const next = dark ? "light" : "dark";
    // Choosing what the system already shows clears the choice, so the site goes back to following the system.
    const follow = next === systemTheme();
    if (follow) delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = next;
    try {
      if (follow) localStorage.removeItem("theme");
      else localStorage.setItem("theme", next);
    } catch {
      // Storage can be blocked. The switch still works until the page is left.
    }
    setDark(next === "dark");
    paintBrowserBars(next);
  };

  return (
    <button type="button" className="theme-toggle" aria-label="Dark theme" aria-pressed={dark} title={dark ? "Switch to light theme" : "Switch to dark theme"} onClick={toggle}>
      <svg className="theme-toggle__moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
      </svg>
      <svg className="theme-toggle__sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
