import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Archivo, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const sans = Archivo({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Makora — Design anything, publish anywhere",
  description:
    "One friendly app for presentations, social posts, videos, posters, invitations, whiteboards, documents and websites. For Mac and Windows.",
  openGraph: {
    title: "Makora",
    description: "Design anything, publish anywhere. For Mac and Windows.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#161a17" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <head>
        {/* Mark JS as available before paint: the format showcase stacks its panels only when it can switch them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {/* Apply a saved theme before paint, so a dark choice never flashes light. */}
        <script dangerouslySetInnerHTML={{ __html: "try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
