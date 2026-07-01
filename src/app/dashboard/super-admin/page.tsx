'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { superAdminSidebar } from '@/config/sidebars/super-admin';
import { superAdminDashboard } from '@/config/dashboards/super-admin';
import { roleDashboardData } from '@/services/dashboardData';

export default function SuperAdminDashboard() {
  return (
    <DashboardShell
      role="super-admin"
      sidebarSections={superAdminSidebar}
      config={superAdminDashboard}
    >
      <DashboardContent data={roleDashboardData['super-admin']} />
    </DashboardShell>
  );
}
