import { createCalendarEvent, isGmailConnected } from "@/lib/integrations/google";
import { getGoogleTokens } from "@/lib/data/google-repo";

// Testroute: probeert een afspraak in Google Agenda te zetten en toont de uitkomst.
// Bezoek /api/integrations/google/calendar/test
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const tokens = await getGoogleTokens();
  if (!(await isGmailConnected())) {
    return Response.json({ ok: false, reden: "Google niet verbonden", scope: tokens?.scope ?? null });
  }
  try {
    const start = new Date(Date.now() + 60 * 60 * 1000);
    const eind = new Date(Date.now() + 90 * 60 * 1000);
    const eventId = await createCalendarEvent({
      titel: "CRM testafspraak",
      omschrijving: "Testafspraak vanuit Prefab Select CRM.",
      start: start.toISOString(),
      eind: eind.toISOString(),
    });
    return Response.json({ ok: true, eventId, scope: tokens?.scope ?? null });
  } catch (err) {
    return Response.json({ ok: false, fout: (err as Error).message, scope: tokens?.scope ?? null });
  }
}
