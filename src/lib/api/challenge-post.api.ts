import { createClient } from '@/lib/supabase/client';
import { ChallengePost } from '@/types/challenge.type';
import { generateFileName, validateChallengePost } from '../utils/post.util';
import { DATABASE, ERROR_MESSAGES, SUPABASE_STORAGE_BUCKET } from '@/constants/challenge-post.constants';

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

    // 이미지 업로드
    if (challengeImageFile) {
      const publicUrl = await uploadImageToStorage(challengeImageFile);
      if (!publicUrl) {
        return { success: false, message: ERROR_MESSAGES.IMAGE_UPLOAD_FAILED };
      }
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
    const { data: challengeData, error: insertError } = await insertChallenge(challenge, imageUrl, userId);

    if (insertError) {
      throw insertError;
    }

    return { success: true, message: ERROR_MESSAGES.CHALLENGE_CREATION_SUCCESS };
  } catch (error) {
    console.error('챌린지 생성 중 오류 발생:', error);
    return { success: false, message: ERROR_MESSAGES.CHALLENGE_CREATION_FAILED };
  }
};

/**
 * 이미지를 Supabase Storage에 업로드하는 함수
 * @param {File} file - 업로드할 파일
 * @returns {Promise<string | null>} - 업로드된 이미지의 URL
 */
export const uploadImageToStorage = async (file: File): Promise<string | null> => {
  const browserClient = createClient();
  const fileName = generateFileName(file);

  const { error: uploadError } = await browserClient.storage.from(SUPABASE_STORAGE_BUCKET).upload(fileName, file);

  if (uploadError) {
    console.error('이미지 업로드 오류:', uploadError);
    return null;
  }

  const {
    data: { publicUrl }
  } = browserClient.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(fileName);
  return publicUrl;
};

/**
 * 챌린지 데이터를 데이터베이스에 삽입하는 함수
 * @param {ChallengePost} challenge - 생성할 챌린지 데이터
 * @param {string} imageUrl - 챌린지 이미지 URL
 * @param {string} userId - 유저 ID
 * @returns {Promise<{ data: any; error: any }>}
 */
export const insertChallenge = async (
  challenge: ChallengePost,
  imageUrl: string,
  userId: string
): Promise<{ data: any; error: any }> => {
  const browserClient = createClient();

  return await browserClient
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
};
