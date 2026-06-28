import Link from "next/link";
import { organizationLd, websiteLd, urls } from "@repo/seo";
import { JsonLd } from "@/components/json-ld";
import { CoverageMap } from "@/components/marketing/home/coverage-map";
import { getServicesByCategory } from "@/features/catalog/server/queries";
import { searchInstallers, type InstallerCardData } from "@/features/installers/server/directory";
import { getLatestReviews, type ReviewAggregate } from "@/features/reviews/server/aggregation";
import { getInstallerCountByProvince } from "@/features/geo/server/queries";

export const revalidate = 3600;

// ── Design tokens (Nederlands Loodgieterplatform Design System) ──
const HEAD = "var(--font-sora), 'Sora', sans-serif";
const BODY = "var(--font-jakarta), 'Plus Jakarta Sans', sans-serif";
const C = {
  ink: "#0E1B33",
  body: "#3A4A66",
  muted: "#56627C",
  muted2: "#6B7896",
  muted3: "#8A94A8",
  muted4: "#9AA6BC",
  blue: "#2563EB",
  blueDark: "#1E4FD6",
  orange: "#F26A1B",
  green: "#16A34A",
  green2: "#16D183",
  star: "#FFB400",
  line: "#EAEFF6",
  line2: "#EEF2F8",
  line3: "#E5EAF1",
  navy: "#0B1730",
};

const PAGE_BG =
  "radial-gradient(900px 520px at 86% 4%, rgba(37,99,235,.05), transparent 60%), radial-gradient(760px 460px at 2% 26%, rgba(22,209,131,.045), transparent 55%), linear-gradient(180deg,#F5F7FB 0%,#F1F4F9 100%)";

const MONO = [
  { bg: "#EFF4FF", fg: "#2563EB" },
  { bg: "#FFF3E9", fg: "#F26A1B" },
  { bg: "#E9F7EF", fg: "#16A34A" },
];

const FALLBACK_BRANDS = ["Remeha", "Nefit", "Vaillant", "Intergas", "Daikin", "ATAG", "Bosch"];

type PopularService = {
  slug: string;
  name: string;
  shortDescription: string;
  priceFrom: number | null;
  priceTo: number | null;
  priceUnit: string | null;
};

type CategoryCard = { id: string; name: string; slug: string; serviceCount: number };

const EMPTY_REVIEWS: ReviewAggregate = {
  average: 0,
  count: 0,
  distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  latest: [],
};

const euro = (n: number) => "€" + n.toLocaleString("nl-NL");
const monogram = (name: string) => {
  const w = name.trim().split(/\s+/).filter(Boolean);
  const letters = w.map((x) => x[0] ?? "").join("");
  return (letters || "?").slice(0, 2).toUpperCase();
};

// ── Inline-iconen (matchen de SVG's uit het ontwerp) ──
function IcStar({ s = 13, fill = C.star }: { s?: number; fill?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill} aria-hidden>
      <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8L12 2Z" />
    </svg>
  );
}
function IcCheck({ s = 15, w = 3, stroke = C.green }: { s?: number; w?: number; stroke?: string }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden style={{ flexShrink: 0 }}>
      <path d="M5 13l4 4L19 7" stroke={stroke} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcArrow({ stroke = "#fff", s = 18 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 12h14M13 6l6 6-6 6" stroke={stroke} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IcLock({ stroke = C.blue, s = 13 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="10" width="14" height="10" rx="2" stroke={stroke} strokeWidth="1.8" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke={stroke} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function IcShield({ stroke = "#fff", s = 13 }: { stroke?: string; s?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6l7-3Z" stroke={stroke} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Categorie-icoon (eenvoudig leiding/installatie-symbool)
function IcCategory() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M6 4v8a3 3 0 0 0 3 3h9M18 11l3 4-3 4" stroke={C.blue} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// "Hoe het werkt" stappen
const STEPS = [
  { t: "Dienst kiezen", p: "Vertel ons waar je hulp bij nodig hebt." },
  { t: "Locatie & details", p: "Postcode en (optioneel) foto's van de klus." },
  { t: "Vakmannen matchen", p: "Wij koppelen je aan vakmannen uit je regio." },
  { t: "Offertes vergelijken", p: "Bekijk prijs, reviews en beschikbaarheid." },
  { t: "Vakman kiezen", p: "Kies zelf de beste vakman voor de klus." },
];

const WHY = [
  { t: "Gecertificeerd", p: "Alle vakmannen zijn gescreend en gecertificeerd." },
  { t: "Gratis & vrijblijvend", p: "Binnen 2 minuten je aanvraag de deur uit." },
  { t: "Snel geholpen", p: "Vaak dezelfde week een vakman beschikbaar." },
  { t: "Vergelijk offertes", p: "Kies zelf de beste vakman en prijs." },
];

const DISCOVER = [
  { title: "Diensten", desc: "Alle installatie- en loodgietersdiensten", href: "/diensten" },
  { title: "Steden", desc: "Vind een vakman in jouw stad", href: "/steden" },
  { title: "Merken", desc: "Remeha, Nefit, Vaillant en meer", href: "/merken" },
  { title: "Kennisbank", desc: "Tips, kosten en uitleg", href: "/kennisbank" },
];

export default async function HomePage() {
  // Alle data komt uit de bestaande queries — niets aan de backend gewijzigd.
  let popular: PopularService[] = [];
  let serviceOptions: { slug: string; name: string }[] = [];
  let categories: CategoryCard[] = [];
  let installers: InstallerCardData[] = [];
  let installersTotal = 0;
  let reviews: ReviewAggregate = EMPTY_REVIEWS;
  let provinceCounts: { slug: string; name: string; count: number }[] = [];

  try {
    const cats = await getServicesByCategory();
    const all = cats.flatMap((c) => c.services);
    popular = all.slice(0, 4).map((s) => ({
      slug: s.slug,
      name: s.name,
      shortDescription: s.shortDescription,
      priceFrom: s.priceFrom,
      priceTo: s.priceTo,
      priceUnit: s.priceUnit,
    }));
    serviceOptions = all.map((s) => ({ slug: s.slug, name: s.name }));
    categories = cats.slice(0, 4).map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      serviceCount: c.services.length,
    }));
  } catch {
    /* graceful: lege staat */
  }

  try {
    const result = await searchInstallers({ sort: "rating" });
    installers = result.items;
    installersTotal = result.total;
  } catch {
    /* graceful: secties tonen fallback */
  }

  try {
    reviews = await getLatestReviews();
  } catch {
    reviews = EMPTY_REVIEWS;
  }

  try {
    provinceCounts = await getInstallerCountByProvince();
  } catch {
    provinceCounts = [];
  }

  const rating = reviews.count > 0 ? reviews.average.toFixed(1).replace(".", ",") : "9,2";
  const installersLabel = installersTotal > 0 ? `${installersTotal.toLocaleString("nl-NL")}` : "4.200+";
  const reviewCountLabel = reviews.count > 0 ? `${reviews.count.toLocaleString("nl-NL")} beoordelingen` : "12.480 beoordelingen";

  const featured = installers[0] ?? null;
  const topPros = installers.slice(0, 6);
  const latestReviews = reviews.latest.slice(0, 3);

  const heroStats = [
    { v: installersLabel, l: "aangesloten vakmannen", color: C.ink, star: false },
    { v: rating, l: reviewCountLabel, color: C.ink, star: true },
    { v: "Gratis", l: "100% vrijblijvend", color: C.green, star: false },
    { v: "2 min", l: "aanvraag klaar", color: C.ink, star: false },
  ];

  const css = `
    .lph-home *{box-sizing:border-box}
    .lph-home input,.lph-home select{transition:border-color .18s ease, box-shadow .18s ease}
    .lph-home input:focus,.lph-home select:focus{border-color:${C.blue} !important;box-shadow:0 0 0 4px rgba(37,99,235,.13)}
    .lph-home [data-lift]{transition:transform .25s ease, box-shadow .25s ease}
    .lph-home [data-lift]:hover{transform:translateY(-5px);box-shadow:0 18px 38px rgba(15,27,51,.12)}
    @media (max-width:1180px){
      .lph-home [data-hero]{flex-direction:column !important}
      .lph-home [data-hero-left]{order:1 !important;width:100% !important;max-width:none !important;flex:none !important}
      .lph-home [data-form]{order:2 !important;width:100% !important;max-width:620px !important;flex:none !important}
      .lph-home [data-hero-mid]{order:3 !important;min-height:380px !important;flex:none !important;width:100% !important}
    }
    @media (max-width:980px){
      .lph-home [data-svcgrid]{grid-template-columns:repeat(2,1fr) !important}
      .lph-home [data-allesvc]{grid-template-columns:repeat(2,1fr) !important}
      .lph-home [data-pros]{grid-template-columns:repeat(2,1fr) !important}
      .lph-home [data-why]{grid-template-columns:repeat(2,1fr) !important}
      .lph-home [data-seogrid]{grid-template-columns:repeat(2,1fr) !important}
      .lph-home [data-vakmannen]{flex-direction:column !important;text-align:center !important}
    }
    @media (max-width:760px){
      .lph-home [data-steps]{flex-direction:column !important}
      .lph-home [data-step]{width:100% !important}
      .lph-home [data-steparrow]{display:none !important}
      .lph-home [data-reviews]{grid-template-columns:1fr !important}
      .lph-home [data-statgrid]{grid-template-columns:1fr 1fr !important}
      .lph-home [data-merken]{gap:14px 24px !important}
    }
    @media (max-width:520px){
      .lph-home [data-svcgrid]{grid-template-columns:1fr !important}
      .lph-home [data-allesvc]{grid-template-columns:1fr !important}
      .lph-home [data-pros]{grid-template-columns:1fr !important}
      .lph-home [data-why]{grid-template-columns:1fr !important}
      .lph-home [data-seogrid]{grid-template-columns:1fr !important}
      .lph-home [data-statgrid]{grid-template-columns:1fr !important}
    }
  `;

  const container = { maxWidth: 1280, margin: "0 auto", padding: "0 28px" } as const;
  const eyebrow = { fontSize: 13, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" as const, color: C.blue };
  const h2 = { fontFamily: HEAD, fontSize: 32, fontWeight: 800, letterSpacing: "-.02em", color: C.ink, marginTop: 8 };
  const cardBase = {
    background: "#fff",
    border: `1px solid ${C.line}`,
    borderRadius: 16,
    boxShadow: "0 6px 18px rgba(15,27,51,.05)",
  } as const;

  return (
    <main className="lph-home" style={{ background: PAGE_BG, fontFamily: BODY, color: C.body, overflowX: "hidden" }}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <JsonLd data={[organizationLd(), websiteLd()]} />

      {/* ── 1. HERO ── */}
      <section style={{ background: "radial-gradient(1100px 520px at 16% -8%,#E6EFFF 0%,rgba(232,240,255,0) 58%),linear-gradient(180deg,#F3F8FF 0%,#FFFFFF 80%)", padding: "42px 0 28px" }}>
        <div style={container}>
          <div data-hero style={{ display: "flex", alignItems: "stretch", gap: 30 }}>

            {/* Links */}
            <div data-hero-left style={{ flex: "0 0 384px", maxWidth: 384, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start", background: "#fff", border: "1px solid #DCE7FF", borderRadius: 999, padding: "5px 13px 5px 7px", fontSize: 12.5, fontWeight: 700, color: C.ink, boxShadow: "0 4px 12px rgba(15,27,51,.05)", marginBottom: 18 }}>
                <span style={{ display: "inline-flex", gap: 1 }}>
                  {[0, 1, 2, 3, 4].map((i) => <IcStar key={i} s={13} />)}
                </span>
                {rating} — Beste van Nederland
              </div>
              <h1 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 41, lineHeight: 1.07, letterSpacing: "-.025em", color: C.ink }}>
                Het grootste installatieplatform van Nederland
              </h1>
              <p style={{ marginTop: 15, fontSize: 16.5, lineHeight: 1.55, color: C.muted, maxWidth: 360 }}>
                Vergelijk gratis offertes van gecertificeerde loodgieters en installateurs uit jouw regio. Binnen 2 minuten geregeld.
              </p>

              <div data-statgrid style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 22 }}>
                {heroStats.map((s) => (
                  <div key={s.l} style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 13, padding: "13px 15px", boxShadow: "0 4px 14px rgba(15,27,51,.04)" }}>
                    <div style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 21, color: s.color, display: "flex", alignItems: "center", gap: 5 }}>
                      {s.star && <IcStar s={16} />}{s.v}
                    </div>
                    <div style={{ fontSize: 12, color: C.muted2, fontWeight: 600, marginTop: 1 }}>{s.l}</div>
                  </div>
                ))}
              </div>

              <Link href="/aanvraag" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10, alignSelf: "flex-start", background: C.orange, color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 24px rgba(242,106,27,.32)" }}>
                Vraag gratis offertes aan <IcArrow />
              </Link>
              <div style={{ marginTop: 13, display: "flex", alignItems: "center", gap: 16, fontSize: 13, fontWeight: 600, color: C.muted2 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}><IcCheck s={15} />Geen verplichtingen</span>
                <span style={{ display: "flex", alignItems: "center", gap: 7 }}><IcLock s={15} />Veilig & versleuteld</span>
              </div>
            </div>

            {/* Midden — gradient-paneel met overlay-chips */}
            <div data-hero-mid style={{ flex: 1, minWidth: 0, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 452, borderRadius: 22, overflow: "hidden", boxShadow: "0 34px 70px rgba(15,27,51,.16)", background: "linear-gradient(135deg,#1E4FD6 0%,#2563EB 45%,#0E1F45 100%)" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(8,18,40,.10) 0%,rgba(8,18,40,0) 38%,rgba(8,18,40,.58) 100%)", pointerEvents: "none" }} />

                <div style={{ position: "absolute", top: 16, left: 16, zIndex: 5, display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,.92)", backdropFilter: "blur(6px)", borderRadius: 999, padding: "6px 12px", boxShadow: "0 8px 20px rgba(15,27,51,.18)", fontSize: 12, fontWeight: 700, color: C.ink }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.green2 }} />14 klussen nu live in je regio
                </div>
                <div style={{ position: "absolute", top: 16, right: 16, zIndex: 5, display: "flex", alignItems: "center", gap: 6, background: C.blue, borderRadius: 999, padding: "6px 13px", boxShadow: "0 8px 20px rgba(37,99,235,.4)", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                  <IcShield s={13} />Geverifieerd
                </div>

                <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, zIndex: 5, display: "flex", alignItems: "center", gap: 13, background: "rgba(255,255,255,.96)", backdropFilter: "blur(8px)", borderRadius: 15, padding: "13px 16px", boxShadow: "0 16px 34px rgba(8,18,40,.28)" }}>
                  <span style={{ width: 46, height: 46, borderRadius: 12, background: C.blueDark, color: "#fff", fontFamily: HEAD, fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {featured ? monogram(featured.name) : "JV"}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 14.5, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {featured ? featured.name : "Jeroen — CV & warmtepomp monteur"}
                    </div>
                    <div style={{ fontSize: 12, color: C.muted2 }}>
                      {featured ? (featured.city ?? featured.provinces[0] ?? "Heel Nederland") : "Intergas & Remeha gecertificeerd · Amsterdam"}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#FFF8E8", border: "1px solid #FCE9C0", borderRadius: 9, padding: "5px 9px", flexShrink: 0 }}>
                    <IcStar s={14} />
                    <span style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 14, color: C.ink }}>
                      {featured && featured.ratingAvg > 0 ? featured.ratingAvg.toFixed(1).replace(".", ",") : "9,6"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rechts — aanvraagformulier (single-card, navigeert naar /aanvraag) */}
            <form data-form action="/aanvraag" method="get" style={{ flex: "0 0 392px", maxWidth: 392, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 20, boxShadow: "0 26px 64px rgba(15,27,51,.14)", overflow: "hidden" }}>
              <div style={{ background: "#FFF6E9", borderBottom: "1px solid #FBE6C8", padding: "10px 22px", display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, fontWeight: 700, color: "#9A5A12" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.orange }} />Nog 3 vakmannen vrij vandaag in jouw regio
              </div>
              <div style={{ padding: 22 }}>
                <h3 style={{ fontFamily: HEAD, fontSize: 19, fontWeight: 700, color: C.ink, letterSpacing: "-.01em" }}>Waarmee kunnen we je helpen?</h3>
                <p style={{ fontSize: 13.5, color: C.muted2, marginTop: 5, marginBottom: 15 }}>Selecteer een dienst en je locatie — wij doen de rest.</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#475069" }}>
                    Dienst
                    <select name="dienst" defaultValue="" style={{ padding: "11px 13px", border: `1.5px solid ${C.line3}`, borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: C.ink, outline: "none", background: "#fff", appearance: "none" }}>
                      <option value="" disabled>Kies een dienst…</option>
                      {serviceOptions.map((s) => (
                        <option key={s.slug} value={s.slug}>{s.name}</option>
                      ))}
                    </select>
                  </label>
                  <div style={{ display: "flex", gap: 10 }}>
                    <label style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#475069" }}>
                      Postcode
                      <input name="postcode" placeholder="1234 AB" style={{ padding: "11px 13px", border: `1.5px solid ${C.line3}`, borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: C.ink, outline: "none" }} />
                    </label>
                    <label style={{ width: 108, display: "flex", flexDirection: "column", gap: 6, fontSize: 12.5, fontWeight: 700, color: "#475069" }}>
                      Huisnr.
                      <input name="huisnummer" placeholder="12" style={{ padding: "11px 13px", border: `1.5px solid ${C.line3}`, borderRadius: 10, fontFamily: "inherit", fontSize: 14, color: C.ink, outline: "none" }} />
                    </label>
                  </div>
                  <button type="submit" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 15, background: C.orange, border: 0, borderRadius: 11, fontFamily: "inherit", fontWeight: 700, fontSize: 15, color: "#fff", cursor: "pointer", boxShadow: "0 12px 24px rgba(242,106,27,.32)" }}>
                    Vraag gratis offertes aan <IcArrow s={16} />
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 14, fontSize: 11.5, fontWeight: 600, color: C.muted3 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IcCheck s={13} />100% gratis</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IcCheck s={13} />Geen verplichting</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IcLock s={12} />SSL</span>
                </div>
              </div>
            </form>
          </div>

          {/* Merken-row */}
          <div data-merken style={{ marginTop: 34, display: "flex", alignItems: "center", justifyContent: "center", gap: "14px 44px", flexWrap: "wrap", padding: 22, borderTop: `1px solid ${C.line2}`, borderBottom: `1px solid ${C.line2}` }}>
            <span style={{ fontSize: 12.5, fontWeight: 700, color: C.muted4, letterSpacing: ".04em", textTransform: "uppercase", marginRight: 8 }}>Wij installeren o.a.</span>
            {FALLBACK_BRANDS.map((b) => (
              <span key={b} style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 18, color: "#AEB9CC" }}>{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Hoe het werkt ── */}
      <section style={{ ...container, padding: "112px 28px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <span style={eyebrow}>Hoe het werkt</span>
          <h2 style={h2}>In 5 minuten naar 3 offertes</h2>
        </div>
        <div data-steps style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
          {STEPS.map((st, i) => (
            <div key={st.t} style={{ display: "contents" }}>
              <div data-step style={{ flex: 1, textAlign: "center", padding: "0 8px" }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: i === STEPS.length - 1 ? C.blue : "#fff", border: i === STEPS.length - 1 ? "none" : "1px solid #E6ECF5", boxShadow: i === STEPS.length - 1 ? "0 12px 24px rgba(37,99,235,.34)" : "0 8px 18px rgba(15,27,51,.06)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontFamily: HEAD, fontWeight: 800, fontSize: 19, color: i === STEPS.length - 1 ? "#fff" : C.blue }}>
                  {i === STEPS.length - 1 ? <IcCheck s={26} w={2.6} stroke="#fff" /> : i + 1}
                </div>
                <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15.5, color: C.ink }}>{i + 1}. {st.t}</div>
                <p style={{ fontSize: 13, color: C.muted2, marginTop: 6, lineHeight: 1.5 }}>{st.p}</p>
              </div>
              {i < STEPS.length - 1 && (
                <div data-steparrow style={{ paddingTop: 22, color: "#C2CEE0" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. Populaire diensten ── */}
      {popular.length > 0 && (
        <section style={{ position: "relative", ...container, padding: "112px 28px 16px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 24 }}>
            <div>
              <span style={eyebrow}>Populaire diensten</span>
              <h2 style={h2}>Meest aangevraagde klussen</h2>
            </div>
            <Link href="/diensten" style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14, color: C.blue, textDecoration: "none" }}>
              Alle diensten <IcArrow stroke={C.blue} s={15} />
            </Link>
          </div>
          <div data-svcgrid style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
            {popular.map((s) => (
              <Link key={s.slug} href={urls.service(s.slug)} data-lift style={{ ...cardBase, overflow: "hidden", textDecoration: "none", display: "block" }}>
                <div style={{ height: 146, width: "100%", background: "linear-gradient(135deg,#1E4FD6 0%,#2563EB 45%,#0E1F45 100%)", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(150deg,rgba(8,18,40,.06),rgba(8,18,40,0) 50%,rgba(8,18,40,.32))" }} />
                </div>
                <div style={{ padding: "15px 16px 17px" }}>
                  <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>{s.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 7 }}>
                    <span style={{ fontSize: 13, color: C.muted3, fontWeight: 600 }}>
                      {s.priceFrom != null ? <>vanaf <span style={{ color: C.blue, fontWeight: 800 }}>{euro(s.priceFrom)}</span></> : <span style={{ color: C.blue, fontWeight: 800 }}>Op aanvraag</span>}
                    </span>
                    <span style={{ fontSize: 12, color: C.muted2, fontWeight: 600, display: "flex", alignItems: "center", gap: 3 }}>
                      <IcStar s={13} />{rating}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── 4. Alle hoofddiensten (categorieën) ── */}
      {categories.length > 0 && (
        <section style={{ position: "relative", ...container, padding: "24px 28px 112px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
          <div style={{ marginBottom: 22 }}>
            <span style={eyebrow}>Alle hoofddiensten</span>
            <h2 style={{ ...h2, fontSize: 28 }}>Eén platform voor je hele installatie</h2>
          </div>
          <div data-allesvc style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
            {categories.map((cat) => (
              <Link key={cat.id} href="/diensten" data-lift style={{ display: "flex", alignItems: "center", gap: 13, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 13, padding: 15, textDecoration: "none", boxShadow: "0 4px 12px rgba(15,27,51,.04)" }}>
                <span style={{ width: 42, height: 42, borderRadius: 11, background: "#EFF4FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <IcCategory />
                </span>
                <span style={{ minWidth: 0 }}>
                  <span style={{ display: "block", fontFamily: HEAD, fontWeight: 700, fontSize: 14.5, color: C.ink }}>{cat.name}</span>
                  <span style={{ fontSize: 12, color: C.muted3 }}>{cat.serviceCount} {cat.serviceCount === 1 ? "dienst" : "diensten"}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── 5. Topvakmannen ── */}
      {topPros.length > 0 && (
        <section style={{ position: "relative", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
          <div style={{ ...container, padding: "104px 28px" }}>
            <div data-vakmannen style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 26 }}>
              <div>
                <span style={eyebrow}>Topvakmannen</span>
                <h2 style={h2}>Gecertificeerde vakmannen bij jou in de buurt</h2>
              </div>
              <Link href="/vakmannen" style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700, fontSize: 14, color: C.blue, textDecoration: "none" }}>
                Bekijk alle vakmannen <IcArrow stroke={C.blue} s={15} />
              </Link>
            </div>
            <div data-pros style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
              {topPros.map((sp, i) => {
                const m = MONO[i % MONO.length]!;
                return (
                  <Link key={sp.id} href={`/vakmannen/${sp.slug}`} data-lift style={{ ...cardBase, padding: 20, textDecoration: "none", display: "block" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                      <span style={{ width: 54, height: 54, borderRadius: 14, background: m.bg, color: m.fg, fontFamily: HEAD, fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{monogram(sp.name)}</span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 16, color: C.ink }}>{sp.name}</div>
                        <div style={{ fontSize: 12.5, color: C.muted3 }}>{sp.city ?? sp.provinces[0] ?? "Heel Nederland"}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 13 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 3, background: "#FFF8E8", border: "1px solid #FCE9C0", borderRadius: 8, padding: "3px 8px", fontSize: 12.5, fontWeight: 800, color: C.ink }}>
                        <IcStar s={13} />{sp.ratingAvg > 0 ? sp.ratingAvg.toFixed(1).replace(".", ",") : "Nieuw"}
                      </span>
                      <span style={{ fontSize: 12.5, color: C.muted3, fontWeight: 600 }}>
                        {sp.ratingCount > 0 ? `${sp.ratingCount} reviews` : "Nieuw op het platform"}
                      </span>
                    </div>
                    {sp.services.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
                        {sp.services.slice(0, 3).map((svc) => (
                          <span key={svc.slug} style={{ fontSize: 11.5, fontWeight: 700, color: C.blueDark, background: "#EFF4FF", borderRadius: 7, padding: "4px 9px" }}>{svc.name}</span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Coverage map ── */}
      <CoverageMap data={provinceCounts} />

      {/* ── 7. Reviews ── */}
      <section style={{ ...container, padding: "112px 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 28 }}>
          <div>
            <span style={eyebrow}>Reviews</span>
            <h2 style={h2}>Wat zeggen onze klanten?</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#fff", border: `1px solid ${C.line}`, borderRadius: 12, padding: "12px 18px", boxShadow: "0 6px 18px rgba(15,27,51,.05)" }}>
            <span style={{ fontFamily: HEAD, fontWeight: 800, color: C.ink, fontSize: 15 }}>Uitstekend</span>
            <span style={{ display: "flex", gap: 2 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <span key={i} style={{ width: 19, height: 19, background: "#00B67A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <IcStar s={12} fill="#fff" />
                </span>
              ))}
            </span>
            <span style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>{rating} · {reviews.count > 0 ? reviewCountLabel : "geverifieerde reviews"}</span>
          </div>
        </div>

        {latestReviews.length > 0 ? (
          <div data-reviews style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {latestReviews.map((r, i) => {
              const m = MONO[i % MONO.length]!;
              return (
                <div key={r.id} style={{ ...cardBase, padding: 22 }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 12 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <IcStar key={n} s={16} fill={n <= r.rating ? "#00B67A" : "#D7E0EC"} />
                    ))}
                  </div>
                  <p style={{ fontSize: 14.5, color: C.body, lineHeight: 1.6 }}>
                    {r.title ? <strong style={{ color: C.ink }}>{r.title}. </strong> : null}{r.body}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 11, marginTop: 18 }}>
                    <span style={{ width: 40, height: 40, borderRadius: "50%", background: m.bg, color: m.fg, fontFamily: HEAD, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>{monogram(r.authorLabel)}</span>
                    <div>
                      <div style={{ fontWeight: 700, color: C.ink, fontSize: 14 }}>
                        {r.authorLabel}{r.cityName ? ` · ${r.cityName}` : ""}
                      </div>
                      <div style={{ fontSize: 12.5, color: C.muted3 }}>via {r.companyName}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ ...cardBase, padding: "40px 32px", textAlign: "center", maxWidth: 760, margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF8E8", border: "1px solid #FCE9C0", borderRadius: 999, padding: "7px 14px", fontFamily: HEAD, fontWeight: 800, fontSize: 16, color: C.ink, marginBottom: 14 }}>
              <IcStar s={16} />{rating} gemiddeld
            </div>
            <h3 style={{ fontFamily: HEAD, fontSize: 20, fontWeight: 700, color: C.ink }}>Vakmannen met een streng selectiebeleid</h3>
            <p style={{ fontSize: 15, color: C.muted, marginTop: 10, maxWidth: 520, marginInline: "auto", lineHeight: 1.6 }}>
              Alle vakmannen op het platform zijn gescreend en gecertificeerd. Geverifieerde reviews verschijnen hier zodra de eerste klussen zijn afgerond.
            </p>
          </div>
        )}
      </section>

      {/* ── 8. Voor vakmannen ── */}
      <section style={{ position: "relative", background: "radial-gradient(820px 420px at 82% 6%, rgba(37,99,235,.20), transparent 60%), linear-gradient(180deg,#0B1730 0%,#0E1F45 100%)", boxShadow: `0 0 0 100vw ${C.navy}`, clipPath: "inset(0 -100vw)" }}>
        <div style={{ ...container, padding: "100px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 420px", minWidth: 0 }}>
              <span style={{ ...eyebrow, color: "#5B8DEF" }}>Voor vakmannen</span>
              <h2 style={{ fontFamily: HEAD, fontSize: 34, fontWeight: 800, letterSpacing: "-.02em", color: "#fff", marginTop: 10, lineHeight: 1.12 }}>Meer opdrachten, minder gedoe</h2>
              <p style={{ color: "#9FB0CE", fontSize: 16, lineHeight: 1.6, marginTop: 14, maxWidth: 460 }}>
                Ontvang gerichte leads uit jouw werkgebied en beheer offertes, opdrachten en reviews vanuit één dashboard.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "13px 26px", marginTop: 22 }}>
                {["Exclusieve leads, geen veiling", "Hoge slagingskans op opdrachten", "Betrouwbare, snelle betalingen", "Bepaal zelf je werkgebied"].map((t) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, color: "#E5ECF8", fontSize: 15, fontWeight: 600 }}>
                    <span style={{ width: 24, height: 24, borderRadius: "50%", background: "rgba(91,141,239,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <IcCheck s={13} stroke="#5B8DEF" />
                    </span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <Link href="/voor-vakmannen" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: C.blue, color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 26px", borderRadius: 12, textDecoration: "none", boxShadow: "0 14px 28px rgba(37,99,235,.4)" }}>
                Word partner <IcArrow s={17} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Waarom Loodgieterplatform.nl ── */}
      <section style={{ position: "relative", ...container, padding: "112px 28px", background: "#fff", boxShadow: "0 0 0 100vw #fff", clipPath: "inset(0 -100vw)" }}>
        <div style={{ textAlign: "center", marginBottom: 38 }}>
          <span style={eyebrow}>Waarom Loodgieterplatform.nl</span>
          <h2 style={h2}>Het vertrouwde platform van Nederland</h2>
        </div>
        <div data-why style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {WHY.map((w) => (
            <div key={w.t} style={{ textAlign: "center", padding: 8 }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "#EFF4FF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
                <IcShield stroke={C.blue} s={24} />
              </div>
              <div style={{ fontFamily: HEAD, fontWeight: 700, fontSize: 15, color: C.ink }}>{w.t}</div>
              <p style={{ fontSize: 13, color: C.muted2, marginTop: 6, lineHeight: 1.5 }}>{w.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 10. Ontdek het platform ── */}
      <section style={{ background: "linear-gradient(180deg,#F5F7FB,#F1F4F9)", borderTop: `1px solid ${C.line}` }}>
        <div style={{ ...container, padding: "112px 28px 96px" }}>
          <div style={{ marginBottom: 30 }}>
            <span style={eyebrow}>Ontdek het platform</span>
            <h2 style={{ ...h2, fontSize: 28 }}>Diensten, steden, merken & kennis</h2>
          </div>
          <div data-seogrid style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
            {DISCOVER.map((d) => (
              <Link key={d.href} href={d.href} data-lift style={{ ...cardBase, padding: 22, textDecoration: "none", display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h3 style={{ fontFamily: HEAD, fontSize: 17, fontWeight: 700, color: C.ink }}>{d.title}</h3>
                  <IcArrow stroke={C.blue} s={16} />
                </div>
                <p style={{ fontSize: 13.5, color: C.muted2, lineHeight: 1.5 }}>{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Final CTA ── */}
      <section style={{ ...container, padding: "96px 28px" }}>
        <div style={{ background: "linear-gradient(120deg,#0E1F45,#1A2E5C)", borderRadius: 20, padding: "44px 40px", textAlign: "center", boxShadow: "0 20px 44px rgba(14,27,51,.2)" }}>
          <h2 style={{ fontFamily: HEAD, fontWeight: 800, fontSize: 30, letterSpacing: "-.02em", color: "#fff", lineHeight: 1.15, maxWidth: 640, marginInline: "auto" }}>
            Klaar om je klus te regelen?
          </h2>
          <p style={{ color: "#9FB0CE", fontSize: 16, marginTop: 12, maxWidth: 520, marginInline: "auto" }}>
            Ontvang gratis en vrijblijvend tot 3 offertes van gecertificeerde vakmannen uit jouw regio.
          </p>
          <Link href="/aanvraag" style={{ marginTop: 26, display: "inline-flex", alignItems: "center", gap: 10, background: C.orange, color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 30px", borderRadius: 12, textDecoration: "none", boxShadow: "0 12px 26px rgba(242,106,27,.4)" }}>
            Vraag gratis offertes aan <IcArrow />
          </Link>
        </div>
      </section>

      <div style={{ height: 40 }} />
    </main>
  );
}
