import type { NavSection } from '@/types';

export const regionalAdminSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/regional-admin', icon: 'LayoutDashboard' },
      { label: 'Regional Analytics', href: '/dashboard/regional-admin/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Management',
    items: [
      { label: 'Approvals', href: '/dashboard/regional-admin/approvals', icon: 'ShieldQuestion', badge: '5' },
      { label: 'Farmers', href: '/dashboard/regional-admin/farmers', icon: 'Sprout' },
      { label: 'Buyers', href: '/dashboard/regional-admin/buyers', icon: 'ShoppingBasket' },
      { label: 'Staff', href: '/dashboard/regional-admin/staff', icon: 'Users' },
    ],
  },
  {
    title: 'Monitoring',
    items: [
      { label: 'Alerts', href: '/dashboard/regional-admin/alerts', icon: 'AlertTriangle' },
      { label: 'Reports', href: '/dashboard/regional-admin/reports', icon: 'FileText' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings', href: '/dashboard/regional-admin/settings', icon: 'Settings' },
    ],
  },
];
