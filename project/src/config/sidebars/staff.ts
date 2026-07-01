import type { NavSection } from '@/types';

export const staffSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/staff', icon: 'LayoutDashboard' },
      { label: 'Tasks', href: '/dashboard/staff/tasks', icon: 'ClipboardCheck', badge: '12' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'Order Fulfillment', href: '/dashboard/staff/fulfillment', icon: 'PackageCheck' },
      { label: 'Dispatch', href: '/dashboard/staff/dispatch', icon: 'Truck' },
      { label: 'Quality Checks', href: '/dashboard/staff/quality', icon: 'CheckCircle2' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'QR Scanner', href: '/dashboard/staff/qr', icon: 'QrCode' },
      { label: 'Community', href: '/dashboard/staff/community', icon: 'MessageSquare' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings', href: '/dashboard/staff/settings', icon: 'Settings' },
    ],
  },
];
