# Droomhuis in Dubai — luxury real estate (demo)

Een luxe, high-end demosite voor **Joy van den Hurk — Luxury Real Estate
Advisor Dubai** (droomhuisindubai.nl). Volledig statisch: HTML + CSS +
vanilla JS, geen buildstap. In de stijl van topspelers als Sotheby's,
Christie's en Engel & Völkers Dubai.

## Wat er in zit (n.a.v. de videoreview)

1. **Impactvolle hero** — fullscreen Dubai-skyline, Ken Burns-effect,
   kop _"Vind Uw Droomhuis in Dubai"_, twee CTA's en zwevende glass-stat-chips.
2. **Luxe palet** — zwart, donker marmer, champagne-goud, cream en
   glasmorphism met veel contrast (geen Nederlands-wit gevoel meer).
3. **Personal brand "Over Joy"** — grote portretfoto, titel, credentials
   (500+ transacties, Nederlandse begeleiding, investeringsexpert, Palm
   Jumeirah specialist) en handtekening.
4. **Spectaculaire woningkaarten** — grote fullscreen cards, hover-zoom en
   reveal van prijs, ROI, locatie, slaapkamers/badkamers/oppervlakte +
   filterbalk.
5. **Dubai lifestyle / "Waarom Dubai"** — 0% inkomstenbelasting, hoog
   huurrendement, veilige economie, groeiende markt, met count-up-stats.
6. **Interactieve Dubai-kaart** — klikbare wijken (Palm Jumeirah, Marina,
   Downtown, Business Bay, JVC) met prijzen en rendement.
7. **Luxe leadfunnel** — _Gratis Dubai Vastgoed Gids_ met naam/e-mail/telefoon.
8. **Reviews** — automatische marquee met de echte Google-reviews.
9. **Slimme calculators** — huurrendement- én financieringscalculator (live sliders).
10. **SEO** — RealEstateAgent JSON-LD, Open Graph, NL metadata.

## Lokaal bekijken

Open `index.html` direct in de browser, of serveer de map statisch:

```bash
npx serve droomhuis-dubai
```

## Publicatie

Wordt via `.github/workflows/pages-demos.yml` mee gepubliceerd naar GitHub
Pages onder `/droomhuis-dubai/`.

## Aanpassen

- **Woningen, wijken & reviews:** `assets/js/data.js`
- **Vormgeving / kleuren:** CSS-variabelen bovenin `assets/css/styles.css`
- **Interactie (kaart, calculators, forms):** `assets/js/main.js`

> Afbeeldingen zijn placeholders van Unsplash. Vervang ze door eigen
> professionele fotografie (penthouse views, Palm Jumeirah, Burj Khalifa,
> infinity pool, Marina by night) voor het volle luxe-effect. Forms zijn
> demo's zonder backend.
