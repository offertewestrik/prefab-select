import { renderToBuffer } from "@react-pdf/renderer";
import { FactuurDocument } from "@/lib/pdf/FactuurDocument";
import type { Invoice, Lead } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { invoice, lead } = (await req.json()) as { invoice: Invoice; lead: Lead };
    if (!invoice || !lead) return new Response("invoice en lead verplicht", { status: 400 });
    const buffer = await renderToBuffer(<FactuurDocument invoice={invoice} lead={lead} />);
    return new Response(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="factuur-${invoice.nummer}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Factuur-PDF mislukt:", err);
    return new Response("PDF-generatie mislukt", { status: 500 });
  }
}
