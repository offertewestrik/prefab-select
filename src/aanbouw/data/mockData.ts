import type {
  AppUser, Bouwbedrijf, Aanvraag, Offerte, Bericht, AppNotification,
  RequestStatus, LeadStatus, BuildType, ServiceKey,
} from '../types';

/**
 * Seed / demo data for AanbouwPlatform.nl. Shapes match the (future) Firestore
 * collections exactly, so when a real backend is connected the same components
 * keep working — only `services/firestoreService.ts` changes.
 */

// --- helpers ---------------------------------------------------------------
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000).toISOString();
const daysAhead = (n: number) => new Date(Date.now() + n * 86400000).toISOString();
const hoursAgo = (n: number) => new Date(Date.now() - n * 3600000).toISOString();

// --- users -----------------------------------------------------------------
export const users: AppUser[] = [
  { id: 'u_admin', name: 'Platform Beheer', email: 'admin@aanbouwplatform.nl', phone: '+31 85 0601234', role: 'admin', avatarColor: '#0e2a47', lastActive: hoursAgo(0), title: 'Platformbeheerder' },
  { id: 'u_aannemer', name: 'Brabant Bouw Experts', email: 'aannemer@aanbouwplatform.nl', phone: '+31 6 21345678', role: 'aannemer', avatarColor: '#f97316', companyId: 'b_brabant', lastActive: hoursAgo(1), title: 'Eigenaar / Projectleider' },
  { id: 'u_klant', name: 'Familie Jansen', email: 'klant@aanbouwplatform.nl', phone: '+31 6 49887766', role: 'klant', avatarColor: '#15426b', lastActive: hoursAgo(3), title: 'Particuliere opdrachtgever' },
];

// --- bouwbedrijven ---------------------------------------------------------
export const bouwbedrijven: Bouwbedrijf[] = [
  {
    id: 'b_brabant', name: 'Brabant Bouw Experts', kvk: '17654321',
    contactPerson: 'Tom Verhoeven', phone: '+31 6 21345678', email: 'aannemer@aanbouwplatform.nl',
    website: 'https://brabantbouwexperts.nl',
    address: 'Ringbaan-Oost 142', postcode: '5018 HK', city: 'Tilburg', region: 'Noord-Brabant',
    status: 'actief', verified: true,
    services: ['aanbouw', 'uitbouw', 'dakopbouw', 'garage-ombouw', 'fundering', 'kozijnen', 'schuifpui'],
    workArea: {
      postcodes: ['46', '47', '48', '49', '50', '51', '52'],
      cities: ['Tilburg', 'Breda', 'Eindhoven', "'s-Hertogenbosch", 'Oss', 'Waalwijk'],
      regions: ['Noord-Brabant'],
      radiusKm: 45,
    },
    description: 'Specialist in prefab en traditionele aanbouwen, uitbouwen en dakopbouwen door heel Noord-Brabant. Eigen funderings- en timmerploeg, vaste prijsafspraken en 10 jaar garantie.',
    rating: 4.8, reviewCount: 64, completedProjects: 187,
    credits: 12, leadPrice: 45, accentColor: '#f97316', createdAt: daysAgo(540),
  },
  {
    id: 'b_kempen', name: 'Kempen Aanbouw & Renovatie', kvk: '18223344',
    contactPerson: 'Sanne Bartels', phone: '+31 6 33221100', email: 'info@kempenaanbouw.nl',
    website: 'https://kempenaanbouw.nl',
    address: 'Industrieweg 8', postcode: '5531 AB', city: 'Bladel', region: 'Noord-Brabant',
    status: 'actief', verified: true,
    services: ['aanbouw', 'uitbouw', 'garage-ombouw', 'gevelafwerking', 'vergunning-begeleiding'],
    workArea: { postcodes: ['55', '56', '50'], cities: ['Eindhoven', 'Bladel', 'Veldhoven'], regions: ['Noord-Brabant'], radiusKm: 35 },
    description: 'Familiebedrijf gespecialiseerd in uitbouwen en garage-ombouwen in de Kempen en regio Eindhoven.',
    rating: 4.6, reviewCount: 38, completedProjects: 92,
    credits: 6, leadPrice: 40, accentColor: '#15426b', createdAt: daysAgo(300),
  },
  {
    id: 'b_randstad', name: 'Randstad Bouwgroep', kvk: '34112299',
    contactPerson: 'Erik de Wit', phone: '+31 6 55443322', email: 'contact@randstadbouwgroep.nl',
    address: 'Schiehavenkade 22', postcode: '3024 EB', city: 'Rotterdam', region: 'Zuid-Holland',
    status: 'actief', verified: false,
    services: ['aanbouw', 'uitbouw', 'dakopbouw', 'staalconstructie', 'schuifpui'],
    workArea: { postcodes: ['30', '31', '24', '25'], cities: ['Rotterdam', 'Den Haag', 'Delft'], regions: ['Zuid-Holland'], radiusKm: 40 },
    description: 'Grootstedelijke aan- en uitbouwen met staalconstructies en grote glaspartijen.',
    rating: 4.3, reviewCount: 21, completedProjects: 54,
    credits: 0, leadPrice: 50, accentColor: '#0ea5e9', createdAt: daysAgo(120),
  },
  {
    id: 'b_gelderland', name: 'Veluwe Verbouw', kvk: '09887766',
    contactPerson: 'Marloes Brink', phone: '+31 6 11992288', email: 'info@veluweverbouw.nl',
    address: 'Apeldoornseweg 301', postcode: '6816 SV', city: 'Arnhem', region: 'Gelderland',
    status: 'prospect', verified: false,
    services: ['aanbouw', 'dakopbouw', 'kozijnen', 'gevelafwerking'],
    workArea: { postcodes: ['68', '73', '66'], cities: ['Arnhem', 'Apeldoorn', 'Nijmegen'], regions: ['Gelderland'], radiusKm: 30 },
    description: 'Aanmelding in behandeling — verbouwspecialist regio Veluwe.',
    rating: 0, reviewCount: 0, completedProjects: 0,
    credits: 0, leadPrice: 40, accentColor: '#10b981', createdAt: daysAgo(8),
  },
];

// --- aanvragen -------------------------------------------------------------
interface Seed {
  buildType: BuildType;
  klantName: string;
  plaats: string;
  postcode: string;
  status: RequestStatus;
  leadStatus: LeadStatus;
  assignedCompanyId?: string;
  breedte: number; diepte: number; afwerking: Aanvraag['afwerking'];
  budgetIndicatie: number; value: number;
  fundering: Aanvraag['funderingNodig']; vergunning: Aanvraag['vergunningNodig'];
  startdatum: string; toelichting: string;
  ageDays: number;
}

const seeds: Seed[] = [
  { buildType: 'Aanbouw', klantName: 'Familie Jansen', plaats: 'Tilburg', postcode: '5012 AB', status: 'Geaccepteerd', leadStatus: 'Geaccepteerd', assignedCompanyId: 'b_brabant', breedte: 4, diepte: 5, afwerking: 'standaard', budgetIndicatie: 50000, value: 52000, fundering: 'ja', vergunning: 'ja', startdatum: 'Binnen 3 maanden', toelichting: 'Aanbouw aan de achterzijde voor een grotere woonkeuken met schuifpui naar de tuin.', ageDays: 4 },
  { buildType: 'Uitbouw', klantName: 'Dhr. de Vries', plaats: 'Breda', postcode: '4811 CC', status: 'Toegewezen', leadStatus: 'Nieuw', assignedCompanyId: 'b_brabant', breedte: 3, diepte: 4, afwerking: 'luxe', budgetIndicatie: 50000, value: 48000, fundering: 'ja', vergunning: 'nee', startdatum: 'Binnen 6 maanden', toelichting: 'Uitbouw woonkamer 12 m², luxe afwerking met vloerverwarming.', ageDays: 1 },
  { buildType: 'Dakopbouw', klantName: 'Mevr. El Amrani', plaats: 'Eindhoven', postcode: '5611 DD', status: 'Nieuw', leadStatus: 'Nieuw', breedte: 6, diepte: 8, afwerking: 'standaard', budgetIndicatie: 75000, value: 71000, fundering: 'nee', vergunning: 'ja', startdatum: 'Dit jaar nog', toelichting: 'Extra verdieping op rijtjeswoning, twee slaapkamers en een badkamer.', ageDays: 0 },
  { buildType: 'Garage ombouw', klantName: 'Familie Koster', plaats: "'s-Hertogenbosch", postcode: '5212 EE', status: 'Offerte verstuurd', leadStatus: 'Geaccepteerd', assignedCompanyId: 'b_brabant', breedte: 3, diepte: 6, afwerking: 'standaard', budgetIndicatie: 30000, value: 28500, fundering: 'nee', vergunning: 'nee', startdatum: 'Binnen 3 maanden', toelichting: 'Garage ombouwen tot thuiskantoor + bijkeuken.', ageDays: 9 },
  { buildType: 'Mantelzorgwoning', klantName: 'Dhr. Peeters', plaats: 'Oss', postcode: '5341 FF', status: 'In onderhandeling', leadStatus: 'Geaccepteerd', assignedCompanyId: 'b_brabant', breedte: 6, diepte: 8, afwerking: 'luxe', budgetIndicatie: 105000, value: 98000, fundering: 'ja', vergunning: 'ja', startdatum: 'Zo snel mogelijk', toelichting: 'Mantelzorgwoning in de tuin voor schoonmoeder, gelijkvloers met inloopdouche.', ageDays: 14 },
  { buildType: 'Aanbouw', klantName: 'Familie Hendriks', plaats: 'Waalwijk', postcode: '5142 GG', status: 'Gewonnen', leadStatus: 'Geaccepteerd', assignedCompanyId: 'b_brabant', breedte: 4, diepte: 4, afwerking: 'standaard', budgetIndicatie: 50000, value: 49000, fundering: 'ja', vergunning: 'ja', startdatum: 'Binnen 3 maanden', toelichting: 'Aanbouw keuken — getekend, plaatsing ingepland.', ageDays: 26 },
  { buildType: 'Uitbouw', klantName: 'Mevr. Smit', plaats: 'Tilburg', postcode: '5046 HH', status: 'Verloren', leadStatus: 'Geaccepteerd', assignedCompanyId: 'b_brabant', breedte: 3, diepte: 3, afwerking: 'casco', budgetIndicatie: 30000, value: 26000, fundering: 'nee', vergunning: 'nee', startdatum: 'Geen haast', toelichting: 'Koos uiteindelijk voor een andere aannemer op prijs.', ageDays: 33 },
  { buildType: 'Poolhouse', klantName: 'Dhr. van Dijk', plaats: 'Rotterdam', postcode: '3024 II', status: 'Nieuw', leadStatus: 'Nieuw', breedte: 5, diepte: 4, afwerking: 'luxe', budgetIndicatie: 50000, value: 42000, fundering: 'ja', vergunning: 'weet ik niet', startdatum: 'Binnen 6 maanden', toelichting: 'Poolhouse met sauna en buitenkeuken.', ageDays: 2 },
  { buildType: 'Dakopbouw', klantName: 'Familie Bakker', plaats: 'Den Haag', postcode: '2511 JJ', status: 'Toegewezen', leadStatus: 'Nieuw', assignedCompanyId: 'b_randstad', breedte: 5, diepte: 7, afwerking: 'standaard', budgetIndicatie: 75000, value: 68000, fundering: 'nee', vergunning: 'ja', startdatum: 'Dit jaar nog', toelichting: 'Opbouw met dakterras.', ageDays: 3 },
  { buildType: 'Anders', klantName: 'Mevr. Groot', plaats: 'Delft', postcode: '2611 KK', status: 'Nieuw', leadStatus: 'Nieuw', breedte: 0, diepte: 0, afwerking: 'standaard', budgetIndicatie: 30000, value: 30000, fundering: 'weet ik niet', vergunning: 'weet ik niet', startdatum: 'Oriënterend', toelichting: 'Algehele renovatie + kleine aanbouw, graag advies.', ageDays: 5 },
];

let counter = 40;
export const aanvragen: Aanvraag[] = seeds.map((s, i) => {
  counter += 1;
  const opp = s.breedte && s.diepte ? s.breedte * s.diepte : 0;
  const id = `a_${i + 1}`;
  const timeline: Aanvraag['timeline'] = [
    { id: `tl_${i}_1`, type: 'system', message: 'Aanvraag ingediend via aanvraagformulier', author: 'Systeem', at: daysAgo(s.ageDays) },
  ];
  if (s.assignedCompanyId) {
    timeline.push({ id: `tl_${i}_2`, type: 'assign', message: 'Lead toegewezen aan bouwbedrijf', author: 'Platform Beheer', at: daysAgo(Math.max(0, s.ageDays - 1)) });
  }
  if (s.leadStatus === 'Geaccepteerd') {
    timeline.push({ id: `tl_${i}_3`, type: 'status', message: 'Lead geaccepteerd door aannemer', author: 'Brabant Bouw Experts', at: daysAgo(Math.max(0, s.ageDays - 2)) });
  }
  return {
    id,
    number: `AP-2026-${String(counter).padStart(4, '0')}`,
    klantId: s.klantName === 'Familie Jansen' ? 'u_klant' : `k_${i + 1}`,
    klantName: s.klantName,
    phone: s.klantName === 'Familie Jansen' ? '+31 6 49887766' : `+31 6 4${String(1000000 + i).slice(0, 7)}`,
    email: s.klantName === 'Familie Jansen' ? 'klant@aanbouwplatform.nl' : `${s.klantName.toLowerCase().replace(/[^a-z]/g, '')}@example.nl`,
    postcode: s.postcode,
    plaats: s.plaats,
    buildType: s.buildType,
    breedte: s.breedte,
    diepte: s.diepte,
    oppervlakte: opp,
    afwerking: s.afwerking,
    bestaandeWoning: s.buildType !== 'Poolhouse',
    funderingNodig: s.fundering,
    vergunningNodig: s.vergunning,
    startdatum: s.startdatum,
    budgetIndicatie: s.budgetIndicatie,
    toelichting: s.toelichting,
    status: s.status,
    value: s.value,
    assignedCompanyId: s.assignedCompanyId,
    leadStatus: s.leadStatus,
    timeline,
    createdAt: daysAgo(s.ageDays),
    updatedAt: daysAgo(Math.max(0, s.ageDays - 2)),
  };
});

// --- offertes --------------------------------------------------------------
export const offertes: Offerte[] = [
  {
    id: 'o_1', number: 'OFF-2026-0101', aanvraagId: 'a_4', companyId: 'b_brabant', klantName: 'Familie Koster',
    status: 'Verzonden',
    lines: [
      { id: 'ol_1', description: 'Garage ombouw tot leefruimte — sloop, isolatie & afwerking (18 m²)', quantity: 1, unitPrice: 21500, vatRate: 21 },
      { id: 'ol_2', description: 'Nieuwe kozijnen + dubbel glas', quantity: 1, unitPrice: 4200, vatRate: 21 },
      { id: 'ol_3', description: 'Elektra & vloerverwarming', quantity: 1, unitPrice: 2800, vatRate: 21 },
    ],
    discountPct: 0, notes: 'Geldig 30 dagen. Startdatum in overleg.',
    introText: 'Beste familie Koster, hartelijk dank voor uw aanvraag. Hierbij onze offerte voor het ombouwen van uw garage.',
    createdAt: daysAgo(7), validUntil: daysAhead(23),
  },
  {
    id: 'o_2', number: 'OFF-2026-0102', aanvraagId: 'a_5', companyId: 'b_brabant', klantName: 'Dhr. Peeters',
    status: 'Verzonden',
    lines: [
      { id: 'ol_4', description: 'Prefab mantelzorgwoning 48 m² — casco geplaatst', quantity: 1, unitPrice: 78000, vatRate: 21 },
      { id: 'ol_5', description: 'Fundering & grondwerk', quantity: 1, unitPrice: 11500, vatRate: 21 },
      { id: 'ol_6', description: 'Luxe afwerking + sanitair', quantity: 1, unitPrice: 8500, vatRate: 21 },
    ],
    discountPct: 3, notes: 'Inclusief vergunningsbegeleiding.',
    introText: 'Beste heer Peeters, hierbij onze uitgewerkte offerte voor de mantelzorgwoning.',
    createdAt: daysAgo(10), validUntil: daysAhead(20),
  },
  {
    id: 'o_3', number: 'OFF-2026-0100', aanvraagId: 'a_6', companyId: 'b_brabant', klantName: 'Familie Hendriks',
    status: 'Geaccepteerd',
    lines: [
      { id: 'ol_7', description: 'Aanbouw keuken 16 m² inclusief fundering', quantity: 1, unitPrice: 44000, vatRate: 21 },
      { id: 'ol_8', description: 'Schuifpui 3 meter', quantity: 1, unitPrice: 4800, vatRate: 21 },
    ],
    discountPct: 0, notes: 'Akkoord per e-mail ontvangen — plaatsing ingepland.',
    createdAt: daysAgo(22), validUntil: daysAhead(8),
  },
  {
    id: 'o_4', number: 'OFF-2026-0097', aanvraagId: 'a_1', companyId: 'b_brabant', klantName: 'Familie Jansen',
    status: 'Concept',
    lines: [
      { id: 'ol_9', description: 'Aanbouw woonkeuken 20 m² — casco geplaatst', quantity: 1, unitPrice: 38000, vatRate: 21 },
      { id: 'ol_10', description: 'Schuifpui 4 meter naar tuin', quantity: 1, unitPrice: 6500, vatRate: 21 },
      { id: 'ol_11', description: 'Fundering & grondwerk', quantity: 1, unitPrice: 7500, vatRate: 21 },
    ],
    discountPct: 0, notes: 'Nog niet verzonden — wacht op bevestiging afmetingen.',
    createdAt: daysAgo(2), validUntil: daysAhead(28),
  },
];

// --- berichten -------------------------------------------------------------
export const berichten: Bericht[] = [
  { id: 'm_1', aanvraagId: 'a_1', companyId: 'b_brabant', fromRole: 'aannemer', author: 'Brabant Bouw Experts', body: 'Beste familie Jansen, bedankt voor uw aanvraag! We komen graag langs om in te meten. Schikt aanstaande donderdag 14:00?', at: daysAgo(3), read: true },
  { id: 'm_2', aanvraagId: 'a_1', companyId: 'b_brabant', fromRole: 'klant', author: 'Familie Jansen', body: 'Donderdag is prima, tot dan!', at: daysAgo(3), read: true },
  { id: 'm_3', aanvraagId: 'a_1', companyId: 'b_brabant', fromRole: 'aannemer', author: 'Brabant Bouw Experts', body: 'Top, genoteerd. We sturen daarna een concept-offerte met de definitieve afmetingen.', at: daysAgo(2), read: false },
];

// --- notifications ---------------------------------------------------------
export const notifications: AppNotification[] = [
  { id: 'n_1', role: 'aannemer', companyId: 'b_brabant', title: 'Nieuwe lead toegewezen', body: 'Uitbouw — Dhr. de Vries, Breda (12 m²).', level: 'info', read: false, at: hoursAgo(2) },
  { id: 'n_2', role: 'aannemer', companyId: 'b_brabant', title: 'Offerte bekeken', body: 'Familie Koster heeft uw offerte OFF-2026-0101 geopend.', level: 'info', read: false, at: hoursAgo(6) },
  { id: 'n_3', role: 'admin', title: 'Nieuw bouwbedrijf', body: 'Veluwe Verbouw heeft zich aangemeld en wacht op verificatie.', level: 'warn', read: false, at: hoursAgo(20) },
  { id: 'n_4', role: 'admin', title: 'Nieuwe aanvraag', body: 'Dakopbouw — Mevr. El Amrani, Eindhoven (€71.000).', level: 'info', read: false, at: hoursAgo(1) },
  { id: 'n_5', role: 'klant', klantId: 'u_klant', title: 'Nieuw bericht', body: 'Brabant Bouw Experts heeft op uw aanvraag gereageerd.', level: 'info', read: false, at: hoursAgo(48) },
];
