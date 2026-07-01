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
}

export function QuickActions({
  actions,
  title = 'Quick Actions',
}: QuickActionsProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm sm:text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 sm:gap-3 px-4 pb-4 sm:grid-cols-3">
        {actions.map((action) => {
          const Icon = getIcon(action.icon);
          return (
            <Button
              key={action.label}
              variant={action.variant ?? 'outline'}
              className="h-auto flex-col gap-1.5 sm:gap-2 py-3 sm:py-4 px-2"
              asChild={!!action.href}
              aria-label={action.label}
            >
              {action.href ? (
                <a href={action.href} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <span className="text-[10px] sm:text-xs truncate">{action.label}</span>
                </a>
              ) : (
                <>
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
                  <span className="text-[10px] sm:text-xs truncate">{action.label}</span>
                </>
              )}
            </Button>
          );
        })}
      </CardContent>
    </Card>
  );
}
