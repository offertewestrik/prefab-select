# Westrik Webshop — CV-ketels, boilers & warmwater

Een premium, standalone webshop voor **Westrik Installaties**: CV-ketels, boilers,
hybride warmtepompen, thermostaten, expansievaten en onderhoudscontracten.

Gebouwd met **Vite + React 19 + TypeScript + Tailwind v4 + motion** en draait
volledig op de dependencies van de repo-root (geen aparte install nodig).

## Draaien

```bash
# vanuit de repo-root één keer dependencies installeren
npm install

# daarna vanuit deze map
cd apps/westrik-webshop
../../node_modules/.bin/vite dev      # dev-server op http://localhost:4000
../../node_modules/.bin/vite build    # productiebuild naar dist/
```

## Wat zit erin

| Onderdeel | Route | Beschrijving |
| :-- | :-- | :-- |
| **Homepage** | `/` | Hero, USP-balk, categorieën, bestsellers, keuzehulp-teaser, reviews, trust badges |
| **Categorie + filters** | `/cv-ketels`, `/boilers`, … | Filteren op merk, CW-klasse, vermogen, inhoud, type, montage, prijs + sorteren |
| **Productpagina** | `/product/:slug` | Galerij met zoom & 360°-label, specs, installatie-opties met live totaalprijs, downloads, reviews, FAQ, gerelateerde producten |
| **Keuzehulp** | `/keuzehulp` | Slimme configurator (woning, bewoners, badkamers, regendouche, bad, hybride) → CW-advies + aanbevolen ketel |
| **Vergelijker** | `/vergelijken` | 2–4 producten naast elkaar op specificaties |
| **Offerte** | `/offerte` | Formulier met foto-uploads (huidige ketel + technische ruimte) |
| **Service/info** | `/over-ons`, `/onderhoud`, `/storingsdienst`, `/zakelijk`, `/installatieservice`, `/faq`, `/contact`, `/blog` | Statische premium contentpagina's |

Conversie-elementen: sticky offerte/WhatsApp/bel-knoppen, reviews-slider en keurmerk-badges.

## Data

Alle producten en categorieën staan in `src/data/`. De catalogus bevat de
A-merken uit de opdracht: **Intergas, Remeha, Vaillant, Nefit Bosch, ATAG**, plus
boilers, hybride warmtepompen, thermostaten, expansievaten en onderhoudscontracten.

## Productfoto's

De shop werkt out-of-the-box met nette merk-illustraties. Echte foto's voeg je toe
via het `imageUrl`/`gallery`-veld in `src/data/products.ts` — zie
`public/products/README.md`. Gebruik alleen beeld waarvoor je rechten hebt
(merk-mediakit of groothandelfeed).

## Offerte naar CRM

Het offerteformulier post naar `VITE_OFFERTE_ENDPOINT` (env). Is die niet gezet,
dan worden aanvragen lokaal bewaard. Het endpoint is voorbereid op koppeling met
Teamleader, HubSpot, Pipedrive of Salesforce.
