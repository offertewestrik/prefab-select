// Canonieke offerte-templates (platform-standaard, companyId = null).
// Bron voor de seed (seed-quote-templates.ts) en herbruikbaar door een
// admin-"reset templates"-actie. Bedragen in CENTEN. Uren in `hours`.
//
// Richtprijzen zijn STARTPUNTEN — de vakman past alle prijzen zelf aan.

export type TemplateItemKind = "LABOUR" | "MATERIAL" | "OTHER";

export interface TemplateItemDef {
  kind: TemplateItemKind;
  description: string;
  qty?: number; // standaard 1
  unitPriceCents: number;
  hours?: number; // alleen relevant bij LABOUR
  optional?: boolean; // true = optionele meerwerkpost (telt niet mee in totaal)
}

export interface QuoteTemplateDef {
  slug: string; // uniek
  serviceSlug?: string; // koppelt aan Service.slug indien aanwezig
  title: string;
  description: string; // professionele omschrijving
  defaultVatRate?: number; // standaard 21
  priceFromCents?: number;
  priceToCents?: number;
  warrantyText: string;
  termsText: string;
  order?: number;
  items: TemplateItemDef[];
}

// Standaard garantie-/voorwaardenteksten die veel templates delen.
export const DEFAULT_TERMS =
  "Deze offerte is vrijblijvend en 30 dagen geldig. Genoemde prijzen zijn inclusief 21% btw, tenzij anders vermeld. Werkzaamheden worden uitgevoerd volgens de geldende normen (o.a. NEN, en waar van toepassing GAWALO/waterwerkbladen). Meerwerk dat tijdens de uitvoering nodig blijkt, wordt vooraf met u afgestemd. Betaling binnen 14 dagen na oplevering, tenzij anders overeengekomen.";

export const DEFAULT_WARRANTY =
  "Op ons arbeid geldt 2 jaar garantie. Op geleverde materialen en apparatuur geldt de fabrieksgarantie. Garantie vervalt bij ondeskundig gebruik of ingrepen door derden.";

export const QUOTE_TEMPLATES: QuoteTemplateDef[] = [
  {
    slug: "cv-ketel-onderhoud",
    serviceSlug: "cv-onderhoud",
    title: "CV-ketel onderhoud",
    description:
      "Periodiek onderhoud van uw cv-ketel voor een veilige, zuinige en betrouwbare werking. We controleren, reinigen en stellen de ketel af volgens de fabrieksvoorschriften en meten de verbrandingswaarden. U ontvangt een onderhoudsrapport.",
    priceFromCents: 9500,
    priceToCents: 16500,
    warrantyText: DEFAULT_WARRANTY,
    termsText: DEFAULT_TERMS,
    order: 1,
    items: [
      { kind: "LABOUR", description: "Onderhoudsbeurt cv-ketel (controle, reiniging brander en warmtewisselaar, afstellen)", qty: 1, unitPriceCents: 9000, hours: 1 },
      { kind: "LABOUR", description: "Rookgasmeting en controle CO/afvoer", qty: 1, unitPriceCents: 1500, hours: 0.25 },
      { kind: "MATERIAL", description: "Afdichtingen en kleinmateriaal", qty: 1, unitPriceCents: 1000 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 2500 },
      { kind: "MATERIAL", description: "Vervangen ontstekingspen/ionisatiepen", qty: 1, unitPriceCents: 3500, optional: true },
      { kind: "OTHER", description: "Onderhoudsabonnement (jaarlijks, met voorrang bij storing)", qty: 1, unitPriceCents: 11000, optional: true },
    ],
  },
  {
    slug: "airco-installeren",
    serviceSlug: "airco",
    title: "Airco installeren (split-unit)",
    description:
      "Professionele installatie van een split-airco voor koelen én verwarmen. Inclusief montage van binnen- en buitendeel, leidingwerk, vacumeren, vullen en inbedrijfstelling. Uitgevoerd door een F-gassen gecertificeerd monteur.",
    priceFromCents: 140000,
    priceToCents: 250000,
    warrantyText:
      "Op de installatie geldt 2 jaar garantie. Op de airco-unit geldt de fabrieksgarantie (doorgaans 3–5 jaar, mits jaarlijks onderhoud). Garantie vervalt bij ondeskundig gebruik of ingrepen door derden.",
    termsText: DEFAULT_TERMS,
    order: 1,
    items: [
      { kind: "MATERIAL", description: "Split-airco enkelvoudig (koelen/verwarmen, A+++), incl. binnen- en buitendeel", qty: 1, unitPriceCents: 95000 },
      { kind: "LABOUR", description: "Montage binnen- en buitendeel incl. beugels", qty: 1, unitPriceCents: 22000, hours: 3 },
      { kind: "LABOUR", description: "Leidingwerk, vacumeren, vullen en inbedrijfstelling (F-gassen)", qty: 1, unitPriceCents: 18000, hours: 2 },
      { kind: "MATERIAL", description: "Koelleiding, wandgoot, condensafvoer en montagemateriaal (tot 3 m)", qty: 1, unitPriceCents: 12000 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Extra koelleiding per meter (boven 3 m)", qty: 1, unitPriceCents: 3500, optional: true },
      { kind: "LABOUR", description: "Kernboring gevel", qty: 1, unitPriceCents: 6500, hours: 0.5, optional: true },
      { kind: "MATERIAL", description: "Condenspomp", qty: 1, unitPriceCents: 12000, optional: true },
    ],
  },
  {
    slug: "cv-ketel-reparatie", serviceSlug: "cv-reparatie", title: "CV-ketel reparatie",
    description: "Reparatie van uw cv-ketel door een ervaren cv-monteur. We stellen eerst de oorzaak vast en herstellen het defect vakkundig, zodat uw ketel weer betrouwbaar warmte en warm water levert. Inclusief controle van de werking na afloop.",
    priceFromCents: 12500, priceToCents: 45000,
    warrantyText: "Op de uitgevoerde reparatie en vervangen onderdelen geldt 3 maanden garantie. Op nieuwe fabrieksonderdelen geldt de geldende fabrieksgarantie.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Diagnose en storingsanalyse cv-ketel", qty: 1, unitPriceCents: 6500, hours: 0.75 },
      { kind: "LABOUR", description: "Reparatie en herstel defect onderdeel", qty: 1, unitPriceCents: 9500, hours: 1 },
      { kind: "MATERIAL", description: "Klein installatiemateriaal en afdichtingen", qty: 1, unitPriceCents: 2500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Vervanging pomp of driewegklep", qty: 1, unitPriceCents: 14500, optional: true },
      { kind: "MATERIAL", description: "Vervanging expansievat (8 liter)", qty: 1, unitPriceCents: 6500, optional: true },
      { kind: "LABOUR", description: "Bijvullen en ontluchten cv-installatie", qty: 1, unitPriceCents: 4500, hours: 0.5, optional: true }
    ]
  },
  {
    slug: "cv-ketel-storing", serviceSlug: "cv-storing", title: "CV-ketel storing verhelpen",
    description: "Snelle storingsdienst voor uw cv-ketel bij uitval van verwarming of warm water. Een gecertificeerd monteur leest de foutcode uit, verhelpt de storing en controleert de veilige werking van de ketel. Zo heeft u weer snel warmte in huis.",
    priceFromCents: 9500, priceToCents: 35000,
    warrantyText: "Op het verhelpen van de storing en vervangen onderdelen geldt 3 maanden garantie.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Uitlezen foutcode en storingsdiagnose", qty: 1, unitPriceCents: 6500, hours: 0.75 },
      { kind: "LABOUR", description: "Verhelpen storing en herstellen werking", qty: 1, unitPriceCents: 8500, hours: 1 },
      { kind: "MATERIAL", description: "Klein materiaal (afdichtingen, ontstekingsonderdelen)", qty: 1, unitPriceCents: 2500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "LABOUR", description: "Bijvullen en ontluchten installatie", qty: 1, unitPriceCents: 4500, hours: 0.5, optional: true },
      { kind: "MATERIAL", description: "Vervanging ontstekingselektrode of ionisatiepen", qty: 1, unitPriceCents: 5500, optional: true },
      { kind: "LABOUR", description: "Doorspoelen verstopte condensafvoer", qty: 1, unitPriceCents: 4500, hours: 0.5, optional: true }
    ]
  },
  {
    slug: "cv-ketel-vervangen", serviceSlug: "cv-ketel-vervangen", title: "CV-ketel vervangen",
    description: "Complete vervanging van uw oude cv-ketel door een nieuwe, zuinige HR-combiketel. Inclusief demontage en afvoer van de oude ketel, montage, aansluiten op gas, water en cv, en volledige inbedrijfstelling. Uitgevoerd door een erkend cv-installateur.",
    priceFromCents: 190000, priceToCents: 320000,
    warrantyText: "Op de installatie geldt 2 jaar garantie. Op de nieuwe cv-ketel geldt de fabrieksgarantie (tot 10 jaar, mits jaarlijks onderhoud).",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "HR-combiketel (CW4, energiezuinig)", qty: 1, unitPriceCents: 145000 },
      { kind: "LABOUR", description: "Demontage en afvoer oude cv-ketel", qty: 1, unitPriceCents: 12500, hours: 1.5 },
      { kind: "LABOUR", description: "Montage en aansluiten nieuwe ketel (gas, water, cv)", qty: 1, unitPriceCents: 28000, hours: 4 },
      { kind: "LABOUR", description: "Inbedrijfstelling, vullen en instellen", qty: 1, unitPriceCents: 9500, hours: 1 },
      { kind: "MATERIAL", description: "Aansluitmateriaal, kranen en ophangbeugel", qty: 1, unitPriceCents: 9500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Nieuwe kunststof rookgasafvoer (concentrisch)", qty: 1, unitPriceCents: 18500, optional: true },
      { kind: "MATERIAL", description: "Slimme klokthermostaat", qty: 1, unitPriceCents: 14500, optional: true },
      { kind: "LABOUR", description: "Aanpassen leidingwerk bij ander keteltype", qty: 1, unitPriceCents: 9500, hours: 1.5, optional: true }
    ]
  },
  {
    slug: "boiler-vervangen", serviceSlug: "boiler", title: "Boiler vervangen",
    description: "Vervanging van uw bestaande boiler voor betrouwbaar warm water. We verwijderen de oude boiler, plaatsen en sluiten de nieuwe aan op water en elektra en controleren de installatie op lekkages. Uitgevoerd door een ervaren installateur.",
    priceFromCents: 65000, priceToCents: 140000,
    warrantyText: "Op de installatie geldt 2 jaar garantie. Op de boiler geldt de fabrieksgarantie (2–5 jaar).",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Elektrische boiler 80 liter", qty: 1, unitPriceCents: 42000 },
      { kind: "LABOUR", description: "Demontage en afvoer oude boiler", qty: 1, unitPriceCents: 8500, hours: 1 },
      { kind: "LABOUR", description: "Plaatsen en aansluiten nieuwe boiler", qty: 1, unitPriceCents: 15000, hours: 2 },
      { kind: "MATERIAL", description: "Aansluitmateriaal, inlaatcombinatie en beugels", qty: 1, unitPriceCents: 6500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Meerprijs boiler 120 liter", qty: 1, unitPriceCents: 12000, optional: true },
      { kind: "LABOUR", description: "Aanleg nieuwe wandcontactdoos door monteur", qty: 1, unitPriceCents: 7500, hours: 1, optional: true }
    ]
  },
  {
    slug: "geiser-vervangen", serviceSlug: "geiser", title: "Geiser vervangen",
    description: "Veilige vervanging van uw oude geiser door een moderne, zuinige uitvoering. Inclusief demontage van de oude geiser, montage en aansluiten op gas en water, en controle op een veilige rookgasafvoer. Uitgevoerd door een gaskeur-gecertificeerd monteur.",
    priceFromCents: 45000, priceToCents: 110000,
    warrantyText: "Op de installatie geldt 2 jaar garantie. Op de geiser geldt de fabrieksgarantie (2 jaar).",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Gasgeiser (voorzien van rookgasafvoer)", qty: 1, unitPriceCents: 32000 },
      { kind: "LABOUR", description: "Demontage en afvoer oude geiser", qty: 1, unitPriceCents: 8500, hours: 1 },
      { kind: "LABOUR", description: "Montage en aansluiten op gas en water", qty: 1, unitPriceCents: 15000, hours: 2 },
      { kind: "LABOUR", description: "Controle rookgasafvoer en veilige inbedrijfstelling", qty: 1, unitPriceCents: 6500, hours: 0.75 },
      { kind: "MATERIAL", description: "Aansluitmateriaal, gaskraan en beugels", qty: 1, unitPriceCents: 5500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Vernieuwen aluminium rookgasafvoerpijp", qty: 1, unitPriceCents: 8500, optional: true }
    ]
  },
  {
    slug: "radiator-plaatsen", serviceSlug: "radiator-plaatsen", title: "Radiator plaatsen",
    description: "Plaatsing van een nieuwe radiator, bijvoorbeeld voor een extra ruimte of uitbreiding van uw cv-installatie. Inclusief ophangen van de radiator, aftakken op het leidingwerk, aansluiten en ontluchten. Uitgevoerd door een ervaren cv-monteur.",
    priceFromCents: 22500, priceToCents: 55000,
    warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Paneelradiator (type 22, ca. 600x1000 mm)", qty: 1, unitPriceCents: 12500 },
      { kind: "LABOUR", description: "Ophangen radiator en aftakken op leidingwerk", qty: 1, unitPriceCents: 15000, hours: 2 },
      { kind: "LABOUR", description: "Aansluiten, vullen en ontluchten", qty: 1, unitPriceCents: 6500, hours: 0.75 },
      { kind: "MATERIAL", description: "Radiatorkraan, koppelingen en ophangbeugels", qty: 1, unitPriceCents: 5500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Thermostatische radiatorkraan", qty: 1, unitPriceCents: 3500, optional: true },
      { kind: "LABOUR", description: "Aanleg extra cv-leiding (per meter)", qty: 1, unitPriceCents: 4500, hours: 0.5, optional: true }
    ]
  },
  {
    slug: "radiator-vervangen", serviceSlug: "radiator-vervangen", title: "Radiator vervangen",
    description: "Vervanging van een bestaande radiator door een nieuw exemplaar. We tappen de installatie plaatselijk af, demonteren de oude radiator en plaatsen en sluiten de nieuwe aan, inclusief ontluchten en bijvullen. Uitgevoerd door een ervaren cv-monteur.",
    priceFromCents: 19500, priceToCents: 48000,
    warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Paneelradiator (type 22, ca. 600x1000 mm)", qty: 1, unitPriceCents: 12500 },
      { kind: "LABOUR", description: "Aftappen en demontage oude radiator", qty: 1, unitPriceCents: 8500, hours: 1 },
      { kind: "LABOUR", description: "Plaatsen en aansluiten nieuwe radiator", qty: 1, unitPriceCents: 9500, hours: 1.25 },
      { kind: "LABOUR", description: "Vullen, ontluchten en controle op lekkage", qty: 1, unitPriceCents: 4500, hours: 0.5 },
      { kind: "MATERIAL", description: "Koppelingen, afdichtingen en ophangbeugels", qty: 1, unitPriceCents: 4500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Nieuwe thermostatische radiatorkraan", qty: 1, unitPriceCents: 3500, optional: true },
      { kind: "MATERIAL", description: "Meerprijs designradiator", qty: 1, unitPriceCents: 15000, optional: true }
    ]
  },
  {
    slug: "airco-onderhoud", serviceSlug: "airco-onderhoud", title: "Airco onderhoud",
    description: "Jaarlijks onderhoud van uw split-airco voor een gezonde werking en optimaal rendement. Inclusief reinigen van filters en binnendeel, controle van het koelmiddel en de afvoer en een werkingscontrole. Uitgevoerd door een F-gassen gecertificeerd monteur.",
    priceFromCents: 8500, priceToCents: 18500,
    warrantyText: "Op de uitgevoerde onderhoudswerkzaamheden geldt 3 maanden garantie. Regelmatig onderhoud is voorwaarde voor behoud van de fabrieksgarantie op de unit.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Reinigen filters, binnendeel en warmtewisselaar", qty: 1, unitPriceCents: 6500, hours: 0.75 },
      { kind: "LABOUR", description: "Controle koelmiddel, druk en werking (F-gassen)", qty: 1, unitPriceCents: 5500, hours: 0.5 },
      { kind: "MATERIAL", description: "Reinigingsmiddelen en verbruiksmateriaal", qty: 1, unitPriceCents: 2000 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "LABOUR", description: "Reinigen en doorspoelen condensafvoer", qty: 1, unitPriceCents: 3500, hours: 0.5, optional: true },
      { kind: "MATERIAL", description: "Antibacteriële desinfectiebehandeling binnendeel", qty: 1, unitPriceCents: 3500, optional: true },
      { kind: "MATERIAL", description: "Bijvullen koudemiddel (per 100 gram)", qty: 1, unitPriceCents: 4500, optional: true }
    ]
  },
  {
    slug: "airco-reparatie", serviceSlug: "airco-reparatie", title: "Airco reparatie",
    description: "Storingsonderzoek en reparatie van uw split- of multi-airco door een F-gassen gecertificeerd monteur. Wij lokaliseren de oorzaak van koelverlies, lekkages of foutcodes en herstellen de installatie vakkundig. Inclusief functiecontrole en advies over preventief onderhoud.",
    priceFromCents: 12000, priceToCents: 45000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Storingsdiagnose en foutcode-analyse", qty: 1, unitPriceCents: 7500, hours: 1 },
      { kind: "LABOUR", description: "Reparatie en functiecontrole installatie", qty: 1, unitPriceCents: 9000, hours: 1.5 },
      { kind: "MATERIAL", description: "Kleinmateriaal en afdichtingen", qty: 1, unitPriceCents: 2500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Bijvullen koudemiddel R32 (per kg)", qty: 1, unitPriceCents: 6500, optional: true },
      { kind: "LABOUR", description: "Lekdetectie met stikstof/UV", qty: 1, unitPriceCents: 8500, hours: 1, optional: true },
      { kind: "MATERIAL", description: "Vervangende ventilatormotor buitendeel", qty: 1, unitPriceCents: 14000, optional: true }
    ]
  },
  {
    slug: "vloerverwarming-leggen", serviceSlug: "vloerverwarming-leggen", title: "Vloerverwarming leggen",
    description: "Aanleg van watervoerende vloerverwarming in een nieuwe dekvloer, ideaal bij nieuwbouw of een verbouwing. Wij verzorgen de noppenplaten of klittenband, het leidingwerk en een correct afgestelde verdeler met afsluiters. Inclusief drukproef en inbedrijfstelling voor een comfortabel en energiezuinig warmteafgiftesysteem.",
    priceFromCents: 180000, priceToCents: 420000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Vloerverwarmingsbuis 16 mm PE-RT (per m²)", qty: 60, unitPriceCents: 900 },
      { kind: "MATERIAL", description: "Noppenplaat isolatie Rc 1,3 (per m²)", qty: 60, unitPriceCents: 1200 },
      { kind: "MATERIAL", description: "Verdeler RVS incl. afsluiters (6 groepen)", qty: 1, unitPriceCents: 32000 },
      { kind: "LABOUR", description: "Leggen buizen en aansluiten verdeler", qty: 60, unitPriceCents: 1400, hours: 10 },
      { kind: "LABOUR", description: "Drukproef en inbedrijfstelling", qty: 1, unitPriceCents: 12000, hours: 1.5 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "MATERIAL", description: "Wandthermostaat per groep", qty: 1, unitPriceCents: 8500, optional: true },
      { kind: "LABOUR", description: "Aansluiten op bestaande cv-ketel/warmtepomp", qty: 1, unitPriceCents: 18000, hours: 2.5, optional: true }
    ]
  },
  {
    slug: "vloerverwarming-infrezen", serviceSlug: "vloerverwarming-infrezen", title: "Vloerverwarming infrezen",
    description: "Infrezen van vloerverwarming in een bestaande dekvloer, zonder de vloer volledig te hoeven vervangen. Wij frezen sluven op de juiste hart-op-hart afstand, leggen de buizen in en sluiten aan op een verdeler. Inclusief afdichten van de sleuven, drukproef en inbedrijfstelling.",
    priceFromCents: 160000, priceToCents: 350000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Infrezen sleuven bestaande dekvloer (per m²)", qty: 50, unitPriceCents: 2200, hours: 8 },
      { kind: "MATERIAL", description: "Vloerverwarmingsbuis 16 mm PE-RT (per m²)", qty: 50, unitPriceCents: 900 },
      { kind: "MATERIAL", description: "Verdeler RVS incl. afsluiters (5 groepen)", qty: 1, unitPriceCents: 28000 },
      { kind: "LABOUR", description: "Buizen inleggen, afdichten en drukproef", qty: 1, unitPriceCents: 24000, hours: 4 },
      { kind: "MATERIAL", description: "Afdichtmortel en kleinmateriaal", qty: 1, unitPriceCents: 6500 },
      { kind: "OTHER", description: "Voorrijkosten en afvoer freesstof", qty: 1, unitPriceCents: 5500 },
      { kind: "LABOUR", description: "Aansluiten op cv-ketel of warmtepomp", qty: 1, unitPriceCents: 16000, hours: 2, optional: true },
      { kind: "MATERIAL", description: "Slimme thermostaat (Wi-Fi)", qty: 1, unitPriceCents: 14000, optional: true }
    ]
  },
  {
    slug: "laadpaal-installeren", serviceSlug: "laadpalen", title: "Laadpaal installeren",
    description: "Complete installatie van een laadpaal of wallbox voor uw elektrische auto, uitgevoerd conform NEN 1010. Inclusief een aparte groep met aardlekbeveiliging type A met DC-lekdetectie (of type B waar vereist) in de meterkast. Wij verzorgen de bekabeling, montage en inbedrijfstelling met een laadtest.",
    priceFromCents: 90000, priceToCents: 175000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Laadpaal 11 kW met lastbalancering", qty: 1, unitPriceCents: 62000 },
      { kind: "LABOUR", description: "Montage laadpaal en bekabeling (tot 10 m)", qty: 1, unitPriceCents: 18000, hours: 3 },
      { kind: "MATERIAL", description: "Aparte groep + aardlekautomaat type A (DC-detectie), NEN 1010", qty: 1, unitPriceCents: 12000 },
      { kind: "MATERIAL", description: "Voedingskabel en installatiemateriaal", qty: 1, unitPriceCents: 8500 },
      { kind: "LABOUR", description: "Aansluiting meterkast, inbedrijfstelling en laadtest", qty: 1, unitPriceCents: 9500, hours: 1.5 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 3500 },
      { kind: "LABOUR", description: "Meerlengte kabel + wegwerken in wand (per m)", qty: 1, unitPriceCents: 2500, hours: 0.5, optional: true },
      { kind: "MATERIAL", description: "Aardlekbeveiliging type B (i.p.v. type A)", qty: 1, unitPriceCents: 22000, optional: true }
    ]
  },
  {
    slug: "meterkast-vervangen", serviceSlug: "meterkast", title: "Meterkast vervangen of uitbreiden",
    description: "Vervangen of uitbreiden van uw verouderde meterkast conform NEN 1010, voor een veilige en toekomstbestendige elektrische installatie. Wij plaatsen een nieuwe groepenkast met voldoende groepen, aardlekschakelaars type A en overspanningsbeveiliging. Inclusief het overzetten van bestaande groepen, controle van de aarding en een opleveringsrapport.",
    priceFromCents: 75000, priceToCents: 180000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Groepenkast 3-fase, 8 groepen incl. 2x aardlek type A (NEN 1010)", qty: 1, unitPriceCents: 32000 },
      { kind: "LABOUR", description: "Demontage oude kast en montage nieuwe groepenkast", qty: 1, unitPriceCents: 22000, hours: 4 },
      { kind: "LABOUR", description: "Overzetten en aansluiten bestaande groepen", qty: 1, unitPriceCents: 16000, hours: 2.5 },
      { kind: "MATERIAL", description: "Bedrading, rails en installatiemateriaal", qty: 1, unitPriceCents: 9500 },
      { kind: "LABOUR", description: "Controle aarding, meting en opleveringsrapport", qty: 1, unitPriceCents: 8500, hours: 1.5 },
      { kind: "OTHER", description: "Voorrijkosten en afvoer oude materialen", qty: 1, unitPriceCents: 4500 },
      { kind: "MATERIAL", description: "Overspanningsbeveiliging (type 2)", qty: 1, unitPriceCents: 11000, optional: true },
      { kind: "LABOUR", description: "Aanleg nieuwe aardpen/aardleiding", qty: 1, unitPriceCents: 14000, hours: 2, optional: true }
    ]
  },
  {
    slug: "thuisbatterij-installeren", serviceSlug: "thuisbatterij", title: "Thuisbatterij installeren",
    description: "Installatie van een thuisbatterij om uw zelf opgewekte zonne-energie op te slaan en optimaal te benutten. Wij monteren de batterij en hybride omvormer, sluiten deze conform NEN 1010 aan op een eigen beveiligde groep en configureren de energiemanagement-app. Inclusief aardlekbeveiliging type A/B waar vereist en volledige inbedrijfstelling.",
    priceFromCents: 350000, priceToCents: 750000, warrantyText: "Fabrieksgarantie op de batterij (doorgaans 10 jaar) conform opgave fabrikant; 2 jaar garantie op installatiewerk.", termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Thuisbatterij 10 kWh met hybride omvormer", qty: 1, unitPriceCents: 420000 },
      { kind: "LABOUR", description: "Montage batterij en omvormer", qty: 1, unitPriceCents: 32000, hours: 5 },
      { kind: "MATERIAL", description: "Eigen groep + aardlekbeveiliging type A/B (NEN 1010)", qty: 1, unitPriceCents: 16000 },
      { kind: "MATERIAL", description: "Bekabeling, zekeringen en montagemateriaal", qty: 1, unitPriceCents: 12000 },
      { kind: "LABOUR", description: "Aansluiting, configuratie EMS-app en inbedrijfstelling", qty: 1, unitPriceCents: 18000, hours: 3 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 4500 },
      { kind: "MATERIAL", description: "Uitbreidingsmodule +5 kWh", qty: 1, unitPriceCents: 180000, optional: true },
      { kind: "MATERIAL", description: "Slimme energiemeter (P1-aansluiting)", qty: 1, unitPriceCents: 12500, optional: true }
    ]
  },
  {
    slug: "dakisolatie", serviceSlug: "dakisolatie", title: "Dakisolatie",
    description: "Isoleren van uw hellende dak aan de binnenzijde voor een warmer huis en een lagere energierekening. Wij brengen isolatieplaten aan tot een Rc-waarde van circa 4,5 m²K/W, inclusief dampremmende folie en afwerking met gipsplaat. Inclusief het luchtdicht afwerken van naden en aansluitingen voor optimaal rendement.",
    priceFromCents: 240000, priceToCents: 520000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Isolatieplaat hellend dak, Rc ± 4,5 m²K/W (per m²)", qty: 60, unitPriceCents: 3200 },
      { kind: "MATERIAL", description: "Dampremmende folie en tape (per m²)", qty: 60, unitPriceCents: 450 },
      { kind: "LABOUR", description: "Aanbrengen isolatie en luchtdicht afwerken (per m²)", qty: 60, unitPriceCents: 2800, hours: 16 },
      { kind: "MATERIAL", description: "Regelwerk en bevestigingsmateriaal", qty: 1, unitPriceCents: 9500 },
      { kind: "OTHER", description: "Voorrijkosten en afvoer restmateriaal", qty: 1, unitPriceCents: 6500 },
      { kind: "MATERIAL", description: "Afwerking met gipsplaat (per m²)", qty: 60, unitPriceCents: 1800, optional: true },
      { kind: "LABOUR", description: "Aftimmeren en sausklaar opleveren (per m²)", qty: 60, unitPriceCents: 1500, hours: 8, optional: true }
    ]
  },
  {
    slug: "platdak-isolatie-pir", title: "Platdak isolatie (PIR)",
    description: "Isoleren van uw platte dak met hoogwaardige PIR-isolatieplaten voor een uitstekende isolatiewaarde bij een beperkte opbouwhoogte. Wij realiseren een Rc-waarde van circa 6,0 m²K/W en werken af met een nieuwe EPDM- of bitumen dakbedekking. Inclusief dampremmende laag, randafwerking en waterdichte aansluitingen.",
    priceFromCents: 300000, priceToCents: 650000, warrantyText: "10 jaar garantie op de waterdichtheid van de dakbedekking; 2 jaar op het uitgevoerde werk.", termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "PIR-isolatieplaat 120 mm, Rc ± 6,0 m²K/W (per m²)", qty: 55, unitPriceCents: 3400 },
      { kind: "MATERIAL", description: "Dampremmende laag (per m²)", qty: 55, unitPriceCents: 700 },
      { kind: "MATERIAL", description: "EPDM dakbedekking incl. lijm (per m²)", qty: 55, unitPriceCents: 3000 },
      { kind: "LABOUR", description: "Aanbrengen isolatie en dakbedekking (per m²)", qty: 55, unitPriceCents: 3200, hours: 14 },
      { kind: "LABOUR", description: "Randafwerking en waterdichte aansluitingen", qty: 1, unitPriceCents: 14000, hours: 2.5 },
      { kind: "OTHER", description: "Voorrijkosten en afvoer oude dakbedekking", qty: 1, unitPriceCents: 8500 },
      { kind: "MATERIAL", description: "Nieuwe dakrand/trim aluminium (per m)", qty: 1, unitPriceCents: 2800, optional: true },
      { kind: "MATERIAL", description: "Vervangen dakbeschot bij houtrot (per m²)", qty: 1, unitPriceCents: 4500, optional: true }
    ]
  },
  {
    slug: "badkamer-renovatie", serviceSlug: "badkamer-renovatie", title: "Badkamer renovatie",
    description: "Complete renovatie van uw badkamer van sloop tot oplevering, inclusief nieuw leiding- en afvoerwerk, waterdichte afwerking en tegelwerk. Wij verzorgen de plaatsing van sanitair, kranen en ventilatie volgens de geldende voorschriften. Alle waterleidingen worden aangelegd conform de waterwerkbladen met de vereiste keerklep en drinkwaterbeveiliging.",
    priceFromCents: 800000, priceToCents: 1800000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Sloop bestaande badkamer inclusief afvoeren puin", qty: 1, unitPriceCents: 95000, hours: 12 },
      { kind: "LABOUR", description: "Aanleg nieuw water- en afvoerleidingwerk (conform waterwerkbladen, incl. keerklep)", qty: 1, unitPriceCents: 145000, hours: 16 },
      { kind: "LABOUR", description: "Tegelwerk wand en vloer inclusief waterdichte kimafdichting", qty: 25, unitPriceCents: 6500, hours: 40 },
      { kind: "LABOUR", description: "Plaatsen en aansluiten sanitair (douche, wastafel, toilet, kranen)", qty: 1, unitPriceCents: 120000, hours: 14 },
      { kind: "MATERIAL", description: "Sanitairpakket (inloopdouche, wastafelmeubel, hangtoilet met inbouwreservoir)", qty: 1, unitPriceCents: 285000 },
      { kind: "MATERIAL", description: "Wand- en vloertegels inclusief lijm, voegmateriaal en tegelprofielen", qty: 25, unitPriceCents: 5500 },
      { kind: "OTHER", description: "Voorrijkosten en projectcoördinatie", qty: 1, unitPriceCents: 15000 },
      { kind: "MATERIAL", description: "Elektrische vloerverwarming onder tegelwerk", qty: 1, unitPriceCents: 95000, optional: true },
      { kind: "LABOUR", description: "Plaatsen mechanische ventilatie-unit met vochtsensor", qty: 1, unitPriceCents: 45000, hours: 4, optional: true }
    ]
  },
  {
    slug: "toilet-renovatie", serviceSlug: "toilet-renovatie", title: "Toilet renovatie",
    description: "Volledige vernieuwing van uw toiletruimte inclusief het verwijderen van het oude toilet en tegelwerk. Wij plaatsen een nieuw hangtoilet met inbouwreservoir, verzorgen het tegelwerk en sluiten alles waterdicht en vakkundig aan. De wateraansluiting wordt uitgevoerd conform de waterwerkbladen met de vereiste beveiliging tegen terugstroming.",
    priceFromCents: 175000, priceToCents: 420000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Verwijderen oud toilet, tegelwerk en afvoeren materiaal", qty: 1, unitPriceCents: 35000, hours: 5 },
      { kind: "LABOUR", description: "Aanpassen water- en afvoeraansluiting (incl. keerklep conform waterwerkbladen)", qty: 1, unitPriceCents: 45000, hours: 5 },
      { kind: "LABOUR", description: "Tegelwerk wand en vloer toiletruimte", qty: 8, unitPriceCents: 6500, hours: 12 },
      { kind: "LABOUR", description: "Monteren inbouwreservoir en plaatsen hangtoilet", qty: 1, unitPriceCents: 42000, hours: 5 },
      { kind: "MATERIAL", description: "Hangtoilet met inbouwreservoir, bedieningsplaat en zitting", qty: 1, unitPriceCents: 55000 },
      { kind: "MATERIAL", description: "Wand- en vloertegels inclusief lijm en voegmateriaal", qty: 8, unitPriceCents: 5000 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 5000 },
      { kind: "MATERIAL", description: "Fonteintje met kraan en sifon", qty: 1, unitPriceCents: 18000, optional: true }
    ]
  },
  {
    slug: "gasleiding-aanleggen", serviceSlug: "gasleiding", title: "Gasleiding aanleggen of aanpassen",
    description: "Aanleg of aanpassing van gasleidingen door een erkend installateur, bijvoorbeeld voor een kooktoestel, cv-ketel of gashaard. Alle werkzaamheden worden uitgevoerd volgens de geldende NEN-normen en afgesloten met een verplichte gasdichtheidsbeproeving. U ontvangt een beproevingsrapport zodat de veiligheid van de installatie is aangetoond.",
    priceFromCents: 25000, priceToCents: 95000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Aanleg gasleiding inclusief bevestiging en doorvoeren", qty: 1, unitPriceCents: 42000, hours: 5 },
      { kind: "LABOUR", description: "Aansluiten gastoestel en afmontage gaskraan", qty: 1, unitPriceCents: 12000, hours: 1.5 },
      { kind: "LABOUR", description: "Gasdichtheidsbeproeving en afgifte beproevingsrapport (NEN)", qty: 1, unitPriceCents: 8500, hours: 1 },
      { kind: "MATERIAL", description: "Gasleiding, fittingen en gekeurde gaskraan", qty: 1, unitPriceCents: 9500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 5000 },
      { kind: "LABOUR", description: "Verwijderen en afdoppen bestaande gasleiding", qty: 1, unitPriceCents: 9500, hours: 1.5, optional: true },
      { kind: "MATERIAL", description: "Gasslang en gekeurde koppeling voor kooktoestel", qty: 1, unitPriceCents: 4500, optional: true }
    ]
  },
  {
    slug: "waterleiding-aanleggen", serviceSlug: "waterleiding", title: "Waterleiding aanleggen of repareren",
    description: "Aanleg, uitbreiding of reparatie van waterleidingen voor een betrouwbare en veilige drinkwatervoorziening. Wij werken volgens de waterwerkbladen en passen waar nodig een keerklep of drinkwaterbeveiliging toe om terugstroming te voorkomen. Na afronding testen wij de installatie op dichtheid en juiste werking.",
    priceFromCents: 15000, priceToCents: 75000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Aanleg of vervangen waterleiding inclusief bevestiging", qty: 1, unitPriceCents: 32000, hours: 4 },
      { kind: "LABOUR", description: "Plaatsen keerklep en drinkwaterbeveiliging conform waterwerkbladen", qty: 1, unitPriceCents: 9500, hours: 1 },
      { kind: "LABOUR", description: "Afpersen en controleren op lekdichtheid", qty: 1, unitPriceCents: 6500, hours: 0.75 },
      { kind: "MATERIAL", description: "Leidingmateriaal, koppelingen en fittingen", qty: 1, unitPriceCents: 8500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 5000 },
      { kind: "MATERIAL", description: "Hoofdkraan met beluchter vervangen", qty: 1, unitPriceCents: 6500, optional: true },
      { kind: "LABOUR", description: "Aanbrengen leidingisolatie tegen bevriezing", qty: 1, unitPriceCents: 7500, hours: 1, optional: true }
    ]
  },
  {
    slug: "lekkage-verhelpen", serviceSlug: "lekkage", title: "Lekkage verhelpen",
    description: "Snelle opsporing en reparatie van waterlekkages aan leidingen, kranen of aansluitingen. Wij lokaliseren de oorzaak, voeren een vakkundige reparatie uit en controleren de installatie op dichtheid. Waar nodig herstellen wij de aansluiting conform de waterwerkbladen inclusief keerklep.",
    priceFromCents: 8500, priceToCents: 35000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Lekdetectie en lokaliseren oorzaak", qty: 1, unitPriceCents: 8500, hours: 1 },
      { kind: "LABOUR", description: "Reparatie leiding of aansluiting inclusief afdichten", qty: 1, unitPriceCents: 12000, hours: 1.5 },
      { kind: "MATERIAL", description: "Koppelingen, afdichtingen en kleinmateriaal", qty: 1, unitPriceCents: 3500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 5000 },
      { kind: "LABOUR", description: "Vervangen aangetast leidingdeel inclusief afpersen", qty: 1, unitPriceCents: 9500, hours: 1.25, optional: true },
      { kind: "MATERIAL", description: "Nieuwe kraan of stopkraan", qty: 1, unitPriceCents: 6500, optional: true }
    ]
  },
  {
    slug: "ontstopping", serviceSlug: "ontstopping", title: "Ontstopping",
    description: "Professioneel ontstoppen van verstopte afvoeren, gootstenen, toiletten of standleidingen. Wij verwijderen de verstopping met een veer of hogedrukreiniging en controleren de doorstroming na afloop. Op verzoek voeren wij een camera-inspectie uit om de oorzaak in beeld te brengen.",
    priceFromCents: 8500, priceToCents: 32500, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Ontstoppen afvoer met ontstoppingsveer", qty: 1, unitPriceCents: 12000, hours: 1.5 },
      { kind: "LABOUR", description: "Controle doorstroming en naspoelen", qty: 1, unitPriceCents: 4500, hours: 0.5 },
      { kind: "MATERIAL", description: "Kleinmateriaal en afdichtingen", qty: 1, unitPriceCents: 1500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 5000 },
      { kind: "LABOUR", description: "Hogedrukreiniging standleiding of riool", qty: 1, unitPriceCents: 12500, hours: 1.5, optional: true },
      { kind: "LABOUR", description: "Camera-inspectie afvoer met beeldrapport", qty: 1, unitPriceCents: 9500, hours: 1, optional: true }
    ]
  },
  {
    slug: "rioolwerk", serviceSlug: "riolering", title: "Rioolwerk",
    description: "Aanleg, reparatie of vervanging van binnen- en buitenriolering bij verzakking, breuk of wortelingroei. Wij lokaliseren het probleem met een camera-inspectie en herstellen of vervangen de leiding met correct afschot. Alle werkzaamheden worden afgesloten met een controle op doorstroming en waterdichtheid.",
    priceFromCents: 45000, priceToCents: 250000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Camera-inspectie riolering en lokaliseren defect", qty: 1, unitPriceCents: 12500, hours: 1.5 },
      { kind: "LABOUR", description: "Graafwerk en vrijleggen rioolleiding", qty: 1, unitPriceCents: 65000, hours: 8 },
      { kind: "LABOUR", description: "Vervangen rioolleiding met correct afschot", qty: 6, unitPriceCents: 8500, hours: 8 },
      { kind: "MATERIAL", description: "PVC-rioolbuis, hulpstukken en manchetten", qty: 1, unitPriceCents: 18500 },
      { kind: "LABOUR", description: "Aanvullen sleuf en herstel bestrating", qty: 1, unitPriceCents: 32000, hours: 4 },
      { kind: "OTHER", description: "Voorrijkosten en afvoeren grond", qty: 1, unitPriceCents: 12500 },
      { kind: "MATERIAL", description: "Plaatsen ontstoppingsstuk of inspectieput", qty: 1, unitPriceCents: 22500, optional: true },
      { kind: "LABOUR", description: "Relinen rioolleiding (kousmethode zonder graven)", qty: 1, unitPriceCents: 95000, hours: 6, optional: true }
    ]
  },
  {
    slug: "daklekkage-verhelpen", serviceSlug: "daklekkage", title: "Daklekkage verhelpen",
    description: "Opsporen en herstellen van daklekkages bij zowel platte als hellende daken. Wij lokaliseren het lekkagepunt, herstellen de dakbedekking, loodslabben of naden en controleren de waterdichtheid. Waar nodig vervangen wij beschadigde dakbedekking om herhaling te voorkomen.",
    priceFromCents: 12500, priceToCents: 65000, warrantyText: DEFAULT_WARRANTY, termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Inspectie dak en lokaliseren lekkagepunt", qty: 1, unitPriceCents: 9500, hours: 1 },
      { kind: "LABOUR", description: "Herstel dakbedekking, naden of loodslabben", qty: 1, unitPriceCents: 18500, hours: 2.5 },
      { kind: "MATERIAL", description: "Bitumen, kit, lood en afdichtingsmateriaal", qty: 1, unitPriceCents: 6500 },
      { kind: "OTHER", description: "Voorrijkosten", qty: 1, unitPriceCents: 5000 },
      { kind: "LABOUR", description: "Vervangen deel dakbedekking (bitumen of EPDM)", qty: 4, unitPriceCents: 6500, hours: 4, optional: true },
      { kind: "MATERIAL", description: "Nieuwe dakdoorvoer of ontluchtingskap", qty: 1, unitPriceCents: 8500, optional: true }
    ]
  },
  {
    slug: "epdm-dakbedekking", serviceSlug: "plat-dak-epdm", title: "EPDM dakbedekking (plat dak)",
    description: "Complete aanleg van een EPDM-dakbedekking op uw platte dak. Wij verwijderen de oude bedekking, plaatsen isolatie waar nodig en lijmen de EPDM-folie in één naadloos stuk. Resultaat is een onderhoudsarme, duurzame en volledig waterdichte dakbedekking.",
    priceFromCents: 350000, priceToCents: 850000,
    warrantyText: "20 jaar fabrieksgarantie op de EPDM-folie; 10 jaar garantie op waterdichtheid van de dakbedekking; 5 jaar op arbeid.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Verwijderen bestaande dakbedekking en reinigen ondergrond", qty: 1, unitPriceCents: 45000, hours: 5 },
      { kind: "MATERIAL", description: "EPDM-folie (1.2 mm, hoogwaardig), naadloos (per m²)", qty: 50, unitPriceCents: 2800 },
      { kind: "MATERIAL", description: "Lijm, primer en afwerkprofielen", qty: 1, unitPriceCents: 32000 },
      { kind: "LABOUR", description: "Aanbrengen EPDM-folie incl. aansluitingen en randafwerking (per m²)", qty: 50, unitPriceCents: 2200, hours: 12 },
      { kind: "OTHER", description: "Voorrijkosten en projectvoorbereiding", qty: 1, unitPriceCents: 4500 },
      { kind: "OTHER", description: "Afvoercontainer voor sloopafval", qty: 1, unitPriceCents: 18000 },
      { kind: "MATERIAL", description: "PIR-dakisolatie (100 mm) (per m²)", qty: 50, unitPriceCents: 3500, optional: true },
      { kind: "MATERIAL", description: "Nieuwe geïsoleerde dakrand met aluminium daktrim (per m)", qty: 30, unitPriceCents: 4200, optional: true }
    ]
  },
  {
    slug: "bitumen-dakbedekking", serviceSlug: "plat-dak-bitumen", title: "Bitumen dakbedekking (plat dak)",
    description: "Vakkundige aanleg van een tweelaags gebrande bitumen dakbedekking. Wij brengen een onderlaag en een APP/SBS-toplaag aan voor maximale waterdichtheid en levensduur. Ideaal voor platte daken die tegen een stootje moeten kunnen.",
    priceFromCents: 300000, priceToCents: 750000,
    warrantyText: "10 jaar garantie op waterdichtheid van de dakbedekking; 5 jaar op arbeid; fabrieksgarantie op de bitumenrollen.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Verwijderen oude dakbedekking en voorbereiden ondergrond", qty: 1, unitPriceCents: 42000, hours: 5 },
      { kind: "MATERIAL", description: "Bitumen onderlaag (zelfklevend/gebrand) (per m²)", qty: 50, unitPriceCents: 1800 },
      { kind: "MATERIAL", description: "Bitumen toplaag met leislag (SBS) (per m²)", qty: 50, unitPriceCents: 2400 },
      { kind: "LABOUR", description: "Aanbrengen twee lagen bitumen incl. opstanden (per m²)", qty: 50, unitPriceCents: 2600, hours: 14 },
      { kind: "OTHER", description: "Voorrijkosten en gasflessen voor het branden", qty: 1, unitPriceCents: 6500 },
      { kind: "OTHER", description: "Afvoercontainer voor het oude dakmateriaal", qty: 1, unitPriceCents: 18000 },
      { kind: "MATERIAL", description: "PIR-dakisolatie (100 mm) onder de dakbedekking (per m²)", qty: 50, unitPriceCents: 3500, optional: true },
      { kind: "MATERIAL", description: "Nieuwe dakdoorvoer of ontluchting", qty: 1, unitPriceCents: 9500, optional: true }
    ]
  },
  {
    slug: "pannendak-vervangen", serviceSlug: "pannendak-vervangen", title: "Pannendak vervangen",
    description: "Volledige vervanging van uw pannendak inclusief panlatten en dampdoorlatende folie. Wij verwijderen de oude pannen, controleren de dakconstructie en leggen nieuwe dakpannen strak en stormvast. Uw dak is daarna weer decennialang zorgeloos.",
    priceFromCents: 650000, priceToCents: 1600000,
    warrantyText: "10 jaar garantie op waterdichtheid en stormvastheid; 5 jaar op arbeid; fabrieksgarantie op de dakpannen.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Verwijderen bestaande dakpannen en oude panlatten", qty: 1, unitPriceCents: 95000, hours: 10 },
      { kind: "MATERIAL", description: "Nieuwe keramische dakpannen incl. hulpstukken (per m²)", qty: 80, unitPriceCents: 2200 },
      { kind: "MATERIAL", description: "Dampdoorlatende dakfolie en tengels/panlatten (per m²)", qty: 80, unitPriceCents: 850 },
      { kind: "LABOUR", description: "Aanbrengen folie, panlatten en leggen dakpannen incl. stormklemmen (per m²)", qty: 80, unitPriceCents: 3200, hours: 24 },
      { kind: "OTHER", description: "Voorrijkosten en projectcoördinatie", qty: 1, unitPriceCents: 6500 },
      { kind: "OTHER", description: "Afvoercontainer voor oude pannen en houtwerk", qty: 1, unitPriceCents: 22000 },
      { kind: "MATERIAL", description: "Nieuwe nokvorsten droog verwerkt met nokvorstband (per m)", qty: 12, unitPriceCents: 4500, optional: true },
      { kind: "OTHER", description: "Rolsteiger of steiger rondom de woning", qty: 1, unitPriceCents: 45000, optional: true },
      { kind: "MATERIAL", description: "Vervangen aangetast dakbeschot of tengelwerk (per m)", qty: 10, unitPriceCents: 2800, optional: true }
    ]
  },
  {
    slug: "dakgoot-vervangen", serviceSlug: "dakgoot", title: "Dakgoot vervangen of repareren",
    description: "Vervanging of reparatie van uw dakgoot inclusief beugels en hemelwaterafvoer. Wij verwijderen de lekkende of doorgeroeste goot en monteren een nieuwe zinken of aluminium goot op afschot. Zo wordt regenwater weer betrouwbaar afgevoerd.",
    priceFromCents: 45000, priceToCents: 250000,
    warrantyText: "10 jaar garantie op waterdichtheid van de goot; 2 jaar op arbeid; fabrieksgarantie op de materialen.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Demonteren en afvoeren van de oude dakgoot", qty: 1, unitPriceCents: 18000, hours: 2 },
      { kind: "MATERIAL", description: "Nieuwe zinken mastgoot inclusief beugels (per m)", qty: 12, unitPriceCents: 3800 },
      { kind: "MATERIAL", description: "Hemelwaterafvoer (HWA) met bochten en tapstuk", qty: 1, unitPriceCents: 8500 },
      { kind: "LABOUR", description: "Monteren nieuwe goot op afschot incl. solderen naden (per m)", qty: 12, unitPriceCents: 2600, hours: 5 },
      { kind: "OTHER", description: "Voorrijkosten incl. ladder- en klimmateriaal", qty: 1, unitPriceCents: 4500 },
      { kind: "MATERIAL", description: "Nieuw boeideel of gootbetimmering vervangen (per m)", qty: 12, unitPriceCents: 3200, optional: true },
      { kind: "MATERIAL", description: "Bladvanger of gootrooster tegen verstopping", qty: 1, unitPriceCents: 6500, optional: true }
    ]
  },
  {
    slug: "dakraam-plaatsen", serviceSlug: "dakraam-plaatsen", title: "Dakraam plaatsen",
    description: "Professionele plaatsing van een dakraam in uw hellende dak. Wij zagen de sparing, monteren het dakraam waterdicht met gootstuk en werken de binnenzijde netjes af. Meer daglicht en frisse lucht in uw zolder of slaapkamer.",
    priceFromCents: 95000, priceToCents: 250000,
    warrantyText: "10 jaar garantie op waterdichtheid van de dakraaminbouw; 2 jaar op arbeid; fabrieksgarantie op het dakraam.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Dakraam (tuimelvenster) met HR++ isolatieglas incl. gootstuk", qty: 1, unitPriceCents: 52000 },
      { kind: "LABOUR", description: "Uitzagen dakconstructie en pannen verwijderen", qty: 1, unitPriceCents: 22000, hours: 3 },
      { kind: "LABOUR", description: "Plaatsen dakraam incl. waterdichte aansluiting en isolatieset", qty: 1, unitPriceCents: 28000, hours: 4 },
      { kind: "MATERIAL", description: "Isolatie- en aansluitset, loodslabben en afdichtingsmateriaal", qty: 1, unitPriceCents: 12000 },
      { kind: "OTHER", description: "Voorrijkosten en afvoer van bouwafval", qty: 1, unitPriceCents: 4500 },
      { kind: "LABOUR", description: "Binnenafwerking met gipsplaat rondom het dakraam", qty: 1, unitPriceCents: 24000, hours: 4, optional: true },
      { kind: "MATERIAL", description: "Elektrisch bedienbaar dakraam met afstandsbediening", qty: 1, unitPriceCents: 38000, optional: true }
    ]
  },
  {
    slug: "dakkapel-plaatsen", serviceSlug: "dakkapel-plaatsen", title: "Dakkapel plaatsen",
    description: "Complete plaatsing van een geprefabriceerde dakkapel voor meer ruimte en licht op zolder. Wij verzorgen het uitzagen van het dak, plaatsen de dakkapel met kraan en werken deze volledig waterdicht en geïsoleerd af. Een forse meerwaarde voor uw woning.",
    priceFromCents: 650000, priceToCents: 1500000,
    warrantyText: "10 jaar garantie op waterdichtheid van de dakkapel; 5 jaar op arbeid; fabrieksgarantie op kozijnen en beglazing.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "MATERIAL", description: "Geprefabriceerde dakkapel op maat, kunststof kozijnen + HR++ glas", qty: 1, unitPriceCents: 480000 },
      { kind: "LABOUR", description: "Uitzagen dakvlak en voorbereiden constructie", qty: 1, unitPriceCents: 85000, hours: 10 },
      { kind: "LABOUR", description: "Plaatsen en waterdicht monteren van de dakkapel", qty: 1, unitPriceCents: 145000, hours: 20 },
      { kind: "MATERIAL", description: "Loodwerk, isolatie en afwerkmateriaal rondom de dakkapel", qty: 1, unitPriceCents: 28000 },
      { kind: "OTHER", description: "Inzet mobiele kraan voor het hijsen van de dakkapel", qty: 1, unitPriceCents: 45000 },
      { kind: "OTHER", description: "Voorrijkosten en afvoercontainer voor bouwafval", qty: 1, unitPriceCents: 26000 },
      { kind: "LABOUR", description: "Binnenafwerking met gipsplaten, vensterbank en schilderklaar", qty: 1, unitPriceCents: 95000, hours: 16, optional: true },
      { kind: "MATERIAL", description: "Meerprijs keralit of trespa buitenbekleding", qty: 1, unitPriceCents: 65000, optional: true }
    ]
  },
  {
    slug: "loodslabben-vervangen", serviceSlug: "loodwerk", title: "Loodslabben vervangen",
    description: "Vervanging van versleten of lekkende loodslabben bij schoorsteen, muuraansluiting of dakkapel. Wij verwijderen het oude lood, brengen nieuw loodwerk aan en dichten de aansluitingen duurzaam af. Zo voorkomt u lekkages op de kwetsbare dakaansluitingen.",
    priceFromCents: 35000, priceToCents: 150000,
    warrantyText: "10 jaar garantie op waterdichtheid van het loodwerk; 2 jaar op arbeid; fabrieksgarantie op de materialen.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Verwijderen oud en aangetast loodwerk", qty: 1, unitPriceCents: 14000, hours: 2 },
      { kind: "MATERIAL", description: "Nieuwe loodslabben (code 18/20) (per m)", qty: 6, unitPriceCents: 4200 },
      { kind: "LABOUR", description: "Aanbrengen en aankloppen nieuw loodwerk incl. voegwerk (per m)", qty: 6, unitPriceCents: 3800, hours: 4 },
      { kind: "MATERIAL", description: "Loodvervangende voegkit, muurafdichting en bevestigingsclips", qty: 1, unitPriceCents: 6500 },
      { kind: "OTHER", description: "Voorrijkosten inclusief klimmateriaal", qty: 1, unitPriceCents: 4500 },
      { kind: "LABOUR", description: "Herstel of opnieuw voegen van het schoorsteenmetselwerk", qty: 1, unitPriceCents: 18000, hours: 3, optional: true }
    ]
  },
  {
    slug: "zinkwerk", serviceSlug: "zinkwerk", title: "Zinkwerk",
    description: "Vakkundig maatwerk in zink voor goten, kilgoten, dakranden en waterafvoer. Wij zetten en solderen het zinkwerk ter plaatse voor een naadloze, duurzame afwerking. Zink is onderhoudsarm en gaat bij correcte verwerking tientallen jaren mee.",
    priceFromCents: 65000, priceToCents: 400000,
    warrantyText: "10 jaar garantie op waterdichtheid van het zinkwerk; 5 jaar op arbeid; fabrieksgarantie op het zinkmateriaal.",
    termsText: DEFAULT_TERMS, order: 1,
    items: [
      { kind: "LABOUR", description: "Demonteren en afvoeren van bestaand zinkwerk", qty: 1, unitPriceCents: 18000, hours: 2 },
      { kind: "MATERIAL", description: "Titaanzink op rol (0.7 mm) (per m)", qty: 15, unitPriceCents: 4500 },
      { kind: "LABOUR", description: "Zetten, solderen en monteren zinkwerk op locatie (per m)", qty: 15, unitPriceCents: 3800, hours: 8 },
      { kind: "MATERIAL", description: "Soldeer, felsmateriaal, roofingfolie en bevestigingsmiddelen", qty: 1, unitPriceCents: 14000 },
      { kind: "OTHER", description: "Voorrijkosten en gereedschap voor plaatselijk solderen", qty: 1, unitPriceCents: 5500 },
      { kind: "MATERIAL", description: "Nieuwe zinken hemelwaterafvoer inclusief bochten", qty: 1, unitPriceCents: 12000, optional: true },
      { kind: "OTHER", description: "Rolsteiger voor veilig werken op hoogte", qty: 1, unitPriceCents: 28000, optional: true }
    ]
  },
];
