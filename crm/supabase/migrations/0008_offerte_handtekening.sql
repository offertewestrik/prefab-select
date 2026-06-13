-- ============================================================================
-- Prefab Select CRM — online ondertekening van offertes
-- ============================================================================

alter table public.quotes
  add column if not exists ondertekend_op   timestamptz,
  add column if not exists ondertekend_door text,
  add column if not exists handtekening     text;
