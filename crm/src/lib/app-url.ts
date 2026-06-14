// Publieke basis-URL van de app (voor links in e-mails, bv. naar het portaal).
export function appBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL.replace(/\/$/, "");
  if (process.env.GOOGLE_REDIRECT_URI) {
    try {
      return new URL(process.env.GOOGLE_REDIRECT_URI).origin;
    } catch {
      /* val terug op de standaard */
    }
  }
  return "https://prefab-select--crm-systeem-prefab-select.europe-west4.hosted.app";
}
