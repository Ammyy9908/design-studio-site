"use client";

import { useEffect, useRef, useState } from "react";
import { MacOlder, MacSteps, MacWhy, WindowsSteps, WindowsWhy } from "./InstallSteps";
import { release } from "@/lib/site";

type OS = "mac" | "windows";

/**
 * When someone clicks a Mac or Windows download anywhere on the page, the download carries on and this
 * dialog explains how to open Makora the first time, since macOS and Windows warn about unsigned apps.
 */
export function DownloadHelp() {
  const ref = useRef<HTMLDialogElement>(null);
  const [os, setOs] = useState<OS>("mac");

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const found: OS | null =
        link.href === release.mac.href ? "mac" : link.href === release.windows.href ? "windows" : null;
      if (!found) return;
      setOs(found);
      // Let the click start the download first, then show the help over the page.
      setTimeout(() => ref.current?.showModal(), 0);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      className="dlhelp"
      aria-labelledby="dlhelp-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) close(); // a click on the backdrop
      }}
    >
      <div className="dlhelp__body">
        <p className="dlhelp__eyebrow">Your download has started</p>
        <h2 id="dlhelp-title" className="dlhelp__title">
          {os === "mac" ? "Opening Makora on your Mac" : "Opening Makora on Windows"}
        </h2>
        {os === "mac" ? (
          <>
            <MacWhy />
            <MacSteps />
            <MacOlder />
          </>
        ) : (
          <>
            <WindowsWhy />
            <WindowsSteps />
          </>
        )}
        <div className="dlhelp__actions">
          <a className="btn btn--outline btn--sm" href={`/install/#${os}`}>
            Open these steps on a page
          </a>
          <button type="button" className="btn btn--violet btn--sm" onClick={close} autoFocus>
            Got it
          </button>
        </div>
      </div>
    </dialog>
  );
}
