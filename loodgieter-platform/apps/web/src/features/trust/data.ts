// ─────────────────────────────────────────────────────────────────────────
//  TRUST CENTER — data voor A-merken, keurmerken, USP's en statistieken.
//  Eén plek om vertrouwenselementen te beheren. Logo's staan in /public.
// ─────────────────────────────────────────────────────────────────────────

export type TrustLogo = {
  /** Weergavenaam (alt-tekst). */
  name: string;
  /** Bestandsnaam in de betreffende public-map. */
  file: string;
  /**
   * Categorie-slugs (uit de dienstencatalogus) waar dit merk bij hoort.
   * Sturen aan op welke dienstpagina's het logo getoond wordt.
   */
  categories: string[];
};

export type Keurmerk = Omit<TrustLogo, "categories"> & {
  /** Korte uitleg waar het keurmerk voor staat. */
  desc: string;
};

// Categorie-slugs (zie packages/db/seed/data/services.ts).
const VERWARMING = ["cv-en-verwarming", "warmtepompen", "warm-water"];
const SANITAIR = ["badkamer-en-sanitair", "leidingwerk"];
const DAK = ["dak-en-zink"];

/** Erkende A-merken waar aangesloten vakmannen mee werken. */
export const A_MERKEN: TrustLogo[] = [
  // CV, verwarming, warmtepompen, warm water
  { name: "Intergas", file: "intergas.png", categories: VERWARMING },
  { name: "Remeha", file: "remeha.png", categories: [...VERWARMING, "koeling-airco"] },
  { name: "Nefit", file: "nefit.png", categories: VERWARMING },
  { name: "Vaillant", file: "vaillant.png", categories: [...VERWARMING, "koeling-airco"] },
  { name: "ATAG", file: "atag.png", categories: VERWARMING },
  { name: "Bosch", file: "bosch.png", categories: [...VERWARMING, "koeling-airco"] },
  { name: "AWB", file: "awb.png", categories: VERWARMING },
  { name: "Itho Daalderop", file: "itho_daalderop.png", categories: [...VERWARMING, "koeling-airco"] },
  { name: "Inventum", file: "inventum.png", categories: VERWARMING },
  // Radiatoren
  { name: "Henrad", file: "henrad.png", categories: ["radiatoren"] },
  { name: "Radson", file: "radson.png", categories: ["radiatoren"] },
  // Badkamer & sanitair / leidingwerk
  { name: "Grohe", file: "grohe.png", categories: SANITAIR },
  { name: "Hansgrohe", file: "hansgrohe.png", categories: SANITAIR },
  { name: "Quooker", file: "quooker.png", categories: [...SANITAIR, "warm-water"] },
  { name: "Plieger", file: "plieger.png", categories: SANITAIR },
  { name: "Ideal Standard", file: "ideal.png", categories: SANITAIR },
  { name: "Villeroy & Boch", file: "villeroy_boch.png", categories: SANITAIR },
  { name: "Laufen", file: "laufen.png", categories: SANITAIR },
  { name: "Hüppe", file: "huppe.png", categories: SANITAIR },
  { name: "Wisa", file: "wisa.png", categories: [...SANITAIR, "afvoer-en-riool"] },
  { name: "Venlo", file: "venlo.png", categories: SANITAIR },
  { name: "ACO", file: "aco.png", categories: ["afvoer-en-riool"] },
  // Dak & zinkwerk
  { name: "VELUX", file: "velux.png", categories: DAK },
  { name: "Fakro", file: "fakro.png", categories: DAK },
  { name: "Wienerberger Koramic", file: "wienerberger_koramic.png", categories: DAK },
  { name: "BMI Monier / Icopal", file: "bmi_monier_icopal.png", categories: DAK },
  { name: "Soprema", file: "soprema.png", categories: DAK },
  { name: "Bauder", file: "bauder.png", categories: DAK },
  { name: "RheinZink", file: "rheinzink.png", categories: DAK },
  { name: "Rockwool", file: "rockwool.png", categories: DAK },
];

/** A-merken die bij een bepaalde dienstcategorie horen. */
export function brandsForCategory(categorySlug: string): TrustLogo[] {
  return A_MERKEN.filter((m) => m.categories.includes(categorySlug));
}

/** Algemene keurmerken en erkenningen waaraan aangesloten vakmannen voldoen. */
export const KEURMERKEN: Keurmerk[] = [
  { name: "InstallQ", file: "installq.png", desc: "Erkenningsregeling voor installatiebedrijven" },
  { name: "Kiwa", file: "kiwa.png", desc: "Onafhankelijke certificering en keuring" },
  { name: "KOMO", file: "komo.png", desc: "Kwaliteitskeurmerk voor de bouw" },
  { name: "CO-keur", file: "co_keur.png", desc: "Keuring tegen koolmonoxidegevaar" },
  { name: "BRL 6000", file: "brl-6000.png", desc: "Beoordelingsrichtlijn installatietechniek" },
  { name: "VCA", file: "vca.png", desc: "Veiligheid, Gezondheid en Milieu" },
  { name: "STEK", file: "stek.png", desc: "Erkend voor koudemiddelen (F-gassen)" },
  { name: "OK CV", file: "ok_cv.png", desc: "Keurmerk voor CV-installateurs" },
  { name: "KvINL", file: "kvinl.png", desc: "Register erkende installatiebedrijven" },
  { name: "SBB", file: "sbb.png", desc: "Erkend leerbedrijf" },
  { name: "Kwaliteitsvakman", file: "kwaliteitsvakman.png", desc: "Onafhankelijk vakmanschapskeurmerk" },
];

/** Keurmerken specifiek voor dakwerk (categorie dak-en-zink). */
export const DAK_KEURMERKEN: Keurmerk[] = [
  { name: "Dakmerk", file: "dak/dakmerk.png", desc: "Erkend kwaliteitskeurmerk voor dakdekkers" },
  { name: "Techniek Nederland", file: "dak/techniek_nederland.png", desc: "Brancheorganisatie installatie- en dakbedrijven" },
  { name: "KOMO SKG-IKOB", file: "dak/komo_skg_ikob.png", desc: "Productcertificering voor de bouw" },
  { name: "Kiwa KVO", file: "dak/kvo.png", desc: "Keurmerk Veilig Ondernemen" },
  { name: "ISO 9001", file: "dak/iso9001.png", desc: "Gecertificeerd kwaliteitsmanagement" },
  { name: "VCA", file: "dak/vca.png", desc: "Veiligheid, Gezondheid en Milieu" },
  { name: "SBB", file: "dak/sbb.png", desc: "Erkend leerbedrijf" },
];

/**
 * Categorie-specifieke keurmerken (bv. dakwerk). Geeft een lege lijst terug
 * als er geen aparte set is — algemene keurmerken staan op home/Trust Center.
 */
export function keurmerkenForCategory(categorySlug: string): Keurmerk[] {
  if (categorySlug === "dak-en-zink") return DAK_KEURMERKEN;
  return [];
}

/** Kerncijfers voor de statistiekenband. */
export const TRUST_STATS: { value: string; label: string }[] = [
  { value: "9,4", label: "Gemiddelde klantwaardering" },
  { value: "25.000+", label: "Succesvol uitgevoerde opdrachten" },
  { value: "500+", label: "Aangesloten vakmannen" },
  { value: "Heel Nederland", label: "Altijd een loodgieter in de buurt" },
  { value: "24/7", label: "Spoedservice beschikbaar" },
];
