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
import { faqs } from "@/lib/faqs";
import { legal, navLinks, release, siteUrl } from "@/lib/site";


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


/** The editor's selection box around one thing in a section. */
function Sel({ children }: { children: ReactNode }) {
  return (
    <span className="sel">
      {children}
      <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
    </span>
  );
}

// Structured data for search engines: who makes Makora, and the app itself.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Makora",
      url: `${siteUrl}/`,
      logo: `${siteUrl}/icon.svg`,
      email: legal.contactEmail,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Makora",
      url: `${siteUrl}/`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "SoftwareApplication",
      name: "Makora",
      applicationCategory: "DesignApplication",
      operatingSystem: "macOS, Windows, Web",
      softwareVersion: release.version,
      description:
        "One friendly app for presentations, social posts, videos, posters, invitations, whiteboards, documents and websites.",
      url: `${siteUrl}/`,
      image: `${siteUrl}/opengraph-image.png`,
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
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
