import { renderToBuffer } from "@react-pdf/renderer";
import { FactuurDocument } from "@/lib/pdf/FactuurDocument";
import { verstuurOfferteMail } from "@/lib/integrations";
import { berekenTotalen } from "@/lib/quote-utils";
import { BEDRIJF } from "@/lib/constants";
import { appBaseUrl } from "@/lib/app-url";
import { portalToken } from "@/lib/portal";
import type { Invoice, Lead } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { invoice, lead } = (await req.json()) as { invoice: Invoice; lead: Lead };
    if (!invoice || !lead) return Response.json({ ok: false }, { status: 400 });

    const pdf = await renderToBuffer(<FactuurDocument invoice={invoice} lead={lead} />);
    const totaal = berekenTotalen(invoice.regels, invoice.korting).totaal;
    const portaalUrl = `${appBaseUrl()}/portaal/${portalToken(lead)}`;
    const onderwerp = `Factuur ${invoice.nummer} — Prefab Select`;
    const html = `
      <div style="font-family:Arial,sans-serif;color:#1e293b;max-width:600px;margin:0 auto">
        <div style="background:#172554;padding:24px 28px;border-radius:12px 12px 0 0">
          <span style="color:#fff;font-size:18px;font-weight:bold;letter-spacing:1px">PREFAB SELECT</span>
        </div>
        <div style="border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;padding:28px">
          <p>Beste ${lead.naam},</p>
          <p>In de bijlage vindt u factuur <strong>${invoice.nummer}</strong> met een bedrag van
          <strong>€ ${totaal.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}</strong>.</p>
          <p>Wij verzoeken u vriendelijk dit bedrag te voldoen vóór
          ${new Date(invoice.vervaldatum).toLocaleDateString("nl-NL")}. U kunt de factuur ook direct online bekijken en <strong>betalen via uw klantportaal</strong>:</p>
          <div style="margin:20px 0;text-align:center">
            <a href="${portaalUrl}" style="display:inline-block;background:#2563eb;color:#fff;text-decoration:none;padding:13px 26px;border-radius:8px;font-weight:bold;font-size:15px">Bekijk &amp; betaal online</a>
          </div>
          <p style="margin:0 0 14px;font-size:12px;color:#64748b">Of voldoe het bedrag op IBAN ${BEDRIJF.iban} o.v.v. ${invoice.nummer}. Liever de link? <a href="${portaalUrl}" style="color:#2563eb">${portaalUrl}</a></p>
          <p>Met vriendelijke groet,<br/><strong>Prefab Select</strong></p>
        </div>
      </div>`;

    const resultaat = await verstuurOfferteMail({
      naar: lead.email,
      onderwerp,
      html,
      pdfBuffer: pdf as unknown as Buffer,
      bestandsnaam: `factuur-${invoice.nummer}.pdf`,
    });
    return Response.json({ ...resultaat, onderwerp });
  } catch (err) {
    console.error("Factuur mailen mislukt:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
