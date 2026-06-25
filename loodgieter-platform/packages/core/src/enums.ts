// Domein-enums (gespiegeld met het Prisma-schema, zie packages/db).
// Hier als const-objecten zodat ze ook runtime bruikbaar zijn (labels, selects).

export const UserRole = {
  HOMEOWNER: "HOMEOWNER",
  INSTALLER: "INSTALLER",
  ADMIN: "ADMIN",
} as const;
export type UserRole = (typeof UserRole)[keyof typeof UserRole];

export const Urgency = {
  SPOED: "SPOED",
  BINNEN_WEEK: "BINNEN_WEEK",
  FLEXIBEL: "FLEXIBEL",
} as const;
export type Urgency = (typeof Urgency)[keyof typeof Urgency];

export const urgencyLabels: Record<Urgency, string> = {
  SPOED: "Spoed — zo snel mogelijk",
  BINNEN_WEEK: "Binnen een week",
  FLEXIBEL: "Flexibel / in overleg",
};

export const Daypart = {
  OCHTEND: "OCHTEND",
  MIDDAG: "MIDDAG",
  AVOND: "AVOND",
  MAAKT_NIET_UIT: "MAAKT_NIET_UIT",
} as const;
export type Daypart = (typeof Daypart)[keyof typeof Daypart];

export const daypartLabels: Record<Daypart, string> = {
  OCHTEND: "Ochtend",
  MIDDAG: "Middag",
  AVOND: "Avond",
  MAAKT_NIET_UIT: "Maakt niet uit",
};

export const LeadStatus = {
  NEW: "NEW",
  MATCHING: "MATCHING",
  DISTRIBUTED: "DISTRIBUTED",
  PARTIALLY_SOLD: "PARTIALLY_SOLD",
  SOLD_OUT: "SOLD_OUT",
  CLOSED: "CLOSED",
  EXPIRED: "EXPIRED",
  SPAM: "SPAM",
} as const;
export type LeadStatus = (typeof LeadStatus)[keyof typeof LeadStatus];

export const CompanyStatus = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  SUSPENDED: "SUSPENDED",
  REJECTED: "REJECTED",
} as const;
export type CompanyStatus = (typeof CompanyStatus)[keyof typeof CompanyStatus];
