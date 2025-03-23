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
