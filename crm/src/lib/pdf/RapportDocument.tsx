/* eslint-disable jsx-a11y/alt-text */
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { BEDRIJF, LOGO } from "@/lib/constants";

const NAVY = "#172554";
const BLUE = "#2563eb";
const GREY = "#64748b";

export interface RapportData {
  type: string;
  periode: string;
  gegenereerdOp: string;
  kpis: { label: string; waarde: string }[];
  leadbronnen: { kanaal: string; leads: number; omzet: string; conversie: string }[];
  omzetPerType: { type: string; omzet: string }[];
  marketing: { label: string; waarde: string }[];
}

const s = StyleSheet.create({
  page: { padding: 44, fontSize: 10, color: "#1e293b", fontFamily: "Helvetica", lineHeight: 1.4 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 },
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoPrefab: { fontSize: 18, fontFamily: "Helvetica-Bold", color: LOGO.prefab },
  logoBox: { backgroundColor: LOGO.selectBg, borderRadius: 4, paddingHorizontal: 4, paddingVertical: 2, marginLeft: 3 },
  logoSelect: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#fff" },
  meta: { textAlign: "right", fontSize: 9, color: GREY },
  band: { height: 3, backgroundColor: BLUE, borderRadius: 2, marginBottom: 16 },
  title: { fontSize: 18, fontFamily: "Helvetica-Bold", color: NAVY, marginBottom: 2 },
  sub: { fontSize: 10, color: GREY, marginBottom: 18 },
  sectie: { fontSize: 11, fontFamily: "Helvetica-Bold", color: NAVY, marginTop: 16, marginBottom: 6 },
  kpiGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  kpiCard: { width: "31%", borderWidth: 0.5, borderColor: "#e2e8f0", borderRadius: 5, padding: 10 },
  kpiLabel: { fontSize: 8, color: GREY, textTransform: "uppercase" },
  kpiVal: { fontSize: 14, fontFamily: "Helvetica-Bold", color: NAVY, marginTop: 3 },
  thead: { flexDirection: "row", backgroundColor: NAVY, color: "#fff", paddingVertical: 5, paddingHorizontal: 6, fontSize: 8, borderRadius: 3, marginTop: 4 },
  row: { flexDirection: "row", paddingVertical: 5, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0" },
  c1: { width: "40%" }, c2: { width: "20%", textAlign: "right" }, c3: { width: "20%", textAlign: "right" }, c4: { width: "20%", textAlign: "right" },
  footer: { position: "absolute", bottom: 28, left: 44, right: 44, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: "#94a3b8", borderTopWidth: 0.5, borderTopColor: "#e2e8f0", paddingTop: 8 },
});

export function RapportDocument({ data }: { data: RapportData }) {
  return (
    <Document title={`${data.type} rapport ${data.periode}`} author={BEDRIJF.naam}>
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <View style={s.logoRow}>
            <Text style={s.logoPrefab}>Prefab</Text>
            <View style={s.logoBox}><Text style={s.logoSelect}>Select</Text></View>
          </View>
          <View style={s.meta}>
            <Text>Gegenereerd: {new Date(data.gegenereerdOp).toLocaleString("nl-NL")}</Text>
            <Text>{BEDRIJF.web}</Text>
          </View>
        </View>
        <View style={s.band} />

        <Text style={s.title}>{data.type} managementrapport</Text>
        <Text style={s.sub}>Periode: {data.periode}</Text>

        <Text style={s.sectie}>Kerncijfers</Text>
        <View style={s.kpiGrid}>
          {data.kpis.map((k) => (
            <View key={k.label} style={s.kpiCard}>
              <Text style={s.kpiLabel}>{k.label}</Text>
              <Text style={s.kpiVal}>{k.waarde}</Text>
            </View>
          ))}
        </View>

        <Text style={s.sectie}>Leadbronnen</Text>
        <View style={s.thead}>
          <Text style={s.c1}>Kanaal</Text><Text style={s.c2}>Leads</Text><Text style={s.c3}>Omzet</Text><Text style={s.c4}>Conversie</Text>
        </View>
        {data.leadbronnen.map((b) => (
          <View key={b.kanaal} style={s.row}>
            <Text style={s.c1}>{b.kanaal}</Text><Text style={s.c2}>{b.leads}</Text><Text style={s.c3}>{b.omzet}</Text><Text style={s.c4}>{b.conversie}</Text>
          </View>
        ))}

        <Text style={s.sectie}>Omzet per projecttype</Text>
        <View style={s.thead}>
          <Text style={s.c1}>Projecttype</Text><Text style={{ width: "60%", textAlign: "right" }}>Omzet</Text>
        </View>
        {data.omzetPerType.map((o) => (
          <View key={o.type} style={s.row}>
            <Text style={s.c1}>{o.type}</Text><Text style={{ width: "60%", textAlign: "right" }}>{o.omzet}</Text>
          </View>
        ))}

        <Text style={s.sectie}>Marketing</Text>
        <View style={s.kpiGrid}>
          {data.marketing.map((k) => (
            <View key={k.label} style={s.kpiCard}>
              <Text style={s.kpiLabel}>{k.label}</Text>
              <Text style={s.kpiVal}>{k.waarde}</Text>
            </View>
          ))}
        </View>

        <View style={s.footer} fixed>
          <Text>{BEDRIJF.naam} · {BEDRIJF.web}</Text>
          <Text>{BEDRIJF.email} · {BEDRIJF.telefoon}</Text>
        </View>
      </Page>
    </Document>
  );
}
