import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InsightBannerProps {
  title: string;
  body: string;
  tone?: 'success' | 'warning' | 'default';
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
}: InsightBannerProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-3 sm:gap-4 rounded-xl border p-4 transition-colors',
        toneStyles[tone]
      )}
      role="note"
      aria-label={`Insight: ${title}`}
    >
      <div
        className={cn(
          'flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl',
          iconStyles[tone]
        )}
        aria-hidden="true"
      >
        <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">{body}</p>
      </div>
    </div>
  );
}
