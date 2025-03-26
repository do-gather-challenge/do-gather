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

type ChallengeCarouselCardProps = {
  data: Challenge[];
};

const ChallengeCarouselCard = ({ data }: ChallengeCarouselCardProps) => {
  return (
    <Carousel plugins={[Autoplay({ delay: 3000 })]} className="w-[calc(100vw-10rem)] max-w-6xl">
      <CarouselContent>
        {data.map((challenge) => {
          const dayLeft = calculateDaysLeft(challenge.startDate);

          return (
            <CarouselItem key={challenge.id}>
              <Link className="block" href={`/challenges/${challenge.id}`}>
                <article className="p-1">
                  <Card className="h-full w-full">
                    <CardContent className="h-full max-h-[25rem] w-full flex-grow overflow-hidden md:max-h-[18rem] md:min-h-[18rem]">
                      <div className="mb-5 flex w-full justify-between">
                        <Tag category={challenge.category} />
                        <StartDateBadge dayLeft={String(dayLeft)} />
                      </div>

                      <div className="flex flex-col gap-6 md:flex-row">
                        <figure className="relative h-48 w-full md:h-60 md:w-1/2">
                          <Image
                            src={challenge.challengeImage || DEFAULT_CHALLENGE_IMAGE}
                            alt={challenge.title}
                            height={300}
                            width={600}
                            className="h-full object-cover"
                          />
                        </figure>

                        <div className="flex w-full flex-col gap-1 text-sm md:mt-0 md:w-1/2">
                          <h1 className="mb-2 text-xl font-semibold">{challenge.title}</h1>
                          <p className="mb-3 line-clamp-1 text-sm md:line-clamp-5">{challenge.description}</p>
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
