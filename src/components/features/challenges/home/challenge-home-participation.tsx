'use client';

import React, { useEffect, useState } from 'react';
import ChallengeCard from '../challenge-card';
import { Button } from '@/components/ui/button';
import { fetchGetMyInProgressChallengesByPage, fetchGetMyUpcomingChallengesByPage } from '@/lib/api/my-challenge.api';
import { transformDate } from '@/lib/utils/transform.util';

const ChallengeHomeParticipation = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);
  const [cards, setCards] = useState<React.JSX.Element[]>([]);
  const [pageCount, setPageCount] = useState(1);

  // 창 크기 바뀌면 cardsPerPage 재계산 + 페이지 초기화
  useEffect(() => {
    const calculateCardsPerPage = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 768) return 2;
      if (width < 1024) return 3;
      return 4;
    };

    const handleResize = () => {
      const newCount = calculateCardsPerPage();
      setCardsPerPage(newCount);
      setPageIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // pageIndex나 cardsPerPage가 바뀔 때마다 해당 페이지 데이터 fetch
  useEffect(() => {
    const fetchData = async () => {
      const { data, pagination } = await fetchGetMyInProgressChallengesByPage(pageIndex + 1, cardsPerPage);
      const fetchedCards = data.map((card) => (
        <ChallengeCard
          key={card.id}
          thumbnail="/React.png"
          category={card.category}
          participants={card.participantCount}
          title={card.title}
          startDate={transformDate(card.startDate)}
          finishDate={transformDate(card.finishDate)}
        />
      ));
      console.log(fetchedCards, pageIndex, cardsPerPage)
      setCards(fetchedCards);
      setPageCount(pagination.pageCount); // 전체 페이지 수 업데이트
    };

    fetchData();
  }, [pageIndex, cardsPerPage]);

  // const maxPage = Math.ceil(cards.length / cardsPerPage);

  const toNextPage = () => {
    if (pageIndex < pageCount - 1) setPageIndex((p) => p + 1);
  };

  const toPrevPage = () => {
    if (pageIndex > 0) setPageIndex((p) => p - 1);
  };

  return (
    <>
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
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${pageIndex * 100}%)`
          }}
        >
          {Array.from({ length: pageCount }).map((_, i) => (
            <div
              key={i}
              className={`grid w-full shrink-0 place-items-center gap-6 ${
                cardsPerPage === 1
                  ? 'grid-cols-1'
                  : cardsPerPage === 2
                    ? 'grid-cols-2'
                    : cardsPerPage === 3
                      ? 'grid-cols-3'
                      : 'grid-cols-4'
              }`}
            >
              {cards}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChallengeHomeParticipation;
