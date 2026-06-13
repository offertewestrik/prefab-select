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
