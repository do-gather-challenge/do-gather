'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 사용자가 챌린지에 참여했을 때 데이터베이스에 참여 기록을 저장하는 함수
 *
 * @param challengeId - 참여할 챌린지의 고유 ID
 * @returns Promise<undefined> - 작업 완료 후 특별한 반환값 없음
 */
export const fetchCreateParticipant = async (challengeId: number) => {
  const supabase = createClient();
  await supabase.from('participants').insert({ challenge_id: challengeId });
  revalidatePath(`/challenges/${challengeId}`);
};

/**
 * 사용자가 챌린지를 나갔을 때 데이터베이스에 기록을 저장하는 함수
 *
 * @param challengeId - 나갈 챌린지의 고유 ID
 * @returns Promise<undefined> - 작업 완료 후 특별한 반환값 없음
 */
export const fetchDeleteParticipant = async (challengeId: number) => {
  const supabase = createClient();
  await supabase.from('participants').delete().eq('challenge_id', challengeId);
  revalidatePath(`/challenges/${challengeId}`);
};
