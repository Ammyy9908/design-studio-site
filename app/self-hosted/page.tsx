import type { Metadata } from "next";
import { Logo, ServerIcon, DockerIcon, ShieldIcon, DatabaseIcon } from "@/components/Icons";
import { PageEffects } from "@/components/PageEffects";
import { SelfHostedGuide } from "@/components/SelfHostedGuide";
import { navLinks, release } from "@/lib/site";

export const metadata: Metadata = {
  title: "Self-Hosted Guide — Design Studio",
  description:
    "Run Design Studio on your own server: your designs, photos and accounts stay on your infrastructure. One Docker Compose bundle with automatic HTTPS.",
  openGraph: {
    title: "Design Studio — Self-Hosted Guide",
    description: "Run Design Studio on your own server with one Docker Compose bundle and automatic HTTPS.",
    type: "article",
  },
};

export default function SelfHostedPage() {
  return (
    <>
      <a className="skip" href="#guide-main">
        Skip to guide content
      </a>
      <PageEffects />

      {/* ── Navigation Header ────────────────────────────── */}
      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <a href="/" className="brand" aria-label="Design Studio home">
            <Logo id="logo-sh" /> <span>Design Studio</span>
          </a>
          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  className={l.id === "self-hosted" ? "is-active" : ""}
                  aria-current={l.id === "self-hosted" ? "page" : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="/#download" className="btn btn--violet btn--sm">
            Download App
          </a>
        </nav>
      </header>

      <main id="guide-main">
        {/* ── Guide Hero ───────────────────────────────────── */}
        <section className="sh-hero" aria-labelledby="sh-hero-title">
          <div className="container sh-hero__inner">
            <div className="sh-hero__badge-row reveal">
              <span className="sh-badge sh-badge--violet">Self-Hosted</span>
              <span className="sh-badge sh-badge--mint">Docker Compose</span>
            </div>
            <h1 id="sh-hero-title" className="sh-hero__title reveal">
              Run Design Studio on Your Own Server
            </h1>
            <p className="sh-hero__lead reveal">
              Keep your team&rsquo;s designs, photos and accounts on your own infrastructure. Design Studio&rsquo;s server
              comes as one Docker Compose bundle, with its own database, file storage and automatic HTTPS, so a single
              Linux machine is all you need.
            </p>

            {/* Spec Bar */}
            <div className="sh-hero__specs reveal">
              <div className="sh-hero__spec">
                <DockerIcon className="sh-hero__spec-icon" />
                <span>Docker 24+</span>
              </div>
              <div className="sh-hero__spec">
                <DatabaseIcon className="sh-hero__spec-icon" />
                <span>Database &amp; file storage included</span>
              </div>
              <div className="sh-hero__spec">
                <ShieldIcon className="sh-hero__spec-icon" />
                <span>Automatic HTTPS</span>
              </div>
              <div className="sh-hero__spec">
                <ServerIcon className="sh-hero__spec-icon" />
                <span>Linux x86-64 &amp; arm64</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Main Guide Body ──────────────────────────────── */}
        <section className="sh-body">
          <div className="container">
            <SelfHostedGuide />
          </div>
        </section>

        {/* ── Help / Community Callout ─────────────────────── */}
        <section className="sh-footer-cta">
          <div className="container sh-footer-cta__inner">
            <div className="sh-footer-cta__content">
              <h2>Need help or have questions?</h2>
              <p>
                For deployment questions, bug reports or feature requests, contact our team. We&rsquo;re happy to help you
                get your server running.
              </p>
            </div>
            <div className="sh-footer-cta__actions">
              <a href="/#faq" className="btn btn--outline">
                Read FAQs
              </a>
              <a href="/#download" className="btn btn--violet">
                Download Client Apps
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <a href="/" className="brand" aria-label="Design Studio home">
              <Logo id="logo-sh-foot" /> <span>Design Studio</span>
            </a>
            <p>Design anything. Publish anywhere.</p>
          </div>
          <nav aria-label="Product">
            <h2 className="footer__h">Product</h2>
            <ul>
              <li>
                <a href="/#make">Formats</a>
              </li>
              <li>
                <a href="/#websites">Website builder</a>
              </li>
              <li>
                <a href="/#templates">Templates</a>
              </li>
              <li>
                <a href="/#together">Teamwork</a>
              </li>
              <li>
                <a href="/self-hosted/">Self-hosting</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Download">
            <h2 className="footer__h">Download</h2>
            <ul>
              <li>
                <a href={`/${release.mac.href}`} download>
                  Mac
                </a>
              </li>
              <li>
                <a href={`/${release.windows.href}`} download>
                  Windows
                </a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Help">
            <h2 className="footer__h">Guides &amp; Help</h2>
            <ul>
              <li>
                <a href="/#faq">FAQ</a>
              </li>
              <li>
                <a href="/#offline">Working offline</a>
              </li>
              <li>
                <a href="/self-hosted/">Self-Hosted Guide</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="container footer__base">
          <span>© {new Date().getFullYear()} Design Studio</span>
          <span>Version {release.version}</span>
        </div>
      </footer>
    </>
  );
}
