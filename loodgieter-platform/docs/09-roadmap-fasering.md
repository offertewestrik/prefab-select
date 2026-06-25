# 09 — Roadmap & fasering

Eerst **de motor**, dan verbreden. Elke fase is op zichzelf bruikbaar en
levert waarde. We bouwen pas na goedkeuring, fase voor fase.

## Fase 0 — Fundering  *(eerst)*
> Doel: schaalbaar skelet waarop alles verder bouwt.

- Monorepo (Turborepo + pnpm), `packages/{db,ui,config,core,seo,emails}`.
- Next.js 15-app met route-groepen + middleware (rollen).
- **Prisma-schema** (doc 03) + eerste migratie op Supabase.
- **Seeds**: diensten/categorieën/merken + alle gemeenten (CBS/PDOK).
- Design tokens + Tailwind-preset + basis-`packages/ui` (shadcn).
- Infra: Vercel + Cloudflare + Upstash + env-management + CI (lint/typecheck/migrate).
- Auth.js (rollen, registratie/login).
- *Opruimen oude Firebase-fundering.*

## Fase 1 — De SEO-motor  *(pijler 1 & 2)*
> Doel: duizenden vindbare pagina's live.

- Dienstpagina's `/diensten/[service]` (mini-sites).
- Stadpagina's `/steden/[city]`.
- ⭐ Combinatiepagina's `/[service]/[city]` met unieke data-driven content.
- ISR-strategie, JSON-LD, interne-link-motor, dynamische sitemaps, OG-images,
  robots, canonicals, redirects.
- Home + statische marketingpagina's (over-ons, voor-vakmannen, contact).

## Fase 2 — Aanvraagflow & marketplace-basis  *(pijler 3)*
> Doel: verkeer → leads → omzet.

- 5-staps aanvraag-wizard (context-aware vanaf SEO-pagina's).
- Lead-opslag, e-mailbevestiging, anti-spam (Turnstile/rate-limit).
- Matching & distributie + Redis-lock.
- Credits/wallet + Stripe top-up + BTW-facturen.

## Fase 3 — Vakman-dashboard  *(pijler 4)*
> Doel: aanbodzijde bedienen.

- Onboarding/registratie + admin-goedkeuring.
- Leads bekijken/kopen, opdrachten inplannen (`Appointment`), agenda.
- Werkgebied + diensten instellen (Mapbox), credits opwaarderen, statistieken.
- Reviews ontvangen/reageren + review-uitnodiging na afronding.

## Fase 4 — Admin/CMS  *(pijler 5)*
> Doel: zelf de motor besturen.

- Beheer diensten, categorieën, merken, steden.
- Landingpage-overrides + SEO Manager (meta, redirects, sitemap, ISR-revalidate).
- Lead-beheer + vakman-beheer + facturen.
- Kennisbank/blog-CMS + blokken-pagina's.

> Fasen 1–4 vormen samen **"de motor"** — de scope die nu is afgesproken.

## Later (na de motor) — verbreding
- Volledige design-afwerking + 3D/visuals + parallax-polish.
- **AI-suite**: offerte-schrijver, fotoanalyse/lekkageherkenning, advies-chat.
- Calculators & configurators (cv, warmtepomp, badkamer…).
- Uitgebreide installer-workspace: offertes/facturen naar klant, werkbonnen,
  documenten, Google-Bedrijfsprofiel-koppeling.
- Abonnementen (Plan/Subscription) + featured listings.
- Woonplaats-niveau pagina's, merk-hubs, meertaligheid (nl-BE).
- Mobiele app / PWA.

## Dwarsdoorsnijdend (elke fase)
- Tests (Vitest + Playwright), typecheck, Lighthouse/CWV-budget in CI.
- Observability (Sentry), analytics, AVG-naleving.
- Documentatie per feature bijwerken.

---

### Open beslissingen vóór bouw (fase 0)
1. **Merknaam** — "Loodgieterplatform.nl" of "LoodgieterDirect" (uit het design)?
2. **Monetisatie** — start met **credits per lead** (voorstel) — akkoord?
3. **Hosting** — **Vercel + Cloudflare** (voorstel) — akkoord?
4. **Auth** — **Auth.js + Prisma** (voorstel) — akkoord?
5. **Start** — beginnen we met **Fase 0 (fundering)** zodra dit is goedgekeurd?
