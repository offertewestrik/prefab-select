# AanbouwPlatform.nl

A premium **lead- & offerteplatform** for **woninguitbreiding** in the broadest
sense — homeowners who want an *aanbouw, uitbouw, dakopbouw, mantelzorgwoning,
poolhouse, veranda, tuinkantoor, garageverbouwing* or *prefab woning* — and the
bouwbedrijven / aannemers that deliver them. The merknaam stays
`AanbouwPlatform.nl`; only the positioning is broadened to capture far more
zoekverkeer and leads. Built into this repo with the same technical structure,
auth, dashboards, database approach and seed scripts as the agency dashboard,
but with its own **light, premium theme** (white surfaces, deep navy structure,
warm orange accents) suited to projects of €30.000–€150.000.

It is mounted at **`/aanbouw`** and runs alongside the existing Prefab Select
marketing website (and the `/agency` dashboard) without touching them.

---

## 1. Quick start

```bash
npm install
npm run dev
# open http://localhost:3000/aanbouw
```

You land on the login screen. Click any **demo account** to sign in instantly:

| Account | Rol | Ziet |
| :-- | :-- | :-- |
| admin@aanbouwplatform.nl | Admin | alle aanvragen, bouwbedrijven, klanten, statistieken |
| aannemer@aanbouwplatform.nl | Aannemer (Brabant Bouw Experts) | toegewezen leads, offertes, projecten, werkgebied, diensten, profiel, credits |
| klant@aanbouwplatform.nl | Klant (Familie Jansen) | nieuwe aanvraag, mijn aanvragen, berichten & offertes |

All data is **mock data** persisted to `localStorage`, so the platform feels
live: place an aanvraag, accept a lead, send an offerte — it sticks across
reloads. Reset anytime via **Instellingen → Demo-data resetten**.

---

## 2. Rollen & dashboards

**Admin**
- Alle aanvragen + leads toewijzen aan bouwbedrijven (gerangschikt op match)
- Bouwbedrijven beheren & verifiëren
- Klanten beheren
- Statistieken (conversie, pijplijn, leadwaarde — voorbereiding omzetmodel)

**Aannemer / bouwbedrijf**
- Nieuwe aanvragen accepteren/afwijzen
- Geaccepteerde leads & gewonnen projecten
- Offertes opstellen en versturen
- Werkgebied beheren (postcode / stad / regio / straal)
- Diensten beheren
- Bedrijfsprofiel beheren
- Leadkosten / credits (voorbereid voor later)

**Klant / homeowner**
- Nieuwe aanvraag plaatsen via een 4-staps aanvraagformulier
- Mijn aanvragen bekijken & status volgen
- Berichten en offertes per aanvraag

### Aanvraagformulier (4 stappen)
1. **Wat wil je bouwen?** — Aanbouw, Uitbouw, Dakopbouw, Garage ombouw, Mantelzorgwoning, Poolhouse, Veranda, Tuinkantoor, Prefab woning, Anders
2. **Afmetingen** — breedte, diepte, m² (auto), afwerking (casco / standaard / luxe)
3. **Situatie** — bestaande woning, fundering nodig?, vergunning nodig?, startdatum, budgetindicatie
4. **Contactgegevens** — naam, telefoon, e-mail, postcode, plaats

---

## 3. Architectuur

```
src/aanbouw/
├── AanbouwApp.tsx             # Router + auth guards + providers (mounted from src/App.tsx at /aanbouw/*)
├── aanbouw.css               # Light premium theme, scoped under .abp-root
├── types/index.ts            # Domain types (mirror Firestore collections)
├── context/
│   ├── AuthContext.tsx        # Auth + RBAC (swap for Firebase Auth)
│   └── DataContext.tsx        # Collections + CRUD + per-role scoping
├── data/mockData.ts          # Seed data (3 demo users, 4 bouwbedrijven, 10 aanvragen, offertes, berichten)
├── services/firestoreService.ts  # Data backend (localStorage now → Firestore later)
├── lib/
│   ├── rbac.ts                # Roles → permissions
│   ├── services.ts            # Dienstencatalogus (13) + bouwtypes + budgetranges
│   ├── match.ts               # Score bouwbedrijf ↔ aanvraag (dienst + werkgebied)
│   ├── status.ts              # Status → badge-tone mapping
│   └── format.ts              # nl-NL currency/date formatters + quoteTotals
├── components/
│   ├── ui/index.tsx           # Design system: Card, Button, Badge, Table, Modal, Tabs…
│   ├── StatCard.tsx
│   └── layout/                # Sidebar, Topbar, DashboardLayout, nav
└── pages/                    # One file per route (per rol)
```

The collection names and document shapes already match a Firestore schema, so
going to production means swapping the body of `services/firestoreService.ts`
for the Firebase SDK and `AuthContext` for Firebase Auth — no component code
needs to change.

### Demo bouwbedrijf
**Brabant Bouw Experts** — regio Noord-Brabant — diensten: Aanbouw, Uitbouw,
Dakopbouw, Garage ombouw, Fundering, Kozijnen, Schuifpui — geverifieerd, 12
credits, €45 per lead.
