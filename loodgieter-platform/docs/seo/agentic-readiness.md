# Agentic Search Readiness Audit — Loodgieterplatform.nl

**Date:** 2026-06-28
**Scope:** Can AI browsing agents (ChatGPT agent, Perplexity, Claude with browsing) actually *complete* the two core tasks?
1. **"Vraag gratis offertes aan"** — submit a quote request (the `/aanvraag` lead flow).
2. **"Vind / vergelijk vakmannen"** — discover and filter the installer directory (`/vakmannen`).

This is a strategy/audit deliverable. **No application code was changed.** All findings are grounded in the actual source. Every fix below is a *recommendation* for the team.

> **Spec maturity note.** WebMCP (the `tool`/`mcp` declarative affordances and `navigator.mcpActions` imperative API) is a **2026 W3C draft**, not a shipped standard. Support varies by browser and agent and is not yet broadly available. JSON-LD `PotentialAction`, semantic forms, ARIA, and stable query-param URLs are **testable and effective today** and should be done first. WebMCP is forward-looking, low-cost insurance — implement it *after* the fundamentals, not instead of them.

---

## TL;DR — the two tasks scored differently

| Task flow | Discoverable by agent | Initiatable | Completable end-to-end | Primary blocker |
|---|---|---|---|---|
| **Vind/vergelijk vakmannen** (`/vakmannen`) | ✅ Yes | ✅ Yes | ✅ **Yes** | None blocking — strong. Native GET form, stable params, JSON-LD `ItemList`/`LocalBusiness`. |
| **Vraag gratis offertes aan** (`/aanvraag`) | ❌ **No** | ⚠️ Partial | ❌ **No** | Triple block: `robots.txt` disallows `/aanvraag`, page is `noindex`, and the wizard is a JS-only `useState` machine with no `<form>`, no field `name`s, and a custom-button service picker. |

**The headline:** The *discovery/comparison* task is genuinely agent-ready. The *money task* — the quote request — is effectively invisible and uncompletable for an autonomous agent. An agent landing on the homepage can read the marketing copy and even submit the hero GET form (which lands it on `/aanvraag?dienst=...`), but it cannot crawl that destination, cannot fill the multi-step wizard reliably, and the partial data the hero/service forms pass is silently dropped.

---

## Flow 1 — "Vind / vergelijk vakmannen" (`/vakmannen`) — STRONG

### What works (keep this; it is the model to copy)

- **Native GET `<form>` for filters.** `installer-filters.tsx` is a real `<form method="get" action="/vakmannen">` — no client JS required to submit. An agent can read the form, set values, and submit. This is exactly the agent-friendly pattern.
- **Stable, human-readable query params.** `parseDirectoryParams()` maps URL params to filters deterministically: `dienst`, `plaats`, `provincie`, `score`, `spoed=1`, `keurmerk`, `sort`, `bij`, `straal`, plus free-text `q`. An agent can construct a URL like
  `/vakmannen?dienst=cv-ketel&plaats=eindhoven&score=4.5&spoed=1&sort=rating` directly, without touching the UI at all. This is the single best agentic affordance on the site.
- **`<select>` options are server-rendered** from the DB (`getDirectoryFilterOptions`), so an agent reading the HTML sees the exact valid slug values for `dienst`/`plaats`/`provincie`/`keurmerk` — it does not have to guess.
- **Every `<select>`/`<input>` has a `name`** and is wrapped in a `<label>` with visible text. Field intent is machine-readable.
- **Results carry JSON-LD.** `vakmannen/page.tsx` emits `BreadcrumbList`, `ItemList` (linking each installer profile), and per-installer `LocalBusiness` with `AggregateRating`. Agents and citation engines can parse the result set as structured data, not just pixels.
- **Crawlable & indexable.** `/vakmannen` is allowed in `robots.ts` and has proper canonical metadata.

### Minor friction (non-blocking)

- The submit button label "Filter vakmannen" and the free-text `bij` (origin) + `straal` (radius) pairing are not described anywhere machine-readably; an agent has to infer that `bij` expects a place name or postcode. Low impact because results still render server-side.
- The `q` free-text box and the `dienst` dropdown overlap in purpose; an agent may not know which to use. Non-blocking.

**Verdict:** Flow 1 is agent-completable today. The recommendations for it are enhancements, not fixes.

---

## Flow 2 — "Vraag gratis offertes aan" (`/aanvraag`) — BLOCKED

The quote request is the conversion event the whole platform exists for, and it is the *least* agent-ready surface. There are three independent blockers, any one of which alone would stop an autonomous agent.

### Blocker A — The page is hidden from agents (discovery layer)

1. **`robots.ts` disallows `/aanvraag` for everyone**, including the explicitly-allowlisted AI crawlers:
   ```
   const DISALLOW = ["/dashboard/", "/admin/", "/api/", "/aanvraag"];
   ```
   The `AI_CRAWLERS` block (GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Perplexity-User, etc.) inherits the same `DISALLOW`. So the agents you *want* to complete tasks are told not to fetch the one page where the task happens. `ChatGPT-User` and `Perplexity-User` (live, on-behalf-of-user fetches) honour robots — they will refuse to navigate there.
2. **The page itself is `noindex`:** `robots: { index: false, follow: true }` in `aanvraag/page.tsx`.
3. **`llms.txt` never mentions the quote task.** It lists Diensten, Vakmannen, Steden, Kennisbank, Merken, Keurmerken, Voor-vakmannen, Over/Contact — but there is no "Offerte aanvragen" entry and no description of *how* to request quotes. An agent reading `llms.txt` to plan a task has no signpost to the primary action.

> **Nuance:** `noindex` is a defensible SEO choice (thin, transactional, parameterised page you don't want in the search index). But `noindex` (search ranking) and `Disallow` (crawl/fetch access) are different levers. Disallowing `/aanvraag` blocks the *agent's ability to act*, not just its ability to rank. For agentic completion you want the page **fetchable** (allowed in robots) even if **not indexed**.

### Blocker B — The wizard is not a form (completion layer)

`lead-wizard.tsx` is a `"use client"` component built on `useState`. Concretely:

- **There is no `<form>` element and no `name` attributes on any field.** State is held in a React object and POSTed as JSON via `fetch("/api/leads")`. An agent inspecting the DOM sees `<input>`/`<textarea>`/`<select>` with **no `name`, no `id`, no `autocomplete`**, so it cannot map "this box = email" except by reading the adjacent label text and hoping.
- **Step 0 (service选择) and Step 1 (urgency) are `<button>` grids, not `<select>`/radios.** Selecting a service means clicking the right `<button>` whose only identifier is its visible text. There is no `role="radio"`, no `aria-pressed`, no value attribute. An agent must do fragile text-matching and visual clicking.
- **It is a 6-step state machine** (`Dienst → Klusdetails → Foto's → Locatie → Gegevens → Klaar`). Each "Volgende stap" is client-side; nothing is in the URL, so an agent loses all context on any reload and cannot deep-link to a step. Multi-step JS flows with no per-step URL state are a known agent-hostile archetype.
- **The custom `Input`/`Field` helper components** render bare `<input>`s with placeholder-only hints and no `name`/`type="email"`/`type="tel"`/`autocomplete`. Even a human-assist autofill agent gets no signal that "Telefoonnummer" is `tel` or "E-mailadres" is `email`.

### Blocker C — Partial data is silently dropped (integration layer)

The marketing forms that *feed* the wizard pass data the wizard then ignores:

- **Homepage hero form** (`page.tsx`) and **service-page sticky form** (`diensten/[service]/page.tsx`) are good native GET forms — they submit `dienst`, `postcode`, and `huisnummer` to `/aanvraag`.
- **But `/aanvraag` only reads `dienst` and `plaats`** from `searchParams` (`RequestPage` destructures `{ dienst, plaats }`). So `postcode` and `huisnummer` the user/agent already provided are thrown away, *and* the forms send `huisnummer`/`postcode` while the wizard prefill expects `plaats`. The agent (and the user) re-enters location from scratch at the wizard. A completed "first step" silently resets.

### The one bright spot in Flow 2: the API exists and is clean

`POST /api/leads` accepts a single JSON body validated by `leadInputSchema` (Zod) and returns `{ success, ... }`. The schema is a clear, documented contract:
`serviceId` (service slug), `postcode` (`/^\d{4}\s?[A-Za-z]{2}$/`), `houseNumber`, `city`, `contactName`, `contactEmail`, `contactPhone`, `urgency` (`SPOED|BINNEN_WEEK|FLEXIBEL`), `description` (min 5 chars), optional `street`, `preferredDate`, `preferredDaypart`, `photos[]`.

This means the *server* is already agent-ready — the entire task can be completed in one POST. What's missing is any machine-readable declaration that this endpoint exists and what it expects. That is precisely what a WebMCP affordance or a JSON-LD `PotentialAction` would publish. **But note `/api/` is also in `DISALLOW`** — so today nothing about this endpoint is discoverable to an agent.

---

## Agent Friction Map — "Vraag offertes aan" (autonomous agent, today)

```
Step 0  Land on homepage                      ✅ Pass   (crawlable, hero GET form is real)
Step 1  Submit hero form (dienst+postcode)    ⚠️ Degraded  GET to /aanvraag?dienst=… works,
                                                            but postcode/huisnummer are dropped
Step 2  Fetch /aanvraag                        ❌ FAIL   robots Disallow + noindex; ChatGPT-User /
                                                            Perplexity-User refuse to navigate
Step 3  Pick service (button grid)             ❌ FAIL   no value/role/name; text-match + click only
Step 4  Fill description / urgency             ⚠️ Degraded  no field names, button-based urgency
Step 5  Upload photos                          ⏭️ Skippable (optional) — but JS dropzone, not agent-usable
Step 6  Fill location                          ⚠️ Degraded  re-enter postcode already given in Step 1
Step 7  Fill contact (name/email/phone)        ⚠️ Degraded  no name/type/autocomplete on inputs
Step 8  Submit → POST /api/leads               ❌ FAIL   reached only via the JS wizard; /api/ disallowed
```

Net: **task completion rate for an autonomous agent ≈ 0%** on the quote flow as built, gated first at Step 2.

---

## Prioritised checklist

Legend: **QW** = quick win (hours, low risk, no architecture change) · **L** = larger effort (component/flow change).
Ordered by impact-per-effort. WebMCP items are explicitly marked as forward-looking.

### P0 — Unblock discovery & access (do first; nothing else matters until these are done)

1. **[QW] Stop disallowing `/aanvraag` in `robots.ts`.** Remove `/aanvraag` from `DISALLOW` (keep `noindex` on the page if you don't want it ranked). This lets `ChatGPT-User`, `Perplexity-User`, and `ClaudeBot` actually fetch the task page. *This is the single highest-leverage change.* (One-line edit; recommend, don't apply here.)
2. **[QW] Add an "Offertes aanvragen" entry to `llms.txt`** with a one-line description of the task and the canonical entry URL, e.g. `https://loodgieterplatform.nl/aanvraag?dienst={slug}`. Give agents a signpost to the primary action and the param it accepts.
3. **[QW] Decide on `/api/leads` exposure.** If you want agents to complete the quote in one shot, document the endpoint (see P2 #8/#9) and reconsider the blanket `/api/` disallow for this specific route, or expose an equivalent declared action. (Strategy decision — flag for the team, security review needed.)

### P1 — Make the quote flow agent-completable (the real fix)

4. **[L] Provide a single-page, native-`<form>` fallback for the quote request.** The 6-step `useState` wizard can stay as the human UX, but a flat `<form method="post">` (or progressively-enhanced GET→review→POST) with proper fields would make the task completable by any agent and by no-JS clients. This is the structural fix behind most P1 items.
5. **[QW within #4] Give every field a real `name`, `type`, and `autocomplete`.** Map directly to `leadInputSchema`: `name="contactEmail" type="email" autocomplete="email"`, `name="contactPhone" type="tel" autocomplete="tel"`, `name="postcode" autocomplete="postal-code"`, `name="contactName" autocomplete="name"`, `name="description"`, etc. This alone makes the existing inputs machine-mappable.
6. **[QW within #4] Replace the service/urgency `<button>` grids with semantic controls.** Use a `<select name="serviceId">` (options already available server-side from `getServicesByCategory`) and `<input type="radio" name="urgency" value="SPOED|BINNEN_WEEK|FLEXIBEL">`, or at minimum add `role="radio"` + `aria-checked` + a `value`. Removes the fragile text-match-and-click step.
7. **[QW] Fix the dropped-param handshake.** Make `/aanvraag` read `postcode`, `huisnummer`/`huisnr`, and `plaats` from `searchParams` and prefill them, so the data the homepage/service forms already collect is not discarded. (Today only `dienst`/`plaats` are read; the forms send `postcode`/`huisnummer`.) Small server-component change, big UX + agent win.

### P2 — Publish machine-readable affordances (structured-data layer — testable today)

8. **[QW] Add a `PotentialAction` to the quote flow via JSON-LD.** On `/aanvraag` (and/or the Organization node), declare the task so citation engines and agents know it exists and what it takes. Example to add to the existing `@repo/seo` builders:
   ```jsonc
   {
     "@context": "https://schema.org",
     "@type": "Service",
     "name": "Offerte aanvragen voor loodgieterswerk",
     "potentialAction": {
       "@type": "OrderAction",            // or a "ReserveAction"/"RequestAction" pattern
       "name": "Vraag gratis offertes aan",
       "target": {
         "@type": "EntryPoint",
         "urlTemplate": "https://loodgieterplatform.nl/aanvraag?dienst={service}&plaats={city}",
         "httpMethod": "GET",
         "actionApplication": { "@type": "WebApplication", "name": "Loodgieterplatform.nl" }
       }
     }
   }
   ```
9. **[QW] Fix the existing `SearchAction` target.** `websiteLd()` currently declares `target: "{siteUrl}/?q={search_term_string}"`, but the real search lives at `/vakmannen?q=…`. Point the `SearchAction` (and ideally a second one for `dienst`/`plaats`) at `/vakmannen` so the "find a vakman" action is correctly described:
   ```jsonc
   "potentialAction": {
     "@type": "SearchAction",
     "target": "https://loodgieterplatform.nl/vakmannen?q={search_term_string}",
     "query-input": "required name=search_term_string"
   }
   ```
   This is the cheapest way to make the *already-strong* Flow 1 explicitly declared rather than merely inferable.

### P3 — WebMCP (forward-looking; do after P0–P2, low cost, not yet broadly supported)

WebMCP lets a page declare its available *actions* to an agent in a machine-readable way. There are two modes; the platform's two flows map cleanly onto them.

10. **[QW] Declarative WebMCP on the directory filter form (Flow 1).** Once the native form fix (#4–#6) lands, the filter and quote forms are good declarative candidates — annotate the existing `<form>`/fields with the draft `data-mcp-*` / `tool` affordances so an agent reads the action contract directly off the DOM. Declarative is the safer, more compatible mode; prefer it wherever a real `<form>` already exists. Example shape (illustrative — draft spec, verify current attribute names before implementing):
    ```html
    <form method="get" action="/vakmannen"
          data-mcp-action="find-vakmannen"
          data-mcp-description="Zoek en vergelijk gecertificeerde loodgieters/installateurs. Filter op dienst, plaats, beoordeling, keurmerk en spoedservice.">
      <select name="dienst" data-mcp-param="dienst" data-mcp-description="Dienst-slug, bijv. cv-ketel">…</select>
      <input  name="bij"    data-mcp-param="bij"    data-mcp-description="Plaatsnaam of postcode als herkomst voor afstand">
      …
    </form>
    ```
11. **[L] Imperative WebMCP for the quote request (Flow 2).** Because the wizard is dynamic/SPA-ish and the real completion is a single `POST /api/leads`, the quote task is a natural fit for `navigator.mcpActions.register()` with a `handler` that calls the existing endpoint. The Zod `leadInputSchema` is already the parameter contract — it converts almost 1:1 into a JSON-Schema `parameters` block. This gives agents one-call completion *without* navigating the 6-step UI. Illustrative:
    ```js
    if ('mcpActions' in navigator) {
      navigator.mcpActions.register({
        id: 'vraag-offertes-aan',
        name: 'Vraag gratis offertes aan',
        description: 'Plaats een vrijblijvende offerte-aanvraag bij gecertificeerde vakmannen.',
        parameters: { /* derived from leadInputSchema: serviceId, postcode, houseNumber,
                         city, contactName, contactEmail, contactPhone, urgency, description, … */ },
        handler: async (p) => {
          const r = await fetch('/api/leads', { method:'POST',
            headers:{'Content-Type':'application/json'}, body: JSON.stringify(p) });
          const j = await r.json();
          return { success: r.ok, message: r.ok ? 'Aanvraag ontvangen.' : j.error };
        }
      });
    }
    ```
12. **[QW] Publish a `/mcp-actions.json` discovery endpoint + `<link rel="mcp-actions">`.** List both actions (declarative `find-vakmannen`, imperative `vraag-offertes-aan`) so agents can discover affordances without executing page JS. Cheap, additive, and the natural home for the contract once #10/#11 exist.

---

## Quick wins vs. larger efforts (summary)

**Quick wins (hours, low risk):**
- #1 Remove `/aanvraag` from robots `DISALLOW` *(highest leverage)*
- #2 Add quote task to `llms.txt`
- #7 Read & prefill `postcode`/`huisnummer`/`plaats` on `/aanvraag`
- #8 Add `PotentialAction`/`OrderAction` JSON-LD for the quote flow
- #9 Fix `SearchAction` target to `/vakmannen?q=`
- #12 Publish `/mcp-actions.json` + `<link rel="mcp-actions">`
- (#5/#6 are quick *once* #4's container exists)

**Larger efforts (component/flow changes):**
- #4 Native single-page `<form>` fallback for the quote wizard *(unlocks the whole flow)*
- #11 Imperative WebMCP registration wrapping `POST /api/leads`
- #3 Strategic decision on `/api/leads` agent exposure (needs security review)

---

## Measurement guidance (for the team, before/after)

- **Establish a baseline first.** Today's autonomous-agent completion rate on the quote flow is effectively 0% (gated at robots fetch). Record it before any change so improvement is demonstrable.
- **Test with real agents, not proxies.** Validate Flow 1 and Flow 2 with at least two of: Claude with browsing, ChatGPT agent, Perplexity. Self-inspection of the DOM is not a substitute.
- **Track the two tasks separately** — discovery/compare (Flow 1) and quote-completion (Flow 2) have different metrics and different blockers. Do not average them into one "score".
- **Watch for the `noindex` vs `Disallow` distinction** in any retest: confirm agents can *fetch* `/aanvraag` even while it stays out of the search index.

---

## Files referenced (for the implementing team)

- `apps/web/src/app/robots.ts` — `/aanvraag` and `/api/` in `DISALLOW`; AI crawler allowlist.
- `apps/web/public/llms.txt` — no quote-task entry.
- `apps/web/src/app/(request)/aanvraag/page.tsx` — `noindex`; reads only `dienst`/`plaats`.
- `apps/web/src/features/leads/components/lead-wizard.tsx` — JS `useState` wizard; no `<form>`, no field `name`s, button-grid pickers.
- `apps/web/src/app/api/leads/route.ts` + `packages/core/src/leads.ts` — clean JSON `POST` contract (`leadInputSchema`), agent-ready server side.
- `apps/web/src/components/marketing/installer-filters.tsx` — exemplary native GET form (the pattern to copy).
- `apps/web/src/features/installers/server/directory.ts` — `parseDirectoryParams` (stable param contract).
- `apps/web/src/app/vakmannen/page.tsx` — JSON-LD `ItemList`/`LocalBusiness`/breadcrumb.
- `apps/web/src/app/(marketing)/diensten/[service]/page.tsx` — sticky GET form sends `dienst`/`postcode`/`huisnummer` (latter two dropped by `/aanvraag`).
- `apps/web/src/app/(marketing)/page.tsx` — homepage hero GET form (same dropped-param issue).
- `apps/web/src/components/marketing/lead-cta.tsx` — `/aanvraag?dienst=&plaats=` deep-link builder.
- `packages/seo/src/jsonld.ts` — `websiteLd()` `SearchAction` (wrong target); home for new `PotentialAction`.
