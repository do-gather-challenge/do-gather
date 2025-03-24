import Image from 'next/image';
import FLASHER from '../../../public/images/icon-deadline.png';

type StartDateBadgeProps = {
  dayLeft: string;
};

const StartDateBadge = ({ dayLeft }: StartDateBadgeProps) => {
  return (
    <section className="flex h-full items-center justify-center gap-1 rounded-2xl border-2 border-red-500 px-2 py-0.5 text-xs text-red-500">
      <Image src={FLASHER} alt="아이콘" width={16} height={16} />
      시작 {dayLeft}일 전
    </section>
  );
};

export default StartDateBadge;
