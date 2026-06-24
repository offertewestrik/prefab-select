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
