"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { BrowserFrame, PhoneFrame, MotionMockup, PublishMockup } from "./Mockups";

type Step = { title: string; body: string; points: string[]; visual: ReactNode };

const steps: Step[] = [
  {
    title: "Pick a template you like",
    body: "Start from a finished website for a salon, a photographer, a designer portfolio, a creative studio or an event — real pages with real sections, not empty boxes.",
    points: ["Home, about, services, gallery, contact and more", "Swap in your own words and photos"],
    visual: (
      <div className="stack">
        <BrowserFrame url="ostra.studio" src="assets/tpl-studio.webp" alt="The Ostra creative studio website template, with a large OSTRA headline and arched windows illustration" />
        <img className="stack__thumb stack__thumb--a" src="assets/tpl-lumen.webp" alt="" loading="lazy" />
        <img className="stack__thumb stack__thumb--b" src="assets/tpl-folio.webp" alt="" loading="lazy" />
      </div>
    ),
  },
  {
    title: "Click anything to change it",
    body: "Your site looks exactly like the real thing while you edit. Click a heading to retype it, drag a photo in, change colours and fonts from the panel on the right.",
    points: ["See every part of the page in a simple outline", "Save a look once and reuse it everywhere"],
    visual: (
      <BrowserFrame
        url="Design Studio"
        app
        src="assets/website-effects-panel.webp"
        alt="The Design Studio website editor: an outline of the page on the left, the page in the middle and style controls on the right"
      />
    ),
  },
  {
    title: "Add a little motion",
    body: "Make sections glide in as people scroll, buttons lift when hovered, and menus open with a click. Accordions, drop-down menus and smooth effects are built in.",
    points: ["Scroll, hover and click effects", "Shadows, blur, tilt and other finishing touches"],
    visual: <MotionMockup />,
  },
  {
    title: "Looks right on every phone",
    body: "Preview your site at desktop, tablet and phone sizes with one click. Layouts stack neatly on small screens, and you can fine-tune each size on its own.",
    points: ["Desktop, tablet and phone previews", "Text and images resize for you"],
    visual: (
      <div className="stack stack--devices">
        <BrowserFrame url="maisonlumiere.site" src="assets/tpl-salon.webp" alt="The Maison Lumière salon website on a desktop screen" />
        <PhoneFrame src="assets/phone-salon.webp" alt="The same salon website on a phone, with the text and buttons stacked in one column" />
      </div>
    ),
  },
  {
    title: "Publish with one click",
    body: "When you're happy, press Publish and your site is live on the web. Changed something? Publish again and the update is online in seconds.",
    points: ["No hosting to set up", "Update any time"],
    visual: <PublishMockup />,
  },
];

/** Scroll-driven feature walkthrough: steps scroll on the left while the matching visual stays pinned. */
export function BuilderShowcase() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLLIElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="builder">
      {/* Pinned visuals on wide screens; on narrow screens each step shows its own visual inline instead. */}
      <div className="builder__visual">
        <div className="builder__sticky">
          {steps.map((s, i) => (
            <div key={s.title} className={`builder__pane${i === active ? " is-active" : ""}`}>
              {s.visual}
            </div>
          ))}
          <div className="builder__dots" aria-hidden="true">
            {steps.map((s, i) => (
              <span key={s.title} className={i === active ? "is-active" : ""} />
            ))}
          </div>
        </div>
      </div>
      <ol className="builder__steps">
        {steps.map((s, i) => (
          <li
            key={s.title}
            data-step={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className={`builder__step${i === active ? " is-active" : ""}`}
          >
            <span className="builder__num">Step {i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <ul className="builder__points">
              {s.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <div className="builder__inline">{s.visual}</div>
          </li>
        ))}
      </ol>
    </div>
  );
}
