# Loodgieterplatform.nl — MVP launch-checklist & staging-testplan

Doel: bewijzen dat het platform écht live kan. Werk dit document **van boven naar
beneden** af op een staging-omgeving (eigen Supabase-project + Vercel preview),
en pas daarna op productie. Vink af; noteer afwijkingen.

Legenda: ☐ = te doen · 🔴 = blocker (must) · 🟡 = belangrijk · 🟢 = nice-to-have.

---

## 1. Supabase database

| ☐ | Item | Hoe / commando | Prio |
|---|---|---|---|
| ☐ | Staging-project aangemaakt (apart van productie) | Supabase dashboard | 🔴 |
| ☐ | `DATABASE_URL` = pooled (PgBouncer, :6543, `?pgbouncer=true`) | env | 🔴 |
| ☐ | `DIRECT_URL` = directe connectie (:5432) | env (alleen migraties) | 🔴 |
| ☐ | Migraties toegepast | `DATABASE_URL=… DIRECT_URL=… pnpm --filter @repo/db migrate:deploy` | 🔴 |
| ☐ | Prisma-client gegenereerd in build | `pnpm db:generate` (zit in `check`) | 🔴 |
| ☐ | Basis-seed (diensten, steden, merken, creditpakketten) | `pnpm db:seed` | 🔴 |
| ☐ | Admin-user aangemaakt | `pnpm db:create-admin` | 🔴 |
| ☐ | Test-installateur + test-klant (alleen staging) | `pnpm db:create-dev-users` | 🟡 |
| ☐ | Backups/PITR aan op productie | Supabase settings | 🟡 |

> **Let op:** `migrate:deploy` (niet `migrate dev`) op staging/productie. De
> dev-user-scripts gebruiken vaste dev-wachtwoorden → **nooit op productie** draaien.

---

## 2. Vercel deployment

| ☐ | Item | Detail | Prio |
|---|---|---|---|
| ☐ | Project gekoppeld aan repo, root = `loodgieter-platform` | Monorepo (pnpm + turbo) | 🔴 |
| ☐ | Build command | `pnpm build` (turbo) — vereist `DATABASE_URL` bij build (SSG `generateStaticParams`) | 🔴 |
| ☐ | Install command | `pnpm install` | 🔴 |
| ☐ | Output: Next.js app `apps/web` | — | 🔴 |
| ☐ | Alle env vars gezet (zie §3) als **Secret**, scope Production/Preview | — | 🔴 |
| ☐ | Cron jobs actief (`apps/web/vercel.json`) | zie hieronder | 🔴 |
| ☐ | Productie-domein + `www`-redirect | DNS via Cloudflare | 🟡 |
| ☐ | `NEXT_PUBLIC_SITE_URL` = echte domein | env | 🔴 |

**Cron jobs (staan in `apps/web/vercel.json`):**
| Pad | Schema | Functie |
|---|---|---|
| `/api/cron/process-jobs` | `*/5 * * * *` | verwerkt queue (AI, e-mail, matching, photo.analyze) + reaper |
| `/api/cron/reap-jobs` | `*/15 * * * *` | herstelt vastgelopen RUNNING-jobs |
| `/api/cron/expire-quotes` | `0 3 * * *` | SENT-offertes → EXPIRED |
| `/api/cron/ai-daily-report` | `0 6 * * *` | Admin AI dagrapport |
| `/api/cron/cleanup-uploads` | `0 4 * * *` | verweesde uploads opruimen |

> **Vercel Hobby draait crons alleen dagelijks.** Voor near-realtime
> queue-verwerking (`*/5`) is **Vercel Pro** of een externe scheduler nodig
> (anders blijven `photo.analyze`/e-mail-jobs tot 24u hangen). 🔴 voor beta.

---

## 3. Externe services & secrets

| ☐ | Variabele | Service | Zonder → gedrag | Prio |
|---|---|---|---|---|
| ☐ | `AUTH_SECRET` / `NEXTAUTH_SECRET` | Auth.js | login werkt niet | 🔴 |
| ☐ | `CRON_SECRET` | cron-beveiliging | **alle cron-routes geven 401** (queue draait niet) | 🔴 |
| ☐ | `DATABASE_URL` + `DIRECT_URL` | Supabase | — | 🔴 |
| ☐ | `NEXT_PUBLIC_SITE_URL` | links/canonicals/e-mail | foute links | 🔴 |
| ☐ | `STRIPE_SECRET_KEY` | Stripe | credits kopen werkt niet | 🔴 |
| ☐ | `STRIPE_WEBHOOK_SECRET` | Stripe webhook | betaling wordt niet bijgeschreven | 🔴 |
| ☐ | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe checkout | — | 🔴 |
| ☐ | `RESEND_API_KEY` | Resend | e-mails `not_sent` (EmailLog) | 🟡 |
| ☐ | `RESEND_SENDER_EMAIL` (geverifieerd domein) | Resend | spam/bounce | 🟡 |
| ☐ | `CONTACT_RECEIVER_EMAIL` | admin-mails | — | 🟡 |
| ☐ | `UPLOADTHING_TOKEN` | UploadThing | foto-upload + cleanup uit | 🟡 |
| ☐ | `OPENAI_API_KEY` | OpenAI (agents + vision) | AI valt terug op mock | 🟡 |
| ☐ | `AI_PROVIDER=openai` | AI Command Center | agents draaien mock | 🟡 |
| ☐ | `PHOTO_AI_PROVIDER=openai` | Photo Analyzer | vision draait mock | 🟡 |
| ☐ | `OPENAI_VISION_MODEL` / `OPENAI_VISION_TIMEOUT_MS` | vision | defaults gpt-4o-mini / 30s | 🟢 |
| ☐ | `UPSTASH_REDIS_REST_URL` + `_TOKEN` | rate limiting / lead-lock | rate limits staan **open** (dev = altijd toegestaan) | 🟡 |
| ☐ | `NEXT_PUBLIC_MAPBOX_TOKEN` | werkgebiedkaart | kaart-fallback (tekst) | 🟢 |
| ☐ | `TURNSTILE_SECRET_KEY` + `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | anti-spam | geen captcha | 🟢 |

> **Belangrijk:** `CRON_SECRET` en `AI_PROVIDER` zijn toegevoegd aan
> `.env.example`. Zet `CRON_SECRET` ook op Vercel vóór livegang — zonder dit
> geven alle cron-routes 401 en draait de queue niet.

**Stripe webhook:** endpoint `POST /api/webhooks/stripe` in het Stripe-dashboard
registreren; events `checkout.session.completed` / `payment_intent.succeeded`;
`STRIPE_WEBHOOK_SECRET` kopiëren. Idempotent via uniek `StripeEvent`-record.

---

## 4. End-to-end testplan (staging)

Doorloop de volledige keten en vink elke stap af.

| ☐ | Stap | Verwacht resultaat |
|---|---|---|
| ☐ | Klant doet aanvraag op `/aanvraag` (wizard) | lead aangemaakt, redirect `/bedankt` |
| ☐ | Foto's uploaden (stap "Foto's", jpg/png ≤8MB, max 8) | previews, verwijderbaar, mee verzonden |
| ☐ | Na submit: jobs aangemaakt | `lead.enrich_ai`, `lead.notify_matches`, 2× `email.send`, `photo.analyze` (PENDING) |
| ☐ | Worker draait (`/api/cron/process-jobs` met secret) | jobs COMPLETED; lead krijgt AI-analyse + prijsindicatie + fraudescore |
| ☐ | AI foto-analyse | `PhotoAnalysis` COMPLETED, provider openai/mock, objecten opgeslagen |
| ☐ | Installateur ziet aangeboden lead in dashboard | klantgegevens **locked** (gemaskeerd) |
| ☐ | Installateur koopt lead (credits) | credits afgeschreven, lead **unlocked**, foto's + analyse zichtbaar |
| ☐ | Credits opwaarderen via Stripe | checkout → webhook → saldo bijgeschreven (één keer) |
| ☐ | Offerte maken (editor) + AI-voorstel | concept (DRAFT) gevuld, controleerbaar |
| ☐ | Offerte versturen | status SENT, klant krijgt token-link `/offertes/[id]?token=…` |
| ☐ | Klant accepteert offerte | status ACCEPTED; review-uitnodiging |
| ☐ | Review plaatsen via token | PENDING → admin keurt goed → publiek zichtbaar |
| ☐ | Installateur reageert op review | reply PENDING → admin approve → publiek |
| ☐ | Offerte verloopt (validUntil < nu, cron) | status EXPIRED, niet meer accepteerbaar |
| ☐ | Admin ziet alles | leads, aankopen, betalingen, reviews, jobs, AI-dashboards |
| ☐ | `/vakmannen` zoeken/filteren/afstand | alleen APPROVED+publicVisible vakmannen |

---

## 5. Security checks

| ☐ | Check | Bewijs |
|---|---|---|
| ☐ | **Geen PII vóór aankoop** | locked lead toont gemaskeerde naam; e-mail/telefoon/adres niet in HTML/JSON |
| ☐ | **Locked lead blijft locked** | installateur zonder aankoop: geen contact, geen foto's, geen analyse |
| ☐ | **Geen PII in AI-logs** | `AiInvocation.inputSummary` bevat geen e-mail/telefoon; prompt naar OpenAI alleen image-URL + dienst |
| ☐ | **Rollen werken** | `/admin/*` alleen ADMIN; `/dashboard/*` alleen INSTALLER; klant ziet alleen veilige tekst |
| ☐ | **Stripe webhook idempotent** | dubbele event → saldo één keer bijgeschreven (`StripeEvent` uniek) |
| ☐ | **Cron beveiligd** | alle `/api/cron/*` → 401 zonder `CRON_SECRET` |
| ☐ | **Tokens gehasht** | wachtwoordreset/e-mailverificatie: alleen SHA-256-hash in DB, single-use |
| ☐ | **Reviews/replies modereren** | PENDING/REJECTED/HIDDEN nooit publiek |
| ☐ | **Photo-heranalyse-gate** | alleen admin of gekochte installateur; force-provider alleen admin |
| ☐ | **Upload rate limit** | server-side per IP op publieke `leadPhoto`-route (vereist Redis) |
| ☐ | **Geen geheime keys client-side** | alleen `NEXT_PUBLIC_*` in de browser |

---

## 6. Go / No-Go — wat moet 100% vóór beta

**🔴 No-go als één hiervan faalt:**
1. Migraties + seed toegepast; admin-login werkt.
2. `AUTH_SECRET`/`NEXTAUTH_SECRET` + `CRON_SECRET` gezet → login + cron werken.
3. Volledige keten werkt: aanvraag → matching → lead kopen (credits) → offerte → accepteren.
4. Stripe live: credits kopen schrijft saldo bij via idempotente webhook.
5. PII-bescherming: locked lead lekt geen contactgegevens.
6. Rollen: admin/installateur/klant strikt gescheiden.
7. Queue draait écht (Vercel Pro of externe scheduler voor `*/5`).
8. `pnpm lint && pnpm typecheck && pnpm build` groen op de release-commit.

**🟡 Sterk aanbevolen (mag met work-around live):**
- Resend geverifieerd domein (anders e-mails `not_sent`, flow werkt wel).
- UploadThing-token (anders geen foto-upload).
- Redis/Upstash (anders rate limits open).
- OpenAI live (anders AI = mock; functioneel maar niet "echt").

**🟢 Mag na beta:**
- Mapbox-token (kaart valt terug op tekst), Turnstile (captcha), extra
  Vision-providers, realtime notificatie-bel, login-gate op e-mailverificatie.

---

## 7. Release-commando's (samengevat)

```bash
# Kwaliteitspoort (op de release-commit):
pnpm db:generate && pnpm typecheck && pnpm lint && pnpm build   # == pnpm check

# DB klaarzetten (staging/productie):
DATABASE_URL=… DIRECT_URL=… pnpm --filter @repo/db migrate:deploy
DATABASE_URL=… pnpm db:seed
DATABASE_URL=… pnpm db:create-admin

# Smoke na deploy:
curl -H "Authorization: Bearer $CRON_SECRET" https://<domein>/api/cron/process-jobs
# → {"ok":true,...}
```

---

## 8. Bekende beperkingen (transparant vóór beta)

- Crons op Vercel Hobby zijn dagelijks → queue niet near-realtime.
- AI (agents + vision) draait op mock zonder keys (veilige fallback, geen crash).
- E-mails worden gelogd als `not_sent` zonder `RESEND_API_KEY`.
- Rate limits staan open zonder Redis.
- Live OpenAI/UploadThing/Stripe end-to-end is nog niet in deze omgeving
  gedraaid (geen keys); gebruik `/admin/ai/photo-analyzer/live-test` en de
  Stripe test-mode om dit op staging te bevestigen.
