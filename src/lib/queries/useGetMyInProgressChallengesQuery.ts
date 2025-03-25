import { useQuery } from '@tanstack/react-query';
import { fetchGetMyInProgressChallengesByPage } from '../api/my-challenge.api';

/** useGetMyInProgressChallengesQuery: 로그인한 사용자의 진행 중인 챌린지 목록을 조회하는 커스텀 훅
 * @param {number} pageIndex - 현재 페이지 인덱스
 * @param {number} cardsPerPage - 페이지당 항목 수
 * @returns {{
 *   pageCount: number;
 *   challenges: Challenge[];
 *   isPending: boolean;
 *   isError: boolean;
 *   error: unknown;
 * }} 진행 중인 챌린지 목록, 총 페이지 수 및 요청 상태 정보
 */
export const useGetMyInProgressChallengesQuery = (pageIndex: number, cardsPerPage: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [MY_COMPLETED_CHALLENGE, pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyInProgressChallengesByPage(pageIndex, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data ?? [];

  return { pageCount, challenges, isPending, isError, error };
};

/** constants - query-keys */
const MY_COMPLETED_CHALLENGE = 'my-in-progress-challenge';
