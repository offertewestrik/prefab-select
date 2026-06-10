/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { Lead, Quote } from "@/lib/types";
import { berekenTotalen, btwPerTarief } from "@/lib/quote-utils";
import {
  ALGEMENE_VOORWAARDEN,
  BEDRIJF,
  BETALINGSTERMIJNEN,
  BETALINGSVOORWAARDEN_TEKST,
  GARANTIE_INTRO,
  GARANTIE_SECTIES,
  LOGO,
  PRODUCT_LABEL,
} from "@/lib/constants";

const NAVY = "#172554";
const BLUE = "#2563eb";
const GREY = "#64748b";
const LIGHT = "#94a3b8";

const styles = StyleSheet.create({
  page: { paddingTop: 44, paddingBottom: 70, paddingHorizontal: 44, fontSize: 10, color: "#1e293b", fontFamily: "Helvetica", lineHeight: 1.4 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 },
  // Woordmerk-logo
  logoRow: { flexDirection: "row", alignItems: "center" },
  logoPrefab: { fontSize: 21, fontFamily: "Helvetica-Bold", color: LOGO.prefab },
  logoSelectBox: { backgroundColor: LOGO.selectBg, borderRadius: 5, paddingHorizontal: 5, paddingVertical: 2, marginLeft: 3 },
  logoSelect: { fontSize: 21, fontFamily: "Helvetica-Bold", color: LOGO.selectText },
  slogan: { fontSize: 8, color: GREY, marginTop: 5 },
  meta: { textAlign: "right" },
  metaTitle: { fontSize: 22, fontFamily: "Helvetica-Bold", color: NAVY, letterSpacing: 1 },
  metaLine: { fontSize: 9, color: GREY, marginTop: 2 },
  band: { height: 3, backgroundColor: BLUE, borderRadius: 2, marginBottom: 20 },
  twoCol: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  block: { width: "48%" },
  label: { fontSize: 8, color: LIGHT, textTransform: "uppercase", marginBottom: 4, letterSpacing: 0.5 },
  klantNaam: { fontSize: 11, fontFamily: "Helvetica-Bold", marginBottom: 2, color: "#0f172a" },
  projectGrid: { backgroundColor: "#f8fafc", borderRadius: 6, padding: 12, marginBottom: 18 },
  projectRow: { flexDirection: "row", marginBottom: 3 },
  projectKey: { width: 110, color: GREY, fontSize: 9 },
  projectVal: { flex: 1, fontSize: 9 },
  section: { marginTop: 2 },
  sectionTitle: { fontSize: 9, fontFamily: "Helvetica-Bold", color: NAVY, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6, marginTop: 18 },
  tableHead: { flexDirection: "row", backgroundColor: NAVY, color: "#ffffff", paddingVertical: 6, paddingHorizontal: 6, fontSize: 8, textTransform: "uppercase", borderRadius: 3 },
  row: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 6, borderBottomWidth: 0.5, borderBottomColor: "#e2e8f0" },
  cOms: { width: "40%" },
  cNum: { width: "10%", textAlign: "right" },
  cEen: { width: "12%", textAlign: "center" },
  cBtw: { width: "10%", textAlign: "right" },
  cPrijs: { width: "14%", textAlign: "right" },
  cTot: { width: "14%", textAlign: "right" },
  totals: { marginTop: 14, alignItems: "flex-end" },
  totalRow: { flexDirection: "row", width: 250, justifyContent: "space-between", paddingVertical: 2, fontSize: 10 },
  totalSub: { color: GREY },
  grand: { flexDirection: "row", width: 250, justifyContent: "space-between", backgroundColor: "#eff6ff", color: NAVY, marginTop: 5, paddingVertical: 7, paddingHorizontal: 8, borderRadius: 4, fontFamily: "Helvetica-Bold", fontSize: 12 },
  note: { marginTop: 18, padding: 12, backgroundColor: "#f8fafc", borderRadius: 4, fontSize: 9, color: "#475569" },
  payBox: { marginTop: 14, flexDirection: "row", justifyContent: "space-between", padding: 12, borderWidth: 0.5, borderColor: "#cbd5e1", borderRadius: 4 },
  payCol: { width: "48%" },
  payRow: { flexDirection: "row", paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: "#eef2f7", fontSize: 9 },
  payPct: { width: "12%", fontFamily: "Helvetica-Bold", color: NAVY },
  payMoment: { width: "60%", color: "#475569" },
  payBedrag: { width: "28%", textAlign: "right", fontFamily: "Helvetica-Bold" },
  voorwaarden: { fontSize: 7.5, color: GREY, lineHeight: 1.5 },
  signRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 18 },
  signBox: { width: "47%" },
  signTitle: { fontSize: 8, fontFamily: "Helvetica-Bold", color: NAVY, marginBottom: 22 },
  signLabel: { fontSize: 8, color: GREY, marginTop: 4 },
  signLine: { borderTopWidth: 0.5, borderTopColor: "#94a3b8", marginTop: 16 },
  footer: { position: "absolute", bottom: 28, left: 44, right: 44, flexDirection: "row", justifyContent: "space-between", fontSize: 8, color: LIGHT, borderTopWidth: 0.5, borderTopColor: "#e2e8f0", paddingTop: 8 },
  // Garantievoorwaarden (pagina 2)
  garTitle: { fontSize: 16, fontFamily: "Helvetica-Bold", color: NAVY, marginBottom: 8, marginTop: 8 },
  garIntro: { fontSize: 9, color: "#475569", marginBottom: 12, lineHeight: 1.5 },
  garSec: { marginBottom: 10 },
  garSecTitle: { fontSize: 10, fontFamily: "Helvetica-Bold", color: NAVY, marginBottom: 3 },
  garText: { fontSize: 9, color: "#475569", lineHeight: 1.5 },
  garBulletRow: { flexDirection: "row", marginTop: 2 },
  garBulletDot: { width: 10, fontSize: 9, color: BLUE },
  garBulletText: { flex: 1, fontSize: 9, color: "#475569", lineHeight: 1.4 },
});

function eur(n: number): string {
  return "€ " + n.toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function dat(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

/** Woordmerk-logo "Prefab Select" als vector — identiek aan de huisstijl. */
function Logo() {
  return (
    <View style={styles.logoRow}>
      <Text style={styles.logoPrefab}>Prefab</Text>
      <View style={styles.logoSelectBox}>
        <Text style={styles.logoSelect}>Select</Text>
      </View>
    </View>
  );
}

export function OfferteDocument({ quote, lead }: { quote: Quote; lead: Lead }) {
  const t = berekenTotalen(quote.regels, quote.korting);
  const btwRegels = btwPerTarief(quote.regels, quote.korting);

  return (
    <Document title={`Offerte ${quote.nummer}`} author={BEDRIJF.naam}>
      <Page size="A4" style={styles.page}>
        {/* Kop met woordmerk-logo */}
        <View style={styles.header}>
          <View>
            <Logo />
            <Text style={styles.slogan}>{BEDRIJF.slogan}</Text>
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
            <Text style={styles.klantNaam}>{BEDRIJF.tnv}</Text>
            <Text>{BEDRIJF.adres}</Text>
            <Text>{BEDRIJF.postcodePlaats}</Text>
            <Text>{BEDRIJF.email}</Text>
            <Text>{BEDRIJF.telefoon}</Text>
            <Text>KvK: {BEDRIJF.kvk} · BTW: {BEDRIJF.btw}</Text>
          </View>
        </View>

        {/* Projectgegevens */}
        <View style={styles.projectGrid}>
          <View style={styles.projectRow}>
            <Text style={styles.projectKey}>Projecttype</Text>
            <Text style={styles.projectVal}>{PRODUCT_LABEL[quote.projecttype]}</Text>
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
          <Text style={styles.cBtw}>Btw</Text>
          <Text style={styles.cPrijs}>Prijs</Text>
          <Text style={styles.cTot}>Totaal</Text>
        </View>
        {quote.regels.map((r) => (
          <View key={r.id} style={styles.row} wrap={false}>
            <Text style={styles.cOms}>{r.omschrijving}</Text>
            <Text style={styles.cNum}>{r.aantal}</Text>
            <Text style={styles.cEen}>{r.eenheid}</Text>
            <Text style={styles.cBtw}>{r.btwPercentage}%</Text>
            <Text style={styles.cPrijs}>{eur(r.prijsPerStuk)}</Text>
            <Text style={styles.cTot}>{eur(r.aantal * r.prijsPerStuk)}</Text>
          </View>
        ))}

        {/* Totalen met btw-uitsplitsing per tarief */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalSub}>Subtotaal (excl. btw)</Text>
            <Text style={styles.totalSub}>{eur(t.subtotaal)}</Text>
          </View>
          {t.korting > 0 && (
            <View style={styles.totalRow}>
              <Text style={styles.totalSub}>Korting</Text>
              <Text style={styles.totalSub}>- {eur(t.korting)}</Text>
            </View>
          )}
          {btwRegels.map((b) => (
            <View key={b.percentage} style={styles.totalRow}>
              <Text style={styles.totalSub}>Btw {b.percentage}% over {eur(b.grondslag)}</Text>
              <Text style={styles.totalSub}>{eur(b.btw)}</Text>
            </View>
          ))}
          <View style={styles.grand}>
            <Text>Totaal incl. btw</Text>
            <Text>{eur(t.totaal)}</Text>
          </View>
        </View>

        {/* Planning & levertijd */}
        {quote.planning ? (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Planning &amp; levertijd</Text>
            <Text style={{ fontSize: 9, color: "#475569" }}>{quote.planning}</Text>
          </View>
        ) : null}

        {/* Opmerkingen */}
        {quote.notitie ? (
          <View style={styles.note} wrap={false}>
            <Text>{quote.notitie}</Text>
          </View>
        ) : null}

        {/* Betalingsvoorwaarden — vaste regeling met bedrag per termijn */}
        <View style={styles.section} wrap={false}>
          <Text style={styles.sectionTitle}>Betalingsvoorwaarden</Text>
          {BETALINGSTERMIJNEN.map((term) => (
            <View key={term.pct} style={styles.payRow}>
              <Text style={styles.payPct}>{term.pct}%</Text>
              <Text style={styles.payMoment}>{term.moment}</Text>
              <Text style={styles.payBedrag}>{eur((t.totaal * term.pct) / 100)}</Text>
            </View>
          ))}
          <Text style={[styles.voorwaarden, { marginTop: 8 }]}>{BETALINGSVOORWAARDEN_TEKST}</Text>
        </View>

        {/* Betaalgegevens */}
        {BEDRIJF.iban ? (
          <View style={styles.payBox} wrap={false}>
            <View style={styles.payCol}>
              <Text style={styles.label}>Betaalgegevens</Text>
              <Text>IBAN: {BEDRIJF.iban}</Text>
              <Text>T.n.v.: {BEDRIJF.tnv}</Text>
            </View>
            <View style={styles.payCol}>
              <Text style={styles.label}>Bij betaling vermelden</Text>
              <Text>Offertenummer {quote.nummer}</Text>
            </View>
          </View>
        ) : null}

        {/* Voorwaarden */}
        {quote.voorwaarden ? (
          <View wrap={false}>
            <Text style={styles.sectionTitle}>Voorwaarden</Text>
            <Text style={styles.voorwaarden}>{quote.voorwaarden}</Text>
          </View>
        ) : null}

        {/* Akkoord / handtekening */}
        <View style={styles.signRow} wrap={false}>
          <View style={styles.signBox}>
            <Text style={styles.signTitle}>Voor akkoord — Opdrachtgever</Text>
            <View style={styles.signLine} />
            <Text style={styles.signLabel}>Naam &amp; datum</Text>
            <View style={styles.signLine} />
            <Text style={styles.signLabel}>Handtekening</Text>
          </View>
          <View style={styles.signBox}>
            <Text style={styles.signTitle}>Namens {BEDRIJF.naam}</Text>
            <View style={styles.signLine} />
            <Text style={styles.signLabel}>Naam &amp; datum</Text>
            <View style={styles.signLine} />
            <Text style={styles.signLabel}>Handtekening</Text>
          </View>
        </View>

        {/* Voettekst met contactgegevens */}
        <View style={styles.footer} fixed>
          <Text>{BEDRIJF.naam} · {BEDRIJF.web}</Text>
          <Text>{BEDRIJF.email} · {BEDRIJF.telefoon}</Text>
        </View>
      </Page>

      {/* Pagina 2 — Garantievoorwaarden */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Logo />
            <Text style={styles.slogan}>{BEDRIJF.slogan}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.metaLine}>Offerte {quote.nummer}</Text>
            <Text style={styles.metaLine}>{dat(quote.aangemaaktOp)}</Text>
          </View>
        </View>
        <View style={styles.band} />

        <Text style={styles.garTitle}>Garantievoorwaarden</Text>
        <Text style={styles.garIntro}>{GARANTIE_INTRO}</Text>

        {GARANTIE_SECTIES.map((sec) => (
          <View key={sec.titel} style={styles.garSec} wrap={false}>
            <Text style={styles.garSecTitle}>{sec.titel}</Text>
            {sec.tekst ? <Text style={styles.garText}>{sec.tekst}</Text> : null}
            {sec.bullets?.map((b, i) => (
              <View key={i} style={styles.garBulletRow}>
                <Text style={styles.garBulletDot}>•</Text>
                <Text style={styles.garBulletText}>{b}</Text>
              </View>
            ))}
          </View>
        ))}

        <View style={styles.footer} fixed>
          <Text>{BEDRIJF.naam} · {BEDRIJF.web}</Text>
          <Text>{BEDRIJF.email} · {BEDRIJF.telefoon}</Text>
        </View>
      </Page>

      {/* Pagina 3+ — Algemene voorwaarden (loopt automatisch door over meerdere pagina's) */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Logo />
            <Text style={styles.slogan}>{BEDRIJF.slogan}</Text>
          </View>
          <View style={styles.meta}>
            <Text style={styles.metaLine}>Offerte {quote.nummer}</Text>
            <Text style={styles.metaLine}>{dat(quote.aangemaaktOp)}</Text>
          </View>
        </View>
        <View style={styles.band} />

        <Text style={styles.garTitle}>Algemene voorwaarden</Text>

        {ALGEMENE_VOORWAARDEN.map((art) => (
          <View key={art.nr} style={styles.garSec} wrap={false}>
            <Text style={styles.garSecTitle}>{art.nr}. {art.titel}</Text>
            {art.tekst ? <Text style={styles.garText}>{art.tekst}</Text> : null}
            {art.bullets?.map((b, i) => (
              <View key={i} style={styles.garBulletRow}>
                <Text style={styles.garBulletDot}>•</Text>
                <Text style={styles.garBulletText}>{b}</Text>
              </View>
            ))}
            {art.na ? <Text style={[styles.garText, { marginTop: 3 }]}>{art.na}</Text> : null}
          </View>
        ))}

        <Text style={[styles.garText, { marginTop: 14, fontFamily: "Helvetica-Bold", color: NAVY }]}>
          Prefab Select
        </Text>
        <Text style={styles.garText}>
          Hoogwaardige prefab oplossingen voor uitbouwen, aanbouwen, dakopbouwen, poolhouses,
          mantelzorgwoningen, recreatiewoningen en modulaire bouwprojecten.
        </Text>

        <View style={styles.footer} fixed>
          <Text>{BEDRIJF.naam} · {BEDRIJF.web}</Text>
          <Text>{BEDRIJF.email} · {BEDRIJF.telefoon}</Text>
        </View>
      </Page>
    </Document>
  );
}
