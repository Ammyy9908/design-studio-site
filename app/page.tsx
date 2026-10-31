import { AppsShowcase } from "@/components/AppsShowcase";
import { AskStudioShowcase } from "@/components/AskStudioShowcase";
import { BuilderShowcase } from "@/components/BuilderShowcase";
import { DownloadButtons } from "@/components/DownloadButtons";
import { FormatShowcase } from "@/components/FormatShowcase";
import { AppleIcon, WindowsIcon, DownloadIcon, Logo, ArrowRightIcon } from "@/components/Icons";
import { AskStudioMockup, AssetsMockup, BrowserArt, BrowserFrame, CommentsMockup, OfflineArt, ServerMockup } from "@/components/Mockups";
import { PageEffects } from "@/components/PageEffects";
import { developersUrl, navLinks, release } from "@/lib/site";


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

const faqs = [
  {
    q: "Do I need to be a designer to use it?",
    a: "Not at all. Start from a template, click on what you want to change and type. Everything snaps into place, and you can undo any step.",
  },
  {
    q: "Which computers does it run on?",
    a: "Design Studio runs on Macs with Apple silicon (M1 or newer) using macOS 12 or later, and on PCs with Windows 10 or later. There's also a browser version if you'd rather not install anything.",
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
    q: "Can I work on a design with other people?",
    a: "Yes. Share a design and everyone can edit at the same time, see each other's cursors and leave comments right on the page.",
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
    a: "Apps add outside tools to the editor. Pexels finds stock photos and Notion Images brings in pictures from your Notion pages. Install them from Apps on the home screen, and they appear in your side panel. Apps need an internet connection and a Design Studio account.",
  },
  {
    q: "Can an app see my designs?",
    a: "No. An app runs apart from your design and can't read what's in it. It can only do what you approved when you installed it, such as adding a picture. Apps listed by outside developers are reviewed before they reach the marketplace, and you can report or remove one at any time.",
  },
  {
    q: "Can I make my own app?",
    a: "Yes. An app is a small web page, and the developer docs take you from nothing to one running in a design. You can list it in the marketplace once you've been invited, and each version is reviewed first.",
  },
  {
    q: "Can I host the backend on my own servers?",
    a: "Yes. The usual install is one Docker Compose bundle with its own database, file storage and automatic HTTPS. The Self-Hosted Guide also covers your own proxy, a database and file storage you already run, a process without Docker, and Kubernetes.",
  },
  {
    q: "Does Design Studio include AI writing?",
    a: "Ask Studio drafts text in Docs and powers the AI Builder for websites, but it runs on an AI model you provide: your own key for OpenAI, Anthropic or a model on your own network. The key stays on your server and the features are off until you add one. What people type is sent to the provider you choose. The Self-Hosted Guide shows how to set it up.",
  },
  {
    q: "Can I make pictures with AI?",
    a: "Select a picture and choose Replace: pick one of your own assets, search stock photos from Pexels or Unsplash, or describe a picture and have an AI image model make it. The stock photo and image model keys are yours and stay on your server; the options are off until you add them, and what people type is sent to the provider you choose.",
  },
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <PageEffects />

      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <a href="#top" className="brand" aria-label="Design Studio home">
            <Logo id="logo-head" /> <span>Design Studio</span>
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
          <a href="#download" className="btn btn--violet btn--sm">
            Download
          </a>
        </nav>
      </header>

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="container hero__copy">
            <h1 id="hero-title" className="reveal">What will you make next?</h1>
            <p className="hero__sub reveal">
              Presentations, social posts, videos, posters, whiteboards, documents and full websites — all in one
              easy app for Mac and Windows.
            </p>
            <div className="reveal">
              <DownloadButtons />
            </div>
          </div>
          <div className="container hero__shot reveal" data-reveal="scale" data-parallax="0.08">
            <BrowserFrame
              url="Design Studio"
              app
              eager
              src="assets/website-effects-panel.webp"
              alt="The Design Studio editor: an outline of the page on the left, a website being edited in the middle and style controls on the right"
            />
          </div>
        </section>

        {/* ── Formats ──────────────────────────────────────── */}
        <section className="section" id="make" aria-labelledby="make-title">
          <div className="container">
            <h2 id="make-title" className="section__title reveal">One app for everything you make</h2>
          </div>
          <div className="reveal" data-reveal="scale">
            <FormatShowcase />
          </div>
        </section>

        {/* ── Website builder ──────────────────────────────── */}
        <section className="section section--soft" id="websites" aria-labelledby="web-title">
          <div className="container">
            <div className="section__intro reveal" data-reveal="left">
              <h2 id="web-title" className="section__title">Websites, made the visual way</h2>
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
            <div className="section__intro reveal" data-reveal="left">
              <h2 id="apps-title" className="section__title">Bring your tools into your designs</h2>
              <p className="section__sub">
                Open Apps, choose one and install it. It sits in your side panel beside the canvas, ready in every design.
              </p>
            </div>
            <div className="reveal">
              <AppsShowcase />
            </div>
          </div>
        </section>

        {/* ── Ask Studio ───────────────────────────────────── */}
        <section className="section" id="ask-studio" aria-labelledby="ask-title">
          <div className="container">
            <div className="section__intro reveal" data-reveal="right">
              <h2 id="ask-title" className="section__title">Ask Studio: write with AI, on your own key</h2>
              <p className="section__sub">
                Describe what you need and get a draft in your Doc. You pick the AI model, and your key stays on your server.
              </p>
            </div>
            <AskStudioShowcase />
          </div>
        </section>

        {/* ── Templates ────────────────────────────────────── */}
        <section className="section" id="templates" aria-labelledby="tpl-title">
          <div className="container section__intro reveal">
            <h2 id="tpl-title" className="section__title">Templates for every occasion</h2>
            <div className="section__actions">
              <a href="#download" className="btn btn--violet">Download Design Studio</a>
              <a href="#websites" className="btn btn--outline">See the website builder</a>
            </div>
          </div>
          <div className="wall" aria-label="Template examples">
            <div className="wall__row" data-parallax="0.05">
              <ul className="wall__track">
                {[0, 1].map((dup) =>
                  websiteTemplates.map((t) => (
                    <li key={`${dup}-${t.src}`} className="wall__item wall__item--site" aria-hidden={dup === 1 ? true : undefined}>
                      <img src={t.src} alt={dup === 1 ? "" : t.alt} loading="lazy" decoding="async" width={1400} height={830} />
                    </li>
                  )),
                )}
              </ul>
            </div>
            <div className="wall__row wall__row--rev" data-parallax="-0.06">
              <ul className="wall__track">
                {[0, 1].map((dup) =>
                  graphicTemplates.map((g) => (
                    <li key={`${dup}-${g.cls}`} className={`wall__item gtpl ${g.cls}`} aria-hidden={dup === 1 ? true : undefined}>
                      <b>{g.title}</b>
                    </li>
                  )),
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Bento: teamwork, assets, offline, browser ────── */}
        <section className="section section--tight" id="together" aria-labelledby="together-title">
          <div className="container">
            <h2 id="together-title" className="section__title reveal">Made for the way you work</h2>
            <div className="bento">
              <article className="bcard bcard--violet bcard--wide reveal" data-reveal="left">
                <div className="bcard__text">
                  <h3>Design together, live</h3>
                  <p>Invite friends, clients or your team. Everyone edits at once, sees each other&rsquo;s cursors and leaves comments right on the page.</p>
                </div>
                <CommentsMockup />
              </article>
              <article className="bcard bcard--peach reveal" data-reveal="right" id="assets">
                <div className="bcard__text">
                  <h3>Your photos, always at hand</h3>
                  <p>Keep photos, logos and graphics in one library and drag them into any design.</p>
                </div>
                <AssetsMockup />
              </article>
              <article className="bcard bcard--mint reveal" data-reveal="left" id="offline">
                <div className="bcard__text">
                  <h3>Works offline</h3>
                  <p>Keep designing on a plane or in a café with bad signal. Your work is saved on your computer.</p>
                </div>
                <OfflineArt />
              </article>
              <article className="bcard bcard--blue bcard--wide reveal" data-reveal="right">
                <div className="bcard__text">
                  <h3>On your desktop and in your browser</h3>
                  <p>Install it on your Mac or Windows PC, or open it in a web browser when you&rsquo;d rather not install anything.</p>
                </div>
                <BrowserArt />
              </article>
              <article className="bcard bcard--dark bcard--wide reveal" data-reveal="left" id="self-hosted">
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
              <article className="bcard bcard--violet reveal" data-reveal="scale" id="ask-studio-card">
                <div className="bcard__text">
                  <h3>Write faster with Ask Studio</h3>
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
            <h2 id="faq-title" className="section__title reveal">Questions? We&rsquo;ve got answers</h2>
            <div className="faq__list">
              {faqs.map((f) => (
                <details key={f.q} className="faq__item reveal">
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
            <h2 id="cta-title" className="reveal">Start designing today</h2>
            <p className="cta__sub reveal">Download Design Studio for your computer. Version {release.version}.</p>
            <div className="cta__cards reveal">
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
            <a href="#top" className="brand" aria-label="Design Studio home">
              <Logo id="logo-foot" /> <span>Design Studio</span>
            </a>
            <p>Design anything. Publish anywhere.</p>
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
              <li><a href={`${developersUrl}/docs`}>Developer docs</a></li>
            </ul>
          </nav>
        </div>
        <div className="container footer__base">
          <span>© {new Date().getFullYear()} Design Studio</span>
          <span>Version {release.version} · macOS &amp; Windows</span>
        </div>
      </footer>
    </>
  );
}
