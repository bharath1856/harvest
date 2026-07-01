import type { NavSection } from '@/types';

export const providerSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/provider', icon: 'LayoutDashboard' },
      { label: 'Analytics', href: '/dashboard/provider/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { label: 'Products', href: '/dashboard/provider/products', icon: 'Package' },
      { label: 'Inventory', href: '/dashboard/provider/inventory', icon: 'Boxes' },
      { label: 'Services', href: '/dashboard/provider/services', icon: 'Store' },
    ],
  },
  {
    title: 'Business',
    items: [
      { label: 'Orders', href: '/dashboard/provider/orders', icon: 'ListOrdered', badge: '6' },
      { label: 'Community', href: '/dashboard/provider/community', icon: 'MessageSquare' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Wallet', href: '/dashboard/provider/wallet', icon: 'Wallet' },
      { label: 'Settings', href: '/dashboard/provider/settings', icon: 'Settings' },
    ],
  },
];
