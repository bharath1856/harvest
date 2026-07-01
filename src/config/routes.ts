import type { Role } from '@/types';

export const roleRoutes: Record<Role, string> = {
  farmer: '/dashboard/farmer',
  buyer: '/dashboard/buyer',
  'bulk-buyer': '/dashboard/bulk-buyer',
  staff: '/dashboard/staff',
  'regional-admin': '/dashboard/regional-admin',
  'super-admin': '/dashboard/super-admin',
  expert: '/dashboard/expert',
  provider: '/dashboard/provider',
  warehouse: '/dashboard/warehouse',
};

export function getDashboardPath(role: Role): string {
  return roleRoutes[role];
}

export function getRoleFromPath(path: string): Role | null {
  const match = path.match(/^\/dashboard\/([a-z-]+)/);
  if (!match) return null;
  const slug = match[1] as Role;
  return slug in roleRoutes ? slug : null;
}
