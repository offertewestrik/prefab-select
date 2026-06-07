import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Payment, PaymentMethode } from "@/lib/types";

export function mapPayment(row: any): Payment {
  return {
    id: row.id,
    invoiceId: row.invoice_id,
    bedrag: Number(row.bedrag),
    methode: row.methode as PaymentMethode,
    datum: row.datum,
  };
}

export async function listPayments(): Promise<Payment[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("payments").select("*");
  if (error) throw error;
  return (data ?? []).map(mapPayment);
}
