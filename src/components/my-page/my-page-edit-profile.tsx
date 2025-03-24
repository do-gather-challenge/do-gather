import Image from 'next/image';
import React from 'react';
import DEFAULT_IMAGE from '/public/images/default_profile.png';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type MyPageEditProfileProps = {
  setSelectedTab: (tab: 'profile' | 'challenge') => void;
};

const MyPageEditProfile: React.FC<MyPageEditProfileProps> = ({ setSelectedTab }) => {
  const challenges = [
    { label: '오늘의 챌린지', count: COUNT_TODAYS_CHALLENGE },
    { label: '참여 중인 챌린지', count: COUNT_TODAYS_CHALLENGE },
    { label: '완료한 챌린지', count: COUNT_TODAYS_CHALLENGE }
  ];

  return (
    <section className="mt-5 flex w-full flex-col items-center sm:gap-10">
      <form className="flex flex-col items-center gap-3 sm:gap-5">
        <Image
          src={DEFAULT_IMAGE}
          alt="profile"
          width={200}
          height={200}
          className="mt-3 rounded-full sm:mt-5"
          priority
        />
        <div className="mt-3 flex w-60 flex-col gap-1 sm:mt-5 sm:w-80">
          <Label>Nickname</Label>
          <Input placeholder={`현재 닉네임: ${DEFAULT_NICKNAME}`} />
        </div>
        <Button variant="secondary" className="w-60">
          프로필 수정하기
        </Button>
      </form>
      <nav className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-15">
        {challenges.map((challenge, index) => (
          <Link
            key={index}
            href="#"
            onClick={() => setSelectedTab('challenge')}
            className="bg-primary hover:bg-primary-foreground flex w-60 items-center justify-between rounded-md p-5 text-sm transition-all hover:text-black/50 sm:h-12"
          >
            <p>{challenge.label}</p>
            <p className="font-bold">{challenge.count}</p>
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default MyPageEditProfile;

const DEFAULT_NICKNAME = '초기값';
const COUNT_TODAYS_CHALLENGE = 0;
