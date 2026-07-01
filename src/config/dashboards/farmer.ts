import type { DashboardConfig } from '@/types';

export const farmerDashboard: DashboardConfig = {
  role: 'farmer',
  title: 'Farm Dashboard',
  subtitle: 'Monitor your harvests, listings, and farm operations',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/farmer' },
    { label: 'Farmer' },
  ],
};
