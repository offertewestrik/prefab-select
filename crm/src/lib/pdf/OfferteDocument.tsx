/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Svg,
  Path,
  Rect,
} from "@react-pdf/renderer";
import type { Lead, Quote } from "@/lib/types";
import { berekenTotalen } from "@/lib/quote-utils";
import { BEDRIJF, PRODUCT_LABEL } from "@/lib/constants";

const NAVY = "#172554";
const BLUE = "#2563eb";
const GREY = "#64748b";
const LIGHT = "#94a3b8";

const styles = StyleSheet.create({
  page: { padding: 44, fontSize: 10, color: "#1e293b", fontFamily: "Helvetica", lineHeight: 1.4 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoText: { marginLeft: 10 },
  brand: { fontSize: 16, fontWeight: "bold", color: NAVY, letterSpacing: 1 },
  brandSub: { fontSize: 8, color: GREY, marginTop: 1 },
  meta: { textAlign: "right" },
  metaTitle: { fontSize: 18, fontWeight: "bold", color: NAVY, letterSpacing: 1 },
  metaLine: { fontSize: 9, color: GREY, marginTop: 2 },
  band: { height: 3, backgroundColor: BLUE, marginBottom: 20, borderRadius: 2 },
  twoCol: { flexDirection: "row", justifyContent: "space-between", marginBottom: 22 },
  block: { width: "48%" },
  label: { fontSize: 8, color: LIGHT, textTransform: "uppercase", marginBottom: 4, letterSpacing: 0.5 },
  klantNaam: { fontSize: 11, fontWeight: "bold", marginBottom: 2, color: "#0f172a" },
  section: { marginBottom: 16 },
  sectionTitle: { fontSize: 10, fontWeight: "bold", color: NAVY, marginBottom: 4 },
  projectGrid: { backgroundColor: "#f8fafc", borderRadius: 6, padding: 12, marginBottom: 20 },
  projectRow: { flexDirection: "row", marginBottom: 3 },
  projectKey: { width: 110, color: GREY, fontSize: 9 },
  projectVal: { flex: 1, fontSize: 9 },
  tableHead: {
    flexDirection: "row",
    backgroundColor: NAVY,
    color: "#ffffff",
    paddingVertical: 6,
    paddingHorizontal: 6,
    fontSize: 8,
    textTransform: "uppercase",
    borderRadius: 3,
  },
  row: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0" },
  cOms: { width: "42%" },
  cNum: { width: "10%", textAlign: "right" },
  cEen: { width: "12%", textAlign: "center" },
  cPrijs: { width: "18%", textAlign: "right" },
  cTot: { width: "18%", textAlign: "right" },
  totals: { marginTop: 14, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", width: 230, justifyContent: "space-between", paddingVertical: 2, fontSize: 10 },
  grand: {
    flexDirection: "row",
    width: 230,
    justifyContent: "space-between",
    backgroundColor: "#eff6ff",
    color: NAVY,
    marginTop: 5,
    paddingVertical: 7,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontWeight: "bold",
    fontSize: 12,
  },
  notitie: { marginTop: 22, padding: 12, backgroundColor: "#f8fafc", borderRadius: 4, fontSize: 9, color: "#475569" },
  voorwaarden: { marginTop: 12, fontSize: 7.5, color: GREY, lineHeight: 1.4 },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 44,
    right: 44,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 8,
    color: LIGHT,
    borderTopWidth: 0.5,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
  },
});

function eur(n: number): string {
  return "€ " + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function dat(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

/** Vector-logo (huisje) in de Prefab Select huisstijl — geen externe afbeelding nodig. */
function Logo() {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40">
      <Rect x={0} y={0} width={40} height={40} rx={9} fill={NAVY} />
      {/* dak */}
      <Path d="M9 21 L20 11 L31 21 Z" fill="#ffffff" />
      {/* huisbody */}
      <Rect x={12.5} y={20} width={15} height={11} fill="#ffffff" />
      {/* deur */}
      <Rect x={18} y={24} width={4} height={7} fill={NAVY} />
    </Svg>
  );
}

export function OfferteDocument({ quote, lead }: { quote: Quote; lead: Lead }) {
  const t = berekenTotalen(quote.regels, quote.korting);
  const projectLabel = PRODUCT_LABEL[quote.projecttype];

  return (
    <Document title={`Offerte ${quote.nummer}`} author={BEDRIJF.naam}>
      <Page size="A4" style={styles.page}>
        {/* Kop met logo */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <Logo />
            <View style={styles.logoText}>
              <Text style={styles.brand}>PREFAB SELECT</Text>
              <Text style={styles.brandSub}>{BEDRIJF.slogan}</Text>
            </View>
          </View>
          <View style={styles.meta}>
            <Text style={styles.metaTitle}>OFFERTE</Text>
            <Text style={styles.metaLine}>{quote.nummer}</Text>
            <Text style={styles.metaLine}>Datum: {dat(quote.aangemaaktOp)}</Text>
            <Text style={styles.metaLine}>Geldig tot: {dat(quote.geldigTot)}</Text>
          </View>
        </View>
        <View style={styles.band} />

        {/* Klant- en bedrijfsgegevens */}
        <View style={styles.twoCol}>
          <View style={styles.block}>
            <Text style={styles.label}>Aan</Text>
            <Text style={styles.klantNaam}>{lead.naam}</Text>
            {lead.adres ? <Text>{lead.adres}</Text> : null}
            {(lead.postcode || lead.plaats) ? <Text>{[lead.postcode, lead.plaats].filter(Boolean).join("  ")}</Text> : null}
            <Text>{lead.email}</Text>
            <Text>{lead.telefoon}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Van</Text>
            <Text style={styles.klantNaam}>{BEDRIJF.naam} B.V.</Text>
            <Text>{BEDRIJF.plaats}</Text>
            <Text>{BEDRIJF.email}</Text>
            <Text>{BEDRIJF.telefoon}</Text>
            <Text>KvK: {BEDRIJF.kvk} · BTW: {BEDRIJF.btw}</Text>
          </View>
        </View>

        {/* Projectgegevens */}
        <View style={styles.projectGrid}>
          <View style={styles.projectRow}>
            <Text style={styles.projectKey}>Projecttype</Text>
            <Text style={styles.projectVal}>{projectLabel}</Text>
          </View>
          {quote.afmetingen ? (
            <View style={styles.projectRow}>
              <Text style={styles.projectKey}>Afmetingen</Text>
              <Text style={styles.projectVal}>{quote.afmetingen}</Text>
            </View>
          ) : null}
          {quote.projectomschrijving ? (
            <View style={styles.projectRow}>
              <Text style={styles.projectKey}>Omschrijving</Text>
              <Text style={styles.projectVal}>{quote.projectomschrijving}</Text>
            </View>
          ) : null}
          {quote.werkzaamheden ? (
            <View style={styles.projectRow}>
              <Text style={styles.projectKey}>Werkzaamheden</Text>
              <Text style={styles.projectVal}>{quote.werkzaamheden}</Text>
            </View>
          ) : null}
        </View>

        {/* Prijsregels */}
        <View style={styles.tableHead}>
          <Text style={styles.cOms}>Omschrijving</Text>
          <Text style={styles.cNum}>Aantal</Text>
          <Text style={styles.cEen}>Eenheid</Text>
          <Text style={styles.cPrijs}>Prijs</Text>
          <Text style={styles.cTot}>Totaal</Text>
        </View>
        {quote.regels.map((r) => (
          <View key={r.id} style={styles.row}>
            <Text style={styles.cOms}>{r.omschrijving}</Text>
            <Text style={styles.cNum}>{r.aantal}</Text>
            <Text style={styles.cEen}>{r.eenheid}</Text>
            <Text style={styles.cPrijs}>{eur(r.prijsPerStuk)}</Text>
            <Text style={styles.cTot}>{eur(r.aantal * r.prijsPerStuk)}</Text>
          </View>
        ))}

        {/* Totalen */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text>Subtotaal</Text>
            <Text>{eur(t.subtotaal)}</Text>
          </View>
          {t.korting > 0 && (
            <View style={styles.totalRow}>
              <Text>Korting</Text>
              <Text>- {eur(t.korting)}</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text>Btw (21%)</Text>
            <Text>{eur(t.btw)}</Text>
          </View>
          <View style={styles.grand}>
            <Text>Totaal incl. btw</Text>
            <Text>{eur(t.totaal)}</Text>
          </View>
        </View>

        {/* Opmerkingen */}
        {quote.notitie ? (
          <View style={styles.notitie}>
            <Text>{quote.notitie}</Text>
          </View>
        ) : null}

        {/* Voorwaarden */}
        {quote.voorwaarden ? (
          <View style={styles.section}>
            <Text style={[styles.voorwaarden, { fontWeight: "bold", marginTop: 16 }]}>Voorwaarden</Text>
            <Text style={styles.voorwaarden}>{quote.voorwaarden}</Text>
          </View>
        ) : null}

        {/* Voettekst met contactgegevens */}
        <View style={styles.footer} fixed>
          <Text>{BEDRIJF.naam} · {BEDRIJF.web}</Text>
          <Text>{BEDRIJF.email} · {BEDRIJF.telefoon}</Text>
        </View>
      </Page>
    </Document>
  );
}
