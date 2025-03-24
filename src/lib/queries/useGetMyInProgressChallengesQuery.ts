import { useQuery } from '@tanstack/react-query';
import { fetchGetMyInProgressChallengesByPage } from '../api/my-challenge.api';
import { queryKeys } from '@/constants/query-keys';

const useGetMyInProgressChallengesQuery = (pageIndex: number, cardsPerPage: number) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKeys.MY_IN_PROGRESS_CHALLENGE, pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyInProgressChallengesByPage(pageIndex + 1, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data ?? [];

  return { pageCount, challenges, isLoading, isFetching };
};

export default useGetMyInProgressChallengesQuery;
