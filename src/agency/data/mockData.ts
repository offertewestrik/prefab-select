import type {
  AppUser, Company, Lead, Deal, Quote, Task, Project, Agent, AgentLog,
  AnalyticsSnapshot, Campaign, Report, ContentItem, Integration, AppNotification,
  AgentKind, TimeseriesPoint,
} from '../types';

/**
 * Seed / demo data. The shape matches Firestore collections exactly, so when a
 * real backend is connected the same components keep working — only the data
 * source in `services/firestoreService.ts` changes.
 */

// --- helpers ---------------------------------------------------------------
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const daysAhead = (n: number) => new Date(Date.now() + n * 86400000).toISOString();
const hoursAgo = (n: number) => new Date(Date.now() - n * 3600000).toISOString();

const trend = (base: number, points: number, variance = 0.25): TimeseriesPoint[] => {
  const labels = ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'];
  return Array.from({ length: points }, (_, i) => ({
    label: labels[i] ?? `P${i + 1}`,
    value: Math.round(base * (1 + (Math.sin(i * 1.3) * variance) + i * 0.04)),
  }));
};

// --- users -----------------------------------------------------------------
export const users: AppUser[] = [
  { id: 'u_owner', name: 'Sjoerd Westrik', email: 'offerte@prefabselect.nl', role: 'super_admin', avatarColor: '#0066FF', companyIds: [], lastActive: hoursAgo(0), title: 'Founder / Agency Lead' },
  { id: 'u_admin', name: 'Lisa de Vries', email: 'lisa@agency.nl', role: 'admin', avatarColor: '#7C3AED', companyIds: [], lastActive: hoursAgo(2), title: 'Operations Manager' },
  { id: 'u_mkt', name: 'Daan Bakker', email: 'daan@agency.nl', role: 'marketeer', avatarColor: '#0EA5E9', companyIds: ['c_prefab', 'c_lucky'], lastActive: hoursAgo(1), title: 'Performance Marketeer' },
  { id: 'u_sales', name: 'Noa Jansen', email: 'noa@agency.nl', role: 'sales', avatarColor: '#10B981', companyIds: ['c_prefab', 'c_groen'], lastActive: hoursAgo(4), title: 'Sales Consultant' },
  { id: 'u_klant', name: 'Mark Lucky', email: 'mark@luckyzonwering.nl', role: 'klant', avatarColor: '#F59E0B', companyIds: ['c_lucky'], lastActive: daysAgo(1), title: 'Eigenaar Lucky Zonwering' },
];

// --- companies -------------------------------------------------------------
export const companies: Company[] = [
  {
    id: 'c_prefab', name: 'Prefab Select', logo: undefined, website: 'https://prefabselect.nl',
    contactPerson: 'Sjoerd Westrik', phone: '+31 6 12345678', email: 'offerte@prefabselect.nl',
    address: 'Industrieweg 12, Bergen op Zoom', sector: 'Bouw & Prefab', status: 'actief',
    monthlyMarketingBudget: 8500, monthlyRevenue: 142000,
    goals: ['40 gekwalificeerde leads/maand', 'ROAS > 4.0', 'Top 3 Google voor "prefab uitbouw"'],
    notes: 'Premium prefab specialist. Hoofdklant, full-service. Focus op West-Brabant en Randstad.',
    integrations: { firebaseProjectId: 'prefab-select-prod', githubRepo: 'offertewestrik/prefab-select', websiteUrl: 'https://prefabselect.nl', metaAdsAccountId: 'act_1029384756', googleAnalyticsPropertyId: 'GA4-PREFAB-001' },
    accentColor: '#0066FF', createdAt: daysAgo(420),
  },
  {
    id: 'c_lucky', name: 'Lucky Zonwering', website: 'https://luckyzonwering.nl',
    contactPerson: 'Mark Lucky', phone: '+31 6 22334455', email: 'info@luckyzonwering.nl',
    address: 'Zonneplein 4, Roosendaal', sector: 'Zonwering & Interieur', status: 'actief',
    monthlyMarketingBudget: 3200, monthlyRevenue: 58000,
    goals: ['25 leads/maand', 'Kosten per lead < €18', 'Meer naamsbekendheid regio'],
    notes: 'Zonwering specialist. Sterk seizoensgebonden (piek lente/zomer). Meta Ads + Google Ads.',
    integrations: { firebaseProjectId: 'lucky-zonwering', githubRepo: 'agency/lucky-site', websiteUrl: 'https://luckyzonwering.nl', metaAdsAccountId: 'act_5566778899', googleAnalyticsPropertyId: 'GA4-LUCKY-002' },
    accentColor: '#F59E0B', createdAt: daysAgo(190),
  },
  {
    id: 'c_groen', name: 'GroenRijk Hoveniers', website: 'https://groenrijk-example.nl',
    contactPerson: 'Petra Smit', phone: '+31 6 33445566', email: 'info@groenrijk-example.nl',
    address: 'Tuinlaan 88, Breda', sector: 'Hoveniers & Tuinaanleg', status: 'actief',
    monthlyMarketingBudget: 2100, monthlyRevenue: 31000,
    goals: ['Meer offerteaanvragen voor tuinaanleg', 'Lokale SEO Breda'],
    notes: 'Hovenier. Net gestart met ons. Website redesign loopt.',
    integrations: { websiteUrl: 'https://groenrijk-example.nl', googleAnalyticsPropertyId: 'GA4-GROEN-003' },
    accentColor: '#10B981', createdAt: daysAgo(75),
  },
  {
    id: 'c_dental', name: 'SmileClinic Tandartsen', website: 'https://smileclinic-example.nl',
    contactPerson: 'Dr. R. Hofman', phone: '+31 6 44556677', email: 'praktijk@smileclinic-example.nl',
    address: 'Gezondheidsplein 1, Tilburg', sector: 'Zorg & Tandheelkunde', status: 'pauze',
    monthlyMarketingBudget: 1500, monthlyRevenue: 0,
    goals: ['Patiëntenwerving implantologie'],
    notes: 'Campagnes tijdelijk gepauzeerd op verzoek klant (volgeboekt).',
    integrations: { websiteUrl: 'https://smileclinic-example.nl' },
    accentColor: '#06B6D4', createdAt: daysAgo(260),
  },
  {
    id: 'c_solar', name: 'ZonnigBV Solar', website: 'https://zonnigbv-example.nl',
    contactPerson: 'Karim El Idrissi', phone: '+31 6 55667788', email: 'sales@zonnigbv-example.nl',
    address: 'Energieweg 5, Eindhoven', sector: 'Zonnepanelen & Energie', status: 'prospect',
    monthlyMarketingBudget: 0, monthlyRevenue: 0,
    goals: ['Offerte agency-samenwerking in behandeling'],
    notes: 'Prospect. Kennismakingsgesprek gehad, voorstel verstuurd.',
    integrations: { websiteUrl: 'https://zonnigbv-example.nl' },
    accentColor: '#EAB308', createdAt: daysAgo(20),
  },
];

// --- leads -----------------------------------------------------------------
const leadSeed: Array<Partial<Lead> & { name: string; companyId: string; status: Lead['status']; source: Lead['source'] }> = [
  { name: 'Jeroen Visser', companyId: 'c_prefab', status: 'Nieuw', source: 'Meta Ads', product: 'Prefab uitbouw 18m²', value: 52000, score: 82, phone: '+31 6 11112222', email: 'jeroen@example.nl', message: 'Interesse in uitbouw woonkamer, achterzijde.' },
  { name: 'Familie De Wit', companyId: 'c_prefab', status: 'Gebeld', source: 'Website', product: 'Prefab aanbouw', value: 61000, score: 74, phone: '+31 6 11113333', email: 'dewit@example.nl', message: 'Aanbouw voor thuiskantoor + slaapkamer.' },
  { name: 'Sander Koster', companyId: 'c_prefab', status: 'Afspraak ingepland', source: 'Google Ads', product: 'Mantelzorgwoning', value: 74000, score: 91, phone: '+31 6 11114444', email: 'sander@example.nl', message: 'Mantelzorgwoning voor schoonmoeder, spoed.' },
  { name: 'Anouk Peters', companyId: 'c_prefab', status: 'Offerte verstuurd', source: 'Website', product: 'Poolhouse', value: 38000, score: 68, phone: '+31 6 11115555', email: 'anouk@example.nl', message: 'Poolhouse met sauna.' },
  { name: 'B. van Dijk', companyId: 'c_prefab', status: 'Onderhandeling', source: 'Telefoon', product: 'Prefab uitbouw 22m²', value: 67000, score: 88, phone: '+31 6 11116666', email: 'bvandijk@example.nl', message: 'Twijfelt nog over gevelafwerking.' },
  { name: 'Mevr. Hendriks', companyId: 'c_prefab', status: 'Gewonnen', source: 'Meta Ads', product: 'Prefab aanbouw 16m²', value: 49000, score: 95, phone: '+31 6 11117777', email: 'hendriks@example.nl', message: 'Getekend! Plaatsing ingepland.' },
  { name: 'T. Mulder', companyId: 'c_prefab', status: 'Verloren', source: 'Website', product: 'Vakantiewoning', value: 88000, score: 40, phone: '+31 6 11118888', email: 'mulder@example.nl', message: 'Koos voor andere aanbieder (prijs).' },
  { name: 'Geen gehoor — F. Bos', companyId: 'c_prefab', status: 'Geen gehoor', source: 'WhatsApp', product: 'Chalet', value: 95000, score: 55, phone: '+31 6 11119999', email: 'fbos@example.nl', message: 'WhatsApp aanvraag, niet bereikbaar.' },
  { name: 'Linda Vermeer', companyId: 'c_lucky', status: 'Nieuw', source: 'Meta Ads', product: 'Knikarmschermen', value: 3400, score: 70, phone: '+31 6 22221111', email: 'linda@example.nl', message: 'Terras 6m, elektrisch.' },
  { name: 'H. Groot', companyId: 'c_lucky', status: 'Gebeld', source: 'Google Ads', product: 'Screens', value: 2800, score: 64, phone: '+31 6 22222222', email: 'hgroot@example.nl', message: '4 ramen voorzijde.' },
  { name: 'Café De Hoek', companyId: 'c_lucky', status: 'Offerte verstuurd', source: 'Website', product: 'Terrasoverkapping', value: 8900, score: 80, phone: '+31 6 22223333', email: 'dehoek@example.nl', message: 'Horeca terras overkapping.' },
  { name: 'J. Willemsen', companyId: 'c_lucky', status: 'Gewonnen', source: 'Meta Ads', product: 'Rolluiken', value: 4200, score: 90, phone: '+31 6 22224444', email: 'jwillemsen@example.nl', message: 'Akkoord, ingepland.' },
  { name: 'Tuin Project Smit', companyId: 'c_groen', status: 'Nieuw', source: 'Website', product: 'Complete tuinaanleg', value: 21000, score: 76, phone: '+31 6 33331111', email: 'smit@example.nl', message: 'Volledige achtertuin herinrichting.' },
  { name: 'VvE Parkzicht', companyId: 'c_groen', status: 'Afspraak ingepland', source: 'Handmatig', product: 'Onderhoudscontract', value: 14000, score: 72, phone: '+31 6 33332222', email: 'vve@example.nl', message: 'Jaarcontract groenonderhoud.' },
];

export const leads: Lead[] = leadSeed.map((s, i) => ({
  id: `l_${i + 1}`,
  companyId: s.companyId,
  name: s.name,
  phone: s.phone ?? '+31 6 00000000',
  email: s.email ?? 'lead@example.nl',
  message: s.message ?? '',
  product: s.product ?? 'Algemene aanvraag',
  source: s.source,
  status: s.status,
  score: s.score ?? 50,
  value: s.value ?? 0,
  ownerId: i % 2 === 0 ? 'u_sales' : 'u_mkt',
  followUpDate: ['Nieuw', 'Gebeld', 'Geen gehoor', 'Afspraak ingepland'].includes(s.status) ? daysAhead((i % 5) + 1) : undefined,
  reminderActive: ['Nieuw', 'Afspraak ingepland', 'Onderhandeling'].includes(s.status),
  notes: '',
  timeline: [
    { id: `t_${i}_1`, type: 'system', message: `Lead aangemaakt via ${s.source}`, author: 'Systeem', at: daysAgo(10 - (i % 10)) },
    { id: `t_${i}_2`, type: 'status', message: `Status: ${s.status}`, author: 'Daan Bakker', at: daysAgo(Math.max(0, 8 - (i % 8))) },
  ],
  createdAt: daysAgo(12 - (i % 12)),
  updatedAt: daysAgo(i % 5),
}));

// --- deals -----------------------------------------------------------------
export const deals: Deal[] = [
  { id: 'd_1', companyId: 'c_prefab', leadId: 'l_6', title: 'Hendriks — Aanbouw 16m²', value: 49000, stage: 'won', probability: 100, closedAt: daysAgo(8), createdAt: daysAgo(34) },
  { id: 'd_2', companyId: 'c_prefab', leadId: 'l_5', title: 'Van Dijk — Uitbouw 22m²', value: 67000, stage: 'open', probability: 70, createdAt: daysAgo(12) },
  { id: 'd_3', companyId: 'c_prefab', leadId: 'l_4', title: 'Peters — Poolhouse', value: 38000, stage: 'open', probability: 45, createdAt: daysAgo(6) },
  { id: 'd_4', companyId: 'c_prefab', leadId: 'l_7', title: 'Mulder — Vakantiewoning', value: 88000, stage: 'lost', probability: 0, closedAt: daysAgo(5), createdAt: daysAgo(40) },
  { id: 'd_5', companyId: 'c_lucky', leadId: 'l_12', title: 'Willemsen — Rolluiken', value: 4200, stage: 'won', probability: 100, closedAt: daysAgo(3), createdAt: daysAgo(15) },
  { id: 'd_6', companyId: 'c_lucky', leadId: 'l_11', title: 'Café De Hoek — Overkapping', value: 8900, stage: 'open', probability: 60, createdAt: daysAgo(4) },
  { id: 'd_7', companyId: 'c_groen', leadId: 'l_13', title: 'Smit — Tuinaanleg', value: 21000, stage: 'open', probability: 50, createdAt: daysAgo(2) },
];

// --- quotes ----------------------------------------------------------------
export const quotes: Quote[] = [
  {
    id: 'q_1', number: 'OFF-2026-0148', companyId: 'c_prefab', leadId: 'l_4', clientName: 'Anouk Peters',
    status: 'Verzonden',
    lines: [
      { id: 'ql_1', description: 'Prefab poolhouse 24m² — staalframe & afwerking', quantity: 1, unitPrice: 31000, vatRate: 21 },
      { id: 'ql_2', description: 'Sauna-unit geïntegreerd', quantity: 1, unitPrice: 6500, vatRate: 21 },
      { id: 'ql_3', description: 'Transport & plaatsing', quantity: 1, unitPrice: 2400, vatRate: 21 },
    ],
    discountPct: 5, notes: 'Geldig 30 dagen. Plaatsing in overleg.',
    introText: 'Beste mevrouw Peters, hartelijk dank voor uw interesse in een prefab poolhouse...',
    createdAt: daysAgo(6), validUntil: daysAhead(24),
  },
  {
    id: 'q_2', number: 'OFF-2026-0149', companyId: 'c_prefab', leadId: 'l_5', clientName: 'B. van Dijk',
    status: 'Geaccepteerd',
    lines: [
      { id: 'ql_4', description: 'Prefab uitbouw 22m² inclusief schuifpui', quantity: 1, unitPrice: 61000, vatRate: 21 },
      { id: 'ql_5', description: 'Vloerverwarming', quantity: 1, unitPrice: 3800, vatRate: 21 },
    ],
    discountPct: 0, notes: 'Akkoord per e-mail ontvangen.',
    createdAt: daysAgo(11), validUntil: daysAhead(19),
  },
  {
    id: 'q_3', number: 'OFF-2026-0150', companyId: 'c_lucky', leadId: 'l_11', clientName: 'Café De Hoek',
    status: 'Verzonden',
    lines: [
      { id: 'ql_6', description: 'Terrasoverkapping aluminium 5x4m', quantity: 1, unitPrice: 7200, vatRate: 21 },
      { id: 'ql_7', description: 'Zijwand screens', quantity: 2, unitPrice: 850, vatRate: 21 },
    ],
    discountPct: 0, notes: '', createdAt: daysAgo(3), validUntil: daysAhead(27),
  },
  {
    id: 'q_4', number: 'OFF-2026-0151', companyId: 'c_groen', clientName: 'Tuin Project Smit',
    status: 'Concept',
    lines: [
      { id: 'ql_8', description: 'Volledige tuinaanleg incl. bestrating', quantity: 1, unitPrice: 18500, vatRate: 21 },
      { id: 'ql_9', description: 'Beplanting & beregening', quantity: 1, unitPrice: 2500, vatRate: 21 },
    ],
    discountPct: 0, notes: 'Nog niet verstuurd.', createdAt: daysAgo(1), validUntil: daysAhead(29),
  },
  {
    id: 'q_5', number: 'OFF-2026-0145', companyId: 'c_prefab', clientName: 'T. Mulder',
    status: 'Afgewezen',
    lines: [{ id: 'ql_10', description: 'Prefab vakantiewoning 45m²', quantity: 1, unitPrice: 88000, vatRate: 21 }],
    discountPct: 0, notes: 'Klant koos goedkopere aanbieder.', createdAt: daysAgo(20), validUntil: daysAgo(-10),
  },
];

// --- tasks -----------------------------------------------------------------
export const tasks: Task[] = [
  { id: 'tk_1', companyId: 'c_prefab', title: 'Bel Sander Koster terug (mantelzorg spoed)', description: 'Afspraak bevestigen voor inmeten.', assigneeId: 'u_sales', priority: 'urgent', status: 'todo', dueDate: daysAhead(0), notes: '', aiAssisted: false, createdAt: daysAgo(1) },
  { id: 'tk_2', companyId: 'c_prefab', title: 'Meta Ads campagne optimaliseren', description: 'CPL gestegen, biedstrategie herzien.', assigneeId: 'u_mkt', priority: 'hoog', status: 'bezig', dueDate: daysAhead(1), notes: 'Focus op uitbouw-doelgroep.', aiAssisted: true, createdAt: daysAgo(2) },
  { id: 'tk_3', companyId: 'c_prefab', title: 'Maandrapport mei opstellen', description: 'Inclusief ROAS en lead-overzicht.', assigneeId: 'u_mkt', priority: 'normaal', status: 'review', dueDate: daysAhead(2), notes: '', aiAssisted: true, createdAt: daysAgo(3) },
  { id: 'tk_4', companyId: 'c_lucky', title: 'Nieuwe zomercampagne lanceren', description: 'Creatives + budget instellen.', assigneeId: 'u_mkt', priority: 'hoog', status: 'todo', dueDate: daysAhead(3), notes: '', aiAssisted: false, createdAt: daysAgo(1) },
  { id: 'tk_5', companyId: 'c_lucky', title: 'Offerte Café De Hoek opvolgen', description: 'Nabellen na 3 dagen.', assigneeId: 'u_sales', priority: 'normaal', status: 'todo', dueDate: daysAhead(1), notes: '', aiAssisted: false, createdAt: daysAgo(0) },
  { id: 'tk_6', companyId: 'c_groen', title: 'Website redesign — homepage review', description: 'Feedback verwerken van klant.', assigneeId: 'u_admin', priority: 'normaal', status: 'bezig', dueDate: daysAhead(4), notes: '', aiAssisted: false, createdAt: daysAgo(2) },
  { id: 'tk_7', companyId: 'c_prefab', title: 'SEO: 3 nieuwe regio-pagina’s', description: 'Concept content laten genereren.', assigneeId: 'u_mkt', priority: 'laag', status: 'klaar', dueDate: daysAgo(1), notes: 'Afgerond.', aiAssisted: true, createdAt: daysAgo(6) },
];

// --- projects --------------------------------------------------------------
export const projects: Project[] = [
  { id: 'p_1', companyId: 'c_prefab', name: 'Prefab Select — Hoofdwebsite', type: 'website', status: 'actief', deployStatus: 'live', url: 'https://prefabselect.nl', repo: 'offertewestrik/prefab-select', lastUpdate: hoursAgo(5), openBugs: 2, openTasks: 4, docsUrl: '/docs', description: 'React/Vite marketing site met 61 prerendered pagina’s.' },
  { id: 'p_2', companyId: 'c_prefab', name: 'Offerte Configurator', type: 'configurator', status: 'actief', deployStatus: 'live', url: 'https://prefabselect-configurator.run.app', repo: 'offertewestrik/configurator', lastUpdate: daysAgo(2), openBugs: 1, openTasks: 2, description: '3D configurator op Cloud Run.' },
  { id: 'p_3', companyId: 'c_prefab', name: 'Firebase Backend', type: 'firebase', status: 'actief', deployStatus: 'live', repo: 'offertewestrik/prefab-select', lastUpdate: hoursAgo(12), openBugs: 0, openTasks: 1, description: 'Firestore + Functions voor leads en e-mail.' },
  { id: 'p_4', companyId: 'c_lucky', name: 'Lucky Zonwering Website', type: 'website', status: 'actief', deployStatus: 'building', url: 'https://luckyzonwering.nl', repo: 'agency/lucky-site', lastUpdate: hoursAgo(1), openBugs: 3, openTasks: 5, description: 'Next.js landingspagina’s + lead formulieren.' },
  { id: 'p_5', companyId: 'c_groen', name: 'GroenRijk Redesign', type: 'website', status: 'actief', deployStatus: 'offline', url: 'https://groenrijk-example.nl', repo: 'agency/groenrijk', lastUpdate: daysAgo(4), openBugs: 0, openTasks: 8, description: 'Nieuwe website in ontwikkeling.' },
  { id: 'p_6', companyId: 'c_lucky', name: 'Landingpage — Zomeractie', type: 'landingpage', status: 'opgeleverd', deployStatus: 'live', url: 'https://luckyzonwering.nl/zomer', lastUpdate: daysAgo(7), openBugs: 0, openTasks: 0, description: 'Campagne landingspagina knikarmschermen.' },
];

// --- agents ----------------------------------------------------------------
const agentDefs: { kind: AgentKind; name: string; goal: string }[] = [
  { kind: 'lead-follow-up', name: 'Lead Opvolg Agent', goal: 'Volgt nieuwe leads automatisch op en plant herinneringen.' },
  { kind: 'quote', name: 'Offerte Agent', goal: 'Genereert professionele offerteteksten en concept-offertes.' },
  { kind: 'website-analysis', name: 'Website Analyse Agent', goal: 'Analyseert websiteprestaties, snelheid en UX.' },
  { kind: 'seo', name: 'SEO Agent', goal: 'Vindt zoekwoordkansen en optimaliseert content.' },
  { kind: 'meta-ads-analysis', name: 'Meta Ads Analyse Agent', goal: 'Analyseert advertentieprestaties en geeft verbeteradvies.' },
  { kind: 'content', name: 'Content Agent', goal: 'Bedenkt postideeën en schrijft captions voor social.' },
  { kind: 'reporting', name: 'Rapportage Agent', goal: 'Stelt maandrapporten samen per klant.' },
  { kind: 'customer-service', name: 'Klantenservice Agent', goal: 'Beantwoordt veelgestelde klantvragen.' },
  { kind: 'github-review', name: 'GitHub Code Review Agent', goal: 'Reviewt code en stelt verbeteringen voor.' },
  { kind: 'firebase-monitor', name: 'Firebase Monitor Agent', goal: 'Bewaakt Firebase errors, performance en kosten.' },
];

const agentStatuses: Agent['status'][] = ['idle', 'running', 'completed', 'idle', 'completed', 'idle', 'running', 'idle', 'failed', 'idle'];

export const agents: Agent[] = agentDefs.flatMap((def, i) =>
  ['c_prefab', 'c_lucky'].map((companyId, c) => ({
    id: `a_${def.kind}_${companyId}`,
    companyId,
    kind: def.kind,
    name: def.name,
    goal: def.goal,
    status: c === 0 ? agentStatuses[i] : 'idle',
    lastAction: c === 0
      ? ['Wacht op trigger', '12 leads geanalyseerd', 'Rapport gegenereerd', 'Klaar', 'ROAS-advies opgesteld', 'Wacht op trigger', '3 posts gegenereerd', 'Wacht op trigger', 'Build gefaald — review afgebroken', 'Wacht op trigger'][i]
      : 'Wacht op trigger',
    output: c === 0 && agentStatuses[i] === 'completed'
      ? 'Resultaat beschikbaar. Bekijk logboek voor details.'
      : '',
    tasks: ['Data ophalen', 'Analyseren', 'Aanbevelingen opstellen', 'Resultaat rapporteren'],
    updatedAt: hoursAgo(i + 1),
  })),
);

export const agentLogs: AgentLog[] = [
  { id: 'al_1', agentId: 'a_meta-ads-analysis_c_prefab', companyId: 'c_prefab', level: 'info', message: 'Campagnedata opgehaald (laatste 30 dagen).', at: hoursAgo(5) },
  { id: 'al_2', agentId: 'a_meta-ads-analysis_c_prefab', companyId: 'c_prefab', level: 'success', message: 'Advies: verhoog budget op "Uitbouw - Lookalike 1%" (+€500/wk), ROAS 5.2.', at: hoursAgo(5) },
  { id: 'al_3', agentId: 'a_lead-follow-up_c_prefab', companyId: 'c_prefab', level: 'info', message: '4 leads zonder opvolging gedetecteerd, herinneringen ingepland.', at: hoursAgo(3) },
  { id: 'al_4', agentId: 'a_reporting_c_prefab', companyId: 'c_prefab', level: 'success', message: 'Maandrapport mei gegenereerd (PDF concept).', at: hoursAgo(2) },
  { id: 'al_5', agentId: 'a_github-review_c_prefab', companyId: 'c_prefab', level: 'error', message: 'Build gefaald: type error in server.ts. Review afgebroken.', at: hoursAgo(8) },
  { id: 'al_6', agentId: 'a_content_c_prefab', companyId: 'c_prefab', level: 'info', message: '10 postideeën gegenereerd voor week 24.', at: hoursAgo(1) },
];

// --- analytics -------------------------------------------------------------
export const analytics: AnalyticsSnapshot[] = [
  {
    companyId: 'c_prefab', visitors: 18420, sessions: 24100, conversions: 312, conversionRate: 1.7,
    visitorsTrend: trend(2100, 8), topPages: [
      { path: '/prefab-uitbouw', views: 5820 }, { path: '/', views: 4310 },
      { path: '/regio/breda', views: 2110 }, { path: '/offerte', views: 1980 },
      { path: '/mantelzorgwoning', views: 1450 },
    ],
    sources: [
      { name: 'Organic Search', sessions: 11200 }, { name: 'Meta Ads', sessions: 6400 },
      { name: 'Direct', sessions: 3900 }, { name: 'Google Ads', sessions: 1800 }, { name: 'Referral', sessions: 800 },
    ],
  },
  {
    companyId: 'c_lucky', visitors: 6240, sessions: 8100, conversions: 96, conversionRate: 1.18,
    visitorsTrend: trend(720, 8), topPages: [
      { path: '/zomer', views: 2200 }, { path: '/', views: 1840 }, { path: '/knikarmschermen', views: 980 },
    ],
    sources: [
      { name: 'Meta Ads', sessions: 3600 }, { name: 'Google Ads', sessions: 2100 },
      { name: 'Organic Search', sessions: 1600 }, { name: 'Direct', sessions: 800 },
    ],
  },
  {
    companyId: 'c_groen', visitors: 1420, sessions: 1900, conversions: 14, conversionRate: 0.74,
    visitorsTrend: trend(180, 8), topPages: [{ path: '/', views: 900 }, { path: '/tuinaanleg', views: 420 }],
    sources: [{ name: 'Organic Search', sessions: 900 }, { name: 'Direct', sessions: 700 }, { name: 'Referral', sessions: 300 }],
  },
];

// --- campaigns -------------------------------------------------------------
export const campaigns: Campaign[] = [
  { id: 'cm_1', companyId: 'c_prefab', platform: 'Meta Ads', name: 'Uitbouw — Lookalike 1%', status: 'actief', budget: 3000, spend: 2740, reach: 142000, clicks: 3120, leads: 38, conversions: 9, costPerLead: 72, roas: 5.2 },
  { id: 'cm_2', companyId: 'c_prefab', platform: 'Meta Ads', name: 'Mantelzorg — Interesse', status: 'actief', budget: 1500, spend: 1410, reach: 78000, clicks: 1480, leads: 17, conversions: 4, costPerLead: 83, roas: 4.1 },
  { id: 'cm_3', companyId: 'c_prefab', platform: 'Google Ads', name: 'Search — Prefab Uitbouw', status: 'actief', budget: 2000, spend: 1920, reach: 41000, clicks: 2210, leads: 24, conversions: 7, costPerLead: 80, roas: 6.0 },
  { id: 'cm_4', companyId: 'c_lucky', platform: 'Meta Ads', name: 'Zomer — Knikarmschermen', status: 'actief', budget: 1200, spend: 980, reach: 64000, clicks: 1420, leads: 22, conversions: 6, costPerLead: 44, roas: 3.8 },
  { id: 'cm_5', companyId: 'c_lucky', platform: 'Google Ads', name: 'Search — Rolluiken', status: 'gepauzeerd', budget: 800, spend: 410, reach: 12000, clicks: 540, leads: 6, conversions: 2, costPerLead: 68, roas: 2.9 },
];

// --- reports ---------------------------------------------------------------
export const reports: Report[] = [
  {
    id: 'r_1', companyId: 'c_prefab', title: 'Maandrapport — Mei 2026', period: 'Mei 2026', createdAt: daysAgo(14),
    metrics: [
      { label: 'Nieuwe leads', value: '63', delta: 12 },
      { label: 'Omzet', value: '€142.000', delta: 8 },
      { label: 'ROAS', value: '5.1', delta: 0.4 },
      { label: 'Website bezoekers', value: '18.420', delta: 15 },
    ],
    summary: 'Sterke maand met groei in zowel leads als omzet. Meta Ads presteert boven verwachting, vooral de uitbouw-lookalike. Organisch verkeer blijft stijgen door de nieuwe regio-pagina’s.',
    recommendations: ['Budget verhogen op best presterende Meta-campagne', 'Mantelzorg-campagne creatives verversen', '3 nieuwe regio-pagina’s publiceren voor SEO'],
  },
  {
    id: 'r_2', companyId: 'c_lucky', title: 'Maandrapport — Mei 2026', period: 'Mei 2026', createdAt: daysAgo(14),
    metrics: [
      { label: 'Nieuwe leads', value: '28', delta: 22 },
      { label: 'Omzet', value: '€58.000', delta: 18 },
      { label: 'Kosten per lead', value: '€44', delta: -12 },
      { label: 'ROAS', value: '3.8', delta: 0.3 },
    ],
    summary: 'Seizoenspiek zorgt voor uitstekende resultaten. Kosten per lead gedaald dankzij betere targeting. Aanrader om budget op te schalen tijdens piekmaanden.',
    recommendations: ['Budget zomercampagne opschalen', 'Google Ads rolluiken heractiveren', 'Retargeting toevoegen voor offerte-afhakers'],
  },
];

// --- content ---------------------------------------------------------------
export const content: ContentItem[] = [
  { id: 'ct_1', companyId: 'c_prefab', platform: 'Instagram', status: 'geplaatst', title: 'Timelapse plaatsing uitbouw', caption: 'In 1 dag van leeg naar luxe leefruimte ✨ Zo plaatsen wij een prefab uitbouw.', hashtags: ['#prefab', '#uitbouw', '#verbouwen'], scheduledFor: daysAgo(3) },
  { id: 'ct_2', companyId: 'c_prefab', platform: 'Facebook', status: 'ingepland', title: 'Klantverhaal familie Hendriks', caption: 'Familie Hendriks koos voor een prefab aanbouw. Het resultaat? Een droomkeuken met zicht op de tuin.', hashtags: ['#klantverhaal', '#prefabselect'], scheduledFor: daysAhead(2) },
  { id: 'ct_3', companyId: 'c_prefab', platform: 'LinkedIn', status: 'concept', title: 'Waarom prefab de toekomst is', caption: 'Sneller, duurzamer en voorspelbaar in kosten. Een blik op de bouw van morgen.', hashtags: ['#bouw', '#innovatie', '#duurzaamheid'], scheduledFor: daysAhead(5) },
  { id: 'ct_4', companyId: 'c_prefab', platform: 'TikTok', status: 'idee', title: 'Mythes over prefab ontkracht', caption: '', hashtags: [], scheduledFor: daysAhead(8) },
  { id: 'ct_5', companyId: 'c_lucky', platform: 'Instagram', status: 'ingepland', title: 'Voor & na — terrasoverkapping', caption: 'Geniet langer van je terras ☀️ Bekijk deze transformatie.', hashtags: ['#zonwering', '#terras', '#buitenleven'], scheduledFor: daysAhead(1) },
  { id: 'ct_6', companyId: 'c_lucky', platform: 'Facebook', status: 'idee', title: 'Zomeractie aankondiging', caption: '', hashtags: [], scheduledFor: daysAhead(4) },
];

// --- integrations ----------------------------------------------------------
export const integrations: Integration[] = [
  { id: 'in_1', key: 'google-analytics', name: 'Google Analytics 4', description: 'Website verkeer, sessies en conversies.', category: 'analytics', connected: true, envVar: 'GA4_PROPERTY_ID' },
  { id: 'in_2', key: 'meta-ads', name: 'Meta Ads API', description: 'Facebook & Instagram advertentieprestaties.', category: 'ads', connected: true, envVar: 'META_ADS_ACCESS_TOKEN' },
  { id: 'in_3', key: 'google-ads', name: 'Google Ads API', description: 'Search & display campagnes.', category: 'ads', connected: false, envVar: 'GOOGLE_ADS_DEVELOPER_TOKEN' },
  { id: 'in_4', key: 'github', name: 'GitHub', description: 'Repos, commits, issues en deploys.', category: 'dev', connected: true, envVar: 'GITHUB_TOKEN' },
  { id: 'in_5', key: 'firebase', name: 'Firebase Admin', description: 'Firestore, Functions, Hosting en Storage.', category: 'dev', connected: true, envVar: 'FIREBASE_PROJECT_ID' },
  { id: 'in_6', key: 'openai', name: 'OpenAI', description: 'AI agents en tekstgeneratie (GPT).', category: 'ai', connected: false, envVar: 'OPENAI_API_KEY' },
  { id: 'in_7', key: 'anthropic', name: 'Anthropic Claude', description: 'AI agents en redeneer-taken (Claude).', category: 'ai', connected: false, envVar: 'ANTHROPIC_API_KEY' },
  { id: 'in_8', key: 'gemini', name: 'Google Gemini', description: 'AI agents (reeds in repo aanwezig).', category: 'ai', connected: true, envVar: 'GEMINI_API_KEY' },
  { id: 'in_9', key: 'resend', name: 'Resend', description: 'Transactionele e-mail (offertes, rapporten).', category: 'email', connected: true, envVar: 'RESEND_API_KEY' },
];

// --- notifications ---------------------------------------------------------
export const notifications: AppNotification[] = [
  { id: 'n_1', companyId: 'c_prefab', title: 'Nieuwe lead', body: 'Jeroen Visser — Prefab uitbouw 18m² via Meta Ads.', level: 'info', read: false, at: hoursAgo(1) },
  { id: 'n_2', companyId: 'c_prefab', title: 'Offerte geaccepteerd', body: 'B. van Dijk accepteerde OFF-2026-0149 (€67.640).', level: 'success', read: false, at: hoursAgo(6) },
  { id: 'n_3', companyId: 'c_prefab', title: 'Agent waarschuwing', body: 'GitHub Review Agent: build gefaald in prefab-select.', level: 'error', read: false, at: hoursAgo(8) },
  { id: 'n_4', companyId: 'c_lucky', title: 'Budget bijna op', body: 'Zomer-campagne heeft 82% van het maandbudget besteed.', level: 'warn', read: true, at: daysAgo(1) },
  { id: 'n_5', companyId: 'c_prefab', title: 'Rapport klaar', body: 'Maandrapport mei is gegenereerd en klaar voor verzending.', level: 'success', read: true, at: daysAgo(1) },
];
