'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 사용자가 챌린지를 인증했을 때 데이터베이스에 인증 기록을 저장하는 함수
 *
 * @param challengeId - 완료된 챌린지의 고유 ID
 * @returns Promise<undefined> - 작업 완료 후 특별한 반환값 없음
 */
export const fetchCreateChallengeCompleted = async (challengeId: number) => {
  const supabase = createClient();
  await supabase.from('challenge_completions').insert({ challenge_id: challengeId });
  revalidatePath(`/challenges/${challengeId}`);
};

/**
 * 주어진 챌린지 게시글 ID 배열 중 인증(완료)된 챌린지만 필터링하여 반환하는 함수
 * @param challengeIds - 확인할 챌린지 ID 배열
 * @returns Promise<number[]> - 인증된 챌린지 ID 목록
 */
export const fetchCompletedChallengeIds = async (challengeIds: number[]): Promise<number[]> => {
  if (challengeIds.length === 0) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from('challenge_completions')
    .select('challenge_id')
    .in('challenge_id', challengeIds);

  if (error) {
    console.error('Error fetching completed challenge IDs:', error);
    throw error;
  }

  return data?.map((completion) => completion.challenge_id) ?? [];
};
