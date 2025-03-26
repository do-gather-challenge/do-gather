import { Challenge } from '@/types/challenge.type';
import ChallengeCard from '../challenge-card';
import ChallengeCardSkeleton from '../challenge-card-skeleton';

type FilteredListProps = {
  challenges: Challenge[];
  isPending: boolean;
};

const ChallengeHomeFindFilteredList = ({ challenges, isPending }: FilteredListProps) => {
  return (
    <div className="relative w-full grid grid-cols-4 place-items-center overflow-hidden">
      {isPending
        ? Array.from({ length: 12 }).map((_, i) => <ChallengeCardSkeleton key={i} />)
        : challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              thumbnail={challenge.challengeImage}
              category={challenge.category}
              participants={challenge.participantCount}
              title={challenge.title}
              startDate={challenge.startDate}
              finishDate={challenge.finishDate}
            />
          ))}
    </div>
  );
};

export default ChallengeHomeFindFilteredList;
