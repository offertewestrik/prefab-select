import { EmptyState } from "./sidebar-layout";

// Eenvoudige, herbruikbare admin-tabel. Bewerk-functionaliteit (CRUD-forms)
// volgt; dit is het schaalbare technische skelet.
export function AdminTable<T extends { id: string }>({
  columns,
  rows,
  empty = "Geen items gevonden.",
}: {
  columns: { key: string; label: string; render: (row: T) => React.ReactNode }[];
  rows: T[];
  empty?: string;
}) {
  if (rows.length === 0) return <EmptyState>{empty}</EmptyState>;
  return (
    <div className="overflow-hidden rounded-[var(--radius-xl)] border border-neutral-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 text-left text-neutral-500">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="p-3 font-medium">
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-t border-neutral-100">
              {columns.map((c) => (
                <td key={c.key} className="p-3">
                  {c.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
