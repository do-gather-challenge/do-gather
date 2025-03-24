import { ChallengePost } from '@/types/challenge.type';
import { validateChallengePost, validateUploadFile } from '../utils/post.util';
import { DATABASE, FETCH_MESSAGES } from '@/constants/challenge-post.constants';
import browserClient from '../supabase/client';
import { fetchUploadImage } from './storage.api';

/**
 * 챌린지 게시물을 생성하는 API 함수
 * @param {ChallengePost} challenge - 생성할 챌린지 데이터
 * @param {File | null} challengeImageFile - 챌린지 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>} - 성공 여부와 메시지
 */
export const fetchCreateChallenge = async (
  challenge: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  // 필수 입력값 검증
  const validationError = validateChallengePost(challenge);
  if (validationError) {
    return { success: false, message: validationError };
  }

  // 이미지 파일 검증
  if (challengeImageFile) {
    const fileError = validateUploadFile(challengeImageFile);
    if (fileError) {
      return { success: false, message: fileError };
    }
  }

  try {
    let imageUrl: string | null = null;

    // 이미지 업로드
    if (challengeImageFile) {
      const { url, error: uploadError } = await fetchUploadImage(challengeImageFile);
      if (uploadError) {
        return { success: false, message: uploadError };
      }
      imageUrl = url;
    }

    // 로그인 세션 확인
    const {
      data: { session }
    } = await browserClient.auth.getSession();
    if (!session) {
      return { success: false, message: FETCH_MESSAGES.LOGIN_REQUIRED };
    }
    const userId = session.user.id;

    // 챌린지 생성
    const { error: insertError } = await browserClient
      .from(DATABASE.TABLES.CHALLENGES)
      .insert({
        ['title']: challenge.title,
        ['description']: challenge.description,
        ['start_date']: challenge.startDate,
        ['finish_date']: challenge.finishDate,
        ['category']: challenge.category,
        ['execute_days']: challenge.executeDays,
        ['challenge_image']: imageUrl,
        ['created_at']: new Date().toISOString(),
        ['creator_id']: userId
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return { success: true, message: FETCH_MESSAGES.CHALLENGE_CREATION_SUCCESS };
  } catch (error) {
    console.error('챌린지 생성 중 오류 발생:', error);
    return { success: false, message: FETCH_MESSAGES.CHALLENGE_CREATION_FAILED };
  }
};
