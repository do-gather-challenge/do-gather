'use client';
/** 빌드에러 방지용 임시주석처리 */

// import ChallengeCard from '../features/challenges/challenge-card';
// import { useGetMyChallengesCompletionsTodayQuery } from '@/lib/queries/use-get-my-challenges-completions-today-query';

const MyPageMyTodaysCompletedChallenges = () => {
  // const { pageCount, challenges, isPending, isError, error } = useGetMyChallengesCompletionsTodayQuery(1, 6);

  // if (isPending) return <>Loading...</>;
  // if (isError) {
  //   return <>Error occurred... {error?.message}</>;
  // }

  return (
    <section>
      {/* {!pageCount ? (
        <p>오늘 인증한 챌린지가 없습니다.</p>
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
                  finishDate={challenge.finishDate}
                />
              );
            })}
        </div>
      )} */}
    </section>
  );
};

export default MyPageMyTodaysCompletedChallenges;
