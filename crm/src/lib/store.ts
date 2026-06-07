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
  Invoice,
  InvoiceStatus,
  Lead,
  Note,
  NotificationType,
  Payment,
  PaymentMethode,
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
  seedInvoices,
  seedLeads,
  seedNotes,
  seedNotifications,
  seedPayments,
  seedQuoteRequests,
  seedQuotes,
  seedReminderRules,
  seedTaskComments,
  seedTasks,
  seedUsers,
} from "./seed";
import type { Integration } from "./types";
import { volgendQuoteNummer, berekenTotalen } from "./quote-utils";
import { volgendFactuurNummer, TERMIJN_SCHEMA } from "./invoice-utils";

function id(prefix: string): string {
  // UUID zodat de id direct compatibel is met de Supabase uuid-kolommen.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

// ---------------------------------------------------------------------------
// Write-through naar Supabase voor leads (optimistisch; fout = alleen loggen).
// ---------------------------------------------------------------------------
function syncLead(method: "POST" | "PATCH" | "DELETE", body: unknown, leadId?: string) {
  if (typeof window === "undefined") return;
  const url = leadId ? `/api/leads/${leadId}` : "/api/leads";
  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  }).catch((e) => console.error("Lead-synchronisatie mislukt:", e));
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

/** Velden om een nieuwe factuur aan te maken. */
export interface CreateInvoiceInput {
  leadId: string;
  quoteId?: string;
  termijnLabel?: string;
  regels: QuoteLine[];
  korting: number;
  vervaldatum: string;
  notitie?: string;
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
  invoices: Invoice[];
  payments: Payment[];

  // --- Leads / pijplijn ---
  /** Laadt de echte data uit Supabase in de store (bij het opstarten). */
  hydrate: () => void;
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

  // --- Facturen ---
  createInvoice: (input: CreateInvoiceInput) => string;
  updateInvoice: (invoiceId: string, patch: Partial<Invoice>) => void;
  setInvoiceStatus: (invoiceId: string, status: InvoiceStatus) => void;
  deleteInvoice: (invoiceId: string) => void;
  /** Genereert de 4 termijnfacturen (40/30/20/10) uit een geaccepteerde offerte. */
  genereerTermijnfacturen: (quoteId: string) => string[];

  // --- Betalingen ---
  registerPayment: (invoiceId: string, bedrag: number, methode: PaymentMethode) => void;

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
      // Productie: transactionele data start leeg en wordt uit Supabase geladen
      // (zie hydrate). Config-/referentiedata houden we als startwaarde aan.
      leads: [],
      notes: [],
      tasks: [],
      appointments: [],
      files: [],
      quoteRequests: [],
      quotes: [],
      emailLogs: [],
      integrations: seedIntegrations,
      users: seedUsers,
      currentUserId: "u-kelly",
      taskComments: [],
      notifications: [],
      reminderRules: seedReminderRules,
      invoices: [],
      payments: [],

      hydrate: async () => {
        if (typeof window === "undefined") return;
        try {
          const res = await fetch("/api/leads");
          if (res.ok) {
            const leads = (await res.json()) as Lead[];
            if (Array.isArray(leads)) set({ leads });
          }
        } catch (e) {
          console.error("Hydratatie mislukt:", e);
        }
      },

      moveLead: (leadId, stage, positie) => {
        const laatsteActiviteit = new Date().toISOString();
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, stage, positie, laatsteActiviteit } : l,
          ),
        }));
        syncLead("PATCH", { stage, positie, laatsteActiviteit }, leadId);
      },

      reorderInStage: (stage, geordendeIds) => {
        set((s) => ({
          leads: s.leads.map((l) =>
            l.stage === stage && geordendeIds.includes(l.id)
              ? { ...l, positie: geordendeIds.indexOf(l.id) }
              : l,
          ),
        }));
        geordendeIds.forEach((lid, i) => syncLead("PATCH", { positie: i }, lid));
      },

      updateLead: (leadId, patch) => {
        const laatsteActiviteit = new Date().toISOString();
        set((s) => ({
          leads: s.leads.map((l) =>
            l.id === leadId ? { ...l, ...patch, laatsteActiviteit } : l,
          ),
        }));
        syncLead("PATCH", { ...patch, laatsteActiviteit }, leadId);
      },

      addLead: (lead) => {
        const newId = id("lead");
        const now = new Date().toISOString();
        const positie = get().leads.filter((l) => l.stage === lead.stage).length;
        const nieuw = { ...lead, id: newId, positie, aangemaaktOp: now, laatsteActiviteit: now };
        set((s) => ({ leads: [...s.leads, nieuw] }));
        syncLead("POST", nieuw);
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

      createInvoice: (input) => {
        const newId = id("inv");
        const nummer = volgendFactuurNummer(get().invoices);
        set((s) => ({
          invoices: [
            ...s.invoices,
            { id: newId, nummer, status: "concept", aangemaaktOp: new Date().toISOString(), ...input },
          ],
        }));
        return newId;
      },

      updateInvoice: (invoiceId, patch) =>
        set((s) => ({
          invoices: s.invoices.map((i) => (i.id === invoiceId ? { ...i, ...patch } : i)),
        })),

      setInvoiceStatus: (invoiceId, status) =>
        set((s) => ({
          invoices: s.invoices.map((i) =>
            i.id === invoiceId
              ? { ...i, status, verstuurdOp: status === "verzonden" && !i.verstuurdOp ? new Date().toISOString() : i.verstuurdOp }
              : i,
          ),
        })),

      deleteInvoice: (invoiceId) =>
        set((s) => ({
          invoices: s.invoices.filter((i) => i.id !== invoiceId),
          payments: s.payments.filter((p) => p.invoiceId !== invoiceId),
        })),

      genereerTermijnfacturen: (quoteId) => {
        const quote = get().quotes.find((q) => q.id === quoteId);
        if (!quote) return [];
        const grondslag = berekenTotalen(quote.regels, quote.korting).subtotaalNaKorting; // excl. btw
        const jaar = new Date().getFullYear();
        const prefix = `FACT-${jaar}-`;
        const bestaand = get().invoices
          .map((i) => i.nummer)
          .filter((n) => n.startsWith(prefix))
          .map((n) => parseInt(n.slice(prefix.length), 10))
          .filter((n) => !Number.isNaN(n));
        let volgnr = bestaand.length ? Math.max(...bestaand) : 0;

        const nieuwe: Invoice[] = TERMIJN_SCHEMA.map((term, idx) => {
          volgnr++;
          const bedragExcl = Math.round((grondslag * term.pct) / 100);
          const due = new Date();
          due.setDate(due.getDate() + idx * 14);
          return {
            id: id("inv"),
            nummer: `${prefix}${String(volgnr).padStart(4, "0")}`,
            leadId: quote.leadId,
            quoteId: quote.id,
            status: "concept" as InvoiceStatus,
            termijnLabel: term.label,
            regels: [{ id: id("ir"), omschrijving: `Termijn ${term.pct}% — ${quote.nummer}`, aantal: 1, eenheid: "post", prijsPerStuk: bedragExcl, btwPercentage: 21 }],
            korting: 0,
            vervaldatum: due.toISOString(),
            aangemaaktOp: new Date().toISOString(),
          };
        });
        set((s) => ({ invoices: [...s.invoices, ...nieuwe] }));
        return nieuwe.map((i) => i.id);
      },

      registerPayment: (invoiceId, bedrag, methode) =>
        set((s) => {
          const payments = [
            ...s.payments,
            { id: id("pay"), invoiceId, bedrag, methode, datum: new Date().toISOString() },
          ];
          const invoice = s.invoices.find((i) => i.id === invoiceId);
          let invoices = s.invoices;
          if (invoice) {
            const totaal = berekenTotalen(invoice.regels, invoice.korting).totaal;
            const betaald = payments.filter((p) => p.invoiceId === invoiceId).reduce((sum, p) => sum + p.bedrag, 0);
            const nieuweStatus: InvoiceStatus = betaald >= totaal ? "betaald" : "deels_betaald";
            invoices = s.invoices.map((i) => (i.id === invoiceId ? { ...i, status: nieuweStatus } : i));
          }
          return { payments, invoices };
        }),

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
          invoices: seedInvoices,
          payments: seedPayments,
        }),
    }),
    {
      // v5: live datalaag — leads uit Supabase, transactionele data start leeg
      name: "prefab-crm-store",
      version: 5,
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
