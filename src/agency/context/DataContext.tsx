import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { firestoreService, type CollectionName } from '../services/firestoreService';
import { isAgencyRole } from '../lib/rbac';
import { useAuth } from './AuthContext';
import type {
  Company, Lead, Deal, Quote, Task, Project, Agent, AgentLog,
  AnalyticsSnapshot, Campaign, Report, ContentItem, Integration, AppNotification,
} from '../types';

/**
 * Application data context. Holds every collection in React state (seeded from
 * `firestoreService`) and exposes typed CRUD. Mutations persist immediately so
 * the demo feels live. RBAC scoping for the `klant` role is applied to the
 * visible company list.
 */

interface Collection<T> {
  items: T[];
  create: (item: Omit<T, 'id'> & Partial<Pick<T, 'id' & keyof T>>) => T;
  update: (id: string, patch: Partial<T>) => void;
  remove: (id: string) => void;
  set: (items: T[]) => void;
}

interface DataContextValue {
  companies: Collection<Company> & { visible: Company[] };
  leads: Collection<Lead>;
  deals: Collection<Deal>;
  quotes: Collection<Quote>;
  tasks: Collection<Task>;
  projects: Collection<Project>;
  agents: Collection<Agent>;
  agentLogs: Collection<AgentLog>;
  campaigns: Collection<Campaign>;
  reports: Collection<Report>;
  content: Collection<ContentItem>;
  integrations: Collection<Integration>;
  notifications: Collection<AppNotification>;
  analytics: AnalyticsSnapshot[];
  selectedCompanyId: string | null;
  setSelectedCompanyId: (id: string | null) => void;
  selectedCompany: Company | null;
  resetData: () => void;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

function useCollection<T extends { id: string }>(name: CollectionName, prefix: string): Collection<T> {
  const [items, setItems] = useState<T[]>(() => firestoreService.getAll<T>(name));

  const persist = useCallback((next: T[]) => {
    setItems(next);
    firestoreService.saveAll(name, next);
  }, [name]);

  const create = useCallback((item: any): T => {
    const withId = { id: firestoreService.newId(prefix), ...item } as T;
    setItems((prev) => {
      const next = [withId, ...prev];
      firestoreService.saveAll(name, next);
      return next;
    });
    return withId;
  }, [name, prefix]);

  const update = useCallback((id: string, patch: Partial<T>) => {
    setItems((prev) => {
      const next = prev.map((it) => (it.id === id ? { ...it, ...patch } : it));
      firestoreService.saveAll(name, next);
      return next;
    });
  }, [name]);

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const next = prev.filter((it) => it.id !== id);
      firestoreService.saveAll(name, next);
      return next;
    });
  }, [name]);

  return { items, create, update, remove, set: persist };
}

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  const companies = useCollection<Company>('companies', 'c');
  const leads = useCollection<Lead>('leads', 'l');
  const deals = useCollection<Deal>('deals', 'd');
  const quotes = useCollection<Quote>('quotes', 'q');
  const tasks = useCollection<Task>('tasks', 'tk');
  const projects = useCollection<Project>('projects', 'p');
  const agents = useCollection<Agent>('agents', 'a');
  const agentLogs = useCollection<AgentLog>('agentLogs', 'al');
  const campaigns = useCollection<Campaign>('campaigns', 'cm');
  const reports = useCollection<Report>('reports', 'r');
  const content = useCollection<ContentItem>('contentCalendar', 'ct');
  const integrations = useCollection<Integration>('integrations', 'in');
  const notifications = useCollection<AppNotification>('notifications', 'n');
  const [analytics] = useState<AnalyticsSnapshot[]>(() => firestoreService.getAll<AnalyticsSnapshot>('analytics'));

  // RBAC: agency roles see every company; klant only its own.
  const visibleCompanies = useMemo(() => {
    if (!user) return [];
    if (isAgencyRole(user.role)) return companies.items;
    return companies.items.filter((c) => user.companyIds.includes(c.id));
  }, [user, companies.items]);

  const [selectedCompanyId, setSelectedCompanyIdState] = useState<string | null>(() => {
    return localStorage.getItem('acc:v1:selectedCompany');
  });

  const setSelectedCompanyId = useCallback((id: string | null) => {
    setSelectedCompanyIdState(id);
    if (id) localStorage.setItem('acc:v1:selectedCompany', id);
    else localStorage.removeItem('acc:v1:selectedCompany');
  }, []);

  // Ensure the selection is always valid for the current user.
  const effectiveSelectedId = useMemo(() => {
    if (selectedCompanyId && visibleCompanies.some((c) => c.id === selectedCompanyId)) return selectedCompanyId;
    return visibleCompanies[0]?.id ?? null;
  }, [selectedCompanyId, visibleCompanies]);

  const selectedCompany = useMemo(
    () => visibleCompanies.find((c) => c.id === effectiveSelectedId) ?? null,
    [visibleCompanies, effectiveSelectedId],
  );

  const resetData = useCallback(() => {
    firestoreService.resetAll();
    companies.set(firestoreService.getAll('companies'));
    leads.set(firestoreService.getAll('leads'));
    deals.set(firestoreService.getAll('deals'));
    quotes.set(firestoreService.getAll('quotes'));
    tasks.set(firestoreService.getAll('tasks'));
    projects.set(firestoreService.getAll('projects'));
    agents.set(firestoreService.getAll('agents'));
    agentLogs.set(firestoreService.getAll('agentLogs'));
    campaigns.set(firestoreService.getAll('campaigns'));
    reports.set(firestoreService.getAll('reports'));
    content.set(firestoreService.getAll('contentCalendar'));
    integrations.set(firestoreService.getAll('integrations'));
    notifications.set(firestoreService.getAll('notifications'));
  }, [companies, leads, deals, quotes, tasks, projects, agents, agentLogs, campaigns, reports, content, integrations, notifications]);

  const value: DataContextValue = {
    companies: Object.assign(companies, { visible: visibleCompanies }),
    leads, deals, quotes, tasks, projects, agents, agentLogs, campaigns,
    reports, content, integrations, notifications, analytics,
    selectedCompanyId: effectiveSelectedId,
    setSelectedCompanyId,
    selectedCompany,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
