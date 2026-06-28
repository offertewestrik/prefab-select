# La Vigor — website

Premium, bilingual (English + Arabic / RTL) marketing site and interactive
online menu for **La Vigor**, a modern coffee & donut café in Irbid, Jordan.

Built with **Next.js 15** (App Router, static export), **Tailwind CSS v4**,
**Framer Motion** and **lucide-react** — the same stack as the other demo sites
in this repo, dialled up a level: 3D tilt product cards, parallax spotlight,
animated stat counters, a masonry gallery with lightbox, scroll-spy menu and a
live QR menu code.

## Develop

```bash
cd la-vigor
npm install
npm run dev      # http://localhost:3000
```

## Build (static export)

```bash
npm run build    # outputs static site to ./out
```

On GitHub Pages it is served under `/<repo>/la-vigor/`; the base path is set via
`NEXT_PUBLIC_BASE_PATH` in the Pages workflow.

## Where to change content

Everything a non-developer needs lives in a few files:

| What | File |
| --- | --- |
| Phone, WhatsApp, hours, address, map, social links | `lib/site.ts` |
| Menu categories, items, **prices**, currency | `lib/menu.ts` |
| All UI text (EN/AR), placeholder reviews | `lib/i18n.ts` |
| Photos | drop files into `public/` — see `public/PHOTOS.md` |

Prices are intentionally blank until confirmed — fill the `price` field in
`lib/menu.ts` and the price chip appears automatically.

### Runtime config (optional env vars)

Override without touching source (e.g. on the host):

- `NEXT_PUBLIC_SITE_URL` — final domain, used by the QR code & sitemap
  (default `https://lavigor.com`)
- `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_OPENING_HOURS`

## Pages

- `/` — homepage (hero, highlights, stats, why, signature, menu preview,
  gallery, reviews, location, QR CTA)
- `/menu` — full interactive menu with sticky category nav & scroll-spy
- `/qr` — staff page to download/print the table QR code (not indexed)

## Before launch — confirm with the client

- [ ] Prices
- [ ] Current opening hours & primary phone number
- [ ] Permission to use Google Maps / Instagram / Facebook photos
- [ ] Final domain → set `NEXT_PUBLIC_SITE_URL`
