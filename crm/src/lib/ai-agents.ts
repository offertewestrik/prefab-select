// ============================================================================
// Catalogus van beschikbare AI-agents.
// ----------------------------------------------------------------------------
// Vanuit /ai-agents kun je een agent uit deze lijst toevoegen aan je dashboard
// en daarna koppelen aan de Claude-API. Een sjabloon beschrijft alleen wát een
// agent doet; de echte instantie (status, activiteit) leeft in de store.
// ============================================================================

import type { AiAgentCategorie } from "./types";

export interface AiAgentTemplate {
  /** Stabiele sleutel, ook opgeslagen op de toegevoegde agent. */
  key: string;
  naam: string;
  categorie: AiAgentCategorie;
  /** Korte omschrijving van wat de agent voor je doet. */
  rol: string;
  /** Door ons aanbevolen voor Prefab Select. */
  aanbevolen: boolean;
}

export const AI_AGENT_TEMPLATES: AiAgentTemplate[] = [
  {
    key: "leads",
    naam: "Lead-opvolger",
    categorie: "leads",
    rol: "Volgt nieuwe leads binnen enkele minuten op en plant follow-ups in.",
    aanbevolen: true,
  },
  {
    key: "offertes",
    naam: "Offerte-assistent",
    categorie: "offertes",
    rol: "Maakt automatisch een concept-offerte uit configurator-aanvragen.",
    aanbevolen: true,
  },
  {
    key: "email",
    naam: "E-mail-agent",
    categorie: "email",
    rol: "Vat inkomende e-mail samen en stelt antwoorden voor.",
    aanbevolen: true,
  },
  {
    key: "planning",
    naam: "Planning-agent",
    categorie: "planning",
    rol: "Plant bezoek- en inmeetafspraken in en voorkomt dubbele boekingen.",
    aanbevolen: false,
  },
  {
    key: "facturen",
    naam: "Factuur-bewaker",
    categorie: "facturen",
    rol: "Signaleert openstaande en te late facturen en stuurt herinneringen.",
    aanbevolen: false,
  },
  {
    key: "marketing",
    naam: "Marketing-agent",
    categorie: "marketing",
    rol: "Stelt social posts en advertentieteksten voor op basis van projecten.",
    aanbevolen: false,
  },
  {
    key: "rapportage",
    naam: "Rapportage-agent",
    categorie: "rapportage",
    rol: "Maakt wekelijkse omzet- en pijplijn-samenvattingen voor de directie.",
    aanbevolen: false,
  },
];
