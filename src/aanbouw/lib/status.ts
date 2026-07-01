import type { BadgeTone } from '../components/ui';
import type { RequestStatus, LeadStatus, QuoteStatus, CompanyStatus } from '../types';

/** Map domain statuses to badge tones, kept in one place for consistency. */

export const requestStatusTone: Record<RequestStatus, BadgeTone> = {
  Nieuw: 'blue',
  Toegewezen: 'amber',
  Geaccepteerd: 'navy',
  'Offerte verstuurd': 'orange',
  'In onderhandeling': 'amber',
  Gewonnen: 'green',
  Verloren: 'red',
};

export const leadStatusTone: Record<LeadStatus, BadgeTone> = {
  Nieuw: 'orange',
  Geaccepteerd: 'green',
  Afgewezen: 'slate',
};

export const quoteStatusTone: Record<QuoteStatus, BadgeTone> = {
  Concept: 'slate',
  Verzonden: 'blue',
  Geaccepteerd: 'green',
  Afgewezen: 'red',
};

export const companyStatusTone: Record<CompanyStatus, BadgeTone> = {
  actief: 'green',
  pauze: 'amber',
  prospect: 'slate',
};
