"use client";

// ============================================================================
// Centrale client-side store (Zustand + localStorage).
// ----------------------------------------------------------------------------
// In het prototype is dit de "database". Alle pagina's lezen en muteren hier.
// De acties zijn bewust hetzelfde van vorm als straks de Supabase-calls, zodat
// we de implementatie 1-op-1 kunnen vervangen zonder de UI te raken.
// ============================================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Appointment,
  Lead,
  Note,
  PipelineStage,
  ProductType,
  Quote,
  QuoteEmailLog,
  QuoteLine,
  QuoteRequest,
  Task,
  UploadedFile,
} from "./types";
import {
  seedAppointments,
  seedEmailLogs,
  seedFiles,
  seedIntegrations,
  seedLeads,
  seedNotes,
  seedQuoteRequests,
  seedQuotes,
  seedTasks,
} from "./seed";
import type { Integration } from "./types";
import { volgendQuoteNummer } from "./quote-utils";

function id(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

/** Velden om een nieuwe offerte aan te maken. */
export interface CreateQuoteInput {
  leadId: string;
  projecttype: ProductType;
  projectomschrijving?: string;
  afmetingen?: string;
  werkzaamheden?: string;
  regels: QuoteLine[];
  korting: number;
  notitie?: string;
  voorwaarden?: string;
  geldigTot: string;
}

interface CrmState {
  leads: Lead[];
  notes: Note[];
  tasks: Task[];
  appointments: Appointment[];
  files: UploadedFile[];
  quoteRequests: QuoteRequest[];
  quotes: Quote[];
  emailLogs: QuoteEmailLog[];
  integrations: Integration[];

  // --- Leads / pijplijn ---
  moveLead: (leadId: string, stage: PipelineStage, positie: number) => void;
  reorderInStage: (stage: PipelineStage, geordendeIds: string[]) => void;
  updateLead: (leadId: string, patch: Partial<Lead>) => void;
  addLead: (lead: Omit<Lead, "id" | "positie" | "aangemaaktOp" | "laatsteActiviteit">) => string;

  // --- Notities ---
  addNote: (leadId: string, tekst: string, type?: Note["type"], auteur?: string) => void;

  // --- Taken ---
  addTask: (task: Omit<Task, "id" | "voltooid">) => void;
  toggleTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;

  // --- Afspraken ---
  addAppointment: (afspraak: Omit<Appointment, "id">) => void;
  toggleGoogleSync: (afspraakId: string) => void;

  // --- Bestanden ---
  addFile: (file: Omit<UploadedFile, "id" | "geuploadOp">) => void;
  deleteFile: (fileId: string) => void;

  // --- Offerte-aanvragen ---
  updateQuoteRequest: (reqId: string, patch: Partial<QuoteRequest>) => void;

  // --- Offertes ---
  createQuote: (input: CreateQuoteInput) => string;
  updateQuote: (quoteId: string, patch: Partial<Quote>) => void;
  setQuoteStatus: (quoteId: string, status: Quote["status"]) => void;

  // --- E-maillogs ---
  addEmailLog: (log: Omit<QuoteEmailLog, "id" | "verstuurdOp">) => void;

  // --- Integraties ---
  toggleIntegration: (intId: string) => void;

  reset: () => void;
}

export const useCrm = create<CrmState>()(
  persist(
    (set, get) => ({
      leads: seedLeads,
      notes: seedNotes,
      tasks: seedTasks,
      appointments: seedAppointments,
      files: seedFiles,
      quoteRequests: seedQuoteRequests,
      quotes: seedQuotes,
      emailLogs: seedEmailLogs,
      integrations: seedIntegrations,

      moveLead: (leadId, stage, positie) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId
              ? { ...l, stage, positie, laatsteActiviteit: new Date().toISOString() }
              : l,
          ),
        })),

      reorderInStage: (stage, geordendeIds) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.stage === stage && geordendeIds.includes(l.id)
              ? { ...l, positie: geordendeIds.indexOf(l.id) }
              : l,
          ),
        })),

      updateLead: (leadId, patch) =>
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId
              ? { ...l, ...patch, laatsteActiviteit: new Date().toISOString() }
              : l,
          ),
        })),

      addLead: (lead) => {
        const newId = id("lead");
        const now = new Date().toISOString();
        const positie = get().leads.filter((l) => l.stage === lead.stage).length;
        set((s) => ({
          leads: [
            ...s.leads,
            { ...lead, id: newId, positie, aangemaaktOp: now, laatsteActiviteit: now },
          ],
        }));
        return newId;
      },

      addNote: (leadId, tekst, type = "notitie", auteur = "Jij") =>
        set((s) => ({
          notes: [
            { id: id("note"), leadId, type, tekst, auteur, aangemaaktOp: new Date().toISOString() },
            ...s.notes,
          ],
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, laatsteActiviteit: new Date().toISOString() } : l,
          ),
        })),

      addTask: (task) =>
        set((s) => ({
          tasks: [...s.tasks, { ...task, id: id("task"), voltooid: false }],
        })),

      toggleTask: (taskId) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, voltooid: !t.voltooid } : t)),
        })),

      deleteTask: (taskId) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== taskId) })),

      addAppointment: (afspraak) =>
        set((s) => ({ appointments: [...s.appointments, { ...afspraak, id: id("afspr") }] })),

      toggleGoogleSync: (afspraakId) =>
        set((s) => ({
          appointments: s.appointments.map((a) =>
            a.id === afspraakId ? { ...a, googleSynced: !a.googleSynced } : a,
          ),
        })),

      addFile: (file) =>
        set((s) => ({
          files: [...s.files, { ...file, id: id("file"), geuploadOp: new Date().toISOString() }],
        })),

      deleteFile: (fileId) =>
        set((s) => ({ files: s.files.filter((f) => f.id !== fileId) })),

      updateQuoteRequest: (reqId, patch) =>
        set((s) => ({
          quoteRequests: s.quoteRequests.map((q) =>
            q.id === reqId ? { ...q, ...patch } : q,
          ),
        })),

      createQuote: (input) => {
        const newId = id("quote");
        const nummer = volgendQuoteNummer(get().quotes);
        set((s) => ({
          quotes: [
            ...s.quotes,
            {
              id: newId,
              nummer,
              status: "concept",
              aangemaaktOp: new Date().toISOString(),
              ...input,
            },
          ],
        }));
        return newId;
      },

      updateQuote: (quoteId, patch) =>
        set((s) => ({
          quotes: s.quotes.map((q) => (q.id === quoteId ? { ...q, ...patch } : q)),
        })),

      setQuoteStatus: (quoteId, status) =>
        set((s) => {
          const now = new Date().toISOString();
          return {
            quotes: s.quotes.map((q) => {
              if (q.id !== quoteId) return q;
              const patch: Partial<Quote> = { status };
              if (status === "verstuurd" && !q.verstuurdOp) patch.verstuurdOp = now;
              if (status === "bekeken" && !q.bekekenOp) patch.bekekenOp = now;
              if (status === "geaccepteerd" || status === "afgewezen") patch.beslistOp = now;
              return { ...q, ...patch };
            }),
          };
        }),

      addEmailLog: (log) =>
        set((s) => ({
          emailLogs: [
            { ...log, id: id("mail"), verstuurdOp: new Date().toISOString() },
            ...s.emailLogs,
          ],
        })),

      toggleIntegration: (intId) =>
        set((s) => ({
          integrations: s.integrations.map((i) =>
            i.id === intId
              ? {
                  ...i,
                  verbonden: !i.verbonden,
                  laatsteSync: !i.verbonden ? new Date().toISOString() : i.laatsteSync,
                }
              : i,
          ),
        })),

      reset: () =>
        set({
          leads: seedLeads,
          notes: seedNotes,
          tasks: seedTasks,
          appointments: seedAppointments,
          files: seedFiles,
          quoteRequests: seedQuoteRequests,
          quotes: seedQuotes,
          emailLogs: seedEmailLogs,
          integrations: seedIntegrations,
        }),
    }),
    {
      // v2: offertes uitgebreid met projectvelden, eenheid & e-maillogs (fase 2)
      name: "prefab-crm-store",
      version: 2,
    },
  ),
);

// --- Afgeleide selectors (handig in componenten) ---
export const leadById = (leads: Lead[], leadId: string) =>
  leads.find((l) => l.id === leadId);
