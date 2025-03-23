// 일단 post 관련 산수는 여기에 모아 두고 나중에 다른 곳에 합치겠습니다.
export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const SUPABASE_STORAGE_BUCKET = 'challenge-images';
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: '모든 필수 정보를 입력해 주세요.',
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
  LOGIN_REQUIRED: '로그인 후 사용 가능합니다.',
  CHALLENGE_CREATION_FAILED: '챌린지 생성에 실패했습니다.',
  CHALLENGE_CREATION_SUCCESS: '챌린지가 성공적으로 생성되었습니다!'
};
export const DATABASE = {
  TABLES: {
    CHALLENGES: 'challenges',
    PARTICIPANTS: 'participants'
  },
  COLUMNS: {
    TITLE: 'title',
    DESCRIPTION: 'description',
    START_DATE: 'start_date',
    FINISH_DATE: 'finish_date',
    CATEGORY: 'category',
    EXECUTE_DAYS: 'execute_days',
    CHALLENGE_IMAGE: 'challenge_image',
    CREATED_AT: 'created_at',
    CREATOR_ID: 'creator_id'
  }
};
