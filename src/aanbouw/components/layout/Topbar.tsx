import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, ChevronDown, LogOut, Dot, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { ROLE_LABELS } from '../../lib/rbac';
import { Avatar, Badge, cn } from '../ui';
import { formatRelative } from '../../lib/format';

function useOutsideClose<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);
  return ref;
}

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { user, logout } = useAuth();
  const { notifications, myCompany } = useData();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const notifRef = useOutsideClose<HTMLDivElement>(() => setNotifOpen(false));
  const userRef = useOutsideClose<HTMLDivElement>(() => setUserOpen(false));

  const mine = notifications.mine;
  const unread = mine.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center gap-3 px-4 sm:px-6 bg-white/85 backdrop-blur-md border-b border-[var(--abp-border)]">
      <button className="lg:hidden text-[var(--abp-muted)]" onClick={onMenu} aria-label="Menu"><Menu size={20} /></button>

      <div className="min-w-0">
        <p className="text-sm font-semibold text-[var(--abp-navy)] truncate">
          {user?.role === 'aannemer' && myCompany ? myCompany.name
            : user?.role === 'admin' ? 'Platformbeheer'
            : 'Mijn aanbouwproject'}
        </p>
        <p className="text-[11px] text-[var(--abp-muted)] truncate">
          {user?.role === 'aannemer' && myCompany
            ? (myCompany.verified ? 'Geverifieerd bouwbedrijf' : 'Verificatie in behandeling')
            : user?.role === 'admin' ? 'AanbouwPlatform.nl beheeromgeving'
            : 'Volg je aanvraag van offerte tot oplevering'}
        </p>
      </div>

      <div className="flex-1" />

      {/* Notifications */}
      <div className="relative" ref={notifRef}>
        <button onClick={() => setNotifOpen((v) => !v)} className="relative w-10 h-10 rounded-xl hover:bg-[var(--abp-surface-2)] flex items-center justify-center text-[var(--abp-muted)] hover:text-[var(--abp-navy)] transition-colors">
          <Bell size={18} />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[var(--abp-accent)] abp-pulse" />}
        </button>
        {notifOpen && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-[var(--abp-border)] rounded-2xl shadow-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--abp-border)]">
              <span className="text-sm font-semibold">Notificaties</span>
              {unread > 0 && <Badge tone="orange">{unread} nieuw</Badge>}
            </div>
            <div className="max-h-96 overflow-y-auto abp-scroll">
              {mine.length === 0 && <p className="px-4 py-6 text-center text-sm text-[var(--abp-muted)]">Geen notificaties</p>}
              {mine.slice(0, 8).map((n) => (
                <button
                  key={n.id}
                  onClick={() => notifications.update(n.id, { read: true })}
                  className="w-full text-left px-4 py-3 hover:bg-[var(--abp-surface-2)] border-b border-[var(--abp-border)] last:border-0 flex gap-2.5"
                >
                  <Dot size={20} className={cn('shrink-0 -ml-1.5', n.level === 'error' ? 'text-red-500' : n.level === 'success' ? 'text-emerald-500' : n.level === 'warn' ? 'text-amber-500' : 'text-sky-500', n.read && 'opacity-30')} />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold">{n.title}</span>
                    <span className="block text-[11px] text-[var(--abp-muted)]">{n.body}</span>
                    <span className="block text-[10px] text-[var(--abp-faint)] mt-0.5">{formatRelative(n.at)}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* User */}
      <div className="relative" ref={userRef}>
        <button onClick={() => setUserOpen((v) => !v)} className="flex items-center gap-2 rounded-xl pl-1 pr-2 py-1 hover:bg-[var(--abp-surface-2)] transition-colors">
          <Avatar name={user?.name ?? '?'} color={user?.avatarColor} size={32} />
          <span className="hidden sm:block text-left leading-tight">
            <span className="block text-xs font-semibold">{user?.name}</span>
            <span className="block text-[10px] text-[var(--abp-muted)]">{user ? ROLE_LABELS[user.role] : ''}</span>
          </span>
          <ChevronDown size={14} className="text-[var(--abp-muted)] hidden sm:block" />
        </button>
        {userOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-[var(--abp-border)] rounded-2xl shadow-xl p-2">
            <div className="px-3 py-2 border-b border-[var(--abp-border)] mb-1">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-[11px] text-[var(--abp-muted)] truncate">{user?.email}</p>
              <div className="mt-1.5 flex items-center gap-1.5">
                <Badge tone="navy">{user ? ROLE_LABELS[user.role] : ''}</Badge>
                {user?.role === 'aannemer' && myCompany?.verified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600"><ShieldCheck size={12} /> Geverifieerd</span>
                )}
              </div>
            </div>
            <button onClick={() => { setUserOpen(false); navigate('/aanbouw/instellingen'); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[var(--abp-surface-2)] transition-colors">Instellingen</button>
            <button onClick={() => { logout(); navigate('/aanbouw/login'); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors">
              <LogOut size={15} /> Uitloggen
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
