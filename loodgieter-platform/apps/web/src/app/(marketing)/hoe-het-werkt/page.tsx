import type { Metadata } from "next";
import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { siteUrl, breadcrumbLd, faqLd } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import {
  C, HEAD, BODY, PAGE_BG, CONTAINER,
  IcShield, IcCheck, IcCheckRing, IcArrow, IcLock,
} from "@/components/marketing/ds";

export const revalidate = 86400;

const title = "Hoe het werkt — in 4 stappen de juiste vakman";
const description =
  "Zo werkt Loodgieterplatform.nl: doe in 2 minuten een gratis aanvraag, ontvang offertes van gecertificeerde vakmannen, vergelijk en kies zelf. Vrijblijvend en zonder kosten.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/hoe-het-werkt" },
  openGraph: { title, description, url: siteUrl("/hoe-het-werkt"), type: "website", locale: "nl_NL" },
};

const STEPS = [
  { n: 1, t: "Doe je aanvraag", p: "Vertel in 2 minuten welke klus je hebt en waar je woont — desgewenst met foto's. Gratis en vrijblijvend." },
  { n: 2, t: "Ontvang offertes", p: "Gecertificeerde vakmannen uit jouw regio die beschikbaar zijn, reageren met een offerte op maat." },
  { n: 3, t: "Vergelijk rustig", p: "Bekijk prijs, beoordelingen, keurmerken en beschikbaarheid naast elkaar. Geen haast, geen druk." },
  { n: 4, t: "Kies je vakman", p: "Jij bepaalt met wie je in zee gaat. Klus geregeld — vaak al binnen enkele dagen, bij spoed dezelfde dag." },
];

const WAAROM = [
  { icon: <IcShield stroke={C.blue} s={22} />, t: "Gecertificeerd & verzekerd", p: "Elke aangesloten vakman wordt gescreend en beschikt over de juiste erkenningen (o.a. InstallQ, Kiwa, OK CV, STEK, VCA)." },
  { icon: <IcCheck stroke={C.blue} s={22} w={2.4} />, t: "Gratis & vrijblijvend", p: "Aanvragen en offertes vergelijken is 100% gratis. Geen verborgen kosten, geen verplichtingen." },
  { icon: <IcCheckRing stroke={C.blue} s={22} />, t: "Snel geholpen", p: "Vaak binnen enkele uren de eerste reacties, en bij spoed dezelfde dag een vakman bij je thuis." },
  { icon: <IcLock stroke={C.blue} s={20} />, t: "Veilig & transparant", p: "Je gegevens worden veilig verwerkt en je houdt zelf de regie over je keuze." },
];

const FAQS = [
  { question: "Wat kost het om een aanvraag te doen?", answer: "Niets. Een aanvraag doen en offertes vergelijken via Loodgieterplatform.nl is volledig gratis en vrijblijvend. Je betaalt alleen de vakman die je uiteindelijk zelf kiest voor de klus." },
  { question: "Hoe snel krijg ik reactie?", answer: "Vaak ontvang je binnen enkele uren de eerste reacties van beschikbare vakmannen. Bij een spoedklus, zoals een lekkage of een uitgevallen cv-ketel, kan een vakman dezelfde dag langskomen." },
  { question: "Zijn de vakmannen betrouwbaar?", answer: "Ja. Elke aangesloten vakman wordt gescreend en beschikt over de juiste certificeringen en verzekeringen. Bovendien zie je de beoordelingen van andere klanten, zodat je met een gerust hart kiest." },
  { question: "Ben ik verplicht een offerte te accepteren?", answer: "Nee, je zit nergens aan vast. Je vergelijkt de offertes rustig en kiest alleen een vakman als je een goede match vindt. Vind je niets passends, dan hoef je niets te doen." },
  { question: "In welke regio's zijn jullie actief?", answer: `Door heel Nederland, met vakmannen in elke provincie. We hebben een sterke dekking in onder andere ${regionsSentence()}.` },
];

const eyebrow = { fontSize: 13, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: C.blue };
const h2 = { fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink } as const;
const lead = { fontSize: 17, lineHeight: 1.7, color: C.muted } as const;

export default function HoeHetWerktPage() {
  const css = `
    .lph-hhw [data-lift]{transition:transform .25s ease, box-shadow .25s ease}
    .lph-hhw [data-lift]:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    @media (max-width:860px){ .lph-hhw [data-steps]{grid-template-columns:1fr 1fr !important} .lph-hhw [data-waarom]{grid-template-columns:1fr !important} }
    @media (max-width:520px){ .lph-hhw [data-steps]{grid-template-columns:1fr !important} }
  `;
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Hoe vind je een vakman via Loodgieterplatform.nl?",
    description,
    step: STEPS.map((s) => ({ "@type": "HowToStep", position: s.n, name: s.t, text: s.p })),
  };

  return (
    <main className="lph-hhw" style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Hoe het werkt", path: "/hoe-het-werkt" },
          ]),
          howToLd,
          faqLd(FAQS),
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#F6F9FE", borderBottom: `1px solid ${C.line2}` }}>
        <div style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "13px 28px", fontSize: 13, color: C.muted3, fontWeight: 600, display: "flex", gap: 8 }}>
          <Link href="/" style={{ color: C.muted3, textDecoration: "none" }}>Home</Link><span>/</span>
          <span style={{ color: C.ink }}>Hoe het werkt</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "radial-gradient(1000px 460px at 14% -10%,#E6EFFF 0%,rgba(232,240,255,0) 60%),#fff", padding: "56px 0 40px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "0 28px" }}>
          <span style={eyebrow}>Hoe het werkt</span>
          <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 42, lineHeight: 1.1, letterSpacing: "-.025em", color: C.ink, marginTop: 10 }}>
            In 4 stappen de juiste vakman
          </h1>
          <p style={{ ...lead, marginTop: 18 }}>
            {brand.name} maakt het vinden van een betrouwbare loodgieter of installateur simpel. Je doet
            één gratis aanvraag, ontvangt offertes van gecontroleerde vakmannen uit je regio en kiest zelf
            — vrijblijvend en zonder kosten.
          </p>
          <div style={{ marginTop: 26 }}>
            <Link href="/aanvraag" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.3)" }}>
              Start je gratis aanvraag <IcArrow stroke="#fff" s={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Stappen */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "48px 28px 8px" }}>
        <div data-steps style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {STEPS.map((s) => (
            <div key={s.n} data-lift style={{ background: "#fff", border: `1px solid ${C.line2}`, borderRadius: 16, padding: "24px 20px" }}>
              <div style={{ width: 40, height: 40, borderRadius: 11, background: C.blue, color: "#fff", fontFamily: HEAD, fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
              <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16.5, color: C.ink, marginTop: 14 }}>{s.t}</h3>
              <p style={{ fontSize: 13.8, lineHeight: 1.6, color: C.muted2, marginTop: 6 }}>{s.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Waarom via ons */}
      <section style={{ position: "relative", maxWidth: CONTAINER, margin: "40px auto 0", padding: "64px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          <span style={eyebrow}>Waarom via {brand.shortName}</span>
          <h2 style={{ ...h2, marginTop: 8, marginBottom: 26 }}>Met een gerust hart de juiste keuze</h2>
          <div data-waarom style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {WAAROM.map((w) => (
              <div key={w.t} data-lift style={{ display: "flex", gap: 14, background: "#fff", border: `1px solid ${C.line2}`, borderRadius: 16, padding: "20px 22px" }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, background: "#EFF4FF", border: `1px solid ${C.line2}`, display: "flex", alignItems: "center", justifyContent: "center" }}>{w.icon}</div>
                <div>
                  <h3 style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>{w.t}</h3>
                  <p style={{ fontSize: 13.8, lineHeight: 1.6, color: C.muted2, marginTop: 4 }}>{w.p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Voor vakmannen */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "64px 28px 8px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", justifyContent: "space-between", background: "#F6F9FE", border: `1px solid ${C.line2}`, borderRadius: 18, padding: "26px 28px" }}>
          <div style={{ maxWidth: 620 }}>
            <h2 style={{ ...h2, fontSize: 22 }}>Ben je vakman?</h2>
            <p style={{ fontSize: 15, color: C.muted, marginTop: 8 }}>
              Ontvang gerichte aanvragen uit jouw werkgebied en bepaal zelf op welke leads je reageert.
              Geen loze leads — jij houdt de regie.
            </p>
          </div>
          <Link href="/voor-vakmannen" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.blue, color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 22px", borderRadius: 12, textDecoration: "none" }}>
            Word partner <IcArrow stroke="#fff" s={17} />
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 820, margin: "0 auto", padding: "64px 28px 16px" }}>
        <h2 style={{ ...h2, marginBottom: 18 }}>Veelgestelde vragen</h2>
        <div style={{ border: `1px solid ${C.line2}`, borderRadius: 16, overflow: "hidden", background: "#fff" }}>
          {FAQS.map((f, i) => (
            <details key={i} style={{ borderTop: i ? `1px solid ${C.line2}` : "none" }}>
              <summary style={{ cursor: "pointer", listStyle: "none", padding: "16px 20px", fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{f.question}</summary>
              <p style={{ padding: "0 20px 16px", fontSize: 14.5, lineHeight: 1.6, color: C.muted2, margin: 0 }}>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: CONTAINER, margin: "0 auto", padding: "8px 28px 96px" }}>
        <div style={{ background: C.navy, borderRadius: 22, padding: "56px 28px", textAlign: "center" }}>
          <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 30, letterSpacing: "-.02em", color: "#fff" }}>Klaar om je klus te regelen?</h2>
          <p style={{ fontSize: 15.5, color: "rgba(255,255,255,.78)", marginTop: 10, maxWidth: 520, marginInline: "auto" }}>
            Doe een gratis, vrijblijvende aanvraag en ontvang offertes van gecertificeerde vakmannen in jouw regio.
          </p>
          <div style={{ marginTop: 22, display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/aanvraag" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.34)" }}>
              Start je aanvraag <IcArrow stroke="#fff" s={18} />
            </Link>
            <Link href="/diensten" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,255,255,.12)", color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 26px", borderRadius: 12, textDecoration: "none", border: "1px solid rgba(255,255,255,.25)" }}>
              Bekijk diensten
            </Link>
          </div>
          <div style={{ marginTop: 18, display: "flex", gap: 18, justifyContent: "center", flexWrap: "wrap", fontSize: 12.5, fontWeight: 600, color: "rgba(255,255,255,.7)" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IcCheck stroke="#fff" s={13} w={3} /> Gecertificeerde vakmensen</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IcCheck stroke="#fff" s={13} w={3} /> 100% gratis</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><IcCheck stroke="#fff" s={13} w={3} /> Vrijblijvend</span>
          </div>
        </div>
      </section>
    </main>
  );
}
