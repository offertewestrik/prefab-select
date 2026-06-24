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

  // ELKE tabel wordt apart opgehaald met een eigen .catch(). Eén ontbrekende
  // of nog niet gemigreerde tabel (bijv. purchases/agenda) mag NOOIT de hele
  // bootstrap laten falen — anders stopt hydrate() in de client (if (!res.ok))
  // en laden o.a. nieuwe leads uit Supabase nooit in de UI. Bij een leesfout
  // sturen we dat veld als null mee; de client slaat null-velden over en houdt
  // zijn bestaande lijst, in plaats van 'm onterecht leeg te maken.
  const veilig = <T,>(p: Promise<T>, naam: string) =>
    p.catch((e) => {
      console.error(`Bootstrap: ${naam} ophalen mislukt:`, (e as Error).message);
      return null;
    });

  const [leads, quotes, invoices, payments, notes, appointments, tasks, taskComments, purchases, products, files] =
    await Promise.all([
      veilig(listLeads(), "leads"),
      veilig(listQuotes(), "quotes"),
      veilig(listInvoices(), "invoices"),
      veilig(listPayments(), "payments"),
      veilig(listNotes(), "notes"),
      veilig(listAppointments(), "appointments"),
      veilig(listTasks(), "tasks"),
      veilig(listTaskComments(), "taskComments"),
      veilig(listPurchases(), "purchases"),
      veilig(listProducts(), "products"),
      veilig(listFiles(), "files"),
    ]);

  return Response.json(
    { leads, quotes, invoices, payments, notes, appointments, tasks, taskComments, purchases, products, files },
    { headers: { "Cache-Control": "no-store" } },
  );
}
