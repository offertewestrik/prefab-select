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
