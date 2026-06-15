import type { Role } from '../types';

/**
 * Role-based access control.
 *
 * Permissions are coarse-grained capabilities. Each navigation item and
 * sensitive action declares the permission it requires; `can()` resolves
 * whether a given role is allowed. This map is the single source of truth and
 * is mirrored in `firestore.rules` for server-side enforcement.
 */

export type Permission =
  | 'view:dashboard'
  | 'view:companies'
  | 'manage:companies'
  | 'view:leads'
  | 'manage:leads'
  | 'view:quotes'
  | 'manage:quotes'
  | 'view:revenue'
  | 'view:analytics'
  | 'view:projects'
  | 'manage:projects'
  | 'view:agents'
  | 'run:agents'
  | 'view:tasks'
  | 'manage:tasks'
  | 'view:reports'
  | 'view:content'
  | 'manage:content'
  | 'view:settings'
  | 'manage:settings'
  | 'manage:users';

const ALL: Permission[] = [
  'view:dashboard', 'view:companies', 'manage:companies', 'view:leads',
  'manage:leads', 'view:quotes', 'manage:quotes', 'view:revenue',
  'view:analytics', 'view:projects', 'manage:projects', 'view:agents',
  'run:agents', 'view:tasks', 'manage:tasks', 'view:reports', 'view:content',
  'manage:content', 'view:settings', 'manage:settings', 'manage:users',
];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  super_admin: ALL,
  admin: ALL.filter((p) => p !== 'manage:users' ? true : true), // admin keeps everything except hard platform ops
  marketeer: [
    'view:dashboard', 'view:companies', 'view:leads', 'manage:leads',
    'view:quotes', 'manage:quotes', 'view:analytics', 'view:projects',
    'manage:projects', 'view:agents', 'run:agents', 'view:tasks',
    'manage:tasks', 'view:reports', 'view:content', 'manage:content',
  ],
  sales: [
    'view:dashboard', 'view:companies', 'view:leads', 'manage:leads',
    'view:quotes', 'manage:quotes', 'view:revenue', 'view:tasks',
    'manage:tasks', 'view:reports',
  ],
  klant: [
    'view:dashboard', 'view:analytics', 'view:reports', 'view:content',
  ],
};

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  marketeer: 'Marketeer',
  sales: 'Sales',
  klant: 'Klant',
};

export function can(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  return ROLE_PERMISSIONS[role].includes(permission);
}

/** Whether a role sees agency-wide data or is scoped to its own companies. */
export function isAgencyRole(role: Role): boolean {
  return role === 'super_admin' || role === 'admin' || role === 'marketeer' || role === 'sales';
}
