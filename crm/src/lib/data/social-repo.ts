import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { SocialPost } from "@/lib/types";

function mapPost(r: any): SocialPost {
  return {
    id: r.id,
    tekst: r.tekst,
    afbeelding: r.afbeelding ?? undefined,
    platforms: r.platforms ?? [],
    status: r.status,
    geplandOp: r.gepland_op ?? undefined,
    verzondenOp: r.verzonden_op ?? undefined,
    aangemaaktOp: r.created_at,
  };
}

export async function listSocialPosts(): Promise<SocialPost[]> {
  const db = getSupabaseAdmin();
  const { data, error } = await db.from("social_posts").select("*").order("created_at", { ascending: false }).limit(50);
  if (error) throw error;
  return (data ?? []).map(mapPost);
}

export async function createSocialPost(input: {
  tekst: string;
  afbeelding?: string;
  platforms: string[];
  status: string;
  geplandOp?: string | null;
  verzondenOp?: string | null;
}): Promise<SocialPost> {
  const db = getSupabaseAdmin();
  const { data, error } = await db
    .from("social_posts")
    .insert({
      tekst: input.tekst,
      afbeelding: input.afbeelding ?? null,
      platforms: input.platforms,
      status: input.status,
      gepland_op: input.geplandOp ?? null,
      verzonden_op: input.verzondenOp ?? null,
    })
    .select()
    .single();
  if (error) throw error;
  return mapPost(data);
}

export async function getSetting(key: string): Promise<string | null> {
  const db = getSupabaseAdmin();
  const { data } = await db.from("app_settings").select("value").eq("key", key).maybeSingle();
  return data?.value ?? null;
}

export async function setSetting(key: string, value: string): Promise<void> {
  const db = getSupabaseAdmin();
  const { error } = await db.from("app_settings").upsert({ key, value, updated_at: new Date().toISOString() });
  if (error) throw error;
}
