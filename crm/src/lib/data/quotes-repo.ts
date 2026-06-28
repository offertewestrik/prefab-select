import "server-only";

// ============================================================================
// Offerte-repository (Supabase) — de "swap-in" datalaag voor fase 2.
// ----------------------------------------------------------------------------
// De UI draait nu nog op de Zustand-store (dummy data). Zodra Supabase is
// geconfigureerd, kunnen de pagina's/route handlers deze functies gebruiken
// i.p.v. de store — de vorm van de teruggegeven objecten is identiek aan de
// types in ../types.ts, dus de UI hoeft niet te veranderen.
// ============================================================================

import { getSupabaseAdmin } from "@/lib/supabase/server";
import { volgendQuoteNummer } from "@/lib/quote-utils";
import type {
  ProductType,
  Quote,
  QuoteEmailLog,
  QuoteLine,
  QuoteStatus,
} from "@/lib/types";

// --- Mappers: database-rij (snake_case) -> domeintype (camelCase) ---
export function mapQuote(row: any, items: any[]): Quote {
  return {
    id: row.id,
    nummer: row.nummer,
    leadId: row.lead_id,
    status: row.status as QuoteStatus,
    projecttype: (row.projecttype ?? "overig") as ProductType,
    projectomschrijving: row.projectomschrijving ?? undefined,
    afmetingen: row.afmetingen ?? undefined,
    werkzaamheden: row.werkzaamheden ?? undefined,
    regels: items
      .sort((a, b) => a.positie - b.positie)
      .map(
        (i): QuoteLine => ({
          id: i.id,
          omschrijving: i.omschrijving,
          aantal: Number(i.aantal),
          eenheid: i.eenheid,
          prijsPerStuk: Number(i.prijs_per_stuk),
          btwPercentage: Number(i.btw_percentage),
        }),
      ),
    korting: Number(row.korting),
    geldigTot: row.geldig_tot,
    notitie: row.notitie ?? undefined,
    voorwaarden: row.voorwaarden ?? undefined,
    aangemaaktOp: row.created_at,
    verstuurdOp: row.verstuurd_op ?? undefined,
    bekekenOp: row.bekeken_op ?? undefined,
    beslistOp: row.beslist_op ?? undefined,
    ondertekendOp: row.ondertekend_op ?? undefined,
    ondertekendDoor: row.ondertekend_door ?? undefined,
    handtekening: row.handtekening ?? undefined,
  };
}

function mapEmailLog(row: any): QuoteEmailLog {
  return {
    id: row.id,
    quoteId: row.quote_id,
    naar: row.naar,
    onderwerp: row.onderwerp,
    status: row.status,
    messageId: row.message_id ?? undefined,
    mock: row.mock,
    verstuurdOp: row.created_at,
  };
}

export async function listQuotes(): Promise<Quote[]> {
  const db = getSupabaseAdmin();
  const { data: quotes, error } = await db
    .from("quotes")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const { data: items } = await db.from("quote_items").select("*");
  return (quotes ?? []).map((q) =>
    mapQuote(q, (items ?? []).filter((i) => i.quote_id === q.id)),
  );
}

export async function getQuote(id: string): Promise<Quote | null> {
  const db = getSupabaseAdmin();
  const { data: row, error } = await db.from("quotes").select("*").eq("id", id).single();
  if (error || !row) return null;
  const { data: items } = await db.from("quote_items").select("*").eq("quote_id", id);
  return mapQuote(row, items ?? []);
}

export interface CreateQuoteDbInput {
  leadId: string;
  projecttype: ProductType;
  projectomschrijving?: string;
  afmetingen?: string;
  werkzaamheden?: string;
  regels: QuoteLine[];
  korting: number;
  notitie?: string;
  voorwaarden?: string;
  geldigTot: string;
}

export async function createQuote(input: CreateQuoteDbInput): Promise<Quote> {
  const db = getSupabaseAdmin();
  const bestaande = await listQuotes();
  const nummer = volgendQuoteNummer(bestaande);

  const { data: quote, error } = await db
    .from("quotes")
    .insert({
      nummer,
      lead_id: input.leadId,
      status: "concept",
      projecttype: input.projecttype,
      projectomschrijving: input.projectomschrijving,
      afmetingen: input.afmetingen,
      werkzaamheden: input.werkzaamheden,
      korting: input.korting,
      notitie: input.notitie,
      voorwaarden: input.voorwaarden,
      geldig_tot: input.geldigTot,
    })
    .select()
    .single();
  if (error) throw error;

  if (input.regels.length) {
    const { error: itemsError } = await db.from("quote_items").insert(
      input.regels.map((r, i) => ({
        quote_id: quote.id,
        omschrijving: r.omschrijving,
        aantal: r.aantal,
        eenheid: r.eenheid,
        prijs_per_stuk: r.prijsPerStuk,
        btw_percentage: r.btwPercentage,
        positie: i,
      })),
    );
    if (itemsError) throw itemsError;
  }
  return (await getQuote(quote.id))!;
}

export async function setQuoteStatus(id: string, status: QuoteStatus): Promise<void> {
  const db = getSupabaseAdmin();
  const now = new Date().toISOString();
  const patch: Record<string, unknown> = { status };
  if (status === "verstuurd") patch.verstuurd_op = now;
  if (status === "bekeken") patch.bekeken_op = now;
  if (status === "geaccepteerd" || status === "afgewezen") patch.beslist_op = now;
  const { error } = await db.from("quotes").update(patch).eq("id", id);
  if (error) throw error;
}

export async function listEmailLogs(quoteId: string): Promise<QuoteEmailLog[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("quote_email_logs")
    .select("*")
    .eq("quote_id", quoteId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapEmailLog);
}

export async function addEmailLog(
  log: Omit<QuoteEmailLog, "id" | "verstuurdOp">,
): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from("quote_email_logs").insert({
    quote_id: log.quoteId,
    naar: log.naar,
    onderwerp: log.onderwerp,
    status: log.status,
    message_id: log.messageId,
    mock: log.mock,
  });
  if (error) throw error;
}
