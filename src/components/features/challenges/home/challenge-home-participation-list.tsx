import React from 'react';
import ChallengeCard from '../challenge-card';
import { transformDate } from '@/lib/utils/transform.util';
import { Challenge } from '@/types/challenge.type';

type ParticipationListProps = {
  cardsPerPage: number;
  challenges: Challenge[];
  isLoading: boolean;
  isFetching: boolean;
};

const ChallengeHomeParticipationList = ({
  cardsPerPage,
  challenges,
  isLoading,
  isFetching
}: ParticipationListProps) => {
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`grid place-items-center gap-6 transition-all duration-500 ease-in-out ${
          cardsPerPage === 1
            ? 'grid-cols-1'
            : cardsPerPage === 2
              ? 'grid-cols-2'
              : cardsPerPage === 3
                ? 'grid-cols-3'
                : 'grid-cols-4'
        }`}
      >
        {isLoading || isFetching
          ? Array.from({ length: cardsPerPage }).map((_, i) => (
              <div key={i} className="bg-muted h-[240px] w-[240px] animate-pulse rounded-lg" />
            ))
          : challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                thumbnail="/React.png"
                category={challenge.category}
                participants={challenge.participantCount}
                title={challenge.title}
                startDate={transformDate(challenge.startDate)}
                finishDate={transformDate(challenge.finishDate)}
              />
            ))}
      </div>
    </div>
  );
};

export default ChallengeHomeParticipationList;
