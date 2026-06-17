# Westrik Bouw & Installaties — Premium Website

Een **volledig zelfstandige** (static) premium website voor Westrik Bouw & Installaties.
Volledig losstaand van de PrefabSelect-applicatie in deze repository — geen gedeelde code,
geen build-stap, geen dependencies. Open `index.html` en het werkt.

## 🎨 Huisstijl

| Rol | Kleur | Hex |
| :-- | :-- | :-- |
| Diep zwart | navigatie, footer, premium secties | `#111111` |
| Westrik oranje | offerte-/bel-knoppen, CTA's, hover | `#FF6B00` |
| Technisch blauw | vertrouwen, certificeringen, iconen | `#005BFF` |
| Lichtgrijs | lichte secties | `#F5F5F5` |
| Donkergrijs | accenten | `#2A2A2A` |
| Wit | tekst/vlakken | `#FFFFFF` |

Visuele stijl: donkere premium uitstraling, glassmorphism, scroll-reveal, hover-animaties,
pulserende spoedbalk, strakke typografie.

## 📁 Structuur

```
westrik/
├── index.html            # De volledige one-page website
├── site.webmanifest      # PWA / app-icoon manifest
├── css/styles.css        # Volledig design system (geen frameworks)
├── js/main.js            # Interacties (scroll-reveal, tellers, FAQ, menu, formulier)
└── assets/
    ├── logo-light.svg    # Logo voor donkere achtergrond
    ├── logo-dark.svg     # Logo voor lichte achtergrond
    ├── icon.svg          # Merk/app-icoon (512px)
    ├── favicon.svg       # Favicon
    ├── og-image.svg      # Social media deelafbeelding (1200×630)
    ├── hero-poster.svg   # Fallback-poster achter de hero-video
    └── photos/           # >>> HIER JE EIGEN FOTO'S NEERZETTEN <<<
        ├── hero.mp4       (optioneel) full-width hero-video
        ├── cv-ketel.svg   placeholder — vervang door cv-ketel.jpg
        ├── badkamer.svg   placeholder — vervang door badkamer.jpg
        ├── zinkwerk.svg   placeholder — vervang door zinkwerk.jpg
        ├── loodgieter.svg placeholder — vervang door loodgieter.jpg
        └── team.svg       placeholder — vervang door team/busfoto
```

## 🖼️ Eigen foto's toevoegen

De service- en sfeerbeelden zijn nu nette **placeholders**. Vervangen is 1-op-1:

1. Zet je foto's in `assets/photos/` met dezelfde bestandsnaam (bijv. `badkamer.jpg`).
2. **Hero-video:** plaats `assets/photos/hero.mp4` (monteur bij cv-ketel, badkamer, zinkwerk op dak).
   Zonder video toont de hero automatisch de premium poster-fallback.
3. Aanbevolen formaten: foto's ≥ 1200×800px (JPG/WEBP), video 1920×1080 (MP4, H.264, ≤ 8 MB).

## 🚀 Bekijken / hosten

Lokaal bekijken (vanuit de `westrik/` map):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Hosten: upload de inhoud van `westrik/` naar elke statische host
(Cloud Run static, Netlify, Vercel, of de huidige webhosting) op het domein
`westrik-installaties.nl` / `westrikbouw-installaties.nl`.

## 📞 Bedrijfsgegevens (verwerkt in de site)

- **Westrik Bouw & Installaties** — Prins Mauritslaan 7, 6571 CT Berg en Dal (Gelderland)
- Telefoon / WhatsApp: **06 44 68 53 70**
- E-mail: **info@westrik-installaties.nl**
- KvK: **96002913** · VCA/VOL + CO-vakmanschap gecertificeerd · Reg. 10541 (Kenteq)
- Beoordeling: 5,0 uit 64 Google-reviews

> Het offerteformulier opent standaard het mailprogramma van de bezoeker
> (`mailto:`) zodat het zonder backend werkt. Wil je een echte form-verzending
> (bijv. via Formspree, Resend of een eigen endpoint)? Dat is eenvoudig in te
> bouwen in `js/main.js`.
