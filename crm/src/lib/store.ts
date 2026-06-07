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
  AppNotification,
  Lead,
  Note,
  NotificationType,
  PipelineStage,
  ProductType,
  Quote,
  QuoteEmailLog,
  QuoteLine,
  QuoteRequest,
  ReminderRule,
  Task,
  TaskComment,
  TaskStatus,
  UploadedFile,
  User,
} from "./types";
import {
  seedAppointments,
  seedEmailLogs,
  seedFiles,
  seedIntegrations,
  seedLeads,
  seedNotes,
  seedNotifications,
  seedQuoteRequests,
  seedQuotes,
  seedReminderRules,
  seedTaskComments,
  seedTasks,
  seedUsers,
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
  planning?: string;
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
  users: User[];
  /** Wie is er "ingelogd" (geen echte auth in het prototype). */
  currentUserId: string;
  taskComments: TaskComment[];
  notifications: AppNotification[];
  reminderRules: ReminderRule[];

  // --- Leads / pijplijn ---
  moveLead: (leadId: string, stage: PipelineStage, positie: number) => void;
  reorderInStage: (stage: PipelineStage, geordendeIds: string[]) => void;
  updateLead: (leadId: string, patch: Partial<Lead>) => void;
  addLead: (lead: Omit<Lead, "id" | "positie" | "aangemaaktOp" | "laatsteActiviteit">) => string;

  // --- Notities ---
  addNote: (leadId: string, tekst: string, type?: Note["type"], auteur?: string) => void;

  // --- Taken ---
  addTask: (task: Omit<Task, "id" | "aangemaaktOp">) => string;
  updateTask: (taskId: string, patch: Partial<Task>) => void;
  setTaskStatus: (taskId: string, status: TaskStatus) => void;
  deleteTask: (taskId: string) => void;
  addTaskComment: (taskId: string, tekst: string, auteurId?: string) => void;

  // --- Afspraken ---
  addAppointment: (afspraak: Omit<Appointment, "id">) => string;
  updateAppointment: (afspraakId: string, patch: Partial<Appointment>) => void;
  deleteAppointment: (afspraakId: string) => void;
  toggleGoogleSync: (afspraakId: string) => void;

  // --- Medewerkers ---
  setCurrentUser: (userId: string) => void;
  toggleUserGoogle: (userId: string) => void;

  // --- Notificaties ---
  addNotification: (n: Omit<AppNotification, "id" | "gelezen" | "aangemaaktOp">) => void;
  markNotificationRead: (notifId: string) => void;
  markAllNotificationsRead: () => void;

  // --- Reminders ---
  toggleReminderRule: (ruleId: string) => void;
  updateReminderRule: (ruleId: string, patch: Partial<ReminderRule>) => void;

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
      users: seedUsers,
      currentUserId: "u-kelly",
      taskComments: seedTaskComments,
      notifications: seedNotifications,
      reminderRules: seedReminderRules,

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
        // Notificatie + opvolg-reminder automatisch
        get().addNotification({
          type: "nieuwe_lead",
          titel: "Nieuwe lead",
          tekst: `${lead.naam} toegevoegd${lead.plaats ? ` (${lead.plaats})` : ""}.`,
          link: `/leads/${newId}`,
        });
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

      addTask: (task) => {
        const newId = id("task");
        set((s) => ({
          tasks: [...s.tasks, { ...task, id: newId, aangemaaktOp: new Date().toISOString() }],
        }));
        return newId;
      },

      updateTask: (taskId, patch) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)),
        })),

      setTaskStatus: (taskId, status) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
        })),

      deleteTask: (taskId) =>
        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== taskId),
          taskComments: s.taskComments.filter((c) => c.taskId !== taskId),
        })),

      addTaskComment: (taskId, tekst, auteurId) =>
        set((s) => ({
          taskComments: [
            ...s.taskComments,
            { id: id("tc"), taskId, auteurId: auteurId ?? s.currentUserId, tekst, aangemaaktOp: new Date().toISOString() },
          ],
        })),

      addAppointment: (afspraak) => {
        const newId = id("afspr");
        set((s) => ({ appointments: [...s.appointments, { ...afspraak, id: newId }] }));
        get().addNotification({
          type: "nieuwe_afspraak",
          titel: "Nieuwe afspraak",
          tekst: `${afspraak.titel} — ${new Date(afspraak.start).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}.`,
          link: "/agenda",
          voorUserId: afspraak.medewerkerId,
        });
        return newId;
      },

      updateAppointment: (afspraakId, patch) =>
        set((s) => ({
          appointments: s.appointments.map((a) => (a.id === afspraakId ? { ...a, ...patch } : a)),
        })),

      deleteAppointment: (afspraakId) =>
        set((s) => ({ appointments: s.appointments.filter((a) => a.id !== afspraakId) })),

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

      setQuoteStatus: (quoteId, status) => {
        const quote = get().quotes.find((q) => q.id === quoteId);
        const wasGeaccepteerd = quote?.status === "geaccepteerd";
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
        });
        if (status === "geaccepteerd" && !wasGeaccepteerd && quote) {
          const lead = get().leads.find((l) => l.id === quote.leadId);
          get().addNotification({
            type: "offerte_geaccepteerd",
            titel: "Offerte geaccepteerd",
            tekst: `${lead?.naam ?? "Klant"} accepteerde offerte ${quote.nummer}.`,
            link: `/offertes/${quote.id}`,
          });
        }
      },

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

      setCurrentUser: (userId) => set({ currentUserId: userId }),

      toggleUserGoogle: (userId) =>
        set((s) => ({
          users: s.users.map((u) =>
            u.id === userId ? { ...u, googleConnected: !u.googleConnected } : u,
          ),
        })),

      addNotification: (n) =>
        set((s) => ({
          notifications: [
            { ...n, id: id("notif"), gelezen: false, aangemaaktOp: new Date().toISOString() },
            ...s.notifications,
          ],
        })),

      markNotificationRead: (notifId) =>
        set((s) => ({
          notifications: s.notifications.map((n) =>
            n.id === notifId ? { ...n, gelezen: true } : n,
          ),
        })),

      markAllNotificationsRead: () =>
        set((s) => ({
          notifications: s.notifications.map((n) => ({ ...n, gelezen: true })),
        })),

      toggleReminderRule: (ruleId) =>
        set((s) => ({
          reminderRules: s.reminderRules.map((r) =>
            r.id === ruleId ? { ...r, actief: !r.actief } : r,
          ),
        })),

      updateReminderRule: (ruleId, patch) =>
        set((s) => ({
          reminderRules: s.reminderRules.map((r) =>
            r.id === ruleId ? { ...r, ...patch } : r,
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
          users: seedUsers,
          currentUserId: "u-kelly",
          taskComments: seedTaskComments,
          notifications: seedNotifications,
          reminderRules: seedReminderRules,
        }),
    }),
    {
      // v3: agenda, taken-workflow, medewerkers, reminders & notificaties (fase 3)
      name: "prefab-crm-store",
      version: 3,
    },
  ),
);

// --- Afgeleide selectors / helpers ---
export const userById = (users: User[], userId?: string) =>
  users.find((u) => u.id === userId);

export function userNaam(users: User[], userId?: string): string {
  return users.find((u) => u.id === userId)?.naam ?? "—";
}

// --- Afgeleide selectors (handig in componenten) ---
export const leadById = (leads: Lead[], leadId: string) =>
  leads.find((l) => l.id === leadId);
