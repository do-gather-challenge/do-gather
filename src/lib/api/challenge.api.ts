'use server';

import { createClient } from '@/lib/supabase/server';
import { transformChallengeData, transformChallengeDataArray } from '@/lib/utils/transform.util';
import { ChallengeSort } from '@/types/challenge-sort.type';
import { ChallengeStatus } from '@/types/challenge-status.type';
import { Challenge, ChallengeFilterOptions, ChallengeWithParticipation } from '@/types/challenge.type';
import { Pagination } from '@/types/common.type';
import { notFound } from 'next/navigation';

/**
 * 챌린지 목록을 페이지네이션, 필터링, 정렬 조건에 맞게 조회하는 함수
 * @param {number} [page = 1] - 현재 페이지 (1부터 시작)
 * @param {number} [limit = 10] - 페이지당 항목 수
 * @param {Partial<ChallengeFilterOptions>} [options={}] - 조회 옵션
 * @param {string} [options.category] - 카테고리 필터
 * @param {string} [options.searchTerm] - 제목 검색어
 * @param {ChallengeStatusType} [options.status] - 진행 상태 (UPCOMING, IN_PROGRESS, COMPLETED)
 * @param {ChallengeSortType} [options.sortBy] - 정렬 기준 (POPULAR, RECENT)
 * @returns {Promise<Pagination<Challenge[]>>} 챌린지 목록 및 페이지네이션 정보
 */
export const fetchGetChallengesByPage = async (
  page: number = 1,
  limit: number = 10,
  { category, searchTerm, status, sortBy }: Partial<ChallengeFilterOptions> = {}
): Promise<Pagination<Challenge[]>> => {
  const supabase = await createClient();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase.from('challenges').select('*', { count: 'exact' });

  const currentDate = new Date().toISOString();

  if (category) query = query.eq('category', category);
  if (searchTerm) query = query.ilike('title', `%${searchTerm}%`);

  if (status) {
    if (status === ChallengeStatus.UPCOMING) query = query.gt('start_date', currentDate);
    else if (status === ChallengeStatus.IN_PROGRESS)
      query = query.lte('start_date', currentDate).gt('finish_date', currentDate);
    else if (status === ChallengeStatus.COMPLETED) query = query.lte('finish_date', currentDate);
  }

  if (sortBy === ChallengeSort.RECENT)
    query = query.gt('start_date', currentDate).order('start_date', { ascending: true });
  else query = query.order('participant_count', { ascending: false });
  query = query.range(from, to);

  const { data, error, count } = await query;
  const totalCount = count ?? 0;
  const transformedData = transformChallengeDataArray(data);

  if (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }

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
 * 특정 ID의 챌린지 상세 정보를 조회하는 함수
 * @param {number} challengeId - 조회할 챌린지 ID
 * @returns {Promise<Challenge>} 챌린지 상세 정보
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
export const fetchGetChallengeById = async (challengeId: number): Promise<Challenge> => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('challenges').select('*').eq('id', challengeId).single();

  if (error) {
    if (error.code === 'PGRST116') {
      notFound();
    }
    console.error('Error fetching challenge:', error);
    throw error;
  }

  const transformedData = transformChallengeData(data);
  return transformedData;
};

/**
 * 특정 ID의 챌린지를 조회하고 현재 로그인한 사용자의 참여 여부도 함께 반환하는 함수
 * @param {number} challengeId - 조회할 챌린지 ID
 * @returns {Promise<ChallengeWithParticipation>} 챌린지 정보와 참여 여부
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
export const fetchGetChallengeWithParticipation = async (challengeId: number): Promise<ChallengeWithParticipation> => {
  const supabase = await createClient();
  const challenge = await fetchGetChallengeById(challengeId);

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return { ...challenge, isParticipating: false };

  const { data, error } = await supabase
    .from('participants')
    .select('id')
    .eq('challenge_id', challengeId)
    .eq('user_id', user.id)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error checking participation:', error);
    throw error;
  }

  return {
    ...challenge,
    isParticipating: !!data
  };
};
