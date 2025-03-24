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
    let imageUrl: string | null = '';

    // 이미지 업로드
    if (challengeImageFile) {
      const { url, error: uploadError } = await uploadImageToStorage(challengeImageFile);
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
    const { data: challengeData, error: insertError } = await browserClient
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

/**
 * 이미지를 Supabase Storage에 업로드하는 함수
 * @param {File} file - 업로드할 파일
 * @returns { Promise<{ url: string | null; error: string | null }>} - 업로드된 이미지의 URL
 */
export const uploadImageToStorage = async (file: File): Promise<{ url: string | null; error: string | null }> => {
  const browserClient = createClient();

  // 파일 형식 (PNG 또는 JPG만 허용)
  const allowedTypes = ['image/png', 'image/jpeg'];
  if (!allowedTypes.includes(file.type)) {
    console.error('이미지 형식 오류:', file.type);
    return { url: null, error: ERROR_MESSAGES.IMAGE_TYPE_INVALID };
  }

  // 파일 크기 (3MB 이하만 허용)
  const maxSize = 3 * 1024 * 1024;
  if (file.size > maxSize) {
    console.error('이미지 크기 오류:', file.size);
    return { url: null, error: ERROR_MESSAGES.IMAGE_SIZE_TOO_LARGE };
  }

  const fileName = generateFileName(file);

  const { error: uploadError } = await browserClient.storage.from(SUPABASE_STORAGE_BUCKET).upload(fileName, file);

  if (uploadError) {
    console.error('이미지 업로드 오류:', uploadError);
    return { url: null, error: ERROR_MESSAGES.IMAGE_UPLOAD_FAILED };
  }

  const {
    data: { publicUrl }
  } = browserClient.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(fileName);
  return { url: publicUrl, error: null };
};
