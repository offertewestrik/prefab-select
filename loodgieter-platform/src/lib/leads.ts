// Definities en hulpfuncties rond aanvragen (leads).

import { Wrench, Droplets, Hammer, Settings, type LucideIcon } from "lucide-react";

export type JobType = "spoed" | "installatie" | "verbouwing" | "onderhoud";
export type Urgency = "spoed" | "binnen-week" | "flexibel";
export type Daypart = "ochtend" | "middag" | "avond" | "maakt-niet-uit";
export type LeadStatus =
  | "nieuw"
  | "ingepland"
  | "onderweg"
  | "afgerond"
  | "geannuleerd";

export interface LeadInput {
  jobType: JobType;
  description: string;
  urgency: Urgency;
  preferredDate?: string; // YYYY-MM-DD
  preferredDaypart: Daypart;
  name: string;
  phone: string;
  email: string;
  street: string;
  postcode: string;
  city: string;
}

export interface Lead extends LeadInput {
  id: string;
  status: LeadStatus;
  plannedAt?: string; // door het kantoor ingeplande datum/tijd (ISO)
  notes?: string; // interne notitie
  emailDeliveryStatus?: "success" | "failed" | "not_sent";
  createdAt: string; // ISO
}

// ── Werksoorten (gebruikt op de site én in het formulier) ──
export const jobTypes: {
  value: JobType;
  label: string;
  short: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    value: "spoed",
    label: "Spoed: lekkage of verstopping",
    short: "Spoed",
    description: "Acute lekkage, waterschade, verstopte afvoer of geen warm water.",
    icon: Droplets,
  },
  {
    value: "installatie",
    label: "Installatie of vervanging",
    short: "Installatie",
    description: "CV-ketel, boiler, kraan, toilet of radiator plaatsen of vervangen.",
    icon: Wrench,
  },
  {
    value: "verbouwing",
    label: "Verbouwing of badkamer",
    short: "Verbouwing",
    description: "Badkamer, leidingwerk of renovatie. Vaak met offerte vooraf.",
    icon: Hammer,
  },
  {
    value: "onderhoud",
    label: "Onderhoud of inspectie",
    short: "Onderhoud",
    description: "CV-ketel servicebeurt, periodiek onderhoud of een inspectie.",
    icon: Settings,
  },
];

export const urgencyLabels: Record<Urgency, string> = {
  spoed: "Spoed — zo snel mogelijk",
  "binnen-week": "Binnen een week",
  flexibel: "Flexibel / in overleg",
};

export const daypartLabels: Record<Daypart, string> = {
  ochtend: "Ochtend",
  middag: "Middag",
  avond: "Avond",
  "maakt-niet-uit": "Maakt niet uit",
};

export const statusLabels: Record<LeadStatus, string> = {
  nieuw: "Nieuw",
  ingepland: "Ingepland",
  onderweg: "Onderweg",
  afgerond: "Afgerond",
  geannuleerd: "Geannuleerd",
};

export const jobTypeLabel = (v: string) =>
  jobTypes.find((j) => j.value === v)?.short ?? v;

// Server-side validatie van een binnenkomende aanvraag.
export function validateLead(body: Partial<LeadInput>): string | null {
  if (!body.jobType || !jobTypes.some((j) => j.value === body.jobType))
    return "Kies een soort werk.";
  if (!body.name || body.name.trim().length < 2) return "Vul je naam in.";
  if (!body.phone || body.phone.trim().length < 8)
    return "Vul een geldig telefoonnummer in.";
  if (!body.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email))
    return "Vul een geldig e-mailadres in.";
  if (!body.city || body.city.trim().length < 2) return "Vul je plaats in.";
  return null;
}
