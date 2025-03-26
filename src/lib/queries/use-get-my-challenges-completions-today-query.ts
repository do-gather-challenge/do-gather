import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/constants/query-keys.constant';
import { useGetMyInProgressChallengesQuery } from './use-get-my-in-progress-challenges-query';
import { fetchCompletedChallengeIds } from '../api/completed.api';
import { useMemo } from 'react';

/** useGetMyChallengesCompletionsTodayQuery: 로그인한 사용자가 오늘 인증한 챌린지 목록을 조회하는 커스텀 훅
 * @param {number} pageIndex - 현재 페이지 인덱스
 * @param {number} cardsPerPage - 페이지당 항목 수
 * @returns {{
 *   pageCount: number;
 *   challenges: Challenge[];
 *   total: number;
 *   isPending: boolean;
 *   isError: boolean;
 *   error: unknown;
 * }} 오늘 생성된 챌린지 목록, 총 페이지 수 및 요청 상태 정보
 */
export const useGetMyChallengesCompletionsTodayQuery = (pageIndex: number = 1, cardsPerPage: number = 10) => {
  const { challenges: dataInProgress, isPending: isLoadingInProgress } = useGetMyInProgressChallengesQuery(
    pageIndex - 1,
    cardsPerPage
  );

  /** 참여 중인 나의 챌린지 중에서, challenge_completions 테이블에 해당 챌린지 id가 있으면 필터링 */
  const challengesInProgressArray = dataInProgress?.map((challenge) => challenge.id) ?? []; // 참여 중인 챌린지 리스트

  const {
    data: completedData,
    isPending: isLoadingCompletionsToday,
    isError,
    error
  } = useQuery({
    queryKey: [queryKeys.MY_CHALLENGES_COMPLETIONS_TODAY, pageIndex, cardsPerPage],
    queryFn: () => fetchCompletedChallengeIds(challengesInProgressArray),
    enabled: challengesInProgressArray.length > 0 // 진행 중인 챌린지가 있을 때만 실행
  });

  const isPending = isLoadingInProgress || isLoadingCompletionsToday;

  const challenges = useMemo(() => {
    if (isPending || !completedData?.completedIds) return [];
    return dataInProgress?.filter((challenge) => completedData.completedIds.includes(challenge.id)) ?? [];
  }, [dataInProgress, completedData, isPending]);

  const total = completedData?.totalCount;

  // 페이지 수 계산
  const pageCount = useMemo(() => {
    return total ? Math.ceil(completedData.totalCount / cardsPerPage) : 0;
  }, [completedData, cardsPerPage]);

  return { challenges, pageCount, total, isPending, isError, error };
};
