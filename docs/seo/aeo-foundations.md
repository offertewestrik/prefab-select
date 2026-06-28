# AEO Foundations — Loodgieterplatform.nl

AI Engine Optimization (AEO) infrastructure layer: making the site discoverable,
parseable and citable by AI crawlers and citation engines (ChatGPT, Claude,
Perplexity, Gemini, Bing/Copilot) alongside traditional search.

Date: 2026-06-28
Scope: discovery layer only — no backend, data, query, component or visual-design
changes. Site URL resolves from `NEXT_PUBLIC_SITE_URL` (fallback
`https://loodgieterplatform.nl`).

## What was added

### 1. `apps/web/public/llms.txt`

A machine-readable discovery file following the [llmstxt.org](https://llmstxt.org)
convention:

- H1 site name + blockquote summary (what the site does, for whom).
- Curated sections with absolute production URLs: Diensten, Vakmannen, Steden,
  Kennisbank, Merken, Keurmerken, Voor vakmannen, Over ons, Contact.
- An `## Optional` section pointing AI systems at the full sitemap index.

Served as a static asset at `https://loodgieterplatform.nl/llms.txt`. Dutch
descriptions, standard llms.txt structure.

### 2. `apps/web/src/app/robots.ts`

Enhanced the existing `MetadataRoute.Robots` route without weakening any rule:

- Preserved the `*` rule (`allow: "/"`, disallow `/dashboard/`, `/admin/`,
  `/api/`, `/aanvraag`) and the existing `sitemap` + `host` references.
- Changed `rules` from a single object to an array and added an explicit rule
  group for AI/citation crawlers: GPTBot, OAI-SearchBot, ChatGPT-User,
  ClaudeBot, Claude-Web, anthropic-ai, PerplexityBot, Perplexity-User,
  Google-Extended, Applebot-Extended, CCBot, Bingbot.
- The AI crawler group inherits the **same** disallow set as `*` — nothing that
  was previously crawlable is now blocked; access for these agents is simply
  made explicit. The sitemap index already lived at `/sitemap.xml` and is
  retained.

Default posture is **allow** for AI crawlers. If the business later decides to
opt out of training crawlers (e.g. GPTBot, ClaudeBot, Google-Extended) for
content-licensing reasons, move those user-agents to a dedicated rule with
`disallow: "/"`. That is a documented business decision, not an engineering one.

## Verification

- `robots.ts` returns a valid `MetadataRoute.Robots` (array-form `rules`), so
  Next.js renders `/robots.txt` with both rule groups and the sitemap line.
- `/llms.txt` resolves as a static file from `public/`.
- Post-deploy: query ChatGPT/Claude/Perplexity for the brand and confirm the
  pages are ingested; check access logs for AI user-agents returning 200 (not
  403/404) on allowed paths.

## Follow-ups (not in this change)

- **Token-budgeted content** — measure token counts (tiktoken / cl100k_base) for
  the highest-value pages (homepage, diensten, dienst×stad money-pages). Split
  or summarise anything well over budget so AI ingestion is not truncated.
- **Structured Markdown availability** — consider Markdown or clean-HTML
  endpoints (e.g. `.md` variants or a content API) for core pages and kennisbank
  articles, and verify key pages render meaningfully with JavaScript disabled.
- **`llms-full.txt`** — optionally publish an expanded variant with inlined
  summaries of core pages for single-fetch ingestion.
- **Schema markup** — add `FAQPage` / `HowTo` / `Article` JSON-LD on eligible
  kennisbank and service pages (the `@repo/seo` package already exposes JSON-LD
  builders) to strengthen citation eligibility.
- **Agent discovery (Wave 3)** — when agentic task flows (offerte aanvragen) are
  in scope, evaluate `agent-permissions.json` / a WebMCP discovery endpoint and
  ensure guest, non-JS-only form flows.
- **Maintenance** — review `llms.txt` quarterly so links stay valid, and watch
  crawl logs for newly emerging AI user-agents to add to `robots.ts`.
