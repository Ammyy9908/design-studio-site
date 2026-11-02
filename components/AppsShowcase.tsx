import { ArrowRightIcon } from "./Icons";

// Each kind of app keeps a colour of its own, as on the Apps page in the product.
const kinds = [
  { id: "photos", title: "Free stock photos", side: "left" },
  { id: "motion", title: "Moving graphics", side: "left" },
  { id: "video", title: "Videos on the canvas", side: "left" },
  { id: "pages", title: "Images from your Notion pages", side: "right" },
  { id: "publish", title: "Upload as a video", side: "right" },
];

function AppCard({ id, title }: { id: string; title: string }) {
  return (
    <div className={`app-card app-card--${id}`}>
      <span className="app-card__art"><i /><i /><i /></span>
      <b>{title}</b>
    </div>
  );
}

const steps = [
  { title: "Find one", text: "Open Apps on the home screen, then search or browse by category. Each app has its own page with what it does and who made it." },
  { title: "Check what it asks for", text: "The page lists what the app can do in your design. Choose a design to use it in, and that adds the app." },
  { title: "Use it beside the canvas", text: "It sits in your side panel, ready in every design. Remove it whenever you like." },
];

const promises = [
  {
    title: "You approve what each app can do",
    text: "Before you install, an app lists what it can do in your design and which services it talks to. It can't do anything else.",
  },
  {
    title: "Your accounts stay yours",
    text: "Apps like Notion Images use your own account, so you only see your own pages. Your sign-in stays on the server, and the app never sees it. Disconnect whenever you like.",
  },
  {
    title: "You choose when to update",
    text: "When a new version is approved, you see what's new and press Update app when you're ready. Until then, your version stays as it is.",
  },
  {
    title: "You can report any app",
    text: "Each app's page has a Report this app link, and your report goes to whoever runs your server.",
  },
];

/** Apps feeding one poster: each card brings the thing it points at, drawn in code so it stays sharp at any width. */
export function AppsShowcase() {
  return (
    <div className="apps">
      <div className="apps__stage" role="img" aria-label="A poster being made on the canvas. Colourful app cards for stock photos, moving graphics, videos, Notion images and video uploads connect to it, beside a panel asking to approve what an app can do before installing it">
        <svg className="apps__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M28 18C34 18 34 26 40 26" />
          <path d="M28 50C34 50 34 44 40 44" />
          <path d="M28 82C34 82 34 66 40 66" />
          <path d="M72 16C66 16 66 30 60 30" />
          <path d="M72 44C66 44 66 72 60 72" />
        </svg>
        <div className="apps__cards">
          {kinds.filter((k) => k.side === "left").map((k) => <AppCard key={k.id} id={k.id} title={k.title} />)}
        </div>
        <div className="apps__poster" aria-hidden="true">
          <span className="sel apps__photo">
            <i /><i /><i /><i />
          </span>
          <span className="apps__sticker" />
          <b>Night market</b>
          <span className="apps__clip"><em /></span>
          <small>Saturday, from 6 pm</small>
        </div>
        <div className="apps__cards">
          {kinds.filter((k) => k.side === "right").map((k) => <AppCard key={k.id} id={k.id} title={k.title} />)}
          <div className="apps__consent" aria-hidden="true">
            <b>Notion Images</b>
            <small>If you install it, it will be able to</small>
            <ul>
              <li>Add pictures to your design</li>
              <li>Use your own account, once you connect it</li>
            </ul>
            <span className="apps__install">Install</span>
          </div>
        </div>
      </div>
      <ul className="apps__promises">
        {promises.map((p) => (
          <li key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </li>
        ))}
      </ul>
      <ol className="apps__steps">
        {steps.map((step, i) => (
          <li key={step.title}>
            <span className="apps__num">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </li>
        ))}
      </ol>
      <aside className="apps__dev">
        <div>
          <h3>Running your own server</h3>
          <p>Your server reads the marketplace and checks each signed package itself. Nothing about people or designs is sent to it. Use APPS_ALLOWED to offer every app, none, or only the ones you list.</p>
        </div>
        <a className="btn btn--outline" href="/self-hosted/">
          Read the Self-Hosted Guide <ArrowRightIcon className="btn__icon btn__icon--sm" />
        </a>
      </aside>
      <aside className="apps__dev">
        <div>
          <h3>Build an app for Design Studio</h3>
          <p>An app is a small web page that runs beside the canvas. If you run your own server, you can turn on its developer portal, build and test apps there, and review them before your team sees them.</p>
        </div>
        <a className="btn btn--outline" href="/developers/">
          Read the developer docs <ArrowRightIcon className="btn__icon btn__icon--sm" />
        </a>
      </aside>
    </div>
  );
}
