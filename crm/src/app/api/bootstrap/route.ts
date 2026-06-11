import { listLeads } from "@/lib/data/leads-repo";
import { listQuotes } from "@/lib/data/quotes-repo";
import { listInvoices } from "@/lib/data/invoices-repo";
import { listPayments } from "@/lib/data/payments-repo";
import { listNotes, listAppointments, listTasks, listTaskComments } from "@/lib/data/agenda-repo";
import { listPurchases } from "@/lib/data/finance-repo";
import { listProducts } from "@/lib/data/products-repo";
import { listFiles } from "@/lib/data/files-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

// Laadt alle gedeelde data in één keer (voor het hydrateren van de app).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseAdminConfigured()) return Response.json({});
  try {
    const [leads, quotes, invoices, payments, notes, appointments, tasks, taskComments, purchases] = await Promise.all([
      listLeads(),
      listQuotes(),
      listInvoices(),
      listPayments(),
      listNotes(),
      listAppointments(),
      listTasks(),
      listTaskComments(),
      listPurchases(),
    ]);
    // Apart, zodat een ontbrekende products-tabel (migratie 0011 nog niet
    // uitgevoerd) de rest van de bootstrap niet blokkeert.
    const products = await listProducts().catch(() => []);
    // Idem voor de files-tabel (migratie 0012).
    const files = await listFiles().catch(() => []);
    return Response.json(
      { leads, quotes, invoices, payments, notes, appointments, tasks, taskComments, purchases, products, files },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("Bootstrap mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
