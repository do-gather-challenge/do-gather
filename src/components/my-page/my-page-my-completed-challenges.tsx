'use client';

import { useGetMyCompletedChallengesQuery } from '@/lib/queries/useGetMyCompletedChallengesQuery';
import browserClient from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

const MyPageMyCompletedChallenges = () => {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUserId = async () => {
      const {
        data: { session }
      } = await browserClient.auth.getSession();

      if (!session) {
        return;
      }
      return session.user.id;
    };

    getUserId().then((id) => setUserId(id ?? null));
  }, []);
  // console.log(userId);

  const { pageCount, challenges, isPending, isError, error } = useGetMyCompletedChallengesQuery(1, 1);

  if (isPending) return <>Loading...</>;
  if (isError) {
    return <>Error occurred... {error?.message}</>;
  }

  console.log(challenges);

  return <div>{!pageCount ? <p>완료된 챌린지가 없습니다.</p> : <></>}</div>;
};

export default MyPageMyCompletedChallenges;
