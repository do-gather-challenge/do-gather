import { FETCH_MESSAGES } from '@/constants/challenge-post.constants';
import { FILES } from '@/constants/files.constant';
import { ChallengePost } from '@/types/challenge.type';

/**
 * 문자열이 유효한 양의 정수인지 확인합니다.
 *
 * @param str - 검사할 문자열
 * @returns 유효한 양의 정수인 경우 true, 그렇지 않은 경우 false를 반환합니다.
 */
export const isValidNumber = (str: string) => {
  if (str.trim() === '') return false;
  if (!/^\d+$/.test(str)) return false;
  const num = Number(str);
  return !isNaN(num) && isFinite(num) && Number.isInteger(num);
};

/**
 * 챌린지 게시물의 필수 입력값을 검증하는 유틸리티 함수
 * @param {ChallengePost} challenge - 검증할 챌린지 게시물 데이터
 * @returns {string | null} - 검증 결과 (오류 메시지 또는 null)
 */
export const validateChallengePost = (challenge: ChallengePost): string | null => {
  const { title, description, startDate, finishDate, category, executeDays } = challenge;

  if (!title) return FETCH_MESSAGES.TITLE_REQUIRED;
  if (!description) return FETCH_MESSAGES.DESCRIPTION_REQUIRED;
  if (!startDate) return FETCH_MESSAGES.START_DATE_REQUIRED;
  if (!finishDate) return FETCH_MESSAGES.FINISH_DATE_REQUIRED;
  if (!category) return FETCH_MESSAGES.CATEGORY_REQUIRED;
  if (executeDays.length === 0) return FETCH_MESSAGES.EXECUTE_DAYS_REQUIRED;
  // 제목 길이 (30자 이내)
  if (title.length > 30) return FETCH_MESSAGES.TITLE_TOO_LONG;
  // 소개 길이 (500자 이내)
  if (description.length > 500) return FETCH_MESSAGES.DESCRIPTION_TOO_LONG;

  return null;
};

/**
 * 파일 유효성 검증 유틸리티 함수 (통합 버전)
 * @param {File} file - 검증할 파일
 * @param {string[]} [allowedTypes=FILES.ALLOWED_TYPES] - 허용 파일 타입 (기본값 설정)
 * @param {number} [maxSize=FILES.MAX_SIZE] - 최대 파일 크기 (기본값 설정)
 * @returns {string | null} - 에러 메시지 또는 null(유효한 경우)
 */
export const validateFile = (
  file: File,
  allowedTypes: string[] = FILES.ALLOWED_TYPES,
  maxSize: number = FILES.MAX_SIZE
): string | null => {
  // 파일 형식 검증
  if (!allowedTypes.includes(file.type)) return FETCH_MESSAGES.IMAGE_TYPE_INVALID;
  // 파일 크기 검증
  if (file.size > maxSize) return FETCH_MESSAGES.IMAGE_SIZE_TOO_LARGE;

  return null;
};

