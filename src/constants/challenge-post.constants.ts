// 일단 post 관련 constant는 모두 여기에 모아 두고 나중에 다른 적절한 곳에 합치겠습니다.
export const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
export const SUPABASE_STORAGE_BUCKET = 'challenge-images';
export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: '모든 필수 정보를 입력해 주세요.',
  IMAGE_UPLOAD_FAILED: '이미지 업로드에 실패했습니다.',
  LOGIN_REQUIRED: '로그인 후 사용 가능합니다.',
  CHALLENGE_CREATION_FAILED: '챌린지 생성에 실패했습니다.',
  CHALLENGE_CREATION_SUCCESS: '챌린지가 성공적으로 생성되었습니다!',
  TITLE_REQUIRED: '제목을 입력해 주세요.',
  DESCRIPTION_REQUIRED: '설명을 입력해 주세요.',
  START_DATE_REQUIRED: '시작일을 선택해 주세요.',
  FINISH_DATE_REQUIRED: '종료일을 선택해 주세요.',
  CATEGORY_REQUIRED: '카테고리를 선택해 주세요.',
  EXECUTE_DAYS_REQUIRED: '실행 요일을 선택해 주세요.',
  TITLE_TOO_LONG: '제목은 30자 이내로 입력해 주세요.',
  DESCRIPTION_TOO_LONG: '소개는 500자 이내로 입력해 주세요.',
  IMAGE_TYPE_INVALID: 'PNG 또는 JPG 파일만 업로드 가능합니다.',
  IMAGE_SIZE_TOO_LARGE: '이미지 크기는 3MB 이하로 업로드 가능합니다.'
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

