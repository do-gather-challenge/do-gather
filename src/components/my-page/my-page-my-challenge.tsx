'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import DEFAULT_IMAGE from '/public/images/default_profile.png';
import MyPageMyCompletedChallenges from './my-page-my-completed-challenges';
import MyPageMyInProgressChallenges from './my-page-my-in-progress-challenges';
import MyPageMyTodaysCompletedChallenges from './my-page-my-challenges-completions-today';
import { Button } from '@/components/ui/button';
import { getUserInfo } from '@/lib/api/user-Info.api';

import type { MyChallengeAlias, MyPageMyChallenges } from '@/types/my-page-type';

const MyPageMyChallenge = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<MyChallengeAlias>('Today');
  const [isLoading, setIsLoading] = useState(false);
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const challenges: MyPageMyChallenges[] = [
    { label: '오늘 인증한 챌린지', alias: 'Today' },
    { label: '참여 중인 챌린지', alias: '참여중' },
    { label: '완료한 챌린지', alias: '완료' }
  ];
  const challengeComponents = {
    Today: {
      title: '오늘 인증한 챌린지',
      Component: MyPageMyTodaysCompletedChallenges
    },
    참여중: {
      title: '참여 중인 챌린지',
      Component: MyPageMyInProgressChallenges
    },
    완료: {
      title: '완료한 챌린지',
      Component: MyPageMyCompletedChallenges
    }
  };
  const { title, Component } = challengeComponents[selectedChallenge];

  useEffect(() => {
    setIsLoading(true);
    getUserInfo()
      .then((data) => {
        const { nickname, profile_image } = data.userInfo;
        setNickname(nickname);
        setProfileImg(profile_image || '');
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return;

  return (
    <section className="mt-5 ml-5 flex w-full flex-col items-center gap-15 sm:flex-row">
      {/* 프로필 & 버튼 */}
      <aside className="flex w-full flex-col items-center sm:w-[30%]">
        <div className="hidden w-60 flex-col gap-5 rounded-2xl border-1 border-black p-10 text-center sm:block">
          <Image
            src={profileImg || DEFAULT_IMAGE}
            alt="profile"
            width={200}
            height={200}
            className="mt-3 mb-3 rounded-full sm:mt-5"
            priority
          />
          <p className="font-bold">{nickname}</p>
        </div>
        <nav className="flex gap-2 sm:mt-5 sm:flex-col">
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
        </nav>
      </aside>
      {/* 마이 챌린지 */}
      <section className="flex w-full justify-start self-start">
        <div className="flex flex-col gap-5">
          <p className="text-2xl font-bold">{title}</p>
          <Component />
        </div>
      </section>
    </section>
  );
};

export default MyPageMyChallenge;
