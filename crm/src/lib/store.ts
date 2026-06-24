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
  AiAgent,
  Appointment,
  AppNotification,
  Invoice,
  InvoiceStatus,
  Lead,
  Note,
  NotificationType,
  Payment,
  Product,
  Purchase,
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
  seedAiAgents,
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
import { PRODUCT_CATALOGUS, catalogusBeschrijving } from "./product-catalogus";
import { AI_AGENT_TEMPLATES } from "./ai-agents";

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
  pendingWrites++;
  fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  })
    .catch((e) => console.error("Lead-synchronisatie mislukt:", e))
    .finally(() => {
      pendingWrites = Math.max(0, pendingWrites - 1);
      laatsteSchrijfMoment = Date.now();
    });
}

/** Generieke write-through naar Supabase (offertes, facturen, betalingen, producten). */
function dbSync(table: string, op: "upsert" | "delete", data: unknown): Promise<boolean> {
  if (typeof window === "undefined" || !data) return Promise.resolve(true);
  pendingWrites++;
  return fetch("/api/db", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ table, op, data }),
  })
    .then(async (res) => {
      if (!res.ok) {
        const info = (await res.json().catch(() => ({}))) as { error?: string };
        const reden = info.error || `serverfout ${res.status}`;
        console.error(`Synchronisatie van ${table} mislukt:`, reden);
        useCrm.getState().setSyncError(`Kon wijziging niet opslaan in de database (${reden}).`);
        return false;
      }
      // Geslaagd opslaan: een eerdere foutmelding mag weg.
      if (useCrm.getState().syncError) useCrm.getState().setSyncError(null);
      return true;
    })
    .catch((e) => {
      console.error(`Synchronisatie van ${table} mislukt:`, e);
      useCrm.getState().setSyncError("Kon wijziging niet opslaan (geen verbinding met de database).");
      return false;
    })
    .finally(() => {
      pendingWrites = Math.max(0, pendingWrites - 1);
      laatsteSchrijfMoment = Date.now();
    });
}

// ---------------------------------------------------------------------------
// Bescherming tegen race-conditions bij het automatisch verversen:
// - tijdens een upload wordt er niet ge-hydrate (anders veegt een nét te vroeg
//   gestarte verversing zojuist geüploade bestanden uit beeld);
// - verouderde antwoorden (gestart vóór een nieuwere hydrate) worden genegeerd.
// ---------------------------------------------------------------------------
let uploadActief = false;
let hydrateVolgnr = 0;
// Aantal lopende write-through schrijfacties + tijdstip van de laatste. Zo kan
// de auto-verversing een zojuist opgeslagen wijziging (product, btw-tarief…)
// niet terugdraaien doordat ze net vóór de schrijfactie de oude data ophaalde.
let pendingWrites = 0;
let laatsteSchrijfMoment = 0;
export function setUploadActief(actief: boolean) {
  uploadActief = actief;
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
  purchases: Purchase[];
  products: Product[];
  aiAgents: AiAgent[];
  /** Laatste opslagfout (Supabase write-through), of null als alles goed ging. */
  syncError: string | null;

  // --- Opslagstatus ---
  setSyncError: (msg: string | null) => void;

  // --- Leads / pijplijn ---
  /** Laadt de echte data uit Supabase in de store (bij het opstarten). */
  hydrate: () => void;
  moveLead: (leadId: string, stage: PipelineStage, positie: number) => void;
  reorderInStage: (stage: PipelineStage, geordendeIds: string[]) => void;
  updateLead: (leadId: string, patch: Partial<Lead>) => void;
  addLead: (lead: Omit<Lead, "id" | "positie" | "aangemaaktOp" | "laatsteActiviteit">) => string;
  deleteLead: (leadId: string) => void;

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

  // --- Inkoop ---
  addPurchase: (input: { leadId: string; leverancier: string; omschrijving?: string; bedrag: number; datum: string }) => void;
  deletePurchase: (purchaseId: string) => void;

  // --- Productcatalogus ---
  addProduct: (input: Omit<Product, "id" | "aangemaaktOp">) => string;
  updateProduct: (productId: string, patch: Partial<Product>) => void;
  deleteProduct: (productId: string) => void;
  /** Vult de catalogus met de prijslijsten (alle ontbrekende opties + prijzen). */
  importCatalogus: () => { toegevoegd: number; bijgewerkt: number };

  // --- Bestanden ---
  /** Voegt een (via /api/files geüpload) bestand toe aan de lijst. */
  registerFile: (file: UploadedFile) => void;
  deleteFile: (fileId: string) => void;

  // --- Offerte-aanvragen ---
  updateQuoteRequest: (reqId: string, patch: Partial<QuoteRequest>) => void;

  // --- Offertes ---
  createQuote: (input: CreateQuoteInput) => string;
  updateQuote: (quoteId: string, patch: Partial<Quote>) => void;
  deleteQuote: (quoteId: string) => void;
  setQuoteStatus: (quoteId: string, status: Quote["status"]) => void;

  // --- E-maillogs ---
  addEmailLog: (log: Omit<QuoteEmailLog, "id" | "verstuurdOp">) => void;

  // --- Integraties ---
  toggleIntegration: (intId: string) => void;

  // --- AI-agents ---
  /** Zet een agent aan of pauzeert hem (handmatig). */
  toggleAiAgent: (agentId: string) => void;
  /** Voegt een agent uit de catalogus toe (nog niet gekoppeld). Geeft de id terug. */
  addAiAgent: (templateKey: string) => string;
  /** Koppelt of ontkoppelt een agent van de AI (Claude-API). */
  koppelAiAgent: (agentId: string) => void;
  /** Verwijdert een toegevoegde agent uit het dashboard. */
  deleteAiAgent: (agentId: string) => void;

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
      purchases: [],
      products: [],
      aiAgents: seedAiAgents,
      syncError: null,

      setSyncError: (msg) => set({ syncError: msg }),

      hydrate: async () => {
        if (typeof window === "undefined") return;
        if (uploadActief) return; // niet verversen midden in een upload
        const volgnr = ++hydrateVolgnr;
        try {
          const res = await fetch("/api/bootstrap", { cache: "no-store" });
          if (!res.ok) return;
          const data = await res.json();
          // Inmiddels een nieuwere verversing gestart, upload bezig, of net een
          // wijziging weggeschreven? Dan dit (mogelijk verouderde) antwoord
          // negeren, anders draait het een zojuist opgeslagen wijziging terug.
          if (
            volgnr !== hydrateVolgnr ||
            uploadActief ||
            pendingWrites > 0 ||
            Date.now() - laatsteSchrijfMoment < 4000
          )
            return;
          const patch: Partial<CrmState> = {};
          if (Array.isArray(data.leads)) patch.leads = data.leads;
          if (Array.isArray(data.quotes)) patch.quotes = data.quotes;
          if (Array.isArray(data.invoices)) patch.invoices = data.invoices;
          if (Array.isArray(data.payments)) patch.payments = data.payments;
          if (Array.isArray(data.notes)) patch.notes = data.notes;
          if (Array.isArray(data.appointments)) patch.appointments = data.appointments;
          if (Array.isArray(data.tasks)) patch.tasks = data.tasks;
          if (Array.isArray(data.taskComments)) patch.taskComments = data.taskComments;
          if (Array.isArray(data.purchases)) patch.purchases = data.purchases;
          if (Array.isArray(data.products)) patch.products = data.products;
          if (Array.isArray(data.files)) patch.files = data.files;
          set(patch);
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

      deleteLead: (leadId) => {
        set((s) => ({
          leads: s.leads.filter((l) => l.id !== leadId),
          quotes: s.quotes.filter((q) => q.leadId !== leadId),
          invoices: s.invoices.filter((i) => i.leadId !== leadId),
          notes: s.notes.filter((n) => n.leadId !== leadId),
          tasks: s.tasks.filter((t) => t.leadId !== leadId),
          appointments: s.appointments.filter((a) => a.leadId !== leadId),
          purchases: s.purchases.filter((p) => p.leadId !== leadId),
        }));
        syncLead("DELETE", null, leadId);
      },

      addNote: (leadId, tekst, type = "notitie", auteur = "Jij") => {
        const now = new Date().toISOString();
        const note = { id: id("note"), leadId, type, tekst, auteur, aangemaaktOp: now };
        set((s) => ({
          notes: [note, ...s.notes],
          leads: s.leads.map((l) => (l.id === leadId ? { ...l, laatsteActiviteit: now } : l)),
        }));
        dbSync("notes", "upsert", note);
        syncLead("PATCH", { laatsteActiviteit: now }, leadId);
      },

      addTask: (task) => {
        const newId = id("task");
        const nieuw = { ...task, id: newId, aangemaaktOp: new Date().toISOString() };
        set((s) => ({ tasks: [...s.tasks, nieuw] }));
        dbSync("tasks", "upsert", nieuw);
        return newId;
      },

      updateTask: (taskId, patch) => {
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, ...patch } : t)) }));
        dbSync("tasks", "upsert", get().tasks.find((t) => t.id === taskId));
      },

      setTaskStatus: (taskId, status) => {
        set((s) => ({ tasks: s.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)) }));
        dbSync("tasks", "upsert", get().tasks.find((t) => t.id === taskId));
      },

      deleteTask: (taskId) => {
        set((s) => ({
          tasks: s.tasks.filter((t) => t.id !== taskId),
          taskComments: s.taskComments.filter((c) => c.taskId !== taskId),
        }));
        dbSync("tasks", "delete", { id: taskId });
      },

      addTaskComment: (taskId, tekst, auteurId) => {
        const comment = { id: id("tc"), taskId, auteurId: auteurId ?? get().currentUserId, tekst, aangemaaktOp: new Date().toISOString() };
        set((s) => ({ taskComments: [...s.taskComments, comment] }));
        dbSync("task_comments", "upsert", comment);
      },

      addAppointment: (afspraak) => {
        const newId = id("afspr");
        const nieuw = { ...afspraak, id: newId };
        set((s) => ({ appointments: [...s.appointments, nieuw] }));
        dbSync("appointments", "upsert", nieuw);
        get().addNotification({
          type: "nieuwe_afspraak",
          titel: "Nieuwe afspraak",
          tekst: `${afspraak.titel} — ${new Date(afspraak.start).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}.`,
          link: "/agenda",
          voorUserId: afspraak.medewerkerId,
        });
        return newId;
      },

      updateAppointment: (afspraakId, patch) => {
        set((s) => ({
          appointments: s.appointments.map((a) => (a.id === afspraakId ? { ...a, ...patch } : a)),
        }));
        dbSync("appointments", "upsert", get().appointments.find((a) => a.id === afspraakId));
      },

      deleteAppointment: (afspraakId) => {
        set((s) => ({ appointments: s.appointments.filter((a) => a.id !== afspraakId) }));
        dbSync("appointments", "delete", { id: afspraakId });
      },

      toggleGoogleSync: (afspraakId) => {
        set((s) => ({
          appointments: s.appointments.map((a) =>
            a.id === afspraakId ? { ...a, googleSynced: !a.googleSynced } : a,
          ),
        }));
        dbSync("appointments", "upsert", get().appointments.find((a) => a.id === afspraakId));
      },

      registerFile: (file) =>
        set((s) => ({ files: [file, ...s.files] })),

      deleteFile: (fileId) => {
        set((s) => ({ files: s.files.filter((f) => f.id !== fileId) }));
        if (typeof window !== "undefined") {
          fetch(`/api/files/${fileId}`, { method: "DELETE" }).catch((e) =>
            console.error("Bestand verwijderen mislukt:", e),
          );
        }
      },

      updateQuoteRequest: (reqId, patch) =>
        set((s) => ({
          quoteRequests: s.quoteRequests.map((q) =>
            q.id === reqId ? { ...q, ...patch } : q,
          ),
        })),

      createQuote: (input) => {
        const newId = id("quote");
        const nummer = volgendQuoteNummer(get().quotes);
        const quote: Quote = {
          id: newId,
          nummer,
          status: "concept",
          aangemaaktOp: new Date().toISOString(),
          ...input,
        };
        set((s) => ({ quotes: [...s.quotes, quote] }));
        dbSync("quotes", "upsert", quote);
        return newId;
      },

      updateQuote: (quoteId, patch) => {
        set((s) => ({
          quotes: s.quotes.map((q) => (q.id === quoteId ? { ...q, ...patch } : q)),
        }));
        dbSync("quotes", "upsert", get().quotes.find((q) => q.id === quoteId));
      },

      deleteQuote: (quoteId) => {
        set((s) => ({ quotes: s.quotes.filter((q) => q.id !== quoteId) }));
        dbSync("quotes", "delete", { id: quoteId });
      },

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
        dbSync("quotes", "upsert", get().quotes.find((q) => q.id === quoteId));
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

      toggleAiAgent: (agentId) =>
        set((s) => ({
          aiAgents: s.aiAgents.map((a) =>
            a.id === agentId
              ? {
                  ...a,
                  actief: !a.actief,
                  // Aanzetten -> 'rust' (wacht op werk); pauzeren -> 'gepauzeerd'.
                  status: !a.actief ? "rust" : "gepauzeerd",
                  huidigeTaak: undefined,
                }
              : a,
          ),
        })),

      addAiAgent: (templateKey) => {
        const tmpl = AI_AGENT_TEMPLATES.find((t) => t.key === templateKey);
        if (!tmpl) return "";
        const nieuwId = id("agent");
        const nu = new Date().toISOString();
        set((s) => ({
          aiAgents: [
            ...s.aiAgents,
            {
              id: nieuwId,
              naam: tmpl.naam,
              categorie: tmpl.categorie,
              status: "gepauzeerd",
              actief: false,
              gekoppeld: false,
              templateKey: tmpl.key,
              rol: tmpl.rol,
              taken: tmpl.taken,
              voorbeeld: tmpl.voorbeeld,
              huidigeTaak: undefined,
              takenVandaag: 0,
              takenTotaal: 0,
              tijdBespaardMin: 0,
              laatsteActiviteit: nu,
              aanbevolen: tmpl.aanbevolen,
              activiteiten: [
                { id: id("act"), tijd: nu, omschrijving: "Agent toegevoegd — koppel hem om te starten." },
              ],
            },
          ],
        }));
        return nieuwId;
      },

      koppelAiAgent: (agentId) =>
        set((s) => ({
          aiAgents: s.aiAgents.map((a) => {
            if (a.id !== agentId) return a;
            const wordtGekoppeld = !a.gekoppeld;
            const nu = new Date().toISOString();
            return {
              ...a,
              gekoppeld: wordtGekoppeld,
              actief: wordtGekoppeld,
              status: wordtGekoppeld ? "rust" : "gepauzeerd",
              huidigeTaak: undefined,
              laatsteActiviteit: nu,
              activiteiten: [
                {
                  id: id("act"),
                  tijd: nu,
                  omschrijving: wordtGekoppeld
                    ? "Gekoppeld aan Claude — klaar om te werken."
                    : "Ontkoppeld van Claude.",
                },
                ...a.activiteiten,
              ],
            };
          }),
        })),

      deleteAiAgent: (agentId) =>
        set((s) => ({ aiAgents: s.aiAgents.filter((a) => a.id !== agentId) })),

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
        const invoice: Invoice = {
          id: newId, nummer, status: "concept", aangemaaktOp: new Date().toISOString(), ...input,
        };
        set((s) => ({ invoices: [...s.invoices, invoice] }));
        dbSync("invoices", "upsert", invoice);
        return newId;
      },

      updateInvoice: (invoiceId, patch) => {
        set((s) => ({
          invoices: s.invoices.map((i) => (i.id === invoiceId ? { ...i, ...patch } : i)),
        }));
        dbSync("invoices", "upsert", get().invoices.find((i) => i.id === invoiceId));
      },

      setInvoiceStatus: (invoiceId, status) => {
        set((s) => ({
          invoices: s.invoices.map((i) =>
            i.id === invoiceId
              ? { ...i, status, verstuurdOp: status === "verzonden" && !i.verstuurdOp ? new Date().toISOString() : i.verstuurdOp }
              : i,
          ),
        }));
        dbSync("invoices", "upsert", get().invoices.find((i) => i.id === invoiceId));
      },

      deleteInvoice: (invoiceId) => {
        set((s) => ({
          invoices: s.invoices.filter((i) => i.id !== invoiceId),
          payments: s.payments.filter((p) => p.invoiceId !== invoiceId),
        }));
        dbSync("invoices", "delete", { id: invoiceId });
      },

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
        nieuwe.forEach((inv) => dbSync("invoices", "upsert", inv));
        return nieuwe.map((i) => i.id);
      },

      registerPayment: (invoiceId, bedrag, methode) => {
        const payment: Payment = { id: id("pay"), invoiceId, bedrag, methode, datum: new Date().toISOString() };
        set((s) => {
          const payments = [...s.payments, payment];
          const invoice = s.invoices.find((i) => i.id === invoiceId);
          let invoices = s.invoices;
          if (invoice) {
            const totaal = berekenTotalen(invoice.regels, invoice.korting).totaal;
            const betaald = payments.filter((p) => p.invoiceId === invoiceId).reduce((sum, p) => sum + p.bedrag, 0);
            const nieuweStatus: InvoiceStatus = betaald >= totaal ? "betaald" : "deels_betaald";
            invoices = s.invoices.map((i) => (i.id === invoiceId ? { ...i, status: nieuweStatus } : i));
          }
          return { payments, invoices };
        });
        dbSync("payments", "upsert", payment);
        dbSync("invoices", "upsert", get().invoices.find((i) => i.id === invoiceId));
      },

      addPurchase: (input) => {
        const purchase: Purchase = { id: id("inkoop"), aangemaaktOp: new Date().toISOString(), ...input };
        set((s) => ({ purchases: [purchase, ...s.purchases] }));
        dbSync("purchases", "upsert", purchase);
      },

      deletePurchase: (purchaseId) => {
        set((s) => ({ purchases: s.purchases.filter((p) => p.id !== purchaseId) }));
        dbSync("purchases", "delete", { id: purchaseId });
      },

      addProduct: (input) => {
        const product: Product = { id: id("prod"), aangemaaktOp: new Date().toISOString(), ...input };
        set((s) => ({ products: [...s.products, product] }));
        dbSync("products", "upsert", product);
        return product.id;
      },

      updateProduct: (productId, patch) => {
        set((s) => ({
          products: s.products.map((p) => (p.id === productId ? { ...p, ...patch } : p)),
        }));
        const product = get().products.find((p) => p.id === productId);
        if (product) dbSync("products", "upsert", product);
      },

      deleteProduct: (productId) => {
        set((s) => ({ products: s.products.filter((p) => p.id !== productId) }));
        dbSync("products", "delete", { id: productId });
      },

      importCatalogus: () => {
        // Zelfde optie kan in meerdere prijslijsten staan (met andere prijs),
        // dus dedupliceren op lijn + categorie + naam.
        const sleutel = (lijn: string | undefined, categorie: string, naam: string) =>
          `${(lijn ?? "").toLowerCase()}|${categorie.toLowerCase()}|${naam.toLowerCase()}`;
        const bestaande = new Map(get().products.map((p) => [sleutel(p.lijn, p.categorie, p.naam), p]));
        let toegevoegd = 0;
        let bijgewerkt = 0;
        for (const groep of PRODUCT_CATALOGUS) {
          for (const cat of groep.categorieen) {
            for (const item of cat.items) {
              const bestaand = bestaande.get(sleutel(groep.lijn, cat.categorie, item.naam));
              if (bestaand) {
                // Prijslijst is leidend voor nog niet ingevulde prijzen.
                if (bestaand.prijsPerStuk === 0 && item.prijs > 0) {
                  get().updateProduct(bestaand.id, { prijsPerStuk: item.prijs });
                  bijgewerkt++;
                }
                continue;
              }
              const basis = catalogusBeschrijving(item.naam);
              get().addProduct({
                naam: item.naam,
                beschrijving: item.inbegrepen
                  ? `${basis ? `${basis} ` : ""}Standaard inbegrepen in de basisprijs.`
                  : basis,
                lijn: groep.lijn,
                categorie: cat.categorie,
                eenheid: item.eenheid ?? "stuks",
                prijsPerStuk: item.prijs,
                btwPercentage: 21,
                actief: true,
              });
              toegevoegd++;
            }
          }
        }
        return { toegevoegd, bijgewerkt };
      },

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
          purchases: [],
          products: [],
          aiAgents: seedAiAgents,
          syncError: null,
        }),
    }),
    {
      // v6: live datalaag. Server-data (leads/offertes/facturen/agenda/inkoop/
      // producten/bestanden) komt ALTIJD vers uit Supabase via hydrate() en
      // wordt NIET in localStorage bewaard. Zo kan een oude lokale snapshot
      // nooit een nieuwe lead (die al in Supabase staat) overschaduwen. Alleen
      // client-/config-state blijft bewaard. Versie-bump wist oude snapshots
      // die nog wél server-data bevatten.
      name: "prefab-crm-store",
      version: 6,
      // syncError staat bewust niet in de whitelist: een opslagfout is transient
      // en mag na herladen niet blijven hangen.
      partialize: (s) => ({
        currentUserId: s.currentUserId,
        integrations: s.integrations,
        users: s.users,
        reminderRules: s.reminderRules,
        notifications: s.notifications,
        aiAgents: s.aiAgents,
        emailLogs: s.emailLogs,
        quoteRequests: s.quoteRequests,
      }),
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
