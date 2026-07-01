import type { DashboardConfig } from '@/types';

export const bulkBuyerDashboard: DashboardConfig = {
  role: 'bulk-buyer',
  title: 'Bulk Buyer Dashboard',
  subtitle: 'Source large volumes and manage procurement contracts',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/bulk-buyer' },
    { label: 'Bulk Buyer' },
  ],
};
