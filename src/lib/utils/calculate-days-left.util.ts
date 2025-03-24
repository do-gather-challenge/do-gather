/**
 * 현재 날짜를 기준으로 챌린지 시작일까지 남은 날짜를 계산합니다.
 *
 * @param startDate - 챌린지 시작일 문자열(날짜 : startDate 값)
 * @returns 챌린까지 남은 날짜, 즉 D-day를 반환합니다.
 */
export const calculateDaysLeft = (startDate: string) => {
  const currentDate = new Date();
  const deadlineDate = new Date(startDate);
  const timeDiff = deadlineDate.getTime() - currentDate.getTime();
  const dayLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return dayLeft;
};
