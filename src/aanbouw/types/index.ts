/**
 * AanbouwPlatform.nl — Domain Types
 *
 * A lead- & offerteplatform for homeowners who want an aanbouw, uitbouw,
 * dakopbouw, garage-ombouw or renovation, and the bouwbedrijven/aannemers that
 * deliver them. These types mirror the (future) Firestore collections so the
 * same shapes can be reused on the client, in Cloud Functions and API adapters.
 */

// ---------------------------------------------------------------------------
// Auth & RBAC
// ---------------------------------------------------------------------------

/** Platform roles. */
export type Role = 'admin' | 'aannemer' | 'klant';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: Role;
  avatarColor: string;
  /** For an aannemer: the bouwbedrijf they belong to. Empty for admin. */
  companyId?: string;
  /** For a klant: their own homeowner account id (mirrors `id`). */
  lastActive: string;
  title?: string;
}

// ---------------------------------------------------------------------------
// Diensten (services a bouwbedrijf can offer)
// ---------------------------------------------------------------------------

export type ServiceKey =
  | 'aanbouw'
  | 'uitbouw'
  | 'dakopbouw'
  | 'garage-ombouw'
  | 'veranda'
  | 'tuinkantoor'
  | 'prefab-woning'
  | 'fundering'
  | 'staalconstructie'
  | 'kozijnen'
  | 'schuifpui'
  | 'gevelafwerking'
  | 'vergunning-begeleiding';

export interface ServiceDef {
  key: ServiceKey;
  label: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Bouwbedrijven / Aannemers (the "company profile")
// ---------------------------------------------------------------------------

export type CompanyStatus = 'actief' | 'pauze' | 'prospect';

/** Werkgebied — where a bouwbedrijf operates (postcode/stad/regio). */
export interface WorkArea {
  /** Two-digit postcode prefixes (e.g. "46", "47") the company serves. */
  postcodes: string[];
  /** Specific cities. */
  cities: string[];
  /** Provinces / regions (e.g. "Noord-Brabant"). */
  regions: string[];
  /** Max travel radius in km from the home base. */
  radiusKm: number;
}

export interface Bouwbedrijf {
  id: string;
  name: string;
  /** KvK registration number. */
  kvk: string;
  contactPerson: string;
  phone: string;
  email: string;
  website?: string;
  /** Street + number of the head office. */
  address: string;
  postcode: string;
  city: string;
  region: string;
  status: CompanyStatus;
  /** Verified by an admin (badge of trust toward homeowners). */
  verified: boolean;
  services: ServiceKey[];
  workArea: WorkArea;
  description: string;
  /** Average review score 1–5. */
  rating: number;
  reviewCount: number;
  completedProjects: number;
  /** Lead-credits balance (prepaid). Prepares the future lead-cost model. */
  credits: number;
  /** Price (€) charged per accepted lead. Prepares revenue model. */
  leadPrice: number;
  accentColor: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Aanbouw aanvragen (the homeowner request — heart of the platform)
// ---------------------------------------------------------------------------

export type BuildType =
  | 'Aanbouw'
  | 'Uitbouw'
  | 'Dakopbouw'
  | 'Garage ombouw'
  | 'Mantelzorgwoning'
  | 'Poolhouse'
  | 'Veranda'
  | 'Tuinkantoor'
  | 'Prefab woning'
  | 'Anders';

export type Finish = 'casco' | 'standaard' | 'luxe';

/** Pipeline status of an aanvraag across the platform. */
export type RequestStatus =
  | 'Nieuw'
  | 'Toegewezen'
  | 'Geaccepteerd'
  | 'Offerte verstuurd'
  | 'In onderhandeling'
  | 'Gewonnen'
  | 'Verloren';

/** The assigned aannemer's response to a lead. */
export type LeadStatus = 'Nieuw' | 'Geaccepteerd' | 'Afgewezen';

export type YesNoUnknown = 'ja' | 'nee' | 'weet ik niet';

export interface RequestTimelineEntry {
  id: string;
  type: 'system' | 'status' | 'note' | 'message' | 'assign';
  message: string;
  author: string;
  at: string;
}

export interface Aanvraag {
  id: string;
  /** Reference number shown to the homeowner, e.g. AP-2026-0042. */
  number: string;
  klantId: string;
  klantName: string;
  phone: string;
  email: string;
  postcode: string;
  plaats: string;

  // Stap 1 — wat wil je bouwen
  buildType: BuildType;

  // Stap 2 — afmetingen
  breedte: number; // meter
  diepte: number; // meter
  oppervlakte: number; // m²
  afwerking: Finish;

  // Stap 3 — situatie
  bestaandeWoning: boolean;
  funderingNodig: YesNoUnknown;
  vergunningNodig: YesNoUnknown;
  startdatum: string; // ISO date or label
  budgetIndicatie: number; // € midpoint of chosen range

  // Notes from the homeowner
  toelichting: string;

  // Platform state
  status: RequestStatus;
  /** Estimated project value (€) used for stats & lead value. */
  value: number;
  /** Which bouwbedrijf the admin assigned this lead to (single). */
  assignedCompanyId?: string;
  /** The assigned aannemer's lead response. */
  leadStatus: LeadStatus;
  timeline: RequestTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Offertes
// ---------------------------------------------------------------------------

export type QuoteStatus = 'Concept' | 'Verzonden' | 'Geaccepteerd' | 'Afgewezen';

export interface QuoteLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

export interface Offerte {
  id: string;
  number: string;
  aanvraagId: string;
  companyId: string;
  klantName: string;
  status: QuoteStatus;
  lines: QuoteLine[];
  discountPct: number;
  notes: string;
  introText?: string;
  createdAt: string;
  validUntil: string;
}

// ---------------------------------------------------------------------------
// Berichten (between homeowner and bouwbedrijf, per aanvraag)
// ---------------------------------------------------------------------------

export interface Bericht {
  id: string;
  aanvraagId: string;
  companyId?: string;
  fromRole: Role;
  author: string;
  body: string;
  at: string;
  read: boolean;
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export interface AppNotification {
  id: string;
  /** Scope a notification to a role (and optionally a company/klant). */
  role?: Role;
  companyId?: string;
  klantId?: string;
  title: string;
  body: string;
  level: 'info' | 'success' | 'warn' | 'error';
  read: boolean;
  at: string;
}
