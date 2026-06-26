import { ImageResponse } from "next/og";
import { brand } from "@repo/core";

export const runtime = "edge";

// Dynamische OpenGraph-afbeelding per pagina (zie docs/04 §7).
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = (searchParams.get("title") ?? brand.name).slice(0, 120);
  const subtitle = searchParams.get("subtitle") ?? brand.tagline;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 32, fontWeight: 700, opacity: 0.9 }}>{brand.name}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 30, opacity: 0.85 }}>{subtitle}</div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.8 }}>Gratis offertes · Gecertificeerde vakmannen</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
