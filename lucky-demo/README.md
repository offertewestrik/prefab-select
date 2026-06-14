# Lucky Zonwering — conceptdesign (demo)

Een vernieuwd, modern webdesign voor **Lucky Zonwering** (Oss), bedoeld als
verkoop-/pitchtool. Statische site, geen build of dependencies nodig.

## Bekijken

Open `index.html` rechtstreeks in je browser, of start een mini-server voor
de nette versie:

```bash
cd lucky-demo
python3 -m http.server 8080
# open http://localhost:8080
```

## Inhoud

- `index.html` — homepage: hero, USP-balk, assortiment (rolluiken, screens,
  knikarmschermen, horren, **houten jaloezieën**, binnenzonwering),
  configurator-teaser, "waarom Lucky", reviews, contact.
- `configurator.html` — "Jouw rolluik op maat": productpreview met prijsbadge,
  USP-balk, keuze-kaarten (Rolluik / Solar rolluik), afmetingen, kleurstalen,
  tabs en zwevende zijtabs (Kleurstalen / Gratis inmeetgarantie + 9,5-badge).
  **Visueel** — de prijs rekent bewust nog niet live (fase 2).
- `assets/` — stylesheet, lichte JS en SVG-product­illustraties.

## Belangrijk: echte huisstijl-assets nog inladen

De huidige live site van Lucky (`luckyzonwering.nl`) blokkeert geautomatiseerde
toegang, waardoor het **echte logo en de productfoto's niet vanuit deze
omgeving** konden worden opgehaald. Daarom gebruikt de demo nu:

- een **tijdelijk Lucky-woordmerk** (zon-icoon + "LUCKY Zonwering"), en
- **schone SVG-illustraties** als placeholder voor de producten.

Deze zijn 1-op-1 te vervangen door de echte assets. Lever aan:
`logo-lucky.svg/png`, en productfoto's voor rolluiken, screens,
knikarmschermen, horren, houten jaloezieën en binnenzonwering →
plaatsen in `assets/` en de `src=`/logo verwijzingen omzetten.

## Kleur & stijl

Navy `#143257` (koppen) + groen `#1f9d4d` (CTA) + warm zon-accent `#f7a823`,
met de strakke, conversiegerichte opzet als marktreferentie — vertaald naar
Lucky's sterke punten: 47 jaar, eigen productie, inclusief montage, 9,5 reviews.
