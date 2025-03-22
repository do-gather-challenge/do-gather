import Tag from '@/components/ui/tag';
import { DAYS } from '@/constants/challenge.constants';
import { getDayCheckboxClass } from '@/lib/utils/post.util';
import { ChallengeCategory, ChallengeCategoryType } from '@/types/challenge-category.type';

type ChallengePostSelectProps = {
  selectedDays: string[];
  selectedCategory: string;
  startDate: string;
  finishDate: string;
  onSelectDay: (day: string) => void;
  onSelectCategory: (category: string) => void;

  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ChallengePostSelector = ({
  selectedDays,
  selectedCategory,
  startDate,
  finishDate,
  onSelectDay,
  onSelectCategory,

  handleChange
}: ChallengePostSelectProps) => {
  return (
    <div>
      {/* 반복 일정 */}
      <section className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="mb-2 text-lg font-semibold">반복 일정</label>
          <div>
            <input type="checkbox" id="every-day" className="mr-2" onChange={handleChange} />
            <label htmlFor="every-day" className="mr-6">
              매일
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          {DAYS.map((day) => (
            <label key={day} className={`${getDayCheckboxClass(day, selectedDays)} flex items-center justify-center`}>
              <input
                type="checkbox"
                name="executeDays"
                value={day}
                checked={selectedDays.includes(day)}
                onChange={() => onSelectDay(day)}
                className="hidden"
              />
              {day}
            </label>
          ))}
        </div>
      </section>

      {/* 유형 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 유형</h2>
        <div className="flex gap-2">
          {Object.keys(ChallengeCategory).map((category) => (
            <label
              key={category}
              className={`cursor-pointer ${selectedCategory === category ? 'opacity-100' : 'opacity-50'}`}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={() => onSelectCategory(category)}
                className="hidden"
              />
              <Tag category={category as ChallengeCategoryType} />
            </label>
          ))}
        </div>
      </section>

      {/* 시작/종료 날짜 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">시작/종료 날짜</h2>
        <div className="flex gap-1">
          <input
            type="date"
            id="startDate"
            className="border-border h-[24px] w-[124px] rounded-md border"
            value={startDate}
            onChange={handleChange}
          />
          <span>~</span>
          <input
            type="date"
            id="finishDate"
            className="border-border h-[24px] w-[124px] rounded-md border"
            value={finishDate}
            onChange={handleChange}
          />
        </div>
      </section>
    </div>
  );
};

export default ChallengePostSelector;
