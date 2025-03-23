import { useState } from 'react';
import { format } from 'date-fns';
import ChallengePostDateModal from './challenge-post-date-modal';

type DateRangePickerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
};

const ChallengePostDatePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }: DateRangePickerProps) => {
  const [isStartDatePickerOpen, setIsStartDatePickerOpen] = useState(false);
  const [isEndDatePickerOpen, setIsEndDatePickerOpen] = useState(false);

  return (
    <div className="flex gap-1">
      {/* 시작 날짜 선택 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsStartDatePickerOpen(true)}
          className="border-border flex h-[24px] w-[124px] items-center justify-center rounded-md border p-1 hover:cursor-pointer"
        >
          {startDate ? format(startDate, 'yyyy-MM-dd') : '시작 날짜 선택'}
        </button>
        <ChallengePostDateModal
          isOpen={isStartDatePickerOpen}
          selectedDate={startDate}
          onSelect={(date) => {
            onStartDateChange(date);
            setIsStartDatePickerOpen(false);
          }}
          onClose={() => setIsStartDatePickerOpen(false)}
        />
      </div>

      <span>~</span>

      {/* 종료 날짜 선택 */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsEndDatePickerOpen(true)}
          className="border-border flex h-[24px] w-[124px] items-center justify-center rounded-md border p-1 hover:cursor-pointer"
        >
          {endDate ? format(endDate, 'yyyy-MM-dd') : '종료 날짜 선택'}
        </button>
        <ChallengePostDateModal
          isOpen={isEndDatePickerOpen}
          selectedDate={endDate}
          onSelect={(date) => {
            onEndDateChange(date);
            setIsEndDatePickerOpen(false);
          }}
          onClose={() => setIsEndDatePickerOpen(false)}
          disabled={(date) => date < (startDate || new Date())}
        />
      </div>
    </div>
  );
};

export default ChallengePostDatePicker;
