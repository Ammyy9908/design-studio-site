import { faqs } from "@/lib/faqs";
import { legal, release, siteUrl } from "@/lib/site";

// /llms.txt and /llms-full.txt: a plain summary of Makora for AI assistants and AI search (llmstxt.org).
// Keep the facts here in step with the home page.

const summary = `# Makora

> Makora is one design app for presentations, social posts, videos, posters, invitations, whiteboards, documents and websites. It runs on Mac (Apple silicon, macOS 12 or later), on Windows 10 or later, and in a web browser. Teams can design together live, and companies can run the whole service on their own server.

- Website: ${siteUrl}/
- Web app: https://platform.makora.design
- Current version: ${release.version}
- Contact: ${legal.contactEmail}

## What you can make

- Presentations and decks, social media posts, reels and videos, posters, invitations, documents, sheets and whiteboards.
- Websites and link-in-bio pages, published to the web with one Publish button, no hosting to set up. Self-hosted servers can put a website on its own domain with automatic HTTPS.
- Start from templates, or describe what you need to Ask Studio, the built-in AI writer and website builder.

## Working together

- Live co-editing with everyone's cursors, comments with @mentions, and email notifications you can turn down or off.
- A voice call room for up to 6 people in every design, following a teammate's view, and cursor chat.
- Version history that saves by itself, with named versions and safe restore.
- The desktop app for Mac and Windows connects to the hosted service or to your own server.

## Apps and developers

- Apps add outside tools to the editor, such as stock photos, moving graphics, YouTube videos and Notion pages. Apps run in a sandbox and can't read your designs.
- Developers build apps as small web pages with the Makora SDK, and publish them through a developer portal with review before release.
`;

const links = `## Docs

- [Self-Hosted Guide](${siteUrl}/self-hosted/): run Makora on your own server with Docker Compose, your own proxy, database and storage, as a process, or on Kubernetes.
- [Self-hosted Canva alternative](${siteUrl}/self-hosted-canva-alternative/): what a team gets when it runs Makora on its own server, and how to install it.
- [Developer Docs](${siteUrl}/developers/): build apps for Makora: the portal, quickstart, manifest, SDK, keys, connected accounts, sandbox and publishing.

## Policies

- [Privacy Policy](${siteUrl}/privacy/): what Makora collects, why, who helps run it, and how to see or delete your data.
- [Terms of Service](${siteUrl}/terms/): the rules for using Makora.

## Optional

- [Full text for AI tools](${siteUrl}/llms-full.txt): this summary plus answers to common questions.
`;

export function llmsTxt(): string {
  return summary + "\n" + links;
}

export function llmsFullTxt(): string {
  const qa = faqs.map((f) => `### ${f.q}\n\n${f.a}\n`).join("\n");
  return summary + "\n## Common questions\n\n" + qa + "\n" + links.replace(/\n## Optional\n[\s\S]*$/, "\n");
}

export function textResponse(body: string): Response {
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
