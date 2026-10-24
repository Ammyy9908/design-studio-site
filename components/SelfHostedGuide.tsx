"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";
import {
  AppleIcon,
  CpuIcon,
  DatabaseIcon,
  DownloadIcon,
  KeyIcon,
  MailIcon,
  RefreshIcon,
  ServerIcon,
  SparkleIcon,
  ShieldIcon,
  TerminalIcon,
} from "@/components/Icons";
import { release } from "@/lib/site";

type DeploymentMode = "https" | "local";
type Tab = "quickstart" | "requirements" | "settings" | "desktop" | "email" | "askstudio" | "maintenance";

const settings = [
  {
    name: "PUBLIC_URL",
    group: "general",
    required: true,
    example: "https://studio.example.com",
    description: "The address your team opens Design Studio at. Share links, sign-in and emails use it. No trailing slash.",
  },
  {
    name: "LIVE_URL",
    group: "general",
    required: false,
    example: "(empty = PUBLIC_URL)",
    description: "Optional second address for the audience to join Live Q&A during presentations, such as a short domain.",
  },
  {
    name: "SESSION_SECRET",
    group: "secrets",
    required: true,
    example: "openssl rand -hex 32",
    description: "A random value that keeps sign-ins secure. Keep it the same across restarts.",
  },
  {
    name: "POSTGRES_PASSWORD",
    group: "secrets",
    required: true,
    example: "openssl rand -hex 32",
    description: "Password for the included database. It is set when the database is first created.",
  },
  {
    name: "S3_SECRET_KEY",
    group: "secrets",
    required: true,
    example: "openssl rand -hex 32",
    description: "Password for the included file storage, where designs and photos are kept.",
  },
  {
    name: "SMTP_HOST",
    group: "email",
    required: false,
    example: "smtp.postmarkapp.com",
    description: "Your email provider's SMTP server. Needed for sign-up verification and password reset emails.",
  },
  {
    name: "SMTP_PORT",
    group: "email",
    required: false,
    example: "587",
    description: "587 (STARTTLS) or 465 (TLS).",
  },
  {
    name: "SMTP_USER / SMTP_PASS",
    group: "email",
    required: false,
    example: "from your provider",
    description: "The SMTP username and password, or API token, from your email provider.",
  },
  {
    name: "SMTP_FROM",
    group: "email",
    required: false,
    example: "Design Studio <no-reply@studio.example.com>",
    description: "The sender address. Use one your email provider has verified for your domain.",
  },
  {
    name: "GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET",
    group: "signin",
    required: false,
    example: "(empty = off)",
    description: "Turns on “Continue with Google”. Create a Web application OAuth client with the redirect address <PUBLIC_URL>/api/auth/google/callback.",
  },
  {
    name: "ASK_STUDIO_PROVIDER",
    group: "ask",
    required: false,
    example: "openai",
    description: "Turns on the Ask Studio writing assistant in Docs: anthropic, or openai for any OpenAI-compatible endpoint. Empty = off.",
  },
  {
    name: "ASK_STUDIO_API_KEY",
    group: "ask",
    required: false,
    example: "from your AI provider",
    description: "Your own API key. It stays on the server and never reaches browsers or the desktop app. Optional for a local model with a custom base URL.",
  },
  {
    name: "ASK_STUDIO_MODEL",
    group: "ask",
    required: false,
    example: "gpt-4.1-mini",
    description: "The model id to use. Required when a provider is set. A fast, small chat model is enough.",
  },
  {
    name: "ASK_STUDIO_BASE_URL",
    group: "ask",
    required: false,
    example: "http://host.docker.internal:11434/v1",
    description: "API address for Ollama, vLLM or another gateway. Leave empty for OpenAI or Anthropic themselves.",
  },
  {
    name: "ASK_STUDIO_RATE_PER_HOUR / _MAX_OUTPUT_TOKENS / _TIMEOUT_SECONDS",
    group: "ask",
    required: false,
    example: "20 / 2000 / 60",
    description: "Limits: requests per person per hour, answer length, and seconds before giving up (at most 110).",
  },
  {
    name: "DATABASE_URL",
    group: "external",
    required: false,
    example: "postgres://…?sslmode=require",
    description: "Use your own managed PostgreSQL instead of the included database.",
  },
  {
    name: "S3_ENDPOINT, S3_BUCKET, S3_ACCESS_KEY, S3_USE_SSL",
    group: "external",
    required: false,
    example: "s3.amazonaws.com",
    description: "Use your own S3-compatible storage (Amazon S3, Cloudflare R2, Backblaze B2…) instead of the included one.",
  },
  {
    name: "TRUST_PROXY",
    group: "general",
    required: false,
    example: "true",
    description: "Keep true when Design Studio runs behind the included HTTPS proxy, a load balancer or a tunnel. Set false only if visitors reach the server directly.",
  },
  {
    name: "STUDIO_VERSION",
    group: "general",
    required: false,
    example: release.version,
    description: "Which Design Studio server version to run. Change it when you upgrade.",
  },
];

const settingGroups = [
  { id: "all", label: "All" },
  { id: "general", label: "General" },
  { id: "secrets", label: "Secrets" },
  { id: "email", label: "Email" },
  { id: "signin", label: "Google sign-in" },
  { id: "ask", label: "Ask Studio" },
  { id: "external", label: "Your own database & storage" },
];

const tabs: { id: Tab; label: string; icon: typeof TerminalIcon }[] = [
  { id: "quickstart", label: "Quick start", icon: TerminalIcon },
  { id: "requirements", label: "Requirements", icon: CpuIcon },
  { id: "settings", label: "Settings (.env)", icon: KeyIcon },
  { id: "desktop", label: "Desktop app", icon: AppleIcon },
  { id: "email", label: "Email", icon: MailIcon },
  { id: "askstudio", label: "Ask Studio (AI)", icon: SparkleIcon },
  { id: "maintenance", label: "Backups & updates", icon: RefreshIcon },
];

export function SelfHostedGuide() {
  const [mode, setMode] = useState<DeploymentMode>("https");
  const [activeTab, setActiveTab] = useState<Tab>("quickstart");
  const [group, setGroup] = useState<string>("all");

  const shownSettings = settings.filter((s) => group === "all" || s.group === group);
  const url = mode === "https" ? "https://studio.example.com" : "http://localhost:8080";

  return (
    <div className="sh-guide">
      {/* ── Deployment mode ───────────────────────────────── */}
      <div className="sh-mode-banner">
        <div className="sh-mode-banner__inner">
          <div className="sh-mode-banner__text">
            <strong>Setting up:</strong>
            <span>{mode === "https" ? "A server for your team, on your own domain with HTTPS" : "A quick trial on one computer"}</span>
          </div>
          <div className="sh-mode-pills" role="radiogroup" aria-label="Deployment mode">
            <button
              type="button"
              className={`sh-mode-pill ${mode === "https" ? "is-active" : ""}`}
              onClick={() => setMode("https")}
              aria-checked={mode === "https"}
              role="radio"
            >
              <ShieldIcon className="sh-mode-pill__icon" /> Team server (HTTPS)
            </button>
            <button
              type="button"
              className={`sh-mode-pill ${mode === "local" ? "is-active" : ""}`}
              onClick={() => setMode("local")}
              aria-checked={mode === "local"}
              role="radio"
            >
              <TerminalIcon className="sh-mode-pill__icon" /> Try it locally
            </button>
          </div>
        </div>
      </div>

      {/* ── Sections ──────────────────────────────────────── */}
      <nav className="sh-tabs" aria-label="Self-hosted guide sections">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            className={`sh-tab ${activeTab === id ? "is-active" : ""}`}
            onClick={() => setActiveTab(id)}
            aria-current={activeTab === id ? "true" : undefined}
          >
            <Icon className="sh-tab__icon" /> {label}
          </button>
        ))}
      </nav>

      {/* ── Quick start ───────────────────────────────────── */}
      {activeTab === "quickstart" && (
        <section className="sh-section" aria-labelledby="qs-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--violet">5 steps · about 10 minutes</span>
              <h2 id="qs-title" className="sh-card__title">
                {mode === "https" ? "Set up a server for your team" : "Try Design Studio on one computer"}
              </h2>
              <p className="sh-card__sub">
                {mode === "https"
                  ? "Run Design Studio on a Linux server with your own domain. HTTPS certificates are issued and renewed automatically."
                  : "Run everything on your own computer at localhost:8080. No domain needed, and verification emails appear in the server log."}
              </p>
            </div>

            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>{mode === "https" ? "Point your domain at the server" : "Install Docker"}</h3>
                  {mode === "https" ? (
                    <>
                      <p>Create these DNS records with your domain provider:</p>
                      <div className="sh-dns-table-wrapper">
                        <table className="sh-dns-table">
                          <thead>
                            <tr>
                              <th>Type</th>
                              <th>Name</th>
                              <th>Points to</th>
                              <th>Used for</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <code>A</code> (and <code>AAAA</code> for IPv6)
                              </td>
                              <td>
                                <code>studio.example.com</code>
                              </td>
                              <td>Your server&rsquo;s IP address</td>
                              <td>Design Studio</td>
                            </tr>
                            <tr>
                              <td>
                                <code>A</code> / <code>AAAA</code> (optional)
                              </td>
                              <td>
                                <code>live.example.com</code>
                              </td>
                              <td>Your server&rsquo;s IP address</td>
                              <td>Live Q&amp;A address for audiences</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p>
                        Make sure Docker is installed on the server: <strong>Docker Engine 24+</strong> with the{" "}
                        <strong>Compose plugin v2.20+</strong> (check with <code>docker compose version</code>).
                      </p>
                    </>
                  ) : (
                    <p>
                      Install <strong>Docker Desktop</strong> (Mac or Windows) or <strong>Docker Engine 24+</strong> with the{" "}
                      <strong>Compose plugin</strong> (Linux). Check with <code>docker compose version</code>.
                    </p>
                  )}
                </div>
              </div>

              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Download the server bundle</h3>
                  <p>
                    The bundle contains everything needed to run Design Studio: the server image, the Docker Compose file and
                    a settings template.
                  </p>
                  <p>
                    <a className="btn btn--violet btn--sm" href={`/${release.server.amd64.href}`} download>
                      <DownloadIcon /> {release.server.amd64.label}
                    </a>{" "}
                    <a className="btn btn--outline btn--sm" href={`/${release.server.arm64.href}`} download>
                      <DownloadIcon /> {release.server.arm64.label}
                    </a>
                  </p>
                  <p className="sh-small-note">
                    Most servers are x86-64. Choose arm64 for Graviton, Ampere or Raspberry Pi servers
                    {mode === "local" ? ", and for Macs with Apple silicon" : ""}. Not sure? Run <code>uname -m</code>:{" "}
                    <code>x86_64</code> means x86-64, <code>aarch64</code> or <code>arm64</code> means arm64.
                  </p>
                  <p>Copy it to {mode === "https" ? "your server" : "a folder on your computer"}, then unpack it and load the image:</p>
                  <CodeBlock
                    title="Terminal"
                    language="bash"
                    code={`unzip design-studio-server-*.zip
cd design-studio-server
docker load -i design-studio-image.tar.gz
cp .env.example .env
chmod 600 .env`}
                  />
                </div>
              </div>

              <div className="sh-step">
                <div className="sh-step__num">3</div>
                <div className="sh-step__content">
                  <h3>
                    Fill in <code>.env</code>
                  </h3>
                  <p>
                    Create three different random secrets, one each for <code>SESSION_SECRET</code>,{" "}
                    <code>POSTGRES_PASSWORD</code> and <code>S3_SECRET_KEY</code>:
                  </p>
                  <CodeBlock title="Run once per secret" language="bash" code={`openssl rand -hex 32`} />
                  <p>
                    Then open <code>.env</code> and set:
                  </p>
                  <CodeBlock
                    title=".env"
                    language="dotenv"
                    code={
                      mode === "https"
                        ? `PUBLIC_URL=https://studio.example.com

SESSION_SECRET=<secret 1>
POSTGRES_PASSWORD=<secret 2>
S3_SECRET_KEY=<secret 3>

TRUST_PROXY=true

# Email for sign-up verification and password reset (see the Email tab)
SMTP_HOST=smtp.example-provider.com
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM=Design Studio <no-reply@studio.example.com>`
                        : `PUBLIC_URL=http://localhost:8080

SESSION_SECRET=<secret 1>
POSTGRES_PASSWORD=<secret 2>
S3_SECRET_KEY=<secret 3>

TRUST_PROXY=false`
                    }
                  />
                  <p className="sh-small-note">
                    Keep <code>.env</code> private and keep a copy somewhere safe: you need the same secrets to restore a backup.
                  </p>
                </div>
              </div>

              <div className="sh-step">
                <div className="sh-step__num">4</div>
                <div className="sh-step__content">
                  <h3>Start Design Studio</h3>
                  <CodeBlock
                    title="Terminal"
                    language="bash"
                    code={
                      mode === "https"
                        ? `docker compose --profile https up -d

# Every service should show "healthy" (create-bucket shows "exited (0)")
docker compose ps`
                        : `docker compose up -d

# Every service should show "healthy" (create-bucket shows "exited (0)")
docker compose ps`
                    }
                  />
                  {mode === "https" ? (
                    <div className="sh-callout sh-callout--tip">
                      <strong>Already have a proxy or tunnel?</strong> If a load balancer, reverse proxy or tunnel (such as
                      Cloudflare Tunnel) already provides HTTPS, leave out <code>--profile https</code> and forward it to{" "}
                      <code>http://127.0.0.1:8080</code> on the server.
                    </div>
                  ) : (
                    <div className="sh-callout sh-callout--tip">
                      <strong>Verification emails:</strong> without an email provider, sign-up emails are written to the server
                      log. Find the link with <code>docker compose logs studio | grep verify</code>.
                    </div>
                  )}
                </div>
              </div>

              <div className="sh-step">
                <div className="sh-step__num">5</div>
                <div className="sh-step__content">
                  <h3>Sign up and connect the app</h3>
                  <p>
                    Open <code>{url}</code>, create your account and make a design. Then install the desktop app and enter{" "}
                    <code>{url.replace(/^https?:\/\//, "")}</code> when it asks for your server (see the Desktop app tab).
                  </p>
                  <div className="sh-callout sh-callout--success">
                    <strong>Health check:</strong> <code>curl -fsS {url}/healthz</code> prints <code>ok</code> when the
                    server is ready.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Requirements ──────────────────────────────────── */}
      {activeTab === "requirements" && (
        <section className="sh-section" aria-labelledby="req-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--blue">Before you start</span>
              <h2 id="req-title" className="sh-card__title">Server requirements</h2>
              <p className="sh-card__sub">
                The bundle runs the Design Studio server together with its own database and file storage, so one machine is
                all you need. Your designs, photos and accounts stay on it.
              </p>
            </div>

            <div className="sh-specs-grid">
              <div className="sh-spec-card">
                <ServerIcon className="sh-spec-card__icon" />
                <h4>Operating system</h4>
                <p>Linux (x86-64 or arm64) with Docker Engine 24+ and the Compose plugin v2.20+.</p>
              </div>
              <div className="sh-spec-card">
                <CpuIcon className="sh-spec-card__icon" />
                <h4>Size</h4>
                <p>2 vCPU and 4 GB RAM is comfortable for a team.</p>
              </div>
              <div className="sh-spec-card">
                <DatabaseIcon className="sh-spec-card__icon" />
                <h4>Disk</h4>
                <p>20 GB to start, plus room for your team&rsquo;s designs, photos and backups.</p>
              </div>
              <div className="sh-spec-card">
                <ShieldIcon className="sh-spec-card__icon" />
                <h4>Network</h4>
                <p>
                  A domain name and a public IP address. Allow inbound TCP 80 and 443 (and UDP 443 for HTTP/3). Outbound:
                  your email provider&rsquo;s SMTP port.
                </p>
              </div>
            </div>

            <div className="sh-callout sh-callout--info">
              <strong>Using your own database or storage?</strong> You can point Design Studio at a managed PostgreSQL
              database and any S3-compatible storage instead of the included ones. See the Settings tab.
            </div>
          </div>
        </section>
      )}

      {/* ── Settings ──────────────────────────────────────── */}
      {activeTab === "settings" && (
        <section className="sh-section" aria-labelledby="env-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--violet">Settings reference</span>
              <h2 id="env-title" className="sh-card__title">
                Settings in <code>.env</code>
              </h2>
              <p className="sh-card__sub">
                All settings live in the <code>.env</code> file next to <code>docker-compose.yml</code>. After changing it,
                apply the change with <code>docker compose up -d</code>.
              </p>
            </div>

            <div className="sh-filter-bar">
              <span className="sh-filter-label">Show:</span>
              <div className="sh-filter-pills">
                {settingGroups.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    className={`sh-filter-pill ${group === g.id ? "is-active" : ""}`}
                    onClick={() => setGroup(g.id)}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sh-table-wrapper">
              <table className="sh-table">
                <thead>
                  <tr>
                    <th>Setting</th>
                    <th>Needed</th>
                    <th>Example</th>
                    <th>What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {shownSettings.map((s) => (
                    <tr key={s.name}>
                      <td className="sh-table__name">
                        <code>{s.name}</code>
                      </td>
                      <td>
                        {s.required ? (
                          <span className="sh-pill sh-pill--req">Required</span>
                        ) : (
                          <span className="sh-pill sh-pill--opt">Optional</span>
                        )}
                      </td>
                      <td className="sh-table__default">
                        <code>{s.example}</code>
                      </td>
                      <td className="sh-table__desc">{s.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ── Desktop app ───────────────────────────────────── */}
      {activeTab === "desktop" && (
        <section className="sh-section" aria-labelledby="desktop-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--peach">Desktop app</span>
              <h2 id="desktop-title" className="sh-card__title">Connect the desktop app to your server</h2>
              <p className="sh-card__sub">
                Everyone on your team installs the same app. It asks for your server the first time it opens, and from
                then on sign-in, designs, photos, sharing and publishing all go to your server.
              </p>
            </div>

            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>Install and open Design Studio</h3>
                  <p>
                    <a href={`/${release.mac.href}`} download>
                      Download for Mac
                    </a>{" "}
                    ·{" "}
                    <a href={`/${release.windows.href}`} download>
                      Download for Windows
                    </a>
                  </p>
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Enter your server address</h3>
                  <p>
                    On <strong>Connect to your server</strong>, type your server&rsquo;s address, for example{" "}
                    <code>studio.example.com</code>, and choose <strong>Check</strong>. The app confirms it found your Design
                    Studio server.
                  </p>
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">3</div>
                <div className="sh-step__content">
                  <h3>Save, restart and sign in</h3>
                  <p>
                    Choose <strong>Save and connect</strong>, then <strong>Restart now</strong>. After the restart, choose{" "}
                    <strong>Sign in with browser</strong>: sign in on your server&rsquo;s page and the app signs in too.
                  </p>
                </div>
              </div>
            </div>

            <ul className="sh-list">
              <li>
                <strong>Changing server later:</strong> account menu → <strong>Change server…</strong>. Switching signs you
                out and takes effect after a restart.
              </li>
              <li>
                <strong>Working offline:</strong> choose <strong>Use offline, without a server</strong> to keep designs as
                files on the computer. You can connect to a server later with <strong>Connect</strong> in the left bar.
              </li>
              <li>
                <strong>Company certificates:</strong> if your server uses your organisation&rsquo;s own certificate
                authority, install its root certificate on each computer (for example through your device management)
                and restart the app. Otherwise the app reports that it doesn&rsquo;t trust the server&rsquo;s certificate.
              </li>
            </ul>
          </div>
        </section>
      )}

      {/* ── Email ─────────────────────────────────────────── */}
      {activeTab === "email" && (
        <section className="sh-section" aria-labelledby="email-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--sun">Email</span>
              <h2 id="email-title" className="sh-card__title">Sign-up and password emails</h2>
              <p className="sh-card__sub">
                Design Studio sends verification and password reset emails through your SMTP provider. People need a
                verified email to share designs and publish.
              </p>
            </div>

            <div className="sh-callout sh-callout--warning">
              <strong>Set this up before inviting your team.</strong> On an HTTPS server without email settings, no
              emails are sent.
            </div>

            <h3>1. Choose a provider</h3>
            <p>
              Use any transactional email service, such as Postmark, Amazon SES, Mailgun, Resend or Google Workspace SMTP
              relay. Verify your sending domain with it and add the SPF, DKIM and DMARC records it gives you, so emails
              don&rsquo;t land in spam.
            </p>

            <h3>2. Add it to .env</h3>
            <CodeBlock
              title=".env"
              language="dotenv"
              code={`SMTP_HOST=smtp.postmarkapp.com
SMTP_PORT=587
SMTP_USER=<from your provider>
SMTP_PASS=<from your provider>
SMTP_FROM=Design Studio <no-reply@studio.example.com>`}
            />

            <h3>3. Apply and test</h3>
            <CodeBlock
              title="Terminal"
              language="bash"
              code={`docker compose up -d

# If an email doesn't arrive, look for delivery errors:
docker compose logs studio | grep -i "send email"`}
            />

            <h3>Verifying someone by hand</h3>
            <p>Until email is working, you can mark an account as verified:</p>
            <CodeBlock
              title="Terminal"
              language="bash"
              code={`docker compose exec postgres psql -U studio -d studio \\
  -c "UPDATE users SET email_verified_at = now() WHERE email = 'person@example.com';"`}
            />
          </div>
        </section>
      )}

      {/* ── Ask Studio ────────────────────────────────────── */}
      {activeTab === "askstudio" && (
        <section className="sh-section" aria-labelledby="ask-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--violet">Ask Studio</span>
              <h2 id="ask-title" className="sh-card__title">AI writing assistant, on your own key</h2>
              <p className="sh-card__sub">
                Ask Studio drafts text in Docs from a prompt. It runs on an AI model that <strong>you</strong> provide, so
                no key or vendor is built in. It stays off until you add a key.
              </p>
            </div>

            <div className="sh-callout sh-callout--warning">
              <strong>Prompts go to your AI provider.</strong> Everything people type into Ask Studio is sent to the
              provider you configure, and so is the document&rsquo;s text (up to 12,000 characters) when they tick
              &ldquo;Use this document as context&rdquo;. Design Studio doesn&rsquo;t store prompts or answers. For full
              control, point it at a model on your own network.
            </div>

            <h3>1. Choose a provider</h3>
            <p>
              <code>anthropic</code> uses Anthropic&rsquo;s API. <code>openai</code> works with OpenAI and anything that
              speaks the same format: Azure-style gateways, Ollama, vLLM, LiteLLM or OpenRouter. Create an API key with
              your provider and pick a model. A fast, small chat model is plenty for drafting; for OpenAI,{" "}
              <code>gpt-4.1-mini</code> works well.
            </p>

            <h3>2. Add it to .env</h3>
            <CodeBlock
              title=".env"
              language="dotenv"
              code={`ASK_STUDIO_PROVIDER=openai          # or: anthropic
ASK_STUDIO_API_KEY=<your provider key>
ASK_STUDIO_MODEL=gpt-4.1-mini
# For Ollama, vLLM or a gateway (the key is then optional):
# ASK_STUDIO_BASE_URL=http://host.docker.internal:11434/v1`}
            />

            <h3>3. Apply and try it</h3>
            <CodeBlock
              title="Terminal"
              language="bash"
              code={`docker compose up -d studio

# A wrong setting stops the server at start; the reason is in the log:
docker compose logs studio | tail`}
            />
            <p>
              Open a Doc, choose <strong>Ask Studio</strong> and write a prompt. Without a key, the dialog says Ask Studio
              isn&rsquo;t set up on this server.
            </p>

            <h3>Limits and controls</h3>
            <ul>
              <li>Only signed-in people with a verified email can use it.</li>
              <li>20 requests per person per hour by default, so you control the bill (<code>ASK_STUDIO_RATE_PER_HOUR</code>).</li>
              <li>Prompts up to 4,000 characters, answers up to 2,000 tokens, and a 60 second timeout, all adjustable.</li>
              <li>If the provider rejects your key or model, people see a generic message and the details appear in <code>docker compose logs studio</code>.</li>
            </ul>
          </div>
        </section>
      )}

      {/* ── Backups & updates ─────────────────────────────── */}
      {activeTab === "maintenance" && (
        <section className="sh-section" aria-labelledby="maint-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--coral">Operations</span>
              <h2 id="maint-title" className="sh-card__title">Backups, restores and updates</h2>
              <p className="sh-card__sub">
                A backup has two parts: the database and the stored files. Take them together, then copy them off the
                server. Run the commands from the folder with <code>docker-compose.yml</code>.
              </p>
            </div>

            <h3>Back up</h3>
            <CodeBlock
              title="Terminal (run nightly, e.g. from cron)"
              language="bash"
              code={`mkdir -p backups/$(date +%F) && cd backups/$(date +%F)

# 1. Database
docker compose exec -T postgres pg_dump -U studio -d studio -Fc > studio.dump

# 2. Stored files (designs, thumbnails, photos)
docker compose run --rm --no-deps --user "$(id -u):$(id -g)" -v "$PWD:/backup" \\
  --entrypoint bash create-bucket -c \\
  'mc alias set store http://minio:9000 "$S3_ACCESS_KEY" "$S3_SECRET_KEY" >/dev/null &&
   mc mirror --overwrite store/"$S3_BUCKET" /backup/bucket'

cd ../..`}
            />
            <p className="sh-small-note">
              Keep a copy of <code>.env</code> with your backups: restoring needs the same secrets.
            </p>

            <h3>Restore</h3>
            <CodeBlock
              title="Terminal"
              language="bash"
              code={`cd backups/2026-10-22

docker compose up -d postgres minio create-bucket
docker compose stop studio

docker compose exec -T postgres pg_restore -U studio -d studio --clean --if-exists --no-owner < studio.dump

docker compose run --rm --no-deps -v "$PWD:/backup" --entrypoint bash create-bucket -c \\
  'mc alias set store http://minio:9000 "$S3_ACCESS_KEY" "$S3_SECRET_KEY" >/dev/null &&
   mc mirror --overwrite /backup/bucket store/"$S3_BUCKET"'

cd ../.. && docker compose --profile https up -d`}
            />

            <h3>Update to a new version</h3>
            <ol className="sh-list">
              <li>Take a backup. Updates can change the database, and they can&rsquo;t be undone without one.</li>
              <li>
                Download the new server bundle for the same architecture. Copy its <code>docker-compose.yml</code> and{" "}
                <code>Caddyfile</code> over yours, and keep your <code>.env</code>.
              </li>
              <li>Load the new image, set the version and restart:</li>
            </ol>
            <CodeBlock
              title="Terminal"
              language="bash"
              code={`docker load -i design-studio-image.tar.gz

# In .env: STUDIO_VERSION=<new version>
docker compose --profile https up -d
docker compose ps`}
            />

            <h3>Changing secrets</h3>
            <ul className="sh-list">
              <li>
                <strong>
                  <code>SESSION_SECRET</code>
                </strong>
                : change it in <code>.env</code> and run <code>docker compose up -d</code>. People stay signed in.
              </li>
              <li>
                <strong>
                  <code>POSTGRES_PASSWORD</code>
                </strong>
                : change it in the database first, then in <code>.env</code>:
                <br />
                <code>
                  docker compose exec postgres psql -U studio -d studio -c &quot;ALTER USER studio PASSWORD
                  &apos;new-secret&apos;;&quot;
                </code>
              </li>
              <li>
                <strong>
                  <code>S3_SECRET_KEY</code>
                </strong>
                : change it in <code>.env</code> and run <code>docker compose up -d</code>.
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
