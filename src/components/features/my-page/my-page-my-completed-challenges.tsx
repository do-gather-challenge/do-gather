'use client';

import { useGetMyCompletedChallengesQuery } from '@/lib/queries/use-get-my-completed-challenges-query';
import ChallengeCard from '../challenges/challenge-card';
import { useState } from 'react';
import { Button } from '../../ui/button';

const MyPageMyCompletedChallenges = () => {
  const [pageIndex, setPageIndex] = useState(1);
  const { pageCount, challenges, isPending, isError, error } = useGetMyCompletedChallengesQuery(pageIndex, 6);

  if (isPending) return <>Loading...</>;
  if (isError) return <>Error occurred... {error?.message}</>;
  if (!pageCount) return <>완료된 챌린지가 없습니다.</>;

  const isNextPageEnabled = pageCount > pageIndex;
  const isPreviousPageEnabled = pageIndex > 1;
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

export default MyPageMyCompletedChallenges;
