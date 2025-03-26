import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { calculatePaginationEllipsis } from '@/lib/utils/calculate-pagination-ellipsis.util';

export function ChallengeHomePagination({
  currentPage,
  pageCount,
  onPageChange
}: {
  currentPage: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const pages = calculatePaginationEllipsis(currentPage, pageCount);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem className="px-4">
          <Button
            variant="outline"
            className="h-9 w-9 rounded-full border-none"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </Button>
        </PaginationItem>
        {pages.map((page, i) => {
          if (page === -1) {
            return <PaginationEllipsis key={i} />;
          }
          const isCurrentPage = currentPage === page;
          return (
            <PaginationItem key={page}>
              <Button
                variant="outline"
                className={`w-9 px-0 ${isCurrentPage && 'bg-primary'}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </Button>
            </PaginationItem>
          );
        })}
        <PaginationItem className="px-4">
          <Button
            variant="outline"
            className="h-9 w-9 rounded-full border-none"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === pageCount}
          >
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
