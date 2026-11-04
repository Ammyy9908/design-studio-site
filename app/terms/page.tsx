import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service — Makora",
  description:
    "The rules for using Makora: your account, who owns what you make, what you can't do with it, AI features, apps, and our limits of responsibility.",
};

const sections = [
  ["agreement", "Agreeing to these terms"],
  ["account", "Your account"],
  ["content", "Your work"],
  ["rules", "What you can't do"],
  ["publishing", "Websites you publish"],
  ["ai", "AI features"],
  ["apps", "Apps and other services"],
  ["ours", "Makora itself"],
  ["changes", "Changes to Makora"],
  ["ending", "Ending your use"],
  ["warranty", "No warranty"],
  ["liability", "Limits of responsibility"],
  ["updates", "Changes and contact"],
] as const;

export default function TermsPage() {
  const mail = `mailto:${legal.contactEmail}`;
  return (
    <LegalPage
      id="terms"
      title="Terms of Service"
      lead="The rules for using Makora: your account, who owns what you make, what isn't allowed, and what we can and can't promise."
      sections={sections}
    >
      <section id="agreement">
        <h2>Agreeing to these terms</h2>
        <p>
          These terms apply when you use the Makora service at <code>platform.makora.design</code>, the developer
          portal at <code>developers.makora.design</code>, or the Makora desktop app connected to them. By creating
          an account or using Makora, you agree to them and to our <a href="/privacy/">Privacy Policy</a>. If you
          use Makora for a company, you agree for that company too.
        </p>
        <p>
          If you run Makora on your own server, these terms cover the software you downloaded from us, and you are
          responsible for your server and the people who use it.
        </p>
      </section>

      <section id="account">
        <h2>Your account</h2>
        <ul>
          <li>You must be at least 13 years old, or older if the law where you live requires it.</li>
          <li>Give a real email address, and keep your password private. You are responsible for what happens in your account.</li>
          <li>Tell us straight away at <a href={mail}>{legal.contactEmail}</a> if you think someone else is using your account.</li>
        </ul>
      </section>

      <section id="content">
        <h2>Your work</h2>
        <p>
          You own what you make and upload: designs, documents, websites, photos, videos and fonts. To run Makora,
          you allow us to store, copy, process and display your work, only to provide the service to you and the
          people you share with or publish to. This permission ends when you delete the work or your account, apart
          from copies in backups until they expire.
        </p>
        <p>
          You must have the right to everything you upload, including photos, fonts, logos and music. Templates,
          stock photos and graphics from apps come with their own licences, which you must follow.
        </p>
      </section>

      <section id="rules">
        <h2>What you can&rsquo;t do</h2>
        <ul>
          <li>Break the law, or help someone else break it.</li>
          <li>Upload or publish content that infringes someone else&rsquo;s rights, such as copied designs, photos or trademarks.</li>
          <li>Make phishing pages, scams, malware, or pages that pretend to be another person or company.</li>
          <li>Harass, threaten or exploit anyone, or publish sexual content involving minors.</li>
          <li>Send spam, including through website forms or team invitations.</li>
          <li>Break, overload, probe or get around the security of Makora, or access accounts and data that aren&rsquo;t yours.</li>
          <li>Copy or resell Makora&rsquo;s service, or use it to train AI models, except as these terms allow.</li>
        </ul>
        <p>If you break these rules, we may remove the content, unpublish the website, or suspend the account.</p>
      </section>

      <section id="publishing">
        <h2>Websites you publish</h2>
        <p>
          A website you publish is public, and you are responsible for it, including its text, pictures and forms.
          If your site collects information from visitors through a form, you must tell them how you&rsquo;ll use it and
          follow the privacy laws that apply to you. If you connect your own domain, you must own it or be allowed to use it.
        </p>
      </section>

      <section id="ai">
        <h2>AI features</h2>
        <p>
          Ask Studio and AI image make text, websites and pictures from what you type, using outside AI providers
          (see the <a href="/privacy/#providers">Privacy Policy</a>). AI can be wrong, incomplete or similar to
          existing work. Check what it makes before you rely on it or publish it. You are responsible for how you use
          the results, as with anything else you make. AI features have usage limits per hour.
        </p>
      </section>

      <section id="apps">
        <h2>Apps and other services</h2>
        <p>
          Apps in Makora, such as GIPHY, Notion or YouTube, connect to services run by other companies. Those
          services have their own terms, and we are not responsible for them. Developers who publish apps through the
          developer portal must follow the rules in the <a href="/developers/">Developer docs</a> and only use the data
          people give their app to provide what the app promises.
        </p>
      </section>

      <section id="ours">
        <h2>Makora itself</h2>
        <p>
          Makora&rsquo;s software, name, logo, design and templates belong to us. You may use them only to use Makora
          as these terms allow. If you send us ideas or feedback, we may use them without owing you anything.
        </p>
      </section>

      <section id="changes">
        <h2>Changes to Makora</h2>
        <p>
          We keep improving Makora, so features may change or be removed. If we charge for a feature, we&rsquo;ll
          tell you the price before you pay, and nothing you already made becomes locked away without notice.
        </p>
      </section>

      <section id="ending">
        <h2>Ending your use</h2>
        <p>
          You can stop using Makora at any time, and ask us to delete your account at{" "}
          <a href={mail}>{legal.contactEmail}</a>. We may suspend or close an account that breaks these terms or puts
          other people or Makora at risk. Unless it would be unsafe or unlawful, we&rsquo;ll tell you first and give you
          a chance to download your work.
        </p>
      </section>

      <section id="warranty">
        <h2>No warranty</h2>
        <p>
          We work to keep Makora running and your work safe, but we provide it &ldquo;as is&rdquo;, without
          promises that it will always be available, free of errors, or fit for a particular purpose. Keep your own
          copies of work that matters to you.
        </p>
      </section>

      <section id="liability">
        <h2>Limits of responsibility</h2>
        <p>
          As far as the law allows, we are not responsible for indirect losses, such as lost profits, lost data or
          lost business, that come from using Makora or not being able to use it. Nothing in these terms limits
          responsibility that the law doesn&rsquo;t allow us to limit, or rights you have as a consumer where you live.
        </p>
      </section>

      <section id="updates">
        <h2>Changes and contact</h2>
        <p>
          If we change these terms, we&rsquo;ll update the date at the top. If the change matters, we&rsquo;ll tell you
          by email or in Makora before it applies. If you keep using Makora after that, you accept the new terms.
        </p>
        <p>
          Questions: <a href={mail}>{legal.contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
