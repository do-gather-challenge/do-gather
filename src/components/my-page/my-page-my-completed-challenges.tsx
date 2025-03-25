'use client';

import { useGetMyCompletedChallengesQuery } from '@/lib/queries/useGetMyCompletedChallengesQuery';
import browserClient from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import ChallengeCard from '../features/challenges/challenge-card';

const MyPageMyCompletedChallenges = () => {
  const { pageCount, challenges, isPending, isError, error } = useGetMyCompletedChallengesQuery(1, 1); // 1,1 로 요청시 data 있음 but 1,3 다수 호출시 data X

  if (isPending) return <>Loading...</>;
  if (isError) {
    return <>Error occurred... {error?.message}</>;
  }

  console.log(pageCount);
  console.log(challenges);

  return (
    <div>
      {!pageCount ? (
        <p>완료된 챌린지가 없습니다.</p>
      ) : (
        <div>
          {challenges.map((challenge) => {
            return <div key={challenge.id}>{challenge.id}</div>;
          })}
        </div>
        // <ChallengeCard
        //   thumbnail={challenges[0].challengeImage}
        //   category={challenges[0].category}
        //   participants={challenges[0].participantCount}
        //   title={challenges[0].title}
        //   startDate={challenges[0].startDate}
        //   endDate={challenges[0].finishDate}
        // ></ChallengeCard>
      )}
    </div>
  );
};

export default MyPageMyCompletedChallenges;

// 로그인로직 필요없음
// const [userId, setUserId] = useState<string | null>(null);
// useEffect(() => {
//   const getUserId = async () => {
//     const {
//       data: { session }
//     } = await browserClient.auth.getSession();

//     if (!session) {
//       return;
//     }
//     return session.user.id;
//   };

//   getUserId().then((id) => setUserId(id ?? null));
// }, []);
// // console.log(userId);
