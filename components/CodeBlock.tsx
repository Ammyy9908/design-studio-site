"use client";

import { useState } from "react";
import { CheckIcon, CopyIcon, TerminalIcon } from "@/components/Icons";

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = "bash", title, showLineNumbers = false }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(code);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = code;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="code-block" tabIndex={0} aria-label={title || `${language} code snippet`}>
      <div className="code-block__header">
        <div className="code-block__dots" aria-hidden="true">
          <span className="dot dot--red" />
          <span className="dot dot--yellow" />
          <span className="dot dot--green" />
        </div>
        <div className="code-block__title">
          {title ? (
            <span>{title}</span>
          ) : (
            <span className="code-block__lang">
              <TerminalIcon className="code-block__icon" /> {language}
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={`code-block__copy ${copied ? "is-copied" : ""}`}
          aria-label={copied ? "Copied to clipboard" : "Copy code"}
        >
          {copied ? (
            <>
              <CheckIcon className="code-block__copy-icon" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon className="code-block__copy-icon" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="code-block__body">
        <pre className="code-block__pre">
          <code>
            {showLineNumbers ? (
              lines.map((line, idx) => (
                <div key={idx} className="code-block__line">
                  <span className="code-block__ln">{idx + 1}</span>
                  <span className="code-block__content">{line || " "}</span>
                </div>
              ))
            ) : (
              code.trim()
            )}
          </code>
        </pre>
      </div>
    </div>
  );
}
