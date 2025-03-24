import Image from 'next/image';
import FLASHER from '../../../public/images/icon-deadline.png';
import { isValidDate } from '@/lib/utils/validate-date.util';

type DeadlineBadgeProps = {
  dayLeft: string;
};

const DeadlineBadge = ({ dayLeft }: DeadlineBadgeProps) => {
  return (
    <section className="flex h-full min-w-[110px] items-center justify-center gap-1 rounded-2xl border-2 border-red-500 px-2 py-0.5 text-xs text-red-500">
      <Image src={FLASHER} alt="아이콘" width={16} height={16} />
      {`마감 ${dayLeft}일 전`}
    </section>
  );
};

export default DeadlineBadge;
