import ChallengeCard from '@/components/features/challenges/challenge-card';
import Tag from '@/components/ui/tag';
import React from 'react';

const HomePage = () => {
  return (
    <>
      {/* <PoplularChallengeList />
      <MyChallengeList />
      <ChallengeList /> */}
      <div className='h-40'>a</div>
      <ChallengeCard
        thumbnail="/React.png"
        category="EXERCISE"
        participants={10}
        title="1일 1토마토 1일 1토마토 1일 1토마토 1일 1토마토"
        startDate="25.3.22"
        endDate="25.4.22"
      />
      <div className='flex gap-2 mt-2'>

      <Tag category="EXERCISE"/>
      <Tag category="ART"/>
      <Tag category="CONSUME"/>
      <Tag category="STUDY"/>
      <Tag category="ETC"/>
      </div>
    </>
  );
};

export default HomePage;
