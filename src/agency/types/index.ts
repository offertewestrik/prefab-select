/**
 * Agency Command Center — Domain Types
 *
 * These types mirror the Firestore collections defined in the README and
 * `src/agency/services`. They are intentionally framework-agnostic so the same
 * shapes can be reused on the client, in Cloud Functions and in API adapters.
 */

// ---------------------------------------------------------------------------
// Auth & RBAC
// ---------------------------------------------------------------------------

export type Role = 'super_admin' | 'admin' | 'marketeer' | 'sales' | 'klant';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
  /** Companies this user is scoped to. Empty for agency-wide (admin) roles. */
  companyIds: string[];
  lastActive: string;
  title?: string;
}

// ---------------------------------------------------------------------------
// Companies / Clients
// ---------------------------------------------------------------------------

export type CompanyStatus = 'actief' | 'pauze' | 'prospect';

export interface CompanyIntegrations {
  firebaseProjectId?: string;
  githubRepo?: string;
  websiteUrl?: string;
  metaAdsAccountId?: string;
  googleAnalyticsPropertyId?: string;
}

export interface Company {
  id: string;
  name: string;
  logo?: string;
  website?: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  sector: string;
  status: CompanyStatus;
  monthlyMarketingBudget: number;
  monthlyRevenue: number;
  goals: string[];
  notes: string;
  integrations: CompanyIntegrations;
  accentColor: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Leads / CRM
// ---------------------------------------------------------------------------

export type LeadSource =
  | 'Website'
  | 'Meta Ads'
  | 'Google Ads'
  | 'WhatsApp'
  | 'Handmatig'
  | 'Telefoon';

export type LeadStatus =
  | 'Nieuw'
  | 'Gebeld'
  | 'Geen gehoor'
  | 'Afspraak ingepland'
  | 'Offerte verstuurd'
  | 'Onderhandeling'
  | 'Gewonnen'
  | 'Verloren';

export interface LeadTimelineEntry {
  id: string;
  type: 'note' | 'status' | 'call' | 'email' | 'system';
  message: string;
  author: string;
  at: string;
}

export interface Lead {
  id: string;
  companyId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  product: string;
  source: LeadSource;
  status: LeadStatus;
  score: number;
  value: number;
  ownerId: string;
  followUpDate?: string;
  reminderActive: boolean;
  notes: string;
  timeline: LeadTimelineEntry[];
  createdAt: string;
  updatedAt: string;
}

// ---------------------------------------------------------------------------
// Deals (pipeline value tracking, used by revenue module)
// ---------------------------------------------------------------------------

export type DealStage = 'open' | 'won' | 'lost';

export interface Deal {
  id: string;
  companyId: string;
  leadId?: string;
  title: string;
  value: number;
  stage: DealStage;
  probability: number;
  closedAt?: string;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Quotes / Offertes
// ---------------------------------------------------------------------------

export type QuoteStatus = 'Concept' | 'Verzonden' | 'Geaccepteerd' | 'Afgewezen';

export interface QuoteLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

export interface Quote {
  id: string;
  number: string;
  companyId: string;
  leadId?: string;
  clientName: string;
  status: QuoteStatus;
  lines: QuoteLine[];
  discountPct: number;
  notes: string;
  introText?: string;
  createdAt: string;
  validUntil: string;
}

// ---------------------------------------------------------------------------
// Tasks
// ---------------------------------------------------------------------------

export type TaskPriority = 'laag' | 'normaal' | 'hoog' | 'urgent';
export type TaskStatus = 'todo' | 'bezig' | 'review' | 'klaar';

export interface Task {
  id: string;
  companyId: string;
  title: string;
  description: string;
  assigneeId: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string;
  notes: string;
  aiAssisted: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type ProjectType = 'website' | 'firebase' | 'github' | 'configurator' | 'landingpage';
export type DeployStatus = 'live' | 'building' | 'failed' | 'offline';

export interface Project {
  id: string;
  companyId: string;
  name: string;
  type: ProjectType;
  status: 'actief' | 'on hold' | 'opgeleverd';
  deployStatus: DeployStatus;
  url?: string;
  repo?: string;
  lastUpdate: string;
  openBugs: number;
  openTasks: number;
  docsUrl?: string;
  description: string;
}

// ---------------------------------------------------------------------------
// AI Agents
// ---------------------------------------------------------------------------

export type AgentStatus = 'idle' | 'running' | 'completed' | 'failed';

export type AgentKind =
  | 'lead-follow-up'
  | 'quote'
  | 'website-analysis'
  | 'seo'
  | 'meta-ads-analysis'
  | 'content'
  | 'reporting'
  | 'customer-service'
  | 'github-review'
  | 'firebase-monitor';

export interface Agent {
  id: string;
  companyId: string;
  kind: AgentKind;
  name: string;
  goal: string;
  status: AgentStatus;
  lastAction: string;
  output: string;
  tasks: string[];
  updatedAt: string;
}

export interface AgentLog {
  id: string;
  agentId: string;
  companyId: string;
  level: 'info' | 'success' | 'warn' | 'error';
  message: string;
  at: string;
}

// ---------------------------------------------------------------------------
// Analytics & Campaigns (Google Analytics + Meta Ads)
// ---------------------------------------------------------------------------

export interface TimeseriesPoint {
  label: string;
  value: number;
}

export interface AnalyticsSnapshot {
  companyId: string;
  visitors: number;
  sessions: number;
  conversions: number;
  conversionRate: number;
  visitorsTrend: TimeseriesPoint[];
  topPages: { path: string; views: number }[];
  sources: { name: string; sessions: number }[];
}

export interface Campaign {
  id: string;
  companyId: string;
  platform: 'Meta Ads' | 'Google Ads';
  name: string;
  status: 'actief' | 'gepauzeerd' | 'concept';
  budget: number;
  spend: number;
  reach: number;
  clicks: number;
  leads: number;
  conversions: number;
  costPerLead: number;
  roas: number;
}

// ---------------------------------------------------------------------------
// Reports
// ---------------------------------------------------------------------------

export interface Report {
  id: string;
  companyId: string;
  title: string;
  period: string;
  createdAt: string;
  metrics: { label: string; value: string; delta?: number }[];
  summary: string;
  recommendations: string[];
}

// ---------------------------------------------------------------------------
// Content Calendar
// ---------------------------------------------------------------------------

export type ContentPlatform = 'Facebook' | 'Instagram' | 'TikTok' | 'LinkedIn';
export type ContentStatus = 'idee' | 'concept' | 'ingepland' | 'geplaatst';

export interface ContentItem {
  id: string;
  companyId: string;
  platform: ContentPlatform;
  status: ContentStatus;
  title: string;
  caption: string;
  hashtags: string[];
  visualUrl?: string;
  scheduledFor: string;
}

// ---------------------------------------------------------------------------
// Integrations & Notifications
// ---------------------------------------------------------------------------

export interface Integration {
  id: string;
  key: string;
  name: string;
  description: string;
  category: 'analytics' | 'ads' | 'dev' | 'ai' | 'email';
  connected: boolean;
  envVar: string;
}

export interface AppNotification {
  id: string;
  companyId?: string;
  title: string;
  body: string;
  level: 'info' | 'success' | 'warn' | 'error';
  read: boolean;
  at: string;
}
