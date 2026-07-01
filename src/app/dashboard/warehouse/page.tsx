'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { warehouseSidebar } from '@/config/sidebars/warehouse';
import { warehouseDashboard } from '@/config/dashboards/warehouse';
import { roleDashboardData } from '@/services/dashboardData';

export default function WarehouseDashboard() {
  return (
    <DashboardShell
      role="warehouse"
      sidebarSections={warehouseSidebar}
      config={warehouseDashboard}
    >
      <DashboardContent data={roleDashboardData.warehouse} />
    </DashboardShell>
  );
}
