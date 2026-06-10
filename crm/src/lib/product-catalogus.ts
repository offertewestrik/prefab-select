// ============================================================================
// Configurator-catalogus: dezelfde producten/opties als in de online
// configurator, gegroepeerd per categorie. Wordt gebruikt om de eigen
// productcatalogus (tabel products) in één klik te vullen, zodat het team
// bij handmatige offertes dezelfde producten kan aanklikken.
// Beschrijvingen komen uit optie-beschrijvingen.ts (één bron).
// ============================================================================

import { OPTIE_BESCHRIJVINGEN } from "./optie-beschrijvingen";

export interface CatalogusItem {
  naam: string;
  eenheid?: string; // standaard "stuks"
}

export const PRODUCT_CATALOGUS: { categorie: string; items: CatalogusItem[] }[] = [
  {
    categorie: "Gevelafwerking",
    items: [
      { naam: "Modern Hout (Verticaal)" },
      { naam: "Klassiek Metselwerk" },
      { naam: "Modern Stucwerk" },
      { naam: "Keralit Kunststof" },
      { naam: "Composiet" },
      { naam: "Natuursteen" },
    ],
  },
  {
    categorie: "Dakbedekking",
    items: [
      { naam: "EPDM" },
      { naam: "Bitumen Luxe" },
      { naam: "Witte Bitumen" },
      { naam: "Groen Sedum Dak" },
      { naam: "Platdak met Overstek" },
    ],
  },
  {
    categorie: "Lichtstraat",
    items: [
      { naam: "Lichtstraat met Vakverdeling" },
      { naam: "Vlak Glas HR+++" },
      { naam: "Maatwerk Lichtstraat" },
    ],
  },
  {
    categorie: "Kozijnen & puien",
    items: [
      { naam: "Openslaande Deuren" },
      { naam: "Dubbele Schuifpui" },
      { naam: "Schuifpui" },
      { naam: "Harmonicakozijn" },
      { naam: "Glazen Schuifwand" },
    ],
  },
  {
    categorie: "Klimaatbeheersing",
    items: [
      { naam: "Standaard Natuurlijke Ventilatie" },
      { naam: "Airco Single Split" },
      { naam: "Multi-Split Airco" },
    ],
  },
  {
    categorie: "Elektra & installaties",
    items: [
      { naam: "Spotjes" },
      { naam: "Stopcontact Binnen" },
      { naam: "Lamppunt Binnen" },
      { naam: "Stopcontact Buiten" },
      { naam: "Lamppunt Buiten" },
      { naam: "Groepenkast Aanpassing" },
      { naam: "Warmtepomp" },
      { naam: "Vloerverwarming", eenheid: "m²" },
      { naam: "Radiator" },
    ],
  },
  {
    categorie: "Fundering & doorbraak",
    items: [
      { naam: "Heipalen / Schroefpalen" },
      { naam: "Schroefpoeren" },
      { naam: "T-Splitsing Doorbraak", eenheid: "post" },
      { naam: "Standaard Doorbraak", eenheid: "post" },
      { naam: "Wel een Achterom", eenheid: "post" },
      { naam: "Geen Achterom", eenheid: "post" },
    ],
  },
  {
    categorie: "Afwerking",
    items: [
      { naam: "Casco", eenheid: "post" },
      { naam: "Inclusief Stucwerk", eenheid: "post" },
      { naam: "Compleet Ontzorgd", eenheid: "post" },
      { naam: "Gestuct en Geschilderd", eenheid: "post" },
      { naam: "Gestuct", eenheid: "post" },
      { naam: "Luxe Afgewerkt", eenheid: "post" },
    ],
  },
  {
    categorie: "Extra comfort",
    items: [
      { naam: "Overstek met Sfeerspotjes" },
      { naam: "Keukenleidingwerk Voorbereiden", eenheid: "post" },
      { naam: "Extra Stucwerk", eenheid: "post" },
      { naam: "Extra Schilderwerk", eenheid: "post" },
      { naam: "Ritsscreens" },
      { naam: "Rolluiken" },
      { naam: "Zonwering / Luxe Luifel" },
      { naam: "Houten Veranda" },
      { naam: "Aluminium Veranda" },
    ],
  },
  {
    categorie: "Indeling & sanitair",
    items: [
      { naam: "Studio Indeling", eenheid: "post" },
      { naam: "1 Slaapkamer Indeling", eenheid: "post" },
      { naam: "2 Slaapkamers Indeling", eenheid: "post" },
      { naam: "Basis Sanitair", eenheid: "post" },
      { naam: "Luxe Badkamer", eenheid: "post" },
      { naam: "Compacte Keuken", eenheid: "post" },
      { naam: "Volwaardige Keuken", eenheid: "post" },
      { naam: "Volledig Gasloos", eenheid: "post" },
      { naam: "Zonnepanelen Pakket", eenheid: "set" },
    ],
  },
  {
    categorie: "Poolhouse",
    items: [
      { naam: "Compacte Wellness Badkamer", eenheid: "post" },
      { naam: "Luxe Wellness Badkamer", eenheid: "post" },
      { naam: "Luxe Buitenkeuken", eenheid: "post" },
      { naam: "Complete Pantry", eenheid: "post" },
      { naam: "Luxe Maatwerk Keuken", eenheid: "post" },
      { naam: "Technische Ruimte", eenheid: "post" },
      { naam: "Separaat Toilet", eenheid: "post" },
      { naam: "Geïntegreerde Berging", eenheid: "post" },
      { naam: "Slaapkamer / Logeerkamer", eenheid: "post" },
      { naam: "Ingebouwde Wellness Sauna", eenheid: "post" },
    ],
  },
  {
    categorie: "Terras",
    items: [
      { naam: "Composiet Terras", eenheid: "m²" },
      { naam: "Betontegel Terras", eenheid: "m²" },
      { naam: "Keramisch Terras", eenheid: "m²" },
      { naam: "Houten Vlonderterras", eenheid: "m²" },
    ],
  },
];

/** Beschrijving van een catalogus-item (zelfde bron als de offerte-verrijking). */
export function catalogusBeschrijving(naam: string): string | undefined {
  return OPTIE_BESCHRIJVINGEN[naam];
}
