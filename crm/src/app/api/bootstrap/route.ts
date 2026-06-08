import { listLeads } from "@/lib/data/leads-repo";
import { listQuotes } from "@/lib/data/quotes-repo";
import { listInvoices } from "@/lib/data/invoices-repo";
import { listPayments } from "@/lib/data/payments-repo";
import { listNotes, listAppointments, listTasks, listTaskComments } from "@/lib/data/agenda-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

// Laadt alle gedeelde data in één keer (voor het hydrateren van de app).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!isSupabaseAdminConfigured()) return Response.json({});
  try {
    const [leads, quotes, invoices, payments, notes, appointments, tasks, taskComments] = await Promise.all([
      listLeads(),
      listQuotes(),
      listInvoices(),
      listPayments(),
      listNotes(),
      listAppointments(),
      listTasks(),
      listTaskComments(),
    ]);
    return Response.json({ leads, quotes, invoices, payments, notes, appointments, tasks, taskComments });
  } catch (err) {
    console.error("Bootstrap mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
