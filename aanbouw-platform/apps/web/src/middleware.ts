import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Rol-gebaseerde toegang (zie docs/01 §5).
// /dashboard → INSTALLER, /admin → ADMIN. Overige routes zijn publiek.
export default auth((req) => {
  const { pathname } = req.nextUrl;
  const role = (req.auth?.user as { role?: string } | undefined)?.role;

  const needsAuth = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  if (!needsAuth) return NextResponse.next();

  if (!req.auth) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  if (pathname.startsWith("/dashboard") && role !== "INSTALLER" && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
