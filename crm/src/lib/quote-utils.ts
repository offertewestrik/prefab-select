import type { Quote, QuoteLine } from "./types";

export interface QuoteTotals {
  subtotaal: number;
  korting: number;
  subtotaalNaKorting: number;
  btw: number;
  totaal: number;
}

/** Bereken alle bedragen van een offerte. Korting wordt evenredig verdeeld. */
export function berekenTotalen(regels: QuoteLine[], korting = 0): QuoteTotals {
  const subtotaal = regels.reduce((som, r) => som + r.aantal * r.prijsPerStuk, 0);
  const veiligeKorting = Math.min(korting, subtotaal);
  const factor = subtotaal > 0 ? (subtotaal - veiligeKorting) / subtotaal : 0;
  const btw = regels.reduce(
    (som, r) => som + r.aantal * r.prijsPerStuk * factor * (r.btwPercentage / 100),
    0,
  );
  const subtotaalNaKorting = subtotaal - veiligeKorting;
  return {
    subtotaal,
    korting: veiligeKorting,
    subtotaalNaKorting,
    btw,
    totaal: subtotaalNaKorting + btw,
  };
}

export function quoteTotaal(quote: Quote): number {
  return berekenTotalen(quote.regels, quote.korting).totaal;
}

/** Genereer het volgende offertenummer op basis van bestaande nummers. */
export function volgendQuoteNummer(bestaande: Quote[]): string {
  const jaar = new Date().getFullYear();
  const prefix = `PS-${jaar}-`;
  const nummers = bestaande
    .map((q) => q.nummer)
    .filter((n) => n.startsWith(prefix))
    .map((n) => parseInt(n.slice(prefix.length), 10))
    .filter((n) => !Number.isNaN(n));
  const volgend = (nummers.length ? Math.max(...nummers) : 0) + 1;
  return `${prefix}${String(volgend).padStart(4, "0")}`;
}
