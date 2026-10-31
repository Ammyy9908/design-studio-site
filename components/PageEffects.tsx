"use client";

import { useEffect } from "react";

/** Soft shapes that sit behind a section and move at different speeds. */
export function Drift({ tone = "light" }: { tone?: "light" | "ink" }) {
  return (
    <div className={`drift drift--${tone}`} aria-hidden="true">
      <span className="drift__orb drift__orb--a" data-parallax="0.16" />
      <span className="drift__orb drift__orb--b" data-parallax="0.32" />
      <span className="drift__orb drift__orb--c" data-parallax="-0.12" />
      <span className="drift__ring" data-parallax="0.22" />
    </div>
  );
}

/**
 * Page-wide scroll behaviour, all progressive enhancement:
 * - `.reveal` elements enter as they reach the viewport, staggered among siblings
 * - the header gets a solid background once the page scrolls
 * - nav links highlight the section currently in view
 * - `[data-parallax]` elements drift at their own speed (skipped with reduced motion)
 */
export function PageEffects() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: Array<() => void> = [];

    // Reveal on scroll. Siblings share a rising delay so a row arrives in sequence.
    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    const byParent = new Map<HTMLElement, HTMLElement[]>();
    for (const el of reveals) {
      const parent = el.parentElement;
      if (!parent) continue;
      const group = byParent.get(parent) ?? [];
      group.push(el);
      byParent.set(parent, group);
    }
    for (const group of byParent.values()) {
      group.forEach((el, index) => el.style.setProperty("--i", String(Math.min(index, 8))));
    }
    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("is-in"));
    } else {
      const showIfVisible = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight * 0.92) el.classList.add("is-in");
      };
      const io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add("is-in");
              io.unobserve(e.target);
            }
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
      );
      reveals.forEach((el) => {
        showIfVisible(el);
        io.observe(el);
      });
      cleanups.push(() => io.disconnect());
    }

    // Active nav link
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
    cleanups.push(() => navIo.disconnect());

    // Header state + parallax, batched into one rAF per scroll
    const header = document.querySelector<HTMLElement>(".site-header");
    const parallax = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      header?.classList.toggle("is-scrolled", y > 12);
      const vh = window.innerHeight;
      for (const el of parallax) {
        const speed = Number(el.dataset.parallax) || 0.1;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -240 || rect.top > vh + 240) continue;
        const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
        el.style.setProperty("--py", `${offset.toFixed(1)}px`);
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    cleanups.push(() => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
