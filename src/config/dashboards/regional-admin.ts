import type { DashboardConfig } from '@/types';

export const regionalAdminDashboard: DashboardConfig = {
  role: 'regional-admin',
  title: 'Regional Admin Dashboard',
  subtitle: 'Oversee regional operations, approvals, and performance',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/regional-admin' },
    { label: 'Regional Admin' },
  ],
};
