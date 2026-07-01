import type { NavSection } from '@/types';

export const buyerSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/buyer', icon: 'LayoutDashboard' },
      { label: 'Discover', href: '/dashboard/buyer/discover', icon: 'Search' },
    ],
  },
  {
    title: 'Shopping',
    items: [
      { label: 'Marketplace', href: '/dashboard/buyer/marketplace', icon: 'Store' },
      { label: 'My Orders', href: '/dashboard/buyer/orders', icon: 'ListOrdered', badge: '2' },
      { label: 'Saved Items', href: '/dashboard/buyer/saved', icon: 'ShoppingBasket' },
    ],
  },
  {
    title: 'Community',
    items: [
      { label: 'Community', href: '/dashboard/buyer/community', icon: 'MessageSquare' },
      { label: 'QR Scan', href: '/dashboard/buyer/qr', icon: 'QrCode' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Wallet', href: '/dashboard/buyer/wallet', icon: 'Wallet' },
      { label: 'Settings', href: '/dashboard/buyer/settings', icon: 'Settings' },
    ],
  },
];
