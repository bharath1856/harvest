'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import { Sprout, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getIcon } from '@/lib/icons';
import { useApp } from '@/context/AppContext';
import { roleMeta } from '@/services/mockApi';
import type { NavSection, Role } from '@/types';

interface SidebarProps {
  role: Role;
  sections: NavSection[];
  collapsed: boolean;
}

const navItemVariants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0 },
};

export function Sidebar({ role, sections, collapsed }: SidebarProps) {
  const pathname = usePathname();
  const { setSidebarOpen } = useApp();
  const reduceMotion = useReducedMotion();
  const meta = roleMeta[role];
  const RoleIcon = getIcon(meta.icon);

  const isActiveRoute = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Role accent strip */}
      <div
        className={cn('h-1 w-full bg-gradient-to-r', meta.accent)}
        role="presentation"
        aria-hidden="true"
      />

      {/* Brand */}
      <div
        className={cn(
          'flex h-16 items-center border-b border-border/60',
          collapsed ? 'justify-center px-2' : 'px-4'
        )}
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
          aria-label="HarvestLink home"
        >
          <div
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm',
              meta.accent
            )}
            aria-hidden="true"
          >
            {collapsed ? <RoleIcon className="h-4 w-4" /> : <Sprout className="h-4 w-4" />}
          </div>
          {!collapsed && (
            <span className="font-display text-base font-bold tracking-tight">
              Harvest<span className="text-primary">Link</span>
            </span>
          )}
        </Link>
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-3 pt-3">
          <div
            className={cn('rounded-lg border border-white/20 bg-gradient-to-br px-3 py-2.5', meta.accent)}
            role="status"
            aria-live="polite"
          >
            <p className="text-xs font-medium text-white/80">Signed in as</p>
            <p className="text-sm font-semibold text-white">{meta.label}</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav
        className="flex-1 overflow-y-auto scrollbar-thin px-3 py-3"
        aria-label="Main navigation"
      >
        <ul className="space-y-6" role="list">
          {sections.map((section) => (
            <li key={section.title}>
              {!collapsed && (
                <p
                  className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70"
                  aria-hidden="true"
                >
                  {section.title}
                </p>
              )}
              <ul className="space-y-1" role="list">
                {section.items.map((item, idx) => {
                  const Icon = getIcon(item.icon);
                  const isActive = isActiveRoute(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        title={collapsed ? item.label : undefined}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150',
                          collapsed && 'justify-center',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:bg-secondary hover:text-foreground active:bg-secondary/80'
                        )}
                      >
                        {isActive && !reduceMotion && (
                          <motion.div
                            layoutId="sidebar-active"
                            className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-primary"
                            initial={false}
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            aria-hidden="true"
                          />
                        )}
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {!collapsed && <span className="flex-1 truncate">{item.label}</span>}
                        {!collapsed && item.badge && (
                          <span
                            className="rounded-full bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary"
                            aria-label={`${item.badge} items`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {!collapsed && isActive && (
                          <ChevronRight className="h-4 w-4 text-primary" aria-hidden="true" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div
        className={cn('border-t border-border/60 p-3', collapsed && 'px-2')}
      >
        <Link
          href="/login"
          onClick={() => setSidebarOpen(false)}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            collapsed && 'justify-center'
          )}
          aria-label="Sign out"
        >
          <LogOutIcon />
          {!collapsed && <span>Sign out</span>}
        </Link>
      </div>
    </div>
  );
}

function LogOutIcon() {
  const Icon = getIcon('LogOut');
  return <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />;
}
