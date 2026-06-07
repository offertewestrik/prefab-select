import { renderToBuffer } from "@react-pdf/renderer";
import { OfferteDocument } from "@/lib/pdf/OfferteDocument";
import { verstuurOfferteMail } from "@/lib/integrations";
import { BEDRIJF, PRODUCT_LABEL } from "@/lib/constants";
import type { Lead, Quote } from "@/lib/types";

export const runtime = "nodejs";

const ONDERWERP = "Uw offerte van Prefab Select";

/** Bouwt de offerte-e-mail in Prefab Select huisstijl volgens de vaste template. */
function bouwHtml(lead: Lead, projecttype: string): string {
  return `
  <div style="font-family: Arial, Helvetica, sans-serif; color:#1e293b; max-width:600px; margin:0 auto;">
    <div style="background:#172554; padding:24px 28px; border-radius:12px 12px 0 0;">
      <span style="color:#ffffff; font-size:18px; font-weight:bold; letter-spacing:1px;">PREFAB SELECT</span>
      <div style="color:#93c5fd; font-size:11px; margin-top:2px;">${BEDRIJF.slogan}</div>
    </div>
    <div style="border:1px solid #e2e8f0; border-top:none; border-radius:0 0 12px 12px; padding:28px;">
      <p style="margin:0 0 14px;">Beste ${lead.naam},</p>
      <p style="margin:0 0 14px;">Bedankt voor uw aanvraag bij Prefab Select.</p>
      <p style="margin:0 0 14px;">In de bijlage vindt u onze offerte voor uw <strong>${projecttype.toLowerCase()}</strong>.</p>
      <p style="margin:0 0 14px;">Heeft u vragen of wilt u de offerte bespreken? Dan plannen wij graag een afspraak met u in.</p>
      <p style="margin:18px 0 4px;">Met vriendelijke groet,</p>
      <p style="margin:0; font-weight:bold; color:#172554;">Prefab Select</p>
      <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0 14px;" />
      <p style="margin:0; font-size:12px; color:#64748b;">
        ${BEDRIJF.email} · ${BEDRIJF.telefoon}<br/>${BEDRIJF.web}
      </p>
    </div>
  </div>`;
}

export async function POST(req: Request) {
  try {
    const { quote, lead } = (await req.json()) as { quote: Quote; lead: Lead };
    if (!quote || !lead) {
      return Response.json({ ok: false, fout: "quote en lead verplicht" }, { status: 400 });
    }

    const pdf = await renderToBuffer(<OfferteDocument quote={quote} lead={lead} />);
    const projecttype = PRODUCT_LABEL[quote.projecttype] ?? "project";

    const resultaat = await verstuurOfferteMail({
      naar: lead.email,
      onderwerp: ONDERWERP,
      html: bouwHtml(lead, projecttype),
      pdfBuffer: pdf as unknown as Buffer,
      bestandsnaam: `offerte-${quote.nummer}.pdf`,
    });

    return Response.json({ ...resultaat, onderwerp: ONDERWERP, naar: lead.email });
  } catch (err) {
    console.error("Mailen mislukt:", err);
    return Response.json({ ok: false, fout: "Mailen mislukt" }, { status: 500 });
  }
}
