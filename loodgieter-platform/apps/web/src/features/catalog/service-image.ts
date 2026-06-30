import "server-only";

/**
 * Eén bron van waarheid voor de foto per dienst.
 *
 * Voorkeur: een dedicated bestand onder public/images/services/<naam>.webp.
 * Bestaat dat (nog) niet, dan valt de functie netjes terug op de bestaande
 * Intergas-overrides en daarna op een categoriefoto — zo breekt er nooit een
 * afbeelding terwijl de webp-set wordt aangevuld.
 *
 * We gebruiken bewust GEEN fs-check meer: op Vercel is het bestandssysteem
 * tijdens (on-demand) rendering niet gegarandeerd beschikbaar, waardoor foto's
 * konden wegvallen. In plaats daarvan een vaste lijst van aanwezige webp's
 * (= de bestanden in public/images/services/). Voeg je een webp toe? Zet de
 * naam ook in AVAILABLE_WEBP.
 */

const AVAILABLE_WEBP = new Set<string>([
  "adv-24-7-loodgieter",
  "adv-daklekkage",
  "adv-gaslek",
  "adv-lekkage-verhelpen",
  "airco-onderhoud",
  "airco-reparatie",
  "airco-smart-bediening",
  "badkamer-renovatie",
  "bitumen-dakbedekking",
  "cv-ketel-onderhoud",
  "dakkapel-plaatsen",
  "dakraam-plaatsen",
  "design-radiator",
  "elektrische-vloerverwarming",
  "gasleiding-aanleggen-aanpassen",
  "hybride-warmtepomp",
  "laadpaal-installeren",
  "lage-convector-radiator",
  "leidingwerk",
  "loodslabben",
  "lucht-water-warmtepomp",
  "meterkast-vervangen-uitbreiden",
  "pannendak-vervangen",
  "radiator-paneel",
  "radiator-type22",
  "thuisbatterij-installatie",
  "toilet-renovatie",
  "verdeler-vervangen",
  "vloerverwarming-infrezen",
  "vloerverwarming-leggen",
  "waterleiding-aanleggen-repareren",
  "zonnepanelen-installeren",
]);

// DB-slug -> bestandsnaam (zonder extensie), exact zoals aangeleverd.
const SERVICE_IMAGE_FILE: Record<string, string> = {
  "cv-onderhoud": "cv-ketel-onderhoud",
  "cv-reparatie": "cv-ketel-reparatie",
  "cv-storing": "cv-ketel-storing-verhelpen",
  "cv-ketel-vervangen": "cv-ketel-vervangen",
  "nieuwe-cv-ketel": "nieuwe-cv-ketel",
  "hybride-warmtepomp": "hybride-warmtepomp",
  "lucht-water-warmtepomp": "lucht-water-warmtepomp",
  warmtepomp: "warmtepomp-installeren",
  airco: "airco-smart-bediening",
  "airco-onderhoud": "airco-onderhoud",
  "airco-reparatie": "airco-reparatie",
  "radiator-ontluchten": "radiator-paneel",
  "radiator-plaatsen": "radiator-type22",
  "radiator-vervangen": "design-radiator",
  "elektrische-vloerverwarming": "elektrische-vloerverwarming",
  "verdeler-vervangen": "verdeler-vervangen",
  "vloerverwarming-infrezen": "vloerverwarming-infrezen",
  "vloerverwarming-leggen": "vloerverwarming-leggen",
  "badkamer-renovatie": "badkamer-renovatie",
  "toilet-renovatie": "toilet-renovatie",
  gasleiding: "gasleiding-aanleggen-aanpassen",
  leidingwerk: "leidingwerk",
  waterleiding: "waterleiding-aanleggen-repareren",
  "24-7-loodgieter": "adv-24-7-loodgieter",
  daklekkage: "adv-daklekkage",
  gaslekkage: "adv-gaslek",
  lekkage: "adv-lekkage-verhelpen",
  "spoed-loodgieter": "adv-24-7-loodgieter",
  waterlekkage: "waterlekkage",
  afvoer: "afvoer-aanleggen-repareren",
  ontstopping: "ontstopping",
  riolering: "riolering",
  "plat-dak-bitumen": "bitumen-dakbedekking",
  dakgoot: "dakgoot-repareren-vervangen",
  dakisolatie: "dakisolatie",
  "dakkapel-plaatsen": "dakkapel-plaatsen",
  "dakpannen-repareren": "dakpannen-repareren-vervangen",
  "dakraam-plaatsen": "dakraam-plaatsen",
  dakrenovatie: "dakrenovatie",
  "plat-dak-epdm": "epdm-dakbedekking",
  loodwerk: "loodslabben",
  "pannendak-vervangen": "pannendak-vervangen",
  zinkwerk: "zinkwerk",
  boiler: "boiler-plaatsen-vervangen",
  geiser: "geiser-vervangen",
  elektra: "elektra",
  laadpalen: "laadpaal-installeren",
  meterkast: "meterkast-vervangen-uitbreiden",
  thuisbatterij: "thuisbatterij-installatie",
  zonnepanelen: "zonnepanelen-installeren",
};

// Reeds geplaatste Intergas-foto's — fallback voor cv-diensten zolang er nog
// geen dedicated webp is.
const PHOTO_BY_SLUG: Record<string, string> = {
  "cv-onderhoud": "/foto/diensten-cv/intergas-cw4-onderhoud.jpg",
  "cv-reparatie": "/foto/diensten-cv/intergas-cw4-reparatie.jpg",
  "cv-storing": "/foto/diensten-cv/intergas-cw4-storing.jpg",
};

/** Categoriefoto als laatste vangnet. */
function categoryPhoto(slug: string, name: string): string {
  const s = `${slug} ${name}`.toLowerCase();
  let cat = "cv-ketels";
  if (/(zonne|solar|laadpaal|pv|batterij|elektra|meterkast)/.test(s)) cat = "zonnepanelen";
  else if (/(goot|zink)/.test(s)) cat = "dak-goten";
  else if (/(pannendak|dakpannen|pannen|dakrenovat|leien)/.test(s)) cat = "dak-pannen";
  else if (/(bitumen|epdm|plat.?dak)/.test(s)) cat = "dak-bitumen";
  else if (/dak/.test(s)) cat = "dakwerk";
  else if (/warmtepomp/.test(s)) cat = "warmtepompen";
  else if (/(airco|koel)/.test(s)) cat = "warmtepompen";
  else if (/vloerverwarming/.test(s)) cat = "vloerverwarming";
  else if (/radiator/.test(s)) cat = "radiatoren";
  else if (/(badkamer|sanitair|toilet|douche|wastafel|kraan|wc)/.test(s)) cat = "badkamers";
  else if (/keuken/.test(s)) cat = "keukenleidingen";
  else if (/(lek|spoed|ontstop|riool|afvoer|verstop|storing)/.test(s)) cat = "lekkages";
  else if (/(leiding|loodgiet)/.test(s)) cat = "leidingwerk";
  else if (/(cv|ketel|geiser|verwarm|boiler|warm.?water)/.test(s)) cat = "cv-ketels";
  return `/foto/${cat}/${cat}-01.jpg`;
}

/** Beste beschikbare foto-URL voor een dienst. */
export function serviceImage(slug: string, name: string): string {
  const file = SERVICE_IMAGE_FILE[slug];
  if (file && AVAILABLE_WEBP.has(file)) return `/images/services/${file}.webp`;
  const override = PHOTO_BY_SLUG[slug];
  if (override) return override;
  return categoryPhoto(slug, name);
}
