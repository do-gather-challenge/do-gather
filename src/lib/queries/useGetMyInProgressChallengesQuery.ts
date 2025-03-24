import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { fetchGetMyInProgressChallengesByPage } from '../api/my-challenge.api';

const useGetMyInProgressChallengesQuery = (pageIndex: number, cardsPerPage: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['my-in-progress-challenges', pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyInProgressChallengesByPage(pageIndex + 1, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data ?? [];

  return { pageCount, challenges, isLoading, isFetching };
};

export default useGetMyInProgressChallengesQuery;
