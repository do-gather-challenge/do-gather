import { createClient } from '@/lib/supabase/client';
import { ChallengePost } from '@/types/challenge.type';

/**
 * 챌린지 생성 API
 * @param {ChallengePost} challenge - 생성할 챌린지 데이터
 * @param {File | null} challengeImageFile - 챌린지 이미지 파일
 * @returns {Promise<{ success: boolean; message: string }>}
 */
export const fetchCreatePost = async (
  challenge: ChallengePost,
  challengeImageFile: File | null
): Promise<{ success: boolean; message: string }> => {
  const browserClient = createClient();
  const { title, description, startDate, finishDate, category, executeDays } = challenge;

  if (!title || !description || !startDate || !finishDate || !category || executeDays.length === 0) {
    return { success: false, message: '모든 필수 정보를 입력해 주세요.' };
  }

  try {
    let imageUrl = '';

    // 파일 이름 생성 함수
    const generateFileName = (file: File): string => {
      const timestamp = Date.now();
      const fileName = file.name.replace(/[^a-zA-Z0-9-_\.]/g, '');
      return `${timestamp}-${fileName}`;
    };

    // 이미지 업로드
    if (challengeImageFile) {
      const fileName = generateFileName(challengeImageFile);
      const { error: uploadError } = await browserClient.storage
        .from('challenge-images')
        .upload(fileName, challengeImageFile);

      if (uploadError) {
        console.error('이미지 업로드 오류:', uploadError);
        return { success: false, message: '이미지 업로드에 실패했습니다.' };
      }

      const {
        data: { publicUrl }
      } = browserClient.storage.from('challenge-images').getPublicUrl(fileName);
      imageUrl = publicUrl;
    }

    // 로그인 세션 확인
    const {
      data: { session }
    } = await browserClient.auth.getSession();
    if (!session) {
      return { success: false, message: '로그인 후 사용 가능합니다.' };
    }
    const userId = session.user.id;

    // 챌린지 생성
    const { data: challengeData, error: insertError } = await browserClient
      .from('challenges')
      .insert({
        title,
        description,
        start_date: startDate,
        finish_date: finishDate,
        category,
        execute_days: executeDays,
        challenge_image: imageUrl || null,
        created_at: new Date().toISOString(),
        creator_id: userId
      })
      .select()
      .single();

    if (insertError) {
      throw insertError;
    }

    return { success: true, message: '챌린지가 성공적으로 생성되었습니다!' };
  } catch (error) {
    console.error('챌린지 생성 중 오류 발생:', error);
    return { success: false, message: '챌린지 생성에 실패했습니다.' };
  }
};
