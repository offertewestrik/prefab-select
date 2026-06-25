# 06 — Vakman-dashboard  (pijler 4)

Voor rol `INSTALLER`. Layout conform design: donkernavy zijbalk + lichte
content, KPI-kaarten bovenaan, creditsaldo + "Opwaarderen" in de zijbalk.

## Navigatie & modules

| Route | Module | Inhoud (v1) |
|-------|--------|-------------|
| `/dashboard` | **Overzicht** | KPI-kaarten: nieuwe leads, offertes verstuurd, opdrachten gewonnen, omzet (periode) + grafiek prestaties + recente reviews + werkgebied-kaart |
| `/dashboard/leads` | **Nieuwe leads** | Aangeboden leads (`OFFERED`) in werkgebied: dienst, plaats, prijsindicatie, credits-prijs. Detail → **kopen** |
| `/dashboard/leads/[id]` | **Lead-detail** | Volledige aanvraag (na koop: contact + adres + foto's), knop "Koop lead" / "Plan in" |
| `/dashboard/opdrachten` | **Opdrachten** | Gekochte leads → inplannen (`Appointment`), status bijwerken |
| `/dashboard/agenda` | **Agenda** | Geplande afspraken (kalenderweergave) |
| `/dashboard/offertes` | **Offertes** | Offertes maken/versturen (basis in v1; uitgebreid in fase 3) |
| `/dashboard/reviews` | **Reviews** | Ontvangen reviews + reageren |
| `/dashboard/statistieken` | **Statistieken** | Conversie, omzet, lead-volume, responstijd |
| `/dashboard/werkgebied` | **Werkgebied** | Gemeenten/straal instellen (Mapbox) + diensten aan/uit |
| `/dashboard/credits` | **Credits** | Saldo, transactiehistorie, **opwaarderen** (Stripe), facturen |
| `/dashboard/instellingen` | **Instellingen** | Bedrijfsprofiel, logo, certificeringen, teamleden, meldingen |

## Datatoegang

- Alles strikt ge-scoped op `companyId` (centrale guard in `features/*/server`).
- KPI's: server-aggregaties (gecached in Redis, korte TTL).
- Realtime nieuwe-lead-melding: Supabase Realtime of polling via TanStack Query.

## Onboarding vakman (registratie → actief)

1. `/registreren` → account + `InstallerCompany` (`PENDING`).
2. Profiel invullen: KVK, diensten, werkgebied, certificeringen, logo.
3. Admin keurt goed → `ACTIVE` → ontvangt leads.
4. Eerste credits kopen → kan leads kopen.

## Belangrijkste flows

- **Lead kopen** → §4 van doc 05 (transactioneel, Redis-lock).
- **Inplannen** → `Appointment` aanmaken → klant-bevestiging.
- **Opwaarderen** → Stripe Checkout → webhook → `CreditTransaction(TOPUP)` + factuur.
- **Reageren op review** → `Review.reply` (zichtbaar op publiek profiel).

> Offertes/facturen naar klant, Google-Reviews-koppeling, AI-assistent en chat
> uit het bredere wensenlijstje: **fase 3** — de datamodellen/menu-items zijn
> hierop voorbereid.
