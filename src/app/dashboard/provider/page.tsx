'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { providerSidebar } from '@/config/sidebars/provider';
import { providerDashboard } from '@/config/dashboards/provider';
import { roleDashboardData } from '@/services/dashboardData';

export default function ProviderDashboard() {
  return (
    <DashboardShell
      role="provider"
      sidebarSections={providerSidebar}
      config={providerDashboard}
    >
      <DashboardContent data={roleDashboardData.provider} />
    </DashboardShell>
  );
}
