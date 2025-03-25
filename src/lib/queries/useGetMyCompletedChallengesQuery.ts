import { useQuery } from '@tanstack/react-query';
import { fetchGetMyCompletedChallengesByPage } from '../api/my-challenge.api';

export const useGetMyCompletedChallengesQuery = (pageIndex: number, cardsPerPage: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [MY_COMPLETED_CHALLENGE, pageIndex, cardsPerPage],
    queryFn: () => fetchGetMyCompletedChallengesByPage(pageIndex + 1, cardsPerPage)
  });

  const pageCount = data?.pagination.pageCount ?? 0; // 페이지 카운트 가져오기
  // console.log('훅 내의 data 확인 ====>', data); // undefined
  // if (!!data) {
  // console.log('훅 내의 data 확인22 ====>', data); // undefined
  // }
  const challenges = data?.data ?? []; // 완료된 챌린지 목록 가져오기

  return { pageCount, challenges, isPending, isError, error };
};

/** constants - query-keys */
const MY_COMPLETED_CHALLENGE = 'my-completed-challenge';

/** fetchGetMyCompletedChallengesByPage
 * 로그인한 사용자의 완료된 챌린지 목록을 조회하는 함수
 * @param {number} [page=1] - 현재 페이지 (1부터 시작)
 * @param {number} [limit=10] - 페이지당 항목 수
 * @returns {Promise<Pagination<Challenge[]>>} 사용자의 완료된 챌린지 목록 및 페이지네이션 정보
 * @throws {Error} 사용자가 로그인하지 않은 경우 "로그인이 필요합니다" 에러 발생
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */

/**
 * export type Pagination<T> = {
  data: T; // Challenge[]
  pagination: {
    page: number;
    limit: number;
    total: number;
    pageCount: number;
  };
};
 */
