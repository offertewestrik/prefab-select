import "server-only";
import { prisma } from "@/lib/prisma";

export type AdjustResult = { ok: boolean; balanceAfter?: number; reason?: string };

/** Handmatige credit-correctie door admin (positief of negatief). */
export async function adjustCredits(companyId: string, amountCredits: number, reason: string): Promise<AdjustResult> {
  if (!Number.isInteger(amountCredits) || amountCredits === 0) return { ok: false, reason: "invalid_amount" };

  return prisma.$transaction(async (tx) => {
    const company = await tx.installerCompany.findUnique({ where: { id: companyId } });
    if (!company) return { ok: false, reason: "company_not_found" };

    const balanceAfter = Math.max(0, company.creditBalance + amountCredits);
    await tx.installerCompany.update({ where: { id: companyId }, data: { creditBalance: balanceAfter } });
    await tx.creditTransaction.create({
      data: { companyId, type: "ADJUSTMENT", amount: amountCredits, balanceAfter, reference: reason || "admin-correctie" },
    });
    return { ok: true, balanceAfter };
  });
}
