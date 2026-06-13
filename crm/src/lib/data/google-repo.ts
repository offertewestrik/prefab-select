import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";

export interface GoogleTokens {
  email: string | null;
  refreshToken: string | null;
  accessToken: string | null;
  tokenExpiry: string | null;
  scope: string | null;
}

/** Haalt de (enkele) opgeslagen Google-koppeling op, of null. */
export async function getGoogleTokens(): Promise<GoogleTokens | null> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("google_oauth")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error || !data) return null;
  return {
    email: data.email ?? null,
    refreshToken: data.refresh_token ?? null,
    accessToken: data.access_token ?? null,
    tokenExpiry: data.token_expiry ?? null,
    scope: data.scope ?? null,
  };
}

export async function saveGoogleTokens(t: Partial<GoogleTokens> & { email: string }): Promise<void> {
  const db = getSupabaseAdmin();
  const row: Record<string, unknown> = { email: t.email, updated_at: new Date().toISOString() };
  if (t.refreshToken !== undefined && t.refreshToken !== null) row.refresh_token = t.refreshToken;
  if (t.accessToken !== undefined) row.access_token = t.accessToken;
  if (t.tokenExpiry !== undefined) row.token_expiry = t.tokenExpiry;
  if (t.scope !== undefined) row.scope = t.scope;
  const { error } = await db.from("google_oauth").upsert(row, { onConflict: "email" });
  if (error) throw error;
}

export async function deleteGoogleTokens(): Promise<void> {
  const db = getSupabaseAdmin();
  await db.from("google_oauth").delete().neq("id", "00000000-0000-0000-0000-000000000000");
}
