import { deleteGoogleTokens } from "@/lib/data/google-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  if (!isSupabaseAdminConfigured()) return Response.json({ ok: false }, { status: 503 });
  try {
    await deleteGoogleTokens();
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
