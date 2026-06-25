import type { Urgency } from "@repo/core";

// Prijs per lead in credits. Bewust eenvoudig + configureerbaar te maken in
// admin (later). Basis per dienst + urgentie-factor.
const URGENCY_FACTOR: Record<Urgency, number> = {
  SPOED: 1.5,
  BINNEN_WEEK: 1.1,
  FLEXIBEL: 1.0,
};

/** Berekent de credit-prijs van een lead. */
export function computeLeadPriceCredits(input: {
  basePriceCredits?: number; // toekomstige per-dienst-config
  urgency: Urgency;
}): number {
  const base = input.basePriceCredits ?? 5;
  return Math.max(1, Math.round(base * URGENCY_FACTOR[input.urgency]));
}
