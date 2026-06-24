import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { Appointment, Note, Task, TaskComment } from "@/lib/types";

// --- Notities ---
export function mapNote(r: any): Note {
  return { id: r.id, leadId: r.lead_id, type: r.type, tekst: r.tekst, auteur: r.auteur ?? "", aangemaaktOp: r.created_at };
}
export async function listNotes(): Promise<Note[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("notes").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapNote);
}

// --- Afspraken ---
export function mapAppointment(r: any): Appointment {
  return {
    id: r.id,
    titel: r.titel,
    type: r.type,
    start: r.start_tijd,
    eind: r.eind_tijd,
    leadId: r.lead_id ?? undefined,
    quoteId: r.quote_id ?? undefined,
    locatie: r.locatie ?? undefined,
    omschrijving: r.omschrijving ?? undefined,
    medewerkerId: r.medewerker_id ?? "",
    googleSynced: r.google_synced ?? false,
  };
}
export async function listAppointments(): Promise<Appointment[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("appointments").select("*").order("start_tijd", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapAppointment);
}

// --- Taken ---
export function mapTask(r: any): Task {
  return {
    id: r.id,
    titel: r.titel,
    omschrijving: r.omschrijving ?? undefined,
    prioriteit: r.prioriteit,
    deadline: r.deadline,
    status: r.status,
    medewerkerId: r.medewerker_id ?? "",
    leadId: r.lead_id ?? undefined,
    quoteId: r.quote_id ?? undefined,
    projectId: r.project_id ?? undefined,
    reminderMinuten: r.reminder_minuten ?? null,
    aangemaaktOp: r.created_at,
  };
}
export async function listTasks(): Promise<Task[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("tasks").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapTask);
}

export function mapTaskComment(r: any): TaskComment {
  return { id: r.id, taskId: r.task_id, auteurId: r.auteur_id ?? "", tekst: r.tekst, aangemaaktOp: r.created_at };
}
export async function listTaskComments(): Promise<TaskComment[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("task_comments").select("*").order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapTaskComment);
}
