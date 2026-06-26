# 01 — Architectuur & Tech Stack

## 1. Visie & positionering

Een tweezijdige marketplace:

- **Vraagzijde** — huiseigenaren met een klus (cv-ketel, lekkage, badkamer…).
  Ze vinden ons via Google (programmatic SEO) en doen een gratis aanvraag.
- **Aanbodzijde** — gecertificeerde bouwbedrijven/bouwbedrijven. Ze ontvangen
  leads in hun werkgebied, kopen die met credits, en plannen de klus in.

Het platform verdient aan de aanbodzijde (credits per lead, later abonnementen).
De groeimotor is **SEO**: elke dienst × elke gemeente = een unieke pagina die
organisch verkeer trekt. Dat is de structurele voorsprong op concurrenten.

## 2. Architectuurprincipes

1. **Content is data.** Geen enkele dienst- of stadpagina is hardgecodeerd.
   Pagina's worden gegenereerd uit `Service`, `Municipality` en CMS-content.
2. **Domain Driven Design.** Het systeem is opgedeeld in *bounded contexts*
   (zie §4) met heldere grenzen en eigen taal.
3. **Feature-based.** Code is geordend per feature/domein, niet per technische
   laag. Een feature bevat z'n eigen UI, server-logica, validatie en types.
4. **Server-first.** React Server Components als standaard; client-componenten
   alleen waar interactie nodig is (formulieren, dashboards).
5. **Type-safe end-to-end.** TypeScript + Zod + Prisma. Eén bron van waarheid
   voor types, van database tot formulier.
6. **Schaalbaar door isolatie.** Caching (Redis), ISR en queue-based werk zorgen
   dat 100.000 pagina's en piekverkeer geen herontwerp vragen.

## 3. Tech stack — keuzes & afwegingen

De gevraagde stack bevat een paar overlappende tools. Als architect kies en
verantwoord ik per laag één primaire oplossing:

| Laag | Keuze | Toelichting / afweging |
|------|-------|------------------------|
| **Framework** | Next.js 15 (App Router) + React 19 | SSR/ISR/Server Components — ideaal voor programmatic SEO. |
| **Taal** | TypeScript (strict) | — |
| **Database** | PostgreSQL via **Supabase** | Managed Postgres + Storage + Realtime + Auth-bouwstenen. |
| **ORM** | **Prisma** | Schema-as-code, migraties, type-safe queries. Praat met de Supabase-Postgres via de pooled connection (PgBouncer). |
| **Auth** | **Auth.js (NextAuth v5)** + Prisma-adapter | *Beslissing:* één identiteitslaag over alle rollen (huiseigenaar, vakman, admin), niet afhankelijk van Supabase-RLS. Supabase gebruiken we puur als Postgres + Storage. Autorisatie in de app-laag (zie §5). Alternatief = Supabase Auth; afgeraden i.v.m. RLS-complexiteit met een ORM. |
| **UI-kit** | **shadcn/ui** (Radix) + TailwindCSS v4 | Toegankelijk, eigenaarschap over de code, perfect voor een design system. |
| **Animatie** | Framer Motion | Micro-interacties, page transitions. |
| **State/data-fetching** | Server Components + **TanStack Query** (client) | Query voor dashboard-interactie; server components voor content. |
| **Forms** | React Hook Form + **Zod** | Zelfde Zod-schema's server- én client-side. |
| **Caching / rate-limit / queues** | **Redis (Upstash)** | Sitemap-cache, lead-distributie-locks, rate limiting, lichte job-queue. |
| **Betalingen** | **Stripe** | Credit-top-ups (wallet) nu; abonnementen later. |
| **E-mail** | **Resend** + React Email | Transactioneel (leadmelding, bevestiging, review-uitnodiging). |
| **Uploads** | **UploadThing** (klusfoto's) + Supabase Storage (overig) | UploadThing voor gebruikersuploads; Storage/CDN voor redactionele beelden. |
| **Kaarten** | **Mapbox** (werkgebied-visualisatie) + **Google Places** (adres-autocomplete) | — |
| **AI** (later) | OpenAI API | Offerte-schrijver, fotoanalyse — fase 3. |
| **Edge/CDN/WAF** | **Cloudflare** (DNS, WAF, Turnstile, R2) vóór **Vercel** (hosting) | *Beslissing:* Vercel host Next.js 15 (beste ISR/SSR-support); Cloudflare voor DNS, bot-bescherming en R2-opslag. Alternatief = Cloudflare Pages (OpenNext); afgeraden voor v1 i.v.m. ISR-complexiteit. |
| **Observability** | Sentry + Vercel Analytics + Vercel Speed Insights | Errors + Core Web Vitals monitoren. |

> **Migratie-noot:** de eerdere Firebase-fundering (Firestore/Resend) wordt
> vervangen door deze stack. Het lead-*concept* blijft; de opslag verhuist naar
> Postgres/Prisma. De map met Firebase-code wordt opgeruimd zodra v1 start.

## 4. Bounded contexts (DDD)

Voor v1 actief (motor), met groeiruimte:

| Context | Verantwoordelijkheid | v1 |
|---------|----------------------|----|
| **Identity & Access** | Gebruikers, rollen, sessies, vakmanbedrijven, teamleden | ✅ |
| **Catalog** | Diensten, categorieën, merken (Intergas, Remeha…) | ✅ |
| **Geo** | Provincies, gemeenten, woonplaatsen, werkgebieden | ✅ |
| **SEO/Content** | Programmatic pagina's, overrides, FAQ, artikelen, meta, redirects | ✅ |
| **Marketplace/Leads** | Aanvragen, matching, distributie, credits-aankoop | ✅ |
| **Billing** | Wallet, credit-transacties, Stripe top-ups (abonnementen later) | ◑ (basis) |
| **Reviews** | Beoordelingen per bedrijf, moderatie | ◑ (basis) |
| **Installer Workspace** | Offertes, opdrachten, agenda, statistieken | ◑ (lead→plannen + stats) |
| **AI Services** | Offerte-schrijver, fotoanalyse | ✖ later |
| **Notifications** | E-mail + in-app meldingen | ✅ (e-mail) |

✅ volledig · ◑ basis in v1 · ✖ later

## 5. Autorisatiemodel

Rollen: `HOMEOWNER`, `INSTALLER` (met bedrijfsrol `OWNER`/`MEMBER`), `ADMIN`.

- **Middleware** beschermt `/(dashboard)` (alleen INSTALLER) en `/admin` (alleen ADMIN).
- **Server-side guards** (`requireRole()` helper) in elke server action/route handler.
- **Data-scoping**: een vakman ziet uitsluitend leads/offertes van het eigen
  `companyId`. Dit wordt centraal afgedwongen in de query-laag (`features/*/server`).
- Audit-trail van gevoelige admin-acties (`AuditLog`).

## 6. Infrastructuur & deployment

```
Bezoeker
   │
Cloudflare (DNS · WAF · Turnstile · R2)
   │
Vercel (Next.js 15 — SSR/ISR/Server Actions · Edge voor static)
   ├── Supabase Postgres (Prisma)   ← bron van waarheid
   ├── Upstash Redis                ← cache · rate limit · locks · queue
   ├── Supabase Storage / R2        ← media
   ├── Stripe · Resend · UploadThing · Mapbox · Google · (OpenAI later)
```

- **Omgevingen:** `production`, `preview` (per PR), `development` (lokaal).
- **CI/CD:** GitHub Actions (lint, typecheck, test, `prisma migrate`) → Vercel deploy.
- **Migraties:** Prisma Migrate; nooit handmatig op productie.
- **Secrets:** Vercel/Cloudflare env vars; nooit in de repo.

## 7. Performance & Core Web Vitals

- Server Components + streaming; minimale client-JS.
- `next/image` + Cloudflare-image-resizing; moderne formats (AVIF/WebP).
- ISR voor alle programmatic pagina's; Redis-cache voor sitemaps & aggregaties.
- Fonts via `next/font` (geen layout shift); design tokens (zie doc 08).
- Doel: LCP < 2,0s, INP < 200ms, CLS < 0,1 op de SEO-pagina's.

## 8. Security & AVG/GDPR

- HTTPS-only, security headers (CSP, HSTS), Cloudflare WAF + Turnstile op formulieren.
- Rate limiting op aanvraag- en auth-endpoints (Redis).
- Persoonsgegevens van huiseigenaren: minimaal opslaan, doelbinding,
  bewaartermijnen, verwijderverzoeken (AVG). Verwerkersovereenkomsten met
  sub-verwerkers (Supabase, Stripe, Resend, Vercel, Cloudflare).
- Toestemming/cookies: consent-banner + categorieën; analytics pas na consent.
- Wachtwoorden via Auth.js (bcrypt/argon) of magic-link; nooit plain opgeslagen.
