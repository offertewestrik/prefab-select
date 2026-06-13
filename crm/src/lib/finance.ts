import { quoteTotaal } from "./quote-utils";
import { invoiceTotaal } from "./invoice-utils";
import type { Invoice, Purchase, Quote } from "./types";

/** Een lead is een 'project' zodra er een geaccepteerde offerte is. */
export function isProject(quotes: Quote[], leadId: string): boolean {
  return quotes.some((q) => q.leadId === leadId && q.status === "geaccepteerd");
}

/** Omzet = som van geaccepteerde offertes (de orderwaarde). */
export function omzetVanLead(quotes: Quote[], leadId: string): number {
  return quotes
    .filter((q) => q.leadId === leadId && q.status === "geaccepteerd")
    .reduce((s, q) => s + quoteTotaal(q), 0);
}

/** Gefactureerd = som van alle facturen van deze lead. */
export function gefactureerdVanLead(invoices: Invoice[], leadId: string): number {
  return invoices.filter((i) => i.leadId === leadId).reduce((s, i) => s + invoiceTotaal(i), 0);
}

export function inkoopVanLead(purchases: Purchase[], leadId: string): number {
  return purchases.filter((p) => p.leadId === leadId).reduce((s, p) => s + p.bedrag, 0);
}

export function margePercentage(omzet: number, winst: number): number {
  return omzet > 0 ? Math.round((winst / omzet) * 100) : 0;
}
