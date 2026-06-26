# Agency Automation Engine — de 24/7 machine

Dit document beschrijft hoe het Agency Command Center van een **cockpit (UI)** een echte **24/7 automatiseringsmachine** wordt die content maakt, advertenties opzet (Google & Meta), zoekwoorden onderzoekt en je sites bewaakt — per bedrijf dat jij beheert.

> Kort antwoord op "is dit mogelijk?": **ja, grotendeels** — met echte API-koppelingen, vangrails voor geld/publicatie, en een continue feedback-loop in plaats van letterlijk "het model hertrainen". Hieronder per onderdeel eerlijk uitgelegd.

---

## 1. Architectuur

```
   Cloud Scheduler (cron, elke 15 min)
            │  triggert
            ▼
   ┌─────────────────────┐     brain (Gemini/Claude/OpenAI)
   │   Engine  runOnce()  │◀──────────────┐
   │  src/agency/engine   │               │
   └─────────┬───────────┘                │
             │ per bedrijf, per agent     │
             ▼                            │
   ┌──────────────────┐   findings   ┌────┴───────┐
   │  Agents          │─────────────▶│  Store      │  (Firestore)
   │  monitor/keywords│   actions     │  runs/logs  │
   │  content/ads     │──────────────▶│  approvals  │
   └─────────┬────────┘   proposed    └────┬────────┘
             │ approved                    │
             ▼                             ▼
   ┌──────────────────┐            Dashboard (cockpit)
   │  Connectors      │            - goedkeuringswachtrij
   │  Google Ads API  │            - logs, status, kosten
   │  Meta Marketing  │
   │  Social / e-mail │
   └──────────────────┘
```

- **Engine** (`src/agency/engine/`): framework-onafhankelijk, draait server-side. `runOnce()` is wat de scheduler aanroept.
- **Agents**: `monitor` (werkt nu echt), `keywords`, `content`, `google-ads`, `meta-ads` (genereren een concreet plan en zetten een **voorstel** in de wachtrij).
- **Brain**: standaard Gemini (key zit al in de repo). Eén bestand wisselen voor Claude/OpenAI.
- **Store**: jij implementeert `EngineStore` tegen Firestore (interface staat klaar).
- **Connectors**: de echte "duw naar buiten" (campagne aanmaken, post plaatsen). Wordt aangezet met jouw API-toegang.
- **Guardrails**: alles wat geld kost of naar buiten gaat, gaat eerst naar de **goedkeuringswachtrij** (instelbaar per bedrijf).

### Wat nu al echt werkt
De **monitor-agent** doet een echte HTTP-check van elke site (status + latency) en slaat alarm bij problemen. Bewezen tegen je live sites:
```
🟢 Prefab Select   → 200 in 1597ms
🟢 Lucky Zonwering → 200 in 1520ms
🟢 Dashboard       → 200 in  917ms
🔴 (down-site)     → error + notificatie
```

---

## 2. Kan elke gevraagde taak? (eerlijk per onderdeel)

| Taak | Mogelijk? | Via welke API | Wat jij moet regelen |
| :-- | :-- | :-- | :-- |
| **Content maken** (caption, copy, beeld) | ✅ Ja | LLM (Gemini/Claude/OpenAI) + image-API | Alleen een AI-key. Beeld via bijv. Gemini/OpenAI images. |
| **Social plaatsen** | ✅ Ja | Meta Graph API, LinkedIn, TikTok API | App + accounttoegang per platform; review voor publish-scopes. |
| **Zoekwoordonderzoek** | ✅ Ja | Google Ads **Keyword Planner** API of DataForSEO/SEMrush | Google Ads developer token, of een SEO-data-API-key. |
| **Google Ads aanmaken** | ✅ Ja | **Google Ads API** | Developer token (approval nodig), OAuth, een MCC/manager-account. |
| **Meta Ads aanmaken** | ✅ Ja | **Meta Marketing API** | Meta-app + ad-account toegang; app-review voor ads_management. |
| **24/7 draaien** | ✅ Ja | Cloud Scheduler + Functions/Cloud Run | Firebase **Blaze**-plan (of eigen server). |
| **"Per bedrijf gefocust"** | ✅ Ja | Multi-tenant model (`companies`) | Per bedrijf: merkrichtlijnen, doelen, gekoppelde accounts. |

> Belangrijke nuance: **Google Ads** en **Meta Ads** vereisen een ontwikkelaars-/app-goedkeuring en OAuth-toegang tot de betreffende ad-accounts. Dat is eenmalig onboarden, geen technische blokkade.

---

## 3. "24/7 getraind blijven" — wat dat écht is

Je hertraint het basismodel (Gemini/Claude) **niet** zelf continu — dat is duur en niet nodig. Wat je wél bouwt, en wat in de praktijk "blijven leren" is:

1. **Feedback-loop**: na elke campagne/post sla je de resultaten op (CTR, ROAS, conversies, engagement) per bedrijf.
2. **Geheugen / RAG**: een kennisbank per bedrijf (merkstem, wat werkte, wat floppte). Agents krijgen dit als context mee → ze worden steeds beter afgestemd.
3. **Wekelijkse "leer-job"**: een agent die de resultaten analyseert en de **playbooks/prompts per bedrijf bijwerkt** (welke hoeken, zoekwoorden, doelgroepen werken).
4. **Optioneel: fine-tunen** op jouw eigen best presterende content (OpenAI/Gemini fine-tuning) als je echt een eigen "huisstijl-model" wilt.

Resultaat: de agents focussen zich automatisch steeds scherper op elk bedrijf, op basis van echte prestaties — 24/7.

---

## 4. Vangrails (belangrijk: er gaat geld om)

- **Goedkeuringswachtrij**: standaard gaan `publish` (posten/mailen) en `spend` (advertenties) eerst naar jou voor 1-klik goedkeuring. Lezen/analyseren (`read`/`internal`) mag autonoom.
- **Budgetplafonds**: `maxAdSpendPerRun` per bedrijf; de engine weigert voorstellen erboven.
- **Autonomie-standen**: `approval` (alles met goedkeuring) · `mixed` (aanrader: lezen autonoom, naar-buiten met goedkeuring) · `auto` (volledig autonoom, met plafonds).
- **Merkregels**: per bedrijf `brandNotes` die elke content-/ads-agent moet respecteren.
- **Kill switch**: agents per bedrijf aan/uit.

Zie de policy in `src/agency/engine/runner.ts` (`requiresApproval`).

---

## 5. Live zetten (deploy)

1. **Apart Firebase-project op Blaze** (pay-as-you-go) — nodig voor uitgaande API-calls + scheduler. (Het statische dashboard staat al op `dashboard-72b4b`.)
2. **Secrets** zetten (nooit in code): `GEMINI_API_KEY` (of `ANTHROPIC_API_KEY`/`OPENAI_API_KEY`), later `GOOGLE_ADS_*`, `META_ADS_ACCESS_TOKEN`, enz. Via Firebase Secret Manager.
3. **Scheduled function** die de engine tikt:
   ```ts
   import { onSchedule } from 'firebase-functions/v2/scheduler';
   import { runOnce } from '../src/agency/engine';
   import { firestoreStore } from './firestoreStore'; // jouw EngineStore-impl

   export const engineTick = onSchedule('every 15 minutes', async () => {
     const summary = await runOnce(firestoreStore, { mode: 'mixed' });
     console.log('engine tick', summary);
   });
   ```
4. **EngineStore** implementeren tegen Firestore (collections: `agentRuns`, `agentLogs`, `approvals`, `notifications`).
5. **Connectors** aanzetten zodra je API-toegang per platform hebt (zie §6).
6. **Deploy**: `firebase deploy --only functions`.

Kosten-indicatie: bij weinig verkeer kost Blaze enkele euro's/maand; de grootste post zijn LLM-calls en (uiteraard) je advertentiebudget zelf.

---

## 6. Een echte connector toevoegen

Elke agent levert een `ProposedAction` met een `payload`. Na goedkeuring roept `store.executeAction(action)` jouw connector aan. Voorbeeld-contract voor Meta Ads:

```ts
// executeAction → bij action.risk === 'spend' && payload.platform === 'meta-ads'
await metaAds.createCampaign({
  adAccountId: company.metaAdsAccountId,
  dailyBudget: action.payload.dailyBudget,
  plan: action.payload.plan,
});
```
De daadwerkelijke HTTP-calls naar Google Ads / Meta Marketing API komen hier. De rest van de machine (scheduling, brein, goedkeuring, logging) is platform-onafhankelijk en hoeft niet te veranderen.

---

## 7. Roadmap (gefaseerd, veilig)

1. **Fase 1 — Monitor (klaar):** 24/7 site/Firebase-bewaking, notificaties. *(geen risico)*
2. **Fase 2 — Inzicht autonoom:** zoekwoordonderzoek + analyse + wekelijkse rapporten, automatisch. *(alleen lezen/voorstellen)*
3. **Fase 3 — Content met goedkeuring:** posts/captions/beeld genereren → goedkeuringswachtrij → publiceren via connector.
4. **Fase 4 — Ads met goedkeuring + budgetplafond:** Google/Meta campagneopzet → jij keurt goed → connector zet live.
5. **Fase 5 — Leer-loop:** prestaties terugkoppelen, playbooks per bedrijf bijwerken (de "24/7 training").
6. **Fase 6 — Selectief autonoom:** bewezen taken op `auto` zetten binnen plafonds.

---

## 8. Wat ik van jou nodig heb om door te bouwen

- **AI-key** (Gemini heb je al; of Anthropic/OpenAI) → zet content/keywords/ads-agents van "fallback" naar echt.
- **Blaze-project** (apart) → 24/7 draaien + scheduler.
- **Per platform toegang** wanneer we die fase bereiken: Google Ads (developer token + OAuth + MCC), Meta (app + ad-account + review), social accounts.
- **Per bedrijf**: merkrichtlijnen, doelen, budgetplafonds, en welke acties autonoom mogen.

Zodra je per fase de toegang aanlevert, koppel ik de echte connector — de machine eromheen staat al.
