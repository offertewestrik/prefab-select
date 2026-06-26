# 02 — Mappenstructuur

Monorepo (Turborepo + pnpm). Eén app, gedeelde packages voor herbruikbaarheid.
Zo blijft de design-library, het datamodel en de SEO-motor netjes gescheiden van
de app-logica — en kunnen we later een tweede app (bv. mobiel/admin-only)
toevoegen zonder herstructurering.

```
aannemer-platform/
├── apps/
│   └── web/                         # de Next.js 15 applicatie
├── packages/
│   ├── db/                          # Prisma schema + client + seeds
│   ├── ui/                          # design system (shadcn-based componenten)
│   ├── config/                      # tailwind preset, design tokens, eslint, tsconfig
│   ├── core/                        # gedeelde domeinlogica, types, Zod-schema's
│   ├── seo/                         # programmatic-SEO-motor (JSON-LD, sitemaps, linkgraph)
│   └── emails/                      # React Email templates
├── docs/                            # deze architectuur
├── turbo.json
├── pnpm-workspace.yaml
└── package.json
```

## apps/web

Feature-based binnen de App Router. Route-groepen scheiden de drie werelden
(publiek / dashboard / admin) met elk een eigen layout.

```
apps/web/src/
├── app/
│   ├── (marketing)/                 # publieke SEO-site (eigen layout, header/footer)
│   │   ├── page.tsx                 # home
│   │   ├── diensten/
│   │   │   ├── page.tsx             # overzicht alle diensten
│   │   │   └── [service]/page.tsx   # dienst-mini-website
│   │   ├── steden/
│   │   │   ├── page.tsx             # overzicht steden/regio's
│   │   │   └── [city]/page.tsx      # stadpagina
│   │   ├── [service]/[city]/page.tsx# ⭐ combinatie-pagina (de SEO-money-pages)
│   │   ├── merken/[brand]/page.tsx  # merkpagina (Intergas, Remeha…) — fase 2
│   │   ├── kennisbank/...           # CMS-artikelen — fase 2
│   │   ├── reviews/page.tsx
│   │   ├── voor-vakmannen/page.tsx
│   │   ├── over-ons/page.tsx
│   │   └── contact/page.tsx
│   ├── (request)/                   # de aanvraag-wizard (eigen minimale layout)
│   │   ├── aanvraag/page.tsx
│   │   └── bedankt/page.tsx
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── registreren/page.tsx     # vakman-registratie
│   │   └── wachtwoord-vergeten/page.tsx
│   ├── (dashboard)/                 # vakman-dashboard (rol: INSTALLER)
│   │   └── dashboard/
│   │       ├── page.tsx             # overzicht (KPI's)
│   │       ├── leads/...            # nieuwe leads + detail + kopen
│   │       ├── opdrachten/...       # gekochte/geaccepteerde klussen + inplannen
│   │       ├── offertes/...
│   │       ├── agenda/page.tsx
│   │       ├── reviews/page.tsx
│   │       ├── statistieken/page.tsx
│   │       ├── werkgebied/page.tsx
│   │       ├── credits/page.tsx     # saldo + opwaarderen (Stripe)
│   │       └── instellingen/...
│   ├── admin/                       # admin/CMS (rol: ADMIN)
│   │   ├── page.tsx
│   │   ├── diensten/...             # CRUD diensten + categorieën + merken
│   │   ├── steden/...               # gemeenten beheren / activeren
│   │   ├── content/...              # artikelen/kennisbank
│   │   ├── landingpages/...         # overrides voor dienst×stad-pagina's
│   │   ├── seo/...                  # meta, redirects, sitemap-status
│   │   ├── leads/...                # alle leads + distributie
│   │   ├── vakmannen/...            # bedrijven goedkeuren/beheren
│   │   ├── gebruikers/...
│   │   ├── facturen/...
│   │   └── instellingen/...
│   ├── api/                         # route handlers (webhooks, og-image, uploads)
│   │   ├── webhooks/stripe/route.ts
│   │   ├── og/route.tsx             # dynamische OpenGraph-afbeeldingen
│   │   └── uploadthing/route.ts
│   ├── sitemap.xml/route.ts         # sitemap-index
│   ├── sitemaps/[segment]/route.ts  # deel-sitemaps (diensten, steden, combos, content)
│   ├── robots.ts
│   ├── layout.tsx                   # root layout (fonts, providers)
│   └── not-found.tsx
│
├── features/                        # ⭐ feature-based domeinmodules
│   ├── catalog/                     # diensten, categorieën, merken
│   │   ├── components/
│   │   ├── server/                  # queries + server actions
│   │   ├── schema.ts                # Zod
│   │   └── types.ts
│   ├── geo/                         # gemeenten, provincies, werkgebieden
│   ├── leads/                       # aanvraag-wizard, matching, distributie
│   ├── installers/                  # bedrijven, onboarding, profiel
│   ├── billing/                     # wallet, credits, Stripe
│   ├── reviews/
│   ├── content/                     # CMS, artikelen, landingpage-overrides
│   ├── seo/                         # metadata-builders, breadcrumbs (gebruikt packages/seo)
│   ├── dashboard/                   # dashboard-widgets, KPI's
│   ├── admin/                       # admin-tabellen, generators
│   └── auth/
│
├── components/                      # app-brede shared UI (composities van packages/ui)
├── lib/                             # infra-clients & helpers
│   ├── prisma.ts  redis.ts  stripe.ts  resend.ts  auth.ts
│   ├── maps.ts    uploadthing.ts    ratelimit.ts
│   └── utils.ts
├── hooks/
├── middleware.ts                    # rol-gebaseerde toegang + redirects
└── styles/globals.css
```

## Conventies per feature

Elke feature is zelfstandig en volgt hetzelfde patroon:

```
features/<naam>/
├── components/        # React-componenten van deze feature
├── server/
│   ├── queries.ts     # lees-queries (Prisma), altijd ge-scoped op rol/company
│   ├── actions.ts     # server actions (mutaties) met Zod-validatie + authz
│   └── service.ts     # domeinlogica (bv. lead-matching, prijsberekening)
├── schema.ts          # Zod-schema's (gedeeld client/server)
├── types.ts
└── index.ts           # publieke API van de feature (barrel)
```

**Regel:** features importeren elkaar alleen via hun `index.ts`. Gedeelde
primitieven gaan naar `packages/core`. UI-primitives naar `packages/ui`.
Zo blijven de grenzen tussen contexts hard en blijft alles herbruikbaar.

## packages

- **db** — `schema.prisma`, gegenereerde client, `seed/` (diensten, gemeenten,
  merken). Eén export: `@repo/db`.
- **ui** — atomen → moleculen → organismen op basis van shadcn/ui + tokens.
  Eén export: `@repo/ui`. Storybook (later) voor visuele review.
- **config** — `tailwind-preset.ts`, `tokens.ts` (design tokens, doc 08),
  gedeelde `tsconfig`/`eslint`.
- **core** — domeintypes, enums, Zod-schema's, pure helpers (geen I/O).
- **seo** — JSON-LD-builders, sitemap-generatie, interne-link-graaf,
  metadata-helpers, slug-utilities.
- **emails** — React Email templates (leadmelding, bevestiging, review-invite).
