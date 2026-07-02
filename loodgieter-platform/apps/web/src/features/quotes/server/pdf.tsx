import "server-only";
import { Document, Page, Text, View, StyleSheet, Image, renderToBuffer } from "@react-pdf/renderer";
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
  };
  customer: { name?: string | null; email?: string | null; phone?: string | null; address?: string | null };
  lineItems: LineItem[];
  subtotalCents: number;
  discountCents: number;
  vatRate: number;
  vatCents: number;
  totalCents: number;
  terms?: string | null;
}

const eur = (c: number) => `€ ${(c / 100).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const date = (d: Date) => d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

// ── Huisstijl-kleuren (gelijk aan de website) ──
const C = {
  ink: "#0E1B33",
  text: "#1F2A45",
  muted: "#6B7280",
  faint: "#9AA6BC",
  blue: "#2563EB",
  blueSoft: "#EEF3FB",
  orange: "#F26A1B",
  orangeSoft: "#FFF4EC",
  line: "#E7ECF3",
  zebra: "#FAFBFD",
  card: "#F6F9FE",
};

const s = StyleSheet.create({
  page: { fontSize: 9.5, color: C.text, fontFamily: "Helvetica", lineHeight: 1.45, paddingBottom: 64 },

  // Kop
  accentBar: { height: 5, backgroundColor: C.blue },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", paddingHorizontal: 40, paddingTop: 30, paddingBottom: 14 },
  logo: { height: 38, marginBottom: 8, objectFit: "contain" },
  companyName: { fontSize: 15, fontFamily: "Helvetica-Bold", color: C.ink },
  muted: { color: C.muted },
  faint: { color: C.faint, fontSize: 8.5 },
  docType: { fontSize: 22, fontFamily: "Helvetica-Bold", color: C.blue, letterSpacing: 1, lineHeight: 1 },
  docNum: { fontSize: 10.5, fontFamily: "Helvetica-Bold", color: C.ink, marginTop: 5 },
  metaRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 6 },
  metaLabel: { color: C.faint, fontSize: 8.5, textAlign: "right" },
  metaVal: { color: C.text, fontSize: 8.5, textAlign: "right", marginLeft: 6, fontFamily: "Helvetica-Bold" },

  rule: { borderBottomWidth: 1, borderBottomColor: C.line, marginHorizontal: 40 },
  content: { paddingHorizontal: 40 },

  // Klantkaart
  card: { marginTop: 18, alignSelf: "flex-start", minWidth: 230, maxWidth: 300, backgroundColor: C.card, borderRadius: 6, padding: 12, borderLeftWidth: 3, borderLeftColor: C.blue },
  label: { fontSize: 7, textTransform: "uppercase", color: C.faint, marginBottom: 3, letterSpacing: 0.6, fontFamily: "Helvetica-Bold" },
  strong: { fontFamily: "Helvetica-Bold", color: C.ink },

  // Titel / intro
  title: { fontSize: 14, fontFamily: "Helvetica-Bold", color: C.ink, marginTop: 20 },
  intro: { marginTop: 4, color: C.text },

  // Tabel
  tHead: { flexDirection: "row", backgroundColor: C.blueSoft, paddingVertical: 6, paddingHorizontal: 8, borderRadius: 4, marginTop: 18 },
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
  grand: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", backgroundColor: C.blue, borderRadius: 6, paddingVertical: 9, paddingHorizontal: 12, marginTop: 8 },
  grandLabel: { color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 10.5 },
  grandVal: { color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 13 },

  // Voorwaarden
  terms: { marginTop: 22, backgroundColor: "#F8FAFC", borderRadius: 6, padding: 12, borderLeftWidth: 3, borderLeftColor: C.faint },

  // Akkoord / betaling
  callout: { marginTop: 14, backgroundColor: C.orangeSoft, borderRadius: 6, padding: 12, borderLeftWidth: 3, borderLeftColor: C.orange },
  calloutTitle: { fontFamily: "Helvetica-Bold", color: C.ink, marginBottom: 2 },

  // Footer
  footer: { position: "absolute", bottom: 26, left: 40, right: 40, borderTopWidth: 1, borderTopColor: C.line, paddingTop: 6, flexDirection: "row", justifyContent: "space-between" },
  footerText: { fontSize: 7.5, color: C.faint },
});

function MetaLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.metaRow}>
      <Text style={s.metaLabel}>{label}</Text>
      <Text style={s.metaVal}>{value}</Text>
    </View>
  );
}

function QuoteDoc({ q }: { q: QuotePdfInput }) {
  const isInvoice = q.kind === "invoice";
  const companyAddr = [q.company.street, [q.company.postcode, q.company.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const meta = [q.company.kvk && `KVK ${q.company.kvk}`, q.company.vatNumber && `BTW ${q.company.vatNumber}`].filter(Boolean).join("  ·  ");
  const contact = [q.company.phone, q.company.email].filter(Boolean).join("  ·  ");

  return (
    <Document title={`${isInvoice ? "Factuur" : "Offerte"} ${q.number}`} author={q.company.name}>
      <Page size="A4" style={s.page}>
        <View style={s.accentBar} />

        {/* Kop: bedrijf links, document rechts */}
        <View style={s.header}>
          <View style={{ maxWidth: 300 }}>
            {q.company.logoUrl ? <Image style={s.logo} src={q.company.logoUrl} /> : null}
            <Text style={s.companyName}>{q.company.name}</Text>
            {companyAddr ? <Text style={s.muted}>{companyAddr}</Text> : null}
            {contact ? <Text style={s.muted}>{contact}</Text> : null}
            {meta ? <Text style={s.faint}>{meta}</Text> : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={s.docType}>{isInvoice ? "FACTUUR" : "OFFERTE"}</Text>
            <Text style={s.docNum}>{q.number}</Text>
            <MetaLine label="Datum" value={date(q.createdAt)} />
            {q.validUntil ? <MetaLine label={isInvoice ? "Vervaldatum" : "Geldig tot"} value={date(q.validUntil)} /> : null}
          </View>
        </View>

        <View style={s.rule} />

        <View style={s.content}>
          {/* Klantgegevens */}
          <View style={s.card}>
            <Text style={s.label}>{isInvoice ? "Factuuradres" : "Offerte voor"}</Text>
            <Text style={s.strong}>{q.customer.name || "Klant"}</Text>
            {q.customer.address ? <Text>{q.customer.address}</Text> : null}
            {(q.customer.phone || q.customer.email) ? (
              <Text style={s.muted}>{[q.customer.phone, q.customer.email].filter(Boolean).join("  ·  ")}</Text>
            ) : null}
          </View>

          {q.title ? <Text style={s.title}>{q.title}</Text> : null}
          {q.introText ? <Text style={s.intro}>{q.introText}</Text> : null}

          {/* Regels */}
          <View style={s.tHead}>
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
            <View style={s.grand}>
              <Text style={s.grandLabel}>Totaal incl. btw</Text>
              <Text style={s.grandVal}>{eur(q.totalCents)}</Text>
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

        {/* Footer met paginanummer */}
        <View style={s.footer} fixed>
          <Text style={s.footerText}>{q.company.name} · {isInvoice ? "Factuur" : "Offerte"} {q.number}</Text>
          <Text style={s.footerText} fixed render={({ pageNumber, totalPages }) => `Pagina ${pageNumber} van ${totalPages}`} />
        </View>
      </Page>
    </Document>
  );
}

/** Rendert de offerte naar een PDF-buffer (server-side). */
export async function renderQuotePdf(input: QuotePdfInput): Promise<Buffer> {
  return renderToBuffer(<QuoteDoc q={input} />);
}
