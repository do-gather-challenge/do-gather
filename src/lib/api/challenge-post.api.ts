import { ChallengePost } from '@/types/challenge.type';
import { DATABASE, FETCH_MESSAGES } from '@/constants/challenge-post.constants';
import browserClient from '../supabase/client';
import { fetchUploadImage } from './storage.api';
import { validateChallengePost, validateFile } from '../utils/validate.util';

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
  const { success, error } = validateChallengePost.safeParse(challenge);
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
        title: challenge.title,
        description: challenge.description,
        start_date: challenge.startDate,
        finish_date: challenge.finishDate,
        category: challenge.category,
        execute_days: challenge.executeDays,
        challenge_image: imageUrl,
        created_at: new Date().toISOString(),
        creator_id: userId
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
  // 필수 입력값 검증
  const { success, error } = validateChallengePost.safeParse(updatedChallenge);
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

    // 챌린지 수정
    const updatePayload: Record<string, any> = {
      title: updatedChallenge.title,
      description: updatedChallenge.description,
      start_date: updatedChallenge.startDate,
      finish_date: updatedChallenge.finishDate,
      category: updatedChallenge.category,
      execute_days: updatedChallenge.executeDays
    };

    if (imageUrl) {
      updatePayload.challenge_image = imageUrl;
    }

    const { data, error: updateError } = await browserClient
      .from(DATABASE.TABLES.CHALLENGES)
      .update(updatePayload)
      .eq('id', challengeId)
      .eq('creator_id', userId)
      .select();

    if (updateError) {
      throw updateError;
    }

    const { data: post } = await browserClient
      .from(DATABASE.TABLES.CHALLENGES)
      .select('*')
      .eq('id', challengeId)
      .single();

    console.log('Post Creator ID:', post.creator_id);
    console.log('Session User ID:', session.user.id);

    if (post.creator_id !== userId) {
      return { success: false, message: '내가 쓴 글이 아닙니다.' };
    }

    if (!data || data.length === 0) {
      return { success: false, message: '챌린지 수정 반영 안됨' };
    }

    return {
      success: true,
      message: '챌린지 수정 성공'
    };
  } catch (error: unknown) {
    console.error('챌린지 수정 중 오류 발생:', error);

    return {
      success: false,
      message: error instanceof Error ? error.message : '챌린지 수정에 실패했습니다.'
    };
  }
};
