# Prefab Select CRM

Eigen CRM-dashboard van Prefab Select — de vervanging van Teamleader.

> **Status: werkend prototype op dummy data.** Alle 18 functies draaien zonder
> externe accounts of API-keys. De echte koppelingen (Supabase, Resend, Google,
> Meta) zitten als mock-laag klaar en worden stap voor stap geactiveerd.

## Snel starten

```bash
cd crm
npm install
npm run dev
# open http://localhost:3001
```

Geen `.env` nodig — het prototype gebruikt in-browser dummy data
(localStorage). Wijzigingen (slepen in de pijplijn, offertes maken, notities,
taken…) blijven bewaard tot je ze reset via **Integraties → Demo-data resetten**.

## Functies (allemaal werkend met dummy data)

| # | Functie | Pagina |
|---|---------|--------|
| 1 | Lead dashboard | `/dashboard` |
| 2 | Drag & drop pipeline | `/pipeline` |
| 3 | Lead detailpagina | `/leads/[id]` |
| 4 | Offerte aanvragen beheren | `/offerte-aanvragen` |
| 5 | Offertes maken | `/offertes/nieuw` |
| 6 | Offertes als PDF genereren | `POST /api/offertes/pdf` (React-PDF) |
| 7 | Offertes mailen via Resend | `POST /api/offertes/mail` (mock) |
| 8 | Status offerte volgen | `/offertes/[id]` (status-tijdlijn) |
| 9 | Afspraken inplannen | `/afspraken` + lead-detail |
| 10 | Google Calendar koppeling | `/afspraken` (sync-mock) |
| 11 | Taken & reminders | `/taken` |
| 12 | Notities per klant | lead-detail → tab Notities |
| 13 | Bestanden uploaden | lead-detail → tab Bestanden |
| 14 | Meta Ads koppeling | `/rapportage` + `/integraties` |
| 15 | Google Analytics koppeling | `/rapportage` + `/integraties` |
| 16 | Website formulier koppeling | `/integraties` |
| 17 | Configurator lead koppeling | `/integraties` |
| 18 | Rapportage dashboard | `/rapportage` (Recharts) |

### Pijplijn-fases
Nieuwe lead → Offerte aanvraag → Gebeld → Afspraak ingepland → Offerte
verstuurd → Akkoord → In productie → Geplaatst → Gewonnen / Verloren.

## Techniek

- **Next.js 14** (App Router) + **React 18**
- **TailwindCSS 3** (huisstijl uit `AGENTS.md`)
- **Zustand** (+ persist) als tijdelijke datastore
- **@hello-pangea/dnd** voor drag & drop
- **@react-pdf/renderer** voor offerte-PDF's
- **Recharts** voor rapportages
- **lucide-react** iconen

## Architectuur

```
src/
  app/                Next.js routes (pagina's + API-routes)
  components/         UI-componenten (Sidebar, Topbar, dialogs, ui/*)
  lib/
    types.ts          domeinmodel
    constants.ts      labels, kleuren, pijplijn-volgorde
    seed.ts           dummy data
    store.ts          Zustand-store ("database" van het prototype)
    quote-utils.ts    offerteberekeningen
    pdf/              React-PDF documenten
    integrations/     mock-laag voor Resend / Meta / GA / Google Calendar
```

## Volgende stappen — echte koppelingen

De mock-laag in `src/lib/integrations/` en `src/lib/store.ts` heeft exact de
vorm die de echte implementatie krijgt. Roadmap:

1. **Supabase + Prisma** — schema afgeleid van `src/lib/types.ts`; store-acties
   vervangen door database-queries; Supabase Auth voor login; Supabase Storage
   voor bestanden.
2. **Resend** — `verstuurOfferteMail` activeren met `RESEND_API_KEY`
   (echte implementatie staat al uitgecommentarieerd klaar).
3. **Google Calendar** — OAuth + afspraken pushen/pullen.
4. **Meta Marketing API** — campagnestatistieken + lead-import.
5. **Google Analytics 4 Data API** — websiteverkeer & conversies.
6. **Website formulier + Configurator** — webhooks die leads aanmaken.

Zet `USE_REAL_INTEGRATIONS=true` in `.env` zodra de keys er zijn (zie
`.env.example`).
