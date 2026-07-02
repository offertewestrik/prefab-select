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
const date = (d: Date) => d.toLocaleDateString("nl-NL");

const s = StyleSheet.create({
  page: { padding: 40, fontSize: 9, color: "#1F2A45", fontFamily: "Helvetica", lineHeight: 1.4 },
  row: { flexDirection: "row" },
  between: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  logo: { height: 40, marginBottom: 6, objectFit: "contain" },
  companyName: { fontSize: 14, fontFamily: "Helvetica-Bold", color: "#0E1B33" },
  muted: { color: "#6B7280" },
  hTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#0E1B33" },
  block: { marginTop: 18 },
  label: { fontSize: 7, textTransform: "uppercase", color: "#9CA3AF", marginBottom: 2, letterSpacing: 0.5 },
  h2: { fontSize: 13, fontFamily: "Helvetica-Bold", color: "#0E1B33", marginTop: 16, marginBottom: 4 },
  tHead: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E5E7EB", paddingBottom: 4, marginTop: 10, color: "#6B7280", fontFamily: "Helvetica-Bold" },
  tRow: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#F3F4F6", paddingVertical: 4 },
  cDesc: { flex: 1, paddingRight: 6 },
  cQty: { width: 40, textAlign: "right" },
  cPrice: { width: 70, textAlign: "right" },
  cTot: { width: 70, textAlign: "right" },
  totals: { marginTop: 10, marginLeft: "auto", width: 220 },
  tLine: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2 },
  grand: { flexDirection: "row", justifyContent: "space-between", borderTopWidth: 1, borderTopColor: "#E5E7EB", marginTop: 4, paddingTop: 6, fontFamily: "Helvetica-Bold", fontSize: 11, color: "#0E1B33" },
  terms: { marginTop: 18, borderTopWidth: 1, borderTopColor: "#E5E7EB", paddingTop: 8 },
  accept: { marginTop: 16, padding: 10, backgroundColor: "#F6F9FE", borderRadius: 4 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, fontSize: 7, color: "#9CA3AF", textAlign: "center" },
});

function QuoteDoc({ q }: { q: QuotePdfInput }) {
  const companyAddr = [q.company.street, [q.company.postcode, q.company.city].filter(Boolean).join(" ")].filter(Boolean).join(", ");
  const meta = [q.company.kvk && `KVK ${q.company.kvk}`, q.company.vatNumber && `BTW ${q.company.vatNumber}`].filter(Boolean).join("  ·  ");
  return (
    <Document>
      <Page size="A4" style={s.page}>
        <View style={s.between}>
          <View>
            {q.company.logoUrl ? <Image style={s.logo} src={q.company.logoUrl} /> : <Text style={s.companyName}>{q.company.name}</Text>}
            {q.company.logoUrl ? <Text style={s.companyName}>{q.company.name}</Text> : null}
            {companyAddr ? <Text style={s.muted}>{companyAddr}</Text> : null}
            <Text style={s.muted}>{[q.company.phone, q.company.email].filter(Boolean).join("  ·  ")}</Text>
            {meta ? <Text style={s.muted}>{meta}</Text> : null}
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={s.hTitle}>{q.kind === "invoice" ? "FACTUUR" : "OFFERTE"}</Text>
            <Text style={s.muted}>{q.number}</Text>
            <Text style={s.muted}>Datum: {date(q.createdAt)}</Text>
            {q.validUntil ? <Text style={s.muted}>{q.kind === "invoice" ? "Vervaldatum" : "Geldig tot"}: {date(q.validUntil)}</Text> : null}
          </View>
        </View>

        <View style={[s.block, s.row]}>
          <View style={{ flex: 1 }}>
            <Text style={s.label}>Voor</Text>
            <Text style={{ fontFamily: "Helvetica-Bold" }}>{q.customer.name || "Klant"}</Text>
            {q.customer.address ? <Text>{q.customer.address}</Text> : null}
            <Text style={s.muted}>{[q.customer.phone, q.customer.email].filter(Boolean).join("  ·  ")}</Text>
          </View>
        </View>

        {q.title ? <Text style={s.h2}>{q.title}</Text> : null}
        {q.introText ? <Text style={{ marginTop: 2 }}>{q.introText}</Text> : null}

        <View style={s.tHead}>
          <Text style={s.cDesc}>Omschrijving</Text>
          <Text style={s.cQty}>Aantal</Text>
          <Text style={s.cPrice}>Stukprijs</Text>
          <Text style={s.cTot}>Totaal</Text>
        </View>
        {q.lineItems.map((li, i) => (
          <View style={s.tRow} key={i} wrap={false}>
            <Text style={s.cDesc}>{li.description}{li.optional ? "  (optioneel)" : ""}</Text>
            <Text style={s.cQty}>{li.qty}</Text>
            <Text style={s.cPrice}>{eur(li.unitPriceCents)}</Text>
            <Text style={s.cTot}>{li.optional ? "—" : eur(li.qty * li.unitPriceCents)}</Text>
          </View>
        ))}

        <View style={s.totals}>
          <View style={s.tLine}><Text style={s.muted}>Subtotaal (excl. btw)</Text><Text>{eur(q.subtotalCents)}</Text></View>
          {q.discountCents > 0 ? <View style={s.tLine}><Text style={s.muted}>Korting</Text><Text>{"− " + eur(q.discountCents)}</Text></View> : null}
          <View style={s.tLine}><Text style={s.muted}>Btw ({q.vatRate}%)</Text><Text>{eur(q.vatCents)}</Text></View>
          <View style={s.grand}><Text>Totaal incl. btw</Text><Text>{eur(q.totalCents)}</Text></View>
        </View>

        {q.terms ? (
          <View style={s.terms}>
            <Text style={s.label}>Voorwaarden & garantie</Text>
            <Text style={s.muted}>{q.terms}</Text>
          </View>
        ) : null}

        <View style={s.accept}>
          {q.kind === "invoice" ? (
            <>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Betaling</Text>
              <Text style={s.muted}>
                Gelieve het totaalbedrag {q.validUntil ? `vóór ${date(q.validUntil)} ` : ""}over te maken onder vermelding van factuurnummer {q.number}.
              </Text>
            </>
          ) : (
            <>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>Akkoord</Text>
              <Text style={s.muted}>
                Gaat u akkoord met deze offerte? Antwoord op de e-mail of gebruik de akkoordknop in de online offerte.
                Na akkoord plannen wij de werkzaamheden in overleg met u in.
              </Text>
            </>
          )}
        </View>

        <Text style={s.footer} fixed>
          {q.company.name} — {q.kind === "invoice" ? "factuur" : "offerte"} {q.number}
        </Text>
      </Page>
    </Document>
  );
}

/** Rendert de offerte naar een PDF-buffer (server-side). */
export async function renderQuotePdf(input: QuotePdfInput): Promise<Buffer> {
  return renderToBuffer(<QuoteDoc q={input} />);
}
