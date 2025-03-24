import { createClient } from '@/lib/supabase/client';
import { transformChallengeDataArray } from '@/lib/utils/transform.util';
import { ErrorMessage } from '@/constants/error-message.constant';
import { Challenge } from '@/types/challenge.type';
import { Pagination } from '@/types/common.type';

/**
 * 로그인한 사용자의 챌린지 ID 목록을 가져오는 유틸리티 함수
 * @returns {Promise<number[]>} 사용자가 참여한 챌린지 ID 목록
 * @throws {Error} 사용자가 로그인하지 않은 경우 ErrorMessage.NOT_AUTHENTICATED 에러 발생
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
export const fetchGetAllMyChallengeIds = async (): Promise<string[]> => {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error(ErrorMessage.NOT_AUTHENTICATED);
  }

  const { data: participantData, error: participantError } = await supabase
    .from('participants')
    .select('challenge_id')
    .eq('user_id', user.id);

  if (participantError) {
    console.error('Error fetching participant data:', participantError);
    throw participantError;
  }

  if (!participantData || participantData.length === 0) {
    return [];
  }

  return participantData.map((item) => item.challenge_id);
};

/**
 * 사용자의 챌린지 목록을 필터링하여 조회하는 함수
 * @param {number} page - 현재 페이지 (1부터 시작)
 * @param {number} limit - 페이지당 항목 수
 * @param {(query: any) => any} filterFn - 챌린지 필터링 함수
 * @returns {Promise<Pagination<Challenge[]>>} 필터링된 챌린지 목록 및 페이지네이션 정보
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
const fetchGetMyChallengesByPage = async (
  page: number,
  limit: number,
  filterFn: (query: any) => any
): Promise<Pagination<Challenge[]>> => {
  const supabase = await createClient();
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const challengeIds = await fetchGetAllMyChallengeIds();

  if (challengeIds.length === 0) {
    return {
      data: [],
      pagination: {
        page,
        limit,
        total: 0,
        pageCount: 0
      }
    };
  }

  const baseQuery = supabase.from('challenges').select('*', { count: 'exact' }).in('id', challengeIds);
  const filteredQuery = filterFn(baseQuery);

  // 먼저 전체 개수를 가져오기
  const { count } = await filteredQuery;
  const totalCount = count ?? 0;

  if (!count || from >= count) {
    // 데이터가 없거나 요청 범위가 초과되었을 경우 빈 배열 반환
    return {
      data: [],
      pagination: {
        page,
        limit,
        total: totalCount,
        pageCount: Math.ceil((count ?? 0) / limit) || 0
      }
    };
  }

  // 페이지네이션 적용 후 데이터 가져오기
  const paginatedQuery = filteredQuery.range(from, to);
  const { data, error } = await paginatedQuery;

  if (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }

  const transformedData = transformChallengeDataArray(data);

  return {
    data: transformedData,
    pagination: {
      page,
      limit,
      total: totalCount,
      pageCount: Math.ceil(totalCount / limit) || 0
    }
  };
};

/**
 * 로그인한 사용자의 진행 중인 챌린지 목록을 조회하는 함수
 * @param {number} [page=1] - 현재 페이지 (1부터 시작)
 * @param {number} [limit=10] - 페이지당 항목 수
 * @returns {Promise<Pagination<Challenge[]>>} 사용자의 진행 중인 챌린지 목록 및 페이지네이션 정보
 * @throws {Error} 사용자가 로그인하지 않은 경우 "로그인이 필요합니다" 에러 발생
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
export const fetchGetMyInProgressChallengesByPage = async (
  page: number = 1,
  limit: number = 10
): Promise<Pagination<Challenge[]>> => {
  const currentDate = new Date().toISOString();

  return fetchGetMyChallengesByPage(page, limit, (query) =>
    query.lte('start_date', currentDate).gt('finish_date', currentDate)
  );
};

/**
 * 로그인한 사용자의 완료된 챌린지 목록을 조회하는 함수
 * @param {number} [page=1] - 현재 페이지 (1부터 시작)
 * @param {number} [limit=10] - 페이지당 항목 수
 * @returns {Promise<Pagination<Challenge[]>>} 사용자의 완료된 챌린지 목록 및 페이지네이션 정보
 * @throws {Error} 사용자가 로그인하지 않은 경우 "로그인이 필요합니다" 에러 발생
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
export const fetchGetMyCompletedChallengesByPage = async (
  page: number = 1,
  limit: number = 10
): Promise<Pagination<Challenge[]>> => {
  const currentDate = new Date().toISOString();

  return fetchGetMyChallengesByPage(page, limit, (query) => query.lte('finish_date', currentDate));
};

/**
 * 로그인한 사용자의 예정된(시작 전) 챌린지 목록을 조회하는 함수
 * @param {number} [page=1] - 현재 페이지 (1부터 시작)
 * @param {number} [limit=10] - 페이지당 항목 수
 * @returns {Promise<Pagination<Challenge[]>>} 사용자의 예정된 챌린지 목록 및 페이지네이션 정보
 * @throws {Error} 사용자가 로그인하지 않은 경우 "로그인이 필요합니다" 에러 발생
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
export const fetchGetMyUpcomingChallengesByPage = async (
  page: number = 1,
  limit: number = 10
): Promise<Pagination<Challenge[]>> => {
  const currentDate = new Date().toISOString();

  return fetchGetMyChallengesByPage(page, limit, (query) => query.gt('start_date', currentDate));
};
