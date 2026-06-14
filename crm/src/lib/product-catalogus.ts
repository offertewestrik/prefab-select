// ============================================================================
// Prijslijst-catalogus: de definitieve opties en prijzen (excl. btw) per
// productlijn — Prefab Uitbouw & Aanbouw, Luxe Poolhouses en Mantelzorg- &
// Vakantiewoningen. Wordt gebruikt om de eigen productcatalogus (tabel
// products) in één klik te vullen, zodat het team bij handmatige offertes
// dezelfde producten met de juiste prijzen kan aanklikken.
// Beschrijvingen komen uit optie-beschrijvingen.ts (één bron).
// ============================================================================

import { OPTIE_BESCHRIJVINGEN } from "./optie-beschrijvingen";
import type { ProductType } from "./types";

export interface CatalogusItem {
  naam: string;
  /** Prijs in euro's, exclusief btw. 0 = standaard / inbegrepen. */
  prijs: number;
  eenheid?: string; // standaard "stuks"
  /** Optie zit standaard in de basisprijs (prijs 0 is dan geen "nog invullen"). */
  inbegrepen?: boolean;
}

export interface CatalogusCategorie {
  categorie: string;
  items: CatalogusItem[];
}

export const LIJN_UITBOUW = "Prefab Uitbouw & Aanbouw";
export const LIJN_POOLHOUSE = "Luxe Poolhouses";
export const LIJN_MANTELZORG = "Mantelzorg- & Vakantiewoningen";

export const PRODUCT_CATALOGUS: { lijn: string; categorieen: CatalogusCategorie[] }[] = [
  {
    lijn: LIJN_UITBOUW,
    categorieen: [
      {
        categorie: "Gevelafwerking",
        items: [
          { naam: "Modern Hout (Verticaal)", prijs: 0, inbegrepen: true },
          { naam: "Klassiek Metselwerk", prijs: 600 },
          { naam: "Modern Stucwerk", prijs: 1500 },
          { naam: "Keralit Kunststof", prijs: 600 },
          { naam: "Composiet", prijs: 1000 },
        ],
      },
      {
        categorie: "Dakbedekking",
        items: [
          { naam: "EPDM (Standaard)", prijs: 0, inbegrepen: true },
          { naam: "Groen Sedum Dak", prijs: 2220 },
          { naam: "Bitumen Luxe", prijs: 850 },
          { naam: "Witte bitumenafwerking", prijs: 1200 },
        ],
      },
      {
        categorie: "Lichtstraat",
        items: [
          { naam: "Glasplaat 1.00 x 2.00 HR+++", prijs: 2500 },
          { naam: "Glasplaat 1.00 x 3.00 HR+++", prijs: 3800 },
          { naam: "Glasplaat 1.00 x 4.00 HR+++", prijs: 5100 },
          { naam: "Lichtstraat vakverdeling 1.00 x 2.00 HR++", prijs: 2100 },
          { naam: "Lichtstraat vakverdeling 1.00 x 3.00 HR++", prijs: 2900 },
          { naam: "Lichtstraat vakverdeling 1.00 x 4.00 HR++", prijs: 3700 },
        ],
      },
      {
        categorie: "Kozijnen & Deuren",
        items: [
          { naam: "Schuifpui 3.00 x 2.20", prijs: 3500 },
          { naam: "Schuifpui 4.00 x 2.20", prijs: 4200 },
          { naam: "Openslaande deuren 3.00 x 2.20", prijs: 3200 },
          { naam: "Openslaande deuren 4.00 x 2.20", prijs: 3800 },
          { naam: "Harmonicakozijn 3.00 x 2.20", prijs: 4800 },
          { naam: "Harmonicakozijn 4.00 x 2.20", prijs: 5600 },
          { naam: "Harmonicakozijn 5.00 x 2.20", prijs: 6500 },
          { naam: "Harmonicakozijn 6.00 x 2.20", prijs: 7400 },
          { naam: "Dubbele schuifpui 4.00 x 2.20", prijs: 5800 },
          { naam: "Dubbele schuifpui 5.00 x 2.20", prijs: 6600 },
        ],
      },
      {
        categorie: "Klimaatbeheersing",
        items: [
          { naam: "Standaard Mechanische ventilatie", prijs: 0, inbegrepen: true },
          { naam: "Airco Systeem (Single Split)", prijs: 2450 },
          { naam: "Multi-split Airco Systeem", prijs: 4800 },
        ],
      },
      {
        categorie: "Elektra & Installatie",
        items: [
          { naam: "LED Spotjes (Plafond/Overstek)", prijs: 450 },
          { naam: "Extra stopcontacten binnen (dubbel)", prijs: 150 },
          { naam: "Extra lamp-punten binnen", prijs: 150 },
          { naam: "Radiator (Aansluiting CV + paneel)", prijs: 850 },
          { naam: "Stopcontact buiten (waterdicht)", prijs: 225 },
          { naam: "Lamp-punten buiten", prijs: 250 },
          { naam: "Meterkast uitbreiding/aanpassing", prijs: 1250 },
        ],
      },
      {
        categorie: "Fundering & Bouw",
        items: [
          { naam: "Heipalen / Schroefpalen fundering", prijs: 4500 },
          { naam: "Standaard Doorbraak bestaande gevel", prijs: 5500, eenheid: "post" },
          { naam: "T-splitsing doorbraak bestaande gevel", prijs: 7000, eenheid: "post" },
          { naam: "Geen achterom/moeilijk bereikbaar", prijs: 2500, eenheid: "post" },
        ],
      },
      {
        categorie: "Binnenafwerking",
        items: [
          { naam: "Casco", prijs: 1750, eenheid: "post" },
          { naam: "Inclusief Stucwerk", prijs: 1850, eenheid: "post" },
          { naam: "Compleet ontzorgd (Stuc, schilder, vloer)", prijs: 2000, eenheid: "post" },
        ],
      },
      {
        categorie: "Extra Opties",
        items: [
          { naam: "Overstek met spotjes", prijs: 4200 },
          { naam: "Keukenleidingwerk", prijs: 4500, eenheid: "post" },
          { naam: "Extra stucwerk", prijs: 30, eenheid: "m²" },
          { naam: "Extra schilderwerk (richtprijs vanaf)", prijs: 20, eenheid: "m²" },
          { naam: "Vloerverwarming (richtprijs vanaf)", prijs: 85, eenheid: "m²" },
          { naam: "Extra vloerafwerking", prijs: 85, eenheid: "m²" },
          { naam: "Geïntegreerde rits-screens", prijs: 1500 },
          { naam: "Geïntegreerde rolluiken", prijs: 1500 },
          { naam: "Zonwering / Luifel", prijs: 3500 },
        ],
      },
    ],
  },
  {
    lijn: LIJN_POOLHOUSE,
    categorieen: [
      {
        categorie: "Buitenafwerking",
        items: [
          { naam: "Stucwerk (keuze uit diverse kleuren)", prijs: 1500 },
          { naam: "Hoogwaardig Hout (Duurzaam)", prijs: 2100 },
          { naam: "Keralit Kunststof", prijs: 2200 },
          { naam: "Exclusief Natuursteen", prijs: 3400 },
        ],
      },
      {
        categorie: "Dakbedekking",
        items: [
          { naam: "EPDM (Standaard)", prijs: 0, inbegrepen: true },
          { naam: "Bitumen dak", prijs: 850 },
          { naam: "Bitumen dak wit (verkoelend)", prijs: 1200 },
          { naam: "Groendak (Duurzaam sedum)", prijs: 2200 },
          { naam: "Platdak met overstek (Exclusief design)", prijs: 2450 },
        ],
      },
      {
        categorie: "Lichtstraat",
        items: [
          { naam: "Lichtstraat 1.00 x 2.00 m", prijs: 2100 },
          { naam: "Lichtstraat 1.00 x 3.00 m", prijs: 2900 },
          { naam: "Lichtstraat 1.00 x 4.00 m", prijs: 3700 },
          { naam: "Volledig Maatwerk Lichtstraat", prijs: 4500 },
        ],
      },
      {
        categorie: "Wandsystemen / Kozijnen",
        items: [
          { naam: "Schuifpui 3 meter (Aluminium)", prijs: 3500 },
          { naam: "Schuifpui 4 meter (Aluminium)", prijs: 4200 },
          { naam: "Schuifpui 5 meter (Aluminium)", prijs: 5800 },
          { naam: "Glazen schuifwand volledig glas", prijs: 6500 },
        ],
      },
      {
        categorie: "Zonwering & Veranda",
        items: [
          { naam: "Verticale rits-screens", prijs: 1500 },
          { naam: "Rolluiken", prijs: 1500 },
          { naam: "Luxe aluminium veranda", prijs: 4500 },
          { naam: "Sfeervolle houten veranda (overdekt)", prijs: 3800 },
        ],
      },
      {
        categorie: "Vloerafwerking",
        items: [
          { naam: "Casco vloer", prijs: 0, inbegrepen: true },
          { naam: "Design Tegels licht", prijs: 1200 },
          { naam: "Design Tegels donker (Antraciet)", prijs: 1200 },
          { naam: "Visgraat PVC (Luxe uitstraling)", prijs: 1850 },
          { naam: "Houtlook PVC", prijs: 1650 },
        ],
      },
      {
        categorie: "Binnenafwerking",
        items: [
          { naam: "Casco", prijs: 2500, eenheid: "post" },
          { naam: "Gestuct", prijs: 3000, eenheid: "post" },
          { naam: "Gestuct + geschilderd", prijs: 3250, eenheid: "post" },
          { naam: "Luxe afgewerkt (Compleet turn-key)", prijs: 3500, eenheid: "post" },
        ],
      },
      {
        categorie: "Installaties & Klimaat",
        items: [
          { naam: "Extra stopcontacten (dubbel)", prijs: 150 },
          { naam: "LED spots (dimbaar)", prijs: 450 },
          { naam: "Buitenverlichting (LED armaturen)", prijs: 250 },
          { naam: "Inverter Airco (stil verwarmen & koelen)", prijs: 2450 },
          { naam: "Milieuvriendelijke Warmtepomp", prijs: 4500 },
          { naam: "Comfortabele Vloerverwarming", prijs: 1950 },
        ],
      },
      {
        categorie: "Sanitair / Badkamer",
        items: [
          { naam: "Sfeervolle Compact badkamer", prijs: 8500, eenheid: "post" },
          { naam: "Luxe wellness badkamer", prijs: 12500, eenheid: "post" },
        ],
      },
      {
        categorie: "Keukens",
        items: [
          { naam: "Compacte Pantry (incl. koelkast & spoelbak)", prijs: 4500, eenheid: "post" },
          { naam: "Geïntegreerde Buitenkeuken", prijs: 3500, eenheid: "post" },
          { naam: "Luxe Keuken op maat met alle inbouwmerken", prijs: 14500, eenheid: "post" },
        ],
      },
      {
        categorie: "Extra Ruimtes",
        items: [
          { naam: "Geïntegreerde berging", prijs: 3500, eenheid: "post" },
          { naam: "Technische ruimte (voor filters/pompen)", prijs: 2200, eenheid: "post" },
          { naam: "Ingebouwde luxe Wellness Sauna", prijs: 6500, eenheid: "post" },
          { naam: "Volwaardige extra Slaapkamer", prijs: 4500, eenheid: "post" },
          { naam: "Separaat luxe Toilet (hangcloset + fontein)", prijs: 2500, eenheid: "post" },
        ],
      },
    ],
  },
  {
    lijn: LIJN_MANTELZORG,
    categorieen: [
      {
        categorie: "Basis Indeling",
        items: [
          { naam: "Studio (Open lichte indeling)", prijs: 0, eenheid: "post", inbegrepen: true },
          { naam: "1 Slaapkamer", prijs: 2500, eenheid: "post" },
          { naam: "2 Slaapkamers", prijs: 5000, eenheid: "post" },
        ],
      },
      {
        categorie: "Gevelafwerking",
        items: [
          { naam: "Verticale Houten Bekleding", prijs: 0, inbegrepen: true },
          { naam: "Klassiek Metselwerk", prijs: 600 },
          { naam: "Modern Stucwerk", prijs: 1500 },
          { naam: "Keralit Kunststof", prijs: 600 },
          { naam: "Duurzaam Composiet", prijs: 1000 },
        ],
      },
      {
        categorie: "Sanitair & Keuken",
        items: [
          { naam: "Basis Sanitair (Douche, toilet, wastafel)", prijs: 8500, eenheid: "post" },
          { naam: "Luxe Badkamer (Inloopdouche + design)", prijs: 12500, eenheid: "post" },
          { naam: "Compacte Keuken (Kookplaat, koelkast, oven)", prijs: 9500, eenheid: "post" },
          { naam: "Luxe Keuken compleet (Inbouw vaatwasser etc)", prijs: 14500, eenheid: "post" },
        ],
      },
      {
        categorie: "Isolatie & Energie",
        items: [
          { naam: "Standaard Plus (Bouwbesluit conform)", prijs: 0, inbegrepen: true },
          { naam: "Gasloos (Geavanceerde warmtepomp)", prijs: 4500 },
          { naam: "Duurzaam zonnepanelenpakket (8 panelen)", prijs: 3200, eenheid: "set" },
        ],
      },
      {
        categorie: "Klimaatbeheersing",
        items: [
          { naam: "Standaard Mechanische ventilatie", prijs: 0, inbegrepen: true },
          { naam: "Airco Systeem (Single Split)", prijs: 2450 },
          { naam: "Multi-split Airco Systeem", prijs: 4800 },
        ],
      },
      {
        categorie: "Elektra & Installatie",
        items: [
          { naam: "LED Spotjes", prijs: 450 },
          { naam: "Extra stopcontacten binnen (dubbel)", prijs: 150 },
          { naam: "Extra lamp-punten binnen", prijs: 150 },
          { naam: "Waterdicht stopcontact buiten", prijs: 225 },
          { naam: "Lamp-punten buiten", prijs: 250 },
          { naam: "Aanpassing/uitbreiding meterkast", prijs: 1250 },
        ],
      },
      {
        categorie: "Fundering",
        items: [
          { naam: "Schroef- of heipalen fundering", prijs: 4500 },
          { naam: "Duurzame poeren fundering", prijs: 2500 },
          { naam: "Geen achterom (kranen/zwaar transport)", prijs: 2500, eenheid: "post" },
        ],
      },
      {
        categorie: "Binnenafwerking",
        items: [
          { naam: "Casco (u verzorgt de binnenwanden zelf)", prijs: 1750, eenheid: "post" },
          { naam: "Casco+ (inclusief glad stucwerk)", prijs: 1950, eenheid: "post" },
          { naam: "Sleutelklaar / Turn-key (Stuc, schilder, vloer)", prijs: 2300, eenheid: "post" },
        ],
      },
      {
        categorie: "Extra comfort opties",
        items: [
          { naam: "Overstek met spotjes", prijs: 4200 },
          { naam: "Vloerverwarming (richtprijs vanaf)", prijs: 85, eenheid: "m²" },
          { naam: "Geïntegreerde rits-screens", prijs: 1500 },
          { naam: "Geïntegreerde rolluiken", prijs: 1500 },
          { naam: "Zonwering / Luifel groot", prijs: 3500 },
          { naam: "Extra glazen schuifwand (vanaf 5 meter)", prijs: 2000 },
          { naam: "Overdekte Houten Veranda", prijs: 800 },
          { naam: "Luxe Aluminium Veranda", prijs: 800 },
        ],
      },
    ],
  },
];

/** Productlijnen in vaste volgorde (voor groeperen/sorteren in de UI). */
export const PRODUCT_LIJNEN = PRODUCT_CATALOGUS.map((g) => g.lijn);

// Vaste volgorde van categorieën binnen een lijn, zoals in de prijslijst.
const CATEGORIE_VOLGORDE = new Map<string, number>();
for (const groep of PRODUCT_CATALOGUS) {
  groep.categorieen.forEach((c, i) => CATEGORIE_VOLGORDE.set(`${groep.lijn}|${c.categorie}`, i));
}

/** Sorteerindex van een categorie binnen een lijn (onbekend = achteraan, alfabetisch). */
export function categorieVolgorde(lijn: string | undefined, categorie: string): number {
  return CATEGORIE_VOLGORDE.get(`${lijn ?? ""}|${categorie}`) ?? 999;
}

/** Welke prijslijst hoort bij een projecttype (undefined = geen specifieke lijn). */
export function lijnVoorProjecttype(t: ProductType): string | undefined {
  switch (t) {
    case "prefab_aanbouw":
    case "prefab_uitbouw":
      return LIJN_UITBOUW;
    case "poolhouse":
      return LIJN_POOLHOUSE;
    case "mantelzorgwoning":
    case "vakantiewoning":
    case "chalet":
      return LIJN_MANTELZORG;
    default:
      return undefined;
  }
}

// Prijslijst-namen wijken af van de optienamen in optie-beschrijvingen.ts;
// deze aliassen koppelen ze aan de juiste klantbeschrijving.
const BESCHRIJVING_ALIAS: Record<string, string> = {
  // Gevel & dak
  "Hoogwaardig Hout (Duurzaam)": "Modern Hout (Verticaal)",
  "Verticale Houten Bekleding": "Modern Hout (Verticaal)",
  "Stucwerk (keuze uit diverse kleuren)": "Modern Stucwerk",
  "Duurzaam Composiet": "Composiet",
  "Exclusief Natuursteen": "Natuursteen",
  "EPDM (Standaard)": "EPDM",
  "Bitumen dak": "Bitumen Luxe",
  "Witte bitumenafwerking": "Witte Bitumen",
  "Bitumen dak wit (verkoelend)": "Witte Bitumen",
  "Groendak (Duurzaam sedum)": "Groen Sedum Dak",
  "Platdak met overstek (Exclusief design)": "Platdak met Overstek",
  // Lichtstraat
  "Glasplaat 1.00 x 2.00 HR+++": "Vlak Glas HR+++",
  "Glasplaat 1.00 x 3.00 HR+++": "Vlak Glas HR+++",
  "Glasplaat 1.00 x 4.00 HR+++": "Vlak Glas HR+++",
  "Lichtstraat vakverdeling 1.00 x 2.00 HR++": "Lichtstraat met Vakverdeling",
  "Lichtstraat vakverdeling 1.00 x 3.00 HR++": "Lichtstraat met Vakverdeling",
  "Lichtstraat vakverdeling 1.00 x 4.00 HR++": "Lichtstraat met Vakverdeling",
  "Volledig Maatwerk Lichtstraat": "Maatwerk Lichtstraat",
  // Kozijnen & puien
  "Schuifpui 3.00 x 2.20": "Schuifpui",
  "Schuifpui 4.00 x 2.20": "Schuifpui",
  "Schuifpui 3 meter (Aluminium)": "Schuifpui",
  "Schuifpui 4 meter (Aluminium)": "Schuifpui",
  "Schuifpui 5 meter (Aluminium)": "Schuifpui",
  "Openslaande deuren 3.00 x 2.20": "Openslaande Deuren",
  "Openslaande deuren 4.00 x 2.20": "Openslaande Deuren",
  "Harmonicakozijn 3.00 x 2.20": "Harmonicakozijn",
  "Harmonicakozijn 4.00 x 2.20": "Harmonicakozijn",
  "Harmonicakozijn 5.00 x 2.20": "Harmonicakozijn",
  "Harmonicakozijn 6.00 x 2.20": "Harmonicakozijn",
  "Dubbele schuifpui 4.00 x 2.20": "Dubbele Schuifpui",
  "Dubbele schuifpui 5.00 x 2.20": "Dubbele Schuifpui",
  "Glazen schuifwand volledig glas": "Glazen Schuifwand",
  "Extra glazen schuifwand (vanaf 5 meter)": "Glazen Schuifwand",
  // Klimaat
  "Standaard Mechanische ventilatie": "Standaard Natuurlijke Ventilatie",
  "Airco Systeem (Single Split)": "Airco Single Split",
  "Inverter Airco (stil verwarmen & koelen)": "Airco Single Split",
  "Multi-split Airco Systeem": "Multi-Split Airco",
  "Milieuvriendelijke Warmtepomp": "Warmtepomp",
  "Gasloos (Geavanceerde warmtepomp)": "Volledig Gasloos",
  "Duurzaam zonnepanelenpakket (8 panelen)": "Zonnepanelen Pakket",
  // Elektra
  "LED Spotjes (Plafond/Overstek)": "Spotjes",
  "LED Spotjes": "Spotjes",
  "LED spots (dimbaar)": "Spotjes",
  "Extra stopcontacten binnen (dubbel)": "Stopcontact Binnen",
  "Extra stopcontacten (dubbel)": "Stopcontact Binnen",
  "Extra lamp-punten binnen": "Lamppunt Binnen",
  "Stopcontact buiten (waterdicht)": "Stopcontact Buiten",
  "Waterdicht stopcontact buiten": "Stopcontact Buiten",
  "Lamp-punten buiten": "Lamppunt Buiten",
  "Buitenverlichting (LED armaturen)": "Lamppunt Buiten",
  "Meterkast uitbreiding/aanpassing": "Groepenkast Aanpassing",
  "Aanpassing/uitbreiding meterkast": "Groepenkast Aanpassing",
  "Radiator (Aansluiting CV + paneel)": "Radiator",
  "Vloerverwarming (richtprijs vanaf)": "Vloerverwarming",
  "Comfortabele Vloerverwarming": "Vloerverwarming",
  // Fundering & bouw
  "Heipalen / Schroefpalen fundering": "Heipalen / Schroefpalen",
  "Schroef- of heipalen fundering": "Heipalen / Schroefpalen",
  "Duurzame poeren fundering": "Schroefpoeren",
  "Standaard Doorbraak bestaande gevel": "Standaard Doorbraak",
  "T-splitsing doorbraak bestaande gevel": "T-Splitsing Doorbraak",
  "Geen achterom/moeilijk bereikbaar": "Geen Achterom",
  "Geen achterom (kranen/zwaar transport)": "Geen Achterom",
  // Binnenafwerking
  "Casco (u verzorgt de binnenwanden zelf)": "Casco",
  "Casco+ (inclusief glad stucwerk)": "Inclusief Stucwerk",
  "Compleet ontzorgd (Stuc, schilder, vloer)": "Compleet Ontzorgd",
  "Sleutelklaar / Turn-key (Stuc, schilder, vloer)": "Compleet Ontzorgd",
  "Gestuct + geschilderd": "Gestuct en Geschilderd",
  "Luxe afgewerkt (Compleet turn-key)": "Luxe Afgewerkt",
  // Extra opties & comfort
  "Overstek met spotjes": "Overstek met Sfeerspotjes",
  "Keukenleidingwerk": "Keukenleidingwerk Voorbereiden",
  "Extra stucwerk": "Extra Stucwerk",
  "Extra schilderwerk (richtprijs vanaf)": "Extra Schilderwerk",
  "Geïntegreerde rits-screens": "Ritsscreens",
  "Verticale rits-screens": "Ritsscreens",
  "Geïntegreerde rolluiken": "Rolluiken",
  "Zonwering / Luifel": "Zonwering / Luxe Luifel",
  "Zonwering / Luifel groot": "Zonwering / Luxe Luifel",
  "Sfeervolle houten veranda (overdekt)": "Houten Veranda",
  "Overdekte Houten Veranda": "Houten Veranda",
  "Luxe aluminium veranda": "Aluminium Veranda",
  "Luxe Aluminium Veranda": "Aluminium Veranda",
  // Indeling, sanitair & keuken
  "Studio (Open lichte indeling)": "Studio Indeling",
  "1 Slaapkamer": "1 Slaapkamer Indeling",
  "2 Slaapkamers": "2 Slaapkamers Indeling",
  "Basis Sanitair (Douche, toilet, wastafel)": "Basis Sanitair",
  "Luxe Badkamer (Inloopdouche + design)": "Luxe Badkamer",
  "Compacte Keuken (Kookplaat, koelkast, oven)": "Compacte Keuken",
  "Luxe Keuken compleet (Inbouw vaatwasser etc)": "Volwaardige Keuken",
  "Sfeervolle Compact badkamer": "Compacte Wellness Badkamer",
  "Luxe wellness badkamer": "Luxe Wellness Badkamer",
  "Compacte Pantry (incl. koelkast & spoelbak)": "Complete Pantry",
  "Geïntegreerde Buitenkeuken": "Luxe Buitenkeuken",
  "Luxe Keuken op maat met alle inbouwmerken": "Luxe Maatwerk Keuken",
  "Geïntegreerde berging": "Geïntegreerde Berging",
  "Technische ruimte (voor filters/pompen)": "Technische Ruimte",
  "Ingebouwde luxe Wellness Sauna": "Ingebouwde Wellness Sauna",
  "Volwaardige extra Slaapkamer": "Slaapkamer / Logeerkamer",
  "Separaat luxe Toilet (hangcloset + fontein)": "Separaat Toilet",
};

/** Beschrijving van een catalogus-item (zelfde bron als de offerte-verrijking). */
export function catalogusBeschrijving(naam: string): string | undefined {
  return OPTIE_BESCHRIJVINGEN[naam] ?? OPTIE_BESCHRIJVINGEN[BESCHRIJVING_ALIAS[naam] ?? ""];
}
