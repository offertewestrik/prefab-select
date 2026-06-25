// ─────────────────────────────────────────────────────────────────────────
//  MERKINSTELLINGEN — één plek voor naam, contact en werkgebied.
// ─────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "Loodgieterplatform.nl",
  shortName: "Loodgieterplatform",
  domain: "loodgieterplatform.nl",
  tagline: "Vind binnen 2 minuten een betrouwbare loodgieter",

  // Pas aan naar de eigen contactgegevens:
  phone: "085 - 060 58 72",
  phoneHref: "tel:+31850605872",
  email: "info@loodgieterplatform.nl",

  // Werkgebied (provincies). Sturen ook de teksten op de site aan.
  regions: [
    "Noord-Brabant",
    "Gelderland",
    "Zuid-Holland",
    "Noord-Holland",
    "Utrecht",
  ],
} as const;

export function regionsSentence(): string {
  const r = brand.regions;
  if (r.length <= 1) return r[0] ?? "";
  return `${r.slice(0, -1).join(", ")} en ${r[r.length - 1]}`;
}
