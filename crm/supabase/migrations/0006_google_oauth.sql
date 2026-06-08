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
