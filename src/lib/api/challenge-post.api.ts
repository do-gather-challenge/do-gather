import { ChallengePost } from '@/types/challenge.type';
import { DATABASE } from '@/constants/challenge-post.constants';
import browserClient from '../supabase/client';
import { validateChallengePost, validateFile } from '../utils/validate.util';
import { fetchUploadImage } from './storage.api';
import { getUserInfo } from './user-Info.api';

/**
 * 챌린지 생성
 * @param {ChallengePost} challengeData - 챌린지 데이터
 * @param {File | null} challengeImageFile - 챌린지 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export const fetchCreateChallenge = async (
  challengeData: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  // 입력 검증
  const { success, error } = validateChallengePost.safeParse(challengeData);
  if (!success) return { success: false, message: error.errors[0].message };

  // 세션 확인
  const { userId } = await getUserInfo();

  // 이미지 업로드
  const { imageUrl, error: uploadError } = await fetchUploadChallengeImage(challengeImageFile);
  if (uploadError) return { success: false, message: uploadError };

  // 데이터베이스 저장
  return fetchCreateChallengeToDB(challengeData, imageUrl, userId);
};

/**
 * 챌린지 수정
 * @param {number} challengeId - 챌린지 ID
 * @param {ChallengePost} updatedChallenge - 수정할 챌린지 데이터
 * @param {File | null} challengeImageFile - 새 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export const fetchUpdateChallenge = async (
  challengeId: number,
  updatedChallenge: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  // 입력 검증
  const { success, error } = validateChallengePost.safeParse(updatedChallenge);
  if (!success) return { success: false, message: error.errors[0].message };

  // 서버 세션 확인
  const { userId } = await getUserInfo();

  // console.log('유저 ID:', userId); // 디버깅용으로 배포직전 삭제할게요

  // 이미지 업로드
  const { imageUrl, error: uploadError } = await fetchUploadChallengeImage(challengeImageFile);
  if (uploadError) return { success: false, message: uploadError };

  // 데이터베이스 업데이트
  return fetchUpdateChallengeToDB(challengeId, updatedChallenge, imageUrl, userId);
};

/**
 * 챌린지 생성 DB 저장
 * @param {ChallengePost} challengeData - 챌린지 데이터
 * @param {string | null} imageUrl - 이미지 URL
 * @param {string} userId - 사용자 ID
 * @returns {Promise<{ success: boolean; message: string }>}
 */
const fetchCreateChallengeToDB = async (
  challengeData: ChallengePost,
  imageUrl: string | null,
  userId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const newChallenge = {
      title: challengeData.title,
      description: challengeData.description,
      start_date: challengeData.startDate,
      finish_date: challengeData.finishDate,
      category: challengeData.category,
      execute_days: challengeData.executeDays,
      challenge_image: imageUrl,
      created_at: new Date().toISOString(),
      creator_id: userId
    };

    const result = await browserClient.from(DATABASE.TABLES.CHALLENGES).insert(newChallenge).select().single();

    if (result.error) throw result.error;
    return { success: true, message: '챌린지 생성 성공' };
  } catch (error) {
    console.error('챌린지 생성 오류:', error);
    return { success: false, message: '챌린지 생성에 실패했습니다.' };
  }
};

/**
 * 챌린지 수정 DB
 * @param {number} challengeId - 챌린지 ID
 * @param {ChallengePost} challengeData - 챌린지 데이터
 * @param {string | null} imageUrl - 이미지 URL
 * @param {string} userId - 사용자 ID
 * @returns {Promise<{ success: boolean; message: string }>}
 */
const fetchUpdateChallengeToDB = async (
  challengeId: number,
  challengeData: ChallengePost,
  imageUrl: string | null,
  userId: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const updatePayload = {
      title: challengeData.title,
      description: challengeData.description,
      start_date: challengeData.startDate,
      finish_date: challengeData.finishDate,
      category: challengeData.category,
      execute_days: challengeData.executeDays,
      ...(imageUrl && { challenge_image: imageUrl })
    };

    const result = await browserClient
      .from(DATABASE.TABLES.CHALLENGES)
      .update(updatePayload)
      .eq('id', challengeId)
      .eq('creator_id', userId)
      .select();

    if (result.error) throw result.error;
    if (!result.data || result.data.length === 0) {
      return { success: false, message: '챌린지 수정 반영 안됨' };
    }

    return { success: true, message: '챌린지 수정 성공' };
  } catch (error) {
    console.error('챌린지 수정 오류:', error);
    return { success: false, message: '챌린지 수정에 실패했습니다.' };
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
  if (fileValidationError) {
    return { imageUrl: null, error: fileValidationError };
  }

  const { url, error: uploadError } = await fetchUploadImage(imageFile);
  if (uploadError || !url) {
    return { imageUrl: null, error: uploadError || '이미지 업로드에 실패했습니다.' };
  }

  return { imageUrl: url, error: null };
};
