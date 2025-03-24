'use client';

import { useEffect, useState } from 'react';

// 창 크기 바뀔 경우 cardsPerPage 재계산 + 페이지 초기화
export const useChallengeResponsiveCardsPerPage = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(4);

  useEffect(() => {
    const calculate = () => {
      const width = window.innerWidth;
      if (width < 640) return 1;
      if (width < 768) return 2;
      if (width < 1024) return 3;
      return 4;
    };

    const handleResize = () => {
      setCardsPerPage(calculate());
      setPageIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { pageIndex, setPageIndex, cardsPerPage };
};
