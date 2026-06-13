import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { FILES_BUCKET, mapFile } from "@/lib/data/files-repo";

// Upload van een bestand bij een lead: het bestand gaat naar de private
// storage-bucket, de metadata naar de tabel "files".
// POST multipart/form-data: file, leadId, geuploadDoor (optioneel)
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function bestandType(mime: string): string {
  if (mime.includes("pdf")) return "pdf";
  if (mime.startsWith("image")) return "afbeelding";
  return "bestand";
}

export async function POST(req: Request) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return Response.json({ error: "Ongeldige upload (multipart/form-data verwacht)" }, { status: 400 });
  }

  const file = form.get("file");
  const leadId = form.get("leadId");
  if (!(file instanceof File) || typeof leadId !== "string" || !leadId) {
    return Response.json({ error: "Velden 'file' en 'leadId' zijn verplicht" }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  // Veilige, unieke opslagnaam; originele naam bewaren we in de metadata.
  const schoon = file.name.replace(/[^\w.\-]+/g, "_").slice(-100);
  const pad = `${leadId}/${crypto.randomUUID()}-${schoon}`;

  try {
    const buf = Buffer.from(await file.arrayBuffer());
    let { error: upErr } = await db.storage.from(FILES_BUCKET).upload(pad, buf, {
      contentType: file.type || "application/octet-stream",
    });
    // Bucket bestaat nog niet? Eenmalig zelf aanmaken en opnieuw proberen.
    if (upErr && /bucket.*not.*found/i.test(upErr.message ?? "")) {
      await db.storage.createBucket(FILES_BUCKET, { public: false }).catch(() => undefined);
      ({ error: upErr } = await db.storage.from(FILES_BUCKET).upload(pad, buf, {
        contentType: file.type || "application/octet-stream",
      }));
    }
    if (upErr) throw upErr;

    const { data, error } = await db
      .from("files")
      .insert({
        lead_id: leadId,
        naam: file.name,
        type: bestandType(file.type ?? ""),
        grootte_kb: Math.round(file.size / 1024),
        storage_path: pad,
        geupload_door: typeof form.get("geuploadDoor") === "string" ? form.get("geuploadDoor") : null,
      })
      .select("*")
      .single();
    if (error) {
      // Half gelukte upload niet laten zwerven in storage.
      await db.storage.from(FILES_BUCKET).remove([pad]).catch(() => undefined);
      if (/relation.*files|files.*not exist|schema cache/i.test(error.message ?? "")) {
        return Response.json(
          { error: "De database-tabel 'files' ontbreekt nog. Voer migratie 0012_bestanden.sql uit in de Supabase SQL Editor." },
          { status: 500 },
        );
      }
      throw error;
    }

    return Response.json(mapFile(data), { status: 201 });
  } catch (err) {
    console.error("Bestand uploaden mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
