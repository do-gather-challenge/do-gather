'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { CATEGORY_OPTIONS, SORT_OPTIONS, STATUS_OPTIONS } from '@/constants/filter.constant';
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
  const cards = data?.data || [];

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-x-4">
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
        <div className="relative inline-block w-96 text-2xl">
          <Input
            placeholder="검색어 입력"
            className="h-12 w-full rounded-full pr-10 pl-4 !text-lg focus-visible:ring-0"
            onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
          />
          <HiOutlineMagnifyingGlass className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      <div className="gird w-full grid-cols-4 bg-blue-100">
        {cards.map((card) => (
          <div key={card.id}>{card.title}</div>
        ))}
        {/* <ChallengeHomeFindFilteredList/> */}
      </div>
    </>
  );
};

export default ChallengeHomeFindFilter;

const CARDS_PER_PAGE = 12;
