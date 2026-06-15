import {
  LayoutDashboard, Building2, Users, KanbanSquare, FileText, BarChart3,
  TrendingUp, FolderGit2, Bot, CheckSquare, FileBarChart, CalendarDays, Settings,
  type LucideIcon,
} from 'lucide-react';
import type { Permission } from '../../lib/rbac';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  permission: Permission;
  group: 'overzicht' | 'sales' | 'marketing' | 'tech' | 'systeem';
}

export const BASE = '/agency';

export const NAV_ITEMS: NavItem[] = [
  { to: `${BASE}/dashboard`, label: 'Dashboard', icon: LayoutDashboard, permission: 'view:dashboard', group: 'overzicht' },
  { to: `${BASE}/companies`, label: 'Bedrijven', icon: Building2, permission: 'view:companies', group: 'overzicht' },

  { to: `${BASE}/leads`, label: 'Leads', icon: Users, permission: 'view:leads', group: 'sales' },
  { to: `${BASE}/crm`, label: 'CRM Pipeline', icon: KanbanSquare, permission: 'view:leads', group: 'sales' },
  { to: `${BASE}/quotes`, label: 'Offertes', icon: FileText, permission: 'view:quotes', group: 'sales' },
  { to: `${BASE}/revenue`, label: 'Omzet & Groei', icon: TrendingUp, permission: 'view:revenue', group: 'sales' },

  { to: `${BASE}/analytics`, label: 'Analytics', icon: BarChart3, permission: 'view:analytics', group: 'marketing' },
  { to: `${BASE}/content`, label: 'Content', icon: CalendarDays, permission: 'view:content', group: 'marketing' },
  { to: `${BASE}/reports`, label: 'Rapportages', icon: FileBarChart, permission: 'view:reports', group: 'marketing' },

  { to: `${BASE}/agents`, label: 'AI Agents', icon: Bot, permission: 'view:agents', group: 'tech' },
  { to: `${BASE}/projects`, label: 'Projecten', icon: FolderGit2, permission: 'view:projects', group: 'tech' },
  { to: `${BASE}/tasks`, label: 'Taken', icon: CheckSquare, permission: 'view:tasks', group: 'tech' },

  { to: `${BASE}/settings`, label: 'Instellingen', icon: Settings, permission: 'view:settings', group: 'systeem' },
];

export const GROUP_LABELS: Record<NavItem['group'], string> = {
  overzicht: 'Overzicht',
  sales: 'Sales & CRM',
  marketing: 'Marketing',
  tech: 'Tech & AI',
  systeem: 'Systeem',
};
