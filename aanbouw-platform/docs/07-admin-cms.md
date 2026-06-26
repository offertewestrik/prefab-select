# 07 — Admin / CMS  (pijler 5)

Voor rol `ADMIN`. Dé bedieningsplek van de motor: hier beheer je diensten,
steden en SEO-content — en daarmee genereren zich automatisch duizenden pagina's.

## Navigatie & modules

| Route | Module | Inhoud (v1) |
|-------|--------|-------------|
| `/admin` | **Overzicht** | KPI's: leads (vandaag/week), omzet (credits), nieuwe vakmannen, top-pagina's, indexeringsstatus |
| `/admin/diensten` | **Diensten** | CRUD `Service`: naam, slug, categorie, teksten (rich), prijsindicatie, merken, FAQ, gerelateerde diensten, SEO-velden, publiceren/verbergen |
| `/admin/diensten/categorieen` | **Categorieën** | Boomstructuur `ServiceCategory` |
| `/admin/merken` | **Merken** | `Brand` (Intergas, Remeha…) + koppeling aan diensten |
| `/admin/steden` | **Steden** | Alle gemeenten (geseed). Per gemeente (de)activeren, content/intro, SEO-velden, inwoneraantal |
| `/admin/landingpages` | **Landingpages** | Overrides voor specifieke dienst×stad-combinaties (`LandingContent`): unieke tekst, FAQ, noindex |
| `/admin/content` | **Kennisbank/Blog** | CRUD `Article`, categorieën, auteurs, tags, planning |
| `/admin/paginas` | **Pagina's** | Blokken-gebaseerde CMS-pagina's (over-ons, voor-vakmannen) |
| `/admin/seo` | **SEO Manager** | `SeoMeta`-overrides, `Redirect`-beheer, sitemap-status, robots, "ververs pagina" (ISR) |
| `/admin/leads` | **Lead-beheer** | Alle leads, status, distributie, handmatig toewijzen, spam-markeren, prijs per dienst |
| `/admin/vakmannen` | **Vakmannen** | Bedrijven goedkeuren/schorsen, credits/correcties, certificeringen, werkgebied |
| `/admin/gebruikers` | **Gebruikers** | Alle users + rollen |
| `/admin/facturen` | **Facturen** | Credit-aankopen, BTW-export |
| `/admin/instellingen` | **Instellingen** | Prijsregels, e-mailtemplates, integraties (keys), feature flags |

## De generators (kern van de motor)

In plaats van losse "genereer-knoppen" werkt het **declaratief**: content =
data. Een wijziging triggert automatisch de juiste pagina's.

- **Dienst toevoegen/wijzigen** → `revalidateTag('service:'+slug)` +
  `revalidatePath` voor de dienstpagina én alle `/[service]/[city]`-combinaties
  van die dienst + sitemap-cache invalideren.
- **Stad (de)activeren** → idem voor alle combinaties van die stad.
- **Bulk-acties**: meerdere gemeenten tegelijk activeren, diensten in bulk
  publiceren, CSV-import van prijsindicaties.
- **Preview** van elke gegenereerde pagina vóór publicatie.

## SEO Manager (detail)

- Per URL/entiteit: title, meta-description, canonical, OG-image, `noindex`.
- Redirect-beheer (301/302) met validatie op loops.
- Sitemap-overzicht: aantal URL's per deel-sitemap, laatste generatie, handmatig
  verversen.
- Indexeringsstatus per pagina (later gekoppeld aan Google Search Console).
- Interne-link-controle: detecteer wees-pagina's (geen inkomende links).

## Lead-beheer (detail)

- Filters op dienst, gemeente, status, periode.
- Handmatige distributie wanneer automatische matching geen dekking vond.
- Prijs per dienst instellen (voedt `priceCredits`).
- Spam/fraude markeren → uitsluiten van facturatie.

## Veiligheid

- Alleen `ADMIN`; alle muterende acties via server actions met Zod + `requireRole`.
- **AuditLog** op elke gevoelige wijziging (wie, wat, diff, wanneer).
- Soft-delete waar mogelijk (status `HIDDEN`/`ARCHIVED`) i.p.v. hard delete —
  beschermt SEO-historie en is omkeerbaar.
