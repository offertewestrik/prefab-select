-- ALLE migraties — plak in Supabase SQL Editor → RUN. Veilig om te herhalen.

-- >>> 0001_phase2_quotes.sql

-- ============================================================================
-- Prefab Select CRM — Fase 2: offertes
-- Migratie: quotes, quote_items, quote_email_logs (+ minimale leads-tabel)
-- ----------------------------------------------------------------------------
-- Draai dit in de Supabase SQL editor of via `supabase db push`.
-- De leads-tabel wordt hier minimaal aangemaakt zodat de foreign keys werken;
-- de volledige leads-uitwerking volgt in een latere fase.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Leads (minimaal — alleen wat offertes nodig hebben)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  naam        text not null,
  email       text,
  telefoon    text,
  adres       text,
  postcode    text,
  plaats      text,
  stage       text not null default 'nieuwe_lead',
  source      text,
  product     text,
  waarde      numeric default 0,
  created_at  timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Offertes
-- ---------------------------------------------------------------------------
create table if not exists public.quotes (
  id                  uuid primary key default gen_random_uuid(),
  nummer              text not null unique,
  lead_id             uuid not null references public.leads(id) on delete cascade,
  status              text not null default 'concept'
                        check (status in ('concept','verstuurd','bekeken','geaccepteerd','afgewezen','verlopen')),
  projecttype         text,
  projectomschrijving text,
  afmetingen          text,
  werkzaamheden       text,
  korting             numeric not null default 0,
  notitie             text,
  voorwaarden         text,
  geldig_tot          date,
  verstuurd_op        timestamptz,
  bekeken_op          timestamptz,
  beslist_op          timestamptz,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);
create index if not exists quotes_lead_id_idx on public.quotes(lead_id);
create index if not exists quotes_status_idx  on public.quotes(status);

-- ---------------------------------------------------------------------------
-- Offerteregels (prijsregels)
-- ---------------------------------------------------------------------------
create table if not exists public.quote_items (
  id              uuid primary key default gen_random_uuid(),
  quote_id        uuid not null references public.quotes(id) on delete cascade,
  omschrijving    text not null,
  aantal          numeric not null default 1,
  eenheid         text not null default 'stuks',
  prijs_per_stuk  numeric not null default 0,
  btw_percentage  numeric not null default 21,
  positie         int not null default 0
);
create index if not exists quote_items_quote_id_idx on public.quote_items(quote_id);

-- ---------------------------------------------------------------------------
-- E-maillogs (verzendgeschiedenis van offertes)
-- ---------------------------------------------------------------------------
create table if not exists public.quote_email_logs (
  id          uuid primary key default gen_random_uuid(),
  quote_id    uuid not null references public.quotes(id) on delete cascade,
  naar        text not null,
  onderwerp   text not null,
  status      text not null default 'verzonden' check (status in ('verzonden','mislukt')),
  message_id  text,
  mock        boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists quote_email_logs_quote_id_idx on public.quote_email_logs(quote_id);

-- ---------------------------------------------------------------------------
-- updated_at automatisch bijwerken op quotes
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists quotes_set_updated_at on public.quotes;
create trigger quotes_set_updated_at
  before update on public.quotes
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security — alleen ingelogde teamleden (Supabase Auth)
-- ---------------------------------------------------------------------------
alter table public.leads             enable row level security;
alter table public.quotes            enable row level security;
alter table public.quote_items       enable row level security;
alter table public.quote_email_logs  enable row level security;

drop policy if exists "team full access leads" on public.leads;
drop policy if exists "team full access quotes" on public.quotes;
drop policy if exists "team full access quote_items" on public.quote_items;
drop policy if exists "team full access quote_email_logs" on public.quote_email_logs;

create policy "team full access leads"
  on public.leads for all to authenticated using (true) with check (true);
create policy "team full access quotes"
  on public.quotes for all to authenticated using (true) with check (true);
create policy "team full access quote_items"
  on public.quote_items for all to authenticated using (true) with check (true);
create policy "team full access quote_email_logs"
  on public.quote_email_logs for all to authenticated using (true) with check (true);


-- >>> 0002_phase3_planning.sql

-- ============================================================================
-- Prefab Select CRM — Fase 3: planning, agenda, taken & notificaties
-- Migratie: users, calendars, appointments, tasks, task_comments, notifications
-- ----------------------------------------------------------------------------
-- Bouwt voort op 0001_phase2_quotes.sql (leads & quotes bestaan al).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Medewerkers (gekoppeld aan Supabase Auth via auth_user_id)
-- ---------------------------------------------------------------------------
create table if not exists public.users (
  id              uuid primary key default gen_random_uuid(),
  auth_user_id    uuid unique references auth.users(id) on delete set null,
  naam            text not null,
  email           text unique not null,
  rol             text not null default 'verkoop'
                    check (rol in ('eigenaar','verkoop','werkvoorbereiding','administratie')),
  kleur           text not null default '#2563eb',
  google_connected boolean not null default false,
  created_at      timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Gekoppelde agenda's (Google Calendar per medewerker)
-- ---------------------------------------------------------------------------
create table if not exists public.calendars (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references public.users(id) on delete cascade,
  provider      text not null default 'google',
  external_id   text,
  connected     boolean not null default false,
  last_sync     timestamptz,
  created_at    timestamptz not null default now()
);
create index if not exists calendars_user_id_idx on public.calendars(user_id);

-- ---------------------------------------------------------------------------
-- Afspraken
-- ---------------------------------------------------------------------------
create table if not exists public.appointments (
  id              uuid primary key default gen_random_uuid(),
  titel           text not null,
  type            text not null default 'overig'
                    check (type in ('telefonisch','offertebespreking','inmeten','adviesgesprek','werkvoorbereiding','plaatsing','oplevering','overig')),
  start_tijd      timestamptz not null,
  eind_tijd       timestamptz not null,
  lead_id         uuid references public.leads(id) on delete set null,
  quote_id        uuid references public.quotes(id) on delete set null,
  medewerker_id   uuid references public.users(id) on delete set null,
  locatie         text,
  omschrijving    text,
  google_event_id text,
  google_synced   boolean not null default false,
  created_at      timestamptz not null default now()
);
create index if not exists appointments_medewerker_idx on public.appointments(medewerker_id);
create index if not exists appointments_lead_idx on public.appointments(lead_id);
create index if not exists appointments_start_idx on public.appointments(start_tijd);

-- ---------------------------------------------------------------------------
-- Taken
-- ---------------------------------------------------------------------------
create table if not exists public.tasks (
  id              uuid primary key default gen_random_uuid(),
  titel           text not null,
  omschrijving    text,
  prioriteit      text not null default 'normaal' check (prioriteit in ('laag','normaal','hoog')),
  status          text not null default 'open' check (status in ('open','bezig','wachten','gereed')),
  deadline        timestamptz,
  medewerker_id   uuid references public.users(id) on delete set null,
  lead_id         uuid references public.leads(id) on delete set null,
  quote_id        uuid references public.quotes(id) on delete set null,
  project_id      uuid,
  reminder_minuten integer,
  created_at      timestamptz not null default now()
);
create index if not exists tasks_medewerker_idx on public.tasks(medewerker_id);
create index if not exists tasks_status_idx on public.tasks(status);

-- ---------------------------------------------------------------------------
-- Reacties op taken
-- ---------------------------------------------------------------------------
create table if not exists public.task_comments (
  id          uuid primary key default gen_random_uuid(),
  task_id     uuid not null references public.tasks(id) on delete cascade,
  auteur_id   uuid references public.users(id) on delete set null,
  tekst       text not null,
  created_at  timestamptz not null default now()
);
create index if not exists task_comments_task_idx on public.task_comments(task_id);

-- ---------------------------------------------------------------------------
-- Notificaties
-- ---------------------------------------------------------------------------
create table if not exists public.notifications (
  id            uuid primary key default gen_random_uuid(),
  type          text not null check (type in ('nieuwe_lead','nieuwe_afspraak','offerte_geaccepteerd','taak_verlopen')),
  titel         text not null,
  tekst         text not null,
  link          text,
  gelezen       boolean not null default false,
  voor_user_id  uuid references public.users(id) on delete cascade,
  created_at    timestamptz not null default now()
);
create index if not exists notifications_user_idx on public.notifications(voor_user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security — alleen ingelogde teamleden
-- ---------------------------------------------------------------------------
alter table public.users           enable row level security;
alter table public.calendars       enable row level security;
alter table public.appointments    enable row level security;
alter table public.tasks           enable row level security;
alter table public.task_comments   enable row level security;
alter table public.notifications   enable row level security;

do $$
declare t text;
begin
  foreach t in array array['users','calendars','appointments','tasks','task_comments','notifications']
  loop
    execute format('drop policy if exists "team full access %1$s" on public.%1$s;', t);
    execute format('create policy "team full access %1$s" on public.%1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;


-- >>> 0003_phase4_analytics.sql

-- ============================================================================
-- Prefab Select CRM — Fase 4: management, marketing & analytics
-- Migratie: marketing_campaigns, analytics_events, lead_sources,
--           dashboard_metrics, revenue_reports
-- ----------------------------------------------------------------------------
-- Bouwt voort op fase 2 & 3. Bevat de tabellen waarin de echte koppelingen
-- (Meta Marketing API, Google Analytics Data API, Search Console) data wegschrijven.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Marketingcampagnes (gesynchroniseerd vanuit Meta / Google Ads)
-- ---------------------------------------------------------------------------
create table if not exists public.marketing_campaigns (
  id              uuid primary key default gen_random_uuid(),
  bron            text not null default 'meta' check (bron in ('meta','google_ads')),
  externe_id      text,
  naam            text not null,
  projecttype     text,
  status          text not null default 'actief',
  kosten          numeric not null default 0,
  bereik          bigint not null default 0,
  klikken         bigint not null default 0,
  leads           integer not null default 0,
  periode_start   date,
  periode_eind    date,
  laatst_gesynct  timestamptz,
  created_at      timestamptz not null default now()
);
create index if not exists marketing_campaigns_bron_idx on public.marketing_campaigns(bron);

-- ---------------------------------------------------------------------------
-- Analytics events (GA4 / Search Console / configurator)
-- ---------------------------------------------------------------------------
create table if not exists public.analytics_events (
  id            uuid primary key default gen_random_uuid(),
  bron          text not null check (bron in ('ga4','search_console','configurator','website')),
  event_naam    text not null,
  pad           text,
  kanaal        text,
  waarde        numeric,
  aantal        integer not null default 1,
  datum         date not null default current_date,
  metadata      jsonb,
  created_at    timestamptz not null default now()
);
create index if not exists analytics_events_bron_datum_idx on public.analytics_events(bron, datum);

-- ---------------------------------------------------------------------------
-- Leadbronnen (geaggregeerd per kanaal)
-- ---------------------------------------------------------------------------
create table if not exists public.lead_sources (
  id              uuid primary key default gen_random_uuid(),
  kanaal          text not null check (kanaal in ('website','configurator','meta_ads','google_ads','organisch','telefonisch')),
  periode_start   date not null,
  periode_eind    date not null,
  leads           integer not null default 0,
  gewonnen        integer not null default 0,
  omzet           numeric not null default 0,
  created_at      timestamptz not null default now()
);
create index if not exists lead_sources_kanaal_idx on public.lead_sources(kanaal);

-- ---------------------------------------------------------------------------
-- Dashboard metrics (snapshots van KPI's voor realtime/historie)
-- ---------------------------------------------------------------------------
create table if not exists public.dashboard_metrics (
  id            uuid primary key default gen_random_uuid(),
  metric        text not null,
  waarde        numeric not null,
  eenheid       text,
  datum         date not null default current_date,
  created_at    timestamptz not null default now()
);
create index if not exists dashboard_metrics_metric_datum_idx on public.dashboard_metrics(metric, datum);

-- ---------------------------------------------------------------------------
-- Omzetrapporten (gegenereerde periodieke rapporten)
-- ---------------------------------------------------------------------------
create table if not exists public.revenue_reports (
  id            uuid primary key default gen_random_uuid(),
  type          text not null check (type in ('dagelijks','wekelijks','maandelijks')),
  periode_start date not null,
  periode_eind  date not null,
  totaal_omzet  numeric not null default 0,
  data          jsonb,        -- volledige rapport-payload (kpis, leadbronnen, ...)
  pdf_url       text,
  created_at    timestamptz not null default now()
);
create index if not exists revenue_reports_type_idx on public.revenue_reports(type);

-- ---------------------------------------------------------------------------
-- Row Level Security — alleen ingelogde teamleden
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['marketing_campaigns','analytics_events','lead_sources','dashboard_metrics','revenue_reports']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "team full access %1$s" on public.%1$s;', t);
    execute format('create policy "team full access %1$s" on public.%1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;


-- >>> 0004_phase5_facturen_portaal.sql

-- ============================================================================
-- Prefab Select CRM — Fase 5: facturen, betalingen & klantportaal
-- Migratie: invoices, invoice_items, payments, portal_tokens
-- ----------------------------------------------------------------------------
-- Bouwt voort op fase 2 & 3 (leads, quotes).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Facturen
-- ---------------------------------------------------------------------------
create table if not exists public.invoices (
  id              uuid primary key default gen_random_uuid(),
  nummer          text not null unique,
  lead_id         uuid not null references public.leads(id) on delete cascade,
  quote_id        uuid references public.quotes(id) on delete set null,
  status          text not null default 'concept'
                    check (status in ('concept','verzonden','deels_betaald','betaald','te_laat','gecrediteerd')),
  termijn_label   text,
  korting         numeric not null default 0,
  vervaldatum     date,
  notitie         text,
  verstuurd_op    timestamptz,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
create index if not exists invoices_lead_idx on public.invoices(lead_id);
create index if not exists invoices_status_idx on public.invoices(status);

-- ---------------------------------------------------------------------------
-- Factuurregels
-- ---------------------------------------------------------------------------
create table if not exists public.invoice_items (
  id              uuid primary key default gen_random_uuid(),
  invoice_id      uuid not null references public.invoices(id) on delete cascade,
  omschrijving    text not null,
  aantal          numeric not null default 1,
  eenheid         text not null default 'post',
  prijs_per_stuk  numeric not null default 0,
  btw_percentage  numeric not null default 21,
  positie         int not null default 0
);
create index if not exists invoice_items_invoice_idx on public.invoice_items(invoice_id);

-- ---------------------------------------------------------------------------
-- Betalingen
-- ---------------------------------------------------------------------------
create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  invoice_id  uuid not null references public.invoices(id) on delete cascade,
  bedrag      numeric not null,
  methode     text not null default 'overboeking' check (methode in ('ideal','overboeking','pin','contant')),
  datum       timestamptz not null default now(),
  created_at  timestamptz not null default now()
);
create index if not exists payments_invoice_idx on public.payments(invoice_id);

-- ---------------------------------------------------------------------------
-- Klantportaal-toegang (persoonlijke token per lead)
-- ---------------------------------------------------------------------------
create table if not exists public.portal_tokens (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid not null references public.leads(id) on delete cascade,
  token       text not null unique,
  actief      boolean not null default true,
  created_at  timestamptz not null default now()
);
create index if not exists portal_tokens_token_idx on public.portal_tokens(token);

-- updated_at trigger op invoices (hergebruikt set_updated_at uit fase 3)
drop trigger if exists invoices_set_updated_at on public.invoices;
create trigger invoices_set_updated_at before update on public.invoices
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
do $$
declare t text;
begin
  foreach t in array array['invoices','invoice_items','payments','portal_tokens']
  loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('drop policy if exists "team full access %1$s" on public.%1$s;', t);
    execute format('create policy "team full access %1$s" on public.%1$s for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- NB: het klantportaal (anonieme klant met token) leest data via een aparte
-- beveiligde route / edge function die op de token matcht. Geef anon-rollen
-- dus GEEN directe select-rechten op deze tabellen.


-- >>> 0005_leads_velden.sql

-- ============================================================================
-- Prefab Select CRM — leads-tabel aanvullen met de velden die de app gebruikt
-- ============================================================================

alter table public.leads
  add column if not exists bedrijf             text,
  add column if not exists kans                numeric default 0,
  add column if not exists toegewezen_aan      text,
  add column if not exists tags                text[] default '{}',
  add column if not exists bericht             text,
  add column if not exists laatste_activiteit  timestamptz default now(),
  add column if not exists positie             int default 0,
  add column if not exists portal_token        text;


-- >>> 0006_google_oauth.sql

-- ============================================================================
-- Prefab Select CRM — Google/Gmail OAuth-tokens (gedeelde postbus)
-- ============================================================================

create table if not exists public.google_oauth (
  id            uuid primary key default gen_random_uuid(),
  email         text unique,
  refresh_token text,
  access_token  text,
  token_expiry  timestamptz,
  scope         text,
  updated_at    timestamptz not null default now()
);

alter table public.google_oauth enable row level security;
drop policy if exists "team full access google_oauth" on public.google_oauth;
create policy "team full access google_oauth" on public.google_oauth
  for all to authenticated using (true) with check (true);


-- >>> 0007_notes_agenda_taken.sql

-- ============================================================================
-- Prefab Select CRM — notities-tabel + agenda/taken klaarmaken voor de app
-- ============================================================================

-- Notities (bestond nog niet)
create table if not exists public.notes (
  id          uuid primary key default gen_random_uuid(),
  lead_id     uuid references public.leads(id) on delete cascade,
  type        text not null default 'notitie',
  tekst       text not null,
  auteur      text,
  created_at  timestamptz not null default now()
);
create index if not exists notes_lead_idx on public.notes(lead_id);
alter table public.notes enable row level security;
drop policy if exists "team full access notes" on public.notes;
create policy "team full access notes" on public.notes for all to authenticated using (true) with check (true);

-- Teamleden bewaren we in de app (niet in de DB). De verwijzende kolommen
-- daarom van uuid+FK naar tekst, zodat ids als 'u-kelly' passen.
alter table public.appointments drop constraint if exists appointments_medewerker_id_fkey;
alter table public.appointments alter column medewerker_id type text using medewerker_id::text;

alter table public.tasks drop constraint if exists tasks_medewerker_id_fkey;
alter table public.tasks alter column medewerker_id type text using medewerker_id::text;
alter table public.tasks alter column project_id type text using project_id::text;

alter table public.task_comments drop constraint if exists task_comments_auteur_id_fkey;
alter table public.task_comments alter column auteur_id type text using auteur_id::text;

