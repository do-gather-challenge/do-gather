'use client';

import ChallengeCard from '../features/challenges/challenge-card';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/use-get-my-in-progress-challenges-query';

const MyPageMyInProgressChallenges = () => {
  const { pageCount, challenges, isPending, isError, error } = useGetMyInProgressChallengesQuery(0, 6);

  if (isPending) return <>Loading...</>;
  if (isError) return <>Error occurred... {error?.message}</>;
  if (!pageCount) return <>참여 중인 챌린지가 없습니다.</>;
  return (
    <section>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges &&
          challenges.map((challenge) => {
            return (
              <ChallengeCard
                key={challenge.id}
                thumbnail={challenge.challengeImage}
                category={challenge.category}
                participants={challenge.participantCount}
                title={challenge.title}
                startDate={challenge.startDate}
                finishDate={challenge.finishDate}
              />
            );
          })}
      </div>
    </section>
  );
};

export default MyPageMyInProgressChallenges;
