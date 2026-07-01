import type { DashboardConfig } from '@/types';

export const warehouseDashboard: DashboardConfig = {
  role: 'warehouse',
  title: 'Warehouse Dashboard',
  subtitle: 'Manage inventory, storage, and dispatch operations',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/warehouse' },
    { label: 'Warehouse' },
  ],
};
