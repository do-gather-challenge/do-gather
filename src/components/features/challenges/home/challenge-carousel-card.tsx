'use client';

import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/components/ui/tag';
import { Card, CardContent } from '@/components/ui/card';
import StartDateBadge from '@/components/ui/start-date-badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { calculateDaysLeft } from '@/lib/utils/calculate-days-left.util';
import ChallengeDetailInfoField from '../detail/challenge-detail-info-field';
import DEFAULT_CHALLENGE_IMAGE from '@/../public/images/default-challenge.jpg';
import Autoplay from 'embla-carousel-autoplay';
import { Challenge } from '@/types/challenge.type';
import URL from '@/constants/app-url.constant';

type ChallengeCarouselCardProps = {
  data: Challenge[];
};

const ChallengeCarouselCard = ({ data }: ChallengeCarouselCardProps) => {
  return (
    // Autoplay를 서버 컴포넌트에서 실행했더니, 에러 발생해서 'use client'로 변경했습니다
    <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-[calc(100vw-10rem)] max-w-6xl">
      <CarouselContent>
        {data.map((challenge) => {
          const dayLeft = calculateDaysLeft(challenge.startDate);

          return (
            <CarouselItem key={challenge.id}>
              <Link className="block" href={URL.CHALLENGES_ID(challenge.id)}>
                <article className="p-1">
                  <Card className="h-full w-full">
                    <CardContent className="h-full max-h-[25rem] w-full overflow-y-auto md:max-h-[18rem] md:min-h-[18rem]">
                      <div className="mb-5 flex w-full justify-between">
                        <Tag category={challenge.category} />
                        <StartDateBadge dayLeft={String(dayLeft)} />
                      </div>

                      <div className="flex flex-col gap-6 md:flex-row">
                        <figure className="relative h-48 w-full md:h-60 md:w-1/2">
                          <Image
                            src={challenge.challengeImage || DEFAULT_CHALLENGE_IMAGE}
                            alt={challenge.title}
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            fill
                            className="h-full object-cover"
                          />
                        </figure>

                        <div className="flex w-full flex-col gap-1 text-sm md:mt-0 md:w-1/2">
                          <h1 className="mb-2 text-xl font-semibold">{challenge.title}</h1>
                          <p className="mb-3 text-sm whitespace-pre-line">{challenge.description}</p>
                          <ChallengeDetailInfoField type="진행 기간">
                            <span className="whitespace-nowrap">{challenge.startDate}</span> ~{' '}
                            <span className="whitespace-nowrap">{challenge.finishDate}</span>
                          </ChallengeDetailInfoField>
                          <ChallengeDetailInfoField type="참여 인원">
                            <span className="text-lg">
                              <strong>{challenge.participantCount}</strong>
                            </span>{' '}
                            명
                          </ChallengeDetailInfoField>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </article>
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default ChallengeCarouselCard;
