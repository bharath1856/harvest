'use client';

import { DashboardShell } from '@/components/layout/DashboardShell';
import { DashboardContent } from '@/components/dashboard/DashboardContent';
import { staffSidebar } from '@/config/sidebars/staff';
import { staffDashboard } from '@/config/dashboards/staff';
import { roleDashboardData } from '@/services/dashboardData';

export default function StaffDashboard() {
  return (
    <DashboardShell
      role="staff"
      sidebarSections={staffSidebar}
      config={staffDashboard}
    >
      <DashboardContent data={roleDashboardData.staff} />
    </DashboardShell>
  );
}
