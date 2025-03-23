'use client';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

type DatePickerModalProps = {
  isOpen: boolean;
  selectedDate: Date | undefined;
  onSelect: (date: Date | undefined) => void;
  onClose: () => void;
  disabled?: (date: Date) => boolean;
};

const ChallengePostDateModal = ({ isOpen, selectedDate, onSelect, onClose, disabled }: DatePickerModalProps) => {
  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 ${isOpen ? 'flex' : 'hidden'}`}>
      <div className="bg-card text-card-foreground rounded-lg p-4 shadow-lg">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onSelect}
          disabled={disabled}
          className="text-center"
        />
        <button
          type="button"
          onClick={onClose}
          className="bg-muted text-muted-foreground hover:bg-muted/80 mt-2 w-full rounded-md p-2"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default ChallengePostDateModal;
