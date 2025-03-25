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
