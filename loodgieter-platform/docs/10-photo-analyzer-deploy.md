# Photo Analyzer — productie-/deploy-checklist (Fase 22)

Doel: de AI Photo Analyzer live laten draaien met **echte OpenAI Vision**,
**UploadThing** en de **job queue**. Zonder correcte env valt alles veilig terug
op de MockProvider (geen crashes, status blijft `COMPLETED`).

## 1. Benodigde environment variables

| Variabele | Verplicht voor live | Default / fallback | Waar |
|---|---|---|---|
| `PHOTO_AI_PROVIDER` | ja (`openai`) | leeg → **mock** | server |
| `OPENAI_API_KEY` | ja | leeg → fallback mock (`no_key`) | server (geheim) |
| `OPENAI_VISION_MODEL` | nee | `gpt-4o-mini` | server |
| `OPENAI_VISION_TIMEOUT_MS` | nee | `30000` | server |
| `UPLOADTHING_TOKEN` | ja (upload + orphan-cleanup) | leeg → upload werkt niet / cleanup `skipped` | server (geheim) |
| `CRON_SECRET` | ja (workers/cron) | leeg → cron-routes geven **401** | server (geheim) |
| `DATABASE_URL` | ja | — | server (geheim) |
| `NEXT_PUBLIC_SITE_URL` | ja | — | client+server |

> Geen enkele sleutel is `NEXT_PUBLIC_*`. De OpenAI/UploadThing-keys verlaten de
> server nooit.

## 2. Lokaal valideren

```bash
# 1. Zet env (NIET committen):
cp .env.example .env.local   # vul OPENAI_API_KEY, UPLOADTHING_TOKEN, CRON_SECRET
echo 'PHOTO_AI_PROVIDER=openai' >> .env.local

# 2. DB + client
pnpm db:generate

# 3. Kwaliteit
pnpm lint && pnpm typecheck && pnpm build

# 4. Start en test
pnpm --filter @repo/web start   # of: next start
# → /admin/ai/photo-analyzer/live-test : plak een publieke image-URL, force=OpenAI
# → verwacht providerUsed=openai (met key) of fallback=no_key (zonder key)

# 5. Worker handmatig draaien (verwerkt photo.analyze-jobs):
curl -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/process-jobs
```

## 3. Vercel

1. **Environment Variables** (Project → Settings → Environment Variables), scope
   *Production* (en *Preview* indien gewenst):
   - `PHOTO_AI_PROVIDER=openai`
   - `OPENAI_API_KEY=…` (Secret)
   - `OPENAI_VISION_MODEL=gpt-4o-mini` (optioneel)
   - `OPENAI_VISION_TIMEOUT_MS=30000` (optioneel)
   - `UPLOADTHING_TOKEN=…` (Secret)
   - `CRON_SECRET=…` (Secret) — Vercel Cron stuurt dit automatisch als
     `Authorization: Bearer <CRON_SECRET>`.
   - `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL`, `AUTH_SECRET`/`NEXTAUTH_SECRET`.
2. **Crons** staan in `apps/web/vercel.json`:
   - `/api/cron/process-jobs` (`*/5 * * * *`) — verwerkt o.a. `photo.analyze`.
   - `/api/cron/reap-jobs` (`*/15 * * * *`) — herstelt vastgelopen jobs.
   - `/api/cron/cleanup-uploads` (`0 4 * * *`) — `photo.cleanup_orphans`.
   > Op Vercel Hobby draaien crons dagelijks; voor near-realtime verwerking is
   > Vercel Pro of een externe scheduler nodig.
3. **UploadThing**: token koppelen aan dezelfde app als waar `leadPhoto`-uploads
   heen gaan; anders kan de orphan-cleanup de bestanden niet vinden.
4. **Deploy** → controleer `/admin/ai/photo-analyzer`: provider toont `openai`,
   model klopt, fallback-count blijft laag.

## 4. Productie-rooktest (echte flow)

1. Doe een aanvraag op `/aanvraag` met 1–2 foto's (stap "Foto's").
2. Lead wordt aangemaakt → `photo.analyze`-job met status `PENDING`.
3. Wacht op de worker-cron (of trigger `/api/cron/process-jobs` met secret).
4. Koop de lead als installateur → lead-detail toont foto's + analyse
   (provider OpenAI/Mock, confidence, objecten, risico, prijsindicatie).
5. Admin → `/admin/ai/photo-analyzer`: zie provider-breakdown, fallback-count,
   gemiddelde confidence, en de analyse in de lijst.

## 5. Veiligheidsgaranties (in code afgedwongen)

- Geen API-key naar de client; providers draaien alleen server-side.
- Geen PII in prompt/logs: alleen image-URL + detector-context naar OpenAI;
  `AiInvocation.inputSummary` bevat enkel detector + aantal.
- Max 8 afbeeldingen, 8 MB elk; timeout via `AbortController`.
- Bij no_key/timeout/invalid_json (na 1 repair-pass)/rate_limit/provider_error
  → **veilige fallback naar mock**; `rawResponse.fallbackReason` + zichtbaar in admin.
- Heranalyse alleen voor admin of gekochte installateur; rate limit op de
  publieke `leadPhoto`-route; orphan-cleanup raakt gekoppelde leadfoto's nooit.

## 6. Rollback

Zet `PHOTO_AI_PROVIDER=mock` (of verwijder `OPENAI_API_KEY`) → alles blijft
werken op de MockProvider, zonder externe calls.
