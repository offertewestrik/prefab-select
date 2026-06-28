import type { Metadata } from "next";
import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { urls } from "@repo/seo";
import { getCitiesByProvince } from "@/features/geo/server/queries";
import { C, HEAD, BODY, PAGE_BG, CONTAINER, IcPin, IcArrow } from "@/components/marketing/ds";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Steden & regio's",
  description: `${brand.name} werkt met gecertificeerde vakmannen in ${regionsSentence()}. Vind een loodgieter of installateur in jouw gemeente.`,
  alternates: { canonical: "/steden" },
};

export default async function CitiesPage() {
  const provinces = await getCitiesByProvince();

  const totalCities = provinces.reduce((acc, p) => acc + p.municipalities.length, 0);

  const css = `
    .lph-steden *{box-sizing:border-box}
    .lph-steden .lph-chip{transition:background-color .16s ease, border-color .16s ease, color .16s ease}
    .lph-steden .lph-chip:hover{background:#DCE7FF;border-color:#C3D6FF;color:${C.blueDark}}
    .lph-steden [data-prov-grid]{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}
    @media (max-width:760px){ .lph-steden [data-prov-grid]{grid-template-columns:1fr !important} }
  `;

  return (
    <main
      className="lph-steden"
      style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, minHeight: "100vh" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Hero */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "0 28px" }}>
        <div style={{ padding: "64px 0 40px", maxWidth: 720 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 7,
              background: "#EFF4FF",
              border: "1px solid #DCE7FF",
              borderRadius: 999,
              padding: "5px 12px",
              fontSize: 12.5,
              fontWeight: 700,
              color: C.blueDark,
              marginBottom: 16,
            }}
          >
            <IcPin s={14} />
            Heel Nederland
          </div>
          <h1
            style={{
              fontFamily: HEAD,
              fontWeight: 800,
              fontSize: 38,
              lineHeight: 1.12,
              letterSpacing: "-.025em",
              color: C.ink,
              margin: 0,
            }}
          >
            Vind een vakman in jouw gemeente
          </h1>
          <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: C.muted, maxWidth: 640 }}>
            Gecertificeerde loodgieters en installateurs, actief door heel Nederland. Kies je gemeente
            en vergelijk gratis en vrijblijvend offertes van vakmannen bij jou in de buurt.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              border: `1px solid ${C.line}`,
              borderRadius: 999,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 700,
              color: "#1F2A45",
              marginTop: 20,
              boxShadow: "0 3px 10px rgba(15,27,51,.04)",
            }}
          >
            {provinces.length} provincies · {totalCities} gemeenten
          </div>
        </div>
      </section>

      {/* Provincie-kaarten */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "0 28px 80px" }}>
        <div data-prov-grid>
          {provinces.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#fff",
                border: `1px solid ${C.line}`,
                borderRadius: 16,
                padding: 24,
                boxShadow: "0 6px 18px rgba(15,27,51,.05)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: "#EFF4FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IcPin s={20} />
                </span>
                <div>
                  <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 18, color: C.ink }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: 13, color: C.muted3, fontWeight: 600 }}>
                    {p.municipalities.length} gemeenten
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {p.municipalities.map((m) => (
                  <Link
                    key={m.id}
                    href={urls.city(m.slug)}
                    className="lph-chip"
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.blue,
                      background: "#EFF4FF",
                      border: "1px solid #DCE7FF",
                      borderRadius: 8,
                      padding: "8px 12px",
                      textDecoration: "none",
                    }}
                  >
                    {m.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Slot-CTA */}
        <div style={{ marginTop: 40 }}>
          <div
            style={{
              background: "linear-gradient(120deg,#0E1F45,#1A2E5C)",
              borderRadius: 18,
              padding: "28px 32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 21, color: "#fff" }}>
                Jouw gemeente niet gevonden?
              </div>
              <div style={{ color: "#9FB0CE", fontSize: 14, marginTop: 3 }}>
                Plaats een aanvraag — we werken met vakmannen door heel Nederland.
              </div>
            </div>
            <Link
              href="/aanvraag"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 9,
                background: C.orange,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 24px",
                borderRadius: 12,
                textDecoration: "none",
                boxShadow: "0 12px 24px rgba(242,106,27,.34)",
              }}
            >
              Vraag offertes aan <IcArrow />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
