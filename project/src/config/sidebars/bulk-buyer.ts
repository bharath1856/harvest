import type { NavSection } from '@/types';

export const bulkBuyerSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/bulk-buyer', icon: 'LayoutDashboard' },
      { label: 'Analytics', href: '/dashboard/bulk-buyer/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Procurement',
    items: [
      { label: 'Bulk Catalog', href: '/dashboard/bulk-buyer/catalog', icon: 'Boxes' },
      { label: 'Contracts', href: '/dashboard/bulk-buyer/contracts', icon: 'FileText' },
      { label: 'Orders', href: '/dashboard/bulk-buyer/orders', icon: 'ListOrdered', badge: '7' },
      { label: 'Logistics', href: '/dashboard/bulk-buyer/logistics', icon: 'Truck' },
    ],
  },
  {
    title: 'Tools',
    items: [
      { label: 'Community', href: '/dashboard/bulk-buyer/community', icon: 'MessageSquare' },
      { label: 'QR Scan', href: '/dashboard/bulk-buyer/qr', icon: 'QrCode' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Wallet', href: '/dashboard/bulk-buyer/wallet', icon: 'Wallet' },
      { label: 'Settings', href: '/dashboard/bulk-buyer/settings', icon: 'Settings' },
    ],
  },
];
