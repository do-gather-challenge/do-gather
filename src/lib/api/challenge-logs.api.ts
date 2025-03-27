'use server';

import { createClient } from '@/lib/supabase/server';
import { transformChallengeLogDataArray } from '@/lib/utils/transform.util';
import { ChallengeLogWithUser } from '@/types/challenge-log.type';

/**
 * 챌린지의 참여 로그를 불러오는 함수
 *
 * @param {number} challengeId - 조회할 챌린지의 고유 ID
 * @returns {Promise<ChallengeLogWithUser[]>} - 참여 기록 삭제 상태를 포함한 객체
 * @throws {Error} - 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다
 */
export const fetchGetAllChallengeLogs = async (challengeId: number): Promise<ChallengeLogWithUser[]> => {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('logs')
    .select('*, users:user_id (id, nickname, profile_image)')
    .eq('challenge_id', challengeId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return transformChallengeLogDataArray(data.reverse());
};
