import type { ReactNode } from "react";

// Illustrative product mockups drawn with HTML/CSS. Decorative pieces are aria-hidden;
// anything that stands in for a real screenshot gets a text alternative.

export function BrowserFrame({
  url,
  src,
  alt,
  app = false,
  eager = false,
}: {
  url: string;
  src: string;
  alt: string;
  app?: boolean;
  eager?: boolean;
}) {
  return (
    <figure className={`frame${app ? " frame--app" : ""}`}>
      <div className="frame__bar" aria-hidden="true">
        <i /><i /><i />
        <span className="frame__url">{url}</span>
      </div>
      <img src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" width={1400} height={830} />
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

/** Playful floating "stickers" around the hero screenshot. Purely decorative. */
export function Stickers() {
  return (
    <div className="stickers" aria-hidden="true">
      <span className="stk stk--text" data-parallax="0.18">T</span>
      <span className="stk stk--heart" data-parallax="0.28" />
      <span className="stk stk--wheel" data-parallax="0.12" />
      <span className="stk stk--note" data-parallax="0.22"><i /></span>
      <span className="stk stk--play" data-parallax="0.3" />
      <span className="stk stk--globe" data-parallax="0.16" />
      <span className="stk stk--tag" data-parallax="0.24">Maya</span>
      <span className="stk stk--star" data-parallax="0.2" />
    </div>
  );
}

/** Small decorative illustrations for the format cards. */
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
    <>
      <span className="sq sq--b"><b>NEW<br />DROP</b></span>
      <span className="sq"><b>SUMMER<br />SALE</b><i>50% off</i></span>
    </>
  ),
  video: (
    <>
      <span className="reel"><i className="play" /><b>3 days<br />to go</b></span>
      <span className="timeline"><i /><i /><i /><i /></span>
    </>
  ),
  poster: (
    <>
      <span className="tall"><i className="disc" /><b>NIGHT<br />SHIFT</b></span>
      <span className="card-inv"><em>You&rsquo;re invited</em><b>Maya &amp; Leo</b><i>June 14 · Garden party</i></span>
    </>
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
    <span className="page"><b /><i /><i /><i className="s" /><span className="page__img" /><i /><i className="s" /></span>
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

export function CustomDomainMockup() {
  return (
    <div className="domain" role="img" aria-label="Illustration of the Custom domains panel: www.noravale.com is connected, with the DNS records to create for it">
      <b className="domain__title">Custom domains</b>
      <span className="domain__head">
        <b>www.noravale.com</b>
        <i>Connected</i>
      </span>
      <span className="domain__record"><em>TXT</em><code>_studio-verify.www</code><code>studio-verify=…</code></span>
      <span className="domain__record"><em>CNAME</em><code>www</code><code>studio.noravale.com</code></span>
      <span className="domain__lock">🔒 https://www.noravale.com</span>
    </div>
  );
}

export function ReplaceImageMockup() {
  return (
    <div className="replace" role="img" aria-label="Illustration of the Replace image window with three tabs: your assets, stock photos and AI image. The AI image tab shows a model, a description and a generated picture">
      <b className="replace__title">Replace image</b>
      <span className="replace__tabs"><i>Your assets</i><i>Pexels</i><i className="is-on">AI image</i></span>
      <span className="replace__field"><em>Model</em><i>GPT Image 1</i></span>
      <span className="replace__field"><em>Describe the picture</em><i>A hand-blown glass lamp on an oak table, warm morning light</i></span>
      <span className="replace__row">
        <img src="assets/tpl-studio.webp" alt="" loading="lazy" decoding="async" />
        <span className="replace__btn">Use this picture</span>
      </span>
    </div>
  );
}

export function CommentsMockup() {
  return (
    <div className="collab" role="img" aria-label="Illustration of two people editing a slide together, with name tags on their cursors and a comment thread beside it">
      <div className="collab__slide">
        <span className="collab__title">Q3 plan</span>
        <span className="collab__chart"><i style={{ height: "40%" }} /><i style={{ height: "65%" }} /><i style={{ height: "52%" }} /><i style={{ height: "88%" }} /></span>
        <span className="cursor cursor--a" />
        <span className="cursor cursor--b" />
        <span className="pin">2</span>
      </div>
      <div className="collab__thread">
        <div className="msg"><b className="av av--b">J</b><p><strong>Jess</strong> Could we try a warmer background?</p></div>
        <div className="msg msg--reply"><b className="av av--c">O</b><p><strong>Omar</strong> Done — switched it to amber</p></div>
        <span className="collab__reply">Reply…</span>
      </div>
    </div>
  );
}

export function AssetsMockup() {
  const tiles = ["sunset", "leaf", "city", "sea", "dune", "bloom", "night", "peach"];
  return (
    <div className="assets" role="img" aria-label="Illustration of a photo library grid with a search bar and a photo being dragged onto a design">
      <span className="assets__search">Search photos and graphics</span>
      <div className="assets__grid">
        {tiles.map((t) => <i key={t} className={`tile tile--${t}`} />)}
      </div>
      <span className="assets__drag tile tile--bloom" />
    </div>
  );
}

export function OfflineArt() {
  return (
    <div className="offline" role="img" aria-label="Illustration of a laptop in airplane mode with a design still open and a Saved on this computer badge">
      <span className="offline__laptop">
        <span className="offline__screen">
          <i className="offline__poster" />
          <span className="offline__badge">Saved on this computer</span>
        </span>
      </span>
      <span className="offline__toggle"><b>Airplane mode</b><i /></span>
    </div>
  );
}

export function BrowserArt() {
  return (
    <div className="webapp" role="img" aria-label="Illustration of Design Studio open in a web browser tab next to the desktop app">
      <span className="webapp__win webapp__win--back"><i /><i /><i /></span>
      <span className="webapp__win">
        <span className="webapp__tabs"><b>Design Studio</b><i /></span>
        <span className="webapp__body">
          <i className="webapp__rail" />
          <i className="webapp__canvas" />
        </span>
      </span>
    </div>
  );
}

export function ServerMockup() {
  return (
    <div className="server-art" role="img" aria-label="Illustration of a self-hosted Design Studio server running in Docker Compose">
      <div className="server-art__win">
        <div className="server-art__bar" aria-hidden="true">
          <i /><i /><i />
          <span>docker compose ps</span>
        </div>
        <div className="server-art__content">
          <div className="server-art__row">
            <span className="server-art__status" />
            <span className="server-art__svc">studio</span>
            <span className="server-art__tag">Design Studio</span>
          </div>
          <div className="server-art__row">
            <span className="server-art__status" />
            <span className="server-art__svc">postgres</span>
            <span className="server-art__tag">Database</span>
          </div>
          <div className="server-art__row">
            <span className="server-art__status" />
            <span className="server-art__svc">minio</span>
            <span className="server-art__tag">File storage</span>
          </div>
          <div className="server-art__row">
            <span className="server-art__status" />
            <span className="server-art__svc">caddy</span>
            <span className="server-art__tag">HTTPS</span>
          </div>
        </div>
      </div>
      <div className="server-art__badge" aria-hidden="true">
        <span>https://studio.example.com</span>
      </div>
    </div>
  );
}


export function AskStudioMockup() {
  return (
    <div className="ask-art" role="img" aria-label="Illustration of Ask Studio drafting a document section from a prompt">
      <div className="ask-art__prompt" aria-hidden="true">
        <span>✦</span> Draft an executive summary…
      </div>
      <div className="ask-art__doc" aria-hidden="true">
        <b />
        <i style={{ width: "92%" }} />
        <i style={{ width: "78%" }} />
        <i style={{ width: "86%" }} />
        <em />
      </div>
    </div>
  );
}
