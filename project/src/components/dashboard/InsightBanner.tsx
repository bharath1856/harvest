'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightBannerProps {
  title: string;
  body: string;
  tone?: 'success' | 'warning' | 'default';
  index?: number;
}

const toneStyles: Record<string, string> = {
  default: 'border-primary/30 bg-primary/5',
  success: 'border-success/30 bg-success/5',
  warning: 'border-warning/30 bg-warning/5',
};

const iconStyles: Record<string, string> = {
  default: 'bg-primary/15 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
};

export function InsightBanner({
  title,
  body,
  tone = 'default',
  index = 0,
}: InsightBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className={cn(
        'flex items-start gap-4 rounded-xl border p-4',
        toneStyles[tone]
      )}
    >
      <div className={cn('flex h-10 w-10 shrink-0 items-center justify-center rounded-xl', iconStyles[tone])}>
        <Lightbulb className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{body}</p>
      </div>
    </motion.div>
  );
}
