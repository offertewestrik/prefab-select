# LoodgieterPlatform — Architectuur

> Het installatie- & loodgietersplatform van Nederland. SaaS-marketplace die
> huiseigenaren koppelt aan gecertificeerde vakmannen, met een
> programmatic-SEO-motor die duizenden pagina's automatisch genereert.

Dit is de **architectuur-documentatie**. Er wordt **nog niet gebouwd** — eerst
review en goedkeuring, daarna fase voor fase implementeren.

## Scope van versie 1 — "de motor"

Op verzoek bouwen we eerst de kern (schaalbaar, niet te breed). Vijf pijlers:

| # | Pijler | Doc |
|---|--------|-----|
| 1 | **Programmatic SEO** — duizenden pagina's automatisch | [04](./04-programmatic-seo-en-routing.md) |
| 2 | **Dynamische dienst- & stadpagina's** | [04](./04-programmatic-seo-en-routing.md) |
| 3 | **Aanvraagflow voor leads** (de 5-staps wizard) | [05](./05-aanvraagflow-en-marketplace.md) |
| 4 | **Dashboard voor vakmannen** | [06](./06-vakman-dashboard.md) |
| 5 | **Admin/CMS** — diensten, steden & SEO-content beheren | [07](./07-admin-cms.md) |

**Later** (na de motor): volledige design-afwerking, AI-suite (offerte-schrijver,
fotoanalyse), configurators, betaalde abonnementen, facturatie voor vakmannen,
mobiele apps. De architectuur houdt hier nadrukkelijk rekening mee.

## Leeswijzer

| Doc | Inhoud |
|-----|--------|
| [01 — Architectuur & stack](./01-architectuur-en-stack.md) | Principes, tech-keuzes (+ afweging van overlappende tools), systeemarchitectuur, infra, AVG/security |
| [02 — Mappenstructuur](./02-mappenstructuur.md) | Monorepo + app-structuur (feature-based / DDD) |
| [03 — Datamodel](./03-datamodel.md) | Volledig Prisma-schema, alle tabellen per domein, seed-strategie |
| [04 — Programmatic SEO & routing](./04-programmatic-seo-en-routing.md) | De motor: route-map, dienst/stad/combinatie-pagina's, ISR, sitemaps, JSON-LD, interne links |
| [05 — Aanvraagflow & marketplace](./05-aanvraagflow-en-marketplace.md) | Lead-wizard, matching/distributie, credits/monetisatie |
| [06 — Vakman-dashboard](./06-vakman-dashboard.md) | Leads, offertes, opdrachten, reviews, werkgebied, credits, statistieken |
| [07 — Admin/CMS](./07-admin-cms.md) | Dienst-, stad- & SEO-beheer, paginagenerator, lead- & vakmanbeheer |
| [08 — Design tokens](./08-design-tokens.md) | Kleuren, typografie, spacing uit het aangeleverde design |
| [09 — Roadmap & fasering](./09-roadmap-fasering.md) | Bouwvolgorde, MVP-definitie, milestones |

## Kernprincipes (samengevat)

- **Modulair & feature-based** — elk domein staat op zichzelf, herbruikbaar.
- **SEO-first** — content is data; pagina's worden uit de database gegenereerd.
- **Dynamisch & data-driven** — geen hardgecodeerde pagina's, alles uit de DB/CMS.
- **Schaalbaar vanaf dag 1** — van 100 naar 100.000 pagina's zonder herbouw.
- **Productie-gereed** — getypeerd (TypeScript + Zod), gevalideerd, getest.
