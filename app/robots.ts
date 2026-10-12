import type { MetadataRoute } from "next";

// Public marketing site: everything is indexable. AI crawlers are listed
// explicitly (GEO — answer engines cite what they are allowed to read); the
// wildcard already allows them, the names just make the intent auditable.
const SITE = "https://www.heirmos.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Bingbot",
          "Yeti",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
