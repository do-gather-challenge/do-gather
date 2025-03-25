import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Tag from '@/components/ui/tag';
import { ChallengeCategoryType } from '@/types/challenge-category.type';
import { LuUserRound } from 'react-icons/lu';
import Image from 'next/image';

type ChallengeCardProps = {
  thumbnail: string | null;
  category: ChallengeCategoryType;
  participants: number;
  title: string;
  startDate: string;
  endDate: string;
};

const ChallengeCard = ({ thumbnail, category, participants, title, startDate, endDate }: ChallengeCardProps) => {
  return (
    <Card className="w-60 gap-4 pt-0 pb-2">
      <figure className="relative aspect-video w-full">
        <Image
          src={thumbnail || '/React.png'}
          alt="thumbnail"
          className="h-full w-full rounded-t-md object-cover object-center"
          fill
        />
      </figure>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <Tag category={category} />
          <div className="flex items-center gap-1">
            <LuUserRound className="inline" />
            {participants}
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
        <span className="text-sm">
          진행기간 : {startDate} ~ {endDate}
        </span>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
