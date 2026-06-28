"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Check } from "lucide-react";
import { useCrm } from "@/lib/store";
import { useMounted } from "@/lib/use-mounted";
import { NOTIFICATION_META } from "@/lib/constants";
import { relatief } from "@/lib/format";

export function NotificationBell() {
  const mounted = useMounted();
  const currentUserId = useCrm((s) => s.currentUserId);
  const notifications = useCrm((s) => s.notifications);
  const markRead = useCrm((s) => s.markNotificationRead);
  const markAll = useCrm((s) => s.markAllNotificationsRead);
  const [open, setOpen] = useState(false);

  if (!mounted) return <div className="h-9 w-9 rounded-full bg-slate-100" />;

  // Toon notificaties voor iedereen of voor de huidige medewerker.
  const eigen = notifications.filter((n) => !n.voorUserId || n.voorUserId === currentUserId);
  const ongelezen = eigen.filter((n) => !n.gelezen).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100"
        aria-label="Notificaties"
      >
        <Bell className="h-5 w-5" />
        {ongelezen > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
            {ongelezen}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-40 mt-2 w-80 rounded-xl border border-slate-100 bg-white shadow-lift">
            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
              <p className="text-sm font-bold text-slate-800">Notificaties</p>
              {ongelezen > 0 && (
                <button onClick={markAll} className="flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700">
                  <Check className="h-3.5 w-3.5" /> Alles gelezen
                </button>
              )}
            </div>
            <div className="max-h-96 overflow-y-auto">
              {eigen.length === 0 ? (
                <p className="px-4 py-8 text-center text-sm text-slate-400">Geen notificaties.</p>
              ) : (
                eigen.slice(0, 12).map((n) => {
                  const inner = (
                    <div className={`flex gap-3 border-b border-slate-50 px-4 py-3 transition hover:bg-slate-50 ${n.gelezen ? "opacity-60" : ""}`}>
                      {!n.gelezen && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                      <div className={`min-w-0 flex-1 ${n.gelezen ? "pl-5" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${NOTIFICATION_META[n.type].kleur}`}>
                            {NOTIFICATION_META[n.type].label}
                          </span>
                          <span className="text-[10px] text-slate-400">{relatief(n.aangemaaktOp)}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-700">{n.tekst}</p>
                      </div>
                    </div>
                  );
                  return n.link ? (
                    <Link key={n.id} href={n.link} onClick={() => { markRead(n.id); setOpen(false); }}>
                      {inner}
                    </Link>
                  ) : (
                    <button key={n.id} onClick={() => markRead(n.id)} className="block w-full text-left">
                      {inner}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
