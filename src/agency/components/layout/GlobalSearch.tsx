import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Building2, Users, FileText, FolderGit2, CheckSquare } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { cn } from '../ui';

interface Hit { id: string; type: string; label: string; sub: string; to: string; icon: React.ReactNode }

export function GlobalSearch({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { companies, leads, quotes, projects, tasks, setSelectedCompanyId } = useData();
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => { if (open) { setQ(''); setTimeout(() => inputRef.current?.focus(), 50); } }, [open]);

  const hits = useMemo<Hit[]>(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    const out: Hit[] = [];
    companies.visible.forEach((c) => c.name.toLowerCase().includes(term) && out.push({ id: c.id, type: 'company', label: c.name, sub: c.sector, to: `/agency/companies/${c.id}`, icon: <Building2 size={15} /> }));
    leads.items.forEach((l) => (l.name.toLowerCase().includes(term) || l.product.toLowerCase().includes(term)) && out.push({ id: l.id, type: 'lead', label: l.name, sub: l.product, to: '/agency/leads', icon: <Users size={15} /> }));
    quotes.items.forEach((qq) => (qq.clientName.toLowerCase().includes(term) || qq.number.toLowerCase().includes(term)) && out.push({ id: qq.id, type: 'quote', label: qq.number, sub: qq.clientName, to: '/agency/quotes', icon: <FileText size={15} /> }));
    projects.items.forEach((p) => p.name.toLowerCase().includes(term) && out.push({ id: p.id, type: 'project', label: p.name, sub: p.type, to: '/agency/projects', icon: <FolderGit2 size={15} /> }));
    tasks.items.forEach((t) => t.title.toLowerCase().includes(term) && out.push({ id: t.id, type: 'task', label: t.title, sub: t.priority, to: '/agency/tasks', icon: <CheckSquare size={15} /> }));
    return out.slice(0, 12);
  }, [q, companies.visible, leads.items, quotes.items, projects.items, tasks.items]);

  const go = (hit: Hit) => {
    const companyId = (hit.type === 'company' ? hit.id : undefined)
      ?? [...leads.items, ...quotes.items, ...projects.items, ...tasks.items].find((x: any) => x.id === hit.id)?.companyId;
    if (companyId) setSelectedCompanyId(companyId);
    navigate(hit.to);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 sm:pt-28">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl acc-glass-strong rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 h-14 border-b border-[var(--acc-border)]">
          <Search size={18} className="text-[var(--acc-muted)]" />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Zoek klanten, leads, offertes, projecten…" className="flex-1 bg-transparent outline-none text-sm" />
          <kbd className="px-1.5 py-0.5 rounded bg-white/8 text-[10px] text-[var(--acc-muted)]">ESC</kbd>
        </div>
        <div className="max-h-96 overflow-y-auto acc-scroll p-2">
          {q.trim() === '' && <p className="text-sm text-[var(--acc-muted)] text-center py-8">Begin met typen om te zoeken…</p>}
          {q.trim() !== '' && hits.length === 0 && <p className="text-sm text-[var(--acc-muted)] text-center py-8">Geen resultaten voor "{q}".</p>}
          {hits.map((hit) => (
            <button key={`${hit.type}-${hit.id}`} onClick={() => go(hit)} className={cn('w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-left')}>
              <span className="w-8 h-8 rounded-lg acc-glass flex items-center justify-center text-blue-300 shrink-0">{hit.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium truncate">{hit.label}</span>
                <span className="block text-[11px] text-[var(--acc-muted)] truncate capitalize">{hit.sub}</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[var(--acc-muted)]">{hit.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
