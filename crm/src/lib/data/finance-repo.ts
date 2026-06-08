import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Purchase } from "@/lib/types";

export function mapPurchase(r: any): Purchase {
  return {
    id: r.id,
    leadId: r.lead_id,
    leverancier: r.leverancier ?? "",
    omschrijving: r.omschrijving ?? undefined,
    bedrag: Number(r.bedrag ?? 0),
    datum: r.datum,
    aangemaaktOp: r.created_at,
  };
}

export async function listPurchases(): Promise<Purchase[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("purchases").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapPurchase);
}
