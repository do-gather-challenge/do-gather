/**
 * 페이지네이션 자동 Ellipsis 적용을 위한 함수
 * 페이지 수가 5보다 많아지면 적용됩니다.
 *
 * @param current - 현재 페이지
 * @param total - 전체 페이지 개수
 * @returns number[] - 축소가 된 페이지는 -1로 저장된 페이지 페열
 */

const MAX_PAGE = 5;

export function calculatePaginationEllipsis(current: number, total: number): number[] {
  const pages: number[] = [];

  if (total <= MAX_PAGE) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  pages.push(1);

  const left = Math.max(current - 1, 2);
  const right = Math.min(current + 1, total - 1);

  if (left > 2) {
    pages.push(-1);
  }

  for (let i = left; i <= right; i++) {
    pages.push(i);
  }

  if (right < total - 1) {
    pages.push(-1);
  }

  pages.push(total);

  return pages;
}
