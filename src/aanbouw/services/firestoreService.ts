/**
 * Data backend abstraction for AanbouwPlatform.nl.
 *
 * Today this is an in-memory store seeded from `data/mockData.ts` and persisted
 * to localStorage, so the dashboard feels live (place an aanvraag, accept a
 * lead, send an offerte — it sticks across reloads).
 *
 * To go to production, replace each method body with the Firebase SDK:
 *
 *   import { db } from '@/src/lib/firebase';
 *   import { collection, getDocs } from 'firebase/firestore';
 *   async getAll(name) {
 *     const snap = await getDocs(collection(db, name));
 *     return snap.docs.map(d => ({ id: d.id, ...d.data() }));
 *   }
 *
 * Collection names and document shapes already match the Firestore schema,
 * so no component code needs to change.
 */

import {
  users, bouwbedrijven, aanvragen, offertes, berichten, notifications,
} from '../data/mockData';

export type CollectionName =
  | 'users' | 'bouwbedrijven' | 'aanvragen' | 'offertes' | 'berichten' | 'notifications';

const SEED: Record<CollectionName, any[]> = {
  users, bouwbedrijven, aanvragen, offertes, berichten, notifications,
};

const STORAGE_PREFIX = 'abp:'; // AanbouwPlatform
const STORAGE_VERSION = 'v1';

function key(name: CollectionName) {
  return `${STORAGE_PREFIX}${STORAGE_VERSION}:${name}`;
}

function read<T = any>(name: CollectionName): T[] {
  if (typeof localStorage === 'undefined') return structuredClone(SEED[name]) as T[];
  const raw = localStorage.getItem(key(name));
  if (raw) {
    try { return JSON.parse(raw) as T[]; } catch { /* fall through to seed */ }
  }
  const seeded = structuredClone(SEED[name]);
  localStorage.setItem(key(name), JSON.stringify(seeded));
  return seeded as T[];
}

function write(name: CollectionName, rows: any[]) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(key(name), JSON.stringify(rows));
}

export const firestoreService = {
  /** Load an entire collection. */
  getAll<T = any>(name: CollectionName): T[] {
    return read<T>(name);
  },

  /** Persist a full collection (used by the data context after mutations). */
  saveAll(name: CollectionName, rows: any[]) {
    write(name, rows);
  },

  /** Reset everything back to the seed data. */
  resetAll() {
    (Object.keys(SEED) as CollectionName[]).forEach((name) => {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key(name));
    });
  },

  /** Generate a client-side id (Firestore would assign this server-side). */
  newId(prefix = 'doc'): string {
    return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  },
};
