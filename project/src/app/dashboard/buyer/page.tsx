'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { buyerSidebar } from '@/config/sidebars/buyer';
import { buyerDashboard } from '@/config/dashboards/buyer';
import { roleDashboardData } from '@/services/dashboardData';

export default function BuyerDashboard() {
  return (
    <DashboardShell
      role="buyer"
      sidebarSections={buyerSidebar}
      config={buyerDashboard}
    >
      <DashboardContent data={roleDashboardData.buyer} />
    </DashboardShell>
  );
}
