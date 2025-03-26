'use client';

import { useEffect, useState } from 'react';
import ChallengeHomeFindFilteredList from './challenge-home-find-filtered-list';
import { CATEGORY_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '@/constants/filter.constant';
import { Input } from '@/components/ui/input';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { ChallengeFilterOptions } from '@/types/challenge.type';
import { ChallengeHomeDropdown } from './challenge-home-dropdown';
import { ChallengeHomePagination } from './challenge-home-pagination';
import { useGetChallengesByPageQuery } from '@/lib/queries/use-get-challenges-by-page-query';
import { challengeFilter } from '@/types/challenge-filter.type';
import { useDebounce } from '@/lib/hooks/use-debounce';

const ChallengeHomeFindFilter = () => {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [filters, setFilters] = useState<ChallengeFilterOptions>({
    category: '',
    status: 'IN_PROGRESS',
    sortBy: 'RECENT',
    searchTerm: ''
  });
  
  const debouncedSearchTerm = useDebounce(searchInput, 1000);
  
  useEffect(() => {
    setPage(1);
    setFilters((prev) => ({
      ...prev,
      searchTerm: debouncedSearchTerm
    }));
  }, [debouncedSearchTerm]);

  const { pageCount, challenges, isPending, isError } = useGetChallengesByPageQuery(page, filters);
  if (isError) return <div>잠시 후 다시 시도해주세요</div>;

  const handleFilterChange = (key: challengeFilter, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-2 lg:flex-row lg:justify-between lg:space-y-0">
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <ChallengeHomeDropdown
            options={CATEGORY_OPTIONS}
            value={filters.category}
            onChange={(value) => handleFilterChange('category', value)}
          />
          <ChallengeHomeDropdown
            options={STATUS_OPTIONS}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
          />
          <ChallengeHomeDropdown
            options={SORT_OPTIONS}
            value={filters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>
        <div className="relative inline-block w-80 text-2xl sm:w-[38rem] lg:w-96">
          <Input
            placeholder="검색어 입력"
            className="h-12 w-full rounded-full bg-white pr-10 pl-4 !text-lg focus-visible:ring-0"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <HiOutlineMagnifyingGlass className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <ChallengeHomeFindFilteredList challenges={challenges} isPending={isPending} />
      <ChallengeHomePagination currentPage={page} pageCount={pageCount} onPageChange={(newPage) => setPage(newPage)} />
    </>
  );
};

export default ChallengeHomeFindFilter;
