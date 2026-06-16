# CLAUDE.md — projectcontext voor Claude Code

> Dit bestand wordt automatisch ingelezen bij de start van elke Claude Code-sessie,
> zodat we altijd meteen weten waar alles staat. Twee dingen wonen in deze repo:
> de **marketing-website** van Prefab Select én het **Agency Command Center**-dashboard.

## Repo in één oogopslag
- **Marketing-site** (React + Vite + Express): bron in `src/`, routes in `src/App.tsx`, server in `server.ts`.
- **Agency Command Center** (het agency-dashboard): volledig in **`src/agency/`**, bereikbaar op **`/agency`**.
  - Gemount via een kleine tak boven in `src/App.tsx` (`if (pathname.startsWith('/agency')) return <AgencyApp/>`).
  - Eigen donkere stijl: `src/agency/agency.css` (scoped onder `.acc-root`).
  - Volledige uitleg + integratiehandleiding: **`AGENCY_DASHBOARD.md`**.

## Het dashboard (waar je meestal bent)
- Code: `src/agency/` — `pages/` (15 pagina's), `components/` (ui, charts, kanban, layout),
  `context/` (Auth + Data), `services/` (firestore, github, metaAds, googleAnalytics, firebaseAdmin, ai),
  `data/mockData.ts`, `types/index.ts`, `lib/` (rbac, format).
- Werkt nu op **mock data** in `localStorage` (geen backend nodig). Login via demo-accounts.
- Echte koppelingen (Firebase, GA4, Meta Ads, GitHub, AI) staan klaar in de service-laag — zie `AGENCY_DASHBOARD.md` §5.

## Commando's
```bash
npm install          # dependencies
npm run dev          # lokaal → http://localhost:3000/agency
npm run build        # productie-build naar dist/
npm run lint         # tsc --noEmit (moet 0 fouten geven)
```

## Live omgeving van het dashboard
- **Live preview-URL:** https://dashboard-72b4b.web.app/agency
- Gehost op een **apart, los Firebase-project** `dashboard-72b4b` (Spark/gratis), losgekoppeld van
  het marketing-project `gen-lang-client-0477752702`. **Nooit** naar dat marketing-project deployen.
- Deploy van het dashboard (statisch, alleen `dist/`):
  ```bash
  npm run build
  npx firebase deploy --only hosting --project dashboard-72b4b --config firebase.preview.json
  ```
  (`firebase.preview.json` = static config met `public: "dist"` + SPA-rewrite; niet vast in repo,
  maak 'm aan bij deploy of zet 'm als script — vraag Claude.)

## Werkafspraken
- Alles van het dashboard hoort in **eigen bestanden onder `src/agency/`** — bestaande marketing-bestanden
  zo veel mogelijk met rust laten (enige uitzondering: de mount-tak in `src/App.tsx`).
- Geen echte API-keys in code; gebruik `.env` (voorbeeld: `src/agency/env.agency.example`).
- Ontwikkel op een feature-branch en open een PR naar `main` (niet direct naar `main` pushen).
- Houd `npm run lint` (tsc) op 0 fouten.

## Handige verwijzingen
- `AGENCY_DASHBOARD.md` — architectuur, pagina's, datamodel, hoe je echte API's koppelt.
- `DEPLOYMENT.md` — Cloud Run / Firebase voor de marketing-site (backend).
- `firestore.rules` — moet RBAC uit `src/agency/lib/rbac.ts` spiegelen.
