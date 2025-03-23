import { createClient } from '@/lib/supabase/client';
import { ChallengePost } from '@/types/challenge.type';
import { generateFileName, validateChallengePost } from '../utils/post.util';
import { ERROR_MESSAGES, SUPABASE_STORAGE_BUCKET } from '@/constants/challenge-post.constants';

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
  const browserClient = createClient();

  // 필수 입력값 검증
  const validationError = validateChallengePost(challenge);
  if (validationError) {
    return { success: false, message: validationError };
  }

  try {
    let imageUrl = '';

    // 이미지 업로드 로직
    if (challengeImageFile) {
      const fileName = generateFileName(challengeImageFile);
      const { error: uploadError } = await browserClient.storage
        .from(SUPABASE_STORAGE_BUCKET)
        .upload(fileName, challengeImageFile);

      if (uploadError) {
        console.error('이미지 업로드 오류:', uploadError);
        return { success: false, message: ERROR_MESSAGES.IMAGE_UPLOAD_FAILED };
      }

      const {
        data: { publicUrl }
      } = browserClient.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(fileName);
      imageUrl = publicUrl;
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
    const { data: challengeData, error: insertError } = await browserClient
      .from('challenges')
      .insert({
        title: challenge.title,
        description: challenge.description,
        start_date: challenge.startDate,
        finish_date: challenge.finishDate,
        category: challenge.category,
        execute_days: challenge.executeDays,
        challenge_image: imageUrl || null,
        created_at: new Date().toISOString(),
        creator_id: userId
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
