-- ============================================================================
-- Prefab Select CRM — inkoopkosten (inkoop) per project/lead
-- ============================================================================

create table if not exists public.purchases (
  id            uuid primary key default gen_random_uuid(),
  lead_id       uuid references public.leads(id) on delete set null,
  leverancier   text,
  omschrijving  text,
  bedrag        numeric not null default 0,
  datum         date,
  created_at    timestamptz not null default now()
);
create index if not exists purchases_lead_idx on public.purchases(lead_id);

alter table public.purchases enable row level security;
drop policy if exists "team full access purchases" on public.purchases;
create policy "team full access purchases" on public.purchases for all to authenticated using (true) with check (true);
