# Media assets — download & drop in

All AI-generated media was created with Higgsfield. The files live on
Higgsfield's CDN, which is **gated to your authenticated Higgsfield account**
(public/anonymous requests get HTTP 403), so they must be downloaded from your
account and committed here to be self-hosted on the live site.

The website already points at these **local paths** — once each file exists,
it is served by Next.js and works for every visitor. Until then the site shows
tasteful gradient/animated fallbacks (no broken images).

## What to save where

| Save as (inside `aqua-flow/public/`) | Higgsfield source file |
| --- | --- |
| `videos/hero.mp4`        | hf_20260617_152815_463da484-1606-4a53-ab26-4ad1e41e4baa.mp4 |
| `videos/hero-poster.png` | hf_20260617_152224_0ffe831b-e14f-40c2-b9af-0f80f55cb9b4.png |
| `videos/process.mp4`     | hf_20260617_161040_3cd07e87-dbf4-4a41-8188-e8393209d5fb.mp4 |
| `products/gallon.png`    | hf_20260617_154825_aedffcc8-465c-43e4-9c8e-0cb3d527aadc.png |
| `products/bottles.png`   | hf_20260617_154826_92d3e8ff-676f-401d-b50b-44265edb049d.png |
| `products/delivery.png`  | hf_20260617_154838_80a64c1f-dbd0-4fda-9a05-71ae0fc5513a.png |
| `products/office.png`    | hf_20260617_154839_dee06c64-45c3-4067-8d5f-256857cd3f7e.png |

Base CDN URL (open while logged in to Higgsfield):
`https://d8j0ntlcm91z4.cloudfront.net/user_3EdpNOPjrEuN7grAEkmSnZzolrU/<file>`

The real facility photos (`facility-1.jpg`, `facility-2.jpg`) are already here.

## Alternative

Prefer not to self-host? Set these env vars to any public URL (e.g. your own
CDN / S3 bucket) and the site will use them instead:

```
NEXT_PUBLIC_HERO_VIDEO_URL=
NEXT_PUBLIC_HERO_POSTER_URL=
NEXT_PUBLIC_PROCESS_VIDEO_URL=
```
