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
  const random = Math.random().toString(36).slice(2, 8); // 파일이름 중복 줄이기 위해
  const timestamp = Date.now();
  const fileName = file.name.replace(/[^a-zA-Z0-9-_\.]/g, '');
  return `${timestamp}-${random}-${fileName}`;
};

/**
 * 캘린더에서 날짜를 선택할 때, 하루가 -1 되는 현상을 방지하기 위해 만들어진 유틸리티 함수
 * @param {Date} date - 변환할 날짜 객체
 * @returns {string} - 변환된 'YYYY-MM-DD' 형식의 문자열
 */
export const toLocalDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 챌린지 데이터 payload 생성 함수
 * @param {ChallengePost} challengeData - 챌린지 데이터
 * @param {string | null} imageUrl - 업로드된 이미지 URL
 * @param {string} userId - 유저 ID
 * @returns {Record<string, any>} - DB에 저장할 payload 객체
 */
export const buildChallengePayload = (
  challengeData: ChallengePost,
  imageUrl: string | null,
  userId: string
): Record<string, any> => ({
  title: challengeData.title,
  description: challengeData.description,
  start_date: challengeData.startDate,
  finish_date: challengeData.finishDate,
  category: challengeData.category,
  execute_days: challengeData.executeDays,
  creator_id: userId,
  created_at: new Date().toISOString(),
  ...(imageUrl ? { challenge_image: imageUrl } : {}) // 이미지가 있을 때만 추가
});
