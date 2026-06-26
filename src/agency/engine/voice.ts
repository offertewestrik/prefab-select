/**
 * Voice / phone AI agents — per company.
 *
 * The realtime call loop (telephony + speech-to-text + LLM + text-to-speech) is
 * handled by a managed provider via the `VoiceConnector` contract below.
 * Recommended stacks (any one):
 *   - Vapi / Retell AI  (bundle telephony + STT + LLM + TTS, webhook-based)
 *   - ElevenLabs Conversational AI  (excellent Dutch TTS)
 *   - Twilio Programmable Voice + Deepgram + (Claude/GPT/Gemini realtime) + TTS
 *
 * Each company gets its own phone number, persona, knowledge base and script.
 * Inbound: provider answers the call → on hang-up posts a webhook with the
 * transcript → `handleCompletedCall` summarises it (brain) and turns it into a
 * CRM entry (lead/note/task) shown in the dashboard.
 * Outbound: an agent PROPOSES a call (telemarketing rules apply → approval).
 *
 * Compliance (NL/EU): disclose it's an AI and that the call is recorded
 * (EU AI Act transparency + GDPR), honour the "bel-me-niet"/opt-out register for
 * consumer outbound, and always offer a human hand-off.
 */

import type { AgentKind } from '../types';
import type { Brain } from './brain';
import type { AgentRunResult, CompanyContext, ProposedAction } from './types';
import type { AgentDeps } from './agents';

export type CallDirection = 'inbound' | 'outbound';
export type CallOutcome = 'beantwoord' | 'voicemail' | 'geen gehoor' | 'doorverbonden' | 'afspraak gemaakt' | 'lead gekwalificeerd';

export interface CallRecord {
  id: string;
  companyId: string;
  direction: CallDirection;
  fromNumber: string;
  toNumber: string;
  startedAt: string;
  durationSec: number;
  transcript: string;
  summary?: string;
  outcome?: CallOutcome;
  leadId?: string;
  escalatedToHuman: boolean;
}

/** Implement against your provider (Vapi/Retell/ElevenLabs/Twilio). */
export interface VoiceConnector {
  readonly provider: string;
  /** The dedicated phone number for a company (for caller-ID + routing). */
  numberForCompany(companyId: string): Promise<string | undefined>;
  /** Start an outbound call; the provider runs the realtime AI conversation. */
  placeOutboundCall(opts: {
    companyId: string;
    toNumber: string;
    persona: string;
    objective: string;
    knowledgeBase?: string;
  }): Promise<{ callId: string }>;
}

/** Build the per-company persona/system prompt the voice agent speaks with. */
export function buildPersona(c: CompanyContext): string {
  return [
    `Je bent de AI-telefoonassistent van ${c.name} (${c.sector}).`,
    `Spreek Nederlands, vriendelijk en kort. Vermeld bij aanvang dat je een AI-assistent bent en dat het gesprek wordt opgenomen.`,
    c.brandNotes ? `Huisstijl: ${c.brandNotes}` : '',
    `Doelen: ${c.goals.join(', ') || 'klant helpen en kwalificeren'}.`,
    `Kun je iets niet of wil de beller een mens? Verbind direct door of noteer een terugbelverzoek.`,
  ].filter(Boolean).join(' ');
}

/**
 * Post-call: turn a finished call transcript into a CRM summary + action.
 * Runs after the call already happened (so it's an internal write, no approval).
 */
export async function handleCompletedCall(call: CallRecord, c: CompanyContext, deps: AgentDeps): Promise<AgentRunResult> {
  const startedAt = deps.now();
  const text = await deps.brain.generate(
    'Vat dit klantgesprek samen in 3 zinnen, bepaal de uitkomst en stel een vervolgactie voor. Antwoord NL.',
    `Bedrijf: ${c.name}. Transcript:\n${call.transcript.slice(0, 4000)}`,
  );
  const action: ProposedAction = {
    id: deps.id('act'), agentKind: 'customer-service', companyId: c.id, risk: 'internal',
    title: `CRM-update na ${call.direction === 'inbound' ? 'inkomend' : 'uitgaand'} gesprek`,
    summary: text.slice(0, 200),
    payload: { callId: call.id, leadId: call.leadId, summary: text },
    requiresApproval: false, status: 'proposed', createdAt: deps.now(),
  };
  return {
    agentKind: 'customer-service', companyId: c.id, startedAt, finishedAt: deps.now(), ok: true,
    summary: `Gesprek verwerkt voor ${c.name} (${call.outcome ?? 'beantwoord'}).`,
    findings: [{ severity: 'info', title: 'Gesprekssamenvatting', detail: text.slice(0, 160) }],
    actions: [action],
    logLines: [`Brain: ${deps.brain.name}`, `duur: ${call.durationSec}s`, `richting: ${call.direction}`],
  };
}

/**
 * Outbound follow-up agent: proposes calling leads that need a human touch.
 * Outbound calling to consumers is regulated → always requires approval.
 */
export async function runVoiceFollowUpAgent(
  c: CompanyContext, deps: AgentDeps, leadsToCall: { id: string; name: string; phone: string }[],
): Promise<AgentRunResult> {
  const startedAt = deps.now();
  const kind: AgentKind = 'customer-service';
  const actions: ProposedAction[] = leadsToCall.slice(0, 10).map((lead) => ({
    id: deps.id('act'), agentKind: kind, companyId: c.id, risk: 'publish',
    title: `Bel ${lead.name} terug`,
    summary: `Uitgaand AI-belverzoek voor lead ${lead.name}. Vereist goedkeuring (telemarketingregels).`,
    payload: { leadId: lead.id, toNumber: lead.phone, persona: buildPersona(c), objective: 'lead opvolgen en afspraak inplannen' },
    requiresApproval: true, status: 'proposed', createdAt: deps.now(),
  }));
  return {
    agentKind: kind, companyId: c.id, startedAt, finishedAt: deps.now(), ok: true,
    summary: `${actions.length} belvoorstellen klaar (wacht op goedkeuring).`,
    findings: [{ severity: 'info', title: 'Uitgaande gesprekken voorgesteld', detail: leadsToCall.map((l) => l.name).slice(0, 5).join(', ') }],
    actions,
    logLines: [`${actions.length} belvoorstellen`],
  };
}
