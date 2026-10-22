import type { ReactNode } from "react";

// Illustrative product mockups drawn with HTML/CSS. Decorative pieces are aria-hidden;
// anything that stands in for a real screenshot gets a text alternative.

export function BrowserFrame({ url, src, alt, app = false }: { url: string; src: string; alt: string; app?: boolean }) {
  return (
    <figure className={`frame${app ? " frame--app" : ""}`}>
      <div className="frame__bar" aria-hidden="true">
        <i /><i /><i />
        <span className="frame__url">{url}</span>
      </div>
      <img src={src} alt={alt} loading="lazy" decoding="async" width={1400} height={830} />
    </figure>
  );
}

export function PhoneFrame({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="phone">
      <span className="phone__notch" aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" decoding="async" width={420} height={893} />
    </figure>
  );
}

/** The hero illustration: a stylised editor window with a poster being designed. */
export function HeroEditor() {
  return (
    <div className="hero-art" role="img" aria-label="Illustration of the Design Studio editor with a colourful summer poster on the canvas, a comment from a teammate and a published website on a phone">
      <div className="editor" data-parallax="0.04">
        <div className="editor__top">
          <span className="editor__dots"><i /><i /><i /></span>
          <span className="editor__title">Summer launch — Poster</span>
          <span className="editor__avatars"><b className="av av--a">N</b><b className="av av--b">J</b><b className="av av--c">+2</b></span>
          <span className="editor__share">Share</span>
        </div>
        <div className="editor__body">
          <div className="editor__rail">
            {Array.from({ length: 6 }).map((_, i) => <i key={i} className={i === 1 ? "on" : ""} />)}
          </div>
          <div className="editor__canvas">
            <div className="poster">
              <span className="poster__sun" />
              <span className="poster__wave" />
              <span className="poster__kicker">Open air · Aug 24</span>
              <span className="poster__title">Summer<br />Sounds</span>
              <span className="poster__badge">Free entry</span>
              <span className="poster__select" />
            </div>
          </div>
          <div className="editor__panel">
            <span className="lbl">Text</span>
            <span className="field w80" />
            <span className="swatches"><i /><i /><i /><i /><i /></span>
            <span className="lbl">Effect</span>
            <span className="slider"><b style={{ width: "62%" }} /></span>
            <span className="slider"><b style={{ width: "34%" }} /></span>
            <span className="lbl">Animate</span>
            <span className="chips"><i>Rise</i><i className="on">Fade</i><i>Pop</i></span>
          </div>
        </div>
      </div>
      <div className="float float--comment" data-parallax="0.12">
        <b className="av av--a">N</b>
        <span><strong>Nora</strong> Love the colours! Can the date be bigger?</span>
      </div>
      <div className="float float--phone" data-parallax="0.2">
        <span className="mini-site">
          <i className="mini-site__nav" />
          <i className="mini-site__hero" />
          <i className="mini-site__line" />
          <i className="mini-site__line short" />
          <i className="mini-site__btn" />
        </span>
      </div>
      <div className="float float--live" data-parallax="0.16">
        <span className="pulse" /> Live at <strong>summersounds.site</strong>
      </div>
    </div>
  );
}

/** Small decorative illustrations for the "what you can make" cards. */
export function MakeArt({ kind }: { kind: string }) {
  return <div className={`art art--${kind}`} aria-hidden="true">{artInner[kind]}</div>;
}

const artInner: Record<string, ReactNode> = {
  slides: (
    <>
      <span className="slide slide--back" />
      <span className="slide"><b>Launch the<br />next big thing</b><i /></span>
    </>
  ),
  social: (
    <span className="sq"><b>SUMMER<br />SALE</b><i>50% off</i></span>
  ),
  video: (
    <>
      <span className="reel"><i className="play" /><b>3 days<br />to go</b></span>
      <span className="timeline"><i /><i /><i /><i /></span>
    </>
  ),
  poster: (
    <span className="tall"><i className="disc" /><b>NIGHT<br />SHIFT</b></span>
  ),
  invite: (
    <span className="card-inv"><em>You&rsquo;re invited</em><b>Maya &amp; Leo</b><i>June 14 · Garden party</i></span>
  ),
  board: (
    <>
      <span className="note n1">Ideas</span>
      <span className="note n2">Plan</span>
      <span className="note n3">Launch</span>
      <svg className="arrows" viewBox="0 0 200 120"><path d="M58 40 C 90 20, 110 20, 128 40" /><path d="M140 70 C 120 100, 90 104, 70 90" /></svg>
    </>
  ),
  doc: (
    <span className="page"><b /><i /><i /><i className="s" /><i /><i className="s" /></span>
  ),
  web: (
    <span className="site">
      <span className="site__bar"><i /><i /><i /></span>
      <span className="site__hero"><b /><b className="s" /><em /></span>
      <span className="site__grid"><i /><i /><i /></span>
    </span>
  ),
};

export function MotionMockup() {
  return (
    <div className="motion" role="img" aria-label="Illustration of website cards gliding into view and a panel of interaction settings: fade up while scrolling, lift on hover, open menu on click">
      <div className="motion__page">
        <span className="motion__head" />
        <div className="motion__cards">
          <i /><i /><i />
        </div>
        <span className="motion__cursor" />
      </div>
      <div className="motion__panel">
        <b>Interactions</b>
        <span><em>While scrolling</em>Fade up</span>
        <span className="on"><em>On hover</em>Lift &amp; glow</span>
        <span><em>On click</em>Open menu</span>
      </div>
    </div>
  );
}

export function PublishMockup() {
  return (
    <div className="publish" role="img" aria-label="Illustration of the publish window confirming the site is live at noravale.site">
      <img src="assets/tpl-folio.webp" alt="" loading="lazy" decoding="async" className="publish__bg" />
      <div className="publish__card">
        <span className="publish__check">✓</span>
        <b>Your site is live</b>
        <span className="publish__url">noravale.site</span>
        <span className="publish__row"><i>Home</i><i>Work</i><i>About</i><i>Contact</i></span>
        <span className="publish__btn">Publish changes</span>
      </div>
    </div>
  );
}

export function CommentsMockup() {
  return (
    <div className="collab" role="img" aria-label="Illustration of three people editing a slide together, with name tags on their cursors and a comment thread beside it">
      <div className="collab__slide">
        <span className="collab__title">Q3 plan</span>
        <span className="collab__chart"><i style={{ height: "40%" }} /><i style={{ height: "65%" }} /><i style={{ height: "52%" }} /><i style={{ height: "88%" }} /></span>
        <span className="cursor cursor--a" />
        <span className="cursor cursor--b" />
        <span className="pin">2</span>
      </div>
      <div className="collab__thread">
        <div className="msg"><b className="av av--b">J</b><p><strong>Jess</strong> Could we try a warmer background?</p></div>
        <div className="msg msg--reply"><b className="av av--c">O</b><p><strong>Omar</strong> Done — switched it to amber ✨</p></div>
        <span className="collab__reply">Reply…</span>
      </div>
    </div>
  );
}

export function AssetsMockup() {
  const tiles = ["sunset", "leaf", "city", "sea", "dune", "bloom", "night", "peach"];
  return (
    <div className="assets" role="img" aria-label="Illustration of a photo library grid with a search bar, folders and a photo being dragged onto a design">
      <span className="assets__search">Search photos, shapes and icons</span>
      <span className="assets__tabs"><i className="on">Photos</i><i>Graphics</i><i>Uploads</i><i>Brand</i></span>
      <div className="assets__grid">
        {tiles.map((t) => <i key={t} className={`tile tile--${t}`} />)}
      </div>
      <span className="assets__drag tile tile--bloom" />
    </div>
  );
}
