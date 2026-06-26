import Link from "next/link";
import { Button } from "@repo/ui";
import { PageHeading, EmptyState } from "@/components/dashboard/sidebar-layout";
import { getSessionUser } from "@/lib/guards";
import { listNotifications } from "@/features/notifications/server/service";
import { markNotificationReadAction, markAllNotificationsReadAction } from "@/features/notifications/server/actions";

export default async function NotificationsPage() {
  const user = await getSessionUser();
  const items = user ? await listNotifications((user as { id: string }).id) : [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <PageHeading title="Meldingen" />
        {items.some((n) => !n.readAt) && (
          <form action={markAllNotificationsReadAction}>
            <Button variant="outline" size="sm" type="submit">Alles gelezen</Button>
          </form>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState>Je hebt nog geen meldingen.</EmptyState>
      ) : (
        <ul className="space-y-2">
          {items.map((n) => (
            <li
              key={n.id}
              className={`rounded-[var(--radius-xl)] border p-4 ${n.readAt ? "border-neutral-200 bg-white" : "border-primary-500/30 bg-primary-50/40"}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-neutral-900">{n.title}</div>
                  {n.body && <div className="text-sm text-neutral-500">{n.body}</div>}
                  <div className="mt-1 text-xs text-neutral-400">{n.createdAt.toLocaleString("nl-NL")}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {n.href && (
                    <Link href={n.href} className="text-sm font-medium text-primary-600 hover:underline">Bekijk</Link>
                  )}
                  {!n.readAt && (
                    <form action={markNotificationReadAction}>
                      <input type="hidden" name="id" value={n.id} />
                      <button type="submit" className="text-sm text-neutral-400 hover:text-neutral-700">Markeer gelezen</button>
                    </form>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
