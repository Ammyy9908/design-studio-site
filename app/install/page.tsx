import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { MacOlder, MacSteps, MacWhy, WindowsSteps, WindowsWhy } from "@/components/InstallSteps";
import { legal, release } from "@/lib/site";

export const metadata: Metadata = {
  title: "Opening Makora the first time",
  description:
    "Why macOS says “Makora” Not Opened and Windows says it protected your PC, and how to open Makora on Mac and Windows the first time.",
  alternates: { canonical: "/install/" },
  openGraph: {
    title: "Opening Makora the first time — Makora",
    description:
      "Why macOS and Windows warn the first time you open Makora, and the steps to open it.",
    url: "/install/",
    siteName: "Makora",
    type: "article",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630 }],
  },
};

const sections = [
  ["mac", "On a Mac"],
  ["windows", "On Windows"],
  ["help", "Still stuck?"],
] as const;

export default function InstallPage() {
  return (
    <LegalPage
      id="install"
      title="Opening Makora the first time"
      lead="macOS and Windows warn about apps that aren't signed by a paid developer certificate yet. Here's why you see the warning, and how to open Makora anyway."
      sections={sections}
      showUpdated={false}
    >
      <section id="mac">
        <h2>On a Mac</h2>
        <MacWhy />
        <MacSteps />
        <MacOlder />
        <p>
          Lost the file? <a href={release.mac.href}>Download Makora for Mac</a> again. It needs {release.mac.requirements}.
        </p>
      </section>

      <section id="windows">
        <h2>On Windows</h2>
        <WindowsWhy />
        <WindowsSteps />
        <p>
          Lost the file? <a href={release.windows.href}>Download Makora for Windows</a> again. It needs Windows 10
          or later, 64-bit.
        </p>
      </section>

      <section id="help">
        <h2>Still stuck?</h2>
        <p>
          Email <a href={`mailto:${legal.contactEmail}`}>{legal.contactEmail}</a> with your system version and a
          screenshot of the message, and we&rsquo;ll help. You can also use Makora in your browser at{" "}
          <a href="https://platform.makora.design">platform.makora.design</a>, with nothing to install.
        </p>
      </section>
    </LegalPage>
  );
}
