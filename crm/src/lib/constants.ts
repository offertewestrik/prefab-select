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
  "offerte_aanvraag",
  "gebeld",
  "afspraak_ingepland",
  "offerte_verstuurd",
  "akkoord",
  "in_productie",
  "geplaatst",
  "gewonnen",
  "verloren",
];

export const STAGE_META: Record<
  PipelineStage,
  { label: string; kleur: string; dot: string }
> = {
  nieuwe_lead: { label: "Nieuwe lead", kleur: "bg-slate-100 text-slate-700", dot: "bg-slate-400" },
  offerte_aanvraag: { label: "Offerte aanvraag", kleur: "bg-sky-100 text-sky-700", dot: "bg-sky-500" },
  gebeld: { label: "Gebeld", kleur: "bg-indigo-100 text-indigo-700", dot: "bg-indigo-500" },
  afspraak_ingepland: { label: "Afspraak ingepland", kleur: "bg-violet-100 text-violet-700", dot: "bg-violet-500" },
  offerte_verstuurd: { label: "Offerte verstuurd", kleur: "bg-amber-100 text-amber-700", dot: "bg-amber-500" },
  akkoord: { label: "Akkoord", kleur: "bg-emerald-100 text-emerald-700", dot: "bg-emerald-500" },
  in_productie: { label: "In productie", kleur: "bg-cyan-100 text-cyan-700", dot: "bg-cyan-500" },
  geplaatst: { label: "Geplaatst", kleur: "bg-teal-100 text-teal-700", dot: "bg-teal-500" },
  gewonnen: { label: "Gewonnen", kleur: "bg-green-100 text-green-700", dot: "bg-green-600" },
  verloren: { label: "Verloren", kleur: "bg-rose-100 text-rose-700", dot: "bg-rose-500" },
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
  verstuurd: { label: "Verstuurd", kleur: "bg-sky-100 text-sky-700" },
  bekeken: { label: "Bekeken", kleur: "bg-indigo-100 text-indigo-700" },
  geaccepteerd: { label: "Geaccepteerd", kleur: "bg-emerald-100 text-emerald-700" },
  afgewezen: { label: "Afgewezen", kleur: "bg-rose-100 text-rose-700" },
  verlopen: { label: "Verlopen", kleur: "bg-amber-100 text-amber-700" },
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
