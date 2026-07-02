import "server-only";
import { Document, Page, Text, View, StyleSheet, Image, Svg, Polygon, renderToBuffer } from "@react-pdf/renderer";
import type { LineItem } from "../schema";

export interface QuotePdfInput {
  kind?: "quote" | "invoice";
  number: string;
  title?: string | null;
  introText?: string | null;
  createdAt: Date;
  validUntil?: Date | null;
  company: {
    name: string;
    email?: string | null;
    phone?: string | null;
    logoUrl?: string | null;
    street?: string | null;
    postcode?: string | null;
    city?: string | null;
    kvk?: string | null;
    vatNumber?: string | null;
    website?: string | null;
  };
  customer: { name?: string | null; email?: string | null; phone?: string | null; address?: string | null };
  lineItems: LineItem[];
  subtotalCents: number;
  discountCents: number;
  vatRate: number;
  vatCents: number;
  totalCents: number;
  terms?: string | null;
  /** Uit ContractorSettings — getoond in het betaalblok (factuur) en de footer. */
  iban?: string | null;
  footerNote?: string | null;
  /** Hex-huisstijlkleur van de vakman (bijv. #2563EB); valt terug op platform-blauw. */
  accentColor?: string | null;
  /** Hex-kleur voor de kop-/voetbalk (bijv. #0E1B33); valt terug op navy. */
  secondaryColor?: string | null;
}

const eur = (c: number) => `€ ${(c / 100).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const date = (d: Date) => d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

// ── Kleurhelpers voor de per-vakman accentkleur ──
function normHex(v?: string | null): string | null {
  if (!v) return null;
  const m = v.trim().replace(/^#/, "");
  if (/^[0-9a-fA-F]{6}$/.test(m)) return `#${m.toLowerCase()}`;
  if (/^[0-9a-fA-F]{3}$/.test(m)) return `#${m.split("").map((c) => c + c).join("").toLowerCase()}`;
  return null;
}
function toRgb(hex: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)) as [number, number, number];
}
const hex2 = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, "0");
/** Meng met wit (w = 0..1) voor een zachte tint als achtergrond. */
function mixWhite(hex: string, w: number): string {
  const [r, g, b] = toRgb(hex);
  return `#${hex2(r * (1 - w) + 255 * w)}${hex2(g * (1 - w) + 255 * w)}${hex2(b * (1 - w) + 255 * w)}`;
}
/** Meng met zwart (w = 0..1) voor een donkerder accent (diepte in de vormen). */
function mixBlack(hex: string, w: number): string {
  const [r, g, b] = toRgb(hex);
  return `#${hex2(r * (1 - w))}${hex2(g * (1 - w))}${hex2(b * (1 - w))}`;
}
function luminance(hex: string): number {
  const [r, g, b] = toRgb(hex).map((c) => {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
/** Leesbare tekstkleur (wit of donker) op een gevulde accentachtergrond. */
function readableOn(hex: string): string {
  return luminance(hex) > 0.55 ? "#0E1B33" : "#FFFFFF";
}

// ── Huisstijl-basiskleuren ──
const C = {
  navy: "#0E1B33",
  ink: "#0E1B33",
  text: "#1F2A45",
  muted: "#6B7280",
  faint: "#9AA6BC",
  onDark: "#FFFFFF",
  onDarkMuted: "#B7C0D6",
  blue: "#2563EB",
  orange: "#F26A1B",
  orangeSoft: "#FFF4EC",
  line: "#E7ECF3",
  zebra: "#FAFBFD",
};

const PAGE_W = 595.28; // A4-breedte in pt
const HEADER_H = 120;
const FOOTER_H = 82;

const s = StyleSheet.create({
  page: { fontSize: 9.5, color: C.text, fontFamily: "Helvetica", lineHeight: 1.45, paddingBottom: FOOTER_H + 18 },

  // Kopgrafiek
  header: { height: HEADER_H, position: "relative" },
  headerSvg: { position: "absolute", top: 0, left: 0 },
  headerLeft: { position: "absolute", top: 24, left: 40, maxWidth: 330 },
  companyName: { fontSize: 15, fontFamily: "Helvetica-Bold", color: C.onDark },
  onDarkLine: { color: C.onDarkMuted, fontSize: 9, marginTop: 2 },
  logoTile: { position: "absolute", top: 20, right: 40, backgroundColor: "#FFFFFF", borderRadius: 6, padding: 6, maxWidth: 160, alignItems: "center" },
  logoImg: { height: 34, objectFit: "contain" },

  content: { paddingHorizontal: 40, paddingTop: 22 },

  // Bovenrij: klant links, documentgegevens rechts
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  card: { alignSelf: "flex-start", minWidth: 230, maxWidth: 300, borderRadius: 6, padding: 12, borderLeftWidth: 3 },
  label: { fontSize: 7, textTransform: "uppercase", color: C.faint, marginBottom: 3, letterSpacing: 0.6, fontFamily: "Helvetica-Bold" },
  strong: { fontFamily: "Helvetica-Bold", color: C.ink },
  muted: { color: C.muted },
  docBlock: { alignItems: "flex-end" },
  docType: { fontSize: 22, fontFamily: "Helvetica-Bold", letterSpacing: 1, lineHeight: 1 },
  docNum: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: C.ink, marginTop: 5 },
  metaRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6 },
  metaLabel: { color: C.faint, fontSize: 8.5, textAlign: "right" },
  metaVal: { color: C.text, fontSize: 8.5, textAlign: "right", marginLeft: 6, fontFamily: "Helvetica-Bold" },

  // Titel / intro
  title: { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.ink, marginTop: 20 },
  intro: { marginTop: 4, color: C.text },

  // Tabel
  tHead: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 8, borderRadius: 4, marginTop: 18 },
  tHeadCell: { fontFamily: "Helvetica-Bold", color: C.ink, fontSize: 8.5 },
  tRow: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 8, borderBottomWidth: 1, borderBottomColor: C.line },
  tRowAlt: { backgroundColor: C.zebra },
  cDesc: { flex: 1, paddingRight: 8 },
  cQty: { width: 45, textAlign: "right" },
  cPrice: { width: 78, textAlign: "right" },
  cTot: { width: 82, textAlign: "right" },
  optTag: { color: C.faint, fontFamily: "Helvetica-Oblique" },

  // Totalen
  totals: { marginTop: 14, marginLeft: "auto", width: 250 },
  tLine: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  grand: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderRadius: 6, paddingVertical: 9, paddingHorizontal: 12, marginTop: 8 },
  grandLabel: { fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  grandVal: { fontFamily: "Helvetica-Bold", fontSize: 13 },

  // Voorwaarden
  terms: { marginTop: 22, backgroundColor: "#F8FAFC", borderRadius: 6, padding: 12, borderLeftWidth: 3, borderLeftColor: C.faint },

  // Akkoord / betaling
  callout: { marginTop: 14, backgroundColor: C.orangeSoft, borderRadius: 6, padding: 12, borderLeftWidth: 3, borderLeftColor: C.orange },
  calloutTitle: { fontFamily: "Helvetica-Bold", color: C.ink, marginBottom: 2 },

  // Voetgrafiek
  footer: { position: "absolute", bottom: 0, left: 0, right: 0, height: FOOTER_H },
  footerSvg: { position: "absolute", top: 0, left: 0 },
  footerCenter: { position: "absolute", top: 40, left: 40, right: 40, alignItems: "center" },
  footerLegal: { fontSize: 7.5, color: C.onDark, textAlign: "center", fontFamily: "Helvetica-Bold" },
  footerNote: { fontSize: 7.5, color: C.onDarkMuted, textAlign: "center", marginTop: 2 },
  footerRow: { position: "absolute", bottom: 10, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7.5, color: C.onDarkMuted },
});

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.metaRow}>
      <Text style={s.metaLabel}>{label}</Text>
      <Text style={s.metaVal}>{value}</Text>
    </View>
  );
}

/** Decoratieve kopgrafiek: hoekige navy + accent-vormen (briefpapier-stijl). */
function HeaderGraphic({ navy, accent, accentDark }: { navy: string; accent: string; accentDark: string }) {
  return (
    <Svg width={PAGE_W} height={HEADER_H} viewBox={`0 0 ${PAGE_W} ${HEADER_H}`} style={s.headerSvg}>
      {/* navy basisband met schuine onderrand */}
      <Polygon points={`0,0 ${PAGE_W},0 ${PAGE_W},100 0,82`} fill={navy} />
      {/* accent-driehoek rechts (steekt onder de band uit) */}
      <Polygon points={`${PAGE_W},40 ${PAGE_W},${HEADER_H} 452,100`} fill={accent} />
      {/* donkerder accent voor diepte */}
      <Polygon points={`${PAGE_W},74 ${PAGE_W},${HEADER_H} 520,110`} fill={accentDark} />
      {/* accent-tab linksonder */}
      <Polygon points={`0,82 96,94 0,108`} fill={accent} />
    </Svg>
  );
}

/** Decoratieve voetgrafiek: spiegelt de kop. */
function FooterGraphic({ navy, accent, accentDark }: { navy: string; accent: string; accentDark: string }) {
  return (
    <Svg width={PAGE_W} height={FOOTER_H} viewBox={`0 0 ${PAGE_W} ${FOOTER_H}`} style={s.footerSvg}>
      {/* navy band met licht schuine bovenrand (hoog genoeg voor leesbare tekst) */}
      <Polygon points={`0,${FOOTER_H} ${PAGE_W},${FOOTER_H} ${PAGE_W},22 0,34`} fill={navy} />
      {/* accent-driehoek rechtsboven de band */}
      <Polygon points={`${PAGE_W},2 ${PAGE_W},40 470,22`} fill={accent} />
      <Polygon points={`${PAGE_W},2 ${PAGE_W},26 540,12`} fill={accentDark} />
      {/* accent-tab linksboven */}
      <Polygon points={`0,34 96,22 0,10`} fill={accent} />
    </Svg>
  );
}

function QuoteDoc({ q }: { q: QuotePdfInput }) {
  const isInvoice = q.kind === "invoice";
  const companyAddr = [q.company.street, [q.company.postcode, q.company.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const contact = [q.company.phone, q.company.email].filter(Boolean).join("  ·  ");
  const legal = [
    q.company.kvk && `KVK ${q.company.kvk}`,
    q.company.vatNumber && `BTW ${q.company.vatNumber}`,
    q.iban && `IBAN ${q.iban}`,
    q.company.website,
  ].filter(Boolean).join("   ·   ");

  // Per-vakman huisstijlkleuren (accent + balkkleur), met platform-fallbacks.
  const accent = normHex(q.accentColor) ?? C.blue;
  const accentSoft = mixWhite(accent, 0.9);
  const accentDark = mixBlack(accent, 0.22);
  const accentText = luminance(accent) > 0.7 ? C.ink : accent; // leesbaar op wit
  const onAccent = readableOn(accent);
  // Kop-/voetbalkkleur + leesbare tekst daarop.
  const band = normHex(q.secondaryColor) ?? C.navy;
  const onBand = readableOn(band);
  const onBandMuted = luminance(band) > 0.55 ? "#5B6472" : "#B7C0D6";

  return (
    <Document title={`${isInvoice ? "Factuur" : "Offerte"} ${q.number}`} author={q.company.name}>
      <Page size="A4" style={s.page}>
        {/* Kopgrafiek met bedrijfsnaam/contact (wit) + logo */}
        <View style={s.header}>
          <HeaderGraphic navy={band} accent={accent} accentDark={accentDark} />
          <View style={s.headerLeft}>
            <Text style={[s.companyName, { color: onBand }]}>{q.company.name}</Text>
            {companyAddr ? <Text style={[s.onDarkLine, { color: onBandMuted }]}>{companyAddr}</Text> : null}
            {contact ? <Text style={[s.onDarkLine, { color: onBandMuted }]}>{contact}</Text> : null}
          </View>
          {q.company.logoUrl ? (
            <View style={s.logoTile}>
              <Image style={s.logoImg} src={q.company.logoUrl} />
            </View>
          ) : null}
        </View>

        <View style={s.content}>
          {/* Bovenrij: klant links, documentgegevens rechts */}
          <View style={s.topRow}>
            <View style={[s.card, { backgroundColor: accentSoft, borderLeftColor: accent }]}>
              <Text style={s.label}>{isInvoice ? "Factuuradres" : "Offerte voor"}</Text>
              <Text style={s.strong}>{q.customer.name || "Klant"}</Text>
              {q.customer.address ? <Text>{q.customer.address}</Text> : null}
              {(q.customer.phone || q.customer.email) ? (
                <Text style={s.muted}>{[q.customer.phone, q.customer.email].filter(Boolean).join("  ·  ")}</Text>
              ) : null}
            </View>
            <View style={s.docBlock}>
              <Text style={[s.docType, { color: accentText }]}>{isInvoice ? "FACTUUR" : "OFFERTE"}</Text>
              <Text style={s.docNum}>{q.number}</Text>
              <MetaLine label="Datum" value={date(q.createdAt)} />
              {q.validUntil ? <MetaLine label={isInvoice ? "Vervaldatum" : "Geldig tot"} value={date(q.validUntil)} /> : null}
            </View>
          </View>

          {q.title ? <Text style={s.title}>{q.title}</Text> : null}
          {q.introText ? <Text style={s.intro}>{q.introText}</Text> : null}

          {/* Regels */}
          <View style={[s.tHead, { backgroundColor: accentSoft }]}>
            <Text style={[s.cDesc, s.tHeadCell]}>Omschrijving</Text>
            <Text style={[s.cQty, s.tHeadCell]}>Aantal</Text>
            <Text style={[s.cPrice, s.tHeadCell]}>Stukprijs</Text>
            <Text style={[s.cTot, s.tHeadCell]}>Totaal</Text>
          </View>
          {q.lineItems.map((li, i) => (
            <View style={[s.tRow, ...(i % 2 === 1 ? [s.tRowAlt] : [])]} key={i} wrap={false}>
              <Text style={s.cDesc}>
                {li.description}
                {li.optional ? <Text style={s.optTag}>  (optioneel)</Text> : null}
              </Text>
              <Text style={s.cQty}>{li.qty}</Text>
              <Text style={s.cPrice}>{eur(li.unitPriceCents)}</Text>
              <Text style={[s.cTot, s.strong]}>{li.optional ? "—" : eur(li.qty * li.unitPriceCents)}</Text>
            </View>
          ))}

          {/* Totalen */}
          <View style={s.totals} wrap={false}>
            <View style={s.tLine}><Text style={s.muted}>Subtotaal (excl. btw)</Text><Text>{eur(q.subtotalCents)}</Text></View>
            {q.discountCents > 0 ? <View style={s.tLine}><Text style={s.muted}>Korting</Text><Text>{"− " + eur(q.discountCents)}</Text></View> : null}
            <View style={s.tLine}><Text style={s.muted}>Btw ({q.vatRate}%)</Text><Text>{eur(q.vatCents)}</Text></View>
            <View style={[s.grand, { backgroundColor: accent }]}>
              <Text style={[s.grandLabel, { color: onAccent }]}>Totaal incl. btw</Text>
              <Text style={[s.grandVal, { color: onAccent }]}>{eur(q.totalCents)}</Text>
            </View>
          </View>

          {/* Voorwaarden */}
          {q.terms ? (
            <View style={s.terms} wrap={false}>
              <Text style={s.label}>Voorwaarden & garantie</Text>
              <Text style={s.muted}>{q.terms}</Text>
            </View>
          ) : null}

          {/* Akkoord / betaling */}
          <View style={s.callout} wrap={false}>
            {isInvoice ? (
              <>
                <Text style={s.calloutTitle}>Betaling</Text>
                <Text style={s.muted}>
                  Gelieve het totaalbedrag {q.validUntil ? `vóór ${date(q.validUntil)} ` : ""}over te maken onder vermelding van factuurnummer {q.number}.
                </Text>
                {q.iban ? (
                  <Text style={[s.strong, { marginTop: 4 }]}>IBAN: {q.iban}   ·   t.n.v. {q.company.name}</Text>
                ) : null}
              </>
            ) : (
              <>
                <Text style={s.calloutTitle}>Akkoord</Text>
                <Text style={s.muted}>
                  Gaat u akkoord met deze offerte? Antwoord op de e-mail of gebruik de akkoordknop in de online offerte.
                  Na akkoord plannen wij de werkzaamheden in overleg met u in.
                </Text>
              </>
            )}
          </View>
        </View>

        {/* Voetgrafiek met zakelijke gegevens + paginanummer */}
        <View style={s.footer} fixed>
          <FooterGraphic navy={band} accent={accent} accentDark={accentDark} />
          <View style={s.footerCenter}>
            {legal ? <Text style={[s.footerLegal, { color: onBand }]}>{legal}</Text> : null}
            {q.footerNote ? <Text style={[s.footerNote, { color: onBandMuted }]}>{q.footerNote}</Text> : null}
          </View>
          <View style={s.footerRow}>
            <Text style={[s.footerText, { color: onBandMuted }]}>{q.company.name}</Text>
            <Text style={[s.footerText, { color: onBandMuted }]} fixed render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} van ${totalPages}`} />
          </View>
        </View>
      </Page>
    </Document>
  );
}

/** Rendert de offerte naar een PDF-buffer (server-side). */
export async function renderQuotePdf(input: QuotePdfInput): Promise<Buffer> {
  return renderToBuffer(<QuoteDoc q={input} />);
}
