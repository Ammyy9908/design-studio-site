"use client";

import { useEffect, useState } from "react";
import { release } from "@/lib/site";
import { AppleIcon, WindowsIcon, DownloadIcon } from "./Icons";

type OS = "mac" | "windows";

function detectOS(): OS | null {
  if (typeof navigator === "undefined") return null;
  const nav = navigator as Navigator & { userAgentData?: { platform?: string } };
  const hint = `${nav.userAgentData?.platform ?? ""} ${nav.platform ?? ""} ${nav.userAgent}`.toLowerCase();
  if (hint.includes("win")) return "windows";
  if (hint.includes("mac")) return "mac";
  return null;
}

/** Download buttons: the visitor's platform first, the other one next to it. */
export function DownloadButtons({ size = "lg", showMeta = true }: { size?: "lg" | "md"; showMeta?: boolean }) {
  // Static HTML defaults to Mac; the effect swaps to Windows after load when that's what the visitor uses.
  const [os, setOs] = useState<OS>("mac");

  useEffect(() => {
    const found = detectOS();
    if (found) setOs(found);
  }, []);

  const primary = release[os];
  const otherKey: OS = os === "mac" ? "windows" : "mac";
  const other = release[otherKey];
  const PrimaryIcon = os === "mac" ? AppleIcon : WindowsIcon;

  return (
    <div className={`dl dl--${size}`}>
      <div className="dl__row">
        <a className="btn btn--violet" href={primary.href} download>
          <PrimaryIcon className="btn__icon" />
          <span>{primary.label}</span>
        </a>
        <a className="btn btn--outline" href={other.href} download aria-label={other.label}>
          {otherKey === "mac" ? <AppleIcon className="btn__icon" /> : <WindowsIcon className="btn__icon" />}
          <span>{otherKey === "mac" ? "Mac" : "Windows"}</span>
          <DownloadIcon className="btn__icon btn__icon--sm" />
        </a>
      </div>
      {showMeta && (
        <p className="dl__meta">
          Version {release.version} · {primary.requirements} · <a href={`/install/#${os}`}>Help opening it</a>
        </p>
      )}
    </div>
  );
}
