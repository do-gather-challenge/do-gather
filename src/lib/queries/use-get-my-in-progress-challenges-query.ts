import { useQuery } from '@tanstack/react-query';
import { fetchGetMyInProgressChallengesByPage } from '../api/my-challenge.api';
import { challengeQueryKeys } from '@/constants/query-keys/challenge-query-keys.constant';

export const useGetMyInProgressChallengesQuery = (pageIndex: number, cardsPerPage: number) => {
  const { data, isPending, error, isError } = useQuery({
    queryKey: [challengeQueryKeys.MY_IN_PROGRESS_CHALLENGE, pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyInProgressChallengesByPage(pageIndex + 1, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data ?? [];

  return { pageCount, challenges, isPending, error, isError };
};
