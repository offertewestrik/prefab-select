# 05 — Aanvraagflow & Marketplace  (pijler 3)

De aanvraagflow zet anoniem zoekverkeer om in betaalde leads. Conform het
aangeleverde design: een **5-staps wizard**.

## 1. De wizard (5 stappen)

| Stap | Inhoud | Veld(en) |
|------|--------|----------|
| 1 | **Dienst kiezen** | `serviceId` (kaarten per dienst/categorie) + evt. `brandId` |
| 2 | **Foto's** (optioneel) | `photos[]` via UploadThing — verhoogt leadkwaliteit |
| 3 | **Locatie** | postcode + huisnummer → adres-autocomplete (Google Places) → `municipalityId`, `lat/lng` |
| 4 | **Gegevens** | naam, e-mail, telefoon, urgentie, voorkeursdatum + dagdeel, omschrijving |
| 5 | **Klaar** | samenvatting + verzenden → bevestiging |

**Kenmerken:**
- Eén Zod-schema (`features/leads/schema.ts`), per-stap gevalideerd, gedeeld
  client/server. Geen verlies bij terugnavigeren (state in URL/searchParams +
  client store).
- Voortgang persistent (localStorage) zodat afhakers kunnen terugkeren.
- **Context-aware start**: vanaf een `/[service]/[city]`-pagina staat stap 1 (dienst)
  en stap 3 (stad) al voorgevuld → veel hogere conversie.
- Mobiel-first, één vraag-cluster per scherm, duidelijke progress-indicator.
- **Anti-spam**: Cloudflare Turnstile + rate-limiting (Redis) + honeypot + IP-hash.

## 2. Verwerking (server action `submitLead`)

1. Valideer (Zod) + Turnstile + rate-limit.
2. Resolve gemeente uit postcode (Geo-context); bepaal `lat/lng`.
3. **Prijsbepaling** `priceCredits`: basis per dienst (admin-config) × urgentie-factor.
4. Persisteer `LeadRequest` (status `NEW`).
5. **E-mailbevestiging** naar huiseigenaar (Resend) + interne notificatie.
6. Start **matching & distributie** (async, via lichte queue/Redis).
7. Redirect naar `/bedankt` met statusoverzicht.

## 3. Matching & distributie

```
LeadRequest (NEW)
   │ match: ACTIVE bedrijven met (dienst ∈ CompanyService) ∧ (gemeente ∈ CompanyCoverage)
   │ rank: rating ▸ abonnement/voorrang ▸ responstijd ▸ load-balancing
   ▼
Top-N (= maxBuyers, default 3) → LeadMatch (OFFERED) + melding (e-mail/in-app)
   ▼
Vakman koopt (zie §4) → status DISTRIBUTED → PARTIALLY_SOLD → SOLD_OUT
```

- **Eerlijke verdeling**: een lead wordt aan max `maxBuyers` vakmannen verkocht.
- **Geen dekking?** Lead naar admin-wachtrij (handmatig toewijzen) + signaal
  "werkgebied uitbreiden".
- **Auto-buy** (optioneel per bedrijf): automatisch kopen binnen ingestelde
  criteria (dienst, gebied, budget).

## 4. Lead kopen (credits) — transactioneel

Atomic, met **Redis-lock per lead** tegen over-verkoop:

```
acquire lock(leadId)
  if soldCount >= maxBuyers     → afwijzen ("lead niet meer beschikbaar")
  if creditBalance < price      → afwijzen ("saldo te laag" → /credits)
  DB-transactie:
     creditBalance -= price
     CreditTransaction(type=SPEND, amount=-price, balanceAfter)
     LeadPurchase(...) ; LeadMatch.status = PURCHASED
     LeadRequest.soldCount++ ; status bijwerken
release lock
→ contactgegevens + adres vrijgegeven aan de koper
```

## 5. Monetisatie (v1: credits)

- Vakman koopt **credits** (wallet) → Stripe-betaling → `CreditTransaction(TOPUP)`
  + BTW-`Invoice` (pdf via Resend/React-PDF).
- Prijs per lead in credits, configureerbaar per dienst in admin.
- **Later (fase 3):** abonnementen (Plan/Subscription) met inbegrepen credits +
  voorrang + featured listing. Tabellen staan al klaar (doc 03).

## 6. Inplannen ("wij/de vakman plant in")

Na aankoop plant de vakman de klus: `Appointment` (datum/tijd) → huiseigenaar
krijgt automatische bevestiging (Resend). Statusflow: `PLANNED → CONFIRMED →
COMPLETED`. Na afronding volgt automatisch een **review-uitnodiging**.
