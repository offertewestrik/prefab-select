"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  KanbanSquare,
  Users,
  Inbox,
  FileText,
  CalendarDays,
  CalendarRange,
  CheckSquare,
  BarChart3,
  Plug,
  Building2,
  Sun,
  Gauge,
  Megaphone,
  TrendingUp,
  Target,
  Receipt,
  ExternalLink,
  Boxes,
  Share2,
  Package,
} from "lucide-react";
import clsx from "clsx";

const SECTIES: { titel: string | null; items: { href: string; label: string; icon: any }[] }[] = [
  {
    titel: null,
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/mijn-dag", label: "Mijn dag", icon: Sun },
      { href: "/pipeline", label: "Pijplijn", icon: KanbanSquare },
      { href: "/leads", label: "Leads", icon: Users },
      { href: "/offerte-aanvragen", label: "Offerte aanvragen", icon: Inbox },
      { href: "/offertes", label: "Offertes", icon: FileText },
      { href: "/producten", label: "Producten", icon: Package },
      { href: "/facturen", label: "Facturen", icon: Receipt },
      { href: "/agenda", label: "Agenda", icon: CalendarDays },
      { href: "/team-planning", label: "Team planning", icon: CalendarRange },
      { href: "/taken", label: "Taken & reminders", icon: CheckSquare },
    ],
  },
  {
    titel: "Directie",
    items: [
      { href: "/management", label: "Management", icon: Gauge },
      { href: "/projecten", label: "Projecten", icon: Boxes },
      { href: "/marketing", label: "Marketing", icon: Megaphone },
      { href: "/social", label: "Social media", icon: Share2 },
      { href: "/omzet", label: "Omzet", icon: TrendingUp },
      { href: "/kpi", label: "KPI's", icon: Target },
      { href: "/rapportage", label: "Rapportages", icon: BarChart3 },
    ],
  },
  {
    titel: null,
    items: [{ href: "/integraties", label: "Integraties", icon: Plug }],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
      <div className="flex items-center gap-3 px-6 py-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-950 text-white">
          <Building2 className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-black uppercase tracking-tight text-brand-950">Prefab Select</p>
          <p className="text-[11px] font-medium text-slate-400">CRM Dashboard</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {SECTIES.map((sectie, i) => (
          <div key={i} className={sectie.titel ? "pt-3" : ""}>
            {sectie.titel && (
              <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-300">{sectie.titel}</p>
            )}
            {sectie.items.map(({ href, label, icon: Icon }) => {
              const actief = pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  className={clsx(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                    actief ? "bg-brand-50 text-brand-700" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" />
                  {label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-100 px-6 py-4">
        <p className="text-[11px] text-slate-400">
          Prototype · dummy data
          <br />
          v0.4 — vervangt Teamleader
        </p>
      </div>
    </aside>
  );
}
