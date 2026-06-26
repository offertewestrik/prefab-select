"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/guards";
import { markAsRead, markAllAsRead } from "./service";

export async function markNotificationReadAction(formData: FormData): Promise<void> {
  const user = await getSessionUser();
  if (!user) return;
  const id = String(formData.get("id") ?? "");
  if (id) await markAsRead(id, (user as { id: string }).id);
  revalidatePath("/dashboard/meldingen");
}

export async function markAllNotificationsReadAction(): Promise<void> {
  const user = await getSessionUser();
  if (!user) return;
  await markAllAsRead((user as { id: string }).id);
  revalidatePath("/dashboard/meldingen");
}
