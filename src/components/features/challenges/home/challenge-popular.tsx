import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

import { fetchGetChallengesByPage } from '@/lib/api/challenge.api';
import { Challenge } from '@/types/challenge.type';
import { Pagination } from '@/types/common.type';
import Image from 'next/image';
import Tag from '@/components/ui/tag';
import Link from 'next/link';
import DeadlineBadge from '@/components/ui/deadline-badge';
import ChallengeDetailInfoField from '../detail/challenge-detail-info-field';
import { isValidDate } from '@/lib/utils/validate-date.util';

const ChallengePopular = async () => {
  // [전체 인기 챌린지] _ default: 인기순 정렬
  const { data: popularChallenges }: Pagination<Challenge[]> = await fetchGetChallengesByPage();

  // [유효한 챌린지 필터링]
  const validChallenges = popularChallenges.filter((challenge) => {
    const { isValid } = isValidDate(challenge.startDate);
    return isValid;
  });

  // [상위 4개 데이터만 가져오기]
  const top4Challenges = validChallenges.slice(0, 4);

  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-3 flex items-center justify-center text-xl font-bold">🔥인기 챌린지</h1>

      <Carousel className="relative mx-auto w-full max-w-xs sm:max-w-xs md:max-w-2xl lg:max-w-4xl">
        <CarouselContent>
          {top4Challenges.map((challenge) => {
            const { dayLeft } = isValidDate(challenge.startDate);

            return (
              <CarouselItem key={challenge.title}>
                <Link className="block" href={`/challenges/${challenge.id}`}>
                  <article className="p-1">
                    <Card className="h-full w-full">
                      <CardContent className="h-full w-full">
                        <div className="mb-5 flex w-full justify-between">
                          <Tag category={challenge.category} />
                          <DeadlineBadge dayLeft={String(dayLeft)} />
                        </div>

                        <div className="flex flex-col gap-6 md:flex-row">
                          <figure className="relative h-48 w-full md:h-60 md:w-1/2">
                            <Image
                              src={challenge.challengeImage}
                              alt={challenge.title}
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              fill
                              className="h-full object-cover"
                            />
                          </figure>

                          <div className="flex w-full flex-col gap-1 text-sm md:mt-0 md:w-1/2">
                            <h1 className="mb-2 text-xl font-semibold">{challenge.title}</h1>
                            <p className="text-sm text-gray-700">{challenge.description}</p>
                            <ChallengeDetailInfoField type="진행 기간">
                              <span className="whitespace-nowrap">{challenge.startDate}</span> ~{' '}
                              <span className="whitespace-nowrap">{challenge.finishDate}</span>
                            </ChallengeDetailInfoField>
                            <ChallengeDetailInfoField type="참여 인원">
                              <span className="text-lg font-semibold">{challenge.participantCount}</span> 명
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
    </section>
  );
};
export default ChallengePopular;
