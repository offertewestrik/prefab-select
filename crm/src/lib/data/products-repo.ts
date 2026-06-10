import "server-only";

// ============================================================================
// Product-repository (Supabase) — de eigen productcatalogus voor offertes.
// ============================================================================

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";

function mapProduct(row: any): Product {
  return {
    id: row.id,
    naam: row.naam,
    beschrijving: row.beschrijving ?? undefined,
    lijn: row.lijn ?? undefined,
    categorie: row.categorie ?? "Overig",
    eenheid: row.eenheid ?? "stuks",
    prijsPerStuk: Number(row.prijs_per_stuk) || 0,
    btwPercentage: Number(row.btw_percentage) || 21,
    actief: row.actief !== false,
    aangemaaktOp: row.created_at,
  };
}

export async function listProducts(): Promise<Product[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("products")
    .select("*")
    .order("categorie")
    .order("naam");
  if (error) throw error;
  return (data ?? []).map(mapProduct);
}
