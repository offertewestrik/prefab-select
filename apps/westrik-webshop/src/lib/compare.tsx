import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

const MAX = 4;
const STORAGE_KEY = 'westrik:compare';

interface CompareCtx {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  full: boolean;
  count: number;
}

const Ctx = createContext<CompareCtx | null>(null);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as string[]) : [];
    } catch {
      return [];
    }
  });

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      if (ids.includes(id)) {
        persist(ids.filter((x) => x !== id));
      } else if (ids.length < MAX) {
        persist([...ids, id]);
      }
    },
    [ids, persist],
  );

  const remove = useCallback((id: string) => persist(ids.filter((x) => x !== id)), [ids, persist]);
  const clear = useCallback(() => persist([]), [persist]);

  const value = useMemo<CompareCtx>(
    () => ({ ids, has, toggle, remove, clear, full: ids.length >= MAX, count: ids.length }),
    [ids, has, toggle, remove, clear],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCompare() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCompare must be used within CompareProvider');
  return ctx;
}

export const MAX_COMPARE = MAX;
