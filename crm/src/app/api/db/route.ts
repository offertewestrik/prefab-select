import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { isGmailConnected, createCalendarEvent, updateCalendarEvent, deleteCalendarEvent } from "@/lib/integrations/google";
import type { Appointment, Invoice, Note, Payment, Quote, QuoteLine, Task, TaskComment } from "@/lib/types";

// Generieke schrijf-route voor de gedeelde data (write-through vanuit de store).
// Body: { table, op: "upsert" | "delete", data }
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function quoteToRow(q: Quote) {
  return {
    id: q.id,
    nummer: q.nummer,
    lead_id: q.leadId,
    status: q.status,
    projecttype: q.projecttype,
    projectomschrijving: q.projectomschrijving ?? null,
    afmetingen: q.afmetingen ?? null,
    werkzaamheden: q.werkzaamheden ?? null,
    korting: q.korting,
    notitie: q.notitie ?? null,
    voorwaarden: q.voorwaarden ?? null,
    geldig_tot: q.geldigTot ?? null,
    verstuurd_op: q.verstuurdOp ?? null,
    bekeken_op: q.bekekenOp ?? null,
    beslist_op: q.beslistOp ?? null,
  };
}

function invoiceToRow(i: Invoice) {
  return {
    id: i.id,
    nummer: i.nummer,
    lead_id: i.leadId,
    quote_id: i.quoteId ?? null,
    status: i.status,
    termijn_label: i.termijnLabel ?? null,
    korting: i.korting,
    vervaldatum: i.vervaldatum ?? null,
    notitie: i.notitie ?? null,
    verstuurd_op: i.verstuurdOp ?? null,
  };
}

function itemRows(parentKey: "quote_id" | "invoice_id", parentId: string, regels: QuoteLine[]) {
  // De id van de regel laten we door de database genereren (uuid).
  return regels.map((r, idx) => ({
    [parentKey]: parentId,
    omschrijving: r.omschrijving,
    aantal: r.aantal,
    eenheid: r.eenheid,
    prijs_per_stuk: r.prijsPerStuk,
    btw_percentage: r.btwPercentage,
    positie: idx,
  }));
}

export async function POST(req: Request) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }
  const db = getSupabaseAdmin();
  try {
    const { table, op, data } = await req.json();

    if (op === "delete") {
      if (table === "appointments") {
        try {
          const { data: row } = await db.from("appointments").select("google_event_id").eq("id", data.id).maybeSingle();
          if (row?.google_event_id && (await isGmailConnected())) {
            await deleteCalendarEvent(row.google_event_id);
          }
        } catch (e) {
          console.error("Agenda-event verwijderen mislukt:", e);
        }
      }
      const { error } = await db.from(table).delete().eq("id", data.id);
      if (error) throw error;
      return Response.json({ ok: true });
    }

    // op === "upsert"
    if (table === "quotes") {
      const q = data as Quote;
      const { error } = await db.from("quotes").upsert(quoteToRow(q));
      if (error) throw error;
      await db.from("quote_items").delete().eq("quote_id", q.id);
      if (q.regels?.length) {
        const { error: e2 } = await db.from("quote_items").insert(itemRows("quote_id", q.id, q.regels));
        if (e2) throw e2;
      }
    } else if (table === "invoices") {
      const i = data as Invoice;
      const { error } = await db.from("invoices").upsert(invoiceToRow(i));
      if (error) throw error;
      await db.from("invoice_items").delete().eq("invoice_id", i.id);
      if (i.regels?.length) {
        const { error: e2 } = await db.from("invoice_items").insert(itemRows("invoice_id", i.id, i.regels));
        if (e2) throw e2;
      }
    } else if (table === "payments") {
      const p = data as Payment;
      const { error } = await db.from("payments").upsert({
        id: p.id,
        invoice_id: p.invoiceId,
        bedrag: p.bedrag,
        methode: p.methode,
        datum: p.datum,
      });
      if (error) throw error;
    } else if (table === "notes") {
      const n = data as Note;
      const { error } = await db.from("notes").upsert({
        id: n.id, lead_id: n.leadId, type: n.type, tekst: n.tekst, auteur: n.auteur,
      });
      if (error) throw error;
    } else if (table === "appointments") {
      const a = data as Appointment;
      // Synchroniseer met Google Agenda als die gekoppeld is.
      const { data: bestaand } = await db.from("appointments").select("google_event_id").eq("id", a.id).maybeSingle();
      let googleEventId: string | null = bestaand?.google_event_id ?? null;
      try {
        if (await isGmailConnected()) {
          const afspraak = { titel: a.titel, omschrijving: a.omschrijving, locatie: a.locatie, start: a.start, eind: a.eind };
          if (googleEventId) await updateCalendarEvent(googleEventId, afspraak);
          else googleEventId = await createCalendarEvent(afspraak);
        }
      } catch (e) {
        console.error("Agenda-sync mislukt:", e);
      }
      const { error } = await db.from("appointments").upsert({
        id: a.id, titel: a.titel, type: a.type, start_tijd: a.start, eind_tijd: a.eind,
        lead_id: a.leadId ?? null, quote_id: a.quoteId ?? null, medewerker_id: a.medewerkerId ?? null,
        locatie: a.locatie ?? null, omschrijving: a.omschrijving ?? null,
        google_event_id: googleEventId, google_synced: Boolean(googleEventId),
      });
      if (error) throw error;
    } else if (table === "tasks") {
      const t = data as Task;
      const { error } = await db.from("tasks").upsert({
        id: t.id, titel: t.titel, omschrijving: t.omschrijving ?? null, prioriteit: t.prioriteit,
        status: t.status, deadline: t.deadline ?? null, medewerker_id: t.medewerkerId ?? null,
        lead_id: t.leadId ?? null, quote_id: t.quoteId ?? null, project_id: t.projectId ?? null,
        reminder_minuten: t.reminderMinuten ?? null,
      });
      if (error) throw error;
    } else if (table === "task_comments") {
      const c = data as TaskComment;
      const { error } = await db.from("task_comments").upsert({
        id: c.id, task_id: c.taskId, auteur_id: c.auteurId, tekst: c.tekst,
      });
      if (error) throw error;
    } else {
      return Response.json({ error: `Onbekende tabel: ${table}` }, { status: 400 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("DB-schrijfactie mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
