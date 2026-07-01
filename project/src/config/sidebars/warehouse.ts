import type { NavSection } from '@/types';

export const warehouseSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/warehouse', icon: 'LayoutDashboard' },
      { label: 'Analytics', href: '/dashboard/warehouse/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Inventory', href: '/dashboard/warehouse/inventory', icon: 'Boxes' },
      { label: 'Inbound', href: '/dashboard/warehouse/inbound', icon: 'PackageCheck' },
      { label: 'Outbound', href: '/dashboard/warehouse/outbound', icon: 'Truck' },
      { label: 'Dispatch', href: '/dashboard/warehouse/dispatch', icon: 'Truck' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'QR Scanner', href: '/dashboard/warehouse/qr', icon: 'QrCode' },
      { label: 'Alerts', href: '/dashboard/warehouse/alerts', icon: 'AlertTriangle' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings', href: '/dashboard/warehouse/settings', icon: 'Settings' },
    ],
  },
];
