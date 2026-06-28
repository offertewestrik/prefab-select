import type { Metadata } from "next";
import Link from "next/link";
import { brand, regionsSentence } from "@repo/core";
import { siteUrl, breadcrumbLd, faqLd, itemListLd, urls } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { C, HEAD, BODY, PAGE_BG, IcStar, IcCheck, IcArrow, IcShield, IcPin } from "@/components/marketing/ds";

export const revalidate = 86400;

const title = "Loodgieter vergelijken — gratis offertes & beste vakmannen";
const description =
  "Loodgieter vergelijken doe je gratis: vraag tot 3 offertes aan en vergelijk gecertificeerde vakmannen op prijs, reviews en beschikbaarheid. Vraag nu vrijblijvend aan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/vergelijken" },
  openGraph: {
    title,
    description,
    url: siteUrl("/vergelijken"),
    type: "website",
    locale: "nl_NL",
  },
};

// ── Inhoud (statisch — geen backend/data-laag) ──────────────────────────────

const CRITERIA: { t: string; p: string; ic: "shield" | "star" | "check" | "pin" }[] = [
  {
    t: "Certificering & keurmerken",
    p: "Controleer of de loodgieter beschikt over erkenningen zoals InstallQ, Kiwa, OK CV, STEK of VCA. Een keurmerk staat voor vakmanschap, veiligheid en aansprakelijke uitvoering.",
    ic: "shield",
  },
  {
    t: "Reviews & beoordelingen",
    p: "Lees onafhankelijke reviews van eerdere klanten. Let op het gemiddelde cijfer, het aantal beoordelingen en hoe de vakman reageert op kritiek — dat zegt veel over de service.",
    ic: "star",
  },
  {
    t: "Prijs & offerte",
    p: "Vergelijk offertes op gelijke basis: voorrijkosten, uurtarief, materiaal en btw. De goedkoopste offerte is niet altijd de beste; let ook op wat er precies is inbegrepen.",
    ic: "check",
  },
  {
    t: "Beschikbaarheid & spoed",
    p: "Heb je een lekkage of storing? Kies een loodgieter met een 24/7 spoeddienst die snel in jouw regio kan zijn. Voor geplande klussen telt een realistische startdatum.",
    ic: "pin",
  },
  {
    t: "Garantie & verzekering",
    p: "Betrouwbare loodgieters geven garantie op hun werk en zijn verzekerd voor bedrijfsaansprakelijkheid. Vraag de garantievoorwaarden altijd schriftelijk in de offerte op.",
    ic: "shield",
  },
  {
    t: "Werkgebied",
    p: `Werkt de vakman in jouw stad of regio? Lokale loodgieters in ${regionsSentence()} hebben korte aanrijtijden en lagere voorrijkosten, wat de totaalprijs gunstig beïnvloedt.`,
    ic: "pin",
  },
];

const STEPS = [
  { n: 1, t: "Aanvraag plaatsen", p: "Vertel in 2 minuten over je klus, locatie en gewenste planning. Gratis en vrijblijvend." },
  { n: 2, t: "Offertes ontvangen", p: "Je ontvangt tot 3 offertes van gecertificeerde loodgieters uit jouw regio." },
  { n: 3, t: "Vergelijken", p: "Vergelijk op prijs, reviews, beschikbaarheid, garantie en keurmerken." },
  { n: 4, t: "Vakman kiezen", p: "Jij bepaalt met wie je in zee gaat. Geen verplichtingen, geen verrassingen." },
];

const SERVICE_LINKS = [
  { slug: "cv-ketel-vervangen", name: "CV-ketel vervangen" },
  { slug: "warmtepomp", name: "Warmtepomp installeren" },
  { slug: "lekkage-en-spoed", name: "Lekkage & spoed" },
  { slug: "badkamer-en-sanitair", name: "Badkamer & sanitair" },
  { slug: "afvoer-en-riool", name: "Afvoer & riool ontstoppen" },
];

const CITY_LINKS = [
  { slug: "amsterdam", name: "Amsterdam" },
  { slug: "rotterdam", name: "Rotterdam" },
  { slug: "utrecht", name: "Utrecht" },
  { slug: "den-haag", name: "Den Haag" },
  { slug: "eindhoven", name: "Eindhoven" },
];

// Vergelijkingstabel — Loodgieterplatform.nl als beste kolom.
const TABLE_ROWS: { label: string; platform: string; self: string; single: string; best?: boolean }[] = [
  { label: "Kosten", platform: "100% gratis", self: "Gratis, maar veel eigen tijd", single: "Vaak voorrijkosten" },
  { label: "Aantal offertes", platform: "Tot 3 offertes", self: "1 per gesprek", single: "1 offerte" },
  { label: "Gecertificeerde vakmannen", platform: "Vooraf gescreend", self: "Zelf controleren", single: "Onzeker" },
  { label: "Reviews vooraf", platform: "Ja, inzichtelijk", self: "Zelf opzoeken", single: "Beperkt" },
  { label: "Tijd kwijt", platform: "± 2 minuten", self: "Uren bellen", single: "Eén afspraak" },
  { label: "Vrijblijvend", platform: "Volledig vrijblijvend", self: "Wisselend", single: "Vaak niet" },
];

// FAQ — zichtbare content moet identiek zijn aan faqLd (consistentie).
const FAQS: { question: string; answer: string }[] = [
  {
    question: "Hoe vergelijk ik loodgieters?",
    answer:
      "Je vergelijkt loodgieters het snelst door één gratis aanvraag te plaatsen en tot 3 offertes naast elkaar te leggen. Beoordeel daarbij niet alleen de prijs, maar ook reviews, keurmerken, garantie en beschikbaarheid. Zo kies je de beste vakman voor jouw klus.",
  },
  {
    question: "Is loodgieters vergelijken gratis?",
    answer:
      "Ja, loodgieters vergelijken via Loodgieterplatform.nl is volledig gratis en vrijblijvend. Je betaalt niets voor het aanvragen en vergelijken van offertes en zit nergens aan vast. Je kiest pas een vakman als een offerte je echt aanspreekt.",
  },
  {
    question: "Hoeveel offertes krijg ik?",
    answer:
      "Je ontvangt doorgaans tot 3 offertes van beschikbare, gecertificeerde loodgieters uit jouw regio. Met drie offertes heb je genoeg vergelijkingsmateriaal om prijs, reviews en voorwaarden goed af te wegen, zonder dat je door een overvloed aan reacties hoeft te zoeken.",
  },
  {
    question: "Waar herken ik een betrouwbare loodgieter aan?",
    answer:
      "Een betrouwbare loodgieter heeft erkende keurmerken (zoals InstallQ, Kiwa of VCA), goede en recente reviews, een heldere offerte met btw en voorrijkosten, en geeft garantie op het werk. Ook duidelijke communicatie en een realistische planning zijn belangrijke signalen.",
  },
  {
    question: "Wat kost een loodgieter gemiddeld?",
    answer:
      "Een loodgieter kost gemiddeld €40 tot €90 per uur, plus vaak €30 tot €60 voorrijkosten. Bij spoed of 's avonds liggen de tarieven hoger. De totaalprijs hangt af van de klus en de materialen. Vergelijk offertes voor een exacte prijs op maat.",
  },
];

const ICONS = {
  shield: <IcShield stroke={C.blue} s={20} />,
  star: <IcStar s={20} />,
  check: <IcCheck s={20} w={3} stroke={C.blue} />,
  pin: <IcPin stroke={C.blue} s={20} />,
} as const;

export default function ComparisonPage() {
  const css = `
    .lph-vgl *{box-sizing:border-box}
    .lph-vgl [data-grid3] > div{transition:transform .25s ease, box-shadow .25s ease}
    .lph-vgl [data-grid3] > div:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    .lph-vgl [data-linkcard]{transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease}
    .lph-vgl [data-linkcard]:hover{transform:translateY(-2px);box-shadow:0 10px 24px rgba(15,27,51,.10);border-color:#DCE7FF}
    .lph-vgl .vgl-tablewrap{overflow-x:auto;-webkit-overflow-scrolling:touch}
    .lph-vgl table{border-collapse:collapse;width:100%;min-width:680px}
    .lph-vgl details > summary{list-style:none}
    .lph-vgl details > summary::-webkit-details-marker{display:none}
    .lph-vgl details[open] .vgl-chev{transform:rotate(180deg)}
    @media (max-width:680px){
      .lph-vgl [data-grid3]{grid-template-columns:1fr !important}
      .lph-vgl [data-grid2]{grid-template-columns:1fr !important}
      .lph-vgl [data-steps]{flex-direction:column !important}
      .lph-vgl [data-steparrow]{display:none !important}
    }
  `;

  return (
    <main className="lph-vgl" style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: "Vergelijken", path: "/vergelijken" },
          ]),
          itemListLd(CRITERIA.map((c) => ({ name: c.t, path: "/vergelijken" }))),
          faqLd(FAQS),
        ]}
      />

      {/* Breadcrumb */}
      <div style={{ background: "#F6F9FE", borderBottom: `1px solid ${C.line2}` }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "13px 28px", fontSize: 13, color: C.muted3, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/" style={{ color: C.muted3, textDecoration: "none" }}>Home</Link><span>/</span>
          <span style={{ color: C.ink }}>Vergelijken</span>
        </div>
      </div>

      {/* Hero */}
      <section style={{ background: "radial-gradient(900px 420px at 12% -10%,#E6EFFF 0%,rgba(232,240,255,0) 60%),#fff", padding: "52px 0 48px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#EFF4FF", borderRadius: 999, padding: "6px 13px", fontSize: 12.5, fontWeight: 700, color: C.blueDark, marginBottom: 16 }}>
            <IcStar s={13} />Loodgieter vergelijken
          </div>
          <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 40, lineHeight: 1.08, letterSpacing: "-.025em", color: C.ink, maxWidth: 820 }}>
            Loodgieter vergelijken: vind de beste vakman in jouw regio
          </h1>
          <p style={{ marginTop: 16, fontSize: 17, lineHeight: 1.62, color: C.muted, maxWidth: 720 }}>
            Loodgieters vergelijk je het slimst door gratis één aanvraag te plaatsen en tot 3 offertes
            naast elkaar te leggen. Zo vergelijk je in één oogopslag op prijs, reviews en beschikbaarheid —
            en kies je vrijblijvend de gecertificeerde vakman die het beste bij je klus past.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 26, flexWrap: "wrap" }}>
            <Link href="/aanvraag" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 24px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.3)" }}>
              Vraag gratis offertes aan <IcArrow />
            </Link>
            <span style={{ fontSize: 14, color: C.muted2, fontWeight: 600 }}>Gratis · Vrijblijvend · Tot 3 offertes</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 22 }}>
            {[
              { ic: <IcShield stroke={C.green} s={14} />, t: "Gecertificeerd & verzekerd" },
              { ic: <IcCheck s={14} w={3} />, t: "100% gratis & vrijblijvend" },
              { ic: <IcStar s={14} />, t: "Vergelijk op reviews" },
              { ic: <IcPin stroke={C.blue} s={14} />, t: regionsSentence() },
            ].map((chip, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "9px 13px", fontSize: 12.5, fontWeight: 700, color: "#1F2A45", boxShadow: "0 3px 10px rgba(15,27,51,.04)" }}>
                {chip.ic}{chip.t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Selectiecriteria */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "92px 28px" }}>
        <h2 style={{ fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink }}>Waar let je op bij het vergelijken?</h2>
        <p style={{ fontSize: 15.5, color: C.muted, marginTop: 8, maxWidth: 660 }}>
          Een goede loodgieter kies je op meer dan prijs alleen. Let bij het vergelijken op deze zes punten
          om de meest betrouwbare en voordelige vakman te vinden.
        </p>
        <div data-grid3 style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 26 }}>
          {CRITERIA.map((c) => (
            <div key={c.t} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 22, boxShadow: "0 6px 18px rgba(15,27,51,.05)" }}>
              <div style={{ width: 46, height: 46, borderRadius: 13, background: "#EFF4FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                {ICONS[c.ic]}
              </div>
              <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16.5, color: C.ink }}>{c.t}</div>
              <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.6, marginTop: 7 }}>{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vergelijkingstabel */}
      <section style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "96px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <h2 style={{ fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink }}>
          {brand.name} vs. zelf zoeken vs. losse offerte
        </h2>
        <p style={{ fontSize: 15.5, color: C.muted, marginTop: 8, maxWidth: 660 }}>
          Hoe pak je het vergelijken aan? Hieronder zie je waarom één gratis aanvraag via {brand.name}
          je tijd, geld en zekerheid oplevert ten opzichte van zelf zoeken of één losse offerte aanvragen.
        </p>
        <div className="vgl-tablewrap" style={{ marginTop: 26, border: `1px solid ${C.line}`, borderRadius: 16, boxShadow: "0 8px 22px rgba(15,27,51,.06)" }}>
          <table>
            <thead>
              <tr style={{ background: "#F6F9FE" }}>
                <th style={{ textAlign: "left", padding: "16px 18px", fontFamily: HEAD, fontSize: 13.5, fontWeight: 700, color: C.muted2, borderBottom: `1px solid ${C.line}` }}>Vergelijken op</th>
                <th style={{ textAlign: "left", padding: "16px 18px", fontFamily: HEAD, fontSize: 14.5, fontWeight: 800, color: C.blue, borderBottom: `2px solid ${C.blue}`, background: "#EFF4FF", whiteSpace: "nowrap" }}>
                  {brand.name}
                </th>
                <th style={{ textAlign: "left", padding: "16px 18px", fontFamily: HEAD, fontSize: 14, fontWeight: 700, color: C.ink, borderBottom: `1px solid ${C.line}`, whiteSpace: "nowrap" }}>Zelf zoeken</th>
                <th style={{ textAlign: "left", padding: "16px 18px", fontFamily: HEAD, fontSize: 14, fontWeight: 700, color: C.ink, borderBottom: `1px solid ${C.line}`, whiteSpace: "nowrap" }}>Losse offerte</th>
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 1 ? "#FBFCFE" : "#fff" }}>
                  <td style={{ padding: "15px 18px", fontWeight: 700, fontSize: 14, color: C.ink, borderBottom: `1px solid ${C.line2}` }}>{row.label}</td>
                  <td style={{ padding: "15px 18px", fontSize: 14, color: C.ink, fontWeight: 700, background: "#F4F8FF", borderBottom: `1px solid ${C.line2}` }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                      <IcCheck s={15} w={3} />{row.platform}
                    </span>
                  </td>
                  <td style={{ padding: "15px 18px", fontSize: 14, color: C.muted, borderBottom: `1px solid ${C.line2}` }}>{row.self}</td>
                  <td style={{ padding: "15px 18px", fontSize: 14, color: C.muted, borderBottom: `1px solid ${C.line2}` }}>{row.single}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 12.5, color: C.muted3, marginTop: 12 }}>
          Indicatief overzicht. De daadwerkelijke uitkomst hangt af van je klus, regio en de beschikbare vakmannen.
        </p>
      </section>

      {/* Stappen */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 28px" }}>
        <h2 style={{ fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginBottom: 36 }}>Zo vergelijk je in 4 stappen</h2>
        <div data-steps style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          {STEPS.map((st, i) => (
            <div key={st.n} style={{ display: "contents" }}>
              <div style={{ flex: 1, textAlign: "center", padding: "0 10px" }}>
                <div style={{ width: 50, height: 50, borderRadius: 14, background: st.n === 4 ? C.blue : "#EFF4FF", color: st.n === 4 ? "#fff" : C.blue, fontFamily: HEAD, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 13px", fontSize: 18 }}>{st.n}</div>
                <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{st.t}</div>
                <p style={{ fontSize: 13.5, color: C.muted2, marginTop: 6, lineHeight: 1.55 }}>{st.p}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div data-steparrow style={{ paddingTop: 19, color: "#C2CEE0" }}>
                  <IcArrow stroke="currentColor" s={22} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 34, textAlign: "center" }}>
          <Link href="/aanvraag" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.3)" }}>
            Start je gratis vergelijking <IcArrow />
          </Link>
        </div>
      </section>

      {/* Interne links */}
      <section style={{ position: "relative", maxWidth: 1120, margin: "0 auto", padding: "96px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <div data-grid2 style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
          {/* Per dienst */}
          <div>
            <h2 style={{ fontFamily: HEAD, fontSize: 20, fontWeight: 700, color: C.ink, marginBottom: 6 }}>Vergelijk per dienst</h2>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>
              Bekijk en vergelijk loodgieters per klus. Ontdek het volledige overzicht op de{" "}
              <Link href={urls.services()} style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}>dienstenpagina</Link>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SERVICE_LINKS.map((s) => (
                <Link key={s.slug} href={urls.service(s.slug)} data-linkcard style={{ fontSize: 13.5, fontWeight: 600, color: "#475069", background: "#F4F7FB", border: `1px solid ${C.line3}`, borderRadius: 9, padding: "9px 13px", textDecoration: "none" }}>
                  {s.name} vergelijken
                </Link>
              ))}
            </div>
          </div>
          {/* Per stad */}
          <div>
            <h2 style={{ fontFamily: HEAD, fontSize: 20, fontWeight: 700, color: C.ink, marginBottom: 6 }}>Vergelijk per stad</h2>
            <p style={{ fontSize: 14, color: C.muted, marginBottom: 16 }}>
              Vind een loodgieter dicht bij huis. Zie alle plaatsen op de{" "}
              <Link href={urls.cities()} style={{ color: C.blue, fontWeight: 700, textDecoration: "none" }}>stedenpagina</Link>.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {CITY_LINKS.map((c) => (
                <Link key={c.slug} href={urls.city(c.slug)} data-linkcard style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 600, color: C.blue, background: "#EFF4FF", border: "1px solid #DCE7FF", borderRadius: 9, padding: "9px 13px", textDecoration: "none" }}>
                  <IcPin stroke={C.blue} s={13} />Loodgieter {c.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 30, paddingTop: 26, borderTop: `1px solid ${C.line2}`, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.muted2 }}>Verder vergelijken:</span>
          <Link href={urls.installers()} data-linkcard style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: C.ink, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 14px", textDecoration: "none" }}>
            <IcStar s={14} />Alle vakmannen bekijken
          </Link>
          <Link href="/keurmerken" data-linkcard style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: C.ink, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 10, padding: "10px 14px", textDecoration: "none" }}>
            <IcShield stroke={C.green} s={14} />Keurmerken & erkenningen
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "96px 28px" }}>
        <h2 style={{ fontFamily: HEAD, fontSize: 28, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginBottom: 8 }}>Veelgestelde vragen over loodgieters vergelijken</h2>
        <p style={{ fontSize: 15, color: C.muted, marginBottom: 24 }}>De meest gestelde vragen over het vergelijken en kiezen van een loodgieter.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 860 }}>
          {FAQS.map((f, i) => (
            <details key={f.question} open={i === 0} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 13, overflow: "hidden", boxShadow: "0 4px 14px rgba(15,27,51,.04)" }}>
              <summary style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14, padding: "17px 20px", cursor: "pointer" }}>
                <span style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{f.question}</span>
                <span className="vgl-chev" style={{ display: "flex", flexShrink: 0, transition: "transform .2s ease" }} aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke={C.blue} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </summary>
              <p style={{ padding: "0 20px 18px", fontSize: 14.5, color: C.muted, lineHeight: 1.62 }}>{f.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Slot-CTA (navy gradient) */}
      <div style={{ maxWidth: 1120, margin: "0 auto 56px", padding: "0 28px" }}>
        <div style={{ background: "linear-gradient(120deg,#0E1F45,#1A2E5C)", borderRadius: 18, padding: "34px 36px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 23, color: "#fff" }}>Klaar om loodgieters te vergelijken?</div>
            <div style={{ color: "#9FB0CE", fontSize: 14.5, marginTop: 5 }}>Ontvang gratis en vrijblijvend tot 3 offertes van gecertificeerde vakmannen.</div>
          </div>
          <Link href="/aanvraag" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "15px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.34)" }}>
            Vraag gratis offertes aan <IcArrow />
          </Link>
        </div>
      </div>
    </main>
  );
}
