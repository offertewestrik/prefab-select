import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, X } from 'lucide-react';
import { NAV_ITEMS, GROUP_LABELS, type NavItem } from './nav';
import { useAuth } from '../../context/AuthContext';
import { ROLE_LABELS } from '../../lib/rbac';
import { cn } from '../ui';

const GROUP_ORDER: NavItem['group'][] = ['overzicht', 'admin', 'aannemer', 'klant', 'systeem'];

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { can, user } = useAuth();
  const visible = NAV_ITEMS.filter((item) => can(item.permission));

  return (
    <>
      {open && <div className="fixed inset-0 bg-[#0e2a47]/50 z-40 lg:hidden" onClick={onClose} />}

      <aside
        className={cn(
          'fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-[262px] shrink-0 flex flex-col abp-navy-panel border-r transition-transform duration-300',
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <div className="flex items-center justify-between gap-2 px-5 h-16 shrink-0 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--abp-accent)] flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Home size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-white">AanbouwPlatform</p>
              <p className="text-[10px] text-white/55 tracking-wide">.NL — WONINGUITBREIDING</p>
            </div>
          </div>
          <button className="lg:hidden text-white/70" onClick={onClose} aria-label="Sluit menu"><X size={18} /></button>
        </div>

        <nav className="flex-1 overflow-y-auto abp-scroll px-3 py-4 space-y-5">
          {GROUP_ORDER.map((group) => {
            const items = visible.filter((i) => i.group === group);
            if (items.length === 0) return null;
            return (
              <div key={group}>
                <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  {GROUP_LABELS[group]}
                </p>
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <NavLink
                      key={item.permission + item.to}
                      to={item.to}
                      onClick={onClose}
                      end={item.to.endsWith('/dashboard')}
                      className={({ isActive }) => cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium relative abp-nav-link',
                        isActive && 'abp-nav-link-active',
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r bg-[var(--abp-accent)]" />}
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

        <div className="px-4 py-4 border-t border-white/10">
          <div className="rounded-xl p-3 bg-white/5 border border-white/10 text-xs">
            <p className="font-semibold text-white">Ingelogd als</p>
            <p className="text-white/60 mt-0.5">{user?.name}</p>
            <p className="text-[var(--abp-accent)] font-semibold mt-1">{user ? ROLE_LABELS[user.role] : ''}</p>
          </div>
        </div>
      </aside>
    </>
  );
}
