'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { bulkBuyerSidebar } from '@/config/sidebars/bulk-buyer';
import { bulkBuyerDashboard } from '@/config/dashboards/bulk-buyer';
import { roleDashboardData } from '@/services/dashboardData';

export default function BulkBuyerDashboard() {
  return (
    <DashboardShell
      role="bulk-buyer"
      sidebarSections={bulkBuyerSidebar}
      config={bulkBuyerDashboard}
    >
      <DashboardContent data={roleDashboardData['bulk-buyer']} />
    </DashboardShell>
  );
}
