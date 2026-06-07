import "server-only";

// ----------------------------------------------------------------------------
// Supabase server-client (service role) — voor server components, route
// handlers en server actions. Omzeilt RLS, dus alleen serverside gebruiken.
// ----------------------------------------------------------------------------

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export function isSupabaseAdminConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

/** Maakt een server-client met service-role rechten. */
export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseAdminConfigured()) {
    throw new Error(
      "Supabase service role ontbreekt. Vul NEXT_PUBLIC_SUPABASE_URL en " +
        "SUPABASE_SERVICE_ROLE_KEY in (.env) om de database serverside te gebruiken.",
    );
  }
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}
