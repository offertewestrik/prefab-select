// ============================================================================
// Mock-laag voor externe koppelingen.
// ----------------------------------------------------------------------------
// Elke functie heeft exact de vorm die de echte koppeling straks ook krijgt.
// Zolang USE_REAL_INTEGRATIONS !== "true" geven we realistische dummy data
// terug. Per stap vervangen we de body door een echte API-call.
// ============================================================================

export const useRealIntegrations =
  process.env.USE_REAL_INTEGRATIONS === "true";

// ---------------------------------------------------------------------------
// Resend — offerte mailen
// ---------------------------------------------------------------------------
export interface MailResultaat {
  ok: boolean;
  messageId: string;
  mock: boolean;
}

export async function verstuurOfferteMail(opts: {
  naar: string;
  onderwerp: string;
  html: string;
  pdfBuffer?: Buffer;
  bestandsnaam?: string;
}): Promise<MailResultaat> {
  if (!useRealIntegrations || !process.env.RESEND_API_KEY) {
    // MOCK: in het prototype versturen we niet echt.
    console.info(`[MOCK Resend] mail naar ${opts.naar} — "${opts.onderwerp}"`);
    await new Promise((r) => setTimeout(r, 400));
    return { ok: true, messageId: `mock-${Date.now()}`, mock: true };
  }

  // ECHTE IMPLEMENTATIE — Resend
  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "offerte@prefabselect.nl",
    to: opts.naar,
    subject: opts.onderwerp,
    html: opts.html,
    attachments:
      opts.pdfBuffer && opts.bestandsnaam
        ? [{ filename: opts.bestandsnaam, content: opts.pdfBuffer }]
        : undefined,
  });
  if (error) {
    console.error("[Resend] versturen mislukt:", error);
    return { ok: false, messageId: "", mock: false };
  }
  return { ok: true, messageId: data?.id ?? "", mock: false };
}

// ---------------------------------------------------------------------------
// Meta Marketing API — advertentieprestaties
// ---------------------------------------------------------------------------
export interface MetaCampagne {
  naam: string;
  impressies: number;
  klikken: number;
  besteed: number;
  leads: number;
  cpl: number; // cost per lead
}

export async function haalMetaCampagnes(): Promise<MetaCampagne[]> {
  // MOCK data — representatief voor Prefab Select campagnes.
  const ruw = [
    { naam: "Mantelzorgwoning — Zeeland", impressies: 142000, klikken: 3120, besteed: 1840, leads: 38 },
    { naam: "Poolhouse — Brabant", impressies: 98000, klikken: 2010, besteed: 1260, leads: 21 },
    { naam: "Tuinkantoor — Thuiswerken", impressies: 76000, klikken: 1680, besteed: 720, leads: 17 },
    { naam: "Prefab aanbouw — Retargeting", impressies: 54000, klikken: 2240, besteed: 540, leads: 26 },
  ];
  return ruw.map((c) => ({ ...c, cpl: Math.round(c.besteed / c.leads) }));
}

// ---------------------------------------------------------------------------
// Google Analytics 4 Data API — websiteverkeer
// ---------------------------------------------------------------------------
export interface GaDagpunt {
  datum: string; // dd-mm
  bezoekers: number;
  conversies: number;
}
export interface GaKanaal {
  kanaal: string;
  bezoekers: number;
  aandeel: number;
}

export async function haalGaVerkeer(): Promise<{
  reeks: GaDagpunt[];
  kanalen: GaKanaal[];
  totaalBezoekers: number;
  totaalConversies: number;
}> {
  const reeks: GaDagpunt[] = [];
  let totaalBezoekers = 0;
  let totaalConversies = 0;
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const bezoekers = 280 + Math.round(Math.sin(i) * 60) + Math.round(Math.random() * 80);
    const conversies = 4 + Math.round(Math.random() * 6);
    totaalBezoekers += bezoekers;
    totaalConversies += conversies;
    reeks.push({
      datum: `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}`,
      bezoekers,
      conversies,
    });
  }
  const kanalenRuw = [
    { kanaal: "Organisch", bezoekers: 2140 },
    { kanaal: "Meta Ads", bezoekers: 1560 },
    { kanaal: "Google Ads", bezoekers: 980 },
    { kanaal: "Direct", bezoekers: 640 },
    { kanaal: "Referral", bezoekers: 320 },
  ];
  const totKanaal = kanalenRuw.reduce((s, k) => s + k.bezoekers, 0);
  const kanalen = kanalenRuw.map((k) => ({
    ...k,
    aandeel: Math.round((k.bezoekers / totKanaal) * 100),
  }));
  return { reeks, kanalen, totaalBezoekers, totaalConversies };
}
