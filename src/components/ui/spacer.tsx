import { cn } from '@/lib/utils';

type SpacerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpacerAxis = 'horizontal' | 'vertical';

interface SpacerProps {
  size: SpacerSize;
  axis: SpacerAxis;
  className?: string;
}

const height = {
  sm: 'h-3',
  md: 'h-5',
  lg: 'h-10',
  xl: 'h-30'
} as const;

const width = {
  sm: 'w-3',
  md: 'w-5',
  lg: 'w-10',
  xl: 'w-30'
} as const;

const Spacer = ({ size, axis, className }: SpacerProps) => {
  const dimensionClass = axis === 'vertical' ? `${height[size]} w-0` : `${width[size]} h-0`;

  return <span className={cn('block shrink-0', dimensionClass, className)} />;
};

export default Spacer;
