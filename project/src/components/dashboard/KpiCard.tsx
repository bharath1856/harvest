'use client';

import { motion, useReducedMotion } from 'framer-motion';
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
  index = 0,
}: KpiCardProps) {
  const reduceMotion = useReducedMotion();
  const positive = (change ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', accent)}>
              <Icon className="h-5 w-5" />
            </div>
            {change !== undefined && (
              <div
                className={cn(
                  'flex items-center gap-0.5 text-xs font-semibold',
                  positive ? 'text-success' : 'text-destructive'
                )}
              >
                {positive ? (
                  <ArrowUpRight className="h-3.5 w-3.5" />
                ) : (
                  <ArrowDownRight className="h-3.5 w-3.5" />
                )}
                {Math.abs(change)}%
              </div>
            )}
          </div>
          <p className="mt-4 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{label}</p>
          {changeLabel && (
            <p className="mt-1 text-xs text-muted-foreground/70">{changeLabel}</p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
