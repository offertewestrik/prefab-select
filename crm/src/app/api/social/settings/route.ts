import { setSetting } from "@/lib/data/social-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isSupabaseAdminConfigured()) return Response.json({ ok: false }, { status: 503 });
  try {
    const { webhookUrl } = await req.json();
    await setSetting("make_social_webhook", String(webhookUrl ?? "").trim());
    return Response.json({ ok: true });
  } catch (err) {
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
