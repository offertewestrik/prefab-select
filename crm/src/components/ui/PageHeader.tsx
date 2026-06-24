export function PageHeader({
  titel,
  subtitel,
  actie,
}: {
  titel: string;
  subtitel?: string;
  actie?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">{titel}</h1>
        {subtitel && <p className="mt-1 text-sm text-slate-500">{subtitel}</p>}
      </div>
      {actie}
    </div>
  );
}
