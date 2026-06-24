import { getPortaalData } from "@/lib/data/portaal-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

// Publieke (token-gescopete) data voor het klantportaal.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: { token: string } }) {
  if (!isSupabaseAdminConfigured()) return Response.json({ error: "niet geconfigureerd" }, { status: 503 });
  try {
    const data = await getPortaalData(params.token);
    if (!data) return Response.json({ error: "Ongeldige link" }, { status: 404 });
    return Response.json(data);
  } catch (err) {
    console.error("Portaal-data ophalen mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
