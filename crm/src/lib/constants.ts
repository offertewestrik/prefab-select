import type {
  LeadSource,
  PipelineStage,
  ProductType,
  QuoteStatus,
  QuoteRequestStatus,
} from "./types";

// ----------------------------------------------------------------------------
// Pijplijn-stadia: volgorde + labels + kleuren. Eén bron van waarheid.
// ----------------------------------------------------------------------------
export const STAGE_ORDER: PipelineStage[] = [
  "nieuwe_lead",
  "gebeld_3x",
  "offerte_opgenomen",
  "offerte_verstuurd",
  "afspraak_ingepland",
  "offerte_akkoord",
  "offerte_afgewezen",
  "tekeningen_maken",
  "facturen_verstuurd",
  "opdracht_afgerond",
];

export const STAGE_META: Record<
  PipelineStage,
  { label: string; kleur: string; dot: string }
> = {
  nieuwe_lead: { label: "Nieuwe lead", kleur: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
  gebeld_3x: { label: "3x gebeld", kleur: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
  offerte_opgenomen: { label: "Offerte opgenomen", kleur: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  offerte_verstuurd: { label: "Offerte verstuurd", kleur: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  afspraak_ingepland: { label: "Afspraak ingepland", kleur: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  offerte_akkoord: { label: "Offerte akkoord", kleur: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  offerte_afgewezen: { label: "Offerte afgewezen", kleur: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
  tekeningen_maken: { label: "Tekeningen maken", kleur: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500" },
  facturen_verstuurd: { label: "Facturen verstuurd", kleur: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
  opdracht_afgerond: { label: "Opdracht volledig afgerond", kleur: "bg-green-100 text-green-700", dot: "bg-green-600" },
};

export const SOURCE_LABEL: Record<LeadSource, string> = {
  website_formulier: "Website formulier",
  configurator: "Configurator",
  meta_ads: "Meta Ads",
  google_ads: "Google Ads",
  telefoon: "Telefoon",
  handmatig: "Handmatig",
  referral: "Doorverwijzing",
};

export const PRODUCT_LABEL: Record<ProductType, string> = {
  mantelzorgwoning: "Mantelzorgwoning",
  prefab_aanbouw: "Prefab aanbouw",
  prefab_uitbouw: "Prefab uitbouw",
  poolhouse: "Poolhouse",
  chalet: "Chalet",
  vakantiewoning: "Vakantiewoning",
  schuur: "Schuur",
  tuinkantoor: "Tuinkantoor",
  overig: "Overig",
};

export const QUOTE_STATUS_META: Record<
  QuoteStatus,
  { label: string; kleur: string }
> = {
  concept: { label: "Concept", kleur: "bg-slate-100 text-slate-700" },
  verstuurd: { label: "Verzonden", kleur: "bg-sky-100 text-sky-700" },
  bekeken: { label: "Geopend", kleur: "bg-indigo-100 text-indigo-700" },
  geaccepteerd: { label: "Geaccepteerd", kleur: "bg-emerald-100 text-emerald-700" },
  afgewezen: { label: "Afgewezen", kleur: "bg-rose-100 text-rose-700" },
  verlopen: { label: "Verlopen", kleur: "bg-amber-100 text-amber-700" },
};

/** Eenheden voor offerteregels. */
export const EENHEDEN = ["stuks", "m²", "m¹", "m³", "uur", "dag", "post", "set"];

/** Standaard (algemene) voorwaarden op een nieuwe offerte. */
export const DEFAULT_VOORWAARDEN =
  "Deze offerte is vrijblijvend en geldig tot de bovengenoemde datum. Alle prijzen " +
  "zijn inclusief of exclusief btw conform de vermelding op de offerte. Levertijd in " +
  "overleg en onder voorbehoud van vergunningverlening. Op al onze offertes en " +
  "overeenkomsten zijn onze algemene voorwaarden van toepassing.";

/** Vaste betalingsregeling (percentage van het totaalbedrag per fase). */
export const BETALINGSTERMIJNEN: { pct: number; moment: string }[] = [
  { pct: 40, moment: "bij opdrachtverstrekking en ondertekening van de overeenkomst" },
  { pct: 30, moment: "bij aanvang van de productie van uw prefab project" },
  { pct: 20, moment: "bij levering en plaatsing op locatie" },
  { pct: 10, moment: "bij oplevering van het project" },
];

export const BETALINGSVOORWAARDEN_TEKST =
  "Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan, tenzij schriftelijk " +
  "anders overeengekomen. De productie van het project wordt ingepland na ontvangst van de " +
  "aanbetaling. Eventuele meer- en minderwerken worden afzonderlijk verrekend en gefactureerd.";

/** Garantievoorwaarden — vaste tekst op de offerte (tweede pagina van de PDF). */
export const GARANTIE_INTRO =
  "Prefab Select staat voor kwaliteit, vakmanschap en duurzame prefab bouwoplossingen. " +
  "Daarom bieden wij garantie op de door ons geleverde en uitgevoerde werkzaamheden volgens onderstaande voorwaarden.";

export const GARANTIE_SECTIES: { titel: string; tekst?: string; bullets?: string[] }[] = [
  {
    titel: "Constructieve garantie",
    tekst:
      "Op de hoofddraagconstructie van de door Prefab Select gerealiseerde prefab uitbouw, aanbouw, dakopbouw, " +
      "poolhouse, mantelzorgwoning of recreatiewoning geldt een garantie van 10 jaar op constructieve gebreken " +
      "die het gevolg zijn van materiaal- of fabricagefouten.",
  },
  {
    titel: "Garantie op materialen",
    tekst:
      "Op toegepaste materialen, kozijnen, beglazing, gevelbekleding, dakbedekking en overige bouwmaterialen gelden " +
      "de garantietermijnen van de betreffende fabrikant of leverancier. Deze garanties worden, waar mogelijk, aan " +
      "opdrachtgever overgedragen.",
  },
  {
    titel: "Garantie op uitgevoerde werkzaamheden",
    tekst:
      "Op de door Prefab Select uitgevoerde montage- en bouwwerkzaamheden geldt een garantie van 2 jaar op " +
      "aantoonbare uitvoeringsfouten.",
  },
  {
    titel: "Uitsluitingen",
    tekst: "Garantie is niet van toepassing op:",
    bullets: [
      "Normale slijtage en veroudering.",
      "Schade als gevolg van onjuist gebruik of onvoldoende onderhoud.",
      "Schade veroorzaakt door weersomstandigheden, storm, overstroming, brand of andere overmachtssituaties.",
      "Schade veroorzaakt door werkzaamheden van derden.",
      "Haarscheuren, krimp- en zettingsverschijnselen die binnen normale bouwkundige toleranties vallen.",
      "Wijzigingen of aanpassingen aan het werk die niet door Prefab Select zijn uitgevoerd.",
    ],
  },
  {
    titel: "Meldingsplicht",
    tekst:
      "Eventuele gebreken dienen binnen een redelijke termijn na constatering schriftelijk aan Prefab Select te worden " +
      "gemeld. Opdrachtgever dient Prefab Select de gelegenheid te geven het gebrek te inspecteren en indien van " +
      "toepassing te herstellen.",
  },
  {
    titel: "Onderhoud",
    tekst:
      "Garantie blijft uitsluitend van kracht indien het gerealiseerde bouwwerk volgens de geldende " +
      "onderhoudsvoorschriften wordt onderhouden.",
  },
  {
    titel: "Aansprakelijkheid",
    tekst:
      "De aansprakelijkheid van Prefab Select is beperkt tot herstel of vervanging van het betreffende onderdeel. " +
      "Eventuele gevolgschade, indirecte schade of bedrijfsschade is uitgesloten, tenzij sprake is van opzet of grove nalatigheid.",
  },
  {
    titel: "Toepasselijkheid",
    tekst:
      "Op alle offertes, overeenkomsten en werkzaamheden van Prefab Select zijn de geldende algemene voorwaarden van toepassing.",
  },
];

/** Algemene voorwaarden — vaste tekst op de offerte (laatste pagina's van de PDF). */
export const ALGEMENE_VOORWAARDEN: {
  nr: number;
  titel: string;
  tekst?: string;
  bullets?: string[];
  na?: string;
}[] = [
  { nr: 1, titel: "Toepasselijkheid", tekst: "Deze algemene voorwaarden zijn van toepassing op alle offertes, overeenkomsten, leveringen en werkzaamheden uitgevoerd door Prefab Select, tenzij schriftelijk anders overeengekomen." },
  { nr: 2, titel: "Offertes", tekst: "Alle offertes van Prefab Select zijn vrijblijvend, tenzij uitdrukkelijk anders vermeld. Offertes zijn geldig gedurende 30 dagen na offertedatum." },
  { nr: 3, titel: "Overeenkomst", tekst: "Een overeenkomst komt tot stand na schriftelijke opdrachtverstrekking door opdrachtgever en schriftelijke bevestiging door Prefab Select." },
  { nr: 4, titel: "Prijzen", tekst: "Alle prijzen zijn exclusief btw, tenzij anders vermeld. Eventuele meer- en minderwerken worden afzonderlijk verrekend." },
  {
    nr: 5,
    titel: "Betalingsvoorwaarden",
    tekst: "Tenzij anders overeengekomen geldt de volgende betalingsregeling:",
    bullets: ["40% bij opdrachtverstrekking;", "30% bij aanvang productie;", "20% bij levering en plaatsing;", "10% bij oplevering."],
    na: "Facturen dienen binnen 14 dagen na factuurdatum te worden voldaan.",
  },
  { nr: 6, titel: "Vergunningen en onderzoeken", tekst: "Opdrachtgever is verantwoordelijk voor het verkrijgen van eventuele benodigde vergunningen, meldingen en goedkeuringen, tenzij schriftelijk anders overeengekomen." },
  { nr: 7, titel: "Planning en uitvoering", tekst: "Opgegeven levertijden en planningen zijn indicatief. Vertragingen als gevolg van weersomstandigheden, overheidsmaatregelen, leveranciersproblemen, overmacht of omstandigheden buiten de invloed van Prefab Select geven geen recht op schadevergoeding." },
  { nr: 8, titel: "Meer- en minderwerk", tekst: "Wijzigingen op verzoek van opdrachtgever kunnen leiden tot meer- of minderwerk. Deze worden afzonderlijk geoffreerd en gefactureerd." },
  { nr: 9, titel: "Oplevering", tekst: "Het werk wordt als opgeleverd beschouwd zodra opdrachtgever het werk in gebruik neemt, goedkeurt of indien eventuele gebreken die oplevering niet verhinderen zijn vastgelegd." },
  { nr: 10, titel: "Garantie", tekst: "Prefab Select verstrekt garantie conform de in de offerte opgenomen garantievoorwaarden. Garanties vervallen indien werkzaamheden door derden worden gewijzigd of indien sprake is van onjuist gebruik of onvoldoende onderhoud." },
  {
    nr: 11,
    titel: "Aansprakelijkheid",
    tekst: "Prefab Select is uitsluitend aansprakelijk voor directe schade die het gevolg is van aantoonbare tekortkomingen. Iedere aansprakelijkheid is beperkt tot het factuurbedrag van het betreffende onderdeel van de opdracht. Prefab Select is niet aansprakelijk voor:",
    bullets: ["Indirecte schade;", "Gevolgschade;", "Verlies van inkomsten;", "Schade door overmacht;", "Schade veroorzaakt door derden."],
  },
  { nr: 12, titel: "Overmacht", tekst: "Onder overmacht wordt verstaan iedere situatie buiten de redelijke invloed van Prefab Select, waaronder weersomstandigheden, oorlog, stakingen, pandemieën, materiaaltekorten, transportproblemen en overheidsmaatregelen." },
  { nr: 13, titel: "Eigendomsvoorbehoud", tekst: "Alle geleverde materialen blijven eigendom van Prefab Select totdat volledige betaling heeft plaatsgevonden." },
  { nr: 14, titel: "Klachten", tekst: "Klachten dienen binnen 14 dagen na constatering schriftelijk te worden gemeld. Prefab Select dient in de gelegenheid te worden gesteld eventuele gebreken te inspecteren en te herstellen." },
  { nr: 15, titel: "Toepasselijk recht", tekst: "Op alle overeenkomsten en werkzaamheden van Prefab Select is uitsluitend Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in het arrondissement waarin Prefab Select is gevestigd." },
];

/** Bedrijfsgegevens voor PDF & e-mail. */
export const BEDRIJF = {
  naam: "Prefab Select",
  slogan: "Artisans of Space",
  email: "info@prefabselect.nl",
  telefoon: "+31 85 060 7775",
  web: "www.prefabselect.nl",
  kvk: "84056630",
  btw: "NL863079234B01",
  adres: "Steenspil 24",
  postcodePlaats: "4661 TZ Halsteren",
  plaats: "Halsteren",
  // Betaalgegevens — vul IBAN aan om het betaalgegevens-blok op de PDF te tonen.
  iban: "NL65 INGB 0007 5033 52",
  tnv: "Prefab Select B.V.",
};

/** Logo-kleuren (woordmerk "Prefab Select"). */
export const LOGO = {
  prefab: "#1d4ed8", // blauw tekstdeel
  selectBg: "#2563eb", // blauw vlak achter "Select"
  selectText: "#ffffff",
};

export const QUOTE_REQUEST_STATUS_META: Record<
  QuoteRequestStatus,
  { label: string; kleur: string }
> = {
  nieuw: { label: "Nieuw", kleur: "bg-sky-100 text-sky-700" },
  in_behandeling: { label: "In behandeling", kleur: "bg-amber-100 text-amber-700" },
  omgezet: { label: "Omgezet naar offerte", kleur: "bg-emerald-100 text-emerald-700" },
  afgewezen: { label: "Afgewezen", kleur: "bg-rose-100 text-rose-700" },
};

/** Teamleden voor toewijzing (dummy). */
export const TEAM = ["Kelly", "Mark", "Sanne", "Tom"];

/** Standaard btw-percentage in NL. */
export const DEFAULT_BTW = 21;

// ============================================================================
// Fase 3 — agenda, taken, rollen, reminders & notificaties
// ============================================================================
import type {
  AppointmentType,
  NotificationType,
  TaskStatus,
  UserRole,
} from "./types";

export const APPOINTMENT_TYPE_META: Record<
  AppointmentType,
  { label: string; kleur: string; hex: string }
> = {
  telefonisch: { label: "Telefonisch gesprek", kleur: "bg-sky-100 text-sky-700", hex: "#0ea5e9" },
  offertebespreking: { label: "Offertebespreking", kleur: "bg-amber-100 text-amber-700", hex: "#f59e0b" },
  inmeten: { label: "Inmeten", kleur: "bg-violet-100 text-violet-700", hex: "#8b5cf6" },
  adviesgesprek: { label: "Adviesgesprek", kleur: "bg-indigo-100 text-indigo-700", hex: "#6366f1" },
  werkvoorbereiding: { label: "Werkvoorbereiding", kleur: "bg-cyan-100 text-cyan-700", hex: "#06b6d4" },
  plaatsing: { label: "Plaatsing", kleur: "bg-emerald-100 text-emerald-700", hex: "#10b981" },
  oplevering: { label: "Oplevering", kleur: "bg-teal-100 text-teal-700", hex: "#14b8a6" },
  overig: { label: "Overig", kleur: "bg-slate-100 text-slate-700", hex: "#64748b" },
};

export const TASK_STATUS_META: Record<
  TaskStatus,
  { label: string; kleur: string; dot: string }
> = {
  open: { label: "Open", kleur: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
  bezig: { label: "Bezig", kleur: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  wachten: { label: "Wachten", kleur: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  gereed: { label: "Gereed", kleur: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-600" },
};

export const TASK_STATUS_ORDER: TaskStatus[] = ["open", "bezig", "wachten", "gereed"];

export const ROLE_META: Record<UserRole, { label: string; kleur: string }> = {
  eigenaar: { label: "Eigenaar", kleur: "bg-brand-100 text-brand-700" },
  verkoop: { label: "Verkoop", kleur: "bg-emerald-100 text-emerald-700" },
  werkvoorbereiding: { label: "Werkvoorbereiding", kleur: "bg-cyan-100 text-cyan-700" },
  administratie: { label: "Administratie", kleur: "bg-violet-100 text-violet-700" },
};

export const NOTIFICATION_META: Record<
  NotificationType,
  { label: string; kleur: string }
> = {
  nieuwe_lead: { label: "Nieuwe lead", kleur: "bg-sky-100 text-sky-700" },
  nieuwe_afspraak: { label: "Nieuwe afspraak", kleur: "bg-violet-100 text-violet-700" },
  offerte_geaccepteerd: { label: "Offerte geaccepteerd", kleur: "bg-emerald-100 text-emerald-700" },
  taak_verlopen: { label: "Taak verlopen", kleur: "bg-rose-100 text-rose-700" },
};

/** Mogelijke opvolg-offsets in dagen. */
export const REMINDER_DAGEN = [1, 3, 7, 14];

// ============================================================================
// Fase 5 — facturen & betalingen
// ============================================================================
import type { InvoiceStatus, PaymentMethode } from "./types";

export const INVOICE_STATUS_META: Record<
  InvoiceStatus,
  { label: string; kleur: string }
> = {
  concept: { label: "Concept", kleur: "bg-slate-100 text-slate-700" },
  verzonden: { label: "Verzonden", kleur: "bg-sky-100 text-sky-700" },
  deels_betaald: { label: "Deels betaald", kleur: "bg-amber-100 text-amber-700" },
  betaald: { label: "Betaald", kleur: "bg-emerald-100 text-emerald-700" },
  te_laat: { label: "Te laat", kleur: "bg-rose-100 text-rose-700" },
  gecrediteerd: { label: "Gecrediteerd", kleur: "bg-violet-100 text-violet-700" },
};

export const PAYMENT_METHODE_LABEL: Record<PaymentMethode, string> = {
  ideal: "iDEAL",
  overboeking: "Overboeking",
  pin: "Pin",
  contant: "Contant",
};

/** Pijplijn-stadia die als "lopend project" gelden (voor het klantportaal). */
export const PROJECT_STAGES = ["offerte_akkoord", "tekeningen_maken", "facturen_verstuurd", "opdracht_afgerond"];
