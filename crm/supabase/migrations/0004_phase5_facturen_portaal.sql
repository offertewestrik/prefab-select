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
