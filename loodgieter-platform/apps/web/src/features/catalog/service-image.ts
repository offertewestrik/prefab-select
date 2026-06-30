import "server-only";
import fs from "node:fs";
import path from "node:path";

/**
 * Eén bron van waarheid voor de foto per dienst.
 *
 * Voorkeur: een dedicated bestand onder public/images/services/<naam>.webp.
 * Bestaat dat (nog) niet, dan valt de functie netjes terug op de bestaande
 * Intergas-overrides en daarna op een categoriefoto — zo breekt er nooit een
 * afbeelding terwijl de webp-set wordt aangevuld.
 */

const SERVICES_DIR = path.join(process.cwd(), "public/images/services");

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

const existsCache = new Map<string, boolean>();
function webpExists(file: string): boolean {
  const cached = existsCache.get(file);
  if (cached !== undefined) return cached;
  let ok = false;
  try {
    ok = fs.existsSync(path.join(SERVICES_DIR, `${file}.webp`));
  } catch {
    ok = false;
  }
  existsCache.set(file, ok);
  return ok;
}

/** Beste beschikbare foto-URL voor een dienst. */
export function serviceImage(slug: string, name: string): string {
  const file = SERVICE_IMAGE_FILE[slug];
  if (file && webpExists(file)) return `/images/services/${file}.webp`;
  const override = PHOTO_BY_SLUG[slug];
  if (override) return override;
  return categoryPhoto(slug, name);
}
