'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import DEFAULT_IMAGE from '/public/images/default_profile.png';
import { Button } from '@/components/ui/button';

type MyChallengeAlias = 'Today' | '참여중' | '완료';
type MyPageMyChallenges = {
  label: string;
  alias: MyChallengeAlias;
};

const MyPageMyChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<MyChallengeAlias>('Today');

  const challenges: MyPageMyChallenges[] = [
    { label: '오늘 인증한 챌린지', alias: 'Today' },
    { label: '참여 중인 챌린지', alias: '참여중' },
    { label: '완료한 챌린지', alias: '완료' }
  ];

  return (
    <section className="mt-5 flex w-full flex-col items-center gap-3 sm:flex-row">
      <div className="flex w-full flex-col items-center sm:w-[30%]">
        <div className="hidden w-60 flex-col gap-5 rounded-2xl border-1 border-black p-10 text-center sm:block">
          <Image
            src={DEFAULT_IMAGE}
            alt="profile"
            width={200}
            height={200}
            className="mt-3 rounded-full sm:mt-5"
            priority
          />
          <p className="font-bold">Nickname</p>
        </div>
        <div className="flex gap-2 sm:mt-5 sm:flex-col">
          {challenges.map((challenge) => (
            <Button
              key={challenge.alias}
              variant="primary"
              className="h-8 w-20 justify-center p-0 sm:h-12 sm:w-60 sm:justify-between sm:p-5"
              onClick={() => setSelectedChallenge(challenge.alias)}
            >
              <p className="sm:hidden">{challenge.alias}</p>
              <p className="hidden sm:block">{challenge.label}</p>
            </Button>
          ))}
        </div>
      </div>
      <div className="grid w-full grid-cols-1 p-5 sm:w-[70%] sm:grid-cols-3">{selectedChallenge}</div>
    </section>
  );
};

export default MyPageMyChallenge;
