import { z } from 'zod';

export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const SUPABASE_STORAGE_BUCKET = 'challenge-images';
export const DATABASE = {
  TABLES: {
    CHALLENGES: 'challenges',
    PARTICIPANTS: 'participants'
  }
};
export const FETCH_MESSAGES = {
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
  IMAGE_TYPE_INVALID: '허용되지 않는 파일 형식입니다. PNG 또는 JPG 파일만 업로드 가능합니다.',
  IMAGE_SIZE_TOO_LARGE: '이미지 크기는 3MB 이하로 업로드 가능합니다.'
};
export const CHALLENGE_API_MESSAGES = {
  CREATION: {
    SUCCESS: '챌린지 생성 성공',
    FAILED: '챌린지 생성에 실패했습니다.'
  },
  UPDATE: {
    SUCCESS: '챌린지 수정 성공',
    FAILED: '챌린지 수정에 실패했습니다.',
    NOT_FOUND: '해당 챌린지를 찾을 수 없습니다.',
    UNAUTHORIZED: '이 챌린지의 수정 권한이 없습니다.',
    NO_CHANGES: '챌린지 수정 반영 안됨'
  },
  IMAGE: {
    UPLOAD_FAILED: '이미지 업로드 실패'
  },
  AUTH: {
    LOGIN_REQUIRED: '로그인이 필요합니다.'
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
