import React from 'react';
import { NavLink } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';
import { NAV_ITEMS, GROUP_LABELS, type NavItem } from './nav';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../ui';

const GROUP_ORDER: NavItem['group'][] = ['overzicht', 'sales', 'marketing', 'tech', 'systeem'];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { can } = useAuth();
  const visible = NAV_ITEMS.filter((item) => can(item.permission));

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          'fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-[260px] shrink-0 flex flex-col acc-glass-strong lg:bg-transparent lg:backdrop-blur-none border-r border-[var(--acc-border)] transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 h-16 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Sparkles size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold acc-gradient-text">Command Center</p>
              <p className="text-[10px] text-[var(--acc-muted)] tracking-wide">AGENCY OS</p>
            </div>
          </div>
          <button className="lg:hidden text-[var(--acc-muted)]" onClick={onClose} aria-label="Sluit menu"><X size={18} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto acc-scroll px-3 py-4 space-y-5">
          {GROUP_ORDER.map((group) => {
            const items = visible.filter((i) => i.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--acc-muted)]">
                  {GROUP_LABELS[group]}
                </p>
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={onClose}
                      className={({ isActive }) => cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors relative group',
                        isActive ? 'bg-white/10 text-white' : 'text-[var(--acc-muted)] hover:text-white hover:bg-white/5',
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-blue-400" />}
                          <item.icon size={17} className="shrink-0" />
                          <span className="truncate">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-[var(--acc-border)]">
          <div className="acc-glass rounded-xl p-3 text-xs">
            <p className="font-semibold text-white/90 flex items-center gap-1.5"><Sparkles size={12} className="text-violet-300" /> Pro tip</p>
            <p className="text-[var(--acc-muted)] mt-1 leading-relaxed">Druk op <kbd className="px-1 py-0.5 rounded bg-white/10 text-[10px]">⌘K</kbd> voor het AI Command Center.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
