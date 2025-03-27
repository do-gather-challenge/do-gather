import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys.constant';
import { fetchGetChallengesByPage } from '../api/challenge.api';
import { CARDS_PER_PAGE } from '@/constants/filter.constant';
import { ChallengeFilterOptions } from '@/types/challenge.type';

export const useGetChallengesByPageQuery = (page: number, filters: ChallengeFilterOptions) => {
  const { data, isPending, isError } = useQuery({
    queryKey: [queryKeys.FILTERED_CHALLENGE, page, filters],
    queryFn: () => fetchGetChallengesByPage(page, CARDS_PER_PAGE, filters)
  });

  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data || [];

  return { pageCount, challenges, isPending, isError };
};
