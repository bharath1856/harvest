import type { NavSection } from '@/types';

export const superAdminSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/super-admin', icon: 'LayoutDashboard' },
      { label: 'Platform Analytics', href: '/dashboard/super-admin/analytics', icon: 'BarChart3' },
    ],
  },
  {
    title: 'Administration',
    items: [
      { label: 'All Users', href: '/dashboard/super-admin/users', icon: 'Users' },
      { label: 'Roles & Permissions', href: '/dashboard/super-admin/roles', icon: 'ShieldCheck' },
      { label: 'Regions', href: '/dashboard/super-admin/regions', icon: 'Globe' },
      { label: 'Audit Log', href: '/dashboard/super-admin/audit', icon: 'FileText' },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Configuration', href: '/dashboard/super-admin/config', icon: 'Settings' },
      { label: 'Alerts', href: '/dashboard/super-admin/alerts', icon: 'AlertTriangle' },
    ],
  },
];
