import type { Role } from '../types';

/**
 * Role-based access control for AanbouwPlatform.nl.
 *
 * Permissions are coarse-grained capabilities. Each navigation item and
 * sensitive action declares the permission it requires; `can()` resolves
 * whether a given role is allowed. This map is the single source of truth and
 * would be mirrored in `firestore.rules` for server-side enforcement.
 */

export type Permission =
  // Admin
  | 'view:admin-dashboard'
  | 'view:all-requests'
  | 'manage:requests'
  | 'assign:leads'
  | 'view:companies'
  | 'manage:companies'
  | 'verify:companies'
  | 'view:customers'
  | 'view:statistics'
  // Aannemer
  | 'view:contractor-dashboard'
  | 'view:new-leads'
  | 'view:accepted-leads'
  | 'view:quotes'
  | 'manage:quotes'
  | 'view:projects'
  | 'manage:workarea'
  | 'manage:services'
  | 'manage:company-profile'
  | 'view:credits'
  // Klant
  | 'view:customer-dashboard'
  | 'create:request'
  | 'view:own-requests'
  | 'view:messages'
  // Shared
  | 'view:settings';

const ADMIN: Permission[] = [
  'view:admin-dashboard', 'view:all-requests', 'manage:requests', 'assign:leads',
  'view:companies', 'manage:companies', 'verify:companies', 'view:customers',
  'view:statistics', 'view:settings',
];

const AANNEMER: Permission[] = [
  'view:contractor-dashboard', 'view:new-leads', 'view:accepted-leads',
  'view:quotes', 'manage:quotes', 'view:projects', 'manage:workarea',
  'manage:services', 'manage:company-profile', 'view:credits', 'view:settings',
];

const KLANT: Permission[] = [
  'view:customer-dashboard', 'create:request', 'view:own-requests',
  'view:messages', 'view:settings',
];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: ADMIN,
  aannemer: AANNEMER,
  klant: KLANT,
};

export const ROLE_LABELS: Record<Role, string> = {
  admin: 'Admin',
  aannemer: 'Aannemer',
  klant: 'Klant',
};

export function can(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

/** Landing route per role after login. */
export const ROLE_HOME: Record<Role, string> = {
  admin: '/aanbouw/dashboard',
  aannemer: '/aanbouw/dashboard',
  klant: '/aanbouw/dashboard',
};
