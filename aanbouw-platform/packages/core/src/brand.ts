// ─────────────────────────────────────────────────────────────────────────
//  MERKINSTELLINGEN — één plek voor naam, contact en werkgebied.
// ─────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "AanbouwPlatform.nl",
  shortName: "AanbouwPlatform",
  domain: "aanbouwplatform.nl",
  tagline: "Vind binnen 2 minuten een betrouwbaar bouwbedrijf voor je uitbreiding",

  // Pas aan naar de eigen contactgegevens:
  phone: "085 - 060 12 34",
  phoneHref: "tel:+31850601234",
  email: "info@aanbouwplatform.nl",

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
