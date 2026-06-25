// ─────────────────────────────────────────────────────────────────────────
//  MERKINSTELLINGEN — pas hier alles aan (naam, telefoon, e-mail, regio's).
//  Dit is de enige plek die je hoeft te wijzigen om de hele site bij te werken.
// ─────────────────────────────────────────────────────────────────────────

export const brand = {
  name: "Loodgieterplatform.nl",
  shortName: "Loodgieterplatform",
  domain: "loodgieterplatform.nl",
  tagline: "Snel een vakkundige loodgieter aan huis",

  // Pas deze contactgegevens aan naar jullie eigen nummer/adres:
  phone: "085 - 808 00 00",
  phoneHref: "tel:+31858080000",
  email: "info@loodgieterplatform.nl",

  // Werkgebied (provincies). Voeg toe of haal weg naar wens:
  regions: [
    "Noord-Brabant",
    "Gelderland",
    "Zuid-Holland",
    "Noord-Holland",
    "Utrecht",
  ],
};

// Korte, leesbare opsomming van het werkgebied, bv. "Noord-Brabant, Gelderland ... en Utrecht"
export function regionsSentence(): string {
  const r = brand.regions;
  if (r.length <= 1) return r[0] ?? "";
  return `${r.slice(0, -1).join(", ")} en ${r[r.length - 1]}`;
}
