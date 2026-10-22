"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrowserFrame, MakeArt } from "./Mockups";

type Format = { id: string; label: string; icon: ReactNode; title: string; body: string; tone: string; wide?: boolean; art: ReactNode };

const ico = (d: string) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const formats: Format[] = [
  {
    id: "websites",
    label: "Websites",
    icon: ico("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"),
    title: "Build a whole website, no code needed",
    body: "Pick a template, make it yours, publish in one click.",
    tone: "violet",
    wide: true,
    art: (
      <BrowserFrame url="ostra.studio" src="assets/tpl-studio.webp" alt="A creative studio website made with the Design Studio website builder" />
    ),
  },
  {
    id: "slides",
    label: "Presentations",
    icon: ico("M3 4h18v12H3zM8 20h8M12 16v4"),
    title: "Presentations that hold the room",
    body: "Speaker notes, a timer and a presenter view built in.",
    tone: "coral",
    art: <MakeArt kind="slides" />,
  },
  {
    id: "social",
    label: "Social",
    icon: ico("M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"),
    title: "Posts and stories for every feed",
    body: "Sized right for each platform, ready to share.",
    tone: "pink",
    art: <MakeArt kind="social" />,
  },
  {
    id: "video",
    label: "Video",
    icon: ico("M4 5h12v14H4zM16 10l4-3v10l-4-3"),
    title: "Reels and short videos",
    body: "Moving text, photos and a simple timeline.",
    tone: "blue",
    wide: true,
    art: <MakeArt kind="video" />,
  },
  {
    id: "print",
    label: "Posters & cards",
    icon: ico("M6 3h12v18H6zM9 8h6M9 12h6"),
    title: "Posters, flyers and invitations",
    body: "Print-ready designs for every occasion.",
    tone: "sun",
    art: <MakeArt kind="poster" />,
  },
  {
    id: "boards",
    label: "Whiteboards",
    icon: ico("M4 4h7v7H4zM13 13h7v7h-7zM11 7.5h4.5a2 2 0 0 1 2 2V13"),
    title: "Whiteboards for big ideas",
    body: "Sticky notes, arrows and an endless canvas.",
    tone: "mint",
    art: <MakeArt kind="board" />,
  },
  {
    id: "docs",
    label: "Docs",
    icon: ico("M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"),
    title: "Documents people enjoy reading",
    body: "Reports, résumés and one-pagers with real style.",
    tone: "indigo",
    art: <MakeArt kind="doc" />,
  },
];

/** Scroll position at which `card` sits flush with the track's left padding. */
function cardLeft(track: HTMLElement, card: HTMLElement) {
  return card.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft);
}

/** Tab pills that jump through a horizontally scrolling row of format cards (and follow it as it scrolls). */
export function FormatShowcase() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // While a pill-triggered scroll runs, keep the clicked pill active instead of following the scroll.
  const lock = useRef<number | null>(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const onScroll = () => {
      if (lock.current !== null) return;
      const cards = Array.from(el.children) as HTMLElement[];
      const left = el.scrollLeft;
      const dist = (c: HTMLElement) => Math.abs(cardLeft(el, c) - left);
      let best = 0;
      cards.forEach((c, i) => {
        if (dist(c) < dist(cards[best])) best = i;
      });
      // At the far end the last card can't reach the left edge, so mark it once we're scrolled to the end.
      if (left + el.clientWidth >= el.scrollWidth - 4) best = cards.length - 1;
      setActive(best);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const go = (i: number) => {
    const el = track.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setActive(i);
    if (lock.current !== null) window.clearTimeout(lock.current);
    lock.current = window.setTimeout(() => (lock.current = null), 900);
    el.scrollTo({ left: cardLeft(el, card), behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <div className="formats">
      <div className="pills" role="group" aria-label="Choose a format">
        {formats.map((f, i) => (
          <button
            key={f.id}
            type="button"
            className={`pill pill--${f.tone}${i === active ? " is-active" : ""}`}
            aria-pressed={i === active}
            aria-controls={`fmt-${f.id}`}
            onClick={() => go(i)}
          >
            <span className="pill__icon">{f.icon}</span>
            {f.label}
          </button>
        ))}
      </div>
      <div className="formats__wrap">
        <div className="formats__track" ref={track}>
          {formats.map((f) => (
            <article key={f.id} id={`fmt-${f.id}`} className={`fcard fcard--${f.tone}${f.wide ? " fcard--wide" : ""}`}>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
              <div className="fcard__art">{f.art}</div>
            </article>
          ))}
        </div>
        <button type="button" className="formats__arrow formats__arrow--prev" aria-label="Previous format" onClick={() => go(Math.max(0, active - 1))} disabled={active === 0}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 6-6 6 6 6" /></svg>
        </button>
        <button type="button" className="formats__arrow formats__arrow--next" aria-label="Next format" onClick={() => go(Math.min(formats.length - 1, active + 1))} disabled={active === formats.length - 1}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 6 6 6-6 6" /></svg>
        </button>
      </div>
    </div>
  );
}
