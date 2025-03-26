'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CARDS_PER_PAGE, CATEGORY_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '@/constants/filter.constant';
import { queryKeys } from '@/constants/query-keys.constant';
import { fetchGetChallengesByPage } from '@/lib/api/challenge.api';
import { ChallengeCategory, ChallengeCategoryType } from '@/types/challenge-category.type';
import { ChallengeStatus } from '@/types/challenge-status.type';
import { ChallengeFilterOptions } from '@/types/challenge.type';
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ChallengeHomeDropdown } from './challenge-home-dropdown';
import { Divide } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import ChallengeHomeFindFilteredList from './challenge-home-find-filtered-list';

const ChallengeHomeFindFilter = () => {
  const [filters, setFilters] = useState<ChallengeFilterOptions>({
    category: '',
    status: 'IN_PROGRESS',
    sortBy: 'RECENT',
    searchTerm: ''
  });
  const [page, setPage] = useState(1);
  const { data, isPending, isError, error } = useQuery({
    queryKey: [queryKeys.FILTERED_CHALLENGE, page, filters],
    queryFn: () => fetchGetChallengesByPage(page, CARDS_PER_PAGE, filters)
  });

  // console.log(data?.data);
  const pageCount = data?.pagination.pageCount ?? 0;
  const challenges = data?.data || [];

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="flex flex-col items-center space-y-2 lg:space-y-0 lg:flex-row lg:justify-between">
        <div className="flex flex-col space-y-2 sm:space-y-0 sm:space-x-4 sm:flex-row">
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
        <div className="relative inline-block text-2xl w-80 sm:w-[38rem] lg:w-96">
          <Input
            placeholder="검색어 입력"
            className="h-12 w-full rounded-full bg-white pr-10 pl-4 !text-lg focus-visible:ring-0"
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
          <HiOutlineMagnifyingGlass className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <ChallengeHomeFindFilteredList challenges={challenges} isPending={isPending} />
    </>
  );
};

export default ChallengeHomeFindFilter;