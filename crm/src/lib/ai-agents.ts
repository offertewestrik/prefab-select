// ============================================================================
// Catalogus van AI-agents voor Prefab Select.
// ----------------------------------------------------------------------------
// Vanuit /ai-agents kun je een agent uit deze lijst toevoegen aan je dashboard
// en daarna koppelen aan de Claude-API. Een sjabloon beschrijft wát een agent
// doet (rol + taken + voorbeeld); de live-instantie (status, activiteit) leeft
// in de store/seed.
// ============================================================================

import type { AiAgentCategorie } from "./types";

export interface AiAgentTemplate {
  /** Stabiele sleutel, ook opgeslagen op de toegevoegde agent. */
  key: string;
  naam: string;
  categorie: AiAgentCategorie;
  /** Korte omschrijving van wat de agent voor je doet. */
  rol: string;
  /** Concrete taken. */
  taken: string[];
  /** Voorbeeld van wat de agent oplevert. */
  voorbeeld: string;
  /** Door ons aanbevolen om als eerste te koppelen. */
  aanbevolen: boolean;
}

export const AI_AGENT_TEMPLATES: AiAgentTemplate[] = [
  {
    key: "ceo",
    naam: "CEO Agent",
    categorie: "directie",
    rol: "Het overkoepelende brein: ziet leads, offertes, omzet, productie, planning, marketing en reviews en meldt wat er speelt.",
    taken: ["Bewaakt alle modules", "Signaleert kansen & risico's", "Geeft wekelijkse directie-inzichten"],
    voorbeeld: "Deze week 18 nieuwe leads · €312.000 aan openstaande offertes · poolhouses converteren 34% beter dan uitbouwen.",
    aanbevolen: true,
  },
  {
    key: "lead_qualification",
    naam: "Lead Qualification Agent",
    categorie: "leads",
    rol: "Analyseert nieuwe aanvragen, schat het budget in en geeft elke lead een score.",
    taken: ["Analyseert nieuwe aanvragen", "Bepaalt budgetindicatie", "Herkent serieuze klanten", "Geeft leadscore"],
    voorbeeld: "Lead uit Eindhoven — uitbouw 25 m² — geschat budget €55.000 — hoge kans op verkoop.",
    aanbevolen: true,
  },
  {
    key: "offerte",
    naam: "Offerte Agent",
    categorie: "offertes",
    rol: "Leest de configurator, berekent de prijs en maakt automatisch een offerte-PDF met productvisuals.",
    taken: ["Leest configurator", "Berekent prijs", "Maakt offerte-PDF", "Voegt productvisuals toe"],
    voorbeeld: "6×4 uitbouw · stucwerk · schuifpui → automatische concept-offerte.",
    aanbevolen: true,
  },
  {
    key: "configurator",
    naam: "Configurator Agent",
    categorie: "configurator",
    rol: "Analyseert de keuzes van de klant, adviseert upgrades en berekent meerwerk.",
    taken: ["Analyseert keuzes", "Adviseert upgrades", "Berekent meerwerk"],
    voorbeeld: "Klant kiest witte stucgevel — adviseer zwarte schuifpui voor een hogere uitstraling.",
    aanbevolen: false,
  },
  {
    key: "follow_up",
    naam: "Follow-Up Agent",
    categorie: "follow_up",
    rol: "Stuurt automatisch WhatsApp, e-mails en herinneringen op het juiste moment.",
    taken: ["WhatsApp versturen", "E-mails versturen", "Herinneringen sturen"],
    voorbeeld: "Dag 1: bedankt voor uw aanvraag · Dag 3: nog vragen over de offerte? · Dag 7: ruimte in de productieplanning.",
    aanbevolen: true,
  },
  {
    key: "bouwkosten",
    naam: "Bouwkosten Agent",
    categorie: "bouwkosten",
    rol: "Bewaakt materiaal-, transport- en montagekosten en waakt over de marge.",
    taken: ["Materiaalkosten", "Transportkosten", "Montagekosten", "Margebewaking"],
    voorbeeld: "Waarschuwing: marge op project Oss is onder 18%.",
    aanbevolen: false,
  },
  {
    key: "productie",
    naam: "Productie Agent",
    categorie: "productie",
    rol: "Volgt de fabriek, houdt modules bij en plant de productie.",
    taken: ["Volgt fabriek", "Houdt modules bij", "Plant productie"],
    voorbeeld: "Status: ontwerp → productie → gereed → transport → geplaatst.",
    aanbevolen: false,
  },
  {
    key: "planning",
    naam: "Planning Agent",
    categorie: "planning",
    rol: "Plant kraan, montageploeg en transport en controleert automatisch op conflicten.",
    taken: ["Plant kraan", "Plant montageploeg", "Plant transport", "Controleert conflicten"],
    voorbeeld: "Montage Breda gepland di 10:00 — geen conflict met kraan of ploeg.",
    aanbevolen: false,
  },
  {
    key: "vergunning",
    naam: "Vergunning Agent",
    categorie: "vergunning",
    rol: "Controleert de vergunningplicht op basis van de afmetingen en geeft waarschuwingen.",
    taken: ["Controleert vergunningplicht", "Analyseert afmetingen", "Geeft waarschuwingen"],
    voorbeeld: "Deze dakopbouw vereist waarschijnlijk een vergunning.",
    aanbevolen: false,
  },
  {
    key: "visual",
    naam: "Visual Agent",
    categorie: "visual",
    rol: "Genereert bij elke aanvraag direct renders, advertenties en social content.",
    taken: ["Genereert renders", "Genereert advertenties", "Genereert social content"],
    voorbeeld: "Buitenaanzicht · binnenaanzicht · Facebook-advertentie — automatisch bij aanvraag.",
    aanbevolen: false,
  },
  {
    key: "seo",
    naam: "SEO Agent",
    categorie: "seo",
    rol: "Bouwt automatisch stadspagina's om lokaal beter gevonden te worden.",
    taken: ["Bouwt stadspagina's", "Optimaliseert teksten", "Houdt vindbaarheid bij"],
    voorbeeld: "Stadspagina's: Oss, Eindhoven, Tilburg, Breda, Nijmegen…",
    aanbevolen: false,
  },
  {
    key: "concurrentie",
    naam: "Concurrentie Agent",
    categorie: "concurrentie",
    rol: "Houdt concurrenten in de gaten en analyseert prijzen, advertenties en nieuwe producten.",
    taken: ["Volgt concurrenten", "Analyseert prijzen", "Analyseert advertenties", "Signaleert nieuwe producten"],
    voorbeeld: "Prefabtotaalbouw verlaagde de prijs van hun standaard uitbouw met 4%.",
    aanbevolen: false,
  },
  {
    key: "klantportaal",
    naam: "Klantportaal Agent",
    categorie: "klantportaal",
    rol: "Bouwt en vult het klantdashboard met de live-status van het project.",
    taken: ["Bouwt klantdashboard", "Toont projectstatus", "Houdt de klant op de hoogte"],
    voorbeeld: "Klant ziet: offerte akkoord ✓ · productie 65% gereed · montage over 5 dagen.",
    aanbevolen: false,
  },
  {
    key: "review",
    naam: "Review Agent",
    categorie: "review",
    rol: "Vraagt na oplevering automatisch reviews en plaatst ze op de website.",
    taken: ["Vraagt reviews", "Verzamelt beoordelingen", "Plaatst reviews op de website"],
    voorbeeld: "Na oplevering: 'Hoe tevreden bent u over Prefab Select?'",
    aanbevolen: false,
  },
];
