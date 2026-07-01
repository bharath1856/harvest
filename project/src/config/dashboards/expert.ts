import type { DashboardConfig } from '@/types';

export const expertDashboard: DashboardConfig = {
  role: 'expert',
  title: 'Expert Dashboard',
  subtitle: 'Provide advisory, verify quality, and share knowledge',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/expert' },
    { label: 'Expert' },
  ],
};
