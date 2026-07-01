'use client';

import { ArrowUpRight, ArrowDownRight, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface KpiCardProps {
  label: string;
  value: string;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  accent?: string;
  index?: number;
}

export function KpiCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  accent = 'bg-primary/10 text-primary',
}: KpiCardProps) {
  const positive = (change ?? 0) >= 0;

  return (
    <Card className="group overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-border/80">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2">
          <div
            className={cn(
              'flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl transition-transform duration-200 group-hover:scale-105',
              accent
            )}
            aria-hidden="true"
          >
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          {change !== undefined && (
            <div
              className={cn(
                'flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                positive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
              )}
              aria-label={`${positive ? 'Up' : 'Down'} ${Math.abs(change)}%`}
            >
              {positive ? (
                <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
              ) : (
                <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
              )}
              <span>{Math.abs(change)}%</span>
            </div>
          )}
        </div>
        <div className="mt-3 sm:mt-4">
          <p className="text-xl sm:text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{label}</p>
          {changeLabel && (
            <p className="mt-0.5 sm:mt-1 text-xs text-muted-foreground/70">{changeLabel}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
