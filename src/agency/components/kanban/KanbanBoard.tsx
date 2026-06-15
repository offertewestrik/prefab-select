import React, { useState } from 'react';
import { cn } from '../ui';

export interface KanbanColumn<S extends string> {
  id: S;
  title: string;
  accent: string; // hex color for the column accent
}

export interface KanbanCardData {
  id: string;
  status: string;
}

/**
 * Generic, reusable Kanban board with native HTML5 drag & drop.
 * Used by the CRM (leads) and the Tasks module.
 */
export function KanbanBoard<T extends KanbanCardData, S extends string>({
  columns, items, getStatus, onMove, renderCard,
}: {
  columns: KanbanColumn<S>[];
  items: T[];
  getStatus: (item: T) => S;
  onMove: (itemId: string, toStatus: S) => void;
  renderCard: (item: T) => React.ReactNode;
}) {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overColumn, setOverColumn] = useState<S | null>(null);

  return (
    <div className="flex gap-4 overflow-x-auto acc-scroll pb-2">
      {columns.map((col) => {
        const colItems = items.filter((it) => getStatus(it) === col.id);
        const isOver = overColumn === col.id;
        return (
          <div
            key={col.id}
            className={cn(
              'w-72 shrink-0 rounded-2xl p-2.5 transition-colors',
              isOver ? 'bg-white/[0.06]' : 'bg-white/[0.02]',
              'border border-[var(--acc-border)]',
            )}
            onDragOver={(e) => { e.preventDefault(); setOverColumn(col.id); }}
            onDragLeave={() => setOverColumn((c) => (c === col.id ? null : c))}
            onDrop={(e) => {
              e.preventDefault();
              if (draggingId) onMove(draggingId, col.id);
              setDraggingId(null);
              setOverColumn(null);
            }}
          >
            <div className="flex items-center justify-between px-2 py-1.5 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ background: col.accent }} />
                <span className="text-xs font-semibold">{col.title}</span>
              </div>
              <span className="text-[11px] text-[var(--acc-muted)] font-medium tabular-nums">{colItems.length}</span>
            </div>
            <div className="space-y-2 min-h-[60px]">
              {colItems.map((it) => (
                <div
                  key={it.id}
                  draggable
                  onDragStart={() => setDraggingId(it.id)}
                  onDragEnd={() => { setDraggingId(null); setOverColumn(null); }}
                  className={cn(
                    'acc-card acc-card-hover p-3 cursor-grab active:cursor-grabbing',
                    draggingId === it.id && 'opacity-40',
                  )}
                >
                  {renderCard(it)}
                </div>
              ))}
              {colItems.length === 0 && (
                <div className="text-[11px] text-[var(--acc-muted)] text-center py-6 border border-dashed border-[var(--acc-border)] rounded-xl">
                  Sleep hierheen
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
