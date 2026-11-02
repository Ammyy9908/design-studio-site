import { ScrollSteps, type Step } from "./BuilderShowcase";

// HTML/CSS illustrations for the Ask Studio walkthrough (styles: .aa-* in globals.css).

function DocFrame({ children, url = "Untitled doc" }: { children: React.ReactNode; url?: string }) {
  return (
    <div className="aa-frame">
      <div className="aa-bar" aria-hidden="true">
        <i /><i /><i />
        <span>{url}</span>
      </div>
      <div className="aa-body">{children}</div>
    </div>
  );
}

function Toolbar({ glow = false }: { glow?: boolean }) {
  return (
    <div className="aa-toolbar" aria-hidden="true">
      <span className={`aa-btn${glow ? " is-glow" : ""}`}>Ask Studio</span>
      <span className="aa-tool">Title ▾</span>
      <span className="aa-tool"><b>B</b></span>
      <span className="aa-tool"><i>I</i></span>
      <span className="aa-tool">☰</span>
    </div>
  );
}

const OpenVisual = (
  <div role="img" aria-label="A blank Doc with the Ask Studio button highlighted in the toolbar">
    <DocFrame>
      <Toolbar glow />
      <div className="aa-page">
        <h4 className="aa-ghost">Untitled doc</h4>
        <span className="aa-caret" />
      </div>
    </DocFrame>
  </div>
);

const PromptVisual = (
  <div role="img" aria-label="The Ask Studio dialog with a prompt typed in and suggested prompts underneath">
    <DocFrame>
      <div className="aa-dim" aria-hidden="true" />
      <div className="aa-dialog" aria-hidden="true">
        <b>Ask Studio</b>
        <div className="aa-input">
          <span>Draft an executive summary for our Q3 launch plan</span>
          <em>Generate</em>
        </div>
        <small>OR TRY A PROMPT</small>
        <div className="aa-chips">
          <i>Executive Summary</i><i>Proposal Outline</i><i>Meeting Notes</i><i>Impact Highlights</i><i>Recommendation</i>
        </div>
      </div>
    </DocFrame>
  </div>
);

const DraftVisual = (
  <div role="img" aria-label="A Doc filled with a drafted executive summary: a heading, paragraph, callout, bullet list and checklist">
    <DocFrame url="Q3 launch plan">
      <Toolbar />
      <div className="aa-page" aria-hidden="true">
        <h4>Q3 Launch Plan</h4>
        <p className="aa-line" style={{ width: "96%" }} />
        <p className="aa-line" style={{ width: "88%" }} />
        <div className="aa-callout"><i style={{ width: "70%" }} /></div>
        <h5>Key priorities</h5>
        <ul>
          <li><i style={{ width: "62%" }} /></li>
          <li><i style={{ width: "74%" }} /></li>
          <li><i style={{ width: "55%" }} /></li>
        </ul>
        <div className="aa-todo"><span /> <i style={{ width: "48%" }} /></div>
      </div>
    </DocFrame>
  </div>
);

const KeyVisual = (
  <div className="aa-key" role="img" aria-label="A settings file naming an AI provider, model and key, beside the providers Anthropic, OpenAI, Ollama and vLLM">
    <div className="aa-term" aria-hidden="true">
      <div className="aa-bar"><i /><i /><i /><span>.env</span></div>
      <pre>{`ASK_STUDIO_PROVIDER=openai
ASK_STUDIO_API_KEY=sk-••••••••
ASK_STUDIO_MODEL=gpt-4.1-mini
# Ollama / vLLM:
# ASK_STUDIO_BASE_URL=http://…/v1`}</pre>
    </div>
    <ul className="aa-providers" aria-hidden="true">
      <li>Anthropic</li><li>OpenAI</li><li>Ollama</li><li>vLLM</li><li>Any OpenAI-compatible API</li>
    </ul>
    <p className="aa-note" aria-hidden="true">The key stays on your server</p>
  </div>
);

const ControlVisual = (
  <div className="aa-controls" role="img" aria-label="Controls: verified email required, 20 requests per person per hour, prompt and answer limits, off until a key is added">
    {[
      ["✓", "Verified email required", "Only signed-in, verified people"],
      ["20", "Requests per person / hour", "You control the bill"],
      ["4k", "Prompt and answer limits", "Short prompts, capped answers"],
      ["⏻", "Off until you add a key", "Nothing is sent anywhere by default"],
    ].map(([badge, title, sub]) => (
      <div key={title} className="aa-ctl" aria-hidden="true">
        <span>{badge}</span>
        <div><b>{title}</b><small>{sub}</small></div>
      </div>
    ))}
  </div>
);

const steps: Step[] = [
  {
    title: "Open Ask Studio in any Doc",
    body: "Click Ask Studio in the Doc toolbar. It sits right where you write, so you never leave the page.",
    points: ["Works in every Doc", "Your cursor stays where it was"],
    visual: OpenVisual,
  },
  {
    title: "Say what you want written",
    body: "Type a request in your own words, or start from a suggestion: executive summary, proposal outline, meeting notes, impact highlights or a recommendation letter.",
    points: ["Plain language is fine", "Optionally let it read your document for context"],
    visual: PromptVisual,
  },
  {
    title: "Studio drafts it into your Doc",
    body: "The answer lands as real Doc blocks: headings, paragraphs, bullets, checklists, callouts and tables. Edit it like anything you typed yourself, or press Undo to take it back.",
    points: ["Headings, lists, tables and callouts", "One Undo removes it"],
    visual: DraftVisual,
  },
  {
    title: "Bring your own AI",
    body: "Ask Studio runs on a model you choose: Anthropic, OpenAI, a model on your own network through Ollama or vLLM, or any OpenAI-compatible service. Add your key to the server settings; it never reaches browsers or the desktop app.",
    points: ["Anthropic, OpenAI, Ollama, vLLM", "Your key, your bill, your data rules"],
    visual: KeyVisual,
  },
  {
    title: "You stay in control",
    body: "Only signed-in people with a verified email can use it, each with an hourly allowance, and prompts and answers are capped. Without a key it's simply off. What people type goes to the provider you chose, so choose one you trust.",
    points: ["Per-person limits", "Off until you turn it on"],
    visual: ControlVisual,
  },
];

export function AskStudioShowcase() {
  return <ScrollSteps steps={steps} />;
}
