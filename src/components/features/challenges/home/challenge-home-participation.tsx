'use client';

import { Button } from '@/components/ui/button';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/useGetMyInProgressChallengesQuery';
import { useChallengeResponsiveCardsPerPage } from '@/lib/hooks/use-challenge-responsive-cards-per-page';
import ChallengeHomeParticipationList from './challenge-home-participation-list';

const ChallengeHomeParticipation = () => {
  const { pageIndex, setPageIndex, cardsPerPage } = useChallengeResponsiveCardsPerPage();
  const { pageCount, challenges, isPending, isFetching } = useGetMyInProgressChallengesQuery(pageIndex, cardsPerPage);

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
            disabled={pageIndex === pageCount - 1 || isFetching}
            className="rounded-full px-3 disabled:opacity-30"
          >
            →
          </Button>
        </div>
      </div>
      <ChallengeHomeParticipationList
        cardsPerPage={cardsPerPage}
        challenges={challenges}
        isPending={isPending}
        isFetching={isFetching}
      />
    </section>
  );
};

export default ChallengeHomeParticipation;
