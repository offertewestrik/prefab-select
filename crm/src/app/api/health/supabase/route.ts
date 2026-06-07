import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";

// ----------------------------------------------------------------------------
// Verbindingstest: laat zien of de live-app de Supabase-database kan bereiken.
// Bezoek /api/health/supabase in de browser.
// ----------------------------------------------------------------------------
export const runtime = "nodejs";

export async function GET() {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({
      ok: false,
      reden: "Supabase-omgevingsvariabelen ontbreken (NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    });
  }
  try {
    const db = getSupabaseAdmin();
    const { count, error } = await db
      .from("leads")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return Response.json({ ok: true, verbonden: true, aantalLeads: count ?? 0 });
  } catch (err) {
    return Response.json({ ok: false, fout: (err as Error).message });
  }
}
