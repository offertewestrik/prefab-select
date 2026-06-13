import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Invoice, InvoiceStatus, QuoteLine } from "@/lib/types";

export function mapInvoice(row: any, items: any[]): Invoice {
  return {
    id: row.id,
    nummer: row.nummer,
    leadId: row.lead_id,
    quoteId: row.quote_id ?? undefined,
    status: row.status as InvoiceStatus,
    termijnLabel: row.termijn_label ?? undefined,
    regels: items
      .filter((i) => i.invoice_id === row.id)
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
    vervaldatum: row.vervaldatum,
    notitie: row.notitie ?? undefined,
    aangemaaktOp: row.created_at,
    verstuurdOp: row.verstuurd_op ?? undefined,
  };
}

export async function listInvoices(): Promise<Invoice[]> {
  const db = getSupabaseAdmin();
  const { data: invoices, error } = await db
    .from("invoices")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  const { data: items } = await db.from("invoice_items").select("*");
  return (invoices ?? []).map((r) => mapInvoice(r, items ?? []));
}
