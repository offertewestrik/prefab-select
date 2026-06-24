import { listLeads, createLead } from "@/lib/data/leads-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/leads — alle leads (voor hydratatie van de app)
export async function GET() {
  if (!isSupabaseAdminConfigured()) return Response.json([]);
  try {
    return Response.json(await listLeads());
  } catch (err) {
    console.error("Leads ophalen mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}

// POST /api/leads — nieuwe lead aanmaken (vanuit de app of vanuit Make)
export async function POST(req: Request) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const lead = await createLead(body);
    return Response.json(lead, { status: 201 });
  } catch (err) {
    console.error("Lead aanmaken mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
