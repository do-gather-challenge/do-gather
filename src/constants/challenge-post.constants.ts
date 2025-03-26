import { z } from 'zod';

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const SUPABASE_STORAGE_BUCKET = 'challenge-images';
export const FETCH_MESSAGES = {
  REQUIRED_FIELDS: '모든 필수 정보를 입력해 주세요.',
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
  LOGIN_REQUIRED: '로그인 후 사용 가능합니다.',
  CHALLENGE_CREATION_FAILED: '챌린지 생성에 실패했습니다.',
  CHALLENGE_CREATION_SUCCESS: '챌린지가 성공적으로 생성되었습니다!',
  IMAGE_TYPE_INVALID: 'PNG 또는 JPG 파일만 업로드 가능합니다.',
  IMAGE_SIZE_TOO_LARGE: '이미지 크기는 3MB 이하로 업로드 가능합니다.'
};
export const DATABASE = {
  TABLES: {
    CHALLENGES: 'challenges',
    PARTICIPANTS: 'participants'
  }
};
export const ChallengePostSchema = {
  TITLE_SCHEMA: z.string().min(1, '제목을 입력해 주세요.').max(30, '제목은 30자 이내로 입력해 주세요.'),
  DESCRIPTION_SCHEMA: z.string().min(1, '설명을 입력해 주세요.').max(500, '소개는 500자 이내로 입력해 주세요.'),
  START_DATE_SCHEMA: z.string({ required_error: '시작일을 선택해 주세요.' }),
  FINISH_DATE_SCHEMA: z.string({ required_error: '종료일을 선택해 주세요.' }),
  CATEGORY_SCHEMA: z.string({ required_error: '카테고리를 선택해 주세요.' }),
  EXECUTE_DAYS_SCHEMA: z.array(z.string()).min(1, '실행 요일을 선택해 주세요.')
};
