import { release } from "@/lib/site";

// How to open Makora the first time on Mac and Windows. Shown in the dialog after a download starts and on
// the /install/ page. Makora isn't yet signed with an Apple Developer ID or a Windows code-signing certificate,
// so both systems warn the first time. Remove these steps once the builds are signed and notarized.

export function MacWhy() {
  return (
    <p className="install__why">
      macOS shows <b>&ldquo;Makora&rdquo; Not Opened</b> because Makora isn&rsquo;t notarized by Apple yet.
      Notarizing needs a paid Apple Developer certificate, which we&rsquo;re setting up. The warning
      doesn&rsquo;t mean anything was found in the app. You only need to allow it once.
    </p>
  );
}

export function MacSteps() {
  return (
    <ol className="install__steps">
      <li>Open <b>Makora-{release.version}-arm64.dmg</b> from your Downloads and drag <b>Makora</b> into <b>Applications</b>.</li>
      <li>Open Makora from Applications. When macOS says it couldn&rsquo;t verify Makora, click <b>Done</b>. Don&rsquo;t click Move to Bin.</li>
      <li>Open <b>System Settings</b> &rsaquo; <b>Privacy &amp; Security</b>, and scroll down to <b>Security</b>.</li>
      <li>Next to &ldquo;Makora was blocked to protect your Mac&rdquo;, click <b>Open Anyway</b>, then enter your Mac password.</li>
      <li>Click <b>Open Anyway</b> once more. Makora opens, and from now on it opens like any other app.</li>
    </ol>
  );
}

export function MacOlder() {
  return (
    <p className="install__note">
      On macOS 14 Sonoma or earlier you can also Control-click Makora in Applications, choose <b>Open</b>, then
      click <b>Open</b> again.
    </p>
  );
}

export function WindowsWhy() {
  return (
    <p className="install__why">
      Windows shows <b>Windows protected your PC</b> because Makora isn&rsquo;t signed with a code-signing
      certificate yet, so SmartScreen doesn&rsquo;t recognise it. You only need to allow it once.
    </p>
  );
}

export function WindowsSteps() {
  return (
    <ol className="install__steps">
      <li>Open <b>Makora-{release.version}-setup.exe</b> from your Downloads.</li>
      <li>If Windows says it protected your PC, click <b>More info</b>, then <b>Run anyway</b>.</li>
      <li>Choose who to install it for and the folder, and tick <b>Create a desktop shortcut</b> if you want one. Then click <b>Install</b>.</li>
      <li>Open Makora from the Start menu, or from your desktop if you added the shortcut.</li>
    </ol>
  );
}
