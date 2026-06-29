import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl, breadcrumbLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import {
  C, HEAD, BODY, PAGE_BG, CONTAINER,
  IcShield, IcCheck, IcCheckRing, IcArrow,
} from "@/components/marketing/ds";

export const revalidate = 86400;

const EI_URL = "https://energieinstall.nl";

const title = "Energie Install — warmtepomp, zonnepanelen & verduurzaming";
const description =
  "Voor warmtepompen, zonnepanelen, airco, thuisbatterijen en laadpalen werken wij samen met Energie Install: gecertificeerde verduurzaming met ISDE-subsidie en 0% btw, door heel Nederland.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/energie-install" },
  openGraph: { title, description, url: siteUrl("/energie-install"), type: "website", locale: "nl_NL" },
};

const DIENSTEN = [
  { t: "Warmtepompen", p: "Hybride en all-electric warmtepompen — bespaar op gas en maak je woning toekomstklaar, mét ISDE-subsidie.", path: "/warmtepomp" },
  { t: "Zonnepanelen", p: "A-merk panelen en omvormers, vakkundig geïnstalleerd, met 0% btw voor particulieren.", path: "/zonnepanelen" },
  { t: "Airco", p: "Energiezuinige split- en multisplit-units die verwarmen én koelen, STEK-gecertificeerd geplaatst.", path: "/airco" },
  { t: "Thuisbatterijen", p: "Sla je eigen zonnestroom op en gebruik het zelf — slim nu de salderingsregeling afloopt.", path: "/thuisbatterij" },
  { t: "Laadpalen", p: "Laad je auto thuis op, slim aangestuurd op je eigen opgewekte stroom.", path: "/laadpaal" },
  { t: "Totaal verduurzamen", p: "Eén partij voor het hele plaatje, tegen een vaste en eerlijke prijs.", path: "/" },
];

const VOORDELEN = [
  { icon: <IcShield stroke={C.blue} s={22} />, t: "Gecertificeerd & veilig", p: "Installatie volgens NEN 1010 en NEN 3140; airco met STEK-certificering, door erkende vakmensen." },
  { icon: <IcCheck stroke={C.blue} s={22} w={2.4} />, t: "Subsidie & 0% btw geregeld", p: "ISDE-subsidie aangevraagd en 0% btw voor particulieren — minder gedoe, meer voordeel." },
  { icon: <IcCheckRing stroke={C.blue} s={22} />, t: "Vaste, eerlijke prijs", p: "Particulier of zakelijk, van advies tot oplevering en onderhoud — zonder verrassingen." },
];

const eyebrow = { fontSize: 13, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: C.blue };
const h2 = { fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink } as const;
const lead = { fontSize: 17, lineHeight: 1.7, color: C.muted } as const;
const para = { fontSize: 16, lineHeight: 1.75, color: C.body } as const;
const eiLink = { color: C.blue, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 } as const;

export default function EnergieInstallPage() {
  const css = `
    .lph-ei [data-lift]{transition:transform .25s ease, box-shadow .25s ease}
    .lph-ei [data-lift]:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    @media (max-width:860px){ .lph-ei [data-grid3]{grid-template-columns:1fr !important} .lph-ei [data-vals]{grid-template-columns:1fr !important} }
  `;

  return (
    <main className="lph-ei" style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Energie Install", path: "/energie-install" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            description,
            url: siteUrl("/energie-install"),
            inLanguage: "nl-NL",
            mentions: {
              "@type": "Organization",
              name: "Energie Install",
              url: EI_URL,
              description: "Specialist in verduurzaming: warmtepompen, zonnepanelen, airco, thuisbatterijen en laadpalen.",
            },
          },
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#F6F9FE", borderBottom: `1px solid ${C.line2}` }}>
        <div style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "13px 28px", fontSize: 13, color: C.muted3, fontWeight: 600, display: "flex", gap: 8 }}>
          <Link href="/" style={{ color: C.muted3, textDecoration: "none" }}>Home</Link><span>/</span>
          <span style={{ color: C.ink }}>Energie Install</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "radial-gradient(1000px 460px at 14% -10%,#E6EFFF 0%,rgba(232,240,255,0) 60%),#fff", padding: "56px 0 44px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 28px" }}>
          <span style={eyebrow}>Onze verduurzamingspartner</span>
          <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 42, lineHeight: 1.12, letterSpacing: "-.025em", color: C.ink, marginTop: 10 }}>
            Verder dan de cv-ketel: verduurzamen met Energie Install
          </h1>
          <p style={{ ...lead, marginTop: 18 }}>
            Steeds meer huiseigenaren stappen over van gas naar een duurzame installatie. Voor warmtepompen,
            zonnepanelen, airco, thuisbatterijen en laadpalen werken wij samen met onze partner{" "}
            <a href={EI_URL} style={eiLink}>Energie Install</a> — specialist in verduurzaming, met de
            ISDE-subsidie en 0% btw netjes voor je geregeld.
          </p>
          <div style={{ marginTop: 26 }}>
            <a
              href={EI_URL}
              style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 24px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.3)" }}
            >
              Bezoek energieinstall.nl <IcArrow stroke="#fff" s={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Waarom */}
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "16px 28px 8px" }}>
        <h2 style={h2}>Van cv-ketel naar duurzaam comfort</h2>
        <p style={{ ...para, marginTop: 12 }}>
          Een cv-ketel die aan vervanging toe is, is vaak hét moment om verder te kijken dan gas. Een hybride
          of all-electric warmtepomp, zonnepanelen op het dak en een airco die zowel verwarmt als koelt:
          samen maken ze je woning klaar voor de toekomst en drukken ze je energierekening. Voor dat
          specialistische werk verwijzen wij naar onze partner{" "}
          <a href={EI_URL} style={eiLink}>Energie Install</a>.
        </p>
        <p style={{ ...para, marginTop: 14 }}>
          Energie Install verzorgt de complete installatie van zonnepanelen, warmtepompen, thuisbatterijen,
          laadpalen en airco voor particulieren en bedrijven door heel Nederland — tegen een vaste, eerlijke
          prijs. Alles wordt veilig aangelegd volgens NEN 1010 en NEN 3140 door gecertificeerde vakmensen, en
          de <strong>ISDE-subsidie en 0% btw</strong> worden voor je geregeld.
        </p>
        <p style={{ ...para, marginTop: 14 }}>
          Zo regel je onderhoud, vervanging én verduurzaming in één lijn. Wil je je woning verduurzamen? Dan
          ben je bij <a href={EI_URL} style={eiLink}>energieinstall.nl</a> aan het juiste adres.
        </p>
      </section>

      {/* Diensten */}
      <section style={{ position: "relative", maxWidth: CONTAINER, margin: "40px auto 0", padding: "56px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <span style={eyebrow}>Wat zij doen</span>
          <h2 style={{ ...h2, marginTop: 8, marginBottom: 26 }}>Verduurzaming van A tot Z</h2>
          <div data-grid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {DIENSTEN.map((d) => (
              <a
                key={d.t}
                href={`${EI_URL}${d.path}`}
                data-lift
                style={{ display: "block", background: "#fff", border: `1px solid ${C.line2}`, borderRadius: 16, padding: "22px 20px", textDecoration: "none" }}
              >
                <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 17, color: C.ink }}>{d.t}</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.muted2, marginTop: 8 }}>{d.p}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14, fontSize: 12.5, fontWeight: 700, color: C.blue }}>
                  Bekijk op Energie Install <IcArrow stroke={C.blue} s={15} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Voordelen */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "64px 28px" }}>
        <div data-vals style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
          {VOORDELEN.map((v) => (
            <div key={v.t} data-lift style={{ background: "#fff", border: `1px solid ${C.line2}`, borderRadius: 16, padding: "24px 22px" }}>
              {v.icon}
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink, marginTop: 14 }}>{v.t}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.muted2, marginTop: 6 }}>{v.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "8px 28px 96px" }}>
        <div style={{ background: C.navy, borderRadius: 22, padding: "56px 28px", textAlign: "center" }}>
          <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 30, letterSpacing: "-.02em", color: "#fff" }}>
            Klaar om te verduurzamen?
          </h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.78)", marginTop: 10, maxWidth: 540, marginInline: "auto" }}>
            Vraag via <a href={EI_URL} style={{ color: "#fff", fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3 }}>Energie Install</a>{" "}
            een vrijblijvend advies aan voor een warmtepomp, zonnepanelen of airco.
          </p>
          <a
            href={EI_URL}
            style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 22, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.34)" }}
          >
            Naar energieinstall.nl <IcArrow stroke="#fff" s={18} />
          </a>
        </div>
      </section>
    </main>
  );
}
