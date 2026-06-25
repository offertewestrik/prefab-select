import "server-only";
import { prisma } from "@/lib/prisma";

export interface NotificationInput {
  userId: string;
  type: string;
  title: string;
  body?: string;
  href?: string;
}

/** Maakt een in-app melding aan. */
export async function createNotification(input: NotificationInput) {
  return prisma.notification.create({
    data: { userId: input.userId, type: input.type, title: input.title, body: input.body ?? null, href: input.href ?? null },
  });
}

/** Notify alle eigenaren/leden van een bedrijf. */
export async function notifyCompany(companyId: string, input: Omit<NotificationInput, "userId">) {
  const members = await prisma.companyMember.findMany({ where: { companyId }, select: { userId: true } });
  await Promise.all(members.map((m) => createNotification({ ...input, userId: m.userId })));
}

/** Notify alle admins. */
export async function notifyAdmins(input: Omit<NotificationInput, "userId">) {
  const admins = await prisma.user.findMany({ where: { role: "ADMIN" }, select: { id: true } });
  await Promise.all(admins.map((a) => createNotification({ ...input, userId: a.id })));
}

export async function markAsRead(id: string, userId: string) {
  await prisma.notification.updateMany({ where: { id, userId }, data: { readAt: new Date() } });
}

export async function markAllAsRead(userId: string) {
  await prisma.notification.updateMany({ where: { userId, readAt: null }, data: { readAt: new Date() } });
}

export async function listNotifications(userId: string, take = 30) {
  return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take });
}

export async function unreadCount(userId: string) {
  return prisma.notification.count({ where: { userId, readAt: null } });
}
