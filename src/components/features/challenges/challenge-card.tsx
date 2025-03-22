import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Tag from '@/components/ui/tag';
import { ChallengeCategoryType } from '@/types/challenge-category.type';
import { LuUserRound } from 'react-icons/lu';
import Image from 'next/image';

type ChallengeCardProps = {
  thumbnail: string;
  category: ChallengeCategoryType;
  participants: number;
  title: string;
  startDate: string;
  endDate: string;
};

const cardImage = {
  WIDTH: 256,
  HEIGHT: 150
};

const ChallengeCard = ({ thumbnail, category, participants, title, startDate, endDate }: ChallengeCardProps) => {
  return (
    <Card className="w-60 gap-4 pt-0 pb-2">
      <Image
        src={thumbnail}
        alt="thumbnail"
        width={cardImage.WIDTH}
        height={cardImage.HEIGHT}
        className="rounded-t-md"
      />
      <div className="flex justify-between pr-8 pl-6">
        <Tag category={category} />
        <div className="flex items-center gap-1">
          <LuUserRound className="inline" />
          {participants}
        </div>
      </div>
      <CardContent className="h-8">
        <CardTitle>{title}</CardTitle>
      </CardContent>
      <CardFooter>
        진행기간 : {startDate} ~ {endDate}
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
