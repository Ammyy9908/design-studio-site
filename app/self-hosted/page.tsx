import type { Metadata } from "next";
import { Logo } from "@/components/Icons";
import { LegalFooterBase } from "@/components/LegalPage";
import { PageEffects } from "@/components/PageEffects";
import { SelfHostedGuide } from "@/components/SelfHostedGuide";
import { ThemeToggle } from "@/components/ThemeToggle";
import { navLinks, release } from "@/lib/site";

export const metadata: Metadata = {
  title: "Self-Hosted Guide",
  description:
    "Run Makora on your own server. The usual install is Docker Compose. The same server also runs behind your own proxy, with your own database and storage, as a process, or on Kubernetes.",
  alternates: { canonical: "/self-hosted/" },
  openGraph: {
    title: "Self-Hosted Guide — Makora",
    description:
      "Run Makora on your own server. The usual install is Docker Compose. The same server also runs behind your own proxy, with your own database and storage, as a process, or on Kubernetes.",
    url: "/self-hosted/",
    siteName: "Makora",
    type: "article",
    // A page's own openGraph replaces the site's, picture included, so name the shared picture again.
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
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
          <a href="/" className="brand" aria-label="Makora home">
            <Logo id="logo-sh" /> <span>Makora</span>
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
          <ThemeToggle />
          <a href="/#download" className="btn btn--violet btn--sm">
            Download
          </a>
        </nav>
      </header>

      <main id="guide-main">
        {/* ── Guide Hero ───────────────────────────────────── */}
        <section className="sh-hero" aria-labelledby="sh-hero-title">
          <div className="container sh-hero__inner">
            <h1 id="sh-hero-title" className="sh-hero__title">
              Run Makora on your own server
            </h1>
            <p className="sh-hero__lead">
              Keep your team&rsquo;s designs, photos and accounts on your own infrastructure. The usual install is one
              Docker Compose bundle, with its own database, file storage and automatic HTTPS. The same server also runs
              behind your own proxy, next to a database you already have, as a normal process, or on Kubernetes.
            </p>

            <p className="sh-hero__specs">Docker 24+ · Database &amp; file storage included · Automatic HTTPS · Linux x86-64 &amp; arm64</p>
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
            <a href="/" className="brand" aria-label="Makora home">
              <Logo id="logo-sh-foot" /> <span>Makora</span>
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
              <li>
                <a href="/developers/">Developer docs</a>
              </li>
            </ul>
          </nav>
        </div>
        <LegalFooterBase version={`Version ${release.version}`} />
      </footer>
    </>
  );
}
