import { Card, CardContent, CardTitle } from '@/components/ui/card';
import Tag from '@/components/ui/tag';
import { ChallengeCategoryType } from '@/types/challenge-category.type';
import DEFAULT_CHALLENGE_IMAGE from '@/../public/images/default-challenge.jpg';
import { LuUserRound } from 'react-icons/lu';
import Image from 'next/image';

type ChallengeCardProps = {
  thumbnail: string;
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
          sizes="240px"
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
        <span className="absolute bottom-4 text-sm">
          진행기간 : {startDate} ~ {finishDate}
        </span>
      </CardContent>
    </Card>
  );
};

export default ChallengeCard;
