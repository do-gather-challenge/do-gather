import { Skeleton } from '@/components/ui/skeleton';

const ChallengeCardSkeleton = () => {
  return (
    <div className="flex flex-col h-[16rem] space-y-6">
      <Skeleton className="h-[8rem] w-[15rem] rounded-lg" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-[15rem]" />
        <Skeleton className="h-4 w-[13rem]" />
      </div>
    </div>
  );
};

export default ChallengeCardSkeleton;
