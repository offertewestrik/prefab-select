"use client";

// ----------------------------------------------------------------------------
// Supabase browser-client (anon key) — voor gebruik in client components met
// Supabase Auth. Wordt pas actief zodra de env-variabelen zijn ingevuld.
// ----------------------------------------------------------------------------

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Geeft de gedeelde browser-client. Throwt met duidelijke uitleg als de env ontbreekt. */
export function getSupabaseBrowser(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is nog niet geconfigureerd. Vul NEXT_PUBLIC_SUPABASE_URL en " +
        "NEXT_PUBLIC_SUPABASE_ANON_KEY in (.env). Tot die tijd draait het CRM op de lokale store.",
    );
  }
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return _client;
}
