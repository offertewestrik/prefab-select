// Eenvoudige wachtwoord-beveiliging voor het dashboard.
import "server-only";

export const SESSION_COOKIE = "lgp_session";

// We bewaren geen wachtwoord in de cookie, alleen een afgeleide "token".
// Bij wijziging van DASHBOARD_PASSWORD worden bestaande sessies ongeldig.
export function sessionToken(): string {
  const pw = process.env.DASHBOARD_PASSWORD || "";
  // Lichtgewicht, deterministische hash (geen geheim in de cookie zelf).
  let h = 2166136261;
  const salt = "loodgieterplatform::" + pw;
  for (let i = 0; i < salt.length; i++) {
    h ^= salt.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

export function passwordIsConfigured(): boolean {
  return !!process.env.DASHBOARD_PASSWORD;
}
