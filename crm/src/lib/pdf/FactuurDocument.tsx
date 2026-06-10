/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { Invoice, Lead } from "@/lib/types";
import { berekenTotalen, btwPerTarief } from "@/lib/quote-utils";
import { BEDRIJF, LOGO } from "@/lib/constants";

const NAVY = "#172554";
const BLUE = "#2563eb";
const GREY = "#64748b";
const LIGHT = "#94a3b8";

const s = StyleSheet.create({
  page: { paddingTop: 44, paddingBottom: 70, paddingHorizontal: 44, fontSize: 10, color: "#1e293b", fontFamily: "Helvetica", lineHeight: 1.4 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoPrefab: { fontSize: 21, fontFamily: "Helvetica-Bold", color: LOGO.prefab },
  logoBox: { backgroundColor: LOGO.selectBg, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2, marginLeft: 3 },
  logoSelect: { fontSize: 21, fontFamily: "Helvetica-Bold", color: "#fff" },
  slogan: { fontSize: 8, color: GREY, marginTop: 5 },
  meta: { textAlign: "right" },
  metaTitle: { fontSize: 22, fontFamily: "Helvetica-Bold", color: NAVY, letterSpacing: 1 },
  metaLine: { fontSize: 9, color: GREY, marginTop: 2 },
  band: { height: 3, backgroundColor: BLUE, borderRadius: 2, marginBottom: 20 },
  twoCol: { flexDirection: "row", justifyContent: "space-between", marginBottom: 18 },
  block: { width: "48%" },
  label: { fontSize: 8, color: LIGHT, textTransform: "uppercase", marginBottom: 4, letterSpacing: 0.5 },
  klantNaam: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2, color: "#0f172a" },
  termijn: { backgroundColor: "#eff6ff", color: NAVY, borderRadius: 4, padding: 8, marginBottom: 16, fontSize: 9, fontFamily: "Helvetica-Bold" },
  thead: { flexDirection: "row", backgroundColor: NAVY, color: "#fff", paddingVertical: 6, paddingHorizontal: 6, fontSize: 8, textTransform: "uppercase", borderRadius: 3 },
  row: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0" },
  cOms: { width: "52%" }, cNum: { width: "10%", textAlign: "right" }, cBtw: { width: "12%", textAlign: "right" }, cPrijs: { width: "13%", textAlign: "right" }, cTot: { width: "13%", textAlign: "right" },
  totals: { marginTop: 14, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", width: 240, justifyContent: "space-between", paddingVertical: 2, fontSize: 10, color: GREY },
  grand: { flexDirection: "row", width: 240, justifyContent: "space-between", backgroundColor: "#eff6ff", color: NAVY, marginTop: 5, paddingVertical: 7, paddingHorizontal: 8, borderRadius: 4, fontFamily: "Helvetica-Bold", fontSize: 12 },
  pay: { marginTop: 22, padding: 12, borderWidth: 0.5, borderColor: "#cbd5e1", borderRadius: 4, fontSize: 9 },
  footer: { position: "absolute", bottom: 28, left: 44, right: 44, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: LIGHT, borderTopWidth: 0.5, borderTopColor: "#e2e8f0", paddingTop: 8 },
});

function eur(n: number) { return "€ " + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
function dat(iso: string) { return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }); }

export function FactuurDocument({ invoice, lead }: { invoice: Invoice; lead: Lead }) {
  const t = berekenTotalen(invoice.regels, invoice.korting);
  const btw = btwPerTarief(invoice.regels, invoice.korting);
  return (
    <Document title={`Factuur ${invoice.nummer}`} author={BEDRIJF.naam}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View>
            <View style={s.logoRow}>
              <Text style={s.logoPrefab}>Prefab</Text>
              <View style={s.logoBox}><Text style={s.logoSelect}>Select</Text></View>
            </View>
            <Text style={s.slogan}>{BEDRIJF.slogan}</Text>
          </View>
          <View style={s.meta}>
            <Text style={s.metaTitle}>FACTUUR</Text>
            <Text style={s.metaLine}>{invoice.nummer}</Text>
            <Text style={s.metaLine}>Datum: {dat(invoice.aangemaaktOp)}</Text>
            <Text style={s.metaLine}>Vervaldatum: {dat(invoice.vervaldatum)}</Text>
          </View>
        </View>
        <View style={s.band} />

        <View style={s.twoCol}>
          <View style={s.block}>
            <Text style={s.label}>Factuur aan</Text>
            <Text style={s.klantNaam}>{lead.naam}</Text>
            {lead.adres ? <Text>{lead.adres}</Text> : null}
            {(lead.postcode || lead.plaats) ? <Text>{[lead.postcode, lead.plaats].filter(Boolean).join("  ")}</Text> : null}
            <Text>{lead.email}</Text>
          </View>
          <View style={s.block}>
            <Text style={s.label}>Van</Text>
            <Text style={s.klantNaam}>{BEDRIJF.tnv}</Text>
            <Text>{BEDRIJF.adres}</Text>
            <Text>{BEDRIJF.postcodePlaats}</Text>
            <Text>KvK: {BEDRIJF.kvk} · BTW: {BEDRIJF.btw}</Text>
          </View>
        </View>

        {invoice.termijnLabel ? <Text style={s.termijn}>Termijnfactuur: {invoice.termijnLabel}</Text> : null}

        <View style={s.thead}>
          <Text style={s.cOms}>Omschrijving</Text>
          <Text style={s.cNum}>Aantal</Text>
          <Text style={s.cBtw}>Btw</Text>
          <Text style={s.cPrijs}>Prijs</Text>
          <Text style={s.cTot}>Totaal</Text>
        </View>
        {invoice.regels.map((r) => (
          <View key={r.id} style={s.row} wrap={false}>
            <Text style={s.cOms}>{r.omschrijving}</Text>
            <Text style={s.cNum}>{r.aantal}</Text>
            <Text style={s.cBtw}>{r.btwPercentage}%</Text>
            <Text style={s.cPrijs}>{eur(r.prijsPerStuk)}</Text>
            <Text style={s.cTot}>{eur(r.aantal * r.prijsPerStuk)}</Text>
          </View>
        ))}

        <View style={s.totals}>
          <View style={s.totalRow}><Text>Subtotaal (excl. btw)</Text><Text>{eur(t.subtotaal)}</Text></View>
          {t.korting > 0 && <View style={s.totalRow}><Text>Korting</Text><Text>- {eur(t.korting)}</Text></View>}
          {btw.map((b) => (
            <View key={b.percentage} style={s.totalRow}><Text>Btw {b.percentage}%</Text><Text>{eur(b.btw)}</Text></View>
          ))}
          <View style={s.grand}><Text>Te betalen</Text><Text>{eur(t.totaal)}</Text></View>
        </View>

        <View style={s.pay}>
          <Text style={[s.label, { marginBottom: 6 }]}>Betaalgegevens</Text>
          <Text>Gelieve {eur(t.totaal)} te voldoen vóór {dat(invoice.vervaldatum)} op IBAN {BEDRIJF.iban}</Text>
          <Text>T.n.v. {BEDRIJF.tnv} · o.v.v. factuurnummer {invoice.nummer}</Text>
          {invoice.notitie ? <Text style={{ marginTop: 6, color: GREY }}>{invoice.notitie}</Text> : null}
        </View>

        <View style={s.footer} fixed>
          <Text>{BEDRIJF.naam} · {BEDRIJF.web}</Text>
          <Text>{BEDRIJF.email} · {BEDRIJF.telefoon}</Text>
        </View>
      </Page>
    </Document>
  );
}
