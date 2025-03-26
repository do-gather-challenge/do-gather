import { Challenge } from '@/types/challenge.type';
import ChallengeCard from '../challenge-card';
import ChallengeCardSkeleton from '../challenge-card-skeleton';
import { CARDS_PER_PAGE } from '@/constants/filter.constant';
import Link from 'next/link';
import APP_URL from '@/constants/app-url.constant';

type FilteredListProps = {
  challenges: Challenge[];
  isPending: boolean;
};

const ChallengeHomeFindFilteredList = ({ challenges, isPending }: FilteredListProps) => {
  return (
    <div className="relative grid w-full grid-cols-1 place-items-center gap-6 overflow-hidden py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {isPending
        ? Array.from({ length: CARDS_PER_PAGE }).map((_, i) => <ChallengeCardSkeleton key={i} />)
        : challenges.map((challenge) => (
            <Link key={challenge.id} href={APP_URL.CHALLENGES_ID(challenge.id)}>
              <ChallengeCard
                thumbnail={challenge.challengeImage}
                category={challenge.category}
                participants={challenge.participantCount}
                title={challenge.title}
                startDate={challenge.startDate}
                finishDate={challenge.finishDate}
              />
            </Link>
          ))}
    </div>
  );
};

export default ChallengeHomeFindFilteredList;
