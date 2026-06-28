import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { brand } from "@repo/core";
import { urls, breadcrumbLd, itemListLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { C, HEAD, BODY, PAGE_BG, CONTAINER, euro, IcArrow, IcCategory } from "@/components/marketing/ds";
import { BrandWall } from "@/components/marketing/trust/brand-wall";
import { getServicesByCategory } from "@/features/catalog/server/queries";

export const revalidate = 3600;

/** Passende (gecommitte) categoriefoto per dienst, op trefwoord. */
function dienstFoto(slug: string, name: string): string {
  const s = `${slug} ${name}`.toLowerCase();
  let cat = "cv-ketels";
  if (/(zonne|solar|laadpaal|pv|batterij|elektra|meterkast)/.test(s)) cat = "zonnepanelen";
  else if (/(dak|zink|goot|pannen|bitumen)/.test(s)) cat = "dakwerk";
  else if (/warmtepomp/.test(s)) cat = "warmtepompen";
  else if (/(airco|koel)/.test(s)) cat = "warmtepompen";
  else if (/vloerverwarming/.test(s)) cat = "vloerverwarming";
  else if (/radiator/.test(s)) cat = "radiatoren";
  else if (/(badkamer|sanitair|toilet|douche|wastafel|kraan|wc)/.test(s)) cat = "badkamers";
  else if (/keuken/.test(s)) cat = "keukenleidingen";
  else if (/(lek|spoed|ontstop|riool|afvoer|verstop|storing)/.test(s)) cat = "lekkages";
  else if (/(leiding|loodgiet)/.test(s)) cat = "leidingwerk";
  else if (/(cv|ketel|geiser|verwarm|boiler|warm.?water)/.test(s)) cat = "cv-ketels";
  return `/foto/${cat}/${cat}-01.jpg`;
}

const metaTitle = "Alle installatie- & loodgietersdiensten";
const metaDescription = `Bekijk alle installatie- en loodgietersdiensten van ${brand.name}: van CV-ketel en warmtepomp tot lekkage en ontstopping. Vraag gratis offertes aan.`;

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  alternates: { canonical: urls.services() },
  openGraph: { title: metaTitle, description: metaDescription, url: urls.services() },
};

const css = `
  .lph-diensten *{box-sizing:border-box}
  .lph-diensten [data-grid] > a{transition:transform .25s ease, box-shadow .25s ease}
  .lph-diensten [data-grid] > a:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
  .lph-diensten [data-clamp]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
  @media (max-width:760px){ .lph-diensten [data-grid]{grid-template-columns:1fr 1fr !important} }
  @media (max-width:520px){ .lph-diensten [data-grid]{grid-template-columns:1fr !important} }
`;

export default async function ServicesPage() {
  const categories = await getServicesByCategory();

  const serviceCount = categories.reduce((n, c) => n + c.services.length, 0);

  const allServices = categories.flatMap((c) =>
    c.services.map((s) => ({ name: s.name, path: urls.service(s.slug) })),
  );

  return (
    <main
      className="lph-diensten"
      style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, minHeight: "100vh" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: urls.home() },
            { name: "Diensten", path: urls.services() },
          ]),
          ...(allServices.length ? [itemListLd(allServices)] : []),
        ]}
      />

      {/* Hero header */}
      <div style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "64px 28px 8px" }}>
        <div
          style={{
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: ".08em",
            textTransform: "uppercase",
            color: C.blue,
          }}
        >
          Alle diensten
        </div>
        <h1
          style={{
            fontFamily: HEAD,
            fontWeight: 800,
            fontSize: 38,
            lineHeight: 1.12,
            letterSpacing: "-.025em",
            color: C.ink,
            margin: "10px 0 0",
          }}
        >
          Alle installatie- &amp; loodgietersdiensten
        </h1>
        <p style={{ marginTop: 14, fontSize: 16, lineHeight: 1.6, color: C.muted, maxWidth: 640 }}>
          Kies de dienst die bij jouw klus past en ontvang gratis offertes van gecertificeerde
          vakmannen. Van CV-ketel en warmtepomp tot lekkage, badkamer en ontstopping.
        </p>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 7,
            marginTop: 18,
            background: "#EFF4FF",
            borderRadius: 999,
            padding: "6px 13px",
            fontSize: 12.5,
            fontWeight: 700,
            color: C.blueDark,
          }}
        >
          <IcCategory s={15} />
          {serviceCount} diensten · {categories.length} categorie{categories.length === 1 ? "" : "ën"}
        </div>
      </div>

      {/* Categorieën */}
      <div style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "40px 28px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          {categories.map((cat) => (
            <section key={cat.id}>
              <h2
                style={{
                  fontFamily: HEAD,
                  fontWeight: 800,
                  fontSize: 22,
                  letterSpacing: "-.02em",
                  color: C.ink,
                  marginBottom: 20,
                }}
              >
                {cat.name}
              </h2>
              <div
                data-grid
                style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}
              >
                {cat.services.map((s) => {
                  const from = s.priceFrom != null ? `vanaf ${euro(s.priceFrom)}` : "Op aanvraag";
                  return (
                    <Link
                      key={s.slug}
                      href={urls.service(s.slug)}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: "#fff",
                        border: `1px solid ${C.line}`,
                        borderRadius: 16,
                        overflow: "hidden",
                        boxShadow: "0 6px 18px rgba(15,27,51,.05)",
                        textDecoration: "none",
                      }}
                    >
                      {/* Categoriefoto */}
                      <div style={{ position: "relative", height: 150, overflow: "hidden", background: "#eef2f8" }}>
                        <Image
                          src={dienstFoto(s.slug, s.name)}
                          alt={`${s.name} — vakwerk via ${brand.name}`}
                          fill
                          sizes="(max-width:520px) 100vw, (max-width:760px) 50vw, 25vw"
                          style={{ objectFit: "cover" }}
                        />
                      </div>

                      {/* Body */}
                      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: 18 }}>
                        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>
                          {s.name}
                        </div>
                        {s.shortDescription && (
                          <p
                            data-clamp
                            style={{
                              marginTop: 7,
                              fontSize: 13.5,
                              lineHeight: 1.5,
                              color: C.muted,
                            }}
                          >
                            {s.shortDescription}
                          </p>
                        )}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 10,
                            marginTop: "auto",
                            paddingTop: 16,
                          }}
                        >
                          <span style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 14.5, color: C.blue }}>
                            {from}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 32,
                              height: 32,
                              borderRadius: "50%",
                              background: C.blue,
                              flexShrink: 0,
                              boxShadow: "0 8px 16px rgba(37,99,235,.28)",
                            }}
                          >
                            <IcArrow s={16} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      <div style={{ height: 56 }} />

      <BrandWall />
    </main>
  );
}
