// Gedeelde formatteer-helpers (NL).

export function euro(amount?: number | null): string {
  if (amount == null) return "";
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** "vanaf € 1.250" of "€ 1.250 – € 2.500". */
export function priceRange(from?: number | null, to?: number | null, unit?: string | null): string {
  const u = unit ? ` ${unit}` : "";
  if (from && to) return `${euro(from)} – ${euro(to)}${u}`;
  if (from) return `vanaf ${euro(from)}${u}`;
  return "Prijs op aanvraag";
}

/**
 * Frontend-prijscorrecties per dienst-slug. Overschrijft alleen de getoonde
 * richtprijs (vanaf-bedrag); de database blijft ongemoeid.
 */
export const PRICE_FROM_OVERRIDE: Record<string, number> = {
  "cv-ketel-vervangen": 1850,
};

/** Effectieve richtprijs: override indien aanwezig, anders de DB-waarde. */
export function priceFromFor(slug: string, dbFrom?: number | null): number | null {
  return PRICE_FROM_OVERRIDE[slug] ?? dbFrom ?? null;
}

export function jsonLdScript(data: object): string {
  return JSON.stringify(data);
}
