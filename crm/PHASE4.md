# Fase 4 — Managementdashboard (marketing, omzet, KPI's)

Branch: **`crm-dashboard-phase-4`**.

> Volledig werkend prototype op **dummy data** (deterministisch). De externe
> koppelingen (Meta Marketing API, Google Analytics 4, Search Console) zitten
> als laag klaar in `src/lib/analytics.ts` en worden later vervangen door echte calls.

---

## 1. Opgeleverd

| Deliverable | Locatie |
|---|---|
| Dashboard homepage (directie) | `/management` |
| KPI dashboard | `/kpi` |
| Marketing dashboard (Meta + GA + leadbronnen + configurator) | `/marketing` |
| Omzet dashboard | `/omzet` |
| Configurator dashboard | `/marketing` → tab Configurator |
| Rapportages (PDF/Excel) | `/rapportage` |
| Database schema | `supabase/migrations/0003_phase4_analytics.sql` |
| API-architectuur | zie §3 |
| Testinstructies | §4 |

### Modules
1. **Management** — realtime KPI's uit de CRM-data: leads vandaag/week/maand,
   open & geaccepteerde offertes, omzet in offerte, verwachte omzet, geplaatste
   projecten, conversiepercentage + omzet-per-maand en leads-per-kanaal grafiek.
2. **Meta Ads** — campagnes (Uitbouw, Poolhouse, Dakopbouw, Mantelzorgwoning)
   met advertentiegroepen & advertenties, kosten, bereik, klikken, leads, CPL, CTR, conversie.
3. **Google Analytics 4** — bezoekers, sessies, paginaweergaven, conversies,
   meest bezochte pagina's en verkeersbronnen (Organic/Ads/Meta/Direct/Social/Referral) + datumselectie (7/30/90 dagen).
4. **Leadbron-analyse** — leads, omzet, conversie en gemiddelde projectwaarde per kanaal.
5. **Omzet** — per maand (vs. doel), per projecttype, per regio, per medewerker.
6. **KPI's** — kosten per lead/afspraak/offerte/gewonnen project, gemiddelde
   projectwaarde, sluitingspercentage + conversie-funnel.
7. **Configurator** — gestarte/voltooide configuraties, conversieratio, trechter
   en populairste opties (gevelbekleding, kozijnen, dakafwerking, afmetingen).
8. **Rapportages** — dagelijks/wekelijks/maandelijks, export naar **PDF** (React-PDF)
   en **Excel/CSV**, plus aan/uit voor automatische rapporten.
9. **Grafieken** — Recharts, interactief, met filters en datumselectie.

---

## 2. Database (deliverable 7)

`supabase/migrations/0003_phase4_analytics.sql` voegt toe:
`marketing_campaigns`, `analytics_events`, `lead_sources`, `dashboard_metrics`,
`revenue_reports` — met checks, indexen en RLS (alleen ingelogde teamleden).

```bash
supabase db push   # of plak in Supabase Studio → SQL Editor
```

---

## 3. API-architectuur (deliverable 8)

```
Externe API's ──► sync-jobs ──► Supabase-tabellen ──► CRM-dashboards
```

**Mock-laag nu** (`src/lib/analytics.ts`): deterministische generatoren met
exact de vorm die de echte koppeling teruggeeft (`getMetaCampaigns`, `getGa`,
`getLeadbronnen`, `getOmzet`, `getKpis`, `getConfigurator`).

**Geplande API-routes / koppelingen** (te activeren met keys):
| Koppeling | Bron | Schrijft naar |
|---|---|---|
| `GET /api/integraties/meta/sync` | Meta Marketing API (`/insights`) | `marketing_campaigns` |
| `GET /api/integraties/ga/sync` | Google Analytics Data API (`runReport`) | `analytics_events` |
| `GET /api/integraties/gsc/sync` | Search Console API (`searchanalytics`) | `analytics_events` |
| `POST /api/rapportage/pdf` | (bestaat) React-PDF | — |
| (cron) `revenue_reports` | aggregatie | `revenue_reports` |

Aggregaties (`lead_sources`, `dashboard_metrics`) worden periodiek (cron /
Supabase scheduled function) gevuld uit `marketing_campaigns` + `analytics_events`
+ de CRM-tabellen, zodat de dashboards snel laden.

Env-variabelen (zie `.env.example`): `META_ACCESS_TOKEN`, `META_AD_ACCOUNT_ID`,
`GA4_PROPERTY_ID`, `GOOGLE_CLIENT_ID/SECRET`.

---

## 4. Testinstructies (deliverable 9)

```bash
cd crm
npm install
npm run dev      # http://localhost:3001
```

1. **Management** (`/management`) → de bovenste cijfers zijn **realtime**: maak
   via "Nieuwe lead" een lead aan → "Leads vandaag/week/maand" telt direct op.
2. **Marketing** (`/marketing`) → wissel tussen de tabs:
   - *Meta Ads*: klik een campagne open → advertentiegroepen & advertenties.
   - *Google Analytics*: wissel periode 7/30/90 dagen → grafiek en KPI's updaten.
   - *Leadbronnen*: tabel + grafieken per kanaal.
   - *Configurator*: trechter + populairste opties.
3. **Omzet** (`/omzet`) → omzet per maand (vs. doel), projecttype, regio, medewerker.
4. **KPI's** (`/kpi`) → acquisitiekosten per fase + conversie-funnel.
5. **Rapportages** (`/rapportage`):
   - Kies Dagelijks / Wekelijks / Maandelijks → preview update.
   - **PDF** → opent een nette PDF in huisstijl.
   - **Excel** → downloadt een CSV (opent in Excel).
   - Zet automatische rapporten aan/uit.

> Niet gebouwd (komt in een latere fase): Stripe, facturen.
