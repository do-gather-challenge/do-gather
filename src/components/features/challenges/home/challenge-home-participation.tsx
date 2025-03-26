'use client';

import { Button } from '@/components/ui/button';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/use-get-my-in-progress-challenges-query';
import { useChallengeResponsiveCardsPerPage } from '@/lib/hooks/use-challenge-responsive-cards-per-page';
import ChallengeHomeParticipationList from './challenge-home-participation-list';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const ChallengeHomeParticipation = () => {
  const { pageIndex, setPageIndex, cardsPerPage } = useChallengeResponsiveCardsPerPage();
  const { pageCount, challenges, isPending, error, isError } = useGetMyInProgressChallengesQuery(
    pageIndex,
    cardsPerPage
  );

  if (isError) return <p className="text-center">에러 발생 : {(error as Error).message}</p>;

  const toNextPage = () => {
    if (pageIndex < pageCount - 1) setPageIndex((p) => p + 1);
  };

  const toPrevPage = () => {
    if (pageIndex > 0) setPageIndex((p) => p - 1);
  };

  return (
    <section>
      <div className="flex items-center justify-between px-2">
        <h1 className="mb-4 text-2xl">✊내가 진행중인 챌린지</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={toPrevPage}
            disabled={pageIndex === 0}
            className="h-8 w-8 rounded-full disabled:opacity-30"
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            variant="outline"
            onClick={toNextPage}
            disabled={pageIndex === pageCount - 1}
            className="h-8 w-8 rounded-full px-3 disabled:opacity-30"
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <ChallengeHomeParticipationList cardsPerPage={cardsPerPage} challenges={challenges} isPending={isPending} />
    </section>
  );
};

export default ChallengeHomeParticipation;
