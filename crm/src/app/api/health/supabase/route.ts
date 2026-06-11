import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";
import { FILES_BUCKET } from "@/lib/data/files-repo";
import { APP_VERSIE } from "@/lib/versie";

// ----------------------------------------------------------------------------
// Verbindings- + configtest. Toont (zonder geheime waarden te lekken) welke
// omgevingsvariabelen de live-app ziet, of de database bereikbaar is, en of
// de bestanden-opslag (tabel files + storage-bucket) in orde is.
// Bezoek /api/health/supabase
// ----------------------------------------------------------------------------
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const config = {
    serverVersie: APP_VERSIE,
    NEXT_PUBLIC_SUPABASE_URL_gezet: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY_gezet: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    RESEND_API_KEY_gezet: Boolean(process.env.RESEND_API_KEY),
    USE_REAL_INTEGRATIONS: process.env.USE_REAL_INTEGRATIONS ?? null,
  };

  if (!isSupabaseAdminConfigured()) {
    return Response.json({
      ok: false,
      reden: "Supabase-omgevingsvariabelen ontbreken.",
      config,
    });
  }

  const db = getSupabaseAdmin();

  // Leads-tabel (basis-check database)
  let aantalLeads: number | string = "FOUT";
  try {
    const { count, error } = await db.from("leads").select("*", { count: "exact", head: true });
    if (error) throw error;
    aantalLeads = count ?? 0;
  } catch (err) {
    aantalLeads = `FOUT: ${(err as Error).message}`;
  }

  // Bestanden-tabel (migratie 0012)
  let bestandenTabel: string;
  let aantalBestanden: number | null = null;
  try {
    const { count, error } = await db.from("files").select("*", { count: "exact", head: true });
    if (error) throw error;
    aantalBestanden = count ?? 0;
    bestandenTabel = "OK";
  } catch (err) {
    bestandenTabel = `ONTBREEKT of FOUT: ${(err as Error).message}`;
  }

  // Storage-bucket voor de bestanden zelf
  let storageBucket: string;
  try {
    const { data, error } = await db.storage.getBucket(FILES_BUCKET);
    if (error || !data) throw error ?? new Error("bucket niet gevonden");
    storageBucket = "OK";
  } catch (err) {
    storageBucket = `ONTBREEKT of FOUT: ${(err as Error).message}`;
  }

  // Producten-tabel (migratie 0011)
  let productenTabel: string;
  try {
    const { count, error } = await db.from("products").select("*", { count: "exact", head: true });
    if (error) throw error;
    productenTabel = `OK (${count ?? 0} producten)`;
  } catch (err) {
    productenTabel = `ONTBREEKT of FOUT: ${(err as Error).message}`;
  }

  const alles =
    typeof aantalLeads === "number" && bestandenTabel === "OK" && storageBucket === "OK";

  return Response.json({
    ok: alles,
    aantalLeads,
    bestanden: {
      tabel: bestandenTabel,
      bucket: storageBucket,
      aantalBestandenInDatabase: aantalBestanden,
    },
    producten: productenTabel,
    config,
  });
}
