'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const } },
};

const moduleContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export function DashboardContent({ data }: DashboardContentProps) {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(t);
  }, []);

  const { modules } = data;
  const moduleCount = [modules.qr, modules.weather, modules.community, modules.landLease].filter(Boolean).length;

  const containerAnimation = reduceMotion
    ? {}
    : {
        variants: containerVariants,
        initial: 'hidden',
        animate: 'show',
      };

  const moduleAnimation = reduceMotion
    ? {}
    : {
        variants: moduleContainerVariants,
        initial: 'hidden',
        animate: 'show',
      };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DashboardSkeleton />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className="space-y-6"
          {...containerAnimation}
        >
          {/* KPI Cards */}
          <motion.div
            variants={itemVariants}
            className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          >
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
          </motion.div>

          {/* Insight */}
          <motion.div variants={itemVariants}>
            <InsightBanner
              title={data.insight.title}
              body={data.insight.body}
              tone={data.insight.tone}
            />
          </motion.div>

          {/* Charts */}
          <motion.div
            variants={itemVariants}
            className="grid gap-4 grid-cols-1 lg:grid-cols-3"
          >
            <ChartCard
              title={data.primaryChart.title}
              description={data.primaryChart.description}
              className="lg:col-span-2"
            >
              <DashboardChart config={data.primaryChart} />
            </ChartCard>
            {data.secondaryChart && (
              <ChartCard
                title={data.secondaryChart.title}
                description={data.secondaryChart.description}
              >
                <DashboardChart config={data.secondaryChart} height={280} />
              </ChartCard>
            )}
          </motion.div>

          {/* Activity + Quick Actions */}
          <motion.div
            variants={itemVariants}
            className="grid gap-4 grid-cols-1 lg:grid-cols-2"
          >
            <ActivityFeed items={data.activity} />
            <QuickActions actions={data.actions} />
          </motion.div>

          {/* Phase 4 Modules */}
          {moduleCount > 0 && (
            <motion.div
              {...moduleAnimation}
              className={
                moduleCount === 1
                  ? 'grid gap-4'
                  : moduleCount === 2
                  ? 'grid gap-4 grid-cols-1 lg:grid-cols-2'
                  : moduleCount === 3
                  ? 'grid gap-4 grid-cols-1 lg:grid-cols-3'
                  : 'grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4'
              }
            >
              {modules.qr && (
                <motion.div variants={itemVariants}>
                  <QrWidget mode={modules.qr} />
                </motion.div>
              )}
              {modules.weather && (
                <motion.div variants={itemVariants}>
                  <WeatherWidget mode={modules.weather} />
                </motion.div>
              )}
              {modules.community && (
                <motion.div variants={itemVariants}>
                  <CommunityWidget mode={modules.community} />
                </motion.div>
              )}
              {modules.landLease && (
                <motion.div variants={itemVariants}>
                  <LandLeaseWidget mode={modules.landLease} />
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
