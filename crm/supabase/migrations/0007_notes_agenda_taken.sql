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
