'use client';

import React, { useEffect, useState } from 'react';
import ChallengeCard from '../challenge-card';
import { Button } from '@/components/ui/button';
import { fetchGetMyInProgressChallengesByPage, fetchGetMyUpcomingChallengesByPage } from '@/lib/api/my-challenge.api';
import { transformDate } from '@/lib/utils/transform.util';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import useChallengeResponsiveCardsPerPage from '@/lib/hooks/use-challenge-responsive-cards-per-page';
import useGetMyInProgressChallengesQuery from '@/lib/queries/useGetMyInProgressChallengesQuery';

const ChallengeHomeParticipation = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const cardsPerPage = useChallengeResponsiveCardsPerPage();
  const { pageCount, challenges, isLoading, isFetching, error } = useGetMyInProgressChallengesQuery(
    pageIndex,
    cardsPerPage
  );

  const toNextPage = () => {
    if (pageIndex < pageCount - 1) setPageIndex((p) => p + 1);
  };

  const toPrevPage = () => {
    if (pageIndex > 0) setPageIndex((p) => p - 1);
  };

  return (
    <section>
      <div className="mb-2 flex items-center justify-between px-2">
        <h2 className="text-2xl">🔥내가 참여중인 챌린지</h2>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={toPrevPage}
            disabled={pageIndex === 0 || isFetching}
            className="rounded-full px-3 disabled:opacity-30"
          >
            ←
          </Button>
          <Button
            variant="outline"
            onClick={toNextPage}
            disabled={pageIndex === pageCount - 1}
            className="rounded-full px-3 disabled:opacity-30"
          >
            →
          </Button>
        </div>
      </div>
      <div className="relative w-full overflow-hidden">
        <div
          className={`grid place-items-center gap-6 transition-all duration-500 ease-in-out ${
            cardsPerPage === 1
              ? 'grid-cols-1'
              : cardsPerPage === 2
                ? 'grid-cols-2'
                : cardsPerPage === 3
                  ? 'grid-cols-3'
                  : 'grid-cols-4'
          }`}
        >
          {isLoading || isFetching
            ? Array.from({ length: cardsPerPage }).map((_, i) => (
                <div key={i} className="bg-muted h-[180px] w-full animate-pulse rounded-lg" />
              ))
            : challenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  thumbnail="/React.png"
                  category={challenge.category}
                  participants={challenge.participantCount}
                  title={challenge.title}
                  startDate={transformDate(challenge.startDate)}
                  finishDate={transformDate(challenge.finishDate)}
                />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ChallengeHomeParticipation;
