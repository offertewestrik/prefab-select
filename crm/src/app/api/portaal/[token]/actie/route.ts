import { ondertekenOfferte, wijsOfferteAf, betaalFactuur } from "@/lib/data/portaal-repo";
import { isSupabaseAdminConfigured } from "@/lib/supabase/server";

// Publieke acties vanuit het klantportaal (ondertekenen, afwijzen, betalen).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request, { params }: { params: { token: string } }) {
  if (!isSupabaseAdminConfigured()) return Response.json({ ok: false }, { status: 503 });
  try {
    const body = await req.json();
    const { type } = body;
    if (type === "accepteren") {
      const naam = String(body.naam ?? "").trim();
      const handtekening = String(body.handtekening ?? "");
      if (!naam || !handtekening) return Response.json({ ok: false, error: "Naam en handtekening verplicht" }, { status: 400 });
      await ondertekenOfferte(params.token, body.quoteId, naam, handtekening);
    } else if (type === "afwijzen") {
      await wijsOfferteAf(params.token, body.quoteId);
    } else if (type === "betalen") {
      await betaalFactuur(params.token, body.invoiceId);
    } else {
      return Response.json({ ok: false, error: "Onbekende actie" }, { status: 400 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Portaal-actie mislukt:", err);
    return Response.json({ ok: false, error: (err as Error).message }, { status: 500 });
  }
}
