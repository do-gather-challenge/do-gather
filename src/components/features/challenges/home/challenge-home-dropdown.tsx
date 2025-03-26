import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { IoIosArrowDown } from 'react-icons/io';

type Option = {
  label: string;
  value: string;
};

type ChallengeHomeDropdownProps = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
};

export const ChallengeHomeDropdown = ({ options, value, onChange }: ChallengeHomeDropdownProps) => {
  const selectedLabel = (options.find((opt) => opt.value === value) as Option).label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-10 w-80 sm:w-48 text-lg" asChild>
        <Button className="relative rounded-full focus-visible:ring-0" variant="outline">
          {selectedLabel}
          <IoIosArrowDown className="absolute left-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white">
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {options.map(({ label, value }) => (
            <DropdownMenuRadioItem key={value} value={value} className="data-[state=checked]:bg-primary">
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
