# Fase 3 — Planning, agenda, taken & opvolging

Branch: **`crm-dashboard-phase-3`**.

> Draait volledig op dummy data (Zustand + localStorage). Supabase-schema en de
> Google Calendar-koppeling staan klaar en worden geactiveerd zodra de keys er zijn.

---

## 1. Opgeleverd

| Deliverable | Locatie |
|---|---|
| Database-uitbreiding | `supabase/migrations/0002_phase3_planning.sql` |
| Agenda module (dag/week/maand) | `/agenda` (FullCalendar) |
| Afspraak detail | `/agenda/[id]` |
| Google Calendar koppeling | `/agenda` (toggle) · `/team-planning` · `src/lib/integrations/google-calendar.ts` |
| Takenmodule (statusbord) | `/taken` |
| Taak detail + reacties | `/taken/[id]` |
| Mijn dag | `/mijn-dag` |
| Team planning | `/team-planning` |
| Reminders systeem | `/mijn-dag` (instellingen + opvolglijst) |
| Notificaties (in-app) | belletje in de topbar |
| Dashboard widgets | `/dashboard` |

### Afspraaktypes
Telefonisch gesprek · Offertebespreking · Inmeten · Adviesgesprek ·
Werkvoorbereiding · Plaatsing · Oplevering (elk een eigen kleur in de agenda).

### Taakstatussen
Open · Bezig · Wachten · Gereed (kolommen op het takenbord, met snelle
status-wissel, prioriteit, deadline, medewerker en reacties).

### Rollen
Eigenaar · Verkoop · Werkvoorbereiding · Administratie. Wissel rechtsboven van
"ingelogde" medewerker (geen echte auth in het prototype) — "Mijn dag" en de
filters tonen dan de eigen agenda/taken.

### Reminders (instelbaar)
- **Nieuwe lead** → opvolgen na 1 / 3 / 7 / 14 dagen
- **Offerte verstuurd** → opvolgen na 1 / 3 / 7 / 14 dagen
- **Afspraak gepland** → herinnering 24 uur vooraf

Reminders verschijnen op **Mijn dag** en zijn aan/uit te zetten + aanpasbaar.

### Notificaties (automatisch)
Nieuwe lead · Nieuwe afspraak · Offerte geaccepteerd · Taak verlopen — verschijnen
in het belletje (met teller) en zijn als gelezen te markeren.

---

## 2. Database (deliverable 1)

`supabase/migrations/0002_phase3_planning.sql` voegt toe:
`users`, `calendars`, `appointments`, `tasks`, `task_comments`, `notifications`
— met indexen, foreign keys (naar `leads`, `quotes`, `auth.users`) en RLS
(alleen ingelogde teamleden).

Toepassen:
```bash
supabase db push      # of plak de SQL in Supabase Studio → SQL Editor
```

---

## 3. Environment variables

Bestaand (Supabase/Resend) blijft gelijk. Voor de **Google Calendar-koppeling**:

| Variabele | Uitleg |
|---|---|
| `GOOGLE_CLIENT_ID` | OAuth client-id (Google Cloud Console) |
| `GOOGLE_CLIENT_SECRET` | OAuth client-secret |
| `GOOGLE_REDIRECT_URI` | bv. `http://localhost:3001/api/integrations/google/callback` |

> Zonder deze keys werkt de agenda gewoon; "Toon Google Calendar" en de
> sync-knoppen gebruiken dan mock-data (`src/lib/integrations/google-calendar.ts`).

---

## 4. Testinstructies (deliverable 8)

```bash
cd crm
npm install
npm run dev        # http://localhost:3001
```

**Agenda**
1. Open **Agenda** → wissel tussen **Maand / Week / Dag / Lijst**.
2. Klik op een leeg tijdslot → de afspraak-dialog opent met dat tijdstip voorgevuld.
3. Kies type, medewerker, klant en sla op → de afspraak verschijnt gekleurd in de agenda.
4. Vink **Toon Google Calendar** aan → grijze (mock) Google-events verschijnen (via React Query).
5. Klik een afspraak → detailpagina; test **Bewerken**, **Sync met Google**, **Verwijderen**.

**Afspraak vanuit lead/offerte**
6. Open een lead → tab **Afspraken** → **Nieuwe afspraak** (klant is voorgevuld).
   Idem voor taken via tab **Taken**.

**Taken**
7. Open **Taken & reminders** → sleep niet maar gebruik de status-dropdown om een
   taak van **Open → Bezig → Wachten → Gereed** te zetten.
8. **Nieuwe taak** aanmaken; open een taak → voeg een **reactie** toe.

**Mijn dag & rollen**
9. Wissel rechtsboven van medewerker (bv. Tom) → **Mijn dag** toont diens eigen
   afspraken/taken. Pas onder **Opvolg-instellingen** een reminder aan.

**Team planning**
10. Open **Team planning** → zie alle medewerkers, hun bezetting deze week en de
    teamagenda (gekleurd per medewerker). Vink medewerkers aan/uit.

**Notificaties**
11. Maak een **Nieuwe lead** (knop rechtsboven) → het belletje krijgt een teller
    met de melding "Nieuwe lead". Zet een offerte op **Geaccepteerd** → melding.
12. Markeer notificaties als gelezen.

**Dashboard**
13. **Dashboard** toont de widgets: Afspraken vandaag · Taken vandaag · Open
    offertes · Leads opvolgen · Plaatsingen deze week.

> Demo-data resetten kan via **Integraties → Demo-data resetten**.

---

## 5. Naar echte Supabase + Google (vervolg)

1. Migraties `0001` + `0002` draaien.
2. Env-variabelen invullen (Supabase + Google).
3. Store-acties vervangen door Supabase-queries (zie `src/lib/data/` patroon uit fase 2).
4. Google OAuth-flow + `googleapis` activeren in `src/lib/integrations/google-calendar.ts`
   (echte implementatie staat als commentaar klaar).
