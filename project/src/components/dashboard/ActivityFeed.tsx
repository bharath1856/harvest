'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getIcon } from '@/lib/icons';
import { cn } from '@/lib/utils';

export interface ActivityItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  time: string;
  tone?: 'default' | 'success' | 'warning' | 'destructive';
}

interface ActivityFeedProps {
  items: ActivityItem[];
  title?: string;
  index?: number;
}

const toneStyles: Record<string, string> = {
  default: 'bg-primary/10 text-primary',
  success: 'bg-success/15 text-success',
  warning: 'bg-warning/15 text-warning',
  destructive: 'bg-destructive/15 text-destructive',
};

export function ActivityFeed({
  items,
  title = 'Recent Activity',
  index = 0,
}: ActivityFeedProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <div
                key={item.id}
                className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50"
              >
                <div
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    toneStyles[item.tone ?? 'default']
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-tight">{item.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground line-clamp-1">
                    {item.description}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground/70">
                  {item.time}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
