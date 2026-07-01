'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { Construction, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ContentPlaceholderProps {
  roleLabel: string;
}

export function ContentPlaceholder({ roleLabel }: ContentPlaceholderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Card className="border-dashed border-2 border-border/60 bg-secondary/20">
      <CardContent className="flex flex-col items-center justify-center px-6 py-16 text-center sm:py-24">
        <motion.div
          initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <Construction className="h-8 w-8" />
        </motion.div>
        <Badge variant="outline" className="mb-3 border-primary/30 text-primary">
          <Sparkles className="mr-1.5 h-3 w-3" />
          Phase 1 — Shell Only
        </Badge>
        <h2 className="font-display text-xl font-semibold">
          {roleLabel} dashboard content coming soon
        </h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          This area will display role-specific widgets, KPI cards, charts, activity
          feeds, and business modules in the next phase. For now, the dashboard shell
          is fully functional with navigation, breadcrumbs, and responsive layout.
        </p>
      </CardContent>
    </Card>
  );
}
