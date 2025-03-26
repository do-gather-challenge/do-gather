'use client';

import { useGetMyChallengesCompletionsTodayQuery } from '@/lib/queries/use-get-my-challenges-completions-today-query';
import ChallengeCard from '../features/challenges/challenge-card';

const MyPageMyTodaysCompletedChallenges = () => {
  const { challenges, pageCount, isLoading, isError, error } = useGetMyChallengesCompletionsTodayQuery(1, 6);

  if (isLoading) return <>Loading...</>;
  if (isError) return <>Error occurred... {error?.message}</>;
  if (!pageCount) return <>인증한 챌린지가 없습니다.</>;

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

export default MyPageMyTodaysCompletedChallenges;
