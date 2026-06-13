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
  | "gebeld_3x"
  | "offerte_opgenomen"
  | "offerte_verstuurd"
  | "afspraak_ingepland"
  | "offerte_akkoord"
  | "offerte_afgewezen"
  | "tekeningen_maken"
  | "facturen_verstuurd"
  | "opdracht_afgerond";

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
  /** Persoonlijke токen voor toegang tot het klantportaal (optioneel; valt terug op id). */
  portalToken?: string;
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
export type TaskStatus = "open" | "bezig" | "wachten" | "gereed";

export interface Task {
  id: string;
  titel: string;
  omschrijving?: string;
  prioriteit: TaskPriority;
  deadline: string; // ISO
  status: TaskStatus;
  medewerkerId: string;
  /** Koppeling aan lead / offerte / project (project = lead in productie). */
  leadId?: string;
  quoteId?: string;
  projectId?: string;
  /** Reminder x minuten voor deadline (null = geen). */
  reminderMinuten: number | null;
  aangemaaktOp: string; // ISO
}

export interface TaskComment {
  id: string;
  taskId: string;
  auteurId: string;
  tekst: string;
  aangemaaktOp: string; // ISO
}

export type AppointmentType =
  | "telefonisch"
  | "offertebespreking"
  | "inmeten"
  | "adviesgesprek"
  | "werkvoorbereiding"
  | "plaatsing"
  | "oplevering"
  | "overig";

export interface Appointment {
  id: string;
  titel: string;
  type: AppointmentType;
  start: string; // ISO
  eind: string; // ISO
  leadId?: string; // gekoppelde klant/lead
  quoteId?: string; // optioneel gekoppelde offerte
  locatie?: string;
  omschrijving?: string;
  medewerkerId: string; // verantwoordelijke medewerker
  /** Of de afspraak gesynchroniseerd is met Google Calendar. */
  googleSynced: boolean;
}

export interface UploadedFile {
  id: string;
  leadId: string;
  naam: string;
  type: string; // mime / categorie
  grootteKb: number;
  /** Pad in de Supabase storage-bucket (lead-files). */
  storagePath?: string;
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

/** Product uit de eigen catalogus (configurator-opties + eigen producten). */
export interface Product {
  id: string;
  naam: string;
  beschrijving?: string;
  categorie: string;
  eenheid: string;
  /** Prijs per stuk in euro's, exclusief btw. */
  prijsPerStuk: number;
  btwPercentage: number;
  actief: boolean;
  aangemaaktOp: string; // ISO
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
  /** Online ondertekening door de klant. */
  ondertekendOp?: string; // ISO
  ondertekendDoor?: string; // naam die de klant invulde
  handtekening?: string; // base64 PNG van de getekende handtekening
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

// ----------------------------------------------------------------------------
// AI-agents — geautomatiseerde assistenten die meewerken in het CRM
// ----------------------------------------------------------------------------

/** Op welk CRM-onderdeel een agent werkt. */
export type AiAgentCategorie =
  | "leads"
  | "offertes"
  | "email"
  | "planning"
  | "facturen"
  | "marketing"
  | "rapportage";

/**
 * Live-status van een agent.
 * - `bezig`    : voert op dit moment een taak uit (toont een pulserende indicator)
 * - `actief`   : staat aan en wacht op werk
 * - `rust`     : staat aan maar heeft nu niets te doen
 * - `gepauzeerd`: handmatig uitgezet
 * - `fout`     : laatste taak liep vast / mist een koppeling
 */
export type AiAgentStatus = "bezig" | "actief" | "rust" | "gepauzeerd" | "fout";

/** Eén regel in het activiteitenlog van een agent. */
export interface AiAgentActivity {
  id: string;
  /** ISO-datumtijd waarop de actie plaatsvond. */
  tijd: string;
  omschrijving: string;
  /** Optionele koppeling naar de betreffende lead. */
  leadId?: string;
}

export interface AiAgent {
  id: string;
  naam: string;
  categorie: AiAgentCategorie;
  status: AiAgentStatus;
  /** Aan/uit gezet door de gebruiker. */
  actief: boolean;
  /** Korte omschrijving van wat de agent doet. */
  rol: string;
  /** Waar de agent op dit moment aan werkt (alleen bij status "bezig"). */
  huidigeTaak?: string;
  /** Aantal afgeronde taken vandaag. */
  takenVandaag: number;
  /** Totaal aantal afgeronde taken sinds de start. */
  takenTotaal: number;
  /** Geschatte bespaarde tijd vandaag, in minuten. */
  tijdBespaardMin: number;
  /** ISO-datumtijd van de laatste actie. */
  laatsteActiviteit: string;
  /** Recente acties, nieuwste eerst. */
  activiteiten: AiAgentActivity[];
  /** Of dit een door ons aanbevolen agent is voor Prefab Select. */
  aanbevolen: boolean;
  /** Of de agent gekoppeld is aan de AI (Claude-API) en dus mag draaien. */
  gekoppeld: boolean;
  /** Sleutel van het catalogus-sjabloon waaruit de agent is toegevoegd. */
  templateKey?: string;
}

// ----------------------------------------------------------------------------
// Fase 3 — medewerkers, agenda, taken, reminders & notificaties
// ----------------------------------------------------------------------------

export type UserRole = "eigenaar" | "verkoop" | "werkvoorbereiding" | "administratie";

export interface User {
  id: string;
  naam: string;
  email: string;
  rol: UserRole;
  /** Kleur voor agenda-weergave. */
  kleur: string;
  /** Of de Google Calendar van deze medewerker gekoppeld is. */
  googleConnected: boolean;
}

export type NotificationType =
  | "nieuwe_lead"
  | "nieuwe_afspraak"
  | "offerte_geaccepteerd"
  | "taak_verlopen";

export interface AppNotification {
  id: string;
  type: NotificationType;
  titel: string;
  tekst: string;
  /** Doel-URL in het CRM. */
  link?: string;
  gelezen: boolean;
  /** Voor welke medewerker (leeg = iedereen). */
  voorUserId?: string;
  aangemaaktOp: string; // ISO
}

/** Wanneer een opvolg-reminder getriggerd wordt. */
export type ReminderTrigger =
  | "nieuwe_lead"
  | "offerte_verstuurd"
  | "afspraak_gepland";

export interface ReminderRule {
  id: string;
  trigger: ReminderTrigger;
  label: string;
  /** Offset in dagen na de trigger (voor lead/offerte). */
  offsetDagen?: number;
  /** Offset in uren vóór het moment (voor afspraken). */
  offsetUrenVooraf?: number;
  actief: boolean;
}

// ----------------------------------------------------------------------------
// Fase 5 — facturen, betalingen & klantportaal
// ----------------------------------------------------------------------------

export type InvoiceStatus =
  | "concept"
  | "verzonden"
  | "deels_betaald"
  | "betaald"
  | "te_laat"
  | "gecrediteerd";

export interface Invoice {
  id: string;
  nummer: string; // bv. FACT-2026-0042
  leadId: string;
  quoteId?: string;
  status: InvoiceStatus;
  /** Termijn-label bij termijnfacturen, bv. "40% — aanbetaling". */
  termijnLabel?: string;
  regels: QuoteLine[];
  korting: number;
  vervaldatum: string; // ISO
  notitie?: string;
  aangemaaktOp: string; // ISO
  verstuurdOp?: string; // ISO
}

export type PaymentMethode = "ideal" | "overboeking" | "pin" | "contant";

export interface Payment {
  id: string;
  invoiceId: string;
  bedrag: number;
  methode: PaymentMethode;
  datum: string; // ISO
}

/** Inkoopkosten (materiaal, onderaannemer, transport) per project/lead. */
export interface Purchase {
  id: string;
  leadId: string; // gekoppeld project/klant
  leverancier: string;
  omschrijving?: string;
  /** Inkoopbedrag in euro's (kosten). */
  bedrag: number;
  datum: string; // ISO
  aangemaaktOp: string; // ISO
}

// ----------------------------------------------------------------------------
// Social media — posten naar meerdere platforms tegelijk (via Make).
// ----------------------------------------------------------------------------
export type SocialPlatform = "instagram" | "facebook" | "tiktok" | "linkedin";

export interface SocialPost {
  id: string;
  tekst: string;
  afbeelding?: string;
  platforms: SocialPlatform[];
  status: "verzonden" | "gepland" | "mislukt";
  geplandOp?: string;
  verzondenOp?: string;
  aangemaaktOp: string;
}
