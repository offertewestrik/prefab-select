# Fase 5 — Facturen & klantportaal

Branch: **`crm-dashboard-phase-5`**.

> Volledig werkend op dummy data. Facturen, betalingen en het klantportaal
> draaien zonder externe keys; de PDF/e-mail gebruiken de bestaande Resend-mock.

---

## 1. Facturenmodule (CRM)

| Onderdeel | Locatie |
|---|---|
| Facturenoverzicht (stats + filters) | `/facturen` |
| Nieuwe factuur | `/facturen/nieuw` |
| Factuurdetail | `/facturen/[id]` |
| Factuur-PDF | `POST /api/facturen/pdf` |
| Factuur mailen (Resend) | `POST /api/facturen/mail` |
| Facturen per klant | lead-detail → tab **Facturen** |

- **Statussen:** Concept, Verzonden, Deels betaald, Betaald, Te laat (automatisch
  o.b.v. vervaldatum), Gecrediteerd. De effectieve status wordt afgeleid uit de
  geregistreerde betalingen + vervaldatum.
- **Betalingen registreren** (bedrag + methode iDEAL/overboeking/pin/contant);
  status springt automatisch naar Deels betaald / Betaald.
- **Termijnfacturen**: op een **geaccepteerde offerte** staat de knop
  *"Genereer termijnfacturen"* → maakt automatisch de 4 facturen 40/30/20/10
  (conform de betalingsvoorwaarden uit fase 2), met oplopende vervaldatums.
- **PDF** in huisstijl (logo, btw-uitsplitsing, IBAN/betaalkenmerk).

---

## 2. Klantportaal

Een aparte, afgeschermde omgeving **voor de klant** op
`/portaal/<token>` — zonder CRM-menu (eigen layout via `AppFrame`).

De klant ziet alleen het eigen project:
- **Projectstatus** als tijdlijn (Aanvraag → Offerte → Akkoord → In productie → Opgeleverd)
- **Offertes** — bekijken (PDF) en online **Akkoord geven / Afwijzen**
  → in het CRM springt de lead automatisch naar *Akkoord* + notificatie
- **Facturen** — status, PDF, en **Betaal met iDEAL** (mock → markeert als betaald)
- **Afspraken** — geplande inmeet-/plaatsingsafspraken
- **Documenten** — gedeelde bestanden
- **Contact** — telefoon, e-mail, adres, website

**Toegang:** elke lead heeft een persoonlijke token (`portalToken`, valt in het
prototype terug op het lead-id). In het CRM open je de link via de knop
**"Open klantportaal"** op de leadpagina. Later te vervangen door echte login
(Supabase Auth) of een e-mailcode.

---

## 3. Database (migratie `0004_phase5_facturen_portaal.sql`)

Nieuwe tabellen: `invoices`, `invoice_items`, `payments`, `portal_tokens`
(met checks, indexen, `updated_at`-trigger en RLS voor het team).

> Let op: het anonieme klantportaal leest straks via een beveiligde route/edge
> function die op de token matcht — geef anon-rollen géén directe select-rechten.

```bash
supabase db push
```

---

## 4. Testinstructies

```bash
cd crm
npm install
npm run dev      # http://localhost:3001
```

**Facturen**
1. Open **Facturen** → bekijk de stats (openstaand/betaald/te laat) en filters.
2. Open `FACT-2026-0002` → klik **Betaling registreren** → vul het bedrag → status wordt *Betaald*.
3. Klik **PDF** (opent factuur in huisstijl) en **Mail factuur** (mock).
4. **Nieuwe factuur** aanmaken via de knop, of via lead → tab **Facturen**.

**Termijnfacturen**
5. Open offerte **PS-2026-0011** (geaccepteerd) → knop **Genereer termijnfacturen**
   → 4 facturen 40/30/20/10 verschijnen in `/facturen`.

**Klantportaal**
6. Open een lead (bv. *Familie Visser*) → knop **Open klantportaal** (opent `/portaal/lead-011`).
7. In het portaal: bekijk de **projectstatus**, open de tab **Offertes** en klik
   **Akkoord geven** → controleer in het CRM dat de lead naar *Akkoord* staat.
8. Tab **Facturen** → **Betaal met iDEAL** → factuur wordt *Betaald*.

> Niet in deze fase: echte iDEAL/Stripe-betaling en echte klant-login (komt later).
