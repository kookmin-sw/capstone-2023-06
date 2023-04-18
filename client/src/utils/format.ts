/**
 * 두 자리 수 라면 앞에 0 붙여주기
 * @param num 수
 * @returns 두 자리 수
 */
export const doubleDigit = (num: number): string => {
  if (num < 10) return `0${num}`;
  return `${num}`;
};

/**
 * 날짜 xxxx.xx.xx 형태로 출력
 * @param date 날짜
 * @returns 변경된 날짜 문자
 */
export const dateFormat = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}.${doubleDigit(month)}.${doubleDigit(day)}`;
};
