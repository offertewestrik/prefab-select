# Fase 2 — Offertemodule

Offertes maken, opslaan, als PDF genereren en per e-mail versturen.
Branch: **`crm-dashboard-phase-2`**.

> Net als fase 1 draait dit **direct op dummy data** (Zustand + localStorage).
> De Supabase-database (schema + datalaag) staat klaar en wordt geactiveerd
> zodra de keys zijn ingevuld — zie "Naar echte Supabase" onderaan.

---

## 1. Wat is opgeleverd

| Onderdeel | Locatie |
|---|---|
| Offerte-overzicht (status-filters) | `/offertes` |
| Nieuwe offerte (alle velden + prijsregels) | `/offertes/nieuw` |
| Offerte-detail + status-tijdlijn | `/offertes/[id]` |
| PDF-preview (in-app) + download | knoppen op detailpagina |
| PDF-generator (huisstijl, logo) | `src/lib/pdf/OfferteDocument.tsx` → `POST /api/offertes/pdf` |
| E-mail versturen (Resend) | `POST /api/offertes/mail` |
| Verzendgeschiedenis per offerte | onderaan detailpagina |
| Offertegeschiedenis per lead | lead-detail → tab "Offertes" |
| Database-schema | `supabase/migrations/0001_phase2_quotes.sql` |
| Supabase-datalaag (swap-in) | `src/lib/supabase/*`, `src/lib/data/quotes-repo.ts` |

### Offertestatussen
`Concept → Verzonden → Geopend → Geaccepteerd / Afgewezen / Verlopen`

### Offertevelden
Offertenummer, lead/klant, projecttype, projectomschrijving, afmetingen,
werkzaamheden, prijsregels, subtotaal, btw, totaal incl. btw, geldigheid,
opmerkingen en voorwaarden.

### Prijsregels
Omschrijving · aantal · **eenheid** · prijs per stuk · btw% · totaal per regel.

### Automatische statuslogica
Bij **Mail offerte**:
1. Offertestatus → **Verzonden** (met verzonddatum)
2. Leadstatus → **Offerte verstuurd** (als de lead nog in een eerdere fase zit)
3. Er wordt een regel toegevoegd aan de **verzendgeschiedenis** (quote_email_logs)

Bij status **Geaccepteerd** gaat de lead automatisch naar **Akkoord**.

---

## 2. Database (deliverable 1 & 8)

Drie nieuwe tabellen in `supabase/migrations/0001_phase2_quotes.sql`:

- **quotes** — kop van de offerte (nummer, lead, status, projectvelden, totalen-bron, datums)
- **quote_items** — de prijsregels (1-op-veel met quotes)
- **quote_email_logs** — verzendgeschiedenis van e-mails

Inclusief: indexen, `updated_at`-trigger en **Row Level Security** (alleen
ingelogde teamleden via Supabase Auth).

Toepassen:
```bash
# via Supabase CLI
supabase db push
# of: plak de SQL in Supabase Studio → SQL Editor → Run
```

---

## 3. Environment variables (deliverable 6)

Kopieer `.env.example` naar `.env` en vul in wat je nodig hebt.

**Voor het versturen van échte e-mails (Resend):**
| Variabele | Uitleg |
|---|---|
| `RESEND_API_KEY` | API-key uit je Resend-dashboard |
| `RESEND_FROM_EMAIL` | Afzender, bv. `offerte@prefabselect.nl` (domein moet geverifieerd zijn in Resend) |
| `USE_REAL_INTEGRATIONS` | Zet op `true` om de mock te vervangen door echte verzending |

**Voor de Supabase-database (optioneel in deze fase):**
| Variabele | Uitleg |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Project-URL uit Supabase → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon public key (browser + Auth) |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (alleen serverside) |
| `DATABASE_URL` | Postgres connection string (voor migraties/CLI) |

> Zonder deze keys werkt alles gewoon op dummy data; e-mail valt terug op de
> mock (logt naar de console, verandert wel de status en geschiedenis).

---

## 4. Testinstructies (deliverable 7)

```bash
cd crm
npm install
npm run dev            # http://localhost:3001
```

**Happy path — offerte maken, PDF, mailen:**
1. Ga naar **Leads** → open bv. *Familie De Vries* → tab **Offertes** → **Nieuwe offerte**
   (de klant en het projecttype zijn al ingevuld).
2. Vul projectomschrijving/afmetingen in, voeg een paar **prijsregels** toe
   (let op de **eenheid**-kolom) en controleer dat subtotaal/btw/totaal live meelopen.
3. Klik **Offerte opslaan** → je komt op de **detailpagina**.
4. Klik **Preview** → de PDF verschijnt in de pagina. Klik **PDF** → opent in nieuw tabblad.
5. Klik **Mail offerte**:
   - Melding "ge-maild (mock)" verschijnt.
   - Status-tijdlijn springt naar **Verzonden**.
   - **Verzendgeschiedenis** onderaan toont de e-mail.
   - Open de lead → de leadstatus staat nu op **Offerte verstuurd**.
6. Zet de status handmatig op **Geaccepteerd** → de lead gaat naar **Akkoord**.

**API's los testen:**
```bash
# PDF (geeft application/pdf terug)
curl -X POST http://localhost:3001/api/offertes/pdf \
  -H "Content-Type: application/json" \
  -d @voorbeeld-offerte.json --output offerte.pdf

# Mail (mock → {"ok":true,"mock":true,...})
curl -X POST http://localhost:3001/api/offertes/mail \
  -H "Content-Type: application/json" -d @voorbeeld-offerte.json
```
(`voorbeeld-offerte.json` = `{ "quote": {...}, "lead": {...} }`.)

**Echte Resend-mail testen:** vul `RESEND_API_KEY` + `RESEND_FROM_EMAIL` in,
zet `USE_REAL_INTEGRATIONS=true`, herstart, en gebruik een e-mailadres dat je
kunt controleren.

---

## 5. Naar echte Supabase (vervolgstap)

De UI gebruikt nu de Zustand-store. Overstappen:
1. Migratie draaien (`supabase/migrations/0001_phase2_quotes.sql`).
2. Env-variabelen invullen.
3. De pagina's/route-handlers laten lezen/schrijven via
   `src/lib/data/quotes-repo.ts` (functies hebben dezelfde vorm als de
   store-acties, dus de componenten hoeven nauwelijks te veranderen).
4. Supabase Auth toevoegen voor login (RLS-policies staan al klaar).
