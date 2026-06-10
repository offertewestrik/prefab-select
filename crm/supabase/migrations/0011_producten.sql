-- ============================================================================
-- Prefab Select CRM — productcatalogus (aanklikbare producten voor offertes)
-- ============================================================================

create table if not exists public.products (
  id              uuid primary key default gen_random_uuid(),
  naam            text not null,
  beschrijving    text,
  categorie       text not null default 'Overig',
  eenheid         text not null default 'stuks',
  prijs_per_stuk  numeric not null default 0,
  btw_percentage  numeric not null default 21,
  actief          boolean not null default true,
  created_at      timestamptz not null default now()
);
create index if not exists products_categorie_idx on public.products(categorie, naam);

alter table public.products enable row level security;
drop policy if exists "team full access products" on public.products;
create policy "team full access products" on public.products for all to authenticated using (true) with check (true);
