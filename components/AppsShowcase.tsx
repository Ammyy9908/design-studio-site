import { ArrowRightIcon } from "./Icons";
import { developersUrl } from "@/lib/site";

const listed = [
  { name: "Pexels", tone: "#1f6f5c", text: "Search free stock photos and add them to your design." },
  { name: "Notion Images", tone: "#1a1f1c", text: "Connect your Notion account and add images from your pages." },
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
];

/** The marketplace, drawn from what the app shows rather than a screenshot, so it stays readable at any width. */
export function AppsShowcase() {
  return (
    <div className="apps">
      <div className="apps__mat" role="img" aria-label="The Apps page listing Pexels and Notion Images, with an open Notion Images page showing what it will be able to do and an Install button">
        <div className="apps__sheet apps__list" aria-hidden="true">
          <b className="apps__sheet-title">Apps</b>
          {listed.map((a) => (
            <div key={a.name} className="apps__row">
              <i style={{ background: a.tone }}>{a.name[0]}</i>
              <span>
                <b>{a.name}</b>
                <small>{a.text}</small>
              </span>
            </div>
          ))}
        </div>
        <div className="apps__sheet apps__consent" aria-hidden="true">
          <b>Notion Images</b>
          <small>If you install it, it will be able to</small>
          <ul>
            <li>Add pictures to your design</li>
            <li>Use your own account at api.notion.com, once you connect it</li>
          </ul>
          <span className="apps__install">Install</span>
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
      <aside className="apps__dev">
        <div>
          <h3>Build an app for Design Studio</h3>
          <p>An app is a small web page that runs beside the canvas. Read how it works, try yours in your own designs, then send it for review. Listing is by invitation for now.</p>
        </div>
        <a className="btn btn--outline" href={`${developersUrl}/docs/quickstart`}>
          Read the developer docs <ArrowRightIcon className="btn__icon btn__icon--sm" />
        </a>
      </aside>
    </div>
  );
}
