// ============================================================================
// Fase 4 — dummy analytics-laag voor de management-dashboards.
// ----------------------------------------------------------------------------
// Alle cijfers zijn deterministisch (vaste seed) zodat grafieken en rapporten
// stabiel zijn. Elke functie heeft de vorm die de echte koppeling (Meta
// Marketing API, Google Analytics Data API, Search Console) straks teruggeeft.
// ============================================================================

// --- Kleuren voor grafieken ---
export const CHART_KLEUREN = ["#2563eb", "#7c3aed", "#0891b2", "#f59e0b", "#10b981", "#f43f5e", "#64748b"];

// --- Marketingkanalen ---
export type Kanaal = "website" | "configurator" | "meta_ads" | "google_ads" | "organisch" | "telefonisch";
export const KANAAL_LABEL: Record<Kanaal, string> = {
  website: "Website",
  configurator: "Configurator",
  meta_ads: "Meta Ads",
  google_ads: "Google Ads",
  organisch: "Organisch",
  telefonisch: "Telefonisch",
};

// ---------------------------------------------------------------------------
// MODULE 2 — Meta Ads (Marketing API)
// ---------------------------------------------------------------------------
export interface MetaAd {
  naam: string;
  kosten: number;
  bereik: number;
  klikken: number;
  leads: number;
}
export interface MetaAdset {
  naam: string;
  ads: MetaAd[];
}
export interface MetaCampaign {
  id: string;
  naam: string;
  projecttype: string;
  kosten: number;
  bereik: number;
  klikken: number;
  leads: number;
  cpl: number; // cost per lead
  ctr: number; // click-through rate %
  conversie: number; // % klik -> lead
  adsets: MetaAdset[];
}

function maakCampagne(
  id: string,
  naam: string,
  projecttype: string,
  kosten: number,
  bereik: number,
  klikken: number,
  leads: number,
  adsets: MetaAdset[],
): MetaCampaign {
  return {
    id,
    naam,
    projecttype,
    kosten,
    bereik,
    klikken,
    leads,
    cpl: Math.round(kosten / leads),
    ctr: +((klikken / bereik) * 100).toFixed(2),
    conversie: +((leads / klikken) * 100).toFixed(1),
    adsets,
  };
}

export function getMetaCampaigns(): MetaCampaign[] {
  return [
    maakCampagne("camp-uitbouw", "Uitbouw campagne", "Uitbouw", 1840, 142000, 3120, 38, [
      { naam: "Uitbouw — Zeeland", ads: [
        { naam: "Carrousel modern", kosten: 960, bereik: 76000, klikken: 1680, leads: 21 },
        { naam: "Video tijdlapse", kosten: 880, bereik: 66000, klikken: 1440, leads: 17 },
      ]},
    ]),
    maakCampagne("camp-poolhouse", "Poolhouse campagne", "Poolhouse", 1260, 98000, 2010, 21, [
      { naam: "Poolhouse — Brabant", ads: [
        { naam: "Lifestyle foto", kosten: 700, bereik: 54000, klikken: 1120, leads: 12 },
        { naam: "Voor/na", kosten: 560, bereik: 44000, klikken: 890, leads: 9 },
      ]},
    ]),
    maakCampagne("camp-dakopbouw", "Dakopbouw campagne", "Dakopbouw", 980, 71000, 1490, 16, [
      { naam: "Dakopbouw — retargeting", ads: [
        { naam: "Statisch + USP", kosten: 980, bereik: 71000, klikken: 1490, leads: 16 },
      ]},
    ]),
    maakCampagne("camp-mantel", "Mantelzorgwoning campagne", "Mantelzorgwoning", 2140, 168000, 3650, 44, [
      { naam: "Mantelzorg — Zeeland", ads: [
        { naam: "Emotioneel verhaal", kosten: 1180, bereik: 92000, klikken: 2010, leads: 25 },
        { naam: "Subsidie-USP", kosten: 960, bereik: 76000, klikken: 1640, leads: 19 },
      ]},
    ]),
  ];
}

export function getMetaTotalen(camps: MetaCampaign[]) {
  const kosten = camps.reduce((s, c) => s + c.kosten, 0);
  const leads = camps.reduce((s, c) => s + c.leads, 0);
  const klikken = camps.reduce((s, c) => s + c.klikken, 0);
  const bereik = camps.reduce((s, c) => s + c.bereik, 0);
  return { kosten, leads, klikken, bereik, cpl: Math.round(kosten / leads), ctr: +((klikken / bereik) * 100).toFixed(2) };
}

// ---------------------------------------------------------------------------
// MODULE 3 — Google Analytics 4
// ---------------------------------------------------------------------------
export interface GaBron { bron: string; sessies: number; aandeel: number }
export interface GaPagina { pad: string; weergaven: number }
export interface GaPunt { datum: string; bezoekers: number; sessies: number }

export function getGa(dagen = 30) {
  const reeks: GaPunt[] = [];
  let bezoekers = 0;
  let sessies = 0;
  for (let i = dagen - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const b = 240 + Math.round(70 * Math.sin(i / 3)) + ((i * 37) % 90);
    const s = Math.round(b * 1.25);
    bezoekers += b;
    sessies += s;
    reeks.push({ datum: `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}`, bezoekers: b, sessies: s });
  }
  const bronnenRuw = [
    { bron: "Google Organic", sessies: 4120 },
    { bron: "Google Ads", sessies: 2380 },
    { bron: "Meta Ads", sessies: 1960 },
    { bron: "Direct", sessies: 1240 },
    { bron: "Social", sessies: 720 },
    { bron: "Referral", sessies: 480 },
  ];
  const totB = bronnenRuw.reduce((s, b) => s + b.sessies, 0);
  const bronnen: GaBron[] = bronnenRuw.map((b) => ({ ...b, aandeel: Math.round((b.sessies / totB) * 100) }));
  const topPaginas: GaPagina[] = [
    { pad: "/", weergaven: 8420 },
    { pad: "/configurator", weergaven: 5210 },
    { pad: "/mantelzorgwoning", weergaven: 3980 },
    { pad: "/poolhouse", weergaven: 3110 },
    { pad: "/prefab-uitbouw", weergaven: 2740 },
    { pad: "/offerte-aanvragen", weergaven: 1890 },
  ];
  return {
    kpis: {
      bezoekers,
      sessies,
      paginaweergaven: Math.round(sessies * 3.4),
      conversies: Math.round(sessies * 0.038),
    },
    reeks,
    bronnen,
    topPaginas,
  };
}

// ---------------------------------------------------------------------------
// MODULE 4 — Leadbron-analyse
// ---------------------------------------------------------------------------
export interface LeadbronRij {
  kanaal: Kanaal;
  leads: number;
  omzet: number;
  conversie: number; // %
  gemWaarde: number;
}

export function getLeadbronnen(): LeadbronRij[] {
  const ruw: { kanaal: Kanaal; leads: number; gewonnen: number; omzet: number }[] = [
    { kanaal: "website", leads: 64, gewonnen: 18, omzet: 1180000 },
    { kanaal: "configurator", leads: 41, gewonnen: 14, omzet: 940000 },
    { kanaal: "meta_ads", leads: 119, gewonnen: 22, omzet: 1460000 },
    { kanaal: "google_ads", leads: 73, gewonnen: 16, omzet: 1010000 },
    { kanaal: "organisch", leads: 38, gewonnen: 12, omzet: 870000 },
    { kanaal: "telefonisch", leads: 16, gewonnen: 7, omzet: 560000 },
  ];
  return ruw.map((r) => ({
    kanaal: r.kanaal,
    leads: r.leads,
    omzet: r.omzet,
    conversie: +((r.gewonnen / r.leads) * 100).toFixed(1),
    gemWaarde: Math.round(r.omzet / r.gewonnen),
  }));
}

// ---------------------------------------------------------------------------
// MODULE 5 — Omzet
// ---------------------------------------------------------------------------
const MAANDEN = ["jan", "feb", "mrt", "apr", "mei", "jun", "jul", "aug", "sep", "okt", "nov", "dec"];

export function getOmzet() {
  const huidigeMaand = new Date().getMonth();
  const perMaand = Array.from({ length: 12 }, (_, i) => {
    const m = (huidigeMaand - 11 + i + 12) % 12;
    const basis = 180000 + ((i * 53) % 120) * 1000 + Math.round(60000 * Math.sin(i / 2));
    return { maand: MAANDEN[m], omzet: Math.max(120000, basis), doel: 220000 };
  });
  const perType = [
    { type: "Uitbouw", omzet: 1240000 },
    { type: "Dakopbouw", omzet: 720000 },
    { type: "Poolhouse", omzet: 980000 },
    { type: "Mantelzorgwoning", omzet: 1520000 },
    { type: "Recreatiewoning", omzet: 1130000 },
  ];
  const perRegio = [
    { regio: "Zeeland", omzet: 1680000 },
    { regio: "West-Brabant", omzet: 1320000 },
    { regio: "Zuid-Holland", omzet: 980000 },
    { regio: "Noord-Brabant", omzet: 860000 },
    { regio: "Overig", omzet: 750000 },
  ];
  const perMedewerker = [
    { naam: "Kelly", omzet: 1460000 },
    { naam: "Mark", omzet: 1180000 },
    { naam: "Sanne", omzet: 1320000 },
    { naam: "Tom", omzet: 630000 },
  ];
  return { perMaand, perType, perRegio, perMedewerker };
}

// ---------------------------------------------------------------------------
// MODULE 6 — KPI's
// ---------------------------------------------------------------------------
export interface Kpis {
  marketingbudget: number;
  leads: number;
  afspraken: number;
  offertes: number;
  gewonnen: number;
  kostenPerLead: number;
  kostenPerAfspraak: number;
  kostenPerOfferte: number;
  kostenPerGewonnen: number;
  gemProjectwaarde: number;
  sluitingspercentage: number; // gewonnen / offertes
}

export function getKpis(): Kpis {
  const bronnen = getLeadbronnen();
  const leads = bronnen.reduce((s, b) => s + b.leads, 0);
  const totaleOmzet = bronnen.reduce((s, b) => s + b.omzet, 0);
  const gewonnen = bronnen.reduce((s, b) => s + Math.round(b.omzet / b.gemWaarde), 0);
  const afspraken = 184;
  const offertes = 112;
  const meta = getMetaTotalen(getMetaCampaigns());
  const googleAds = 3400; // dummy Google Ads-budget
  const marketingbudget = meta.kosten + googleAds;
  return {
    marketingbudget,
    leads,
    afspraken,
    offertes,
    gewonnen,
    kostenPerLead: Math.round(marketingbudget / leads),
    kostenPerAfspraak: Math.round(marketingbudget / afspraken),
    kostenPerOfferte: Math.round(marketingbudget / offertes),
    kostenPerGewonnen: Math.round(marketingbudget / gewonnen),
    gemProjectwaarde: Math.round(totaleOmzet / gewonnen),
    sluitingspercentage: +((gewonnen / offertes) * 100).toFixed(1),
  };
}

// ---------------------------------------------------------------------------
// MODULE 7 — Configurator analytics
// ---------------------------------------------------------------------------
export function getConfigurator() {
  const gestart = 1840;
  const voltooid = 412;
  return {
    gestart,
    voltooid,
    conversie: +((voltooid / gestart) * 100).toFixed(1),
    trechter: [
      { stap: "Gestart", aantal: gestart },
      { stap: "Type gekozen", aantal: 1320 },
      { stap: "Afmetingen", aantal: 910 },
      { stap: "Afwerking", aantal: 640 },
      { stap: "Voltooid", aantal: voltooid },
    ],
    populair: {
      gevelbekleding: [
        { optie: "Zwart hout (rabat)", aantal: 168 },
        { optie: "Antraciet keralit", aantal: 121 },
        { optie: "Wit stucwerk", aantal: 84 },
        { optie: "Steenstrips", aantal: 39 },
      ],
      kozijnen: [
        { optie: "Antraciet aluminium", aantal: 214 },
        { optie: "Zwart kunststof", aantal: 132 },
        { optie: "Hout (naturel)", aantal: 66 },
      ],
      dakafwerking: [
        { optie: "Plat dak (EPDM)", aantal: 238 },
        { optie: "Zadeldak", aantal: 121 },
        { optie: "Lessenaarsdak", aantal: 53 },
      ],
      afmetingen: [
        { optie: "Klein (< 20 m²)", aantal: 96 },
        { optie: "Middel (20–40 m²)", aantal: 207 },
        { optie: "Groot (> 40 m²)", aantal: 109 },
      ],
    },
  };
}
