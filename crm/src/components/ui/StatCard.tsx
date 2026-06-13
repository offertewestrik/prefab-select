import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

export function StatCard({
  label,
  waarde,
  sub,
  icon: Icon,
  trend,
  accent = "brand",
}: {
  label: string;
  waarde: string;
  sub?: string;
  icon: LucideIcon;
  trend?: { waarde: string; positief: boolean };
  accent?: "brand" | "emerald" | "amber" | "rose";
}) {
  const accentMap = {
    brand: "bg-brand-50 text-brand-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
  };
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-2 text-2xl font-black text-slate-900">{waarde}</p>
        </div>
        <div className={clsx("flex h-10 w-10 items-center justify-center rounded-xl", accentMap[accent])}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        {trend && (
          <span className={clsx("font-semibold", trend.positief ? "text-emerald-600" : "text-rose-600")}>
            {trend.positief ? "▲" : "▼"} {trend.waarde}
          </span>
        )}
        {sub && <span className="text-slate-400">{sub}</span>}
      </div>
    </div>
  );
}
