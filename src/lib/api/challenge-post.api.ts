import { ChallengePost } from '@/types/challenge.type';
import { validateChallengePost } from '../utils/post.util';
import { DATABASE, ERROR_MESSAGES } from '@/constants/challenge-post.constants';
import browserClient from '../supabase/client';
import { fetchUploadImage } from './storage.api';

/**
 * 챌린지 게시물을 생성하는 API 함수
 * @param {ChallengePost} challenge - 생성할 챌린지 데이터
 * @param {File | null} challengeImageFile - 챌린지 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>} - 성공 여부와 메시지
 */
export const fetchCreatePost = async (
  challenge: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  // 필수 입력값 검증
  const validationError = validateChallengePost(challenge);
  if (validationError) {
    return { success: false, message: validationError };
  }

  try {
    let imageUrl: string | null = '';

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
      return { success: false, message: ERROR_MESSAGES.LOGIN_REQUIRED };
    }
    const userId = session.user.id;

    // 챌린지 생성
    const { error: insertError } = await browserClient
      .from(DATABASE.TABLES.CHALLENGES)
      .insert({
        [DATABASE.COLUMNS.TITLE]: challenge.title,
        [DATABASE.COLUMNS.DESCRIPTION]: challenge.description,
        [DATABASE.COLUMNS.START_DATE]: challenge.startDate,
        [DATABASE.COLUMNS.FINISH_DATE]: challenge.finishDate,
        [DATABASE.COLUMNS.CATEGORY]: challenge.category,
        [DATABASE.COLUMNS.EXECUTE_DAYS]: challenge.executeDays,
        [DATABASE.COLUMNS.CHALLENGE_IMAGE]: imageUrl || null,
        [DATABASE.COLUMNS.CREATED_AT]: new Date().toISOString(),
        [DATABASE.COLUMNS.CREATOR_ID]: userId
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return { success: true, message: ERROR_MESSAGES.CHALLENGE_CREATION_SUCCESS };
  } catch (error) {
    console.error('챌린지 생성 중 오류 발생:', error);
    return { success: false, message: ERROR_MESSAGES.CHALLENGE_CREATION_FAILED };
  }
};
