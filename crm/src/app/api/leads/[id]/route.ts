import { updateLead, deleteLead } from "@/lib/data/leads-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// PATCH /api/leads/:id — lead bijwerken (ook gebruikt voor verslepen/fase)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }
  try {
    const patch = await req.json();
    const lead = await updateLead(params.id, patch);
    return Response.json(lead);
  } catch (err) {
    console.error("Lead bijwerken mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}

// DELETE /api/leads/:id
export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!isSupabaseAdminConfigured()) {
    return Response.json({ error: "Supabase niet geconfigureerd" }, { status: 503 });
  }
  try {
    await deleteLead(params.id);
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Lead verwijderen mislukt:", err);
    return Response.json({ error: (err as Error).message }, { status: 500 });
  }
}
