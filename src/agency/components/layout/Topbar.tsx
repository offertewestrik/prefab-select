import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, ChevronDown, Sparkles, LogOut, Check, Building2, Dot } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ROLE_LABELS } from '../../lib/rbac';
import { Avatar, Badge, cn, type BadgeTone } from '../ui';
import { formatRelative } from '../../lib/format';
import { GlobalSearch } from './GlobalSearch';

function useOutsideClose<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);
  return ref;
}

export function Topbar({ onMenu, onCommand }: { onMenu: () => void; onCommand: () => void }) {
  const { user, logout } = useAuth();
  const { companies, selectedCompany, setSelectedCompanyId, notifications } = useData();
  const navigate = useNavigate();
  const [companyOpen, setCompanyOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const companyRef = useOutsideClose<HTMLDivElement>(() => setCompanyOpen(false));
  const notifRef = useOutsideClose<HTMLDivElement>(() => setNotifOpen(false));
  const userRef = useOutsideClose<HTMLDivElement>(() => setUserOpen(false));

  const unread = notifications.items.filter((n) => !n.read).length;
  const statusTone = (s?: string): BadgeTone => (s === 'actief' ? 'green' : s === 'pauze' ? 'amber' : 'slate');

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 sm:px-6 acc-glass-strong border-b border-[var(--acc-border)]">
      <button className="lg:hidden text-[var(--acc-muted)]" onClick={onMenu} aria-label="Menu"><Menu size={20} /></button>

      {/* Company switcher */}
      <div className="relative" ref={companyRef}>
        <button
          onClick={() => setCompanyOpen((v) => !v)}
          className="flex items-center gap-2.5 acc-glass hover:border-white/20 border border-[var(--acc-border)] rounded-xl pl-2 pr-3 py-1.5 transition-colors max-w-[220px]"
        >
          <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: selectedCompany?.accentColor ?? '#3B82F6' }}>
            {selectedCompany ? selectedCompany.name.slice(0, 2).toUpperCase() : <Building2 size={14} />}
          </span>
          <span className="text-left min-w-0 hidden sm:block">
            <span className="block text-xs font-semibold truncate leading-tight">{selectedCompany?.name ?? 'Selecteer klant'}</span>
            <span className="block text-[10px] text-[var(--acc-muted)] leading-tight">{selectedCompany?.sector ?? 'Geen selectie'}</span>
          </span>
          <ChevronDown size={15} className="text-[var(--acc-muted)] shrink-0" />
        </button>
        {companyOpen && (
          <div className="absolute left-0 mt-2 w-72 acc-glass-strong rounded-2xl shadow-2xl p-2 max-h-[70vh] overflow-y-auto acc-scroll">
            <p className="px-2 py-1.5 text-[10px] uppercase tracking-wider text-[var(--acc-muted)] font-semibold">Klanten</p>
            {companies.visible.map((c) => (
              <button
                key={c.id}
                onClick={() => { setSelectedCompanyId(c.id); setCompanyOpen(false); }}
                className="w-full flex items-center gap-2.5 px-2 py-2 rounded-xl hover:bg-white/5 transition-colors text-left"
              >
                <span className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0" style={{ background: c.accentColor }}>
                  {c.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-xs font-semibold truncate">{c.name}</span>
                  <span className="block text-[10px] text-[var(--acc-muted)] truncate">{c.sector}</span>
                </span>
                <Badge tone={statusTone(c.status)} dot>{c.status}</Badge>
                {selectedCompany?.id === c.id && <Check size={14} className="text-blue-400 shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search trigger */}
      <button
        onClick={() => setSearchOpen(true)}
        className="hidden md:flex items-center gap-2 acc-input px-3 py-2 text-sm text-[var(--acc-muted)] flex-1 max-w-md hover:border-white/20"
      >
        <Search size={15} /> Zoek klanten, leads, offertes…
        <kbd className="ml-auto px-1.5 py-0.5 rounded bg-white/8 text-[10px]">/</kbd>
      </button>

      <div className="flex-1 md:hidden" />

      {/* AI Command */}
      <button
        onClick={onCommand}
        className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/20 hover:opacity-90 transition-opacity"
      >
        <Sparkles size={15} /> <span className="hidden sm:inline">AI</span>
        <kbd className="hidden sm:inline px-1.5 py-0.5 rounded bg-white/20 text-[10px]">⌘K</kbd>
      </button>

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button onClick={() => setNotifOpen((v) => !v)} className="relative w-10 h-10 rounded-xl hover:bg-white/5 flex items-center justify-center text-[var(--acc-muted)] hover:text-white transition-colors">
          <Bell size={18} />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 acc-pulse" />}
        </button>
        {notifOpen && (
          <div className="absolute right-0 mt-2 w-80 acc-glass-strong rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--acc-border)]">
              <span className="text-sm font-semibold">Notificaties</span>
              {unread > 0 && <Badge tone="red">{unread} nieuw</Badge>}
            </div>
            <div className="max-h-96 overflow-y-auto acc-scroll">
              {notifications.items.slice(0, 8).map((n) => (
                <button
                  key={n.id}
                  onClick={() => notifications.update(n.id, { read: true })}
                  className="w-full text-left px-4 py-3 hover:bg-white/5 border-b border-[var(--acc-border)] last:border-0 flex gap-2.5"
                >
                  <Dot size={20} className={cn('shrink-0 -ml-1.5', n.level === 'error' ? 'text-red-400' : n.level === 'success' ? 'text-emerald-400' : n.level === 'warn' ? 'text-amber-400' : 'text-blue-400', n.read && 'opacity-30')} />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold">{n.title}</span>
                    <span className="block text-[11px] text-[var(--acc-muted)] truncate">{n.body}</span>
                    <span className="block text-[10px] text-[var(--acc-muted)] mt-0.5">{formatRelative(n.at)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div className="relative" ref={userRef}>
        <button onClick={() => setUserOpen((v) => !v)} className="flex items-center gap-2 rounded-xl pl-1 pr-2 py-1 hover:bg-white/5 transition-colors">
          <Avatar name={user?.name ?? '?'} color={user?.avatarColor} size={32} />
          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-xs font-semibold">{user?.name}</span>
            <span className="block text-[10px] text-[var(--acc-muted)]">{user ? ROLE_LABELS[user.role] : ''}</span>
          </span>
          <ChevronDown size={14} className="text-[var(--acc-muted)] hidden sm:block" />
        </button>
        {userOpen && (
          <div className="absolute right-0 mt-2 w-56 acc-glass-strong rounded-2xl shadow-2xl p-2">
            <div className="px-3 py-2 border-b border-[var(--acc-border)] mb-1">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-[11px] text-[var(--acc-muted)] truncate">{user?.email}</p>
              <div className="mt-1.5"><Badge tone="purple">{user ? ROLE_LABELS[user.role] : ''}</Badge></div>
            </div>
            <button onClick={() => { setUserOpen(false); navigate('/agency/settings'); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-white/5 transition-colors">Instellingen</button>
            <button onClick={() => { logout(); navigate('/agency/login'); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-300 hover:bg-red-500/10 transition-colors">
              <LogOut size={15} /> Uitloggen
            </button>
          </div>
        )}
      </div>

      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
