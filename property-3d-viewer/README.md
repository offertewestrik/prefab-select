# Droomhuis in Dubai — Luxe 3D Property Viewer

Een premium, interactieve 3D-villaviewer voor high-end Dubai-vastgoed.
Gebouwd met **Next.js (App Router) · React · Three.js · React Three Fiber ·
@react-three/drei · Framer Motion · TypeScript**.

> Geen game-look maar een verfijnde, lichte luxe-uitstraling
> (wit / champagne / goud), in lijn met Sotheby's, Christie's en Emaar.

## Features

- 🏝️ **GLB/GLTF-model laden** — of een ingebouwde procedurele luxe-villa als er nog geen model is.
- 🖱️ **OrbitControls** met demping, langzame auto-rotatie en een limiet zodat je niet onder de grond kijkt.
- 📍 **Gouden pulserende hotspots** op woonkamer, keuken, master suite, badkamer, infinity pool en terras.
- 🛋️ **Klikbare ruimtes** — camera beweegt vloeiend naar de kamer en een glasmorf info-paneel schuift in beeld.
- 🎨 **Materiaalkiezer** — Champagne Stone, White Marble, Warm Wood, Dark Bronze.
- 🌗 **Dag/nacht-modus** — heldere zon & lichtblauwe lucht vs. warme verlichting & donkere skyline.
- 🗺️ **Plattegrond-overlay** — klikbare kamers gekoppeld aan de 3D-hotspots.
- 📸 **Screenshot-knop** — exporteert de huidige view als PNG.
- 📅 **CTA "Plan een bezichtiging"**.
- ⚡ **Performance** — lazy load van het model, Suspense-loader met laadpercentage, `ssr:false`, mobiel responsive met grote knoppen.

## Projectstructuur

```
property-3d-viewer/
├─ app/
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ page.tsx                 # landing → link naar viewer
│  └─ 3d-viewer/page.tsx       # voorbeeldpagina met de viewer
├─ components/
│  ├─ Property3DViewer.tsx     # hoofdcomponent (Canvas, UI, camera-rig)
│  ├─ Villa.tsx                # GLB + procedurele villa
│  ├─ ViewerHotspot.tsx        # pulserende hotspot
│  ├─ MaterialSelector.tsx     # afwerking-swatches
│  ├─ FloorplanOverlay.tsx     # klikbare plattegrond
│  └─ Loader.tsx               # Suspense-fallback met %
├─ data/
│  └─ properties3d.ts          # property, hotspots, materialen, plattegrond
└─ public/
   ├─ models/                  # zet hier villa-dubai.glb
   └─ textures/
```

## Aan de slag

```bash
cd property-3d-viewer
npm install
npm run dev          # http://localhost:3000/3d-viewer
```

Statische export (deploybaar op GitHub Pages of elke host):

```bash
npm run build        # output in ./out
```

Onder een subpad hosten (bv. `/3d`):

```bash
NEXT_PUBLIC_BASE_PATH=/3d npm run build
```

## Eigen model toevoegen

Zie [`public/models/README.md`](public/models/README.md). Kort: drop
`villa-dubai.glb` in `public/models/` en zet `modelUrl` aan in
`data/properties3d.ts`.

## Inhoud aanpassen

Alles draait om `data/properties3d.ts`: naam, locatie, prijs, hotspots
(positie + camerapositie + tekst), materialen en de plattegrond-kamers.
Pas die file aan om een andere woning te tonen.
