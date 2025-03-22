/**
 * 요일 버튼의 클래스 이름을 반환하는 유틸리티 함수
 * @param day - 요일
 * @param executeDays - 선택된 요일 배열
 * @returns {string} - 조건에 맞는 클래스 이름
 */
export const getDayButtonClass = (day: string, executeDays: string[]): string => {
  let buttonClass = 'h-[32px] w-[32px] rounded-full border';

  if (executeDays.includes(day)) {
    buttonClass += ' bg-primary border-red-700';
  } else {
    buttonClass += ' border-border hover:bg-primary hover:border-red-700';
  }

  return buttonClass;
};

/**
 * 카테고리 버튼의 클래스 이름을 반환하는 유틸리티 함수
 * @param category - 카테고리
 * @param selectedCategory - 현재 선택된 카테고리
 * @returns {string} - 조건에 맞는 클래스 이름
 */
export const getCategoryButtonClass = (category: string, selectedCategory: string): string => {
  let buttonClass = 'h-[28px] w-[56px] rounded-full';

  if (selectedCategory === category) {
    buttonClass += ' border border-red-700';
  } else {
    buttonClass += ' bg-muted hover:border hover:border-red-700';
  }

  return buttonClass;
};
