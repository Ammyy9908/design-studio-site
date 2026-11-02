"use client";

import { useEffect } from "react";

/**
 * Page-wide scroll behaviour:
 * - the header gets a hairline once the page scrolls
 * - nav links highlight the section currently in view
 */
export function PageEffects() {
  useEffect(() => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"));
    // Watch every section, so the highlight clears in sections that have no nav link.
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));
    const navIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.forEach((a) => {
            const on = a.hash === `#${e.target.id}`;
            a.classList.toggle("is-active", on);
            if (on) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          });
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => navIo.observe(s));

    const header = document.querySelector<HTMLElement>(".site-header");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      navIo.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
