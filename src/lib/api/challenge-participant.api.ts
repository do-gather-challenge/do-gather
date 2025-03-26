'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

/**
 * 사용자가 챌린지에 참여했을 때 데이터베이스에 참여 기록을 저장하는 함수
 *
 * @param {number} challengeId - 참여할 챌린지의 고유 ID
 * @returns {Promise<{pending: boolean}>} - 참여 기록 저장 상태를 포함한 객체
 * @throws {Error} - 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다
 */
export const fetchCreateParticipant = async (challengeId: number): Promise<{ pending: boolean }> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('participants').insert({ challenge_id: challengeId }).select();
  revalidatePath(`/challenges/${challengeId}`);

  if (error) throw error;

  return { pending: !data };
};

/**
 * 사용자가 챌린지를 나갔을 때 데이터베이스에 기록을 저장하는 함수
 *
 * @param {number} challengeId - 나갈 챌린지의 고유 ID
 * @returns {Promise<{pending: boolean}>} - 참여 기록 삭제 상태를 포함한 객체
 * @throws {Error} - 데이터베이스 작업 중 오류가 발생하면 예외를 던집니다
 */
export const fetchDeleteParticipant = async (challengeId: number): Promise<{ pending: boolean }> => {
  const supabase = createClient();
  const { data, error } = await supabase.from('participants').delete().eq('challenge_id', challengeId).select();
  revalidatePath(`/challenges/${challengeId}`);

  if (error) throw error;

  return { pending: !data };
};
