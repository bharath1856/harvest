import type { NavSection } from '@/types';

export const expertSidebar: NavSection[] = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', href: '/dashboard/expert', icon: 'LayoutDashboard' },
      { label: 'My Advisory', href: '/dashboard/expert/advisory', icon: 'GraduationCap' },
    ],
  },
  {
    title: 'Verification',
    items: [
      { label: 'Quality Reviews', href: '/dashboard/expert/quality', icon: 'CheckCircle2', badge: '3' },
      { label: 'Field Reports', href: '/dashboard/expert/reports', icon: 'FileText' },
    ],
  },
  {
    title: 'Engagement',
    items: [
      { label: 'Community', href: '/dashboard/expert/community', icon: 'MessageSquare' },
      { label: 'Knowledge Base', href: '/dashboard/expert/knowledge', icon: 'HelpCircle' },
    ],
  },
  {
    title: 'Account',
    items: [
      { label: 'Settings', href: '/dashboard/expert/settings', icon: 'Settings' },
    ],
  },
];
