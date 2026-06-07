import "server-only";

// ============================================================================
// Leads-repository (Supabase) — leest/schrijft de leads-tabel.
// De vorm van de teruggegeven objecten is identiek aan het Lead-type, zodat
// de UI/store er rechtstreeks mee kan werken.
// ============================================================================

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Lead, LeadSource, PipelineStage, ProductType } from "@/lib/types";

function mapLead(row: any): Lead {
  return {
    id: row.id,
    naam: row.naam,
    bedrijf: row.bedrijf ?? undefined,
    email: row.email ?? "",
    telefoon: row.telefoon ?? "",
    adres: row.adres ?? undefined,
    plaats: row.plaats ?? undefined,
    postcode: row.postcode ?? undefined,
    stage: (row.stage ?? "nieuwe_lead") as PipelineStage,
    source: (row.source ?? "handmatig") as LeadSource,
    product: (row.product ?? "overig") as ProductType,
    waarde: Number(row.waarde ?? 0),
    kans: Number(row.kans ?? 0),
    toegewezenAan: row.toegewezen_aan ?? "",
    tags: row.tags ?? [],
    bericht: row.bericht ?? undefined,
    aangemaaktOp: row.created_at,
    laatsteActiviteit: row.laatste_activiteit ?? row.created_at,
    positie: Number(row.positie ?? 0),
    portalToken: row.portal_token ?? undefined,
  };
}

/** Domein (camelCase) -> database-rij (snake_case). Alleen gezette velden. */
function toRow(lead: Partial<Lead>): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  const set = (k: string, v: unknown) => {
    if (v !== undefined) row[k] = v;
  };
  set("id", lead.id);
  set("naam", lead.naam);
  set("bedrijf", lead.bedrijf);
  set("email", lead.email);
  set("telefoon", lead.telefoon);
  set("adres", lead.adres);
  set("plaats", lead.plaats);
  set("postcode", lead.postcode);
  set("stage", lead.stage);
  set("source", lead.source);
  set("product", lead.product);
  set("waarde", lead.waarde);
  set("kans", lead.kans);
  set("toegewezen_aan", lead.toegewezenAan);
  set("tags", lead.tags);
  set("bericht", lead.bericht);
  set("laatste_activiteit", lead.laatsteActiviteit);
  set("positie", lead.positie);
  set("portal_token", lead.portalToken);
  return row;
}

export async function listLeads(): Promise<Lead[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapLead);
}

export async function createLead(input: Partial<Lead>): Promise<Lead> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("leads").insert(toRow(input)).select().single();
  if (error) throw error;
  return mapLead(data);
}

export async function updateLead(leadId: string, patch: Partial<Lead>): Promise<Lead> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("leads")
    .update(toRow(patch))
    .eq("id", leadId)
    .select()
    .single();
  if (error) throw error;
  return mapLead(data);
}

export async function deleteLead(leadId: string): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from("leads").delete().eq("id", leadId);
  if (error) throw error;
}
