import ChallengeCard from '@/components/features/challenges/challenge-card';
import RoundedImage from '@/components/ui/rounded-image';
import Tag from '@/components/ui/tag';
import React from 'react';

const HomePage = () => {
  return (
    <>
      {/* <PoplularChallengeList />
      <MyChallengeList />
      <ChallengeList /> */}
      <div className="h-40">a</div>
      <ChallengeCard
        thumbnail="/React.png"
        category="EXERCISE"
        participants={10}
        title="1일 1토마토 1일 1토마토 1일 1토마토 1일 1토마토"
        startDate="25.3.22"
        endDate="25.4.22"
      />
      <div className="m-2 mb-10 flex gap-2">
        <Tag category="EXERCISE" />
        <Tag category="ART" />
        <Tag category="CONSUME" />
        <Tag category="STUDY" />
        <Tag category="ETC" />
      </div>
      <RoundedImage classname='w-96 h-96 bg-amber-500' src="/React.png"/>
      <RoundedImage classname='w-96 h-96 bg-amber-500 text-4xl' src="/invalid-image.png"/>
      <RoundedImage classname='w-96 h-96 bg-blue-400 text-4xl' src="/invalid-image.png" fallback='invalid image'/>
    </>
  );
};

export default HomePage;
