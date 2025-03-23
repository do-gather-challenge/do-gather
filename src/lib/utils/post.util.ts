import { ChallengePost } from '@/types/challenge.type';

/**
 * 요일 체크박스의 클래스 이름을 반환하는 유틸리티 함수
 * @param day - 요일
 * @param executeDays - 선택된 요일 배열
 * @returns {string} - 조건에 맞는 클래스 이름
 */
export const getDayCheckboxClass = (day: string, executeDays: string[]): string => {
  let buttonClass = 'h-8 w-8 rounded-full border cursor-pointer';

  if (executeDays.includes(day)) {
    buttonClass += ' bg-primary border-red-700';
  } else {
    buttonClass += ' border-border hover:bg-primary hover:border-red-700 ';
  }

  return buttonClass;
};

/**
 * 카테고리 라디오 버튼의 클래스 이름을 반환하는 유틸리티 함수
 * @param category - 카테고리
 * @param selectedCategory - 현재 선택된 카테고리
 * @returns {string} - 조건에 맞는 클래스 이름
 */
export const getCategoryRadioClass = (category: string, selectedCategory: string): string => {
  let buttonClass = 'cursor-pointer rounded-full border';

  if (selectedCategory === category) {
    buttonClass += ' opacity-100 border-red-700';
  } else {
    buttonClass += ' opacity-40 hover:opacity-100';
  }

  return buttonClass;
};

/**
 * 파일 이름을 생성하는 유틸리티 함수
 * @param {File} file - 업로드할 파일
 * @returns {string} - 생성된 파일 이름
 */
export const generateFileName = (file: File): string => {
  const timestamp = Date.now();
  const fileName = file.name.replace(/[^a-zA-Z0-9-_\.]/g, ''); // 특수 문자 및 한글 제거
  return `${timestamp}-${fileName}`;
};

// 일단 post 관련 함수는 여기에 모아 두고 나중에 다른 곳에 합치겠습니다.

/**
 * 챌린지 게시물의 필수 입력값을 검증하는 유틸리티 함수
 * @param {ChallengePost} challenge - 검증할 챌린지 게시물 데이터
 * @returns {string | null} - 검증 결과 (오류 메시지 또는 null)
 */
export const validateChallengePost = (challenge: ChallengePost): string | null => {
  const { title, description, startDate, finishDate, category, executeDays } = challenge;

  if (!title) return '제목을 입력해 주세요.';
  if (!description) return '설명을 입력해 주세요.';
  if (!startDate) return '시작일을 선택해 주세요.';
  if (!finishDate) return '종료일을 선택해 주세요.';
  if (!category) return '카테고리를 선택해 주세요.';
  if (executeDays.length === 0) return '실행 요일을 선택해 주세요.';

  return null;
};
