/**
 * 요일 버튼의 클래스 이름을 반환하는 유틸리티 함수
 * @param day - 요일
 * @param executeDays - 선택된 요일 배열
 * @returns {string} - 조건에 맞는 클래스 이름
 */
export const getDayCheckboxClass = (day: string, executeDays: string[]): string => {
  let buttonClass = 'h-8 w-8 rounded-full border';

  if (executeDays.includes(day)) {
    buttonClass += ' bg-primary border-red-700';
  } else {
    buttonClass += ' border-border hover:bg-primary hover:border-red-700';
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
  let buttonClass = 'cursor-pointer';

  if (selectedCategory === category) {
    buttonClass += ' opacity-100 border rounded-full border-red-700';
  } else {
    buttonClass += ' opacity-40 hover:opacity-100 ';
  }

  return buttonClass;
};
