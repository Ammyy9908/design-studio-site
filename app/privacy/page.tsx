import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { legal } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy — Makora",
  description:
    "What Makora collects when you use platform.makora.design and the desktop app, why, who helps us run it, and how to see or delete your data.",
};

const sections = [
  ["scope", "What this covers"],
  ["collect", "What we collect"],
  ["use", "How we use it"],
  ["google", "Google sign-in"],
  ["providers", "Who helps us run Makora"],
  ["apps", "Apps you add"],
  ["sharing", "Sharing and publishing"],
  ["cookies", "Cookies"],
  ["retention", "Keeping and deleting data"],
  ["rights", "Your choices"],
  ["security", "Security"],
  ["children", "Children"],
  ["changes", "Changes and contact"],
] as const;

export default function PrivacyPage() {
  const mail = `mailto:${legal.contactEmail}`;
  return (
    <LegalPage
      id="privacy"
      title="Privacy Policy"
      lead="What Makora collects when you use it, why, who helps us run it, and how to see or delete your data."
      sections={sections}
    >
      <section id="scope">
        <h2>What this covers</h2>
        <p>
          This policy covers the Makora service at <code>platform.makora.design</code>, the developer portal at{" "}
          <code>developers.makora.design</code>, this website, and the Makora desktop app when it is connected to
          our service. In this policy, &ldquo;we&rdquo; means the people who run Makora.
        </p>
        <p>
          Makora can also run on a company&rsquo;s own server (self-hosted). If you use Makora on a server that
          your organisation runs, that organisation decides what happens to your data, and this policy does not
          apply to it. The desktop app used offline keeps your designs on your own computer and sends us nothing.
        </p>
      </section>

      <section id="collect">
        <h2>What we collect</h2>
        <h3>Your account</h3>
        <ul>
          <li>Your name, email address and password. We store only a scrambled form of your password (an Argon2 hash), never the password itself.</li>
          <li>If you sign in with Google: your name, email address and profile picture from your Google account.</li>
        </ul>
        <h3>What you make and upload</h3>
        <ul>
          <li>Your designs, documents, decks, whiteboards and websites, with their earlier versions and comments.</li>
          <li>Photos, videos, fonts, logos and brand kits you upload.</li>
          <li>Teams you create or join, and who you share designs with.</li>
        </ul>
        <h3>What we need to run the service</h3>
        <ul>
          <li>Sign-in sessions, so you stay signed in.</li>
          <li>Which designs you opened recently, and your notifications and email settings.</li>
          <li>Which apps you installed or connected.</li>
          <li>The address of each request reaching our server, kept in short-lived server logs to keep the service working and stop abuse.</li>
        </ul>
        <h3>Information from other people</h3>
        <ul>
          <li>When you publish a website with a form, we store what visitors send through it, for you to read.</li>
          <li>During a Live Q&amp;A session, we pass the audience&rsquo;s questions to the presenter. They are not stored after the session.</li>
        </ul>
        <p>We don&rsquo;t use advertising or analytics trackers, and we don&rsquo;t sell your data.</p>
      </section>

      <section id="use">
        <h2>How we use it</h2>
        <ul>
          <li>To run Makora: saving and syncing your work, sharing it with the people you choose, and publishing what you publish.</li>
          <li>To send emails you need: checking your email address, resetting your password, team invitations, and comment notifications. You can turn comment emails off in Makora, or with the link in each one.</li>
          <li>To keep Makora safe: stopping abuse, fixing problems, and enforcing our <a href="/terms/">Terms of Service</a>.</li>
        </ul>
        <p>We don&rsquo;t read your designs except when you ask us for help, when the law requires it, or to deal with a report that a design breaks our Terms.</p>
      </section>

      <section id="google">
        <h2>Google sign-in</h2>
        <p>
          When you choose &ldquo;Continue with Google&rdquo;, Makora asks Google only for your name, email address
          and profile picture (the <code>openid</code>, <code>email</code> and <code>profile</code> scopes). We use
          them only to create your account and sign you in, and to show your name and picture to people you work
          with. We don&rsquo;t ask for access to your Gmail, Drive, Calendar or anything else in your Google account.
        </p>
        <p>
          Makora&rsquo;s use and transfer of information received from Google APIs adheres to the{" "}
          <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>,
          including the Limited Use requirements. We don&rsquo;t sell this information, use it for advertising, or
          let people read it, other than as described in this policy.
        </p>
      </section>

      <section id="providers">
        <h2>Who helps us run Makora</h2>
        <p>These companies process data for us, only to provide their service to Makora:</p>
        <ul>
          <li><strong>Oracle Cloud</strong> runs our server, in Mumbai, India.</li>
          <li><strong>Supabase</strong> hosts our database (accounts and designs), on Amazon Web Services in Tokyo, Japan.</li>
          <li><strong>Cloudflare</strong> stores uploaded files (R2) and relays the audio of voice calls when people can&rsquo;t connect directly.</li>
          <li><strong>Resend</strong> sends our emails.</li>
          <li><strong>Google</strong> signs you in, if you choose Google sign-in.</li>
        </ul>
        <p>Some features send data to an outside service only when you use them:</p>
        <ul>
          <li><strong>Ask Studio</strong> (writing and AI-made websites) sends what you type to <strong>Anthropic</strong>, and the text of the current document if you tick &ldquo;Use this document as context&rdquo;.</li>
          <li><strong>AI image</strong> in Replace image sends your description to <strong>Google Gemini</strong>.</li>
          <li><strong>Stock photos</strong> send a few search words to <strong>Pexels</strong>, never your designs.</li>
        </ul>
        <p>Because these companies are in several countries, your data may be stored and processed outside the country you live in.</p>
      </section>

      <section id="apps">
        <h2>Apps you add</h2>
        <p>
          Apps add outside tools to the editor, such as GIPHY, Notion or YouTube. An app only gets what you give it
          while you use it, and its requests go through our server. When you connect an account or send something to
          an app&rsquo;s service, that service&rsquo;s own privacy policy applies. You can disconnect an app at any time.
        </p>
      </section>

      <section id="sharing">
        <h2>Sharing and publishing</h2>
        <ul>
          <li>A design is private until you share it. People you share it with see it, along with your name and picture.</li>
          <li>A website you publish is public. Anyone with its address can see it.</li>
          <li>We may disclose data if the law requires it, or to protect people&rsquo;s safety. If Makora is ever sold or merged, your data would move with it under this policy.</li>
        </ul>
      </section>

      <section id="cookies">
        <h2>Cookies</h2>
        <ul>
          <li><code>studio_session</code> keeps you signed in, for up to 30 days.</li>
          <li><code>studio_oauth</code> is used for a few minutes during Google sign-in, then removed.</li>
          <li>This website remembers whether you chose the light or dark theme, in your own browser.</li>
        </ul>
        <p>There are no advertising or analytics cookies.</p>
      </section>

      <section id="retention">
        <h2>Keeping and deleting data</h2>
        <p>
          We keep your account and your work while your account exists. To delete your account, email{" "}
          <a href={mail}>{legal.contactEmail}</a> from the address you sign in with. We delete your account,
          designs and uploads within 30 days. Copies in our backups disappear as those backups expire.
        </p>
        <p>
          A design you move to the trash stays in your account until the account is deleted, so you can get it back.
          A photo you delete is removed straight away.
        </p>
      </section>

      <section id="rights">
        <h2>Your choices</h2>
        <ul>
          <li>You can change your name and picture, and turn email notifications on or off, in Makora.</li>
          <li>You can download your designs as files at any time.</li>
          <li>You can ask us for a copy of your data, to correct it, or to delete it, by emailing <a href={mail}>{legal.contactEmail}</a>. We reply within 30 days.</li>
        </ul>
        <p>Depending on where you live, privacy laws may give you more rights. We honour them through the same address.</p>
      </section>

      <section id="security">
        <h2>Security</h2>
        <p>
          Every connection to Makora uses HTTPS. Passwords are stored only as Argon2 hashes. Uploaded files are
          private, and our server checks that you may see a file before it sends it. No service is perfectly safe,
          so if we learn of a breach that affects you, we&rsquo;ll tell you.
        </p>
      </section>

      <section id="children">
        <h2>Children</h2>
        <p>Makora is not for children under 13. If you believe a child under 13 has an account, email us and we&rsquo;ll delete it.</p>
      </section>

      <section id="changes">
        <h2>Changes and contact</h2>
        <p>
          If we change this policy, we&rsquo;ll update the date at the top. If the change matters, we&rsquo;ll tell
          you by email or in Makora before it applies.
        </p>
        <p>
          Questions or requests: <a href={mail}>{legal.contactEmail}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
