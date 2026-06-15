import type { BadgeTone } from '../components/ui';
import type {
  LeadStatus, QuoteStatus, TaskStatus, TaskPriority, CompanyStatus,
  AgentStatus, DeployStatus, ContentStatus,
} from '../types';

export function leadStatusTone(s: LeadStatus): BadgeTone {
  switch (s) {
    case 'Nieuw': return 'blue';
    case 'Gebeld': return 'cyan';
    case 'Geen gehoor': return 'slate';
    case 'Afspraak ingepland': return 'purple';
    case 'Offerte verstuurd': return 'amber';
    case 'Onderhandeling': return 'amber';
    case 'Gewonnen': return 'green';
    case 'Verloren': return 'red';
  }
}

export function quoteStatusTone(s: QuoteStatus): BadgeTone {
  switch (s) {
    case 'Concept': return 'slate';
    case 'Verzonden': return 'amber';
    case 'Geaccepteerd': return 'green';
    case 'Afgewezen': return 'red';
  }
}

export function taskStatusTone(s: TaskStatus): BadgeTone {
  switch (s) {
    case 'todo': return 'slate';
    case 'bezig': return 'blue';
    case 'review': return 'amber';
    case 'klaar': return 'green';
  }
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'Te doen', bezig: 'Bezig', review: 'Review', klaar: 'Klaar',
};

export function priorityTone(p: TaskPriority): BadgeTone {
  switch (p) {
    case 'laag': return 'slate';
    case 'normaal': return 'blue';
    case 'hoog': return 'amber';
    case 'urgent': return 'red';
  }
}

export function companyStatusTone(s: CompanyStatus): BadgeTone {
  return s === 'actief' ? 'green' : s === 'pauze' ? 'amber' : 'slate';
}

export function agentStatusTone(s: AgentStatus): BadgeTone {
  return s === 'running' ? 'blue' : s === 'completed' ? 'green' : s === 'failed' ? 'red' : 'slate';
}

export function deployTone(s: DeployStatus): BadgeTone {
  return s === 'live' ? 'green' : s === 'building' ? 'amber' : s === 'failed' ? 'red' : 'slate';
}

export function contentStatusTone(s: ContentStatus): BadgeTone {
  return s === 'geplaatst' ? 'green' : s === 'ingepland' ? 'blue' : s === 'concept' ? 'amber' : 'slate';
}

export const LEAD_STATUSES: LeadStatus[] = [
  'Nieuw', 'Gebeld', 'Geen gehoor', 'Afspraak ingepland', 'Offerte verstuurd', 'Onderhandeling', 'Gewonnen', 'Verloren',
];
