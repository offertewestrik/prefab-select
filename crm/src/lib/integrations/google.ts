import "server-only";

import { getGoogleTokens, saveGoogleTokens } from "@/lib/data/google-repo";

// ----------------------------------------------------------------------------
// Google / Gmail OAuth + verzenden. Werkt met de gedeelde postbus
// (offerte@prefabselect.nl). De refresh-token staat in Supabase.
// ----------------------------------------------------------------------------

const AUTH_ENDPOINT = "https://accounts.google.com/o/oauth2/v2/auth";
const TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";
const GMAIL_API = "https://gmail.googleapis.com/gmail/v1/users/me";

export const GOOGLE_SCOPES = [
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/gmail.readonly",
];

export function isGoogleConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REDIRECT_URI,
  );
}

export function buildGoogleAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
    response_type: "code",
    scope: GOOGLE_SCOPES.join(" "),
    access_type: "offline",
    prompt: "consent",
    state,
  });
  return `${AUTH_ENDPOINT}?${params.toString()}`;
}

interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  scope?: string;
}

export async function exchangeCodeForTokens(code: string): Promise<{ email: string }> {
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
      grant_type: "authorization_code",
    }),
  });
  if (!res.ok) throw new Error(`Token-uitwisseling mislukt: ${await res.text()}`);
  const data = (await res.json()) as TokenResponse;

  // Adres van de gekoppelde postbus ophalen.
  const profile = await fetch(`${GMAIL_API}/profile`, {
    headers: { Authorization: `Bearer ${data.access_token}` },
  });
  const email = profile.ok ? (await profile.json()).emailAddress : "onbekend";

  await saveGoogleTokens({
    email,
    refreshToken: data.refresh_token ?? null,
    accessToken: data.access_token,
    tokenExpiry: new Date(Date.now() + data.expires_in * 1000).toISOString(),
    scope: data.scope ?? GOOGLE_SCOPES.join(" "),
  });
  return { email };
}

/** Geldige access-token (ververst automatisch via de refresh-token). */
async function getAccessToken(): Promise<string> {
  const tokens = await getGoogleTokens();
  if (!tokens?.refreshToken) throw new Error("Geen Gmail-koppeling. Verbind eerst je Gmail.");

  if (tokens.accessToken && tokens.tokenExpiry && new Date(tokens.tokenExpiry) > new Date(Date.now() + 60_000)) {
    return tokens.accessToken;
  }
  const res = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      refresh_token: tokens.refreshToken,
      grant_type: "refresh_token",
    }),
  });
  if (!res.ok) throw new Error(`Token vernieuwen mislukt: ${await res.text()}`);
  const data = (await res.json()) as TokenResponse;
  await saveGoogleTokens({
    email: tokens.email ?? "onbekend",
    accessToken: data.access_token,
    tokenExpiry: new Date(Date.now() + data.expires_in * 1000).toISOString(),
  });
  return data.access_token;
}

export async function isGmailConnected(): Promise<boolean> {
  if (!isGoogleConfigured()) return false;
  const t = await getGoogleTokens();
  return Boolean(t?.refreshToken);
}

function buildMime(opts: {
  van: string;
  naar: string;
  onderwerp: string;
  html: string;
  pdfBuffer?: Buffer;
  bestandsnaam?: string;
}): string {
  const grens = `=_prefab_${Date.now()}`;
  const kop = [
    `From: ${opts.van}`,
    `To: ${opts.naar}`,
    `Subject: ${opts.onderwerp}`,
    "MIME-Version: 1.0",
  ];
  if (opts.pdfBuffer && opts.bestandsnaam) {
    kop.push(`Content-Type: multipart/mixed; boundary="${grens}"`);
    const body = [
      "",
      `--${grens}`,
      'Content-Type: text/html; charset="UTF-8"',
      "Content-Transfer-Encoding: 7bit",
      "",
      opts.html,
      "",
      `--${grens}`,
      `Content-Type: application/pdf; name="${opts.bestandsnaam}"`,
      "Content-Transfer-Encoding: base64",
      `Content-Disposition: attachment; filename="${opts.bestandsnaam}"`,
      "",
      opts.pdfBuffer.toString("base64").replace(/(.{76})/g, "$1\n"),
      `--${grens}--`,
    ].join("\r\n");
    return kop.join("\r\n") + "\r\n" + body;
  }
  kop.push('Content-Type: text/html; charset="UTF-8"', "Content-Transfer-Encoding: 7bit", "", opts.html);
  return kop.join("\r\n");
}

export interface GmailBericht {
  id: string;
  threadId: string;
  van: string;
  naar: string;
  onderwerp: string;
  datum: string;
  snippet: string;
  uitgaand: boolean;
}

/** Haalt de recente e-mails op die naar/van een bepaald adres gingen. */
export async function getGmailMessages(email: string, max = 15): Promise<GmailBericht[]> {
  const accessToken = await getAccessToken();
  const eigenAdres = (await getGoogleTokens())?.email?.toLowerCase() ?? "";
  const q = encodeURIComponent(`from:${email} OR to:${email}`);
  const listRes = await fetch(`${GMAIL_API}/messages?q=${q}&maxResults=${max}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!listRes.ok) throw new Error(`Gmail-lijst ophalen mislukt: ${await listRes.text()}`);
  const list = await listRes.json();
  const ids: string[] = (list.messages ?? []).map((m: { id: string }) => m.id);

  const berichten = await Promise.all(
    ids.map(async (id) => {
      const r = await fetch(
        `${GMAIL_API}/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=To&metadataHeaders=Subject&metadataHeaders=Date`,
        { headers: { Authorization: `Bearer ${accessToken}` } },
      );
      const m = await r.json();
      const h: Record<string, string> = Object.fromEntries(
        (m.payload?.headers ?? []).map((x: { name: string; value: string }) => [x.name.toLowerCase(), x.value]),
      );
      const van = h.from ?? "";
      return {
        id: m.id,
        threadId: m.threadId,
        van,
        naar: h.to ?? "",
        onderwerp: h.subject ?? "(geen onderwerp)",
        datum: m.internalDate ? new Date(Number(m.internalDate)).toISOString() : h.date ?? "",
        snippet: m.snippet ?? "",
        uitgaand: eigenAdres ? van.toLowerCase().includes(eigenAdres) : false,
      } as GmailBericht;
    }),
  );
  return berichten.sort((a, b) => +new Date(b.datum) - +new Date(a.datum));
}

export async function sendGmail(opts: {
  naar: string;
  onderwerp: string;
  html: string;
  pdfBuffer?: Buffer;
  bestandsnaam?: string;
}): Promise<{ ok: boolean; messageId: string }> {
  const accessToken = await getAccessToken();
  const tokens = await getGoogleTokens();
  const van = tokens?.email ?? process.env.RESEND_FROM_EMAIL ?? "offerte@prefabselect.nl";
  const mime = buildMime({ van, ...opts });
  const raw = Buffer.from(mime).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

  const res = await fetch(`${GMAIL_API}/messages/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ raw }),
  });
  if (!res.ok) throw new Error(`Gmail-verzending mislukt: ${await res.text()}`);
  const data = await res.json();
  return { ok: true, messageId: data.id ?? "" };
}
