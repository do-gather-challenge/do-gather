import { useQuery } from '@tanstack/react-query';
import { fetchGetMyCompletedChallengesByPage } from '../api/my-challenge.api';

export const useGetMyCompletedChallengesQuery = (pageIndex: number, cardsPerPage: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [MY_COMPLETED_CHALLENGE, pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyCompletedChallengesByPage(pageIndex + 1, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0; // 페이지 카운트 가져오기
  const challenges = data?.data ?? []; // 완료된 챌린지 목록 가져오기

  return { pageCount, challenges, isPending, isError, error };
};

/** constants - query-keys */
const MY_COMPLETED_CHALLENGE = 'my-completed-challenge';
