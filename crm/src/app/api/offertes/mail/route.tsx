import { renderToBuffer } from "@react-pdf/renderer";
import { OfferteDocument } from "@/lib/pdf/OfferteDocument";
import { verstuurOfferteMail } from "@/lib/integrations";
import { berekenTotalen } from "@/lib/quote-utils";
import type { Lead, Quote } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { quote, lead } = (await req.json()) as { quote: Quote; lead: Lead };
    if (!quote || !lead) {
      return Response.json({ ok: false, fout: "quote en lead verplicht" }, { status: 400 });
    }

    const pdf = await renderToBuffer(<OfferteDocument quote={quote} lead={lead} />);
    const totaal = berekenTotalen(quote.regels, quote.korting).totaal;

    const html = `
      <div style="font-family: sans-serif; color:#1e293b; max-width:560px">
        <h2 style="color:#172554">Uw offerte van Prefab Select</h2>
        <p>Beste ${lead.naam},</p>
        <p>Hartelijk dank voor uw interesse. In de bijlage vindt u offerte
        <strong>${quote.nummer}</strong> met een totaalbedrag van
        <strong>€ ${totaal.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</strong>.</p>
        <p>Deze offerte is geldig tot ${new Date(quote.geldigTot).toLocaleDateString("nl-NL")}.
        Heeft u vragen? Bel of mail ons gerust.</p>
        <p>Met vriendelijke groet,<br/>Team Prefab Select</p>
      </div>`;

    const resultaat = await verstuurOfferteMail({
      naar: lead.email,
      onderwerp: `Uw offerte ${quote.nummer} — Prefab Select`,
      html,
      pdfBuffer: pdf as unknown as Buffer,
      bestandsnaam: `offerte-${quote.nummer}.pdf`,
    });

    return Response.json(resultaat);
  } catch (err) {
    console.error("Mailen mislukt:", err);
    return Response.json({ ok: false, fout: "Mailen mislukt" }, { status: 500 });
  }
}
