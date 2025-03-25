'use client';

import { useGetMyCompletedChallengesQuery } from '@/lib/queries/use-get-my-completed-challenges-query';
import ChallengeCard from '../features/challenges/challenge-card';

const MyPageMyTodaysCompletedChallenges = () => {
  const { pageCount, challenges, isPending, isError, error } = useGetMyCompletedChallengesQuery(1, 6);

  if (isPending) return <>Loading...</>;
  if (isError) {
    return <>Error occurred... {error?.message}</>;
  }

  return (
    <section>
      {!pageCount ? (
        <p>완료된 챌린지가 없습니다.</p>
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

export default MyPageMyTodaysCompletedChallenges;
