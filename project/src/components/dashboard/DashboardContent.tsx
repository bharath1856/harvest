'use client';

import { useEffect, useState } from 'react';
import { KpiCard } from '@/components/dashboard/KpiCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { DashboardChart } from '@/components/dashboard/DashboardChart';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { InsightBanner } from '@/components/dashboard/InsightBanner';
import { DashboardSkeleton } from '@/components/dashboard/DashboardSkeleton';
import { QrWidget } from '@/components/modules/QrWidget';
import { WeatherWidget } from '@/components/modules/WeatherWidget';
import { CommunityWidget } from '@/components/modules/CommunityWidget';
import { LandLeaseWidget } from '@/components/modules/LandLeaseWidget';
import { getIcon } from '@/lib/icons';
import type { RoleDashboardData } from '@/services/dashboardData';

interface DashboardContentProps {
  data: RoleDashboardData;
}

export function DashboardContent({ data }: DashboardContentProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  const { modules } = data;
  const moduleCount = [modules.qr, modules.weather, modules.community, modules.landLease].filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.kpis.map((kpi, i) => {
          const Icon = getIcon(kpi.icon);
          return (
            <KpiCard
              key={kpi.label}
              label={kpi.label}
              value={kpi.value}
              change={kpi.change}
              changeLabel={kpi.changeLabel}
              icon={Icon}
              accent={kpi.accent}
              index={i}
            />
          );
        })}
      </div>

      {/* Insight */}
      <InsightBanner
        title={data.insight.title}
        body={data.insight.body}
        tone={data.insight.tone}
        index={4}
      />

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          title={data.primaryChart.title}
          description={data.primaryChart.description}
          className="lg:col-span-2"
          index={5}
        >
          <DashboardChart config={data.primaryChart} />
        </ChartCard>
        {data.secondaryChart && (
          <ChartCard
            title={data.secondaryChart.title}
            description={data.secondaryChart.description}
            index={6}
          >
            <DashboardChart config={data.secondaryChart} height={280} />
          </ChartCard>
        )}
      </div>

      {/* Activity + Quick Actions */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ActivityFeed items={data.activity} index={7} />
        <QuickActions actions={data.actions} index={8} />
      </div>

      {/* Phase 4 Modules — only rendered when configured for this role */}
      {moduleCount > 0 && (
        <div
          className={
            moduleCount === 1
              ? 'grid gap-4'
              : moduleCount === 2
              ? 'grid gap-4 lg:grid-cols-2'
              : moduleCount === 3
              ? 'grid gap-4 lg:grid-cols-3'
              : 'grid gap-4 md:grid-cols-2 xl:grid-cols-4'
          }
        >
          {modules.qr && <QrWidget mode={modules.qr} />}
          {modules.weather && <WeatherWidget mode={modules.weather} />}
          {modules.community && <CommunityWidget mode={modules.community} />}
          {modules.landLease && <LandLeaseWidget mode={modules.landLease} />}
        </div>
      )}
    </div>
  );
}
