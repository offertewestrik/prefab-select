-- ============================================================================
-- Prefab Select CRM — social media posts (via Make naar alle platforms)
-- ============================================================================

create table if not exists public.social_posts (
  id            uuid primary key default gen_random_uuid(),
  tekst         text not null,
  afbeelding    text,
  platforms     text[] not null default '{}',
  status        text not null default 'verzonden',
  gepland_op    timestamptz,
  verzonden_op  timestamptz,
  created_at    timestamptz not null default now()
);

-- Generieke instellingen (bv. de Make-webhook-URL voor social posten)
create table if not exists public.app_settings (
  key         text primary key,
  value       text,
  updated_at  timestamptz not null default now()
);

alter table public.social_posts enable row level security;
alter table public.app_settings enable row level security;
drop policy if exists "team full access social_posts" on public.social_posts;
create policy "team full access social_posts" on public.social_posts for all to authenticated using (true) with check (true);
drop policy if exists "team full access app_settings" on public.app_settings;
create policy "team full access app_settings" on public.app_settings for all to authenticated using (true) with check (true);
