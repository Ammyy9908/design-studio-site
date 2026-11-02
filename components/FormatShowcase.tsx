"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { BrowserFrame } from "./Mockups";

const ico = (d: string, size = 18) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/* ───────── Shared controls ───────── */

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className={`fx-chip${on ? " is-on" : ""}`} aria-pressed={on} onClick={onClick}>
      {children}
    </button>
  );
}

function Group({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="fx-group" role="group" aria-label={label}>
      <span className="fx-group__label" aria-hidden="true">{label}</span>
      {children}
    </div>
  );
}

function Swatches<T extends { name: string; swatch: string }>({ items, value, onChange }: { items: T[]; value: number; onChange: (i: number) => void }) {
  return (
    <Group label="Colour">
      {items.map((p, i) => (
        <button
          key={p.name}
          type="button"
          className={`fx-swatch${i === value ? " is-on" : ""}`}
          style={{ background: p.swatch }}
          aria-label={p.name}
          aria-pressed={i === value}
          onClick={() => onChange(i)}
        />
      ))}
    </Group>
  );
}

/* ───────── Websites: swap templates and publish ───────── */

const sites = [
  { name: "Ostra", url: "ostra.studio", src: "assets/tpl-studio.webp", alt: "Ostra, a minimal black and white creative studio website" },
  { name: "Maison", url: "maisonlumiere.site", src: "assets/tpl-salon.webp", alt: "Maison Lumière, a beauty salon website with a soft pink arch" },
  { name: "Nora", url: "noravale.site", src: "assets/tpl-folio.webp", alt: "Nora Vale, a playful lilac designer portfolio website" },
  { name: "Lumen", url: "lumen.photo", src: "assets/tpl-lumen.webp", alt: "Lumen, a dark photography studio website" },
  { name: "Forward", url: "forward.events", src: "assets/tpl-event.webp", alt: "Forward, a clean tech conference website" },
];

function WebsiteDemo() {
  const [site, setSite] = useState(0);
  const [phase, setPhase] = useState<"draft" | "busy" | "live">("draft");
  const timer = useRef<number | null>(null);
  const s = sites[site];

  const stop = () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  };
  useEffect(() => stop, []);

  const pick = (i: number) => {
    stop();
    setSite(i);
    setPhase("draft");
  };
  const publish = () => {
    setPhase("busy");
    timer.current = window.setTimeout(() => setPhase("live"), prefersReducedMotion() ? 0 : 900);
  };

  return (
    <>
      <div className="fx__canvas fx-site">
        <div className="fx-pop" key={s.src}>
          <BrowserFrame url={s.url} src={s.src} alt={s.alt} />
        </div>
        <div role="status">
          {phase === "live" && (
            <div className="fx-live">
              <span className="fx-live__check">{ico("M5 12.5 10 17l9-10", 16)}</span>
              <span><b>Your site is live</b><small>{s.url}</small></span>
            </div>
          )}
        </div>
      </div>
      <div className="fx__bar">
        <Group label="Template">
          {sites.map((t, i) => (
            <Chip key={t.name} on={i === site} onClick={() => pick(i)}>{t.name}</Chip>
          ))}
        </Group>
        <button type="button" className="fx-action" onClick={publish} disabled={phase !== "draft"}>
          {phase === "draft" ? "Publish" : phase === "busy" ? "Publishing…" : "Published"}
        </button>
      </div>
    </>
  );
}

/* ───────── Presentations: step through a deck, then present it ───────── */

const deck = [
  { title: "Launch the next big thing", note: "Start with the promise. Pause before you move on.", bg: "#1c1a3a", ink: "#ffffff", dot: "#ffb35c" },
  { title: "Why people need it now", note: "Tell the story of one customer, not the whole market.", bg: "#fffdf8", ink: "#1c1a3a", dot: "#ff7a59" },
  { title: "Three steps to get there", note: "Keep each step short. The detail is in the handout.", bg: "#24574a", ink: "#ffffff", dot: "#3ecf8e" },
  { title: "Ship it in June", note: "Ask for the decision, then stop talking.", bg: "#ffd166", ink: "#3b1406", dot: "#a8472c" },
];

function Slide({ i, small }: { i: number; small?: boolean }) {
  const s = deck[i];
  return (
    <span className={`slide fx-slide${small ? " fx-slide--small" : ""}`} style={{ background: s.bg, color: s.ink }}>
      <b>{s.title}</b>
      <i style={{ background: s.dot }} />
    </span>
  );
}

function SlidesDemo({ active }: { active: boolean }) {
  const [at, setAt] = useState(0);
  const [presenting, setPresenting] = useState(false);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    if (!active) setPresenting(false);
  }, [active]);
  useEffect(() => {
    if (!presenting) return;
    setSecs(0);
    const id = window.setInterval(() => setSecs((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [presenting]);

  const clock = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;

  return (
    <>
      <div className="fx__canvas fx-deck">
        {presenting ? (
          <div className="fx-presenter">
            <div className="fx-presenter__main fx-pop" key={at}><Slide i={at} /></div>
            <div className="fx-presenter__side">
              <span className="fx-presenter__clock">{clock}</span>
              <p>{deck[at].note}</p>
              <div className="fx-presenter__next">
                <small>{at < deck.length - 1 ? "Up next" : "Last slide"}</small>
                {at < deck.length - 1 && <Slide i={at + 1} small />}
              </div>
            </div>
          </div>
        ) : (
          <div className="fx-deck__stack">
            <span className="fx-deck__back" aria-hidden="true" />
            <div className="fx-pop" key={at}><Slide i={at} /></div>
          </div>
        )}
      </div>
      <div className="fx__bar">
        <Group label="Slide">
          <button type="button" className="fx-chip fx-chip--icon" aria-label="Previous slide" disabled={at === 0} onClick={() => setAt(at - 1)}>{ico("m15 6-6 6 6 6")}</button>
          <span className="fx-count" aria-live="polite">{at + 1} of {deck.length}</span>
          <button type="button" className="fx-chip fx-chip--icon" aria-label="Next slide" disabled={at === deck.length - 1} onClick={() => setAt(at + 1)}>{ico("m9 6 6 6-6 6")}</button>
        </Group>
        <button type="button" className="fx-action" aria-pressed={presenting} onClick={() => setPresenting(!presenting)}>
          {presenting ? "Stop presenting" : "Present"}
        </button>
      </div>
    </>
  );
}

/* ───────── Social: one design, resized for each feed ───────── */

const socialSizes = [
  { name: "Square", dims: "1080 × 1080", r: 1 },
  { name: "Story", dims: "1080 × 1920", r: 9 / 16 },
  { name: "Wide", dims: "1920 × 1080", r: 16 / 9 },
];
const socialLooks = [
  { name: "Sunset", swatch: "linear-gradient(160deg, #ffe066, #ffb347)", ink: "#3b1406", tag: "#1c1a3a", tagInk: "#fff" },
  { name: "Midnight", swatch: "#1c1a3a", ink: "#ffffff", tag: "#ffd166", tagInk: "#3b1406" },
  { name: "Blush", swatch: "linear-gradient(160deg, #ffc8d6, #ff8fab)", ink: "#4a0f22", tag: "#4a0f22", tagInk: "#fff" },
  { name: "Fresh", swatch: "linear-gradient(160deg, #b9f2d8, #3ecf8e)", ink: "#0a3b25", tag: "#0a3b25", tagInk: "#fff" },
];

function SocialDemo() {
  const [size, setSize] = useState(0);
  const [look, setLook] = useState(0);
  const s = socialSizes[size];
  const l = socialLooks[look];
  return (
    <>
      <div className="fx__canvas fx-social">
        <div className="fx-social__art" style={{ "--r": s.r } as CSSProperties}>
          <span className="sq" style={{ background: l.swatch, color: l.ink }}>
            <b>SUMMER<br />SALE</b>
            <i style={{ background: l.tag, color: l.tagInk }}>50% off</i>
          </span>
        </div>
        <span className="fx-tag">{s.dims}</span>
      </div>
      <div className="fx__bar">
        <Group label="Size">
          {socialSizes.map((o, i) => (
            <Chip key={o.name} on={i === size} onClick={() => setSize(i)}>{o.name}</Chip>
          ))}
        </Group>
        <Swatches items={socialLooks} value={look} onChange={setLook} />
      </div>
    </>
  );
}

/* ───────── Video: play or scrub a short timeline ───────── */

const clips = [
  { name: "Intro", text: ["3 days", "to go"], len: 3, bg: "linear-gradient(180deg, #ffcf5c, #ff6f61)", color: "#8b7bff" },
  { name: "Date", text: ["June 14", "8 pm"], len: 4, bg: "linear-gradient(180deg, #8b7bff, #1c1a3a)", color: "#ff7a59" },
  { name: "Place", text: ["Live in", "Lisbon"], len: 3, bg: "linear-gradient(180deg, #3ecf8e, #1f6f5c)", color: "#ffd166" },
  { name: "Outro", text: ["See you", "there"], len: 2, bg: "linear-gradient(180deg, #ff8fab, #94395b)", color: "#3ecf8e" },
];
const clipStarts = clips.map((_, i) => clips.slice(0, i).reduce((sum, c) => sum + c.len, 0));
const videoLength = clips.reduce((sum, c) => sum + c.len, 0);

function VideoDemo({ active }: { active: boolean }) {
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);
  const time = useRef(0);

  const seek = (v: number) => {
    time.current = v;
    setT(v);
  };

  useEffect(() => {
    if (!active) setPlaying(false);
  }, [active]);
  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const next = time.current + (now - last) / 1000;
      last = now;
      if (next >= videoLength) {
        seek(videoLength);
        setPlaying(false);
        return;
      }
      seek(next);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing]);

  const toggle = () => {
    if (!playing && time.current >= videoLength) seek(0);
    setPlaying(!playing);
  };

  const at = clipStarts.reduce((best, start, i) => (t >= start ? i : best), 0);
  const c = clips[at];

  return (
    <>
      <div className="fx__canvas fx-video">
        <span className={`reel${playing ? " is-playing" : ""}`} style={{ background: c.bg }} onClick={toggle}>
          {!playing && <i className="play" />}
          <b className="fx-pop" key={at}>{c.text[0]}<br />{c.text[1]}</b>
        </span>
        <div className="timeline">
          {clips.map((k) => (
            <i key={k.name} style={{ flex: k.len, background: k.color }} />
          ))}
          <input
            type="range"
            className="fx-scrub"
            min={0}
            max={videoLength}
            step={0.1}
            value={t}
            aria-label="Position in the video"
            aria-valuetext={`${t.toFixed(1)} of ${videoLength} seconds, ${c.name}`}
            onChange={(e) => {
              setPlaying(false);
              seek(Number(e.target.value));
            }}
          />
        </div>
      </div>
      <div className="fx__bar">
        <button type="button" className="fx-action" onClick={toggle}>
          {ico(playing ? "M8 5v14M16 5v14" : "M8 5v14l11-7z", 16)}
          {playing ? "Pause" : "Play"}
        </button>
        <Group label="Clip">
          {clips.map((k, i) => (
            <Chip key={k.name} on={i === at} onClick={() => { setPlaying(false); seek(clipStarts[i]); }}>{k.name}</Chip>
          ))}
        </Group>
      </div>
    </>
  );
}

/* ───────── Posters & cards: swap the piece on top and recolour both ───────── */

const printLooks = [
  { name: "Violet night", swatch: "#7b5cff", bg: "#0f0d24", ink: "#ffe28a", disc: "#7b5cff", glow: "#c9b8ff", paper: "#fffdf8", paperInk: "#6b4a3a" },
  { name: "Ember", swatch: "#ff7a59", bg: "#2a0f0a", ink: "#ffd166", disc: "#ff7a59", glow: "#ffd3c4", paper: "#fff3ec", paperInk: "#7a2e1a" },
  { name: "Lagoon", swatch: "#3ecf8e", bg: "#06241f", ink: "#c9f5e2", disc: "#3ecf8e", glow: "#b9f2d8", paper: "#f2fbf6", paperInk: "#155241" },
  { name: "Rose", swatch: "#ff8fab", bg: "#2b0a18", ink: "#ffd9e3", disc: "#ff8fab", glow: "#ffc8d6", paper: "#fff5f8", paperInk: "#7a1f42" },
];

function PrintDemo() {
  const [front, setFront] = useState<"poster" | "card">("poster");
  const [look, setLook] = useState(0);
  const l = printLooks[look];
  return (
    <>
      <div className={`fx__canvas fx-print is-${front}`}>
        <span className="tall" style={{ background: l.bg }} onClick={() => setFront("poster")}>
          <i className="disc" style={{ background: `radial-gradient(circle, ${l.glow} 20%, ${l.disc} 60%, transparent 62%)`, boxShadow: `0 0 40px ${l.disc}` }} />
          <b style={{ color: l.ink }}>NIGHT<br />SHIFT</b>
        </span>
        <span className="card-inv" style={{ background: l.paper, color: l.paperInk }} onClick={() => setFront("card")}>
          <em>You&rsquo;re invited</em>
          <b>Maya &amp; Leo</b>
          <i>June 14 · Garden party</i>
        </span>
      </div>
      <div className="fx__bar">
        <Group label="On top">
          <Chip on={front === "poster"} onClick={() => setFront("poster")}>Poster</Chip>
          <Chip on={front === "card"} onClick={() => setFront("card")}>Invitation</Chip>
        </Group>
        <Swatches items={printLooks} value={look} onChange={setLook} />
      </div>
    </>
  );
}

/* ───────── Whiteboard: notes you can really drag, with arrows that follow ───────── */

type Note = { id: number; label: string; x: number; y: number; tilt: number };

const startNotes: Note[] = [
  { id: 1, label: "Ideas", x: 22, y: 30, tilt: -4 },
  { id: 2, label: "Plan", x: 74, y: 34, tilt: 3 },
  { id: 3, label: "Launch", x: 46, y: 72, tilt: -2 },
];
const moreNotes = [
  { label: "Research", x: 80, y: 76, tilt: 3 },
  { label: "Budget", x: 17, y: 74, tilt: -3 },
  { label: "Ship it", x: 48, y: 24, tilt: 2 },
];

function BoardDemo() {
  const [notes, setNotes] = useState(startNotes);
  const [dragging, setDragging] = useState<number | null>(null);
  const board = useRef<HTMLDivElement>(null);
  const grab = useRef({ dx: 0, dy: 0 });
  const tween = useRef(0);

  useEffect(() => () => cancelAnimationFrame(tween.current), []);

  /** Keeps a note's centre far enough from the edges that the whole note stays on the board. */
  const place = (id: number, x: number, y: number) => {
    const el = board.current?.querySelector<HTMLElement>(`[data-note="${id}"]`);
    const r = board.current?.getBoundingClientRect();
    if (!el || !r) return;
    const mx = ((el.offsetWidth / 2 + 6) / r.width) * 100;
    const my = ((el.offsetHeight / 2 + 6) / r.height) * 100;
    setNotes((all) => all.map((n) => (n.id === id ? { ...n, x: clamp(x, mx, 100 - mx), y: clamp(y, my, 100 - my) } : n)));
  };

  const onDown = (e: PointerEvent<HTMLButtonElement>, n: Note) => {
    const r = board.current?.getBoundingClientRect();
    if (!r) return;
    cancelAnimationFrame(tween.current);
    e.currentTarget.setPointerCapture(e.pointerId);
    grab.current = { dx: ((e.clientX - r.left) / r.width) * 100 - n.x, dy: ((e.clientY - r.top) / r.height) * 100 - n.y };
    setDragging(n.id);
  };
  const onMove = (e: PointerEvent<HTMLButtonElement>, n: Note) => {
    const r = board.current?.getBoundingClientRect();
    if (dragging !== n.id || !r) return;
    place(n.id, ((e.clientX - r.left) / r.width) * 100 - grab.current.dx, ((e.clientY - r.top) / r.height) * 100 - grab.current.dy);
  };
  const onKey = (e: KeyboardEvent<HTMLButtonElement>, n: Note) => {
    const step: Record<string, [number, number]> = { ArrowLeft: [-4, 0], ArrowRight: [4, 0], ArrowUp: [0, -6], ArrowDown: [0, 6] };
    const d = step[e.key];
    if (!d) return;
    e.preventDefault();
    place(n.id, n.x + d[0], n.y + d[1]);
  };

  const add = () => {
    const more = moreNotes[notes.length - startNotes.length];
    if (more) setNotes([...notes, { id: notes[notes.length - 1].id + 1, ...more }]);
  };

  const tidy = () => {
    const cols = Math.min(notes.length, 3);
    const rows = Math.ceil(notes.length / cols);
    const goal = notes.map((_, i) => ({
      x: ((i % cols) + 0.5) * (100 / cols),
      y: (Math.floor(i / cols) + 0.5) * (100 / rows),
    }));
    if (prefersReducedMotion()) {
      setNotes(notes.map((n, i) => ({ ...n, ...goal[i] })));
      return;
    }
    const from = notes;
    const begin = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - begin) / 320);
      const e = 1 - (1 - p) ** 3;
      setNotes(from.map((n, i) => ({ ...n, x: n.x + (goal[i].x - n.x) * e, y: n.y + (goal[i].y - n.y) * e })));
      if (p < 1) tween.current = requestAnimationFrame(tick);
    };
    cancelAnimationFrame(tween.current);
    tween.current = requestAnimationFrame(tick);
  };

  return (
    <>
      <div className="fx__canvas fx-board" ref={board}>
        <svg className="arrows" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {notes.slice(1).map((b, i) => {
            const a = notes[i];
            const mx = (a.x + b.x) / 2;
            return <path key={b.id} d={`M${a.x} ${a.y} C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`} />;
          })}
        </svg>
        {notes.map((n, i) => (
          <button
            key={n.id}
            type="button"
            data-note={n.id}
            className={`note n${(i % 3) + 1}${dragging === n.id ? " is-dragging" : ""}`}
            style={{ left: `${n.x}%`, top: `${n.y}%`, transform: `translate(-50%, -50%) rotate(${dragging === n.id ? 0 : n.tilt}deg)` }}
            aria-label={`${n.label} note. Use the arrow keys to move it.`}
            onPointerDown={(e) => onDown(e, n)}
            onPointerMove={(e) => onMove(e, n)}
            onPointerUp={() => setDragging(null)}
            onPointerCancel={() => setDragging(null)}
            onKeyDown={(e) => onKey(e, n)}
          >
            {n.label}
          </button>
        ))}
      </div>
      <div className="fx__bar">
        <button type="button" className="fx-action" onClick={add} disabled={notes.length >= startNotes.length + moreNotes.length}>
          {ico("M12 5v14M5 12h14", 16)}
          Add a note
        </button>
        <Group label="Board">
          <button type="button" className="fx-chip" onClick={tidy}>Tidy up</button>
          <button type="button" className="fx-chip" onClick={() => { cancelAnimationFrame(tween.current); setNotes(startNotes); }}>Start over</button>
        </Group>
      </div>
    </>
  );
}

/* ───────── Docs: real words, restyled in one click ───────── */

const docs = [
  {
    name: "Report",
    title: "How the spring launch went",
    meta: "Quarterly report",
    lead: "We reached twice as many readers as last spring, and most of them arrived through people sharing the launch page.",
    head: "What we learned",
    body: "Short videos did the most work. Next time we start them earlier and give them a page of their own.",
  },
  {
    name: "Résumé",
    title: "Maya Ortiz",
    meta: "Product designer, Lisbon",
    lead: "Eight years making complicated tools feel simple, for small teams and for very large ones.",
    head: "Experience",
    body: "Led design at a travel startup from the first sketch to a million bookings. Before that, a studio in Porto.",
  },
  {
    name: "One-pager",
    title: "The Garden Project",
    meta: "One page, one idea",
    lead: "Turning an empty car park into a shared garden for the whole street, built by the people who live there.",
    head: "What we need",
    body: "Soil, a water tap and six free Saturdays. The neighbours have already said yes to the rest.",
  },
];
const docStyles = ["Clean", "Editorial", "Bold"];

function DocDemo() {
  const [kind, setKind] = useState(0);
  const [style, setStyle] = useState(0);
  const d = docs[kind];
  return (
    <>
      <div className="fx__canvas fx-doc">
        <article className={`page fx-page fx-page--${docStyles[style].toLowerCase()}`}>
          <div className="fx-pop" key={kind}>
            <header>
              <small>{d.meta}</small>
              <h4>{d.title}</h4>
            </header>
            <p className="fx-page__lead">{d.lead}</p>
            <h5>{d.head}</h5>
            <p>{d.body}</p>
            <div className="fx-page__more" aria-hidden="true">
              <span className="page__img" />
              <i />
              <i className="s" />
            </div>
          </div>
        </article>
      </div>
      <div className="fx__bar">
        <Group label="Type">
          {docs.map((o, i) => (
            <Chip key={o.name} on={i === kind} onClick={() => setKind(i)}>{o.name}</Chip>
          ))}
        </Group>
        <Group label="Style">
          {docStyles.map((o, i) => (
            <Chip key={o} on={i === style} onClick={() => setStyle(i)}>{o}</Chip>
          ))}
        </Group>
      </div>
    </>
  );
}

/* ───────── The showcase ───────── */

type Format = { id: string; label: string; short: string; icon: ReactNode; title: string; body: string; hint: string; tone: string; demo: (active: boolean) => ReactNode };

const formats: Format[] = [
  {
    id: "websites",
    label: "Websites",
    short: "Publish in one click",
    icon: ico("M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3z"),
    title: "Build a whole website, no code needed",
    body: "Pick a template, make it yours, publish in one click.",
    hint: "Swap the template, then publish",
    tone: "violet",
    demo: () => <WebsiteDemo />,
  },
  {
    id: "slides",
    label: "Presentations",
    short: "Notes and a timer",
    icon: ico("M3 4h18v12H3zM8 20h8M12 16v4"),
    title: "Presentations that hold the room",
    body: "Speaker notes, a timer and a presenter view built in.",
    hint: "Press Present to see your notes",
    tone: "coral",
    demo: (active) => <SlidesDemo active={active} />,
  },
  {
    id: "social",
    label: "Social",
    short: "Sized for every feed",
    icon: ico("M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"),
    title: "Posts and stories for every feed",
    body: "Sized right for each platform, ready to share.",
    hint: "Change the size and colour",
    tone: "pink",
    demo: () => <SocialDemo />,
  },
  {
    id: "video",
    label: "Video",
    short: "A simple timeline",
    icon: ico("M4 5h12v14H4zM16 10l4-3v10l-4-3"),
    title: "Reels and short videos",
    body: "Moving text, photos and a simple timeline.",
    hint: "Press play or drag the timeline",
    tone: "blue",
    demo: (active) => <VideoDemo active={active} />,
  },
  {
    id: "print",
    label: "Posters & cards",
    short: "Ready for print",
    icon: ico("M6 3h12v18H6zM9 8h6M9 12h6"),
    title: "Posters, flyers and invitations",
    body: "Print-ready designs for every occasion.",
    hint: "Bring one forward and recolour it",
    tone: "sun",
    demo: () => <PrintDemo />,
  },
  {
    id: "boards",
    label: "Whiteboards",
    short: "An endless canvas",
    icon: ico("M4 4h7v7H4zM13 13h7v7h-7zM11 7.5h4.5a2 2 0 0 1 2 2V13"),
    title: "Whiteboards for big ideas",
    body: "Sticky notes, arrows and an endless canvas.",
    hint: "Drag the notes around",
    tone: "mint",
    demo: () => <BoardDemo />,
  },
  {
    id: "docs",
    label: "Docs",
    short: "Writing with real style",
    icon: ico("M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5"),
    title: "Documents people enjoy reading",
    body: "Reports, résumés and one-pagers with real style.",
    hint: "Change the type and the style",
    tone: "indigo",
    demo: () => <DocDemo />,
  },
];

/** A small playground: pick a format from the rail and try a working miniature of it on the stage. */
export function FormatShowcase() {
  const [active, setActive] = useState(0);
  const rail = useRef<HTMLDivElement>(null);

  const select = (i: number, focus = false) => {
    setActive(i);
    const list = rail.current;
    const tab = list?.children[i] as HTMLElement | undefined;
    if (!list || !tab) return;
    if (focus) tab.focus({ preventScroll: true });
    // On narrow screens the rail scrolls sideways: keep the chosen tab in the middle of it.
    if (list.scrollWidth > list.clientWidth) {
      list.scrollTo({ left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2, behavior: prefersReducedMotion() ? "auto" : "smooth" });
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = formats.length - 1;
    const next: Record<string, number> = {
      ArrowDown: active === last ? 0 : active + 1,
      ArrowRight: active === last ? 0 : active + 1,
      ArrowUp: active === 0 ? last : active - 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    };
    if (next[e.key] === undefined) return;
    e.preventDefault();
    select(next[e.key], true);
  };

  return (
    <div className="fx container">
      <div className="fx__rail" ref={rail} role="tablist" aria-label="Choose a format" onKeyDown={onKeyDown}>
        {formats.map((f, i) => (
          <button
            key={f.id}
            type="button"
            role="tab"
            id={`fmt-tab-${f.id}`}
            className={`pill pill--${f.tone}${i === active ? " is-active" : ""}`}
            aria-selected={i === active}
            aria-controls={`fmt-${f.id}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => select(i)}
          >
            <span className="pill__icon">{f.icon}</span>
            <span className="fx__tabtext">
              {f.label}
              <small>{f.short}</small>
            </span>
          </button>
        ))}
      </div>
      <div className={`fx__stage fx-tone--${formats[active].tone}`}>
        {formats.map((f, i) => (
          <section
            key={f.id}
            id={`fmt-${f.id}`}
            role="tabpanel"
            aria-labelledby={`fmt-tab-${f.id}`}
            className={`fx__panel${i === active ? " is-active" : ""}`}
          >
            <header className="fx__head">
              <div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
              <span className="fx__hint">
                {ico("M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1a1.5 1.5 0 0 1 3 0v1m0 0a1.5 1.5 0 0 1 3 0v3.5A5.5 5.5 0 0 1 12.5 20h-1a5 5 0 0 1-4-2l-3-4a1.5 1.5 0 0 1 2.3-1.9L9 14", 16)}
                {f.hint}
              </span>
            </header>
            {f.demo(i === active)}
          </section>
        ))}
      </div>
    </div>
  );
}
