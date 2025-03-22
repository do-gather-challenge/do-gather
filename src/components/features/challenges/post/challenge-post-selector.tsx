import { DAYS, CATEGORIES } from '@/constants/challenge.constants';
import { getDayButtonClass, getCategoryButtonClass } from '@/lib/utils/post.util';

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
          <h2 className="mb-2 text-lg font-semibold">반복 일정</h2>
          <div>
            <input
              type="checkbox"
              id="every-day"
              className="mr-2"
              onChange={handleChange} 
            />
            <label htmlFor="every-day" className="mr-6">
              매일
            </label>
          </div>
        </div>
        <div className="flex gap-2">
          {DAYS.map((day) => (
            <button
              key={day}
              type="button"
              className={getDayButtonClass(day, selectedDays)}
              onClick={() => onSelectDay(day)}
            >
              {day}
            </button>
          ))}
        </div>
      </section>

      {/* 유형 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 유형</h2>
        <div className="grid grid-cols-3 gap-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              className={getCategoryButtonClass(category, selectedCategory)}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
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
