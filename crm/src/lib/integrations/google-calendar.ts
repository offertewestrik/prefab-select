// ============================================================================
// Google Calendar koppeling — mock-laag (fase 3).
// ----------------------------------------------------------------------------
// Tweezijdige sync:
//   - CRM  -> Google : pushAfspraakNaarGoogle()
//   - Google -> CRM  : haalGoogleEvents()  (geeft externe events terug)
// Zolang er geen Google-tokens zijn, gebruiken we realistische dummy data.
// De echte implementatie (googleapis) staat als commentaar klaar.
// ============================================================================

export const googleConfigured = Boolean(
  process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET,
);

export interface GoogleEvent {
  id: string;
  titel: string;
  start: string; // ISO
  eind: string; // ISO
  bron: "google";
}

/** Externe agenda-items uit Google (Google -> CRM). MOCK. */
export async function haalGoogleEvents(): Promise<GoogleEvent[]> {
  await new Promise((r) => setTimeout(r, 300));
  const base = new Date();
  function d(offset: number, uur: number, min = 0, durMin = 60): { start: string; eind: string } {
    const s = new Date(base);
    s.setDate(s.getDate() + offset);
    s.setHours(uur, min, 0, 0);
    const e = new Date(s.getTime() + durMin * 60000);
    return { start: s.toISOString(), eind: e.toISOString() };
  }
  // Voorbeelden van privé/externe afspraken die NIET uit het CRM komen.
  return [
    { id: "g-1", titel: "Google: Teamoverleg", bron: "google", ...d(1, 9, 0, 45) },
    { id: "g-2", titel: "Google: Lunch leverancier", bron: "google", ...d(2, 12, 30, 60) },
    { id: "g-3", titel: "Google: Boekhouder", bron: "google", ...d(3, 16, 0, 60) },
  ];
}

/** Eén CRM-afspraak naar Google pushen (CRM -> Google). MOCK. */
export async function pushAfspraakNaarGoogle(titel: string): Promise<{ ok: boolean; googleEventId: string; mock: boolean }> {
  if (!googleConfigured) {
    console.info(`[MOCK Google Calendar] push: "${titel}"`);
    await new Promise((r) => setTimeout(r, 200));
    return { ok: true, googleEventId: `mock-${Date.now()}`, mock: true };
  }
  // ECHTE IMPLEMENTATIE (later):
  // const { google } = await import("googleapis");
  // const calendar = google.calendar({ version: "v3", auth });
  // const res = await calendar.events.insert({ calendarId: "primary", requestBody: {...} });
  // return { ok: true, googleEventId: res.data.id!, mock: false };
  throw new Error("Echte Google Calendar-koppeling nog niet geactiveerd.");
}
