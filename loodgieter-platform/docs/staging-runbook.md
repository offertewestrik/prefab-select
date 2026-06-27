# Staging-runbook — Loodgieterplatform.nl

Praktische stap-voor-stap test om te bewijzen dat staging live werkt. Werk van
boven naar beneden. Elke test heeft: **URL · actie · verwachte status · UI · bij
fout**. Vul `BASE` en `CRON` in en plak de commando's.

```bash
export BASE="https://<jouw-staging>.vercel.app"   # of http://localhost:3000
export CRON="<CRON_SECRET>"                        # exact zoals in Vercel env
```

> Statuscodes: protected pagina's geven **307** (redirect via middleware), niet 403.
> Cron-routes geven **401** zonder secret. Stripe-webhook geeft **400** zonder geldige signature.

---

## 1. Voorbereiding (eenmalig)

| ☐ | Stap | Commando / actie | OK als |
|---|---|---|---|
| ☐ | Supabase staging-project | dashboard | `DATABASE_URL` (`:6543?pgbouncer=true`) + `DIRECT_URL` (`:5432`) bekend |
| ☐ | Env vars in Vercel (Production/Preview) | zie `mvp-launch-checklist.md` §3 | incl. `CRON_SECRET`, `AUTH_SECRET`/`NEXTAUTH_SECRET` |
| ☐ | Migraties | `DATABASE_URL=… DIRECT_URL=… pnpm --filter @repo/db migrate:deploy` | "All migrations have been successfully applied" |
| ☐ | Seed | `DATABASE_URL=… pnpm db:seed` | diensten/steden/merken/creditpakketten aangemaakt |
| ☐ | Admin-user | `DATABASE_URL=… pnpm db:create-admin` | login `admin@loodgieterplatform.nl` werkt |
| ☐ | Test-gebruikers (alleen staging) | `DATABASE_URL=… pnpm db:create-dev-users` | installateur@ + klant@ aangemaakt |

**Bij fout:** migratie faalt → check `DIRECT_URL` (poort 5432, niet pooled). Seed faalt → eerst `pnpm db:generate`.

---

## 2. Deploy controleren

| ☐ | URL | Actie | Verwacht | Bij fout |
|---|---|---|---|---|
| ☐ | — | `pnpm check` (db:generate+typecheck+lint+build) | exit 0 | fix vóór deploy |
| ☐ | `$BASE/` | `curl -I $BASE/` | **200**, homepage met "Loodgieterplatform" | build/env mist → Vercel-logs |
| ☐ | `$BASE/login` | open in browser | loginformulier | — |
| ☐ | `$BASE/admin` (uitgelogd) | `curl -sI $BASE/admin \| grep -i location` | **307** → `/login` | middleware/matcher kapot |
| ☐ | `$BASE/dashboard` (uitgelogd) | `curl -sI $BASE/dashboard` | **307** → `/login` | idem |
| ☐ | admin login | log in als admin → `/admin` | admin-navigatie zichtbaar | wachtwoord/seed |
| ☐ | installateur login | log in als installateur → `/dashboard` | vakman-dashboard | rol klopt niet |
| ☐ | cron beschermd | `curl -sI $BASE/api/cron/process-jobs` | **401** | `CRON_SECRET` ontbreekt = open → blocker |

---

## 3. Externe services testen

### 3a. OpenAI Vision (live-test)
| ☐ | URL | Actie | Verwacht | Bij fout |
|---|---|---|---|---|
| ☐ | `$BASE/admin/ai/photo-analyzer/live-test` | plak publieke image-URL, detector=cv-ketel, provider=**OpenAI**, Run | `provider: openai`, confidence, objecten | zonder key → `fallback: no_key` (verwacht, veilig) |
| ☐ | idem, provider=**Mock** | Run | `provider: mock`, geen fallback | — |

### 3b. UploadThing
| ☐ | URL | Actie | Verwacht | Bij fout |
|---|---|---|---|---|
| ☐ | `$BASE/aanvraag` → stap "Foto's" | upload jpg ≤8MB | preview verschijnt, verwijderbaar | geen `UPLOADTHING_TOKEN` / verkeerde app |
| ☐ | upload .exe/.txt | poging | geweigerd (type) | — |

### 3c. Resend
| ☐ | Actie | Verwacht | Bij fout |
|---|---|---|---|
| ☐ | doe een aanvraag (3d-worker draait) | bevestigingsmail bij klant + adminmail | `EmailLog` toont `not_sent` → key/domein niet geverifieerd |

### 3d. Job worker
| ☐ | Commando | Verwacht | Bij fout |
|---|---|---|---|
| ☐ | `curl -s -H "Authorization: Bearer $CRON" $BASE/api/cron/process-jobs` | `{"ok":true,"reaped":…,"claimed":N,"completed":N,…}` | 401 → secret; 200 met claimed=0 → geen jobs |
| ☐ | `$BASE/admin/jobs` | jobs met status COMPLETED | FAILED → bekijk `error` + retry |

### 3e. Stripe (test-mode)
| ☐ | URL/actie | Verwacht | Bij fout |
|---|---|---|---|
| ☐ | `$BASE/dashboard/credits` → koop pakket | Stripe checkout (testkaart `4242 4242 4242 4242`) | publishable key mist |
| ☐ | na betaling | creditsaldo bijgeschreven | webhook niet geregistreerd |
| ☐ | webhook handmatig | `stripe listen --forward-to $BASE/api/webhooks/stripe` + `stripe trigger checkout.session.completed` | 200; saldo **niet** dubbel | sig → `STRIPE_WEBHOOK_SECRET` |
| ☐ | webhook zonder signature | `curl -s -o /dev/null -w "%{http_code}" -X POST $BASE/api/webhooks/stripe` | **400** | — |

---

## 4. Complete klantflow (end-to-end)

Doe dit als 3 personas: **klant** (anoniem), **installateur**, **admin**.

| ☐ | Stap | URL/actie | Verwacht status + UI | Bij fout |
|---|---|---|---|---|
| ☐ | Aanvraag | `$BASE/aanvraag` wizard volledig invullen + 1–2 foto's | redirect **/bedankt** | validatiefout → check verplichte velden |
| ☐ | Jobs aangemaakt | `$BASE/admin/jobs` | `lead.enrich_ai`, `lead.notify_matches`, `email.send` ×2, `photo.analyze` (PENDING) | geen jobs → enqueue-fout |
| ☐ | Worker | `curl -H "Authorization: Bearer $CRON" $BASE/api/cron/process-jobs` (1–2×) | jobs → COMPLETED | retry vanuit `/admin/jobs` |
| ☐ | AI-analyse | `$BASE/admin/leads` | lead met foto-analyse status/risico/confidence | PENDING blijft → worker draait niet |
| ☐ | Lead aangeboden | installateur `/dashboard/leads` | lead zichtbaar, klantgegevens **gemaskeerd** | niet zichtbaar → matching/credits |
| ☐ | Lead kopen | klik "Koop lead" | credits afgeschreven, gegevens **vrijgegeven**, foto's + analyse zichtbaar | te weinig credits → eerst opwaarderen |
| ☐ | Offerte maken | `/dashboard/leads/[id]/offerte` (evt. "AI-offertevoorstel") | concept (DRAFT) editor | — |
| ☐ | Offerte versturen | "Versturen naar klant" | status SENT, token-link gegenereerd | geen klant-e-mail → check `validUntil`/email |
| ☐ | Klant accepteert | open `/offertes/[id]?token=…` → Accepteren | status ACCEPTED + review-uitnodiging | token ongeldig → opnieuw versturen |
| ☐ | Review plaatsen | `/reviews/[token]` invullen | "wordt na controle geplaatst" (PENDING) | — |
| ☐ | Modereren | admin `/admin/reviews` → Goedkeuren | review publiek op vakmanprofiel | — |
| ☐ | Admin overzicht | `/admin` (leads, aankopen, betalingen, reviews, jobs, AI) | alles consistent | — |

---

## 5. Security tests

| ☐ | Test | Commando / actie | Verwacht | Bij fout = BLOCKER |
|---|---|---|---|---|
| ☐ | Locked lead lekt geen PII | als installateur **zonder** aankoop: open lead-detail; `view-source` | geen e-mail/telefoon/adres/foto's in HTML | 🔴 stop livegang |
| ☐ | Verkeerde rol | klant/installateur opent `$BASE/admin` | **307** → `/` | 🔴 |
| ☐ | Uitgelogd op dashboard | `curl -sI $BASE/dashboard` | **307** → `/login` | 🔴 |
| ☐ | Cron zonder secret | `curl -s -o /dev/null -w "%{http_code}" $BASE/api/cron/process-jobs` | **401** | 🔴 |
| ☐ | Cron fout secret | `curl ... -H "Authorization: Bearer fout"` | **401** | 🔴 |
| ☐ | Webhook dubbel | `stripe trigger checkout.session.completed` 2× met zelfde event | saldo **één keer** bijgeschreven (`StripeEvent` uniek) | 🔴 |
| ☐ | Niet-goedgekeurde vakman | maak vakman met status ≠ APPROVED; doe aanvraag in zijn regio | krijgt **geen** lead-aanbod; niet zichtbaar op `/vakmannen` | 🔴 |
| ☐ | Geen PII in AI-logs | `/admin/ai` → photo-analyzer logs | `inputSummary` zonder e-mail/telefoon | 🔴 |

---

## 6. Verwachte resultaten — snel naslag

| Route | Zonder auth/secret | Met auth/secret |
|---|---|---|
| `/` | 200 | 200 |
| `/admin`, `/dashboard` | 307 → /login | 200 (juiste rol) / 307 → / (verkeerde rol) |
| `/api/cron/*` | 401 | 200 `{ ok: true }` |
| `/api/webhooks/stripe` (POST) | 400 (geen/ongeldige signature) | 200 (geldige signature) |
| `/offertes/[id]` | "Geen toegang" zonder geldig token | offerte met geldig token/eigenaar/admin |

---

## 7. Go / No-Go

**✅ GO** — alle 🔴 in §5 groen **én**:
- §2 deploy: homepage 200, admin+installateur login, cron 401 zonder secret.
- §4 volledige flow doorlopen t/m review-moderatie.
- §3d worker verwerkt jobs (Vercel Pro/scheduler actief voor `*/5`).
- §3e Stripe testbetaling schrijft saldo één keer bij.
- `pnpm check` groen op de release-commit.

**⛔ NO-GO** — als één van deze rood is:
- PII lekt op een locked lead.
- Cron-routes open (geen `CRON_SECRET`) → queue/security kapot.
- Verkeerde rol komt in `/admin` of `/dashboard`.
- Stripe-webhook schrijft dubbel bij of betaling komt niet aan.
- Niet-goedgekeurde vakman ontvangt leads of is publiek zichtbaar.
- Build/typecheck/lint rood.

> 🟡 E-mail (`not_sent`), AI op mock, geen Redis (rate limits open) en geen
> Mapbox zijn **geen** no-go: het platform werkt, maar noteer ze als bekend en
> activeer zo snel mogelijk.
