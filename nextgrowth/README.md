# NextGrowth — Digitale Groeisystemen

Marketing-/landingssite voor **NextGrowth**. Gebaseerd op de oorspronkelijke
"AXION"-layout, volledig herbrand naar de NextGrowth-huisstijl. De layout en
animaties (3D-hero, configurator, live dashboards) zijn bewust grotendeels
behouden; alleen kleur, typografie en logo zijn naar de huisstijl verschoven.

> Los project — staat los van de PrefabSelect-code in de rest van deze repo.

## Bekijken

`index.html` is volledig zelfstandig (inline CSS/JS, Three.js via CDN). Open
het bestand direct in de browser, of serveer de map lokaal:

```bash
cd nextgrowth
python3 -m http.server 8000
# → http://localhost:8000
```

## Mappen

| Pad | Inhoud |
| :-- | :-- |
| `index.html` | De volledige landingspagina (NL · EN · AR, met taalwisselaar). |
| `assets/logo.svg` | N+G-monogram op zwarte tegel (favicon / app-icon). |
| `assets/logo-mark.svg` | Knockout-versie (transparant) voor lichte vlakken. |
| `brand/NextGrowthBranding.tsx` | Huisstijl-referentie (React): logo, wordmark, kleuren, positionering. |

## Huisstijl

- **Kleuren** — Goud `#D4AF37` · Highlight `#FFF3C4` · Deep `#B8860B` · Canvas `#060608`
- **Wordmark** — **NEXT** (wit/ink) + **GROWTH** (goud-gradient)
- **Logo** — geometrisch interlocking N + G met tech-node-accenten
- **Fonts** — Sora (display/koppen), Inter (body), Tajawal (Arabisch/RTL)
- **Positionering (vaste volgorde)** — NL · GB · AE · JO → Nederland · Dubai · Jordanië

## Talen

De taalwisselaar (NL / EN / عربى) staat in de navigatiebalk. Arabisch schakelt
automatisch naar RTL. AE en JO delen dezelfde Arabische tekst.

## Nog te doen / ideeën

- Echte teksten, diensten en cases van NextGrowth invullen (nu placeholders).
- Eigen beeldmateriaal i.p.v. de Unsplash-placeholders.
- Contactformulier / boekingslink koppelen aan de CTA-knoppen.
- Eigen domein + analytics.
