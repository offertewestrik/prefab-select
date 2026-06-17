# Meridian Crowne — Luxury Law Firm Website (Dubai)

An ultra-luxury, award-quality marketing site for a fictitious premier Dubai
law firm, **Meridian Crowne — Advocates & Legal Consultants**. Built as a
self-contained static site: no build step, no framework, deploy anywhere.

> Brand, statistics, partners, testimonials, contact details and licensing
> text are **placeholders** for demonstration. Replace them with real,
> verifiable information before going live (see _Customisation_ — claims like
> "95% success rate" and bar/registration statements have regulatory
> implications in the UAE).

---

## Design language

- **Palette:** Deep Black `#050505`, Gold `#D4AF37`, Champagne, Dark Graphite,
  Ivory `#F6F1E7`. No bright colours, no generic legal blue.
- **Type:** Cormorant Garamond (display serif) + Jost (sans). Noto Kufi Arabic
  for RTL. All with system fallbacks if Google Fonts is blocked.
- **Mood:** private bank × global investment house × Fortune-500 legal practice
  × Dubai family office.

## Features

| Area | What's included |
|------|-----------------|
| **Cinematic hero** | Three.js animated Dubai skyline at night — twinkling tower windows, floating gold particles, light beams, reflective ground, slow dolly + mouse/scroll parallax. Degrades gracefully (CSS veil + grid) if the CDN is unavailable. |
| **Animations** | Scroll reveals, staggered hero line wipes, 3D tilt on practice cards, animated counters, glass-morphism, gold shimmer on buttons. |
| **Trust / stats** | Five animated counters that run when scrolled into view. |
| **Practice areas** | 14 interactive cards, each with a custom line icon + hover/tilt. |
| **Global reach** | Capability timeline (UAE Courts, DIFC, ADGM, arbitration…) + an animated SVG "reach" map with city hubs. |
| **People** | Partner portraits with grayscale→colour hover and expanding bios, tags, languages, LinkedIn. |
| **Client experience** | Auto-playing testimonial slider with dots + arrows. |
| **Insights** | Three-card legal journal grid. |
| **Consultation** | Full form (name, email, phone, company, matter, message, preferred method) with a styled success state. |
| **AI Legal Concierge** | Floating pill → chat panel with typing indicator, quick-reply chips and a keyword knowledge base (business setup, Golden Visa, family, criminal, arbitration, fees, booking…). Client-side only; wire to a real LLM for production (see below). |
| **Multilingual** | English · Arabic · Russian · French · Chinese, switch instantly, full **RTL** for Arabic. |
| **Conversion** | Sticky mobile CTA bar, floating WhatsApp + call, exit-intent popup, Google-Maps embed in the footer. |
| **SEO** | Target-keyword title/description/keywords, canonical, Open Graph, and `LegalService` JSON-LD structured data. |

## Run locally

It's pure static files. Any static server works:

```bash
cd law-firm-dubai
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy

Upload the `law-firm-dubai/` folder to any static host — Netlify, Vercel,
Cloudflare Pages, Firebase Hosting, S3/CloudFront, or GitHub Pages. No build
command; publish directory is the folder itself.

## File structure

```
law-firm-dubai/
├── index.html              # all markup + SEO/meta + JSON-LD
└── assets/
    ├── css/styles.css      # full design system
    └── js/
        ├── i18n.js         # 5-language dictionary + apply()
        ├── data.js         # practice areas, partners, insights + rendering
        ├── scene.js        # Three.js hero (skyline, particles, beams)
        └── main.js         # nav, counters, reveals, slider, AI, forms, exit-intent
```

## Customisation

- **Brand / phone / email / address:** search `Meridian Crowne`,
  `+971 4 000 0000`, `counsel@meridiancrowne.ae`, and the DIFC address in
  `index.html`.
- **WhatsApp / call:** update the `wa.me/97140000000` and `tel:` links.
- **Partner photos & article images:** `assets/js/data.js` (`img` fields).
  Each image sits over a gold gradient, so a failed/blocked image still looks
  intentional — swap in licensed photography of the real team.
- **Stats:** edit the `data-count` attributes in `index.html`.
- **Languages / copy:** `assets/js/i18n.js`. Practice-area names and partner
  bios are currently English across all locales — translate the arrays in
  `data.js` if you need them localised too.
- **Booking:** the CTAs point to `#contact`. Swap to a Calendly URL to enable
  real scheduling.
- **Form + AI concierge** are front-end only. For production, post the form to
  your backend/CRM and connect the concierge to a real model
  (e.g. the Claude API) with appropriate legal disclaimers.

## Notes & responsibilities

- Three.js is loaded from a CDN (`unpkg`). For an air-gapped/offline build,
  vendor `three.min.js` locally and update the `<script>` tag.
- Marketing claims and statements about court rights/registration must be
  accurate and compliant with **UAE / Dubai Legal Affairs Department** and
  DIFC/ADGM advertising rules before publishing.
