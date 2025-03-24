/**
 * 현재 날짜 기준으로 챌린지가 유효한 챌린지인지 확인합니다
 *
 * @param startDate - 검사할 문자열(날짜 : startDate 값)
 * @returns 유효한 챌린지의 경우 true, 그렇지 않은 경우 false를 반환합니다.
 */
export const calculateDaysLeft = (startDate: string) => {
  const currentDate = new Date();
  const deadlineDate = new Date(startDate);
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const dayLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return dayLeft;
};
