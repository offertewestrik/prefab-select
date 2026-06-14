// Gedeelde hash-helper (werkt in zowel Node- als Edge/middleware-runtime).
export async function sha256hex(waarde: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(waarde));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export const AUTH_COOKIE = "crm_auth";
