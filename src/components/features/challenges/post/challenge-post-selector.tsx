import Tag from '@/components/ui/tag';
import { DAYS } from '@/constants/challenge-post.constants';
import { getCategoryRadioClass, getDayCheckboxClass } from '@/lib/utils/post.util';
import { categories, ChallengeCategoryType } from '@/types/challenge-category.type';
import { useEffect, useState } from 'react';
import ChallengePostDatePicker from './challenge-post-date-picker';
import { ChallengePost } from '@/types/challenge.type';
import { ChallengePostSetters } from '@/types/challenge-post.type';

type ChallengePostSelectorProps = {
  challenge: ChallengePost;
  setters: ChallengePostSetters;
};

const ChallengePostSelector = ({ challenge, setters }: ChallengePostSelectorProps) => {
  const [isEveryDayChecked, setIsEveryDayChecked] = useState(false);

  useEffect(() => {
    setIsEveryDayChecked(challenge.executeDays.length === DAYS.length);
  }, [challenge.executeDays]);

  // 요일 선택
  const handleDaySelection = (day: string) => {
    const newExecuteDays = challenge.executeDays.includes(day)
      ? challenge.executeDays.filter((d) => d !== day)
      : [...challenge.executeDays, day];

    if (newExecuteDays.length !== challenge.executeDays.length) {
      setters.setExecuteDays(newExecuteDays);
    }
  };

  // 반복일정 체크박스 변경
  const handleEveryDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setIsEveryDayChecked(isChecked);

    if (isChecked) {
      setters.setExecuteDays(DAYS);
    } else {
      setters.setExecuteDays([]);
    }
  };

  // 챌린지 선택
  const handleCategorySelection = (category: ChallengeCategoryType) => {
    setters.setCategory(category);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 반복 일정 */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-lg font-semibold">반복 일정</label>
          <div>
            <input
              type="checkbox"
              id="every-day"
              className="mr-2"
              checked={isEveryDayChecked}
              onChange={handleEveryDayChange}
            />
            <label htmlFor="every-day">매일</label>
          </div>
        </div>
        <div className="flex gap-1">
          {DAYS.map((day) => (
            <label
              key={day}
              className={`${getDayCheckboxClass(day, challenge.executeDays)} flex items-center justify-center font-semibold`}
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
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">챌린지 유형</h2>
        <div className="flex gap-1">
          {categories.map((category) => (
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
      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">시작/종료 날짜</h2>

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
