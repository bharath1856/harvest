'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { regionalAdminSidebar } from '@/config/sidebars/regional-admin';
import { regionalAdminDashboard } from '@/config/dashboards/regional-admin';
import { roleDashboardData } from '@/services/dashboardData';

export default function RegionalAdminDashboard() {
  return (
    <DashboardShell
      role="regional-admin"
      sidebarSections={regionalAdminSidebar}
      config={regionalAdminDashboard}
    >
      <DashboardContent data={roleDashboardData['regional-admin']} />
    </DashboardShell>
  );
}
