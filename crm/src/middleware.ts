import { NextResponse, type NextRequest } from "next/server";
import { sha256hex, AUTH_COOKIE } from "@/lib/auth-token";

// ----------------------------------------------------------------------------
// Eenvoudige team-toegang met één gedeeld wachtwoord.
// - Auth is UIT zolang CRM_PASSWORD niet is gezet (voorkomt buitensluiten).
// - Openbaar blijven: klantportaal, Make-webhook, Google-callback, inlogpagina.
// ----------------------------------------------------------------------------

const OPENBAAR = [
  "/login",
  "/portaal",
  "/api/webhooks",
  "/api/auth",
  "/api/integrations/google/callback",
  "/api/health",
];

export async function middleware(req: NextRequest) {
  const wachtwoord = process.env.CRM_PASSWORD;
  if (!wachtwoord) return NextResponse.next(); // beveiliging staat uit

  const { pathname } = req.nextUrl;
  if (OPENBAAR.some((p) => pathname.startsWith(p))) return NextResponse.next();

  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const verwacht = await sha256hex(wachtwoord);
  if (token && token === verwacht) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|ico|webp)).*)"],
};
