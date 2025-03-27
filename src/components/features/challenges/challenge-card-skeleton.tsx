import { Skeleton } from '@/components/ui/skeleton';

const ChallengeCardSkeleton = () => {
  return (
    <div className="flex flex-col h-64 space-y-6">
      <Skeleton className="h-32 w-60 rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-60" />
        <Skeleton className="h-4 w-52" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
