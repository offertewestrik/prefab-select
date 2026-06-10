import { berekenTotalen } from "./quote-utils";
import type { Invoice, InvoiceStatus, Payment } from "./types";

export function invoiceTotaal(invoice: Invoice): number {
  return berekenTotalen(invoice.regels, invoice.korting).totaal;
}

export function betaaldBedrag(payments: Payment[], invoiceId: string): number {
  return payments.filter((p) => p.invoiceId === invoiceId).reduce((s, p) => s + p.bedrag, 0);
}

export function openstaand(invoice: Invoice, payments: Payment[]): number {
  return Math.max(0, invoiceTotaal(invoice) - betaaldBedrag(payments, invoice.id));
}

/**
 * Effectieve status op basis van betalingen en vervaldatum.
 * Houdt rekening met deels/volledig betaald en te laat.
 */
export function effectieveStatus(invoice: Invoice, payments: Payment[]): InvoiceStatus {
  if (invoice.status === "concept" || invoice.status === "gecrediteerd") return invoice.status;
  const totaal = invoiceTotaal(invoice);
  const betaald = betaaldBedrag(payments, invoice.id);
  if (betaald >= totaal && totaal > 0) return "betaald";
  if (betaald > 0) return "deels_betaald";
  if (new Date(invoice.vervaldatum) < new Date()) return "te_laat";
  return "verzonden";
}

export function volgendFactuurNummer(bestaande: Invoice[]): string {
  const jaar = new Date().getFullYear();
  const prefix = `FACT-${jaar}-`;
  const nummers = bestaande
    .map((i) => i.nummer)
    .filter((n) => n.startsWith(prefix))
    .map((n) => parseInt(n.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n));
  const volgend = (nummers.length ? Math.max(...nummers) : 0) + 1;
  return `${prefix}${String(volgend).padStart(4, "0")}`;
}

/** Het vaste betaalschema (percentage per termijn) — synchroon met de offerte. */
export const TERMIJN_SCHEMA = [
  { pct: 40, label: "40% — aanbetaling bij opdracht" },
  { pct: 30, label: "30% — bij aanvang productie" },
  { pct: 20, label: "20% — bij levering en plaatsing" },
  { pct: 10, label: "10% — bij oplevering" },
];
