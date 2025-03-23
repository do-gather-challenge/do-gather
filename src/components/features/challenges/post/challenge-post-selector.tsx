'use client';

import Tag from '@/components/ui/tag';
import { DAYS } from '@/constants/challenge.constants';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import { getCategoryRadioClass, getDayCheckboxClass } from '@/lib/utils/post.util';
import { ChallengeCategory, ChallengeCategoryType } from '@/types/challenge-category.type';
import { useState } from 'react';
import ChallengePostDatePicker from './challenge-post-date-picker';

const ChallengePostSelector = () => {
  const { challenge, setters } = useChallengeForm();
  const [isEveryDayChecked, setIsEveryDayChecked] = useState(false);

  // 요일 선택 핸들러
  const handleDaySelection = (day: string) => {
    const newExecuteDays = challenge.executeDays.includes(day)
      ? challenge.executeDays.filter((d) => d !== day)
      : [...challenge.executeDays, day];
    setters.setExecuteDays(newExecuteDays);
  };

  // 반복일정 체크박스 변경 핸들러
  const handleEveryDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsEveryDayChecked(isChecked);

    if (isChecked) {
      setters.setExecuteDays(DAYS);
    } else {
      setters.setExecuteDays([]);
    }
  };

  // 챌린지 선택 핸들러
  const handleCategorySelection = (category: string) => {
    setters.setCategory(category);
  };

  return (
    <div>
      {/* 반복 일정 */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="mb-2 text-lg font-semibold">반복 일정</label>
          <div>
            <input
              type="checkbox"
              id="every-day"
              className="mr-2"
              checked={isEveryDayChecked}
              onChange={handleEveryDayChange}
            />
            <label htmlFor="every-day" className="mr-6">
              매일
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          {DAYS.map((day) => (
            <label
              key={day}
              className={`${getDayCheckboxClass(day, challenge.executeDays)} flex items-center justify-center`}
            >
              <input
                type="checkbox"
                name="executeDays"
                value={day}
                checked={challenge.executeDays.includes(day)}
                onChange={() => handleDaySelection(day)}
                className="hidden"
              />
              {day}
            </label>
          ))}
        </div>
      </section>

      {/* 챌린지 유형 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 유형</h2>
        <div className="flex gap-2">
          {Object.keys(ChallengeCategory).map((category) => (
            <label key={category} className={getCategoryRadioClass(category, challenge.category)}>
              <input
                type="radio"
                name="category"
                value={category}
                checked={challenge.category === category}
                onChange={() => handleCategorySelection(category)}
                className="hidden"
              />
              <Tag category={category as ChallengeCategoryType} />
            </label>
          ))}
        </div>
      </section>

      {/* 시작/종료 날짜 */}
      <section>
        <h2 className="mb-2 text-lg font-semibold">시작/종료 날짜</h2>

        <ChallengePostDatePicker
          startDate={challenge.startDate ? new Date(challenge.startDate) : undefined}
          endDate={challenge.finishDate ? new Date(challenge.finishDate) : undefined}
          onStartDateChange={(date) => setters.setStartDate(date?.toISOString() || '')}
          onEndDateChange={(date) => setters.setFinishDate(date?.toISOString() || '')}
        />
      </section>
    </div>
  );
};

export default ChallengePostSelector;
