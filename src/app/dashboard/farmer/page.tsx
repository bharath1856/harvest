'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { farmerSidebar } from '@/config/sidebars/farmer';
import { farmerDashboard } from '@/config/dashboards/farmer';
import { roleDashboardData } from '@/services/dashboardData';

export default function FarmerDashboard() {
  return (
    <DashboardShell
      role="farmer"
      sidebarSections={farmerSidebar}
      config={farmerDashboard}
    >
      <DashboardContent data={roleDashboardData.farmer} />
    </DashboardShell>
  );
}
