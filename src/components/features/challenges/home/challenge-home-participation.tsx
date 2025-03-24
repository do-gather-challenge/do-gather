'use client';

import { Button } from '@/components/ui/button';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/use-get-my-in-progress-challenges-query';
import { useChallengeResponsiveCardsPerPage } from '@/lib/hooks/use-challenge-responsive-cards-per-page';
import ChallengeHomeParticipationList from './challenge-home-participation-list';

const ChallengeHomeParticipation = () => {
  const { pageIndex, setPageIndex, cardsPerPage } = useChallengeResponsiveCardsPerPage();
  const { pageCount, challenges, isPending, error, isError } = useGetMyInProgressChallengesQuery(
    pageIndex,
    cardsPerPage
  );

  if (isError) return <p>에러 발생 : {(error as Error).message}</p>;

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
            disabled={pageIndex === 0}
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
      <ChallengeHomeParticipationList cardsPerPage={cardsPerPage} challenges={challenges} isPending={isPending} />
    </section>
  );
};

export default ChallengeHomeParticipation;
