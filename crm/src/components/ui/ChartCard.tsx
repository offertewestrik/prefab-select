export function ChartCard({
  titel,
  subtitel,
  actie,
  children,
  className,
}: {
  titel: string;
  subtitel?: string;
  actie?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-soft ${className ?? ""}`}>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-900">{titel}</h3>
          {subtitel && <p className="text-xs text-slate-400">{subtitel}</p>}
        </div>
        {actie}
      </div>
      {children}
    </div>
  );
}
