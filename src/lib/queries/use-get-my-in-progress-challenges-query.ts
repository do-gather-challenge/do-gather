import { useQuery } from '@tanstack/react-query';
import { fetchGetMyInProgressChallengesByPage } from '../api/my-challenge.api';
import { queryKeys } from '@/constants/query-keys.constant';

export const useGetMyInProgressChallengesQuery = (pageIndex: number = 1, cardsPerPage: number = 1) => {
  const { data, isPending, error, isError } = useQuery({
    queryKey: [queryKeys.MY_IN_PROGRESS_CHALLENGE, pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyInProgressChallengesByPage(pageIndex + 1, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data ?? [];
  const countInProgress = data?.pagination.total;

  return { pageCount, challenges, countInProgress, isPending, error, isError };
};
