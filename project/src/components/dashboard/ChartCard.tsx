import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function ChartCard({
  title,
  description,
  className,
  children,
  action,
}: ChartCardProps) {
  return (
    <Card className={cn('transition-shadow hover:shadow-md', className)}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div className="min-w-0 flex-1">
          <CardTitle className="text-sm sm:text-base font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="mt-1 text-xs sm:text-sm">{description}</CardDescription>
          )}
        </div>
        {action}
      </CardHeader>
      <CardContent className="pb-4 sm:pb-6">{children}</CardContent>
    </Card>
  );
}
