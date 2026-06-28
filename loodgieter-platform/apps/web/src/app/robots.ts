import type { MetadataRoute } from "next";
import { siteUrl } from "@repo/seo";

/**
 * Default disallow-paden voor ALLE crawlers (incl. AI-crawlers).
 * Niet-publieke of transactionele routes worden uitgesloten.
 */
const DISALLOW = ["/dashboard/", "/admin/", "/api/", "/aanvraag"];

/**
 * AI- en citation-crawlers die we expliciet toelaten zodat AI-engines
 * (ChatGPT, Claude, Perplexity, Gemini, Bing/Copilot, Common Crawl) de
 * publieke content kunnen vinden, parsen en citeren. Ze erven dezelfde
 * disallow-set als `*` — we blokkeren dus niets dat nu al toegankelijk is.
 */
const AI_CRAWLERS = [
  "GPTBot", // OpenAI: training + ChatGPT browsing
  "OAI-SearchBot", // OpenAI: ChatGPT search index
  "ChatGPT-User", // OpenAI: live fetch namens gebruiker
  "ClaudeBot", // Anthropic: training + Claude-antwoorden
  "Claude-Web", // Anthropic: live fetch namens gebruiker
  "anthropic-ai", // Anthropic: legacy user-agent
  "PerplexityBot", // Perplexity: real-time search + citaties
  "Perplexity-User", // Perplexity: live fetch namens gebruiker
  "Google-Extended", // Google: Gemini (los van Search)
  "Applebot-Extended", // Apple Intelligence
  "CCBot", // Common Crawl (voedt veel AI-datasets)
  "Bingbot", // Microsoft Bing / Copilot
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: DISALLOW,
      },
      // Expliciete toestemming voor AI-/citation-crawlers. Zelfde disallow
      // als `*`; dit overschrijft geen bestaande blokkades, maar maakt de
      // toegang voor deze user-agents ondubbelzinnig.
      {
        userAgent: AI_CRAWLERS,
        allow: "/",
        disallow: DISALLOW,
      },
    ],
    sitemap: siteUrl("/sitemap.xml"),
    host: siteUrl("/"),
  };
}
