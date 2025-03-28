import browserClient from '../supabase/client';
import { generateFileName } from '../utils/post.util';
import { FETCH_MESSAGES, SUPABASE_STORAGE_BUCKET } from '@/constants/challenge-post.constants';

/**
 * 이미지를 Supabase Storage에 업로드하는 함수
 * @param {File} file - 업로드할 파일
 * @returns { Promise<{ url: string | null; error: string | null }>} - 업로드된 이미지의 URL
 */
export const fetchUploadImage = async (file: File): Promise<{ url: string | null; error: string | null }> => {
  const fileName = generateFileName(file);

  const { error: uploadError } = await browserClient.storage.from(SUPABASE_STORAGE_BUCKET).upload(fileName, file);

  if (uploadError) {
    console.error('이미지 업로드 오류:', uploadError);
    return { url: null, error: FETCH_MESSAGES.IMAGE_UPLOAD_FAILED };
  }

  const {
    data: { publicUrl }
  } = browserClient.storage.from(SUPABASE_STORAGE_BUCKET).getPublicUrl(fileName);

  return { url: publicUrl, error: null };
};
