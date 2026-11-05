import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { release } from "@/lib/site";

// A landing page for people looking for a design tool they can run on their own server.
// Keep the facts in step with the home page and the Self-Hosted Guide.

export const metadata: Metadata = {
  title: "A self-hosted Canva alternative",
  description:
    "Makora is a design app you can run on your own server: decks, social posts, videos, posters, docs and websites, with live teamwork and your own AI key.",
  alternates: { canonical: "/self-hosted-canva-alternative/" },
  openGraph: {
    title: "A self-hosted Canva alternative — Makora",
    description:
      "Decks, social posts, videos, posters, docs and websites, designed together and kept on your own server.",
    url: "/self-hosted-canva-alternative/",
    siteName: "Makora",
    type: "article",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const sections = [
  ["make", "What your team can make"],
  ["data", "Your data stays on your server"],
  ["together", "Design together"],
  ["ai", "AI with your own key"],
  ["apps", "Apps you approve"],
  ["install", "How to install it"],
] as const;

export default function SelfHostedCanvaAlternativePage() {
  return (
    <LegalPage
      id="canva-alt"
      title="A self-hosted Canva alternative"
      lead="Makora is a design app for presentations, social posts, videos, posters and websites that you can run on your own server. Your team gets an easy editor, and the designs, photos and accounts stay on your infrastructure."
      sections={sections}
      showUpdated={false}
    >
      <section id="make">
        <h2>What your team can make</h2>
        <ul>
          <li>Presentations and decks, social media posts, reels and videos, posters, invitations and cards.</li>
          <li>Documents, sheets and whiteboards with sticky notes and an endless canvas.</li>
          <li>Websites and link-in-bio pages, published with one Publish button. A self-hosted server can put a site on its own domain, with HTTPS set up for you.</li>
          <li>Templates to start from, and images, PDFs and videos to export.</li>
        </ul>
        <p>
          People use it in the browser, or in the desktop app for Mac and Windows connected to your server.
        </p>
      </section>

      <section id="data">
        <h2>Your data stays on your server</h2>
        <ul>
          <li>Designs, photos and accounts live in your own database and file storage, not on a service you don&rsquo;t control.</li>
          <li>The usual install includes its own database, file storage and automatic HTTPS. You can also use a database and S3-compatible storage you already run.</li>
          <li>Sign-in works with email and password, and with Google if you add your own OAuth client.</li>
          <li>You decide who gets an account, and when to update.</li>
        </ul>
      </section>

      <section id="together">
        <h2>Design together</h2>
        <ul>
          <li>Everyone edits at once and sees each other&rsquo;s cursors.</li>
          <li>Comments with @mentions, and email notifications people can turn down or off.</li>
          <li>A voice call room for up to 6 people in every design, and following a teammate&rsquo;s view.</li>
          <li>Version history that saves by itself, with named versions and safe restore.</li>
        </ul>
      </section>

      <section id="ai">
        <h2>AI with your own key</h2>
        <p>
          Ask Studio drafts text in Docs and builds websites from a description. It&rsquo;s off until you add a key,
          and the key stays on your server. It works with Anthropic, OpenAI, or any OpenAI-compatible endpoint, such as
          Ollama or vLLM running on your own hardware.
        </p>
      </section>

      <section id="apps">
        <h2>Apps you approve</h2>
        <p>
          Apps add tools to the editor, such as stock photos, moving graphics and pictures from Notion. They run in a
          sandbox and can&rsquo;t read your designs. On your own server you choose which apps people can see, or turn
          the marketplace off. Developers can build their own apps through your server&rsquo;s{" "}
          <a href="/developers/">developer portal</a>.
        </p>
      </section>

      <section id="install">
        <h2>How to install it</h2>
        <ul>
          <li>You need a Linux server (x86-64 or arm64) with Docker 24 or later.</li>
          <li>Download the server bundle, fill in a short settings file, and start it with Docker Compose.</li>
          <li>The same server also runs behind your own proxy, as a normal process, or on Kubernetes.</li>
        </ul>
        <p>
          The <a href="/self-hosted/">Self-Hosted Guide</a> walks through every step. Want to try the editor first?
          Open <a href="https://platform.makora.design">platform.makora.design</a> in your browser, or download the app
          for <a href={release.mac.href}>Mac</a> or <a href={release.windows.href}>Windows</a>.
        </p>
        <p>
          <small>Canva is a trademark of Canva Pty Ltd. Makora isn&rsquo;t affiliated with or endorsed by Canva.</small>
        </p>
      </section>
    </LegalPage>
  );
}
