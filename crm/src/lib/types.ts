// ============================================================================
// Domeinmodel voor het Prefab Select CRM
// ----------------------------------------------------------------------------
// Deze types vormen het contract tussen de UI, de (mock) datastore en straks
// de echte Supabase/Prisma-laag. Houd ze stabiel — de echte koppelingen
// leveren straks exact deze vormen.
// ============================================================================

/** De 10 vaste pijplijn-stadia van Prefab Select. */
export type PipelineStage =
  | "nieuwe_lead"
  | "offerte_aanvraag"
  | "gebeld"
  | "afspraak_ingepland"
  | "offerte_verstuurd"
  | "akkoord"
  | "in_productie"
  | "geplaatst"
  | "gewonnen"
  | "verloren";

/** Waar komt de lead vandaan. */
export type LeadSource =
  | "website_formulier"
  | "configurator"
  | "meta_ads"
  | "google_ads"
  | "telefoon"
  | "handmatig"
  | "referral";

/** Producttypes die Prefab Select aanbiedt. */
export type ProductType =
  | "mantelzorgwoning"
  | "prefab_aanbouw"
  | "prefab_uitbouw"
  | "poolhouse"
  | "chalet"
  | "vakantiewoning"
  | "schuur"
  | "tuinkantoor"
  | "overig";

export interface Lead {
  id: string;
  naam: string;
  bedrijf?: string;
  email: string;
  telefoon: string;
  adres?: string;
  plaats?: string;
  postcode?: string;
  stage: PipelineStage;
  source: LeadSource;
  product: ProductType;
  /** Geschatte projectwaarde in euro's. */
  waarde: number;
  /** 0-100, kans op winnen. */
  kans: number;
  toegewezenAan: string;
  tags: string[];
  bericht?: string;
  aangemaaktOp: string; // ISO datum
  laatsteActiviteit: string; // ISO datum
  /** Volgorde binnen een pijplijn-kolom (voor drag & drop). */
  positie: number;
}

export type NoteType = "notitie" | "telefoon" | "email" | "systeem";

export interface Note {
  id: string;
  leadId: string;
  type: NoteType;
  tekst: string;
  auteur: string;
  aangemaaktOp: string; // ISO
}

export type TaskPriority = "laag" | "normaal" | "hoog";

export interface Task {
  id: string;
  leadId?: string;
  titel: string;
  omschrijving?: string;
  vervaldatum: string; // ISO
  prioriteit: TaskPriority;
  toegewezenAan: string;
  voltooid: boolean;
  /** Reminder x minuten voor vervaldatum (null = geen). */
  reminderMinuten: number | null;
}

export interface Appointment {
  id: string;
  leadId?: string;
  titel: string;
  type: "intake" | "showroom" | "locatiebezoek" | "oplevering" | "overig";
  start: string; // ISO
  eind: string; // ISO
  locatie?: string;
  notitie?: string;
  /** Of de afspraak gesynchroniseerd is met Google Calendar. */
  googleSynced: boolean;
}

export interface UploadedFile {
  id: string;
  leadId: string;
  naam: string;
  type: string; // mime / categorie
  grootteKb: number;
  geuploadOp: string; // ISO
  geuploadDoor: string;
}

export type QuoteRequestStatus = "nieuw" | "in_behandeling" | "omgezet" | "afgewezen";

export interface QuoteRequest {
  id: string;
  leadId: string;
  source: LeadSource;
  product: ProductType;
  omschrijving: string;
  budgetIndicatie?: number;
  gewensteOpleverdatum?: string;
  status: QuoteRequestStatus;
  ontvangenOp: string; // ISO
}

export interface QuoteLine {
  id: string;
  omschrijving: string;
  aantal: number;
  /** Eenheid, bv. "stuks", "m²", "uur", "post". */
  eenheid: string;
  prijsPerStuk: number;
  btwPercentage: number;
}

export type QuoteStatus =
  | "concept"
  | "verstuurd"
  | "bekeken"
  | "geaccepteerd"
  | "afgewezen"
  | "verlopen";

export interface Quote {
  id: string;
  nummer: string; // bv. PS-2026-0012
  leadId: string;
  status: QuoteStatus;
  /** Projecttype (overgenomen van de lead, maar per offerte aanpasbaar). */
  projecttype: ProductType;
  /** Vrije projectomschrijving. */
  projectomschrijving?: string;
  /** Afmetingen, bv. "6 x 4 m, hoogte 3 m". */
  afmetingen?: string;
  /** Uit te voeren werkzaamheden (vrije tekst). */
  werkzaamheden?: string;
  /** Indicatieve planning & levertijd (vrije tekst). */
  planning?: string;
  regels: QuoteLine[];
  /** Optionele korting in euro's op subtotaal (excl. btw). */
  korting: number;
  geldigTot: string; // ISO
  /** Interne/externe opmerkingen. */
  notitie?: string;
  /** Algemene voorwaarden / leveringsvoorwaarden. */
  voorwaarden?: string;
  aangemaaktOp: string; // ISO
  verstuurdOp?: string; // ISO — moment van verzenden
  bekekenOp?: string; // ISO — moment van openen door klant
  beslistOp?: string; // ISO — moment van accepteren/afwijzen
}

/** Logregel van een verzonden offerte-e-mail (tabel quote_email_logs). */
export interface QuoteEmailLog {
  id: string;
  quoteId: string;
  naar: string;
  onderwerp: string;
  status: "verzonden" | "mislukt";
  messageId?: string;
  /** True wanneer via de mock is verzonden (geen echte Resend-call). */
  mock: boolean;
  verstuurdOp: string; // ISO
}

/** Status van een externe koppeling op het integraties-overzicht. */
export interface Integration {
  id: string;
  naam: string;
  categorie: "marketing" | "agenda" | "email" | "website" | "analytics";
  verbonden: boolean;
  beschrijving: string;
  laatsteSync?: string;
}
