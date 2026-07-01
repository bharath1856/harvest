import type { DashboardConfig } from '@/types';

export const superAdminDashboard: DashboardConfig = {
  role: 'super-admin',
  title: 'Super Admin Dashboard',
  subtitle: 'Full platform control, configuration, and oversight',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/super-admin' },
    { label: 'Super Admin' },
  ],
};
