import { Skeleton } from '@/components/ui/skeleton';

const ChallengeCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-6">
      <Skeleton className="h-[135px] w-[240px] rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-[220px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
