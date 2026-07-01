'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';
import { BreadcrumbNav } from '@/components/layout/BreadcrumbNav';
import { DashboardFooter } from '@/components/layout/DashboardFooter';
import { useApp } from '@/context/AppContext';
import { getDashboardPath } from '@/config/routes';
import type { NavSection, Role, DashboardConfig } from '@/types';
import { roleMeta } from '@/services/mockApi';

interface DashboardShellProps {
  role: Role;
  sidebarSections: NavSection[];
  config: DashboardConfig;
  children: ReactNode;
}

export function DashboardShell({
  role,
  sidebarSections,
  config,
  children,
}: DashboardShellProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { role: ctxRole, hydrated, sidebarOpen, setSidebarOpen, sidebarCollapsed } = useApp();
  const reduceMotion = useReducedMotion();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (!ctxRole) {
      setRedirecting(true);
      router.replace('/login');
      return;
    }
    if (ctxRole !== role) {
      setRedirecting(true);
      router.replace(getDashboardPath(ctxRole));
      return;
    }
  }, [hydrated, ctxRole, role, router]);

  if (!hydrated || redirecting) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (ctxRole !== role) {
    return null;
  }

  const meta = roleMeta[role];

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden border-r border-border/60 transition-[width] duration-200 lg:block ${
          sidebarCollapsed ? 'w-[72px]' : 'w-64'
        }`}
      >
        <Sidebar role={role} sections={sidebarSections} collapsed={sidebarCollapsed} />
      </aside>

      {/* Mobile sidebar (sheet) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">{meta.label} navigation</SheetTitle>
          <Sidebar role={role} sections={sidebarSections} collapsed={false} />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <div
        className={`flex min-h-screen flex-col transition-[padding] duration-200 ${
          sidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        }`}
      >
        <Navbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Page header */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6"
            >
              <BreadcrumbNav items={config.breadcrumb} />
              <div className="mt-3 flex flex-col gap-1">
                <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {config.title}
                </h1>
                <p className="text-sm text-muted-foreground sm:text-base">
                  {config.subtitle}
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {children}
            </motion.div>
          </div>
        </main>

        <DashboardFooter />
      </div>
    </div>
  );
}
