import "server-only";
import { prisma } from "@/lib/prisma";

export function getActivePackages() {
  return prisma.creditPackage.findMany({ where: { active: true }, orderBy: { order: "asc" } });
}

export function getAllPackages() {
  return prisma.creditPackage.findMany({ orderBy: { order: "asc" } });
}

export function getPackage(id: string) {
  return prisma.creditPackage.findUnique({ where: { id } });
}

export const LOW_BALANCE_THRESHOLD = 10;
