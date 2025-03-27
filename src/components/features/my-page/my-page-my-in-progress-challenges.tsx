'use client';

import { useState } from 'react';
import ChallengeCard from '../challenges/challenge-card';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/use-get-my-in-progress-challenges-query';
import { Button } from '../../ui/button';

const MyPageMyInProgressChallenges = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const { pageCount, challenges, isPending, isError, error } = useGetMyInProgressChallengesQuery(pageIndex, 6);

  if (isPending) return <>Loading...</>;
  if (isError) return <>Error occurred... {error?.message}</>;
  if (!pageCount) return <>참여 중인 챌린지가 없습니다.</>;

  const isNextPageEnabled = pageCount - 1 > pageIndex;
  const isPreviousPageEnabled = pageIndex > 0;

  const handleNextPage = () => {
    if (isNextPageEnabled) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  };
  const handlePreviousPage = () => {
    if (isPreviousPageEnabled) {
      setPageIndex((prevPageIndex) => prevPageIndex - 1);
    }
  };
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
      <div className="mt-1 flex items-center justify-center space-x-2">
        <Button variant="ghost" onClick={handlePreviousPage}>
          &lt;
        </Button>
        <Button variant="ghost" onClick={handleNextPage}>
          &gt;
        </Button>
      </div>
    </section>
  );
};

export default MyPageMyInProgressChallenges;
