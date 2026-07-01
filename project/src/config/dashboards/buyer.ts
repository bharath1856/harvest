import type { DashboardConfig } from '@/types';

export const buyerDashboard: DashboardConfig = {
  role: 'buyer',
  title: 'Buyer Dashboard',
  subtitle: 'Discover fresh produce and manage your orders',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/buyer' },
    { label: 'Buyer' },
  ],
};
