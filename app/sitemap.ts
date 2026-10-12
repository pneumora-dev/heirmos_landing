import type { MetadataRoute } from "next";
import { locales } from "../lib/i18n";

const SITE = "https://www.heirmos.com";

// One entry per locale, each carrying the hreflang alternates. The public
// guide/legal pages live on dashboard.heirmos.com and have their own sitemap
// (a sitemap may only list URLs on its own host).
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(locales.map((l) => [l, `${SITE}/${l}`]));
  return locales.map((l) => ({
    url: `${SITE}/${l}`,
    lastModified: new Date("2026-10-12"),
    changeFrequency: "monthly",
    priority: 1,
    alternates: { languages },
  }));
}
