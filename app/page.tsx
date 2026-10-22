import { BuilderShowcase } from "@/components/BuilderShowcase";
import { DownloadButtons } from "@/components/DownloadButtons";
import { AppleIcon, WindowsIcon, DownloadIcon, Logo } from "@/components/Icons";
import { AssetsMockup, CommentsMockup, HeroEditor, MakeArt } from "@/components/Mockups";
import { PageEffects } from "@/components/PageEffects";
import { navLinks, release } from "@/lib/site";

const tickerItems = [
  "Pitch decks", "Instagram posts", "Reels", "Event posters", "Wedding invitations", "Brainstorm boards",
  "Portfolio sites", "Menus", "YouTube thumbnails", "Flyers", "Stories", "Reports", "Salon websites", "Birthday cards",
];

const makeItems = [
  { kind: "web", title: "Websites", body: "Full multi-page sites with menus, galleries and contact sections — published in one click.", wide: true },
  { kind: "slides", title: "Presentations", body: "Slides that look sharp, with speaker notes, a timer and a presenter view." },
  { kind: "social", title: "Social posts", body: "Posts and stories sized perfectly for every feed." },
  { kind: "video", title: "Videos & reels", body: "Short videos with moving text, photos and a simple timeline." },
  { kind: "poster", title: "Posters & flyers", body: "Bold prints for gigs, sales and openings." },
  { kind: "invite", title: "Invitations & cards", body: "Weddings, birthdays and parties — personal and pretty." },
  { kind: "board", title: "Whiteboards", body: "An endless canvas for ideas, sticky notes and plans." },
  { kind: "doc", title: "Documents", body: "Reports, résumés and one-pagers that are a pleasure to read." },
];

const websiteTemplates = [
  { src: "assets/tpl-salon.webp", name: "Maison Lumière", kind: "Beauty salon", alt: "Salon template with a soft pink arch and a Book an appointment button" },
  { src: "assets/tpl-folio.webp", name: "Nora Vale", kind: "Designer portfolio", alt: "Playful lilac portfolio template with a bold headline and a Let's talk sticker" },
  { src: "assets/tpl-lumen.webp", name: "Lumen", kind: "Photography studio", alt: "Dark photography template with a huge Capturing Light headline over floating portraits" },
  { src: "assets/tpl-event.webp", name: "Forward", kind: "Tech conference", alt: "Clean conference template with a large headline and a round Get tickets badge" },
  { src: "assets/tpl-studio.webp", name: "Ostra", kind: "Creative studio", alt: "Minimal black and white studio template with an arched windows illustration" },
];

const graphicTemplates = [
  { cls: "g-pitch", title: "Launch the next big thing", tag: "Presentation" },
  { cls: "g-sale", title: "Summer sale", tag: "Social post" },
  { cls: "g-agenda", title: "Agenda", tag: "Presentation" },
  { cls: "g-night", title: "Night shift", tag: "Poster" },
  { cls: "g-story", title: "3 days to go", tag: "Story" },
  { cls: "g-learn", title: "Learn design in 10 min", tag: "Video thumbnail" },
  { cls: "g-wed", title: "Maya & Leo", tag: "Invitation" },
  { cls: "g-menu", title: "Café menu", tag: "Flyer" },
];

const faqs = [
  {
    q: "Do I need to be a designer to use it?",
    a: "Not at all. Start from a template, click on what you want to change and type. Everything snaps into place, and you can undo any step.",
  },
  {
    q: "Which computers does it run on?",
    a: `Design Studio runs on Macs with Apple silicon (M1 or newer) using macOS 12 or later, and on PCs with Windows 10 or later. There's also a browser version if you'd rather not install anything.`,
  },
  {
    q: "Does it work without an internet connection?",
    a: "Yes. On your computer you can open, edit and save your designs with no connection at all — handy on a train or a plane. Things that need the internet, like publishing a website or editing together with others, pick up again once you're back online.",
  },
  {
    q: "How do I put my website online?",
    a: "Press Publish. Your site goes live on the web straight away, with no hosting to set up. Made a change later? Press Publish again and the new version replaces the old one.",
  },
  {
    q: "Can I work on a design with other people?",
    a: "Yes. Share a design and everyone can edit at the same time, see each other's cursors and leave comments right on the page. You can reply, mention people and mark comments as done.",
  },
  {
    q: "What can I download my designs as?",
    a: "Save designs as images or PDFs for printing and sharing, and export videos and reels ready to post. Websites are published straight to the web.",
  },
  {
    q: "Where are my photos kept?",
    a: "Photos you add on the desktop app stay on your computer and are ready to use in any design. Images you drop into the editor appear in your photo library too, so you can find them again later.",
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
                <a href={`#${l.id}`} data-nav-link>{l.label}</a>
              </li>
            ))}
          </ul>
          <a href="#download" className="btn btn--primary btn--sm">
            <DownloadIcon className="btn__icon btn__icon--sm" /> Download
          </a>
        </nav>
      </header>

      <main id="main">
        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero__bg" aria-hidden="true">
            <span className="blob blob--a" data-parallax="-0.08" />
            <span className="blob blob--b" data-parallax="0.1" />
            <span className="blob blob--c" data-parallax="-0.04" />
          </div>
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow reveal">New · Version {release.version} for Mac and Windows</p>
              <h1 id="hero-title" className="reveal">
                Design <em className="serif grad">anything.</em>
                <br />
                Share it everywhere.
              </h1>
              <p className="lede reveal">
                Design Studio is one simple app for presentations, social posts, videos, posters, invitations,
                whiteboards and documents — and complete websites you can publish with a single click.
              </p>
              <div className="reveal">
                <DownloadButtons />
              </div>
            </div>
            <div className="hero__visual reveal">
              <HeroEditor />
            </div>
          </div>
        </section>

        {/* ── Ticker ───────────────────────────────────────── */}
        <div className="ticker" aria-label="Things people make with Design Studio">
          <div className="ticker__track">
            {[0, 1].map((dup) => (
              <ul key={dup} aria-hidden={dup === 1 ? true : undefined}>
                {tickerItems.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {/* ── What you can make ────────────────────────────── */}
        <section className="section" id="make" aria-labelledby="make-title">
          <div className="container">
            <header className="section__head reveal">
              <p className="eyebrow">One app, every format</p>
              <h2 id="make-title">
                Everything you need to make, <em className="serif">in one place</em>
              </h2>
              <p className="lede">
                Stop jumping between apps. Your slides, posts, videos and website share the same fonts, colours and
                photos, so everything you make looks like it belongs together.
              </p>
            </header>
            <ul className="bento">
              {makeItems.map((m, i) => (
                <li key={m.kind} className={`tile-card reveal${m.wide ? " tile-card--wide" : ""}`} style={{ transitionDelay: `${(i % 4) * 60}ms` }}>
                  <MakeArt kind={m.kind} />
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Website builder ──────────────────────────────── */}
        <section className="section section--tint" id="websites" aria-labelledby="web-title">
          <div className="container">
            <header className="section__head reveal">
              <p className="eyebrow">The website builder</p>
              <h2 id="web-title">
                A real website, <em className="serif">without the code</em>
              </h2>
              <p className="lede">
                Build a site for your salon, your studio, your portfolio or your next event. If you can make a
                poster, you can make a website.
              </p>
            </header>
            <BuilderShowcase />
          </div>
        </section>

        {/* ── Templates ────────────────────────────────────── */}
        <section className="section" id="templates" aria-labelledby="tpl-title">
          <div className="container">
            <header className="section__head section__head--split reveal">
              <div>
                <p className="eyebrow">Templates</p>
                <h2 id="tpl-title">
                  Never start from a <em className="serif">blank page</em>
                </h2>
              </div>
              <p className="lede">
                Professionally designed starting points for websites, slides, posts, posters and more. Make one your
                own in minutes.
              </p>
            </header>
          </div>
          <ul className="tpl-row container" aria-label="Website templates">
            {websiteTemplates.map((t, i) => (
              <li key={t.name} className="tpl reveal" style={{ transitionDelay: `${i * 70}ms` }}>
                <figure>
                  <div className="tpl__img">
                    <img src={t.src} alt={t.alt} loading="lazy" decoding="async" width={1400} height={830} />
                  </div>
                  <figcaption>
                    <b>{t.name}</b>
                    <span>{t.kind} website</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="marquee" aria-label="More templates for slides, posts, posters and invitations">
            <div className="marquee__track">
              {[0, 1].map((dup) => (
                <ul key={dup} aria-hidden={dup === 1 ? true : undefined}>
                  {graphicTemplates.map((g) => (
                    <li key={g.cls} className={`gtpl ${g.cls}`}>
                      <span className="gtpl__art"><b>{g.title}</b></span>
                      <span className="gtpl__tag">{g.tag}</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </section>

        {/* ── Collaboration ────────────────────────────────── */}
        <section className="section section--tint" id="together" aria-labelledby="together-title">
          <div className="container split">
            <div className="split__copy reveal">
              <p className="eyebrow">Better together</p>
              <h2 id="together-title">
                Design with your team, <em className="serif">live</em>
              </h2>
              <p className="lede">
                Invite a friend, a client or your whole team. Everyone works on the same design at the same time —
                no sending files back and forth.
              </p>
              <ul className="ticks ticks--lg">
                <li>See who&rsquo;s here and what they&rsquo;re pointing at</li>
                <li>Leave comments right on the design, reply and @mention people</li>
                <li>Mark feedback as done when it&rsquo;s sorted</li>
              </ul>
            </div>
            <div className="split__visual reveal">
              <CommentsMockup />
            </div>
          </div>
        </section>

        {/* ── Photos & assets ──────────────────────────────── */}
        <section className="section" id="assets" aria-labelledby="assets-title">
          <div className="container split split--flip">
            <div className="split__copy reveal">
              <p className="eyebrow">Photos &amp; assets</p>
              <h2 id="assets-title">
                Your photos, shapes and icons, <em className="serif">always at hand</em>
              </h2>
              <p className="lede">
                Keep your photos, logos and graphics in one library and drag them into any design. Find things fast
                with search, and reuse your brand colours and fonts everywhere.
              </p>
              <ul className="ticks ticks--lg">
                <li>A built-in library of photos, shapes and graphics</li>
                <li>Your own uploads stay on your computer</li>
                <li>Drag, drop and crop — no extra tools</li>
              </ul>
            </div>
            <div className="split__visual reveal">
              <AssetsMockup />
            </div>
          </div>
        </section>

        {/* ── Works anywhere ───────────────────────────────── */}
        <section className="section section--tint" id="anywhere" aria-labelledby="anywhere-title">
          <div className="container">
            <header className="section__head reveal">
              <p className="eyebrow">Works anywhere</p>
              <h2 id="anywhere-title">
                On your desk, in your browser, <em className="serif">even offline</em>
              </h2>
            </header>
            <ul className="trio">
              <li className="trio__card reveal">
                <span className="trio__icon trio__icon--desk" aria-hidden="true" />
                <h3>A real desktop app</h3>
                <p>Install it on your Mac or Windows PC and it opens instantly, right from your dock or Start menu.</p>
              </li>
              <li className="trio__card reveal" style={{ transitionDelay: "80ms" }}>
                <span className="trio__icon trio__icon--plane" aria-hidden="true" />
                <h3>No Wi-Fi? No problem</h3>
                <p>Keep designing on a plane or in a café with bad signal. Your work is saved on your computer as you go.</p>
              </li>
              <li className="trio__card reveal" style={{ transitionDelay: "160ms" }}>
                <span className="trio__icon trio__icon--web" aria-hidden="true" />
                <h3>Also in the browser</h3>
                <p>Rather not install anything? Open Design Studio in your web browser and start designing right away.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────── */}
        <section className="section" id="faq" aria-labelledby="faq-title">
          <div className="container faq">
            <header className="section__head reveal">
              <p className="eyebrow">Questions</p>
              <h2 id="faq-title">Good questions, <em className="serif">quick answers</em></h2>
            </header>
            <div className="faq__list reveal">
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
          <div className="container">
            <div className="cta__box reveal">
              <span className="cta__glow" aria-hidden="true" />
              <h2 id="cta-title">
                Ready when <em className="serif">you</em> are.
              </h2>
              <p className="lede">Download Design Studio and make something you&rsquo;re proud of today.</p>
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
              <p className="cta__ver">Version {release.version}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div>
            <a href="#top" className="brand" aria-label="Design Studio home">
              <Logo id="logo-foot" /> <span>Design Studio</span>
            </a>
            <p className="footer__tag">Design anything. Share it everywhere.</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer__links">
              <li><a href="#make">What you can make</a></li>
              <li><a href="#websites">Website builder</a></li>
              <li><a href="#templates">Templates</a></li>
              <li><a href="#together">Teamwork</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#download">Download</a></li>
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
