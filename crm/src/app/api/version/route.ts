import { APP_VERSIE } from "@/lib/versie";

// Geeft de versie van de server-build terug. De client vergelijkt dit met
// zijn eigen ingebakken versie en herlaadt zichzelf bij een verschil.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    { versie: APP_VERSIE },
    { headers: { "Cache-Control": "no-store" } },
  );
}
