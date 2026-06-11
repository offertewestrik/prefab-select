import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { FILES_BUCKET } from "@/lib/data/files-repo";

// GET  /api/files/:id  -> opent het bestand (redirect naar tijdelijke signed URL)
// DELETE /api/files/:id -> verwijdert bestand uit storage én metadata
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }
  const db = getSupabaseAdmin();
  const { data: row, error } = await db.from("files").select("storage_path, naam").eq("id", params.id).maybeSingle();
  if (error || !row) {
    return Response.json({ error: "Bestand niet gevonden" }, { status: 404 });
  }
  const { data: signed, error: sErr } = await db.storage
    .from(FILES_BUCKET)
    .createSignedUrl(row.storage_path, 60 * 60, { download: false });
  if (sErr || !signed?.signedUrl) {
    console.error("Signed URL maken mislukt:", sErr);
    return Response.json({ error: "Bestand kon niet geopend worden" }, { status: 500 });
  }
  return Response.redirect(signed.signedUrl, 307);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }
  const db = getSupabaseAdmin();
  try {
    const { data: row } = await db.from("files").select("storage_path").eq("id", params.id).maybeSingle();
    if (row?.storage_path) {
      const { error: rmErr } = await db.storage.from(FILES_BUCKET).remove([row.storage_path]);
      if (rmErr) console.error("Storage-object verwijderen mislukt:", rmErr);
    }
    const { error } = await db.from("files").delete().eq("id", params.id);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Bestand verwijderen mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
