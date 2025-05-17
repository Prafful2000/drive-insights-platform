
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  className?: string;
  footer?: React.ReactNode;
  color?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
}

const getColorClasses = (color: 'default' | 'primary' | 'success' | 'warning' | 'danger') => {
  switch (color) {
    case 'primary':
      return 'bg-primary/10 text-primary';
    case 'success':
      return 'bg-green-500/10 text-green-600';
    case 'warning':
      return 'bg-amber-500/10 text-amber-600';
    case 'danger':
      return 'bg-destructive/10 text-destructive';
    default:
      return 'bg-muted/50 text-muted-foreground';
  }
};

const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  className,
  footer,
  color = 'default',
}: StatCardProps) => {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && (
          <div className={cn('rounded-full p-2', getColorClasses(color))}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="mt-1">{description}</CardDescription>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-sm">
            <div
              className={cn(
                'mr-1 rounded-sm p-0.5',
                trend.isPositive ? 'bg-green-500/20 text-green-600' : 'bg-destructive/20 text-destructive'
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={cn('h-3 w-3', trend.isPositive ? '' : 'rotate-180')}
              >
                <path
                  fillRule="evenodd"
                  d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span
              className={cn(
                trend.isPositive ? 'text-green-600' : 'text-destructive'
              )}
            >
              {trend.value}%
            </span>
            {trend.label && (
              <span className="ml-1 text-muted-foreground">{trend.label}</span>
            )}
          </div>
        )}
      </CardContent>
      {footer && <CardFooter className="pt-0">{footer}</CardFooter>}
    </Card>
  );
};

export default StatCard;
