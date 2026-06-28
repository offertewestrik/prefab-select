import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { mapLead } from "./leads-repo";
import { mapQuote } from "./quotes-repo";
import { mapInvoice } from "./invoices-repo";
import { mapPayment } from "./payments-repo";
import { mapAppointment } from "./agenda-repo";
import { berekenTotalen } from "@/lib/quote-utils";
import type { Lead } from "@/lib/types";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/** Zoekt de lead bij een portaal-token (token = portal_token of het lead-id). */
export async function leadByPortalToken(token: string): Promise<Lead | null> {
  const db = getSupabaseAdmin();
  const orClause = UUID.test(token)
    ? `id.eq.${token},portal_token.eq.${token}`
    : `portal_token.eq.${token}`;
  const { data } = await db.from("leads").select("*").or(orClause).limit(1).maybeSingle();
  return data ? mapLead(data) : null;
}

/** Alle data voor het klantportaal, beperkt tot deze klant. */
export async function getPortaalData(token: string) {
  const db = getSupabaseAdmin();
  const lead = await leadByPortalToken(token);
  if (!lead) return null;

  const [{ data: quotes }, { data: invoices }, { data: appts }] = await Promise.all([
    db.from("quotes").select("*").eq("lead_id", lead.id).order("created_at", { ascending: false }),
    db.from("invoices").select("*").eq("lead_id", lead.id).order("created_at", { ascending: false }),
    db.from("appointments").select("*").eq("lead_id", lead.id).order("start_tijd", { ascending: true }),
  ]);

  const quoteIds = (quotes ?? []).map((q) => q.id);
  const invoiceIds = (invoices ?? []).map((i) => i.id);
  const [{ data: quoteItems }, { data: invoiceItems }, { data: payments }] = await Promise.all([
    quoteIds.length ? db.from("quote_items").select("*").in("quote_id", quoteIds) : Promise.resolve({ data: [] }),
    invoiceIds.length ? db.from("invoice_items").select("*").in("invoice_id", invoiceIds) : Promise.resolve({ data: [] }),
    invoiceIds.length ? db.from("payments").select("*").in("invoice_id", invoiceIds) : Promise.resolve({ data: [] }),
  ]);

  return {
    lead,
    quotes: (quotes ?? []).map((q) => mapQuote(q, (quoteItems ?? []).filter((it) => it.quote_id === q.id))),
    invoices: (invoices ?? []).map((i) => mapInvoice(i, invoiceItems ?? [])),
    payments: (payments ?? []).map(mapPayment),
    appointments: (appts ?? []).map(mapAppointment),
  };
}

/** Controleert dat een offerte bij deze klant hoort. */
async function quoteVanLead(quoteId: string, leadId: string) {
  const db = getSupabaseAdmin();
  const { data } = await db.from("quotes").select("*").eq("id", quoteId).eq("lead_id", leadId).maybeSingle();
  return data;
}

export async function ondertekenOfferte(token: string, quoteId: string, naam: string, handtekening: string) {
  const db = getSupabaseAdmin();
  const lead = await leadByPortalToken(token);
  if (!lead) throw new Error("Ongeldige link");
  const quote = await quoteVanLead(quoteId, lead.id);
  if (!quote) throw new Error("Offerte niet gevonden");

  const now = new Date().toISOString();
  const { error } = await db
    .from("quotes")
    .update({ status: "geaccepteerd", beslist_op: now, ondertekend_op: now, ondertekend_door: naam, handtekening })
    .eq("id", quoteId);
  if (error) throw error;
  await db.from("leads").update({ stage: "offerte_akkoord", laatste_activiteit: now }).eq("id", lead.id);
}

export async function wijsOfferteAf(token: string, quoteId: string) {
  const db = getSupabaseAdmin();
  const lead = await leadByPortalToken(token);
  if (!lead) throw new Error("Ongeldige link");
  const quote = await quoteVanLead(quoteId, lead.id);
  if (!quote) throw new Error("Offerte niet gevonden");
  const { error } = await db
    .from("quotes")
    .update({ status: "afgewezen", beslist_op: new Date().toISOString() })
    .eq("id", quoteId);
  if (error) throw error;
}

export async function betaalFactuur(token: string, invoiceId: string) {
  const db = getSupabaseAdmin();
  const lead = await leadByPortalToken(token);
  if (!lead) throw new Error("Ongeldige link");
  const { data: inv } = await db.from("invoices").select("*").eq("id", invoiceId).eq("lead_id", lead.id).maybeSingle();
  if (!inv) throw new Error("Factuur niet gevonden");
  const { data: items } = await db.from("invoice_items").select("*").eq("invoice_id", invoiceId);
  const totaal = berekenTotalen(
    (items ?? []).map((i: any) => ({ id: i.id, omschrijving: i.omschrijving, aantal: Number(i.aantal), eenheid: i.eenheid, prijsPerStuk: Number(i.prijs_per_stuk), btwPercentage: Number(i.btw_percentage) })),
    Number(inv.korting ?? 0),
  ).totaal;
  const { data: pays } = await db.from("payments").select("bedrag").eq("invoice_id", invoiceId);
  const betaald = (pays ?? []).reduce((s: number, p: any) => s + Number(p.bedrag), 0);
  const openstaand = Math.max(0, totaal - betaald);
  if (openstaand <= 0) return;
  await db.from("payments").insert({ invoice_id: invoiceId, bedrag: openstaand, methode: "ideal", datum: new Date().toISOString() });
  await db.from("invoices").update({ status: "betaald" }).eq("id", invoiceId);
}
