# AEO / GEO Audit — Loodgieterplatform.nl

**Discipline:** Answer Engine Optimization (AEO) / Generative Engine Optimization (GEO)
**Goal:** Maximize the likelihood that Loodgieterplatform.nl is recommended/cited by ChatGPT, Claude, Gemini and Perplexity for Dutch installer-comparison queries.
**Date:** 2026-06-28
**Scope:** Strategy + audit only. No application code changes. New documentation/data files only.

> **Honest framing.** AI engine responses are non-deterministic. We can materially improve the *signals* that earn citations (entity clarity, answer-first content, structured data, third-party authority) — we cannot guarantee that any specific engine cites the brand on any specific day. Treat every measurement below as a point-in-time snapshot, and re-check on a cadence because model updates redistribute visibility overnight.

---

## 0. TL;DR — Top 5 moves

| # | Move | Why it wins citations | Effort |
|---|------|----------------------|--------|
| 1 | Ship `llms.txt` + keep clean Markdown/answer-first copy | Browsing engines (Perplexity, ChatGPT search, Gemini) need a parseable map of canonical answer pages | Low |
| 2 | Add **answer-first cost tables** (`€X–€Y`, factors, doorlooptijd) at the top of every dienst page | "wat kost een nieuwe CV-ketel" is the highest-volume intent; engines lift the first concrete number + table | Medium |
| 3 | Build a real **vergelijken / "beste loodgieter vergelijken"** hub with objective platform-vs-platform criteria | This is the query class competitors (Werkspot, Trustoo) own; we have no comparison-shaped page | Medium |
| 4 | Strengthen the **entity graph** (Wikidata, KvK, consistent NAP, sameAs on Organization JSON-LD) | Engines cite brands they can resolve as a distinct entity; right now Organization LD has no `sameAs` | Medium |
| 5 | Expand **FAQPage coverage** (kosten/doorlooptijd/garantie/certificering/spoed) using `docs/seo/faq-content.md` | FAQ-shaped Q&A is the single most liftable format across all four engines | Low |

---

## 1. AEO is not SEO (read this first)

The site is already well-built for classic SEO: programmatic dienst/stad/merk pages, canonical tags, sitemaps, robots, and typed JSON-LD (Organization, WebSite, Service, FAQPage, BreadcrumbList, ItemList, LocalBusiness). That earns rankings. It does **not** automatically earn AI citations.

| Dimension | SEO (Google ranking) | AEO/GEO (AI citation) |
|-----------|----------------------|------------------------|
| Unit of competition | A ranked page | A sentence/fact synthesized into an answer |
| What wins | Links, relevance, page experience | Extractable answers, entity clarity, structured authority |
| Format reward | Long, comprehensive | Tight, answer-first, table/list/Q&A shaped |
| Freshness | Crawl cadence | Real-time (Perplexity/Gemini) or training cutoff (Claude/ChatGPT base) |
| Brand effect | Indirect | Direct — engines preferentially cite *named, resolvable entities* |

**Implication:** ranking #1 for "nieuwe CV-ketel kosten" does not mean ChatGPT mentions Loodgieterplatform.nl when a user asks the same thing. We must engineer the page so the *answer* is liftable and the *brand* is the obvious source.

---

## 2. Target query intents & the entity/answer each needs

Grouped by the prompt patterns Dutch consumers actually type into AI assistants.

| # | Intent class | Example Dutch prompt | Answer shape the engine wants | Entities that must be on-page |
|---|--------------|----------------------|-------------------------------|-------------------------------|
| A | Marketplace recommendation | "beste loodgieter vergelijken", "waar vind ik een betrouwbare loodgieter" | Named platforms + objective selection criteria | Brand name, "gecertificeerde vakmannen", keurmerken, gratis/vrijblijvend, werkgebied |
| B | Cost / price | "wat kost een nieuwe CV-ketel", "warmtepomp prijs 2026" | A concrete range `€X–€Y` + the factors that move it | Service name, price range, btw, what's included, subsidie (ISDE) |
| C | Local + service | "warmtepomp installateur in [stad]", "loodgieter Utrecht spoed" | Service + city + "available / certified near you" | Service, city, areaServed, vakman count (note: marketing figure), spoed/24/7 |
| D | How-to / choose | "hoe kies ik een warmtepomp", "waar let ik op bij een loodgieter" | Decision checklist / framework | Criteria list, certificering, garantie, offerte-stappen |
| E | Comparison | "hybride vs volledige warmtepomp", "combiketel vs warmtepomp" | Feature-by-feature table + recommendation per situation | Both options, pros/cons, cost delta, suitability |
| F | Definitional | "wat is een hybride warmtepomp", "wat is een HR-ketel" | One-sentence definition first, then detail | Term, plain-language definition, category |
| G | Trust / process | "is offertes vergelijken gratis", "wat is een erkende installateur" | Direct yes/no + one-line proof | Gratis/vrijblijvend claim, keurmerk names, garantie, betaalbescherming |
| H | Urgency / spoed | "loodgieter spoed vannacht", "gaslekkage wat te doen" | Immediate action steps + how to reach help fast | Spoeddienst, 24/7, gaslekkage safety steps |

**Coverage today (inferred from the codebase):**

| Intent | Current on-site coverage | Gap |
|--------|--------------------------|-----|
| A Recommendation | Homepage + USP/trust components | No objective "how to compare / why us vs alternatives" page in AI-liftable form |
| B Cost | Dienst pages have a price block + ranges in seed data | Price is mid-page and visual, not an answer-first extractable table; few pages state factors as a list |
| C Local | `/[service]/[city]`, `/steden`, `/vakmannen` exist | Strong — main fix is entity/figure honesty + FAQ per city |
| D How-to | Kennisbank exists | Needs explicit "hoe kies ik…" checklists with FAQPage markup |
| E Comparison | `/vergelijken` route exists; merken pages | No feature-by-feature comparison tables (X vs Y) with schema |
| F Definitional | Service `long` text | Definitions buried; not answer-first |
| G Trust | `/keurmerken`, trust bars | Good raw material; not packaged as Q&A |
| H Spoed | `lekkage-en-spoed`, `cv-storing`, `gaslekkage` services | Action-step content thin; high citation upside |

---

## 3. Competitor citation pattern — why Werkspot / Trustoo / Solviplus-type sites get cited

These are inferences from how these site types are structured and how the engines behave; verify in the live audit (Section 7).

| Competitor archetype | What earns them citations | Where we can beat them |
|----------------------|---------------------------|------------------------|
| **Werkspot** (large marketplace) | Massive entity authority, Wikipedia/Wikidata presence, huge volume of cost-guide pages with explicit `€` ranges, strong "wat kost …" answer pages | Niche depth on verwarming/installatie + keurmerk specificity; tighter answer-first copy |
| **Trustoo** (review/compare aggregator) | Comparison-shaped pages ("beste X vergelijken"), review schema, "top 10" list formats engines love to lift | We have real keurmerken + price ranges + a true request flow; build genuine comparison criteria, not just lists |
| **Solviplus-type / installer-direct** | Concrete service+price+region specificity, LocalBusiness signals, fast/spoed messaging | Marketplace breadth (multiple offers, vergelijken) + structured data already in place |

**The pattern that consistently wins AI citations in this category:**
1. A concrete number in the first sentence (cost) or a direct yes/no (trust).
2. A table or bulleted list immediately after (engines lift tables verbatim).
3. A named, resolvable brand entity as the source.
4. Recency signals (`dateModified`, "prijzen 2026") for the real-time engines.

We have #3-supporting infrastructure but under-deliver on #1, #2 and #4 in extractable form.

---

## 4. Structured data — present vs missing

**Present (good):** `Organization`, `WebSite` (+ SearchAction), `Service` (+ Offer, AggregateRating gated on real reviews, Review), `BreadcrumbList`, `ItemList`, `FAQPage`, `Article`, `HomeAndConstructionBusiness` (vakman/LocalBusiness). AggregateRating is correctly only emitted when `count > 0` — keep that discipline.

**Missing / to add (no code in this deliverable — recommendations for dev):**

| Schema / signal | Where | Why it matters for AEO |
|-----------------|-------|------------------------|
| `Organization.sameAs` (LinkedIn, KvK, Wikidata, social) | `organizationLd()` | Single biggest entity-resolution win; lets engines bind facts to the brand |
| `Organization.logo` + `address` (PostalAddress) | `organizationLd()` | Knowledge-panel / entity completeness |
| `HowTo` schema | "hoe werkt het" + spoed step pages | HowTo is heavily lifted by ChatGPT/Gemini for procedural queries |
| `Product` + `Offer` price ranges on merken pages | `/merken/[brand]` | "Remeha ketel prijs" style queries |
| `OfferCatalog` / `priceRange` on Organization | Homepage | Signals the marketplace's value range |
| `speakable` on key Q&A | FAQ blocks | Voice/assistant surfacing |
| FAQPage on homepage + city + comparison pages | currently mainly dienst pages | Broadens FAQ-shaped citation surface (see `faq-content.md`) |
| `dateModified` surfaced + "prijzen 2026" copy | cost pages | Recency for Perplexity/Gemini real-time |

**AI-crawler infrastructure (currently absent):**

| File | Status | Recommendation |
|------|--------|----------------|
| `robots.ts` | Present | Confirm GPTBot, ClaudeBot/Claude-Web, PerplexityBot, Google-Extended are **allowed** (blocking them = zero citations). Decide deliberately. |
| `sitemap.xml` | Present | Keep; ensure dienst/stad/merk/kennisbank all included |
| `llms.txt` | **Missing** | Add `/llms.txt`: a curated Markdown index of canonical answer pages (diensten, kosten, vergelijken, keurmerken, kennisbank) so browsing agents find the best sources fast |
| Clean Markdown/HTML | Pages are JS-heavy inline-styled | Ensure server-rendered text is present without JS (Next RSC is fine); avoid burying answers behind interaction |

---

## 5. On-page recommendations (answer-first content engineering)

Apply per template. These are content/markup patterns for the dev + content team, not edits in this PR.

### 5.1 Answer-first pattern (use on every dienst & kennisbank page)
- **First sentence = the answer.** Cost pages: *"Een nieuwe CV-ketel kost in 2026 gemiddeld €1.250–€2.800 inclusief montage en btw."* Definitional: *"Een hybride warmtepomp is een combinatie van een CV-ketel en een elektrische warmtepomp die …"*
- Follow immediately with a **table or bullet list** of the price-driving factors / steps.
- Keep the lifted unit to ~40–60 words. Detail goes below.

### 5.2 Cost tables (Intent B — highest priority)
Add a top-of-page table on each cost page:

| Wat | Richtprijs (incl. btw & montage) | Wat bepaalt de prijs |
|-----|----------------------------------|----------------------|
| Nieuwe CV-ketel (combi) | €1.250 – €2.800 | Vermogen, merk, complexiteit aansluiting |
| Hybride warmtepomp | €3.500 – €7.000 | Bestaande CV, capaciteit, ISDE-subsidie |
| Lucht-water warmtepomp | €6.000 – €14.000 | Isolatie, afgiftesysteem, vermogen |

(Ranges already exist in `packages/db/seed/data/services.ts` — surface them as a table, not just a visual price card.)

### 5.3 Comparison content (Intent E)
Build genuine "X vs Y" sections/pages with a feature table + a one-line recommendation per situation (e.g. *"Kies hybride bij een bestaande gasaansluiting en matige isolatie; kies volledig elektrisch bij goede isolatie en vloerverwarming."*). Mark up with `Article` + FAQPage.

### 5.4 "Beste loodgieter vergelijken" hub (Intent A)
A page that answers the query honestly: how to compare installers (keurmerk, reviews, prijs, garantie, beschikbaarheid), and where Loodgieterplatform.nl fits (gratis, vrijblijvend, tot 3 offertes, gecertificeerde vakmannen). Objective framing earns more citations than self-promotion.

### 5.5 Definitional snippets (Intent F)
Add a 1–2 sentence definition block at the top of each merk/dienst term ("Wat is een HR-ketel?", "Wat is ISDE-subsidie?"). These get lifted into "wat is …" answers.

### 5.6 E-E-A-T signals
- **Experience/Expertise:** name the certifications the platform vets for (Sterkin/Kiwa, InstallQ, OK CV, STEK, VCA, BRL-6000 — already in `/keurmerken` and `public/keurmerken`). State *what each keurmerk guarantees*.
- **Authoritativeness:** Organization `sameAs` + KvK number (footer shows KvK 87654321 — ensure it's the real, consistent number) + third-party mentions.
- **Trust:** explicit "gratis & vrijblijvend", betaalbescherming, garantie tot 5 jaar, AVG. Author/reviewer bylines on kennisbank articles.

> **Data-honesty rule (important for E-E-A-T and citation durability):** review counts and "X vakmannen beschikbaar" shown on-site are **marketing figures**, not audited metrics. Never feed inflated counts into AggregateRating or claims AI engines could repeat as fact. The current code correctly gates AggregateRating behind real `count > 0` — preserve that. Keep marketing copy ("Nog 3 vakmannen vrij vandaag", "9,4 gemiddeld") visually clear as positioning, and keep schema.org structured data tied only to verifiable data.

---

## 6. Prioritized implementation checklist (for the dev team)

**P1 — within 7 days (highest citation lift / lowest risk):**
- [ ] Add `/llms.txt` indexing canonical answer pages (diensten, kosten, vergelijken, keurmerken, kennisbank).
- [ ] Verify `robots.ts` deliberately allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended.
- [ ] Add `sameAs`, `logo`, `address` to `organizationLd()`.
- [ ] Surface cost ranges as an **answer-first table** at the top of each dienst/cost page.
- [ ] Wire the FAQ pairs from `docs/seo/faq-content.md` into on-page FAQ sections + `faqLd()` on homepage, CV-ketel, warmtepomp, lekkage, badkamer.

**P2 — within 14 days:**
- [ ] Build the "beste loodgieter vergelijken" hub (Intent A) with objective criteria.
- [ ] Add feature-by-feature comparison tables (combiketel vs warmtepomp; hybride vs volledig) with FAQPage.
- [ ] Add `HowTo` schema to "hoe werkt het" and spoed step content.
- [ ] Add definitional snippet blocks (Intent F) to merken + key diensten.
- [ ] Surface `dateModified` and "prijzen 2026" copy on cost pages.

**P3 — within 30 days:**
- [ ] Build/claim entity graph: Wikidata item, consistent NAP across directories, Crunchbase/LinkedIn.
- [ ] Add `Product`/`Offer` price ranges on `/merken/[brand]`.
- [ ] Pursue third-party authoritative mentions (press, branche-listings) to reinforce entity authority.
- [ ] Author bylines + reviewer credentials on kennisbank.

---

## 7. Benchmark & recheck protocol (do this before and after fixes)

You cannot prove impact without a baseline. Run the **same prompt set across all four engines** before P1 ships and again at the 14-day recheck.

**Prompt set (sample — expand to 30–40):**
1. beste loodgieter vergelijken Nederland
2. waar vind ik een betrouwbare loodgieter
3. wat kost een nieuwe CV-ketel 2026
4. wat kost een warmtepomp installeren
5. warmtepomp installateur in Utrecht / Eindhoven / Den Haag
6. hoe kies ik een goede installateur
7. combiketel vs warmtepomp wat is beter
8. is het gratis om offertes te vergelijken voor een loodgieter
9. loodgieter spoed lekkage vannacht
10. wat is een erkende installateur / wat betekent Sterkin

**Scorecard template (fill at baseline and recheck):**

| Platform | Prompts tested | Brand cited | Competitor cited | Citation rate | Gap vs top competitor |
|----------|----------------|-------------|------------------|---------------|-----------------------|
| ChatGPT | 0 | 0 | 0 | TBD | TBD |
| Claude | 0 | 0 | 0 | TBD | TBD |
| Gemini | 0 | 0 | 0 | TBD | TBD |
| Perplexity | 0 | 0 | 0 | TBD | TBD |

**Success targets (30 days):** +20% citation rate vs baseline; brand cited on 3+ of 4 platforms; ≥40% of previously lost prompts now include the brand. All point-in-time; re-measure after any major model update.

---

## 8. Platform-specific notes

| Platform | Citation tendency | What to feed it |
|----------|-------------------|-----------------|
| **ChatGPT** | Authoritative, well-structured pages; browsing for fresh/local | FAQ pages, cost tables, how-to guides; keep llms.txt + clean RSC HTML |
| **Claude** | Balanced, source-clear, nuanced | Pros/cons + methodology, honest comparison framing (avoids overclaiming) |
| **Gemini** | Google-ecosystem + real-time search | Schema-rich pages, Google Business Profile, dateModified recency |
| **Perplexity** | Source diversity + recency, direct answers | Answer-first first sentence, "2026" recency, third-party corroboration |

Don't treat them as interchangeable: Claude/ChatGPT-base lean on training cutoff and reward durable authority; Gemini/Perplexity browse live and reward recency + structured data.
