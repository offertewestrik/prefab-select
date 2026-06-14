import { createSocialPost, getSetting } from "@/lib/data/social-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Slaat de post op en stuurt 'm door naar de Make-webhook (die fan-out doet).
export async function POST(req: Request) {
  if (!isSupabaseAdminConfigured()) return Response.json({ ok: false, error: "Niet geconfigureerd" }, { status: 503 });
  try {
    const body = await req.json();
    const tekst = String(body.tekst ?? "").trim();
    const platforms: string[] = Array.isArray(body.platforms) ? body.platforms : [];
    const afbeelding = body.afbeelding ? String(body.afbeelding).trim() : undefined;
    const geplandOp = body.geplandOp ? String(body.geplandOp) : undefined;

    if (!tekst || platforms.length === 0) {
      return Response.json({ ok: false, error: "Tekst en minstens één platform zijn verplicht" }, { status: 400 });
    }

    const webhookUrl = await getSetting("make_social_webhook");
    if (!webhookUrl) {
      return Response.json({ ok: false, error: "Geen Make-webhook ingesteld. Vul die eerst in onder Instellingen." }, { status: 400 });
    }

    // Doorsturen naar Make (fan-out naar de platforms).
    let verzonden = false;
    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tekst, afbeelding, platforms, geplandOp: geplandOp ?? null }),
      });
      verzonden = res.ok;
    } catch (e) {
      console.error("Doorsturen naar Make mislukt:", e);
    }

    const status = !verzonden ? "mislukt" : geplandOp ? "gepland" : "verzonden";
    const post = await createSocialPost({
      tekst,
      afbeelding,
      platforms,
      status,
      geplandOp: geplandOp ?? null,
      verzondenOp: verzonden && !geplandOp ? new Date().toISOString() : null,
    });

    return Response.json({ ok: verzonden, post });
  } catch (err) {
    console.error("Social publish mislukt:", err);
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
