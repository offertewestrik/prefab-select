import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { firestoreService, type CollectionName } from '../services/firestoreService';
import { useAuth } from './AuthContext';
import type {
  Bouwbedrijf, Aanvraag, Offerte, Bericht, AppNotification,
} from '../types';

/**
 * Application data context. Holds every collection in React state (seeded from
 * `firestoreService`) and exposes typed CRUD. Mutations persist immediately so
 * the demo feels live. RBAC scoping is applied per role:
 *   - admin    → sees everything
 *   - aannemer → sees aanvragen assigned to their bouwbedrijf, their offertes
 *   - klant    → sees only their own aanvragen, offertes and berichten
 */

interface Collection<T> {
  items: T[];
  create: (item: Omit<T, 'id'> & Partial<Pick<T, 'id' & keyof T>>) => T;
  update: (id: string, patch: Partial<T>) => void;
  remove: (id: string) => void;
  set: (items: T[]) => void;
}

interface DataContextValue {
  bouwbedrijven: Collection<Bouwbedrijf>;
  aanvragen: Collection<Aanvraag> & { visible: Aanvraag[] };
  offertes: Collection<Offerte> & { visible: Offerte[] };
  berichten: Collection<Bericht>;
  notifications: Collection<AppNotification> & { mine: AppNotification[] };
  /** The bouwbedrijf the logged-in aannemer belongs to (if any). */
  myCompany: Bouwbedrijf | null;
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

  const bouwbedrijven = useCollection<Bouwbedrijf>('bouwbedrijven', 'b');
  const aanvragen = useCollection<Aanvraag>('aanvragen', 'a');
  const offertes = useCollection<Offerte>('offertes', 'o');
  const berichten = useCollection<Bericht>('berichten', 'm');
  const notifications = useCollection<AppNotification>('notifications', 'n');

  const myCompany = useMemo(() => {
    if (user?.role === 'aannemer' && user.companyId) {
      return bouwbedrijven.items.find((b) => b.id === user.companyId) ?? null;
    }
    return null;
  }, [user, bouwbedrijven.items]);

  // RBAC scoping for aanvragen.
  const visibleAanvragen = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return aanvragen.items;
    if (user.role === 'aannemer') return aanvragen.items.filter((a) => a.assignedCompanyId === user.companyId);
    return aanvragen.items.filter((a) => a.klantId === user.id); // klant
  }, [user, aanvragen.items]);

  const visibleOffertes = useMemo(() => {
    if (!user) return [];
    if (user.role === 'admin') return offertes.items;
    if (user.role === 'aannemer') return offertes.items.filter((o) => o.companyId === user.companyId);
    // klant → offertes that belong to one of their aanvragen
    const myIds = new Set(visibleAanvragen.map((a) => a.id));
    return offertes.items.filter((o) => myIds.has(o.aanvraagId));
  }, [user, offertes.items, visibleAanvragen]);

  const myNotifications = useMemo(() => {
    if (!user) return [];
    return notifications.items.filter((n) => {
      if (n.role && n.role !== user.role) return false;
      if (n.companyId && n.companyId !== user.companyId) return false;
      if (n.klantId && n.klantId !== user.id) return false;
      return true;
    });
  }, [user, notifications.items]);

  const resetData = useCallback(() => {
    firestoreService.resetAll();
    bouwbedrijven.set(firestoreService.getAll('bouwbedrijven'));
    aanvragen.set(firestoreService.getAll('aanvragen'));
    offertes.set(firestoreService.getAll('offertes'));
    berichten.set(firestoreService.getAll('berichten'));
    notifications.set(firestoreService.getAll('notifications'));
  }, [bouwbedrijven, aanvragen, offertes, berichten, notifications]);

  const value: DataContextValue = {
    bouwbedrijven,
    aanvragen: Object.assign(aanvragen, { visible: visibleAanvragen }),
    offertes: Object.assign(offertes, { visible: visibleOffertes }),
    berichten,
    notifications: Object.assign(notifications, { mine: myNotifications }),
    myCompany,
    resetData,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
