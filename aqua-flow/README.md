# النقاء لمياه الشرب — Al Naqaa Drinking Water (Dubai / UAE)

Ultra-clean, fresh & hygienic **Arabic-first (RTL)** marketing site for the
purified-drinking-water brand **النقاء (Al Naqaa)**. The site puts the
**filtration facility and purification process** front and centre — the real
differentiator — instead of generic stock imagery.

> **Positioning:** _مياه نقية .. حياة صحية — "Pure water, healthy life."_
> Language: Arabic (RTL), fonts Cairo + Tajawal.
> Style: white · aqua blue · deep navy · glass effects · water animations.
> Hero video, hero poster and all product images are AI-generated with
> Higgsfield and served from its CDN (env-overridable for self-hosting).

## Tech stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (design tokens in `app/globals.css`)
- **Framer Motion** for scroll & entrance animation
- **Three.js · React Three Fiber · drei** for the interactive 3D purification journey
- shadcn-style UI primitives (`components/ui`)

## Getting started

```bash
cd aqua-flow
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## Sections

1. **Hero** — EN + Arabic headline, CTAs, animated aqua background (drop your
   real footage at `public/videos/hero.mp4`).
2. **Purification Journey** — scroll-driven 3D scene:
   _Droplet → Filtration → UV Purification → Filling the gallon → Delivery._
3. **About** — the production facility & quality-control highlights.
4. **Products** — 19L gallons, bottled water, subscriptions, business supply.
5. **Why us** — five trust reasons.
6. **Order** — order form that sends straight to WhatsApp.
7. **Footer** + floating WhatsApp / Call buttons.

## 📸 Add your real photos & video

The site references the real installation. Replace the placeholders by adding
these files to `public/` (filenames are matched automatically):

| File | Used in |
| --- | --- |
| `public/videos/hero.mp4` | Hero background video |
| `public/videos/hero-poster.jpg` | Hero video poster |
| `public/facility-1.jpg` | About — filtration line |
| `public/facility-2.jpg` | About — UV disinfection |
| `public/facility-3.jpg` | About — gallon filling |

Until they exist, branded placeholders are shown automatically (no errors).

## Configuration

Copy `.env.example` → `.env.local` and set the public contact details:

```env
NEXT_PUBLIC_PHONE_NUMBER="+971500000000"
NEXT_PUBLIC_WHATSAPP_NUMBER="971500000000"
NEXT_PUBLIC_CONTACT_EMAIL="hello@aquaflow.ae"
```
