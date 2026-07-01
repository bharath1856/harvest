'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getIcon } from '@/lib/icons';

export interface QuickAction {
  label: string;
  icon: string;
  href?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
  index?: number;
}

export function QuickActions({
  actions,
  title = 'Quick Actions',
  index = 0,
}: QuickActionsProps) {
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
        <CardContent className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {actions.map((action) => {
            const Icon = getIcon(action.icon);
            return (
              <Button
                key={action.label}
                variant={action.variant ?? 'outline'}
                className="h-auto flex-col gap-2 py-4"
                asChild={!!action.href}
              >
                {action.href ? (
                  <a href={action.href}>
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{action.label}</span>
                  </a>
                ) : (
                  <>
                    <Icon className="h-5 w-5" />
                    <span className="text-xs">{action.label}</span>
                  </>
                )}
              </Button>
            );
          })}
        </CardContent>
      </Card>
    </motion.div>
  );
}
