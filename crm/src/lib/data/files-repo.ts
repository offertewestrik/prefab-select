import "server-only";

// ============================================================================
// Bestanden-repository (Supabase) — metadata van geüploade bestanden per lead.
// De bestanden zelf staan in de private storage-bucket "lead-files".
// ============================================================================

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { UploadedFile } from "@/lib/types";

export const FILES_BUCKET = "lead-files";

export function mapFile(row: any): UploadedFile {
  return {
    id: row.id,
    leadId: row.lead_id,
    naam: row.naam,
    type: row.type ?? "bestand",
    grootteKb: Number(row.grootte_kb) || 0,
    storagePath: row.storage_path,
    geuploadOp: row.created_at,
    geuploadDoor: row.geupload_door ?? "—",
  };
}

export async function listFiles(): Promise<UploadedFile[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("files")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapFile);
}
