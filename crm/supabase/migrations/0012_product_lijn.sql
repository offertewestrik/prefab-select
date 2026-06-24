-- ============================================================================
-- Prefab Select CRM — productlijn op de catalogus (prijslijst per producttype:
-- Prefab Uitbouw & Aanbouw / Luxe Poolhouses / Mantelzorg- & Vakantiewoningen)
-- ============================================================================

alter table public.products add column if not exists lijn text;
create index if not exists products_lijn_idx on public.products(lijn, categorie, naam);
