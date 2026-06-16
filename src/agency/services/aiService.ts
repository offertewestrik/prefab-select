/**
 * AI service — powers the AI Agents module and the AI Command Center.
 *
 * Right now responses are generated locally from the current data so the
 * experience feels intelligent and grounded in real numbers. To connect a real
 * model, implement `complete()` against a provider and route the helpers
 * through it. The repo already ships `@google/genai` (Gemini); OpenAI and
 * Claude are wired in `.env.example`.
 *
 * Recommended: run the actual model call inside a Cloud Function so API keys
 * stay server-side. The browser calls `/api/ai/complete` with a prompt and the
 * relevant context, and this module formats the prompt + parses the result.
 *
 * Example (server-side, Claude):
 *   import Anthropic from '@anthropic-ai/sdk';
 *   const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
 *   const msg = await client.messages.create({
 *     model: 'claude-opus-4-8',
 *     max_tokens: 1024,
 *     messages: [{ role: 'user', content: prompt }],
 *   });
 */

import type {
  Agent, Company, Lead, Campaign, AgentKind, ContentItem,
} from '../types';
import { formatCurrency } from '../lib/format';

export interface AICommandContext {
  companies: Company[];
  leads: Lead[];
  campaigns: Campaign[];
  activeCompanyId: string | null;
}

export interface AICommandResult {
  text: string;
  intent: string;
  company?: Company;
  suggestions: string[];
}

const delay = <T>(v: T, ms = 650) => new Promise<T>((r) => setTimeout(() => r(v), ms));

function matchCompany(prompt: string, companies: Company[]): Company | undefined {
  const lower = prompt.toLowerCase();
  return companies.find((c) => lower.includes(c.name.toLowerCase()));
}

// ---------------------------------------------------------------------------
// Command Center
// ---------------------------------------------------------------------------

export const aiService = {
  provider(): string {
    const env: any = (import.meta as any).env ?? {};
    if (env.VITE_ANTHROPIC_API_KEY) return 'Claude';
    if (env.VITE_OPENAI_API_KEY) return 'OpenAI';
    if (env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY) return 'Gemini';
    return 'Demo (geen API key)';
  },

  async sendCommand(prompt: string, ctx: AICommandContext): Promise<AICommandResult> {
    const p = prompt.toLowerCase();
    const company = matchCompany(prompt, ctx.companies)
      ?? ctx.companies.find((c) => c.id === ctx.activeCompanyId);
    const scopedLeads = company ? ctx.leads.filter((l) => l.companyId === company.id) : ctx.leads;
    const scopedCampaigns = company ? ctx.campaigns.filter((c) => c.companyId === company.id) : ctx.campaigns;

    let intent = 'algemeen';
    let text = '';
    const suggestions: string[] = [];

    if (/(analyseer|analyse).*(lead|leads)/.test(p) || /leads.*(week|deze)/.test(p)) {
      intent = 'lead-analyse';
      const newLeads = scopedLeads.filter((l) => l.status === 'Nieuw').length;
      const won = scopedLeads.filter((l) => l.status === 'Gewonnen').length;
      const avgScore = Math.round(scopedLeads.reduce((s, l) => s + l.score, 0) / (scopedLeads.length || 1));
      text = `**Lead-analyse${company ? ` — ${company.name}` : ''}**\n\n`
        + `• ${scopedLeads.length} leads in scope, waarvan ${newLeads} nieuw en ${won} gewonnen.\n`
        + `• Gemiddelde lead-score: ${avgScore}/100.\n`
        + `• Belangrijkste bron: ${topBy(scopedLeads.map((l) => l.source))}.\n\n`
        + `**Advies:** focus opvolging op de ${newLeads} nieuwe leads binnen 24u — leads die binnen een dag worden gebeld converteren ~3x beter.`;
      suggestions.push('Plan opvolgtaken voor nieuwe leads', 'Toon leads met hoogste score');
    } else if (/rapport|rapportage/.test(p)) {
      intent = 'rapportage';
      text = `**Conceptrapport${company ? ` — ${company.name}` : ''}**\n\n`
        + `Periode: deze maand.\n`
        + `• Leads: ${scopedLeads.length}\n`
        + `• Pipelinewaarde: ${formatCurrency(scopedLeads.reduce((s, l) => s + l.value, 0))}\n`
        + `• Ad spend: ${formatCurrency(scopedCampaigns.reduce((s, c) => s + c.spend, 0))}\n\n`
        + `Ik heb een conceptrapport klaargezet. Open de Rapportages-module om te exporteren naar PDF.`;
      suggestions.push('Genereer PDF', 'Verstuur naar klant');
    } else if (/firebase|error/.test(p)) {
      intent = 'firebase-check';
      text = `**Firebase check${company ? ` — ${company.name}` : ''}**\n\n`
        + `• Database: operationeel\n• Functions: ⚠️ verhoogde foutmarge (1.8%) op \`sendQuoteEmail\` (Resend rate limit)\n• Hosting & Storage: operationeel\n\n`
        + `**Advies:** voeg retry/backoff toe aan de e-mailfunctie. Zie de Projecten-module → Firebase voor de logs.`;
      suggestions.push('Open Firebase logs', 'Maak taak voor fix');
    } else if (/meta|ads|advies/.test(p)) {
      intent = 'meta-ads-advies';
      const best = [...scopedCampaigns].sort((a, b) => b.roas - a.roas)[0];
      text = `**Meta Ads verbeteradvies${company ? ` — ${company.name}` : ''}**\n\n`
        + (best
          ? `• Beste campagne: "${best.name}" met ROAS ${best.roas} en CPL ${formatCurrency(best.costPerLead)}.\n`
          : '')
        + `• Totale spend: ${formatCurrency(scopedCampaigns.reduce((s, c) => s + c.spend, 0))}.\n\n`
        + `**Advies:** schaal het budget van de best presterende campagne met +20% en pauzeer campagnes met ROAS < 3. Ververs creatives die >14 dagen draaien (ad fatigue).`;
      suggestions.push('Maak optimalisatie-taak', 'Toon alle campagnes');
    } else if (/offerte/.test(p)) {
      intent = 'offerte';
      text = `Ik kan een professionele offerte opstellen. Open de **Offertes**-module en gebruik de knop "AI offertetekst" — ik vul automatisch een nette intro en productregels in op basis van de gekozen lead.`;
      suggestions.push('Ga naar Offertes');
    } else if (/content|post|caption/.test(p)) {
      intent = 'content';
      text = `Ik heb 10 postideeën klaarstaan${company ? ` voor ${company.name}` : ''}. Open de **Content kalender** en klik "10 post ideeën" of "Schrijf caption" om direct te genereren.`;
      suggestions.push('Open Content kalender');
    } else {
      intent = 'algemeen';
      text = `Ik kan helpen met lead-analyses, rapportages, Meta Ads-advies, offertes, content en Firebase-checks. Selecteer een klant en stel je vraag, bijvoorbeeld: _"Analyseer leads van Prefab Select deze week"_.`;
      suggestions.push('Analyseer leads deze week', 'Maak rapportage', 'Meta Ads verbeteradvies');
    }

    return delay({ text, intent, company, suggestions });
  },

  // -------------------------------------------------------------------------
  // Agents
  // -------------------------------------------------------------------------

  async runAgent(agent: Agent, ctx: { company?: Company; leads: Lead[]; campaigns: Campaign[] }): Promise<{ output: string; logLines: string[] }> {
    const out = agentOutput(agent.kind, ctx);
    return delay(out, 1400);
  },

  // -------------------------------------------------------------------------
  // Content helpers
  // -------------------------------------------------------------------------

  async generateContentIdeas(company: Company): Promise<string[]> {
    const sector = company.sector;
    return delay([
      `Achter de schermen: zo werkt ${company.name}`,
      `5 veelgemaakte fouten in ${sector.toLowerCase()}`,
      `Klantverhaal: het resultaat dat onze klant verraste`,
      `Voor & na transformatie (carrousel)`,
      `Mythes over ${sector.toLowerCase()} ontkracht`,
      `Tips van onze experts (reel)`,
      `Veelgestelde vraag van de week beantwoord`,
      `Sneak peek van een lopend project`,
      `Waarom kiezen voor ${company.name}? 3 redenen`,
      `Seizoensactie aankondiging`,
    ], 900);
  },

  async generateCaption(item: Pick<ContentItem, 'title' | 'platform'>): Promise<string> {
    const emoji = item.platform === 'LinkedIn' ? '' : ' ✨';
    return delay(
      `${item.title}${emoji}\n\n`
      + `Benieuwd wat wij voor jou kunnen betekenen? Stuur een bericht of vraag vrijblijvend een offerte aan. `
      + `${item.platform === 'LinkedIn' ? '' : '👉 Link in bio.'}`,
      800,
    );
  },

  async generateQuoteIntro(clientName: string, productSummary: string): Promise<string> {
    return delay(
      `Beste ${clientName},\n\n`
      + `Hartelijk dank voor uw interesse en het vertrouwen. Op basis van ons gesprek hebben wij onderstaande offerte voor "${productSummary}" met zorg voor u samengesteld. `
      + `Wij staan voor kwaliteit, een heldere prijs vooraf en volledige ontzorging van ontwerp tot oplevering.\n\n`
      + `Heeft u vragen of wensen? Neem gerust contact met ons op — wij denken graag met u mee.`,
      900,
    );
  },
};

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function topBy(items: string[]): string {
  const counts = items.reduce<Record<string, number>>((acc, i) => { acc[i] = (acc[i] ?? 0) + 1; return acc; }, {});
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—';
}

function agentOutput(kind: AgentKind, ctx: { company?: Company; leads: Lead[]; campaigns: Campaign[] }): { output: string; logLines: string[] } {
  const c = ctx.company;
  switch (kind) {
    case 'lead-follow-up': {
      const stale = ctx.leads.filter((l) => ['Nieuw', 'Geen gehoor'].includes(l.status));
      return {
        output: `${stale.length} leads zonder recente opvolging gevonden. Herinneringen ingepland en eigenaren genotificeerd.`,
        logLines: ['Leads opgehaald', `${stale.length} leads zonder opvolging`, 'Herinneringen ingepland', 'Eigenaren genotificeerd'],
      };
    }
    case 'quote':
      return { output: 'Conceptofferte gegenereerd op basis van de geselecteerde lead. Klaar voor review in de Offertes-module.', logLines: ['Lead ingelezen', 'Productregels samengesteld', 'Introtekst geschreven', 'Concept opgeslagen'] };
    case 'website-analysis':
      return { output: `Website ${c?.website ?? ''} gescand. PageSpeed mobiel 78/100. Aanbeveling: comprimeer hero-afbeeldingen en stel caching in (-1.2s laadtijd).`, logLines: ['Pagina gecrawld', 'Core Web Vitals gemeten', 'UX gecontroleerd', 'Rapport opgesteld'] };
    case 'seo':
      return { output: '14 zoekwoordkansen gevonden. Top 3: "prefab uitbouw kosten", "mantelzorgwoning prijs", "aanbouw vergunning". 3 contentbriefs aangemaakt.', logLines: ['Zoekwoorden geanalyseerd', 'Concurrentie vergeleken', 'Kansen gerangschikt', 'Briefs gegenereerd'] };
    case 'meta-ads-analysis': {
      const best = [...ctx.campaigns].sort((a, b) => b.roas - a.roas)[0];
      return { output: best ? `Beste campagne: "${best.name}" (ROAS ${best.roas}). Advies: +20% budget en ververs creatives ouder dan 14 dagen.` : 'Geen campagnes gevonden.', logLines: ['Campagnedata opgehaald', 'ROAS berekend', 'Ad fatigue gedetecteerd', 'Advies opgesteld'] };
    }
    case 'content':
      return { output: '10 postideeën en 3 kant-en-klare captions gegenereerd. Beschikbaar in de Content kalender.', logLines: ['Doelgroep geanalyseerd', 'Ideeën gegenereerd', 'Captions geschreven', 'Opgeslagen als concept'] };
    case 'reporting':
      return { output: 'Maandrapport samengesteld met leads, omzet, ad-resultaten en adviespunten. Klaar voor PDF-export.', logLines: ['Bronnen verzameld', 'Metrics berekend', 'Samenvatting geschreven', 'Conceptrapport opgeslagen'] };
    case 'customer-service':
      return { output: '6 openstaande klantvragen beantwoord met conceptantwoorden. Klaar voor verzending na review.', logLines: ['Inbox gescand', 'Intentie geclassificeerd', 'Antwoorden opgesteld', 'Wacht op review'] };
    case 'github-review':
      return { output: 'Code review afgerond: 2 verbeterpunten (input-validatie lead-formulier, ontbrekende error handling in e-mailfunctie).', logLines: ['Repo opgehaald', 'Diff geanalyseerd', 'Issues geïdentificeerd', 'Reviewnotities opgesteld'] };
    case 'firebase-monitor':
      return { output: 'Firebase gecontroleerd: Functions tonen 1.8% foutmarge op sendQuoteEmail (rate limit). Database, Hosting en Storage operationeel.', logLines: ['Metrics opgehaald', 'Foutpercentage berekend', 'Logs gescand', 'Waarschuwing gegenereerd'] };
    default:
      return { output: 'Taak voltooid.', logLines: ['Gestart', 'Verwerkt', 'Voltooid'] };
  }
}
