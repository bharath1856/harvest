import type { NavSection } from '@/types';

export const farmerSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/farmer', icon: 'LayoutDashboard' },
      { label: 'Analytics', href: '/dashboard/farmer/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { label: 'My Harvests', href: '/dashboard/farmer/harvests', icon: 'Sprout' },
      { label: 'Listings', href: '/dashboard/farmer/listings', icon: 'Store' },
      { label: 'Orders', href: '/dashboard/farmer/orders', icon: 'ListOrdered', badge: '4' },
      { label: 'Dispatch', href: '/dashboard/farmer/dispatch', icon: 'Truck' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Weather', href: '/dashboard/farmer/weather', icon: 'CloudSun' },
      { label: 'Land Lease', href: '/dashboard/farmer/land-lease', icon: 'LandPlot' },
      { label: 'Community', href: '/dashboard/farmer/community', icon: 'MessageSquare' },
      { label: 'QR Codes', href: '/dashboard/farmer/qr', icon: 'QrCode' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Wallet', href: '/dashboard/farmer/wallet', icon: 'Wallet' },
      { label: 'Settings', href: '/dashboard/farmer/settings', icon: 'Settings' },
    ],
  },
];
