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

- `index.html` — homepage: hero, USP-balk, **A-merkenbalk** (Luxaflex, Verano,
  Somfy, Brustor), assortiment (rolluiken, screens, knikarmschermen,
  **luifels**, horren, **houten jaloezieën**, binnenzonwering),
  configurator-teaser, "waarom Lucky", **garantie/stalen/keurmerk-band**,
  reviews, contact.
- `configurator.html` — "Jouw rolluik op maat": productpreview met prijsbadge,
  USP-balk, keuze-kaarten (Rolluik / Solar rolluik), afmetingen, kleurstalen,
  tabs en zwevende zijtabs (Kleurstalen / Gratis inmeetgarantie + 9,5-badge).
  **Visueel** — de prijs rekent bewust nog niet live (fase 2).
- `assets/` — stylesheet, lichte JS en SVG-product­illustraties.

## Echte huisstijl-assets verwerkt

De demo gebruikt nu het **echte materiaal van luckyzonwering.nl**:

- **Logo** `Lucky-zonwering-logo-DEF-2.svg` (wit/gradiënt) — in de header op een
  navy-plaat geplaatst (logo is voor donkere achtergrond gemaakt), in de footer
  direct op de donkere achtergrond.
- **Favicon** `Lucky_Zonwering_Favicon_64-64px.png`.
- **Productfoto's** per categorie (rolluiken, screens, knikarm-/uitvalschermen,
  veranda/luifel, markiezen, horren, raamdecoratie).
- **Teksten** en **Google-reviews** (5,0 uit 124) van de officiële kanalen.
- Bron- en gebruiksoverzicht: zie `CONTENT.md`.

> Beeld/teksten zijn eigendom van Lucky Zonwering en uitsluitend bedoeld voor
> deze concept-/pitchdemo.

## Kleur & stijl

Navy `#143257` (koppen) + groen `#1f9d4d` (CTA) + warm zon-accent `#f7a823`,
met de strakke, conversiegerichte opzet als marktreferentie — vertaald naar
Lucky's sterke punten: 47 jaar, familiebedrijf sinds 1975, eigen productie
sinds 1992, inclusief montage, 5,0 op Google (124 reviews).
