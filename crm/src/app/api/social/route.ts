import { listSocialPosts, getSetting } from "@/lib/data/social-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Posts-historie + de geconfigureerde Make-webhook-URL.
export async function GET() {
  if (!isSupabaseAdminConfigured()) return Response.json({ posts: [], webhookUrl: "" });
  try {
    const [posts, webhookUrl] = await Promise.all([listSocialPosts(), getSetting("make_social_webhook")]);
    return Response.json({ posts, webhookUrl: webhookUrl ?? "" }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    return Response.json({ posts: [], webhookUrl: "", error: (err as Error).message });
  }
}
