import type { ReactNode } from "react";
import { Logo } from "@/components/Icons";
import { PageEffects } from "@/components/PageEffects";
import { ThemeToggle } from "@/components/ThemeToggle";
import { legal, navLinks, release } from "@/lib/site";

// The frame shared by the Privacy Policy and Terms of Service: the site header, a short hero,
// a table of contents beside the text (the Developer Docs layout), and the site footer.
export function LegalPage({
  id,
  title,
  lead,
  sections,
  children,
  showUpdated = true,
}: {
  id: string;
  title: string;
  lead: string;
  sections: readonly (readonly [string, string])[];
  children: ReactNode;
  showUpdated?: boolean;
}) {
  return (
    <>
      <a className="skip" href={`#${id}-main`}>
        Skip to content
      </a>
      <PageEffects />

      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <a href="/" className="brand" aria-label="Makora home">
            <Logo id={`logo-${id}`} /> <span>Makora</span>
          </a>
          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <a href="/#download" className="btn btn--violet btn--sm">
            Download
          </a>
        </nav>
      </header>

      <main id={`${id}-main`}>
        <section className="sh-hero" aria-labelledby={`${id}-title`}>
          <div className="container sh-hero__inner">
            <h1 id={`${id}-title`} className="sh-hero__title">
              {title}
            </h1>
            <p className="sh-hero__lead">{lead}</p>
            {showUpdated && <p className="legal__updated">Last updated {legal.updated}</p>}
          </div>
        </section>

        <section className="sh-body">
          <div className="container docs">
            <nav className="docs__toc" aria-label="On this page">
              {sections.map(([sid, label]) => (
                <a key={sid} href={`#${sid}`} data-nav-link="">
                  {label}
                  <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
                </a>
              ))}
            </nav>
            <article className="docs__body">{children}</article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <a href="/" className="brand" aria-label="Makora home">
              <Logo id={`logo-${id}-foot`} /> <span>Makora</span>
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
              <li>
                <a href="/self-hosted-canva-alternative/">Self-hosted Canva alternative</a>
              </li>
            </ul>
          </nav>
          <nav aria-label="Download">
            <h2 className="footer__h">Download</h2>
            <ul>
              <li>
                <a href={release.mac.href} download>
                  Mac
                </a>
              </li>
              <li>
                <a href={release.windows.href} download>
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

// The footer's last line on every page: copyright, the legal links and the version.
export function LegalFooterBase({ version }: { version: string }) {
  return (
    <div className="container footer__base">
      <span>© {new Date().getFullYear()} Makora</span>
      <span className="footer__legal">
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
      </span>
      <span>{version}</span>
    </div>
  );
}
