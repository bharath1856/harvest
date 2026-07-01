import type { DashboardConfig } from '@/types';

export const staffDashboard: DashboardConfig = {
  role: 'staff',
  title: 'Staff Dashboard',
  subtitle: 'Coordinate logistics, fulfillment, and quality checks',
  breadcrumb: [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard/staff' },
    { label: 'Staff' },
  ],
};
