import { renderToBuffer } from "@react-pdf/renderer";
import { OfferteDocument } from "@/lib/pdf/OfferteDocument";
import type { Lead, Quote } from "@/lib/types";

// @react-pdf/renderer heeft de Node-runtime nodig (geen edge).
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { quote, lead } = (await req.json()) as { quote: Quote; lead: Lead };
    if (!quote || !lead) {
      return new Response("quote en lead zijn verplicht", { status: 400 });
    }

    const buffer = await renderToBuffer(<OfferteDocument quote={quote} lead={lead} />);

    return new Response(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="offerte-${quote.nummer}.pdf"`,
      },
    });
  } catch (err) {
    console.error("PDF-generatie mislukt:", err);
    return new Response("PDF-generatie mislukt", { status: 500 });
  }
}
