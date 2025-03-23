'use client';

import React, { useEffect, useState } from 'react';
import ChallengeCard from '../challenge-card';
import { Button } from '@/components/ui/button';

const cards = new Array(20)
  .fill(null)
  .map((_, idx) => (
    <ChallengeCard
      key={idx}
      thumbnail="/React.png"
      category="EXERCISE"
      participants={10}
      title="1일 1토마토 1일 1토마토"
      startDate="25.3.22"
      endDate="25.4.22"
    />
  ));

const ChallengeHomeParticipationSlider = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  const calculateCardsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) return 1; 
    if (width < 768) return 2; 
    if (width < 1024) return 3; 
    return 4; 
  };

  // 창 크기 바뀌면 첫 페이지로 초기화
  useEffect(() => {
    const handleResize = () => {
      const newCount = calculateCardsPerPage();
      setCardsPerPage(newCount);
      setPageIndex(0); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxPage = Math.ceil(cards.length / cardsPerPage);

  const toNextPage = () => {
    if (pageIndex < maxPage - 1) setPageIndex((p) => p + 1);
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
            disabled={pageIndex === maxPage - 1}
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
          {Array.from({ length: maxPage }).map((_, i) => (
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
              {cards.slice(i * cardsPerPage, (i + 1) * cardsPerPage)}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ChallengeHomeParticipationSlider;
