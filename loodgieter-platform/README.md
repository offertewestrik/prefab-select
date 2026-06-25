# Loodgieterplatform.nl

Installatie- & loodgieters-marketplace. Monorepo (Turborepo + pnpm).

> **Status:** Fase 0 — fundering. Zie [`docs/`](./docs/README.md) voor de
> volledige architectuur en [`docs/09-roadmap-fasering.md`](./docs/09-roadmap-fasering.md)
> voor de planning.

## Structuur

```
apps/web        Next.js 15 applicatie (publiek, dashboard, admin)
packages/db     Prisma schema + client + seeds (diensten, gemeenten)
packages/ui     design system (shadcn-stijl + tokens)
packages/config design tokens, tailwind-thema, gedeelde tsconfig
packages/core   merkconfig, enums, Zod-schema's, slug-helpers
packages/seo    URL-builders + JSON-LD (structured data)
packages/emails React Email templates
```

## Aan de slag (lokaal)

Vereist: Node 20+, pnpm 9+, en een Supabase/PostgreSQL-database.

```bash
# 1. dependencies
pnpm install

# 2. omgevingsvariabelen
cp .env.example .env                     # vul DATABASE_URL + DIRECT_URL in
cp .env.example apps/web/.env.local      # vul de app-keys in

# 3. database opzetten
pnpm db:generate                         # Prisma client genereren
pnpm db:migrate                          # tabellen aanmaken
pnpm db:seed                             # diensten + gemeenten inladen

# 4. ontwikkelen
pnpm dev                                 # http://localhost:3000
```

Handige commando's:

| Commando | Doel |
|----------|------|
| `pnpm dev` | alle apps in dev-modus |
| `pnpm build` | productie-build |
| `pnpm typecheck` | TypeScript controleren |
| `pnpm db:studio` | Prisma Studio (database-UI) |
| `pnpm db:seed` | seeds (her)inladen — idempotent |

## Wat zit er in Fase 0

- Monorepo + gedeelde packages.
- Volledig Prisma-datamodel (alle domeinen, zie `docs/03`).
- Seeds: diensten/categorieën/merken + startset gemeenten (volledige
  gemeente-import volgt via `packages/db/seed/import-gemeenten.ts`).
- Design tokens + Tailwind-thema + basis-UI (Button, Card).
- Auth.js (rollen: HOMEOWNER / INSTALLER / ADMIN) + rol-gebaseerde middleware.
- Werkende start-homepage.

Volgende fase: de programmatic-SEO-motor (dienst-, stad- en combinatiepagina's).
