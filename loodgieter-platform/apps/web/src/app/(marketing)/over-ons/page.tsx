import type { Metadata } from "next";
import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { siteUrl, breadcrumbLd, organizationLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import {
  C, HEAD, BODY, PAGE_BG, CONTAINER,
  IcShield, IcCheck, IcCheckRing, IcPin, IcArrow, IcStar,
} from "@/components/marketing/ds";

export const revalidate = 86400;

const title = "Over ons — het installatieplatform van Nederland";
const description =
  "Loodgieterplatform.nl koppelt huiseigenaren aan gecertificeerde loodgieters en installateurs in heel Nederland. Lees wie we zijn, wat we doen en waar we voor staan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/over-ons" },
  openGraph: { title, description, url: siteUrl("/over-ons"), type: "website", locale: "nl_NL" },
};

const VALUES = [
  { icon: <IcShield stroke={C.blue} s={22} />, t: "Gecertificeerd & verzekerd", p: "Elke aangesloten vakman wordt gescreend en beschikt over de juiste erkenningen, zoals InstallQ, Kiwa, OK CV, STEK of VCA." },
  { icon: <IcCheck stroke={C.blue} s={22} w={2.4} />, t: "Transparant & gratis", p: "Aanvragen en offertes vergelijken is 100% gratis en vrijblijvend. Geen verborgen kosten, geen verplichtingen — jij houdt de regie." },
  { icon: <IcCheckRing stroke={C.blue} s={22} />, t: "Snel geholpen", p: "Vaak binnen enkele uren de eerste reacties en bij spoed dezelfde dag een vakman. Eén aanvraag, meerdere offertes." },
  { icon: <IcPin stroke={C.blue} s={22} />, t: "Heel Nederland", p: "Van Groningen tot Zeeland: in elke provincie staan gecertificeerde loodgieters en installateurs voor je klaar." },
];

const STEPS = [
  { n: 1, t: "Doe je aanvraag", p: "Vertel in 2 minuten wat je nodig hebt — desgewenst met foto's." },
  { n: 2, t: "Ontvang offertes", p: "Vakmannen uit jouw regio reageren met een offerte op maat." },
  { n: 3, t: "Vergelijk rustig", p: "Bekijk prijs, beoordelingen, keurmerken en beschikbaarheid." },
  { n: 4, t: "Kies je vakman", p: "Jij bepaalt met wie je in zee gaat. Klaar voor de klus." },
];

const STATS = [
  { v: "4.200+", l: "aangesloten vakmannen" },
  { v: "9,2", l: "gemiddelde beoordeling", star: true },
  { v: "12.480", l: "klantbeoordelingen" },
  { v: "12", l: "provincies gedekt" },
];

const eyebrow = { fontSize: 13, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: C.blue };
const h2 = { fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink } as const;
const lead = { fontSize: 17, lineHeight: 1.7, color: C.muted } as const;
const para = { fontSize: 16, lineHeight: 1.75, color: C.body } as const;

export default function AboutPage() {
  const css = `
    .lph-about [data-lift]{transition:transform .25s ease, box-shadow .25s ease}
    .lph-about [data-lift]:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    @media (max-width:860px){ .lph-about [data-grid2]{grid-template-columns:1fr !important} .lph-about [data-vals]{grid-template-columns:1fr !important} .lph-about [data-steps]{grid-template-columns:1fr 1fr !important} .lph-about [data-stats]{grid-template-columns:1fr 1fr !important} }
    @media (max-width:520px){ .lph-about [data-steps]{grid-template-columns:1fr !important} }
  `;

  return (
    <main className="lph-about" style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          organizationLd(),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Over ons", path: "/over-ons" },
          ]),
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#F6F9FE", borderBottom: `1px solid ${C.line2}` }}>
        <div style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "13px 28px", fontSize: 13, color: C.muted3, fontWeight: 600, display: "flex", gap: 8 }}>
          <Link href="/" style={{ color: C.muted3, textDecoration: "none" }}>Home</Link><span>/</span>
          <span style={{ color: C.ink }}>Over ons</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "radial-gradient(1000px 460px at 14% -10%,#E6EFFF 0%,rgba(232,240,255,0) 60%),#fff", padding: "56px 0 44px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 28px" }}>
          <span style={eyebrow}>Over ons</span>
          <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", color: C.ink, marginTop: 10 }}>
            Het installatieplatform van Nederland
          </h1>
          <p style={{ ...lead, marginTop: 18 }}>
            {brand.name} brengt huiseigenaren en gecertificeerde loodgieters en installateurs bij elkaar.
            Eén plek waar je vrijblijvend offertes vergelijkt en met een gerust hart de juiste vakman kiest —
            of het nu gaat om een nieuwe cv-ketel, een warmtepomp, een lekkage of een complete badkamerrenovatie.
          </p>
        </div>
      </section>

      {/* Tekstsecties */}
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "8px 28px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <div>
            <h2 style={h2}>Wie wij zijn</h2>
            <p style={{ ...para, marginTop: 12 }}>
              {brand.name} is een onafhankelijk platform met een simpele overtuiging: het vinden van een
              betrouwbare vakman hoort niet moeilijk te zijn. Toch herkennen veel mensen het gevoel —
              eindeloos bellen, wachten op terugbelletjes en twijfelen of de prijs én de kwaliteit wel kloppen.
              Daar zijn wij voor opgericht. We combineren een zorgvuldig geselecteerd netwerk van
              installatiebedrijven met slimme technologie, zodat jij in een paar minuten geholpen bent in
              plaats van een paar dagen.
            </p>
          </div>

          <div>
            <h2 style={h2}>Wat wij doen</h2>
            <p style={{ ...para, marginTop: 12 }}>
              Wij koppelen jouw klus aan de juiste vakmannen uit je eigen regio. Je omschrijft één keer wat je
              nodig hebt en ontvangt vervolgens offertes van gecertificeerde loodgieters en installateurs.
              Je vergelijkt ze rustig op prijs, beoordelingen, keurmerken en beschikbaarheid, en kiest zelf met
              wie je verdergaat. Van cv-ketels en warmtepompen tot vloerverwarming, radiatoren, badkamers,
              lekkages, dakwerk en zonnepanelen: voor vrijwel elke klus in en om het huis vind je hier een
              specialist. Vergelijken is altijd <strong style={{ color: C.ink }}>gratis en volledig vrijblijvend</strong>.
            </p>
          </div>

          <div>
            <h2 style={h2}>Waarom wij bestaan</h2>
            <p style={{ ...para, marginTop: 12 }}>
              Een lekkage, een kapotte ketel of een verouderde badkamer — niemand zit te wachten op gedoe
              bovenop het ongemak. Tegelijk verdienen vakkundige installateurs het om gevonden te worden door
              klanten die hun werk waarderen. Door beide kanten eerlijk samen te brengen, maken we de markt
              transparanter: huiseigenaren krijgen duidelijkheid en keuze, en goede vakmannen krijgen gerichte
              opdrachten zonder loze leads. Zo wint iedereen.
            </p>
          </div>

          <div>
            <h2 style={h2}>Onderdeel van Prefab Select</h2>
            <p style={{ ...para, marginTop: 12 }}>
              Loodgieterplatform.nl komt voort uit de bouw- en verbouwwereld. Ons zusterbedrijf{" "}
              <a
                href="https://www.prefabselect.nl"
                style={{ color: C.blue, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                Prefab Select
              </a>{" "}
              realiseert circulaire, modulaire uitbouwen, aanbouwen en mantelzorgwoningen door heel
              Nederland. Daar zagen we van dichtbij hoe belangrijk goed installatiewerk is — en hoe lastig
              het soms is om als huiseigenaar een betrouwbare loodgieter te vinden. Loodgieterplatform.nl is
              ons antwoord daarop. Ga je{" "}
              <a
                href="https://www.prefabselect.nl"
                style={{ color: C.blue, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 3 }}
              >
                verbouwen of uitbouwen
              </a>
              ? Dan helpt Prefab Select je graag verder.
            </p>
          </div>
        </div>
      </section>

      {/* Kernwaarden */}
      <section style={{ position: "relative", maxWidth: CONTAINER, margin: "40px auto 0", padding: "64px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={eyebrow}>Waar wij voor staan</span>
          <h2 style={{ ...h2, fontSize: 30, marginTop: 8 }}>Onze beloften aan jou</h2>
        </div>
        <div data-vals style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {VALUES.map((v) => (
            <div key={v.t} data-lift style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 22, boxShadow: "0 6px 18px rgba(15,27,51,.05)" }}>
              <span style={{ display: "inline-flex", width: 46, height: 46, borderRadius: 12, background: "#EFF4FF", alignItems: "center", justifyContent: "center" }}>{v.icon}</span>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink, marginTop: 14 }}>{v.t}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: C.muted2, marginTop: 6 }}>{v.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hoe het werkt */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "72px 28px 16px" }}>
        <div style={{ marginBottom: 28 }}>
          <span style={eyebrow}>Hoe het werkt</span>
          <h2 style={{ ...h2, marginTop: 8 }}>In vier stappen geregeld</h2>
        </div>
        <div data-steps style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STEPS.map((s) => (
            <div key={s.n} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 22, boxShadow: "0 6px 18px rgba(15,27,51,.05)" }}>
              <span style={{ display: "inline-flex", width: 40, height: 40, borderRadius: 12, background: s.n === 4 ? C.blue : "#EFF4FF", color: s.n === 4 ? "#fff" : C.blue, fontFamily: HEAD, fontWeight: 800, alignItems: "center", justifyContent: "center", fontSize: 16 }}>{s.n}</span>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink, marginTop: 14 }}>{s.t}</h3>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: C.muted2, marginTop: 6 }}>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cijfers */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "56px 28px" }}>
        <div data-stats style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, background: "linear-gradient(120deg,#0E1F45,#1A2E5C)", borderRadius: 20, padding: "36px 32px" }}>
          {STATS.map((s) => (
            <div key={s.l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 30, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                {s.star && <IcStar s={22} />}{s.v}
              </div>
              <div style={{ fontSize: 13, color: "#9FB0CE", marginTop: 4, fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: C.muted3, textAlign: "center", marginTop: 12 }}>
          Cijfers ter illustratie van de omvang van het netwerk.
        </p>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "8px 28px 96px" }}>
        <div style={{ background: "radial-gradient(700px 320px at 80% 0%, rgba(37,99,235,.16), transparent 60%), #fff", border: `1px solid ${C.line}`, borderRadius: 20, padding: "40px 36px", textAlign: "center", boxShadow: "0 18px 40px rgba(15,27,51,.06)" }}>
          <h2 style={{ ...h2, fontSize: 26 }}>Klaar om je klus te regelen?</h2>
          <p style={{ fontSize: 15.5, color: C.muted, marginTop: 10, maxWidth: 520, marginInline: "auto" }}>
            Vergelijk gratis en vrijblijvend offertes van gecertificeerde vakmannen in {regionsSentence()}.
          </p>
          <Link href="/aanvraag" style={{ marginTop: 24, display: "inline-flex", alignItems: "center", gap: 10, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 28px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 26px rgba(242,106,27,.34)" }}>
            Vraag gratis offertes aan <IcArrow />
          </Link>
        </div>
      </section>
    </main>
  );
}
