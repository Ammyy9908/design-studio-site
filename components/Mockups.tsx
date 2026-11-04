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

/** Small decorative illustrations for the format cards. */
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
      <span className="domain__lock">https://www.noravale.com</span>
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

/** The same drawn characters people choose on their Account page. */
const LiveAvatar = ({ kind }: { kind: "cat" | "robot" }) => (
  <svg className="live__av" viewBox="0 0 96 96" aria-hidden="true">
    {kind === "cat" ? (
      <>
        <rect width="96" height="96" fill="#FFD166" />
        <path d="M20 44 22 14l20 14h12l20-14 2 30c0 20-12 34-28 34S20 64 20 44z" fill="#EF476F" />
        <circle cx="37" cy="46" r="5" fill="#2B193D" />
        <circle cx="59" cy="46" r="5" fill="#2B193D" />
      </>
    ) : (
      <>
        <rect width="96" height="96" fill="#BDE0FE" />
        <rect x="20" y="24" width="56" height="48" rx="14" fill="#3A86FF" />
        <circle cx="36" cy="46" r="8" fill="#BDE0FE" />
        <circle cx="60" cy="46" r="8" fill="#BDE0FE" />
      </>
    )}
  </svg>
);

export function LiveMockup() {
  return (
    <div className="live" role="img" aria-label="Illustration of a design being edited together: two cursors with avatars and a chat bubble on the page, a voice call with two people, and a comment thread">
      <div className="live__bar">
        <b>Q3 plan</b>
        <span className="live__follow">Following Jess <u>Stop</u></span>
      </div>
      <div className="live__body">
        <div className="live__page">
          <span className="live__title">Q3 plan</span>
          <span className="collab__chart"><i style={{ height: "40%" }} /><i style={{ height: "65%" }} /><i style={{ height: "52%" }} /><i style={{ height: "88%" }} /></span>
          <span className="live__cursor live__cursor--a"><LiveAvatar kind="cat" /> Jess<em>Try amber here?</em></span>
          <span className="live__cursor live__cursor--b"><LiveAvatar kind="robot" /> Omar</span>
        </div>
        <div className="live__side">
          <div className="live__call">
            <strong>In call</strong>
            <span><LiveAvatar kind="cat" /> Jess <small>Speaking</small></span>
            <span><LiveAvatar kind="robot" /> Omar <small>Muted</small></span>
          </div>
          <div className="live__thread">
            <strong>Comments</strong>
            <p><b>Jess</b> @Omar could we try a warmer background?</p>
            <p><b>Omar</b> Done, switched it to amber</p>
          </div>
        </div>
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
    <div className="webapp" role="img" aria-label="Illustration of Makora open in a web browser tab next to the desktop app">
      <span className="webapp__win webapp__win--back"><i /><i /><i /></span>
      <span className="webapp__win">
        <span className="webapp__tabs"><b>Makora</b><i /></span>
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
    <div className="server-art" role="img" aria-label="Illustration of a self-hosted Makora server running in Docker Compose">
      <div className="server-art__win">
        <div className="server-art__bar" aria-hidden="true">
          <i /><i /><i />
          <span>docker compose ps</span>
        </div>
        <div className="server-art__content">
          <div className="server-art__row">
            <span className="server-art__status" />
            <span className="server-art__svc">studio</span>
            <span className="server-art__tag">Makora</span>
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
        Draft an executive summary…
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
