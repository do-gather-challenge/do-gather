import { ChallengePost } from '@/types/challenge.type';
import { DATABASE, FETCH_MESSAGES } from '@/constants/challenge-post.constants';
import browserClient from '../supabase/client';
import { fetchUploadImage } from './storage.api';
import { validateChallengePost, validateFile } from '../utils/validate.util';

/**
 * 챌린지 게시물을 생성하거나 수정하는 함수
 * @param {ChallengePost} challengeData - 챌린지 데이터
 * @param {File | null} challengeImageFile - 챌린지 이미지 파일
 * @param {boolean} isUpdate - 수정인지 생성인지
 * @param {number | null} challengeId - 수정 시에만 필요한 챌린지 ID
 * @returns {Promise<{ success: boolean; message: string }>} - 성공 여부와 메시지
 */
const fetchCreateOrUpdateChallenge = async (
  challengeData: ChallengePost,
  challengeImageFile: File | null,
  isUpdate: boolean,
  challengeId: number | null
): Promise<{ success: boolean; message: string }> => {
  // 필수 입력값 검증
  const { success, error } = validateChallengePost.safeParse(challengeData);
  if (!success) {
    return { success: false, message: error.errors[0].message };
  }

  // 이미지 파일 검증
  if (challengeImageFile) {
    const fileValidationError = validateFile(challengeImageFile);
    if (fileValidationError) {
      return { success: false, message: fileValidationError };
    }
  }

  try {
    let imageUrl: string | null = null;

    // 이미지 업로드 (파일이 제공된 경우)
    if (challengeImageFile) {
      const { url, error: uploadError } = await fetchUploadImage(challengeImageFile);
      if (uploadError || !url) {
        return { success: false, message: uploadError || '이미지 업로드에 실패했습니다.' };
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

    let result;

    if (isUpdate) {
      // 수정일 경우
      const updatePayload: Record<string, string | string[]> = {
        title: challengeData.title,
        description: challengeData.description,
        start_date: challengeData.startDate,
        finish_date: challengeData.finishDate,
        category: challengeData.category,
        execute_days: challengeData.executeDays
      };

      if (imageUrl) {
        updatePayload.challenge_image = imageUrl;
      }

      result = await browserClient
        .from(DATABASE.TABLES.CHALLENGES)
        .update(updatePayload)
        .eq('id', challengeId)
        .eq('creator_id', userId)
        .select();

      if (result.error) {
        throw result.error;
      }

      if (!result.data || result.data.length === 0) {
        return { success: false, message: '챌린지 수정 반영 안됨' };
      }
      return { success: true, message: '챌린지 수정 성공' };
    } else {
      // 생성일 경우
      result = await browserClient
        .from(DATABASE.TABLES.CHALLENGES)
        .insert({
          title: challengeData.title,
          description: challengeData.description,
          start_date: challengeData.startDate,
          finish_date: challengeData.finishDate,
          category: challengeData.category,
          execute_days: challengeData.executeDays,
          challenge_image: imageUrl,
          created_at: new Date().toISOString(),
          creator_id: userId
        })
        .select()
        .single();

      if (result.error) {
        throw result.error;
      }

      return { success: true, message: '챌린지 생성 성공' };
    }
  } catch (error) {
    console.error(isUpdate ? '챌린지 수정 중 오류 발생:' : '챌린지 생성 중 오류 발생:', error);
    return { success: false, message: isUpdate ? '챌린지 수정에 실패했습니다.' : '챌린지 생성에 실패했습니다.' };
  }
};

export { fetchCreateOrUpdateChallenge };

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
  return fetchCreateOrUpdateChallenge(challenge, challengeImageFile, false, null);
};

/**
 * 챌린지 게시물을 수정하는 API 함수
 * @param {number} challengeId - 수정할 챌린지의 ID
 * @param {ChallengePost} updatedChallenge - 수정할 챌린지 데이터
 * @param {File | null} challengeImageFile - 새로 업로드할 챌린지 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>} - 성공 여부와 메시지
 */
export const fetchUpdateChallenge = async (
  challengeId: number,
  updatedChallenge: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  return fetchCreateOrUpdateChallenge(updatedChallenge, challengeImageFile, true, challengeId);
};
