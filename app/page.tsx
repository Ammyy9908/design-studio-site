import { AppsShowcase } from "@/components/AppsShowcase";
import { AskStudioShowcase } from "@/components/AskStudioShowcase";
import { BuilderShowcase } from "@/components/BuilderShowcase";
import { DownloadButtons } from "@/components/DownloadButtons";
import { FormatShowcase } from "@/components/FormatShowcase";
import type { CSSProperties, ReactNode } from "react";
import { AppleIcon, WindowsIcon, DownloadIcon, Logo, ArrowRightIcon } from "@/components/Icons";
import { LegalFooterBase } from "@/components/LegalPage";
import { AskStudioMockup, AssetsMockup, BrowserArt, BrowserFrame, LiveMockup, OfflineArt, ServerMockup } from "@/components/Mockups";
import { PageEffects } from "@/components/PageEffects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navLinks, release } from "@/lib/site";


const websiteTemplates = [
  { src: "assets/tpl-salon.webp", alt: "Maison Lumière, a beauty salon website template with a soft pink arch" },
  { src: "assets/tpl-folio.webp", alt: "Nora Vale, a playful lilac designer portfolio template" },
  { src: "assets/tpl-lumen.webp", alt: "Lumen, a dark photography studio template with a huge Capturing Light headline" },
  { src: "assets/tpl-event.webp", alt: "Forward, a clean tech conference template with a Get tickets badge" },
  { src: "assets/tpl-studio.webp", alt: "Ostra, a minimal black and white creative studio template" },
];

const graphicTemplates = [
  { cls: "g-pitch", title: "Launch the next big thing" },
  { cls: "g-sale", title: "Summer sale" },
  { cls: "g-agenda", title: "Agenda" },
  { cls: "g-night", title: "Night shift" },
  { cls: "g-story", title: "3 days to go" },
  { cls: "g-learn", title: "Learn design in 10 min" },
  { cls: "g-wed", title: "Maya & Leo" },
  { cls: "g-menu", title: "Café menu" },
];

const teamwork = [
  { title: "Talk in a call room", text: "Each design has one voice call room, for up to 6 people. Join, mute and choose your microphone without leaving the page." },
  { title: "Follow someone", text: "Follow a teammate and your view moves with theirs, so they can walk you through the design." },
  { title: "Chat on the canvas", text: "Press / and type. Your words appear beside your cursor for everyone there, then they\u2019re gone." },
  { title: "Comments that reach you", text: "Pin comments to the page and @mention people, even ones who are away. They see it under the bell and by email." },
  { title: "Choose what you\u2019re emailed", text: "Pick everything, only mentions and replies, or nothing, for your account or one design." },
  { title: "Version history", text: "Versions save by themselves as you edit. Name one, preview any, and restore it. A restore keeps what it replaces." },
];

const faqs = [
  {
    q: "Do I need to be a designer to use it?",
    a: "Not at all. Start from a template, click on what you want to change and type. Everything snaps into place, and you can undo any step.",
  },
  {
    q: "Which computers does it run on?",
    a: "Makora runs on Macs with Apple silicon (M1 or newer) using macOS 12 or later, and on PCs with Windows 10 or later. There's also a browser version if you'd rather not install anything.",
  },
  {
    q: "Does it work without an internet connection?",
    a: "Yes. On your computer you can open, edit and save your designs with no connection at all. Things that need the internet, like publishing a website or editing with others, pick up again once you're back online.",
  },
  {
    q: "How do I put my website online?",
    a: "Press Publish. Your site goes live on the web straight away, with no hosting to set up. Made a change later? Press Publish again and the new version replaces the old one.",
  },
  {
    q: "Can my website use my own domain?",
    a: "Yes, on a self-hosted server open to the internet. Add the domain in the Publish panel and create the two DNS records it shows you. Once they're found, your site opens at your domain with HTTPS set up for you. Visitors only reach your website there, never the Makora app or anyone's account.",
  },
  {
    q: "Can I work on a design with other people?",
    a: "Yes. Share a design and everyone can edit at the same time, see each other's cursors and leave comments right on the page. You can also follow someone's view, or press / to chat beside your cursor. Cursor chat works everywhere except Docs and Sheets.",
  },
  {
    q: "Can we talk while we work?",
    a: "Yes. Every design has a voice call room for up to 6 people, in the desktop app and the browser. It's voice only, and it needs an internet connection.",
  },
  {
    q: "Will I get emails about comments?",
    a: "By default you get an email when someone mentions you or replies to you. On your Account page you can choose every comment on your designs, or nothing at all. Emails wait a little, so a busy thread doesn't fill your inbox, and each one has an unsubscribe link.",
  },
  {
    q: "Can I go back to an earlier version?",
    a: "Yes. Open Version history from the File menu to preview earlier versions and restore one. Versions are saved by themselves about every 10 minutes while people edit, and you can name the ones you want to keep. Restoring first saves what you had, so nothing is lost.",
  },
  {
    q: "What can I download my designs as?",
    a: "Save designs as images or PDFs for printing and sharing, and export videos and reels ready to post. Websites are published straight to the web.",
  },
  {
    q: "Where are my photos kept?",
    a: "Photos you add in the desktop app stay on your computer and are ready to use in any design.",
  },
  {
    q: "What are apps?",
    a: "Apps add outside tools to the editor, like free stock photos, moving graphics, videos and pictures from your Notion pages. Get them from Apps on the home screen, and they appear in your side panel. Apps need an internet connection and a Makora account.",
  },
  {
    q: "Why does an app say it needs setting up?",
    a: "Some apps need a key from the service they connect to, and it stays on the server, never in the app. Whoever runs your server adds it. Until then, the app's page says which setting it's waiting for.",
  },
  {
    q: "Can I choose which apps my team can use?",
    a: "Yes, on your own server. Set APPS_ALLOWED to all, none or a list of app ids. MARKETPLACE_URL=off stops reading the marketplace altogether. Your server only requests the list and the app packages, so nothing about people or designs is sent.",
  },
  {
    q: "Can an app see my designs?",
    a: "No. An app runs apart from your design and can't read what's in it. It can only do what you approved when you installed it, such as adding a picture. Apps listed by outside developers are reviewed before they reach the marketplace, and you can report or remove one at any time.",
  },
  {
    q: "Can I make my own app?",
    a: "Yes, if you run your own server. An app is a small web page, and the developer docs on this site take you from nothing to one running in a design. You build it in your server's developer portal, and whoever runs the server reviews each version before people can install it.",
  },
  {
    q: "Can I host the backend on my own servers?",
    a: "Yes. The usual install is one Docker Compose bundle with its own database, file storage and automatic HTTPS. The Self-Hosted Guide also covers your own proxy, a database and file storage you already run, a process without Docker, and Kubernetes.",
  },
  {
    q: "Does Makora include AI writing?",
    a: "Ask Studio drafts text in Docs and powers the AI Builder for websites, but it runs on an AI model you provide: your own key for OpenAI, Anthropic or a model on your own network. The key stays on your server and the features are off until you add one. What people type is sent to the provider you choose. The Self-Hosted Guide shows how to set it up.",
  },
  {
    q: "Can I make pictures with AI?",
    a: "Select a picture and choose Replace: pick one of your own assets, search stock photos from Pexels or Unsplash, or describe a picture and have an AI image model make it. The stock photo and image model keys are yours and stay on your server; the options are off until you add them, and what people type is sent to the provider you choose.",
  },
];

/** The editor's selection box around one thing in a section. */
function Sel({ children }: { children: ReactNode }) {
  return (
    <span className="sel">
      {children}
      <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <PageEffects />

      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <a href="#top" className="brand" aria-label="Makora home">
            <Logo id="logo-head" /> <span>Makora</span>
          </a>
          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={l.href} data-nav-link={l.id === "self-hosted" ? undefined : ""}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a href="#download" className="btn btn--violet btn--sm">
            Download
          </a>
        </nav>
      </header>

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero__grid">
            <div className="hero__copy">
              <h1 id="hero-title">Make posters, decks, videos and websites in one app</h1>
              <p className="hero__sub">
                Social posts, whiteboards and documents too. No design training needed, on Mac, Windows or in your browser.
              </p>
              <DownloadButtons />
            </div>
            <div className="desk">
              <figure className="board board--extra" style={{ "--x": "4%", "--y": "4%", "--w": "38%" } as CSSProperties}>
                <figcaption>Photography website</figcaption>
                <img className="board__art" src="assets/tpl-lumen.webp" alt="Lumen, a dark photography studio website template" width={1400} height={830} decoding="async" />
              </figure>
              <figure className="board board--poster" style={{ "--x": "46%", "--y": "4%", "--w": "21%" } as CSSProperties}>
                <figcaption>Poster</figcaption>
                <div className="sel">
                  <div className="board__art gtpl g-sale" role="img" aria-label="A Summer sale poster template"><b>Summer sale</b></div>
                  <i /><i /><i /><i />
                </div>
              </figure>
              <figure className="board board--folio" style={{ "--x": "71%", "--y": "4%", "--w": "38%" } as CSSProperties}>
                <figcaption>Portfolio website</figcaption>
                <img className="board__art" src="assets/tpl-folio.webp" alt="Nora Vale, a playful lilac designer portfolio template" width={1400} height={830} decoding="async" />
              </figure>
              <figure className="board board--extra" style={{ "--x": "4%", "--y": "44%", "--w": "19%" } as CSSProperties}>
                <figcaption>Story</figcaption>
                <div className="board__art gtpl g-story" role="img" aria-label="A 3 days to go social story template"><b>3 days to go</b></div>
              </figure>
              <figure className="board board--editor" style={{ "--x": "26%", "--y": "39%", "--w": "84%" } as CSSProperties}>
                <figcaption>In the editor</figcaption>
                <BrowserFrame
                  url="Makora"
                  app
                  eager
                  src="assets/website-effects-panel.webp"
                  alt="The Makora editor: an outline of the page on the left, a website being edited in the middle and style controls on the right"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* ── Formats ──────────────────────────────────────── */}
        <section className="section" id="make" aria-labelledby="make-title">
          <div className="container">
            <h2 id="make-title" className="section__title">One app for <Sel>everything</Sel> you make</h2>
          </div>
          <div>
            <FormatShowcase />
          </div>
        </section>

        {/* ── Website builder ──────────────────────────────── */}
        <section className="section section--soft" id="websites" aria-labelledby="web-title">
          <div className="container">
            <div className="section__intro">
              <h2 id="web-title" className="section__title">Websites, made the <Sel>visual</Sel> way</h2>
              <p className="section__sub">
                If you can make a poster, you can make a website. Here&rsquo;s how it goes.
              </p>
            </div>
            <BuilderShowcase />
          </div>
        </section>

        {/* ── Apps ─────────────────────────────────────────── */}
        <section className="section section--soft" id="apps" aria-labelledby="apps-title">
          <div className="container">
            <div className="section__intro">
              <h2 id="apps-title" className="section__title">Bring your tools into your designs</h2>
              <p className="section__sub">
                The marketplace adds outside tools to the editor: stock photos, moving graphics, your Notion pages and video uploads. You approve what each one can do.
              </p>
            </div>
            <div>
              <AppsShowcase />
            </div>
          </div>
        </section>

        {/* ── Ask Studio ───────────────────────────────────── */}
        <section className="section" id="ask-studio" aria-labelledby="ask-title">
          <div className="container">
            <div className="section__intro">
              <h2 id="ask-title" className="section__title">Ask Studio: write with AI, on <Sel>your own key</Sel></h2>
              <p className="section__sub">
                Describe what you need and get a draft in your Doc. You pick the AI model, and your key stays on your server.
              </p>
            </div>
            <AskStudioShowcase />
          </div>
        </section>

        {/* ── Templates ────────────────────────────────────── */}
        <section className="section" id="templates" aria-labelledby="tpl-title">
          <div className="container">
            <h2 id="tpl-title" className="section__title">Start from a template, then make it yours</h2>
            <div className="wall" aria-label="Template examples">
              <ul className="wall__row wall__row--sites">
                {websiteTemplates.map((t, i) => {
                  const img = <img src={t.src} alt={t.alt} loading="lazy" decoding="async" width={1400} height={830} />;
                  return (
                    <li key={t.src} className="wall__item wall__item--site">
                      {i === 0 ? <Sel>{img}</Sel> : img}
                    </li>
                  );
                })}
              </ul>
              <ul className="wall__row wall__row--graphics">
                {graphicTemplates.map((g) => (
                  <li key={g.cls} className={`wall__item gtpl ${g.cls}`}>
                    <b>{g.title}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Bento: teamwork, assets, offline, browser ────── */}
        <section className="section section--tight" id="together" aria-labelledby="together-title">
          <div className="container">
            <h2 id="together-title" className="section__title">Work <Sel>together</Sel>, offline or on your own server</h2>
            <div className="bento">
              <article className="bcard bcard--full">
                <div className="bcard__text">
                  <h3>Design together, live</h3>
                  <p>Invite friends, clients or your team. Everyone edits at once and sees each other&rsquo;s cursors, with the picture they chose beside their name.</p>
                </div>
                <LiveMockup />
                <ul className="teamwork">
                  {teamwork.map((t) => (
                    <li key={t.title}>
                      <h4>{t.title}</h4>
                      <p>{t.text}</p>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="bcard bcard--peach" id="assets">
                <div className="bcard__text">
                  <h3>Your photos, always at hand</h3>
                  <p>Keep photos, logos and graphics in one library and drag them into any design.</p>
                </div>
                <AssetsMockup />
              </article>
              <article className="bcard bcard--mint" id="offline">
                <div className="bcard__text">
                  <h3>Works offline</h3>
                  <p>Keep designing on a plane or in a café with bad signal. Your work is saved on your computer.</p>
                </div>
                <OfflineArt />
              </article>
              <article className="bcard bcard--blue">
                <div className="bcard__text">
                  <h3>On your desktop and in your browser</h3>
                  <p>Install it on your Mac or Windows PC, or open it in a web browser when you&rsquo;d rather not install anything.</p>
                </div>
                <BrowserArt />
              </article>
              <article className="bcard bcard--dark bcard--wide" id="self-hosted">
                <div className="bcard__text">
                  <span className="sh-bento-badge">Self-hosted</span>
                  <h3>Run it on your own server</h3>
                  <p>Keep designs, photos and accounts on your own infrastructure. Start with one Docker Compose bundle, or run the same server behind your own proxy, with your own database, or on Kubernetes.</p>
                  <a href="/self-hosted/" className="btn btn--outline btn--sm sh-bento-btn">
                    Read the Self-Hosted Guide <ArrowRightIcon className="sh-bento-btn__icon" />
                  </a>
                </div>
                <ServerMockup />
              </article>
              <article className="bcard bcard--violet" id="ask-studio-card">
                <div className="bcard__text">
                  <h3>Draft text with Ask Studio</h3>
                  <p>Draft summaries, proposals and notes right in a Doc. Bring your own AI key: it stays on your server, and it&rsquo;s off until you add one.</p>
                </div>
                <ul className="ask-models" aria-label="Supported AI providers">
                  {["Anthropic", "OpenAI", "Ollama", "vLLM", "Any OpenAI-compatible API"].map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
                <AskStudioMockup />
              </article>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="container faq">
            <h2 id="faq-title" className="section__title">Common questions</h2>
            <div className="faq__list">
              {faqs.map((f) => (
                <details key={f.q} className="faq__item">
                  <summary>
                    <span>{f.q}</span>
                    <i aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── Download CTA ─────────────────────────────────── */}
        <section className="cta" id="download" aria-labelledby="cta-title">
          <div className="container cta__inner">
            <h2 id="cta-title">Download Makora for Mac or Windows</h2>
            <p className="cta__sub">Version {release.version}. There&rsquo;s also a browser version if you&rsquo;d rather not install anything.</p>
            <div className="cta__cards">
              <a className="os-card" href={release.mac.href} download>
                <AppleIcon className="os-card__icon" />
                <span className="os-card__text">
                  <b>{release.mac.label}</b>
                  <small>{release.mac.requirements}</small>
                </span>
                <DownloadIcon className="os-card__dl" />
              </a>
              <a className="os-card" href={release.windows.href} download>
                <WindowsIcon className="os-card__icon" />
                <span className="os-card__text">
                  <b>{release.windows.label}</b>
                  <small>{release.windows.requirements}</small>
                </span>
                <DownloadIcon className="os-card__dl" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <a href="#top" className="brand" aria-label="Makora home">
              <Logo id="logo-foot" /> <span>Makora</span>
            </a>
            <p>Posters, decks, videos, documents and websites in one app</p>
          </div>
          <nav aria-label="Product">
            <h2 className="footer__h">Product</h2>
            <ul>
              <li><a href="#make">Formats</a></li>
              <li><a href="#websites">Website builder</a></li>
              <li><a href="#apps">Apps</a></li>
              <li><a href="#templates">Templates</a></li>
              <li><a href="#together">Teamwork</a></li>
              <li><a href="/self-hosted/">Self-hosting</a></li>
            </ul>
          </nav>
          <nav aria-label="Download">
            <h2 className="footer__h">Download</h2>
            <ul>
              <li><a href={release.mac.href} download>Mac</a></li>
              <li><a href={release.windows.href} download>Windows</a></li>
            </ul>
          </nav>
          <nav aria-label="Help">
            <h2 className="footer__h">Help</h2>
            <ul>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#offline">Working offline</a></li>
              <li><a href="/self-hosted/">Self-Hosted Guide</a></li>
              <li><a href="/developers/">Developer docs</a></li>
            </ul>
          </nav>
        </div>
        <LegalFooterBase version={`Version ${release.version} · macOS & Windows`} />
      </footer>
    </>
  );
}
