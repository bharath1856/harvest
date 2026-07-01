'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { expertSidebar } from '@/config/sidebars/expert';
import { expertDashboard } from '@/config/dashboards/expert';
import { roleDashboardData } from '@/services/dashboardData';

export default function ExpertDashboard() {
  return (
    <DashboardShell
      role="expert"
      sidebarSections={expertSidebar}
      config={expertDashboard}
    >
      <DashboardContent data={roleDashboardData.expert} />
    </DashboardShell>
  );
}
