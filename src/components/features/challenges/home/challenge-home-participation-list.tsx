import React from 'react';
import Link from 'next/link';
import ChallengeCard from '../challenge-card';
import { Challenge } from '@/types/challenge.type';
import { getGridCols } from '@/lib/utils/classname.util';
import ChallengeCardSkeleton from '../challenge-card-skeleton';
import APP_URL from '@/constants/app-url.constant';

type ParticipationListProps = {
  cardsPerPage: number;
  challenges: Challenge[];
  isPending: boolean;
};

const ChallengeHomeParticipationList = ({ cardsPerPage, challenges, isPending }: ParticipationListProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div className={`grid place-items-center gap-6 ${getGridCols(cardsPerPage)}`}>
        {isPending
          ? Array.from({ length: cardsPerPage }).map((_, i) => <ChallengeCardSkeleton key={i} />)
          : challenges.map((challenge) => (
              <Link key={challenge.id} href={APP_URL.CHALLENGES_ID(challenge.id)}>
                <ChallengeCard
                  thumbnail={challenge.challengeImage}
                  category={challenge.category}
                  participants={challenge.participantCount}
                  title={challenge.title}
                  startDate={challenge.startDate}
                  finishDate={challenge.finishDate}
                />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default ChallengeHomeParticipationList;
