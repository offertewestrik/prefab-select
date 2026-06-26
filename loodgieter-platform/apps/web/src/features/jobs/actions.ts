"use server";

import { revalidatePath } from "next/cache";
import { requireRole } from "@/lib/guards";
import { prisma } from "@/lib/prisma";

/** Admin: zet een job terug op PENDING om opnieuw te proberen. */
export async function retryJobAction(formData: FormData): Promise<void> {
  await requireRole("ADMIN");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.job.update({
    where: { id },
    data: { status: "PENDING", runAt: new Date(), lockedAt: null, error: null },
  });
  revalidatePath("/admin/jobs");
}

/** Admin: annuleer een job (markeer als FAILED, niet meer oppakken). */
export async function cancelJobAction(formData: FormData): Promise<void> {
  await requireRole("ADMIN");
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.job.updateMany({
    where: { id, status: { in: ["PENDING", "RETRYING"] } },
    data: { status: "FAILED", error: "Geannuleerd door admin", lockedAt: null },
  });
  revalidatePath("/admin/jobs");
}
