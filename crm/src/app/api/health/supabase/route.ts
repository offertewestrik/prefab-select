import { getSupabaseAdmin, isSupabaseAdminConfigured } from "@/lib/supabase/server";

// ----------------------------------------------------------------------------
// Verbindings- + configtest. Toont (zonder geheime waarden te lekken) welke
// omgevingsvariabelen de live-app ziet, en of de database bereikbaar is.
// Bezoek /api/health/supabase
// ----------------------------------------------------------------------------
export const runtime = "nodejs";

export async function GET() {
  const config = {
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
  try {
    const db = getSupabaseAdmin();
    const { count, error } = await db
      .from("leads")
      .select("*", { count: "exact", head: true });
    if (error) throw error;
    return Response.json({ ok: true, verbonden: true, aantalLeads: count ?? 0, config });
  } catch (err) {
    return Response.json({ ok: false, fout: (err as Error).message, config });
  }
}
