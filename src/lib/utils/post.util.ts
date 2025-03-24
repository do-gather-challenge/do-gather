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
