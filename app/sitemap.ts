import type { MetadataRoute } from "next";
import { legal, siteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Every page of the site. Add new pages here.
export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date(legal.updated);
  return [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/self-hosted/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/self-hosted-canva-alternative/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/developers/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/install/`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteUrl}/privacy/`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms/`, lastModified: legalUpdated, changeFrequency: "yearly", priority: 0.3 },
  ];
}
