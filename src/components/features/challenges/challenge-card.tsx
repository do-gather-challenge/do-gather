import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Tag from '@/components/ui/tag';
import { ChallengeCategoryType } from '@/types/challenge-category.type';
import DEFAULT_CHALLENGE_IMAGE from '@/../public/images/default-challenge.jpg';
import { LuUserRound } from 'react-icons/lu';
import Image from 'next/image';
import { transformDate } from '@/lib/utils/transform.util';

type ChallengeCardProps = {
  thumbnail: string | null;
  category: ChallengeCategoryType;
  participants: number;
  title: string;
  startDate: string;
  finishDate: string;
};

const ChallengeCard = ({ thumbnail, category, participants, title, startDate, finishDate }: ChallengeCardProps) => {
  return (
    <Card className="h-64 w-60 gap-4 pt-0 pb-2">
      <figure className="relative aspect-video w-full">
        <Image
          src={thumbnail || DEFAULT_CHALLENGE_IMAGE}
          alt="thumbnail"
          className="h-full w-full rounded-t-md object-cover object-center"
          fill
        />
      </figure>
      <CardContent className="relative space-y-2">
        <div className="flex justify-between">
          <Tag category={category} />
          <div className="flex items-center gap-1">
            <LuUserRound className="inline" />
            {participants}
          </div>
        </div>
        <CardTitle>{title}</CardTitle>
        <span className="absolute top-18 text-sm">
          진행기간 : {transformDate(startDate)} ~ {transformDate(finishDate)}
        </span>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
