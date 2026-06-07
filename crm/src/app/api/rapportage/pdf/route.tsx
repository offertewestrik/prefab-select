import { renderToBuffer } from "@react-pdf/renderer";
import { RapportDocument, type RapportData } from "@/lib/pdf/RapportDocument";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as RapportData;
    if (!data?.type) return new Response("ongeldig rapport", { status: 400 });
    const buffer = await renderToBuffer(<RapportDocument data={data} />);
    return new Response(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="rapport-${data.type.toLowerCase()}.pdf"`,
      },
    });
  } catch (err) {
    console.error("Rapport-PDF mislukt:", err);
    return new Response("PDF-generatie mislukt", { status: 500 });
  }
}
