import "server-only";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { UserRole } from "@repo/core";

/** Huidige sessie-gebruiker of null. */
export async function getSessionUser() {
  const session = await auth();
  return session?.user ?? null;
}

/** Vereist een ingelogde gebruiker met (een van) de opgegeven rol(len). */
export async function requireRole(...roles: UserRole[]) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const role = (user as { role?: UserRole }).role;
  if (role && (roles.length === 0 || roles.includes(role))) return user;
  // ADMIN mag overal bij:
  if (role === "ADMIN") return user;
  redirect("/");
}

/** Het bedrijf van de ingelogde aannemer (eerste lidmaatschap). */
export async function getCurrentCompany() {
  const user = await getSessionUser();
  if (!user) return null;
  const membership = await prisma.companyMember.findFirst({
    where: { userId: (user as { id: string }).id },
    include: { company: true },
  });
  return membership?.company ?? null;
}
