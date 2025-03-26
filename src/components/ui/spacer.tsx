import { cn } from '@/lib/utils';

type SpacerSize = 'sm' | 'md' | 'lg' | 'xl';
type SpacerAxis = 'horizontal' | 'vertical';

interface SpacerProps {
  size: SpacerSize;
  axis: SpacerAxis;
  className?: string;
}

const sizeMap = {
  sm: '3',
  md: '5',
  lg: '10',
  xl: '30'
} as const;

const Spacer = ({ size, axis, className }: SpacerProps) => {
  const dimensionClass = axis === 'vertical' ? `h-${sizeMap[size]} w-0` : `w-${sizeMap[size]} h-0`;

  return <span className={cn('block shrink-0', dimensionClass, className)} />;
};

export default Spacer;
