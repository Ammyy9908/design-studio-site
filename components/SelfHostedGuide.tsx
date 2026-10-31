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
type Host = "compose" | "kubernetes" | "process";
type Tab =
  | "quickstart"
  | "proxy"
  | "database"
  | "k8s-one"
  | "k8s-many"
  | "process"
  | "requirements"
  | "settings"
  | "desktop"
  | "email"
  | "askstudio"
  | "maintenance";

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
    name: "ASK_STUDIO_IMAGES_PROVIDER / ASK_STUDIO_IMAGES_API_KEY",
    group: "ask",
    required: false,
    example: "pexels / from pexels.com/api",
    description: "Stock photos (pexels or unsplash) for AI-made websites and for Replace image. Empty = off. A few search words go to the provider; never your description or documents.",
  },
  {
    name: "IMAGE_GENERATION_PROVIDER",
    group: "ask",
    required: false,
    example: "openai",
    description: "Turns on AI pictures in Replace image: openai or gemini. Empty = off. What people type is sent to this provider.",
  },
  {
    name: "IMAGE_GENERATION_API_KEY",
    group: "ask",
    required: false,
    example: "from your provider",
    description: "Your own key for the image provider. It stays on the server. Required when IMAGE_GENERATION_PROVIDER is set.",
  },
  {
    name: "IMAGE_GENERATION_MODELS / _PER_HOUR / _TIMEOUT_SECONDS",
    group: "ask",
    required: false,
    example: "(the key's image models) / 20 / 90",
    description: "Which models people can choose (empty = the image models your key can use), pictures per person per hour, and seconds before giving up.",
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
    name: "REALTIME_URL",
    group: "realtime",
    required: false,
    example: "(empty = inside the server)",
    description:
      "Leave empty and the WebSocket for cursors and presence runs inside the Design Studio server. Set a private address such as http://realtime:8090 only when several server copies share one WebSocket process.",
  },
  {
    name: "REALTIME_SECRET",
    group: "realtime",
    required: false,
    example: "openssl rand -hex 32",
    description:
      "Shared secret for that separate WebSocket process. At least 32 characters, and the same value on the server and on the WebSocket process. Unused while REALTIME_URL is empty.",
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
  { id: "realtime", label: "WebSocket" },
];

const sharedTabs: { id: Tab; label: string; icon: typeof TerminalIcon }[] = [
  { id: "requirements", label: "Requirements", icon: CpuIcon },
  { id: "settings", label: "Settings (.env)", icon: KeyIcon },
  { id: "desktop", label: "Desktop app", icon: AppleIcon },
  { id: "email", label: "Email", icon: MailIcon },
  { id: "askstudio", label: "Ask Studio (AI)", icon: SparkleIcon },
  { id: "maintenance", label: "Backups & updates", icon: RefreshIcon },
];

const tabsFor: Record<Host, { id: Tab; label: string; icon: typeof TerminalIcon }[]> = {
  compose: [
    { id: "quickstart", label: "Quick start", icon: TerminalIcon },
    { id: "proxy", label: "Your proxy", icon: ShieldIcon },
    { id: "database", label: "Your database", icon: DatabaseIcon },
    ...sharedTabs,
  ],
  kubernetes: [
    { id: "k8s-one", label: "One server", icon: ServerIcon },
    { id: "k8s-many", label: "Several servers", icon: CpuIcon },
    ...sharedTabs,
  ],
  process: [{ id: "process", label: "Install", icon: TerminalIcon }, ...sharedTabs],
};

const defaultTab: Record<Host, Tab> = {
  compose: "quickstart",
  kubernetes: "k8s-one",
  process: "process",
};

export function SelfHostedGuide() {
  const [host, setHost] = useState<Host>("compose");
  const [mode, setMode] = useState<DeploymentMode>("https");
  const [activeTab, setActiveTab] = useState<Tab>("quickstart");
  const [group, setGroup] = useState<string>("all");

  const tabs = tabsFor[host];
  const shownSettings = settings.filter((s) => group === "all" || s.group === group);
  const url = mode === "https" ? "https://studio.example.com" : "http://localhost:8080";

  function chooseHost(next: Host) {
    setHost(next);
    setActiveTab((current) => (tabsFor[next].some((tab) => tab.id === current) ? current : defaultTab[next]));
  }

  return (
    <div className="sh-guide">
      {/* ── Deployment mode ───────────────────────────────── */}
      <div className="sh-mode-banner">
        <div className="sh-mode-banner__inner">
          <label className="sh-host">
            <span className="sh-host__label">Guide</span>
            <select className="sh-host__select" value={host} onChange={(event) => chooseHost(event.target.value as Host)} aria-label="Self-host guide">
              <option value="compose">Docker Compose</option>
              <option value="kubernetes">Kubernetes</option>
              <option value="process">A process on the machine</option>
            </select>
          </label>
          {host === "compose" ? (
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
          ) : (
            <p className="sh-host__note">
              {host === "kubernetes"
                ? "One cluster. Use One server for a single pod, or Several servers when the API should scale."
                : "Build the server from source and run it under systemd, next to PostgreSQL and file storage."}
            </p>
          )}
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

            <div className="sh-callout sh-callout--info">
              <strong>This guide is the Docker Compose bundle.</strong> A proxy you already run is the Your proxy tab. A
              database and bucket you already have are the Your database tab. Kubernetes and a process install are in
              the Guide menu above.
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

      {/* ── Compose: your proxy ──────────────────────────── */}
      {activeTab === "proxy" && (
        <section className="sh-section" aria-labelledby="proxy-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--mint">Docker Compose</span>
              <h2 id="proxy-title" className="sh-card__title">Behind your own proxy</h2>
              <p className="sh-card__sub">
                Use this when nginx, Traefik, Caddy or a Cloudflare tunnel already terminates HTTPS. Compose still runs
                the server, PostgreSQL and MinIO. The WebSocket stays inside the server, at <code>/ws</code>.
              </p>
            </div>
            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>Start without the HTTPS profile</h3>
                  <p>
                    Follow Quick start through the <code>.env</code> file, then leave out <code>--profile https</code>.
                    Compose does not publish ports 80 and 443. The server stays on <code>127.0.0.1:8080</code>. Set{" "}
                    <code>TRUST_PROXY=true</code>.
                  </p>
                  <CodeBlock
                    title="Terminal"
                    language="bash"
                    code={`docker compose up -d
docker compose ps`}
                  />
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Forward HTTPS to the server</h3>
                  <p>
                    Point the proxy at <code>http://127.0.0.1:8080</code>. Pass WebSocket upgrades for <code>/ws</code>{" "}
                    through, and leave that connection open. The server pings it every 25 seconds. Podman can run the
                    same Compose file.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Compose: your database ────────────────────────── */}
      {activeTab === "database" && (
        <section className="sh-section" aria-labelledby="db-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--mint">Docker Compose image</span>
              <h2 id="db-title" className="sh-card__title">Your own database and storage</h2>
              <p className="sh-card__sub">
                Run only the Design Studio container. Point it at a PostgreSQL and an S3-compatible bucket you already
                have: Amazon S3, Cloudflare R2, Garage, or a MinIO of your own. The WebSocket stays inside the
                container.
              </p>
            </div>
            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>Load the image from the zip</h3>
                  <p>
                    The Compose file in the download always starts its own Postgres and MinIO and waits for them. This
                    guide runs the image by itself. The server creates the bucket if it can. Replace the secrets and
                    addresses below.
                  </p>
                  <CodeBlock
                    title="Terminal"
                    language="bash"
                    code={`docker load -i design-studio-image.tar.gz
docker run -d --name studio --restart unless-stopped \\
  -p 127.0.0.1:8080:8080 \\
  -e LISTEN_ADDR=0.0.0.0:8080 \\
  -e PUBLIC_URL=https://studio.example.com \\
  -e TRUST_PROXY=true \\
  -e SESSION_SECRET="$(openssl rand -hex 32)" \\
  -e DATABASE_URL='postgres://studio:PASSWORD@db.internal:5432/studio?sslmode=require' \\
  -e S3_ENDPOINT=s3.amazonaws.com \\
  -e S3_ACCESS_KEY=YOUR_ACCESS_KEY \\
  -e S3_SECRET_KEY=YOUR_SECRET_KEY \\
  -e S3_BUCKET=design-studio \\
  -e S3_USE_SSL=true \\
  design-studio:${release.version}`}
                  />
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Put your proxy in front</h3>
                  <p>
                    Forward HTTPS to <code>127.0.0.1:8080</code> and pass <code>/ws</code> through. Email, Google
                    sign-in and Ask Studio use the same variables as the Compose install. See Settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Kubernetes: one server ────────────────────────── */}
      {activeTab === "k8s-one" && (
        <section className="sh-section" aria-labelledby="k8s-one-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--blue">Kubernetes</span>
              <h2 id="k8s-one-title" className="sh-card__title">One server pod</h2>
              <p className="sh-card__sub">
                One studio pod, one Postgres, and object storage. Leave <code>REALTIME_URL</code> empty. The WebSocket,
                Live Q&amp;A and the phone remote all stay on that pod. No Helm chart ships with Design Studio.
              </p>
            </div>
            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>Load the image where the cluster can run it</h3>
                  <p>
                    The download is <code>design-studio-image.tar.gz</code> inside the server zip. Load it on the node,
                    or push <code>design-studio:{release.version}</code> to a registry the cluster pulls from.
                  </p>
                  <CodeBlock title="Terminal" language="bash" code={`docker load -i design-studio-image.tar.gz`} />
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Run Postgres and a bucket</h3>
                  <p>
                    Use PostgreSQL and MinIO in the cluster, or a managed database and S3, R2 or Garage. The server
                    needs <code>DATABASE_URL</code>, <code>S3_ENDPOINT</code> and the bucket. It creates the bucket if
                    it can.
                  </p>
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">3</div>
                <div className="sh-step__content">
                  <h3>Run one studio pod</h3>
                  <CodeBlock
                    title="studio.yaml"
                    language="yaml"
                    code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: studio
spec:
  replicas: 1
  selector:
    matchLabels:
      app: studio
  template:
    metadata:
      labels:
        app: studio
    spec:
      containers:
        - name: studio
          image: design-studio:${release.version}
          ports:
            - containerPort: 8080
          env:
            - name: LISTEN_ADDR
              value: 0.0.0.0:8080
            - name: PUBLIC_URL
              value: https://studio.example.com
            - name: TRUST_PROXY
              value: "true"
            - name: SESSION_SECRET
              valueFrom:
                secretKeyRef:
                  name: studio
                  key: session-secret
            - name: DATABASE_URL
              valueFrom:
                secretKeyRef:
                  name: studio
                  key: database-url
            - name: S3_ENDPOINT
              value: minio:9000
            - name: S3_USE_SSL
              value: "false"
            - name: S3_BUCKET
              value: design-studio`}
                  />
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">4</div>
                <div className="sh-step__content">
                  <h3>Send traffic to the pod</h3>
                  <p>
                    A Service on port 8080, then an ingress that terminates HTTPS and passes the <code>/ws</code>{" "}
                    upgrade. Leave that connection open. The server pings every 25 seconds. Keep port 8080 off the
                    public internet.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Kubernetes: several servers ───────────────────── */}
      {activeTab === "k8s-many" && (
        <section className="sh-section" aria-labelledby="k8s-many-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--blue">Kubernetes</span>
              <h2 id="k8s-many-title" className="sh-card__title">Several server pods</h2>
              <p className="sh-card__sub">
                Scale the studio Deployment for designs, accounts, photos and publish. Cursors and presence stay on one
                realtime pod. Start from the One server guide, then add the pieces below.
              </p>
            </div>
            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>Run one realtime pod</h3>
                  <p>
                    Same image, command <code>/usr/local/bin/studio-realtime</code>, one replica. Give it and every
                    studio pod the same <code>REALTIME_SECRET</code> of at least 32 characters. A second realtime pod
                    would show cursors only to the people connected to it.
                  </p>
                  <CodeBlock
                    title="realtime.yaml"
                    language="yaml"
                    code={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: realtime
spec:
  replicas: 1
  selector:
    matchLabels:
      app: realtime
  template:
    metadata:
      labels:
        app: realtime
    spec:
      containers:
        - name: realtime
          image: design-studio:${release.version}
          command: ["/usr/local/bin/studio-realtime"]
          ports:
            - containerPort: 8090
          env:
            - name: LISTEN_ADDR
              value: 0.0.0.0:8090
            - name: REALTIME_SECRET
              valueFrom:
                secretKeyRef:
                  name: studio
                  key: realtime-secret`}
                  />
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Point every studio pod at it</h3>
                  <p>
                    Set <code>REALTIME_URL=http://realtime:8090</code> on the studio Deployment, then raise{" "}
                    <code>replicas</code>. Each studio pod proxies <code>/ws</code> to that one realtime pod. Browsers
                    still open <code>wss://studio.example.com/ws</code>. Keep port 8090 inside the cluster.
                  </p>
                  <ul className="sh-list">
                    <li>The ingress must pass the WebSocket upgrade and leave the connection open.</li>
                    <li>
                      Live Q&amp;A and the phone remote stay in memory on the studio pod that created them. Those two
                      features are correct while studio has one replica. With several studio replicas, designs and the
                      WebSocket keep working, and those two features do not.
                    </li>
                    <li>
                      Postgres stays one primary. The server writes through a single <code>DATABASE_URL</code>. One
                      MinIO pod does not grow sideways. Distributed MinIO, S3 or R2 does.
                    </li>
                    <li>
                      Hourly limits for Ask Studio and image generation are counted on each studio pod. A person whose
                      requests land on different pods can go past the cap you set.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Process ───────────────────────────────────────── */}
      {activeTab === "process" && (
        <section className="sh-section" aria-labelledby="process-title">
          <div className="sh-card">
            <div className="sh-card__header">
              <span className="sh-badge sh-badge--sun">On the machine</span>
              <h2 id="process-title" className="sh-card__title">Run the server as a process</h2>
              <p className="sh-card__sub">
                The download zip is a Docker image. This guide builds the server from the source repository and runs it
                under systemd, next to PostgreSQL and MinIO or S3. The WebSocket is part of this process.
              </p>
            </div>
            <div className="sh-steps">
              <div className="sh-step">
                <div className="sh-step__num">1</div>
                <div className="sh-step__content">
                  <h3>Build the web app and the server</h3>
                  <CodeBlock
                    title="Terminal"
                    language="bash"
                    code={`# web app
npx vite build --config vite.web.config.ts

# server
cd server
CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o studio-server ./cmd/server`}
                  />
                </div>
              </div>
              <div className="sh-step">
                <div className="sh-step__num">2</div>
                <div className="sh-step__content">
                  <h3>Start it beside Postgres and file storage</h3>
                  <p>
                    Put the same variables in a systemd unit. Migrations run when the process starts. Put your proxy in
                    front of port 8080 and pass <code>/ws</code> through.
                  </p>
                  <CodeBlock
                    title="Terminal"
                    language="bash"
                    code={`LISTEN_ADDR=127.0.0.1:8080 \\
PUBLIC_URL=https://studio.example.com \\
TRUST_PROXY=true \\
WEB_DIR=/var/lib/design-studio/web \\
SESSION_SECRET="$(openssl rand -hex 32)" \\
DATABASE_URL='postgres://studio:PASSWORD@127.0.0.1:5432/studio?sslmode=disable' \\
S3_ENDPOINT=127.0.0.1:9000 \\
S3_ACCESS_KEY=studio \\
S3_SECRET_KEY=YOUR_SECRET_KEY \\
S3_BUCKET=design-studio \\
S3_USE_SSL=false \\
./studio-server`}
                  />
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
                {host === "kubernetes"
                  ? "A cluster that can run the Design Studio image, plus PostgreSQL and S3-compatible storage. Your designs, photos and accounts stay there."
                  : host === "process"
                    ? "A Linux machine with Go and Node for the build, plus PostgreSQL and S3-compatible storage beside the process."
                    : "The bundle runs the Design Studio server together with its own database and file storage, so one machine is all you need. Your designs, photos and accounts stay on it."}
              </p>
            </div>

            <div className="sh-specs-grid">
              <div className="sh-spec-card">
                <ServerIcon className="sh-spec-card__icon" />
                <h4>Operating system</h4>
                <p>
                  {host === "kubernetes"
                    ? "Any cluster that runs Linux images (x86-64 or arm64). Load the image from the server zip, or pull it from your registry."
                    : host === "process"
                      ? "Linux (x86-64 or arm64) with Go and Node.js to build the server. Docker is not required."
                      : "Linux (x86-64 or arm64) with Docker Engine 24+ and the Compose plugin v2.20+."}
                </p>
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
              <strong>
                {host === "kubernetes"
                  ? "One pod or several."
                  : host === "process"
                    ? "Same settings as the other guides."
                    : "Already have a proxy or a database?"}
              </strong>{" "}
              {host === "kubernetes"
                ? "One server keeps the WebSocket, Live Q&A and the phone remote together. Several servers is its own tab."
                : host === "process"
                  ? "Email, Ask Studio and the desktop app use the Settings tab."
                  : "Your proxy and Your database are their own tabs in this guide. Kubernetes is in the Guide menu."}
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

            <h3>AI Builder for websites</h3>
            <p>
              The same key powers <strong>Home &rsaquo; Website &rsaquo; AI Builder</strong>. People describe the business and
              Studio plans the sitemap, picks a layout for each section, writes the copy, chooses a look and builds the site
              in the editor, one step after another. Each step is a separate request, about six of a person&rsquo;s hourly
              requests in all. Use a capable model for this (for OpenAI, <code>gpt-4.1</code> or better) and keep{" "}
              <code>ASK_STUDIO_TIMEOUT_SECONDS</code> at 60 or higher. Templates and a blank page need no key.
            </p>

            <h3>Pictures: stock photos and AI images</h3>
            <p>
              Select a picture and choose <strong>Replace</strong>: people can pick one of their own assets, search stock
              photos, or make a picture from a description.
            </p>
            <CodeBlock
              title=".env"
              language="dotenv"
              code={`# Stock photos (also fill the picture frames of AI-made websites)
ASK_STUDIO_IMAGES_PROVIDER=pexels   # or: unsplash
ASK_STUDIO_IMAGES_API_KEY=<your Pexels or Unsplash key>

# Pictures from a description
IMAGE_GENERATION_PROVIDER=openai    # or: gemini
IMAGE_GENERATION_API_KEY=<your provider key>
# IMAGE_GENERATION_MODELS=gpt-image-1,dall-e-3   # empty = the image models your key can use`}
            />
            <div className="sh-callout sh-callout--warning">
              <strong>Descriptions go to your image provider, which bills you.</strong> What people type into AI image is sent
              to OpenAI or Google (whichever you chose); nothing else is. Stock photo searches send a few words to Pexels or
              Unsplash. Keys stay on the server. Each person gets 20 pictures per hour by default, only signed-in people with
              a verified email can use it, and provider errors appear in the server log, never to people.
            </div>
            <p>
              When you set <code>IMAGE_GENERATION_PROVIDER</code>, the dialog lists the image models your key can use (for OpenAI,{" "}
              <code>gpt-image-1</code> and <code>dall-e-3</code>; for Gemini, its image models and Imagen) and people choose one.
              Without a key the option shows &ldquo;Not set up on this server&rdquo;.
            </p>
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
