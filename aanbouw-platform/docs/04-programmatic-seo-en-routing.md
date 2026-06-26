# 04 — Programmatic SEO & Routing  (de motor)

Dit is de groeimotor. Het principe: **content is data**. Uit `Service` (±70) en
`Municipality` (±342) ontstaan automatisch:

- ±70 dienstpagina's — `/diensten/[service]`
- ±342 stadpagina's — `/steden/[city]`
- **±24.000 combinatiepagina's** — `/[service]/[city]` ← het organische goud
- merk- en kennisbankpagina's (fase 2)

Schaalt later naar woonplaatsen (±2.500) → honderdduizenden pagina's, zonder
herontwerp.

## 1. URL-structuur

| Patroon | Voorbeeld | Doel |
|---------|-----------|------|
| `/diensten/[service]` | `/diensten/cv-ketel-vervangen` | dienst-mini-website |
| `/steden/[city]` | `/steden/eindhoven` | alles in één gemeente |
| `/[service]/[city]` | `/cv-ketel-vervangen/eindhoven` | ⭐ money-page (hoogste intentie) |
| `/merken/[brand]` | `/merken/intergas` | merkpagina (fase 2) |
| `/kennisbank/[cat]/[slug]` | `/kennisbank/verwarming/cv-ketel-bijvullen` | artikel (fase 2) |

**Waarom `/[service]/[city]` op root?** Kortst mogelijke, meest klikbare URL —
zoals Werkspot/Slimster. Next.js matcht **statische segmenten vóór dynamische**,
dus `/diensten`, `/steden`, `/dashboard`, `/admin`, `/kennisbank` etc. worden
nooit per ongeluk als `[service]` opgevat. Daarnaast een **reserved-slug-lijst**
in `packages/seo` als extra vangnet. Ongeldige combinaties → `notFound()`.

> Canonical-beleid: de combinatiepagina is canoniek voor "dienst in stad".
> Dienst- en stadpagina's linken ernaartoe; geen duplicate content.

## 2. Generatie & rendering (ISR)

Elke route gebruikt `generateStaticParams` + `generateMetadata` +
**Incremental Static Regeneration**.

```ts
// app/(marketing)/[service]/[city]/page.tsx  (schematisch)
export const dynamicParams = true            // long-tail on-demand renderen
export const revalidate = 86400              // 1× per dag verversen

export async function generateStaticParams() {
  // PRE-RENDER alleen de high-value combinaties bij build:
  // top-diensten × top-gemeenten (bv. 30 × 50 = 1.500 pagina's).
  return await getPriorityServiceCityPairs()
}

export async function generateMetadata({ params }) {
  const data = await getServiceCity(params)   // null → notFound
  return buildServiceCityMetadata(data)        // title, description, canonical, OG, JSON-LD
}

export default async function Page({ params }) {
  const data = await getServiceCity(params)
  if (!data) notFound()
  return <ServiceCityTemplate {...data} />
}
```

**Strategie:**
- **Build-time**: alleen prioriteitspagina's (hoog volume) → snelle builds.
- **On-demand ISR**: de long-tail wordt bij het eerste bezoek gerenderd en
  daarna gecached (`revalidate`). Validatie tegen de DB voorkomt junk-URL's.
- **On-demand revalidation**: admin slaat een dienst/stad/override op →
  `revalidatePath`/`revalidateTag` ververst direct de betreffende pagina's.

## 3. Unieke content per pagina (géén thin/duplicate content)

Het grootste risico bij programmatic SEO is dunne, duplicate content → Google-
penalty. Daarom is elke pagina **data-driven uniek**:

Een `/[service]/[city]`-pagina bevat o.a.:
- Lokale intro: dienst + gemeentenaam + provincie + inwoneraantal.
- **Aantal actieve vakmannen** in die gemeente (live uit DB).
- **Lokale prijsindicatie** uit `Service.priceFrom/To` + evt. regionale factor.
- **Echte lokale reviews** (van bedrijven met dekking in die gemeente).
- **Stad-specifieke FAQ** (generiek sjabloon + gemeentevariabelen, of override).
- **Nabije gemeenten** (geo-afstand) als interne links.
- Optionele **handmatige override** (`LandingContent`) voor toppagina's.

Sjablonen leven in `packages/seo/templates` met variabele-injectie; copy wordt
gevarieerd (meerdere zinsvarianten per blok, deterministisch gekozen op slug) om
herhaling te vermijden.

## 4. JSON-LD / Structured Data

`packages/seo/jsonld` levert getypeerde builders. Per paginatype:

| Pagina | Schema.org |
|--------|-----------|
| Alle | `Organization`, `WebSite` (+ `SearchAction`), `BreadcrumbList` |
| Dienst | `Service` |
| Combinatie dienst×stad | `Service` + `Offer` (prijsindicatie) + `FAQPage` + `AggregateRating` |
| Stad | `BreadcrumbList` + lokale `ItemList` van diensten |
| Vakman-profiel | `HomeAndConstructionBusiness` (LocalBusiness) + `AggregateRating` |
| Artikel | `Article` + `BreadcrumbList` |
| FAQ-blok | `FAQPage` |

Uitgeleverd als `<script type="application/ld+json">` server-side.

## 5. Interne-link-motor

`packages/seo/linkgraph` bouwt deterministisch interne links — cruciaal voor
crawlbaarheid en autoriteit:

- Dienstpagina → zelfde dienst in top-steden, gerelateerde diensten, categorie.
- Stadpagina → alle diensten in die stad, nabije steden, provincie.
- Combinatiepagina → dienst-hub, stad-hub, dienst in nabije steden, gerelateerde
  diensten in dezelfde stad, relevante kennisbank-artikelen.
- **Hub-and-spoke**: categorie- en provincie-hubs bundelen autoriteit.

Alles via één `getInternalLinks(context)` zodat de structuur consistent en
testbaar is.

## 6. Sitemaps (dynamisch, gecached)

Bij tienduizenden URL's: een **sitemap-index** + deel-sitemaps (limiet 50.000
URL's/bestand).

```
/sitemap.xml                 → index, verwijst naar:
/sitemaps/diensten.xml
/sitemaps/steden.xml
/sitemaps/combinaties-1.xml  … -N.xml   (gepagineerd)
/sitemaps/merken.xml
/sitemaps/kennisbank.xml
```

- Gegenereerd door route handlers, **gecached in Redis** (TTL + invalidatie bij
  content-wijziging).
- `lastmod` uit `updatedAt`. `noindex`-pagina's (uit `SeoMeta`/`LandingContent`)
  worden uitgesloten.
- `robots.ts` verwijst naar de index; blokkeert `/dashboard`, `/admin`, `/api`.

## 7. Metadata, OG & canonicals

- `generateMetadata` per route: title-templates, meta-description (uit data of
  `SeoMeta`-override), canonical, `alternates`, OpenGraph + Twitter Cards.
- **Dynamische OG-afbeeldingen** via `/api/og` (`@vercel/og`/satori): dienstnaam
  + stad + prijs-indicatie + merklogo — automatisch, per pagina uniek.
- `hreflang`: `nl-NL` (uitbreidbaar naar `nl-BE` later).

## 8. Redirects & beheer

- `Redirect`-tabel → afgehandeld in `middleware.ts` (301/302), beheerd in admin.
- Bij het hernoemen van een dienst-/stad-slug: automatisch redirect-record + ISR-
  revalidate, zodat oude URL's autoriteit behouden.

## 9. Performance-borging (Core Web Vitals)

- Server Components + streaming; combinatiepagina's vrijwel zonder client-JS.
- `next/image`, AVIF/WebP, vaste afmetingen (geen CLS).
- Boven-de-vouw content server-gerenderd; reviews/kaart lazy.
- Redis-cache voor dure aggregaties (vakman-tellingen, lokale prijzen).

## 10. Meetbaarheid

- Per pagina-template tracken we positie/CTR via Google Search Console-export
  (later koppelbaar in admin → "SEO Manager").
- Admin toont per dienst/stad de indexeringsstatus en aantal interne links.

---

### Samengevat
Eén keer een dienst toevoegen in admin → automatisch: dienstpagina + N
combinatiepagina's + sitemap-update + interne links + JSON-LD. Eén gemeente
activeren → idem. **Dat is de motor.**
