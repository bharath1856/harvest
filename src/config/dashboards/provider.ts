import type { DashboardConfig } from '@/types';

export const providerDashboard: DashboardConfig = {
  role: 'provider',
  title: 'Provider Dashboard',
  subtitle: 'Manage your product catalog, inventory, and orders',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/provider' },
    { label: 'Provider' },
  ],
};
