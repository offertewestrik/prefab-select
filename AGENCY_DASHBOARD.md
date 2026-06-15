# Agency Command Center

A premium, dark-mode **marketing-agency operating system** built into this repo. It is a self-contained SaaS-style dashboard where the agency manages every client and everything they do for them: leads, quotes, CRM pipeline, revenue, analytics, ads, website/Firebase/GitHub projects, tasks, AI agents, reports, content planning and automations.

It is mounted at **`/agency`** and runs alongside the existing Prefab Select marketing website without touching it.

> Design language: Linear × Notion × HubSpot × Monday × Stripe — glassmorphism, soft gradients, modern cards, sidebar + topbar, charts, kanban, AI command center.

---

## 1. Quick start

```bash
npm install
npm run dev
# open http://localhost:3000/agency
```

You land on the login screen. Click any **demo account** to sign in instantly:

| Account | Role | Sees |
| :-- | :-- | :-- |
| Sjoerd Westrik | Super Admin | everything |
| Lisa de Vries | Admin | everything |
| Daan Bakker | Marketeer | marketing, leads, content, agents |
| Noa Jansen | Sales | leads, quotes, revenue |
| Mark Lucky | Klant | read-only, only his own company |

All data is **mock data** persisted to `localStorage`, so the dashboard feels live: add a lead, drag a kanban card, write a note, run an AI agent — it sticks across reloads. Reset anytime via **Instellingen → Agency → Reset demo data**.

---

## 2. Architecture

```
src/agency/
├── AgencyApp.tsx              # Router + auth guards + providers (mounted from src/App.tsx at /agency/*)
├── types/index.ts            # All domain types (mirror Firestore collections)
├── context/
│   ├── AuthContext.tsx        # Auth + RBAC (swap for Firebase Auth)
│   └── DataContext.tsx        # All collections + CRUD + company scoping
├── data/mockData.ts          # Seed data for every collection
├── lib/
│   ├── rbac.ts                # Roles → permissions (mirror in firestore.rules)
│   └── format.ts              # nl-NL currency/date/number formatters
├── services/                 # Integration layer — swap mock for real APIs
│   ├── firestoreService.ts    # Data backend (localStorage now → Firestore later)
│   ├── githubService.ts
│   ├── metaAdsService.ts
│   ├── googleAnalyticsService.ts
│   ├── firebaseAdminService.ts
│   └── aiService.ts           # AI agents + command center
├── components/
│   ├── ui/                    # Design system: Card, Button, Badge, Table, Modal, Tabs…
│   ├── charts/                # Dependency-free SVG charts (Area/Bar/Donut/Sparkline)
│   ├── kanban/                # Reusable drag-and-drop Kanban board
│   ├── layout/                # Sidebar, Topbar, CommandPanel, GlobalSearch, DashboardLayout
│   └── StatCard.tsx
└── pages/                    # One file per route (see below)
```

### Why it mounts at `/agency`
`src/App.tsx` checks the path first and returns `<AgencyApp />` for `/agency/*` — so the dashboard renders with its own dark layout (no marketing navbar/footer/pixels). The Express server already has an SPA fallback, so deep links like `/agency/leads` work on refresh.

---

## 3. Pages / routes

| Route | Module |
| :-- | :-- |
| `/agency/login` | Auth (email + role-based demo accounts) |
| `/agency/dashboard` | Per-client overview (KPIs, charts, leads, tasks, agents) |
| `/agency/companies` | Client manager (grid + create) |
| `/agency/companies/:id` | Single-client command page (tabs: overview, contact, projects, integrations, notes) |
| `/agency/leads` | Lead CRM (table, detail drawer, timeline, scoring) |
| `/agency/crm` | Kanban pipeline (8 stages, drag & drop) |
| `/agency/quotes` | Offertes (line items, BTW, korting, AI intro text, PDF/email prepared) |
| `/agency/revenue` | Omzet & groei (forecast, won/lost, charts) |
| `/agency/analytics` | Google Analytics + Meta Ads (tabs, charts, campaign table) |
| `/agency/content` | Content calendar (per platform, AI ideas & captions) |
| `/agency/reports` | Monthly reports (AI summary, recommendations, PDF prepared) |
| `/agency/agents` | AI Agents + inline AI Command Center |
| `/agency/projects` | Projects + GitHub + Firebase tabs |
| `/agency/tasks` | Tasks (kanban, list, calendar) |
| `/agency/settings` | Agency, users & roles, integrations, API keys, notifications |

Press **⌘K / Ctrl-K** anywhere for the **AI Command Center**, and **`/`** for global search.

---

## 4. Firestore data model

The mock collections match a production Firestore schema 1:1 (`src/agency/types/index.ts`):

```
users            companies        leads            deals
quotes           tasks            projects         agents
agentLogs        analytics        campaigns        reports
contentCalendar  integrations     notifications
```

Suggested top-level layout (multi-tenant by company):

```
companies/{companyId}                         ← Company
leads/{leadId}            { companyId, ... }   ← scoped by companyId
quotes/{quoteId}         { companyId, ... }
... (every doc carries companyId for security-rule scoping)
users/{uid}              { role, companyIds }  ← drives RBAC
```

---

## 5. Connecting real services later

Every integration is isolated behind a service module with **stable method signatures**, so pages never change when you go live — you only edit the service body. Each file has a worked example in its header comment.

### 5.1 Firestore (data backend)
`services/firestoreService.ts` is localStorage-backed today. Replace the methods with the Firebase SDK (already installed):

```ts
import { db } from '@/src/lib/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';

async getAll(name) {
  const snap = await getDocs(collection(db, name));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
```
Then make `DataContext` load asynchronously (it already centralises all reads/writes).

### 5.2 Firebase Auth (login + roles)
In `context/AuthContext.tsx`, swap the mock `login`/`logout` for:

```ts
import { auth } from '@/src/lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
```
Resolve the user's `role` and `companyIds` from a `users/{uid}` document. RBAC is already enforced in the UI via `lib/rbac.ts` — mirror the same rules in `firestore.rules`.

### 5.3 Google Analytics 4
`services/googleAnalyticsService.ts` → GA4 Data API (`properties/{id}:runReport`), authenticated server-side with a service account (`GOOGLE_APPLICATION_CREDENTIALS`). Map rows into `AnalyticsSnapshot`. Env: `GA4_PROPERTY_ID`.

### 5.4 Meta (Facebook/Instagram) Ads
`services/metaAdsService.ts` → Meta Marketing API (`/{ad-account-id}/insights`). Map into `Campaign`. Env: `META_ADS_ACCESS_TOKEN`, `META_ADS_ACCOUNT_ID`.

### 5.5 GitHub
`services/githubService.ts` → GitHub REST API / Octokit with `Authorization: Bearer ${GITHUB_TOKEN}`. Methods already return repos, branches, commits, issues, deploys.

### 5.6 Firebase project monitoring
`services/firebaseAdminService.ts` → Firebase Admin SDK + Cloud Monitoring, run **server-side** in a Cloud Function. The browser calls your `/api/firebase/status` proxy; never expose service-account creds client-side.

### 5.7 AI (OpenAI / Claude / Gemini)
`services/aiService.ts` powers the agents and the command center. Today it generates grounded responses locally. To use a real model, run the call in a Cloud Function and have the browser POST to `/api/ai/complete`:

```ts
// server-side (Claude example)
import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const msg = await client.messages.create({
  model: 'claude-opus-4-8',
  max_tokens: 1024,
  messages: [{ role: 'user', content: prompt }],
});
```
The repo already ships `@google/genai` (Gemini); OpenAI/Claude are wired in `.env.example`.

---

## 6. AI Agents

Ten agents per client (`lead-follow-up`, `quote`, `website-analysis`, `seo`, `meta-ads-analysis`, `content`, `reporting`, `customer-service`, `github-review`, `firebase-monitor`). Each has a status (`idle/running/completed/failed`), last action, output, task checklist and a logbook (`agentLogs`). Start/stop from the **AI Agents** page; results stream into the logbook.

The **AI Command Center** (⌘K) understands natural-language commands such as:
- “Analyseer leads van Prefab Select deze week”
- “Maak rapportage voor Lucky Zonwering”
- “Controleer Firebase errors”
- “Maak Meta Ads verbeteradvies”
- “Maak offerte voor deze lead”
- “Maak contentplanning voor komende week”

Intent detection + company matching lives in `aiService.sendCommand`; replace its body with a real LLM call when ready.

---

## 7. Security notes

- **No real API keys in code.** Use `.env` (see `src/agency/.env.agency.example`). `VITE_*` vars are only presence flags for the UI; real secrets stay server-side.
- **Fully self-contained.** Everything the dashboard needs lives under `src/agency/` (code, theme `agency.css`, env example). The only hook into the existing app is a 3-line branch in `src/App.tsx` that renders `<AgencyApp/>` for `/agency/*` — required because routes must be registered in the app's router; it does not change any marketing behaviour.
- RBAC is enforced in the UI (`lib/rbac.ts`) and must be mirrored in `firestore.rules`.
- The `klant` role only ever sees its own company's data (already scoped in `DataContext`).

---

## 8. Selling this as a product

The system is intentionally multi-tenant, modular and integration-ready so it can be resold to other agencies: every module is a standalone page, every external dependency is a swappable service, the design system is centralised, and the data model is documented. Add billing + per-agency tenancy on top of the existing `companies`/`users` model to ship it as SaaS.
