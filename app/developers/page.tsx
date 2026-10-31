import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import { Logo } from "@/components/Icons";
import { PageEffects } from "@/components/PageEffects";
import { navLinks, release } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer Docs — Design Studio",
  description:
    "Build apps for Design Studio on your own self-hosted server: turn on the developer portal, follow the quickstart, and read the manifest, SDK and sandbox reference.",
};

const sections = [
  ["overview", "How apps work"],
  ["setup", "Turn on the portal"],
  ["quickstart", "Quickstart"],
  ["manifest", "The manifest"],
  ["sdk", "The SDK"],
  ["keys", "Using a key"],
  ["accounts", "Connecting accounts"],
  ["sandbox", "The sandbox"],
  ["publishing", "Reviewing and publishing"],
] as const;

const SETUP_ENV = `# A second address for the portal. Point its DNS at this server first.
DEVELOPER_URL=https://developers.example.com
# These people invite developers and review versions.
ADMIN_EMAILS=you@example.com
# Encrypts app keys and connected accounts. Don't change it later.
# Create one with: openssl rand -base64 32
APP_KEYS_SECRET=`;

const QUICK_MANIFEST = `{
  "id": "placeholder-pictures",
  "name": "Placeholder Pictures",
  "version": "1.0.0",
  "developer": "Your name",
  "description": "Add a placeholder picture to your design.",
  "category": "graphics",
  "entry": "index.html",
  "permissions": ["design:addImage"],
  "network": [{ "host": "picsum.photos" }, { "host": "fastly.picsum.photos" }],
  "links": [],
  "secrets": []
}`;

const QUICK_HTML = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Placeholder Pictures</title>
    <link rel="stylesheet" href="app.css" />
  </head>
  <body>
    <button id="add" type="button">Add a picture</button>
    <p id="status" role="status"></p>
    <script src="/app-sdk/v1.js"></script>
    <script src="app.js"></script>
  </body>
</html>`;

const QUICK_CSS = `body {
  margin: 0;
  padding: 14px;
  font: 13px/1.4 system-ui, sans-serif;
  background: #fff;
  color: #1a1f1c;
}
:root[data-theme='dark'] body {
  background: #1b1e1b;
  color: #edf0ec;
}
button {
  width: 100%;
  height: 34px;
}`;

const QUICK_JS = `const status = document.getElementById('status')

document.getElementById('add').addEventListener('click', async () => {
  status.textContent = 'Adding…'
  try {
    const res = await studio.network.fetch({ url: 'https://picsum.photos/800/600.jpg' })
    if (!res.dataUrl) throw new Error('That was not a picture.')
    await studio.design.addImage({ dataUrl: res.dataUrl })
    status.textContent = ''
  } catch (err) {
    status.textContent = err.message
  }
})`;

const FETCH_EXAMPLE = `const res = await studio.network.fetch({
  url: 'https://api.example.com/search',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query })
})
// res: { status, contentType, text, dataUrl }`;

const KEY_EXAMPLE = `{
  "network": [
    {
      "host": "api.pexels.com",
      "headers": { "Authorization": "{{secret:PEXELS_API_KEY}}" },
      "perHour": 150,
      "cacheSeconds": 600
    },
    { "host": "images.pexels.com" }
  ],
  "secrets": ["PEXELS_API_KEY"]
}`;

const OAUTH_EXAMPLE = `{
  "oauth": {
    "authorizeUrl": "https://api.notion.com/v1/oauth/authorize",
    "tokenUrl": "https://api.notion.com/v1/oauth/token",
    "params": { "owner": "user" },
    "clientAuth": "basic",
    "tokenFormat": "json"
  },
  "network": [
    {
      "host": "api.notion.com",
      "headers": {
        "Authorization": "Bearer {{account:token}}",
        "Notion-Version": "2022-06-28"
      },
      "perHour": 500
    }
  ],
  "secrets": ["OAUTH_CLIENT_ID", "OAUTH_CLIENT_SECRET"]
}`;

const OAUTH_APP = `const { connected } = await studio.account.status()
if (!connected) showConnectButton()

// From a click, so the browser allows the new window.
button.addEventListener('click', async () => {
  const { connected } = await studio.account.connect()
  if (connected) showPages()
})

try {
  const res = await studio.network.fetch({ url: 'https://api.notion.com/v1/users/me' })
  // A 401 means they revoked access at the provider: ask them to connect again.
} catch (err) {
  if (err.code === 'NOT_CONNECTED') showConnectButton()
}`;

function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="sh-table-wrapper">
      <table className="sh-table">
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const C = ({ children }: { children: string }) => <code>{children}</code>;

export default function DevelopersPage() {
  return (
    <>
      <a className="skip" href="#docs-main">
        Skip to the docs
      </a>
      <PageEffects />

      <header className="site-header">
        <nav className="nav container" aria-label="Main">
          <a href="/" className="brand" aria-label="Design Studio home">
            <Logo id="logo-dev" /> <span>Design Studio</span>
          </a>
          <ul className="nav__links">
            {navLinks.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  className={l.id === "developers" ? "is-active" : ""}
                  aria-current={l.id === "developers" ? "page" : undefined}
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

      <main id="docs-main">
        <section className="sh-hero" aria-labelledby="docs-title">
          <div className="container sh-hero__inner">
            <h1 id="docs-title" className="sh-hero__title reveal" data-reveal="scale">
              Build apps for Design Studio
            </h1>
            <p className="sh-hero__lead reveal">
              Apps are built and reviewed in a developer portal that runs on your own self-hosted server. Download the
              server bundle, turn the portal on, and use these docs to make your first app.
            </p>
          </div>
        </section>

        <section className="sh-body">
          <div className="container docs">
            <nav className="docs__toc" aria-label="On this page">
              {sections.map(([id, label]) => (
                <a key={id} href={`#${id}`}>{label}</a>
              ))}
            </nav>

            <article className="docs__body">
              <section id="overview">
                <h2>How apps work</h2>
                <p>An app is a small web page from outside Design Studio. It runs beside the canvas in a sandbox, and everything it does goes through a checkpoint.</p>
                <ol className="docs__flow">
                  <li><strong>Your app</strong>A sandboxed frame with no network, cookies or storage</li>
                  <li><strong>The editor</strong>Checks each request against what the person approved</li>
                  <li><strong>The server</strong>Checks the install and your manifest, then adds keys</li>
                  <li><strong>Outside services</strong>Only the hosts in your manifest, over https</li>
                </ol>
                <h3>What an app can do</h3>
                <ul>
                  <li>Add a picture to the design, or replace the selected one.</li>
                  <li>See whether a picture is selected.</li>
                  <li>Reach the services listed in its manifest, through the server.</li>
                  <li>Save a small object for each person, up to 64 KB.</li>
                  <li>Open links on hosts it lists, in the person&rsquo;s browser.</li>
                  <li>Use each person&rsquo;s own account with a service, once they connect it.</li>
                </ul>
                <p>It can&rsquo;t read the design&rsquo;s contents, add text, or see who the person is.</p>
                <h3>Two ways to use a service</h3>
                <Table
                  head={["", "A shared key", "Each person’s account"]}
                  rows={[
                    ["Who signs in", "You, once", "Each person, with OAuth"],
                    ["Whose data", "The same for everyone", "Only that person’s"],
                    ["Good for", "Stock photos and public data", "Notion, Drive and anything private"],
                    ["Read more", <a key="k" href="#keys">Using a key</a>, <a key="a" href="#accounts">Connecting accounts</a>],
                  ]}
                />
                <p>Never use a shared key for private data. Everyone who installs your app could see whatever that key can reach.</p>
              </section>

              <section id="setup">
                <h2>Turn on the portal</h2>
                <p>The portal is part of your server, and it&rsquo;s off until you set it up. If you don&rsquo;t have a server yet, start with the <a href="/self-hosted/">Self-Hosted Guide</a>. The portal needs server version 0.1.69 or newer.</p>
                <ol>
                  <li>Pick an address for the portal, such as <C>developers.example.com</C>, and point its DNS at your server.</li>
                  <li>Add these settings to <C>.env</C> next to <C>docker-compose.yml</C>.</li>
                </ol>
                <CodeBlock title=".env" code={SETUP_ENV} />
                <ol start={3}>
                  <li>Restart the server. The bundle&rsquo;s Caddy gets the new address its HTTPS certificate.</li>
                </ol>
                <CodeBlock code="docker compose --profile https up -d" />
                <ol start={4}>
                  <li>Open your <C>DEVELOPER_URL</C> and sign in with an email from <C>ADMIN_EMAILS</C>.</li>
                  <li>Invite anyone else who will build apps. They need a verified email on your server.</li>
                </ol>
                <p>On Kubernetes or behind your own proxy, set the same three values on the server and route the portal&rsquo;s hostname to it.</p>
                <div className="sh-callout sh-callout--info">
                  <strong>The apps you approve stay on your server.</strong> People on it also see apps from the Design Studio marketplace. To limit what they see, set <C>APPS_ALLOWED</C> to <C>none</C> or to a list of app ids. <C>MARKETPLACE_URL=off</C> stops reading the marketplace.
                </div>
              </section>

              <section id="quickstart">
                <h2>Quickstart</h2>
                <p>Build an app that adds a placeholder picture to a design. You need access to your server&rsquo;s portal, and no build tools.</p>
                <h3>1. Create the files</h3>
                <p>Put these four files in one folder.</p>
                <CodeBlock title="manifest.json" language="json" code={QUICK_MANIFEST} />
                <CodeBlock title="index.html" language="html" code={QUICK_HTML} />
                <CodeBlock title="app.css" language="css" code={QUICK_CSS} />
                <CodeBlock title="app.js" language="javascript" code={QUICK_JS} />
                <p><C>/app-sdk/v1.js</C> gives your page <C>window.studio</C>. Scripts must be in their own files, because the sandbox refuses inline ones.</p>
                <h3>2. Zip them</h3>
                <p>The manifest must be at the top of the zip, not inside a folder.</p>
                <CodeBlock code="zip app.zip manifest.json index.html app.css app.js" />
                <h3>3. Upload it</h3>
                <ol>
                  <li>Open your portal and sign in.</li>
                  <li>Create the app id <C>placeholder-pictures</C>. It must match the manifest.</li>
                  <li>Choose <strong>Upload zip</strong>. If something is wrong, the portal says what.</li>
                </ol>
                <h3>4. Try it</h3>
                <p>Choose <strong>Try it</strong>, open any design and find the app in the side panel. Only you can see this test version. Press the button, and a picture lands on the page.</p>
                <p>To change it, upload the zip again. A draft is replaced as long as the version number stays the same.</p>
                <h3>5. Submit it</h3>
                <p>When it works, choose <strong>Submit for review</strong>. An admin on your server reviews it, as described in <a href="#publishing">Reviewing and publishing</a>.</p>
              </section>

              <section id="manifest">
                <h2>The manifest</h2>
                <p><C>manifest.json</C> sits at the top of your zip. It describes your app and is the full list of what it can do.</p>
                <Table
                  head={["Field", "Meaning"]}
                  rows={[
                    [<C key="1">id</C>, "Lowercase letters, digits and hyphens, starting with a letter, 2 to 40 characters. Must match the app id in the portal."],
                    [<C key="2">name</C>, "Up to 60 characters."],
                    [<C key="3">version</C>, "Like 1.2.3. An update needs a higher number."],
                    [<C key="4">developer</C>, "Who it is by, up to 80 characters."],
                    [<C key="5">description</C>, "What it does, up to 500 characters."],
                    [<C key="6">whatsNew</C>, "Optional. What changed in this version, up to 500 characters. People read it before they choose to update."],
                    [<C key="7">category</C>, <>Optional. One of <C>photos</C>, <C>graphics</C>, <C>ai</C>, <C>text</C>, <C>data</C>, <C>publish</C>, <C>productivity</C>, <C>other</C>.</>],
                    [<C key="8">entry</C>, "The HTML file to open."],
                    [<C key="9">icon</C>, "Optional. A file in the package."],
                    [<C key="10">screenshots</C>, "Optional. Up to 6 pictures for the marketplace page."],
                    [<C key="11">website, support, privacy</C>, "Optional https links for the marketplace page."],
                    [<C key="12">permissions</C>, "What it may do in a design."],
                    [<C key="13">network</C>, "The only hosts it can reach."],
                    [<C key="14">links</C>, "Hosts it may open in the person’s browser."],
                    [<C key="15">secrets</C>, "Names of the keys you save in the portal."],
                    [<C key="16">oauth</C>, "Optional. Lets each person connect their own account."],
                  ]}
                />
                <h3>Permissions</h3>
                <Table
                  head={["Permission", "What people are told"]}
                  rows={[
                    [<C key="a">design:addImage</C>, "Add pictures to your design"],
                    [<C key="b">design:replaceImage</C>, "Replace the picture you have selected"],
                    [<C key="c">design:readSelection</C>, "See whether a picture is selected"],
                  ]}
                />
                <p>An unknown permission makes the package invalid. Ask only for what you use: an update that asks for more has to be approved by each person before they get it.</p>
                <h3>Network rules</h3>
                <Table
                  head={["Field", "Meaning"]}
                  rows={[
                    [<C key="a">host</C>, "The exact host name. No wildcards."],
                    [<C key="b">headers</C>, <>Added by the server, for this host alone. Allowed: <C>Authorization</C>, <C>Accept</C>, <C>Content-Type</C>, <C>X-Api-Key</C>, and any name ending in <C>-Version</C>.</>],
                    [<C key="c">perHour</C>, "Caps requests to this host. With a shared key the cap is across your whole app; with an account, it is per person."],
                    [<C key="d">cacheSeconds</C>, "Shares a GET’s answer between people, up to a day. Not allowed with a person’s own account."],
                  ]}
                />
                <h3>What the zip can hold</h3>
                <p>HTML, JS, CSS, JSON, PNG, JPEG, WebP, SVG and WOFF2 files, up to 32 MB and 300 files.</p>
              </section>

              <section id="sdk">
                <h2>The SDK</h2>
                <p>Load <C>/app-sdk/v1.js</C> as a plain script. Every call returns a promise, and a refused call rejects with an <C>Error</C> that has a <C>code</C>.</p>
                <h3>Design</h3>
                <Table
                  head={["Call", "Needs"]}
                  rows={[
                    [<C key="a">{"studio.design.addImage({ dataUrl })"}</C>, <C key="a2">design:addImage</C>],
                    [<C key="b">{"studio.design.replaceImage({ dataUrl })"}</C>, <C key="b2">design:replaceImage</C>],
                    [<C key="c">studio.design.getSelection()</C>, <C key="c2">design:readSelection</C>],
                  ]}
                />
                <p><C>dataUrl</C> must be a PNG, JPEG or WebP data URL of at most 20 MB. <C>getSelection</C> resolves <C>{"{ type: 'image' | 'other' | 'none' }"}</C>.</p>
                <h3>Network</h3>
                <CodeBlock language="javascript" code={FETCH_EXAMPLE} />
                <p>Only GET and POST, and only <C>Accept</C> and <C>Content-Type</C> headers from your code. Text and JSON arrive in <C>text</C>, and pictures in <C>dataUrl</C>, ready for <C>addImage</C>.</p>
                <h3>Storage, links and theme</h3>
                <Table
                  head={["Call", "Does"]}
                  rows={[
                    [<C key="a">studio.storage.get()</C>, "This person’s saved object for your app."],
                    [<C key="b">studio.storage.set(object)</C>, "Replaces it, up to 64 KB."],
                    [<C key="c">studio.links.open(url)</C>, <>Opens a host in your <C>links</C>, in the browser.</>],
                    [<C key="d">{"studio.onTheme((theme) => …)"}</C>, <>Tells you <C>light</C> or <C>dark</C>. <C>{"<html data-theme>"}</C> is also set.</>],
                  ]}
                />
                <h3>Accounts</h3>
                <Table
                  head={["Call", "Does"]}
                  rows={[
                    [<C key="a">studio.account.status()</C>, <>Resolves <C>{"{ connected }"}</C>.</>],
                    [<C key="b">studio.account.connect()</C>, <>Opens the provider&rsquo;s sign-in. Call it from a click. Resolves <C>{"{ connected }"}</C> when they finish, or after 5 minutes.</>],
                    [<C key="c">studio.account.disconnect()</C>, "Forgets this person’s token on this server."],
                  ]}
                />
                <h3>Error codes</h3>
                <Table
                  head={["Code", "What to do"]}
                  rows={[
                    [<C key="1">NOT_ALLOWED</C>, "Add the permission or link host to your manifest."],
                    [<C key="2">HOST_NOT_ALLOWED</C>, "Add the host to network. A redirect to an unlisted host also causes this."],
                    [<C key="3">NOT_CONNECTED</C>, "Show your connect button."],
                    [<C key="4">NOT_CONFIGURED</C>, "A key is missing. Save it in the portal."],
                    [<C key="5">NOT_INSTALLED</C>, "The person removed the app, or hasn’t approved this version."],
                    [<C key="6">READ_ONLY</C>, "The design is view-only. Tell the person."],
                    [<C key="7">NO_SELECTION</C>, "Ask them to select a picture first."],
                    [<C key="8">RATE_LIMITED</C>, "Too many requests. Slow down and try again."],
                    [<C key="9">BUSY</C>, "Your perHour limit was reached. Try again later."],
                    [<C key="10">BLOCKED</C>, "The response is too large, or a type apps can’t receive."],
                    [<C key="11">PROVIDER_ERROR</C>, "The service couldn’t be reached."],
                    [<C key="12">INVALID</C>, "The call’s input is wrong, such as a picture in the wrong format."],
                  ]}
                />
              </section>

              <section id="keys">
                <h2>Using a key</h2>
                <p>If a service needs an API key that doesn&rsquo;t belong to any one person, you save it in the portal and the server adds it to your requests. Your code never sees it.</p>
                <CodeBlock title="manifest.json" language="json" code={KEY_EXAMPLE} />
                <ol>
                  <li>List the key&rsquo;s name in <C>secrets</C>, and use it in a header as <C>{"{{secret:NAME}}"}</C>.</li>
                  <li>Upload your zip. A field for each key appears in the portal.</li>
                  <li>Paste the key and save it. It is encrypted and can&rsquo;t be read back.</li>
                </ol>
                <p>Your code calls the service without the key. The server adds it for that host alone, and removes it from any response that echoes it.</p>
                <p>A key&rsquo;s limit is shared by everyone using your app. Set <C>perHour</C> a little below it, and use <C>cacheSeconds</C> so people asking the same thing share one answer.</p>
                <p>For an app from the Design Studio marketplace, such as Pexels, you supply the key yourself in <C>.env</C>, as <C>APP_SECRET_&lt;APP ID&gt;_&lt;NAME&gt;</C>.</p>
              </section>

              <section id="accounts">
                <h2>Connecting accounts</h2>
                <p>To show people their own data, each person connects their own account with OAuth. The server keeps their token and adds it to your requests.</p>
                <h3>1. Declare it</h3>
                <CodeBlock title="manifest.json" language="json" code={OAUTH_EXAMPLE} />
                <Table
                  head={["Field", "Meaning"]}
                  rows={[
                    [<C key="a">authorizeUrl, tokenUrl</C>, "The provider’s addresses, over https."],
                    [<C key="b">scopes</C>, "Optional. What to ask the provider for."],
                    [<C key="c">params</C>, "Optional. Extra parameters for the sign-in page."],
                    [<C key="d">clientAuth</C>, <><C>body</C> (default) or <C>basic</C>: how the server identifies your app to the provider. Check its docs.</>],
                    [<C key="e">tokenFormat</C>, <><C>form</C> (default) or <C>json</C>: how it sends that request.</>],
                  ]}
                />
                <p>A header using <C>{"{{account:token}}"}</C> carries the person&rsquo;s token. That host can&rsquo;t use <C>cacheSeconds</C>, because the cache is shared.</p>
                <h3>2. Register with the provider</h3>
                <ol>
                  <li>Create an OAuth app or connection in the provider&rsquo;s developer settings.</li>
                  <li>Upload your zip. The portal shows the redirect address to give the provider.</li>
                  <li>Save the provider&rsquo;s client id and secret as <C>OAUTH_CLIENT_ID</C> and <C>OAUTH_CLIENT_SECRET</C>.</li>
                </ol>
                <h3>3. Use it in your app</h3>
                <CodeBlock title="app.js" language="javascript" code={OAUTH_APP} />
                <h3>How it is kept safe</h3>
                <ul>
                  <li>Tokens are encrypted, and kept per person and per app.</li>
                  <li>A token about to expire is refreshed. If that is refused, the person connects again.</li>
                  <li>The browser must be signed in to Design Studio as the person who asked, so a link sent to someone else can&rsquo;t attach their account to the sender&rsquo;s login.</li>
                  <li>Design Studio shows a Disconnect button under your app, so people can always start again, even if your app shows an error.</li>
                  <li>Disconnecting or removing your app deletes the token from the server. Revoking it at the provider is up to the person, so handle a 401 by asking them to connect again.</li>
                </ul>
              </section>

              <section id="sandbox">
                <h2>The sandbox</h2>
                <p>Your app is someone else&rsquo;s code to the people using it, so the browser treats it as a stranger. Three separate checks mean one mistake doesn&rsquo;t open everything.</p>
                <Table
                  head={["Not available", "Do this instead"]}
                  rows={[
                    ["Inline scripts", "Put scripts in their own files."],
                    ["Scripts or styles from other sites", "Include them in your zip."],
                    [<C key="a">fetch</C>, <C key="b">studio.network.fetch</C>],
                    ["Pictures from other sites", <>Fetch them and use the <C>dataUrl</C> as the image&rsquo;s <C>src</C>.</>],
                    [<>Cookies and <C>localStorage</C></>, <C key="c">studio.storage</C>],
                    ["Form submission", "Handle Enter or a button click yourself."],
                    ["Popups and new tabs", <C key="d">studio.links.open</C>],
                    ["Nested frames", "Build the feature into your page."],
                  ]}
                />
                <h3>The three checks</h3>
                <ol>
                  <li><strong>The browser.</strong> Your files are served with a sandbox policy, so the app can&rsquo;t read the session or the editor&rsquo;s page, and has no network of its own.</li>
                  <li><strong>The editor.</strong> It only accepts messages from your frame, and checks each one against what the person approved. View-only designs refuse changes.</li>
                  <li><strong>The server.</strong> It checks again that the person installed and approved this version. It reaches only listed hosts, over https on the default port, and refuses private addresses.</li>
                </ol>
                <h3>Limits</h3>
                <Table
                  head={["What", "Limit"]}
                  rows={[
                    ["Requests", "600 per person, per app, per hour. Pictures count."],
                    ["Request body", "64 KB, and 2,048 characters for the address"],
                    ["Response", "12 MB. JSON, text and pictures only."],
                    ["Pictures added", "20 MB each, and 10 changes every 10 seconds"],
                    ["Saved data", "64 KB per person"],
                    ["Opening links", "One every 2 seconds"],
                    ["Connecting an account", "Twice a minute"],
                  ]}
                />
              </section>

              <section id="publishing">
                <h2>Reviewing and publishing</h2>
                <p>Every version is reviewed by an admin on your server before it reaches anyone. An approved version never changes.</p>
                <ol>
                  <li><strong>Draft.</strong> Upload it, as often as you need. Your zip is checked at once.</li>
                  <li><strong>Try.</strong> A test version runs in the same sandbox, visible only to you, and to reviewers once submitted.</li>
                  <li><strong>Waiting for review.</strong> A submitted version is locked.</li>
                  <li><strong>Approved or changes requested.</strong> A reviewer&rsquo;s note says what to change. Upload it again and resubmit.</li>
                </ol>
                <h3>What to check when you review</h3>
                <ul>
                  <li>It does what its description says, and it works.</li>
                  <li>It asks only for what it uses. On an update, you see what it newly asks for.</li>
                  <li>A shared key doesn&rsquo;t expose private data.</li>
                </ul>
                <h3>Updates</h3>
                <p>An update needs a higher version number and another review. Once approved, it is offered as <strong>Update app</strong>, with your <C>whatsNew</C> text. Each person stays on their version until they choose to update, and sees what the update newly asks for. New installs get the latest version.</p>
                <h3>Reports and removal</h3>
                <p>Anyone can report an app from its marketplace page. An admin can remove an app for everyone at once, including people who installed it, and the developer sees the reason in the portal.</p>
              </section>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__base">
          <span>© {new Date().getFullYear()} Design Studio</span>
          <span>Version {release.version}</span>
        </div>
      </footer>
    </>
  );
}
