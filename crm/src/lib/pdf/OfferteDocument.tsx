/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Lead, Quote } from "@/lib/types";
import { berekenTotalen } from "@/lib/quote-utils";

const styles = StyleSheet.create({
  page: { padding: 48, fontSize: 10, color: "#1e293b", fontFamily: "Helvetica" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 32 },
  brand: { fontSize: 20, fontWeight: "bold", color: "#172554" },
  brandSub: { fontSize: 9, color: "#64748b", marginTop: 2 },
  meta: { textAlign: "right", fontSize: 9, color: "#475569" },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4, color: "#0f172a" },
  twoCol: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  block: { width: "48%" },
  label: { fontSize: 8, color: "#94a3b8", textTransform: "uppercase", marginBottom: 4 },
  klantNaam: { fontSize: 11, fontWeight: "bold", marginBottom: 2 },
  tableHead: {
    flexDirection: "row",
    borderBottomWidth: 1.5,
    borderBottomColor: "#172554",
    paddingBottom: 6,
    marginBottom: 4,
    fontSize: 8,
    color: "#64748b",
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 6,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e2e8f0",
  },
  cOms: { width: "50%" },
  cNum: { width: "12%", textAlign: "right" },
  cPrijs: { width: "18%", textAlign: "right" },
  cTot: { width: "20%", textAlign: "right" },
  totals: { marginTop: 16, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", width: 220, justifyContent: "space-between", paddingVertical: 2 },
  grand: {
    flexDirection: "row",
    width: 220,
    justifyContent: "space-between",
    borderTopWidth: 1.5,
    borderTopColor: "#172554",
    marginTop: 4,
    paddingTop: 6,
    fontWeight: "bold",
    fontSize: 12,
  },
  notitie: { marginTop: 28, padding: 12, backgroundColor: "#f8fafc", borderRadius: 4, fontSize: 9, color: "#475569" },
  footer: { position: "absolute", bottom: 32, left: 48, right: 48, fontSize: 8, color: "#94a3b8", textAlign: "center", borderTopWidth: 0.5, borderTopColor: "#e2e8f0", paddingTop: 8 },
});

function eur(n: number): string {
  return "€ " + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function dat(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

export function OfferteDocument({ quote, lead }: { quote: Quote; lead: Lead }) {
  const t = berekenTotalen(quote.regels, quote.korting);
  return (
    <Document title={`Offerte ${quote.nummer}`} author="Prefab Select">
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.brand}>PREFAB SELECT</Text>
            <Text style={styles.brandSub}>Artisans of Space</Text>
            <Text style={styles.brandSub}>offerte@prefabselect.nl</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.title}>OFFERTE</Text>
            <Text>{quote.nummer}</Text>
            <Text>Datum: {dat(quote.aangemaaktOp)}</Text>
            <Text>Geldig tot: {dat(quote.geldigTot)}</Text>
          </View>
        </View>

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
            <Text style={styles.klantNaam}>Prefab Select B.V.</Text>
            <Text>Zeeland, Nederland</Text>
            <Text>KvK: 00000000</Text>
            <Text>BTW: NL000000000B00</Text>
          </View>
        </View>

        <View style={styles.tableHead}>
          <Text style={styles.cOms}>Omschrijving</Text>
          <Text style={styles.cNum}>Aantal</Text>
          <Text style={styles.cPrijs}>Prijs</Text>
          <Text style={styles.cTot}>Totaal</Text>
        </View>
        {quote.regels.map((r) => (
          <View key={r.id} style={styles.row}>
            <Text style={styles.cOms}>{r.omschrijving}</Text>
            <Text style={styles.cNum}>{r.aantal}</Text>
            <Text style={styles.cPrijs}>{eur(r.prijsPerStuk)}</Text>
            <Text style={styles.cTot}>{eur(r.aantal * r.prijsPerStuk)}</Text>
          </View>
        ))}

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
            <Text>Totaal</Text>
            <Text>{eur(t.totaal)}</Text>
          </View>
        </View>

        {quote.notitie ? (
          <View style={styles.notitie}>
            <Text>{quote.notitie}</Text>
          </View>
        ) : null}

        <Text style={styles.footer}>
          Prefab Select · Hoogwaardige prefab woningen & bijgebouwen · Deze offerte is vrijblijvend en geldig tot {dat(quote.geldigTot)}.
        </Text>
      </Page>
    </Document>
  );
}
