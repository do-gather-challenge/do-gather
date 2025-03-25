'use client';

import ChallengeCard from '../features/challenges/challenge-card';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/useGetMyInProgressChallengesQuery';

const MyPageMyInProgressChallenges = () => {
  const { pageCount, challenges, isPending, isError, error } = useGetMyInProgressChallengesQuery(1, 6);

  if (isPending) return <>Loading...</>;
  if (isError) {
    return <>Error occurred... {error?.message}</>;
  }

  return (
    <section>
      {!pageCount ? (
        <p>참여 중인 챌린지가 없습니다.</p>
      ) : (
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
                  endDate={challenge.finishDate}
                />
              );
            })}
        </div>
      )}
    </section>
  );
};

export default MyPageMyInProgressChallenges;
