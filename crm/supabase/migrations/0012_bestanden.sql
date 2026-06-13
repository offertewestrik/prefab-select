-- ============================================================================
-- Prefab Select CRM — bestanden per lead (Supabase Storage + metadata)
-- ============================================================================

create table if not exists public.files (
  id             uuid primary key default gen_random_uuid(),
  lead_id        uuid references public.leads(id) on delete cascade,
  naam           text not null,
  type           text not null default 'bestand',
  grootte_kb     integer not null default 0,
  storage_path   text not null,
  geupload_door  text,
  created_at     timestamptz not null default now()
);
create index if not exists files_lead_idx on public.files(lead_id);

alter table public.files enable row level security;
drop policy if exists "team full access files" on public.files;
create policy "team full access files" on public.files for all to authenticated using (true) with check (true);

-- Privé storage-bucket voor de bestanden zelf (server gebruikt de service role).
insert into storage.buckets (id, name, public)
values ('lead-files', 'lead-files', false)
on conflict (id) do nothing;
