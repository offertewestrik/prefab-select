import type { LineItem } from "../schema";

export function computeTotals(lineItems: LineItem[], vatRate: number) {
  const subtotalCents = lineItems.reduce((sum, li) => sum + Math.round(li.qty * li.unitPriceCents), 0);
  const vatCents = Math.round((subtotalCents * vatRate) / 100);
  const totalCents = subtotalCents + vatCents;
  return { subtotalCents, vatCents, totalCents };
}

/** Genereert een eenvoudig, niet-radend toegangstoken voor de klant-link. */
export function makeAccessToken(seed: string): string {
  // Deterministische maar niet-raadbare-genoeg token (geen Math.random nodig).
  let h1 = 0x811c9dc5;
  let h2 = 0x1000193;
  const salt = `${seed}:${Date.now()}:loodgieterplatform`;
  for (let i = 0; i < salt.length; i++) {
    const c = salt.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 0x01000193) >>> 0;
    h2 = Math.imul(h2 + c, 0x01000193) >>> 0;
  }
  return (h1.toString(16).padStart(8, "0") + h2.toString(16).padStart(8, "0") + Date.now().toString(36));
}
