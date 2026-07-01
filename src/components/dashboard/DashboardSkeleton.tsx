'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading dashboard content" aria-live="polite">
      {/* KPI skeleton */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-4 sm:p-5">
            <div className="flex items-start justify-between">
              <Skeleton className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl" />
              <Skeleton className="h-5 w-12 rounded-full" />
            </div>
            <div className="mt-3 sm:mt-4 space-y-2">
              <Skeleton className="h-7 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        ))}
      </div>

      {/* Insight banner skeleton */}
      <div className="rounded-xl border bg-card p-4">
        <div className="flex items-start gap-4">
          <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full max-w-md" />
          </div>
        </div>
      </div>

      {/* Chart skeleton */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
        <div className="rounded-xl border bg-card p-4 sm:p-6 space-y-4 lg:col-span-2">
          <div className="space-y-2">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="rounded-xl border bg-card p-4 sm:p-6 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-64 w-full" />
        </div>
      </div>

      {/* Activity + actions skeleton */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <div className="rounded-xl border bg-card p-4 sm:p-6 space-y-4">
          <Skeleton className="h-5 w-32" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-14 w-full" />
            ))}
          </div>
        </div>
        <div className="rounded-xl border bg-card p-4 sm:p-6 space-y-4">
          <Skeleton className="h-5 w-28" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-16 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>

      {/* Screen reader only loading announcement */}
      <span className="sr-only">Dashboard content is loading...</span>
    </div>
  );
}
