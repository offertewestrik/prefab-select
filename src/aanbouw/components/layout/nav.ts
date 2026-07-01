import {
  LayoutDashboard, Inbox, Building2, Users, BarChart3,
  FileText, Hammer, MapPin, Wrench, Briefcase, CreditCard,
  PlusCircle, FolderOpen, MessagesSquare, Settings,
  type LucideIcon,
} from 'lucide-react';
import type { Permission } from '../../lib/rbac';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  permission: Permission;
  group: 'overzicht' | 'admin' | 'aannemer' | 'klant' | 'systeem';
}

export const BASE = '/aanbouw';

export const NAV_ITEMS: NavItem[] = [
  { to: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard, permission: 'view:admin-dashboard', group: 'overzicht' },
  { to: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard, permission: 'view:contractor-dashboard', group: 'overzicht' },
  { to: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard, permission: 'view:customer-dashboard', group: 'overzicht' },

  // Admin
  { to: `${BASE}/aanvragen`, label: 'Alle aanvragen', icon: Inbox, permission: 'view:all-requests', group: 'admin' },
  { to: `${BASE}/bouwbedrijven`, label: 'Bouwbedrijven', icon: Building2, permission: 'view:companies', group: 'admin' },
  { to: `${BASE}/klanten`, label: 'Klanten', icon: Users, permission: 'view:customers', group: 'admin' },
  { to: `${BASE}/statistieken`, label: 'Statistieken', icon: BarChart3, permission: 'view:statistics', group: 'admin' },

  // Aannemer
  { to: `${BASE}/leads`, label: 'Aanvragen & leads', icon: Hammer, permission: 'view:new-leads', group: 'aannemer' },
  { to: `${BASE}/offertes`, label: 'Offertes', icon: FileText, permission: 'view:quotes', group: 'aannemer' },
  { to: `${BASE}/projecten`, label: 'Gewonnen projecten', icon: Briefcase, permission: 'view:projects', group: 'aannemer' },
  { to: `${BASE}/werkgebied`, label: 'Werkgebied', icon: MapPin, permission: 'manage:workarea', group: 'aannemer' },
  { to: `${BASE}/diensten`, label: 'Diensten', icon: Wrench, permission: 'manage:services', group: 'aannemer' },
  { to: `${BASE}/bedrijfsprofiel`, label: 'Bedrijfsprofiel', icon: Building2, permission: 'manage:company-profile', group: 'aannemer' },
  { to: `${BASE}/credits`, label: 'Leadkosten & credits', icon: CreditCard, permission: 'view:credits', group: 'aannemer' },

  // Klant
  { to: `${BASE}/nieuwe-aanvraag`, label: 'Nieuwe aanvraag', icon: PlusCircle, permission: 'create:request', group: 'klant' },
  { to: `${BASE}/mijn-aanvragen`, label: 'Mijn aanvragen', icon: FolderOpen, permission: 'view:own-requests', group: 'klant' },
  { to: `${BASE}/berichten`, label: 'Berichten & offertes', icon: MessagesSquare, permission: 'view:messages', group: 'klant' },

  // Shared
  { to: `${BASE}/instellingen`, label: 'Instellingen', icon: Settings, permission: 'view:settings', group: 'systeem' },
];

export const GROUP_LABELS: Record<NavItem['group'], string> = {
  overzicht: 'Overzicht',
  admin: 'Beheer',
  aannemer: 'Mijn bouwbedrijf',
  klant: 'Mijn project',
  systeem: 'Systeem',
};
