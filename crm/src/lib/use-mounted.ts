"use client";

import { useEffect, useState } from "react";

/**
 * Geeft pas `true` terug na de eerste client-render. Gebruik dit om
 * store-data (uit localStorage) pas te tonen ná hydration, zodat we geen
 * server/client-mismatch krijgen.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
