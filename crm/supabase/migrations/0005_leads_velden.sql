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
