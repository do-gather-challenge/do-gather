import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { toLocalDateString } from '@/lib/utils/post.util';

type DateRangePickerProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
};

const ChallengePostDatePicker = ({ startDate, endDate, onStartDateChange, onEndDateChange }: DateRangePickerProps) => {
  return (
    <div className="flex items-center gap-2">
      {/* 시작 날짜 선택 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[130px] justify-start text-left font-normal" asChild>
            <div>
              <CalendarIcon className="h-4 w-4" />
              {startDate ? format(startDate, 'yyyy-MM-dd') : '시작 날짜 선택'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(date) => {
              if (date) {
                const localDateString = toLocalDateString(date);
                onStartDateChange(new Date(localDateString));
                if (endDate && date > endDate) {
                  onEndDateChange(undefined);
                }
              }
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <span className="text-sm">~</span>

      {/* 종료 날짜 선택 */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-[130px] justify-start text-left font-normal"
            disabled={!startDate}
            asChild
          >
            <div>
              <CalendarIcon className="h-4 w-4" />
              {endDate ? format(endDate, 'yyyy-MM-dd') : '종료 날짜 선택'}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(date) => {
              if (date) {
                const localDateString = toLocalDateString(date);
                onEndDateChange(new Date(localDateString));
              }
            }}
            disabled={(date) => date < (startDate || new Date())}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ChallengePostDatePicker;
