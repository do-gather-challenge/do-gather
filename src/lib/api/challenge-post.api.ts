import { ChallengePost } from '@/types/challenge.type';
import { CHALLENGE_API_MESSAGES, DATABASE } from '@/constants/challenge-post.constants';
import browserClient from '../supabase/client';
import { validateChallengePost, validateFile } from '../utils/validate.util';
import { fetchUploadImage } from './storage.api';
import { getUserInfo } from './user-Info.api';
import { buildChallengePayload } from '../utils/post.util';
import { fetchGetChallengeById } from './challenge.api';

/**
 * 챌린지 생성
 * @param {ChallengePost} challengeData - 챌린지 데이터
 * @param {File | null} challengeImageFile - 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export const fetchCreateChallenge = async (
  challengeData: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  // 입력 검증
  const { success, error } = validateChallengePost.safeParse(challengeData);
  if (!success) return { success: false, message: error.errors[0].message };

  // 사용자 정보 확인
  const { userId } = await getUserInfo();
  if (!userId) return { success: false, message: CHALLENGE_API_MESSAGES.AUTH.LOGIN_REQUIRED };

  // 이미지 업로드
  const { imageUrl, error: uploadError } = await fetchUploadChallengeImage(challengeImageFile);
  if (uploadError) return { success: false, message: uploadError };

  // DB에 저장할 payload
  const payload = buildChallengePayload(challengeData, imageUrl, userId, false);

  // DB에 챌린지 생성 요청
  try {
    const result = await browserClient.from(DATABASE.TABLES.CHALLENGES).insert(payload).select().single();

    if (result.error) throw result.error;
    return { success: true, message: CHALLENGE_API_MESSAGES.CREATION.SUCCESS };
  } catch (error) {
    console.error('챌린지 생성 오류:', error);
    return { success: false, message: CHALLENGE_API_MESSAGES.CREATION.FAILED };
  }
};

/**
 * 챌린지 수정
 * @param {number} challengeId - 챌린지 ID
 * @param {ChallengePost} updatedChallenge - 수정할 챌린지 데이터
 * @param {File | null} challengeImageFile - 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export const fetchUpdateChallenge = async (
  challengeId: number,
  updatedChallenge: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  // 챌린지 데이터 조회
  const existingChallenge = await fetchGetChallengeById(challengeId);
  if (!existingChallenge) {
    return { success: false, message: CHALLENGE_API_MESSAGES.UPDATE.NOT_FOUND };
  }

  // 입력 검증
  const { success, error } = validateChallengePost.safeParse(updatedChallenge);
  if (!success) return { success: false, message: error.errors[0].message };

  // 사용자 정보 확인
  const { userId } = await getUserInfo();
  if (!userId) return { success: false, message: CHALLENGE_API_MESSAGES.AUTH.LOGIN_REQUIRED };

  // `creator_id`가 일치하는지 확인
  if (existingChallenge.creatorId !== userId) {
    return { success: false, message: CHALLENGE_API_MESSAGES.UPDATE.UNAUTHORIZED };
  }

  // 이미지 업로드
  const { imageUrl, error: uploadError } = await fetchUploadChallengeImage(challengeImageFile);
  if (uploadError) return { success: false, message: uploadError };

  // DB에 수정할 payload (created_at 제외)
  const updatedPayload = buildChallengePayload(updatedChallenge, imageUrl, userId, true);

  // DB에 챌린지 수정 요청
  try {
    const result = await browserClient
      .from(DATABASE.TABLES.CHALLENGES)
      .update(updatedPayload)
      .eq('id', challengeId)
      .eq('creator_id', userId)
      .select();

    if (result.error) throw result.error;
    if (!result.data || result.data.length === 0) {
      return { success: false, message: CHALLENGE_API_MESSAGES.UPDATE.NO_CHANGES };
    }

    return { success: true, message: CHALLENGE_API_MESSAGES.UPDATE.SUCCESS };
  } catch (error) {
    console.error('챌린지 수정 오류:', error);
    return { success: false, message: CHALLENGE_API_MESSAGES.UPDATE.FAILED };
  }
};

/**
 * 챌린지 이미지 업로드
 * @param {File | null} imageFile - 업로드할 이미지 파일
 * @returns {Promise<{ imageUrl: string | null; error: string | null }>}
 */

const fetchUploadChallengeImage = async (
  imageFile: File | null
): Promise<{ imageUrl: string | null; error: string | null }> => {
  if (!imageFile) return { imageUrl: null, error: null };

  const fileValidationError = validateFile(imageFile);
  if (fileValidationError) return { imageUrl: null, error: fileValidationError };

  const { url, error: uploadError } = await fetchUploadImage(imageFile);
  return uploadError || !url
    ? { imageUrl: null, error: uploadError || CHALLENGE_API_MESSAGES.IMAGE.UPLOAD_FAILED }
    : { imageUrl: url, error: null };
};
