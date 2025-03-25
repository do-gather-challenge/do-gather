/**
 * 주어진 사용자 ID를 기반으로 닉네임을 조회하는 함수
 * @param {string} userId - 조회할 사용자의 ID
 * @returns {Promise<string | null>}
 *  - 해당 사용자의 닉네임을 반환합니다.
 *  - 사용자가 존재하지 않거나 오류가 발생하면 `null`을 반환합니다.
 * @throws {PostgrestError} Supabase 쿼리 실행 중 오류가 발생한 경우
 */
import browserClient from '../supabase/client';

export const fetchUserNicknameById = async (userId: string): Promise<string | null> => {
  if (!userId) return null;

  const { data, error } = await browserClient.from('users').select('nickname').eq('id', userId).single();

  if (error) {
    console.error('Error fetching nickname:', error);
    return null;
  }

  return data?.nickname ?? null;
};
