'use client';

import React, { useRef, useState } from 'react';
import DEFAULT_IMAGE from '/public/images/default_profile.png';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RoundedImage from '../ui/rounded-image';

type MyPageEditProfileProps = {
  setSelectedTab: (tab: 'profile' | 'challenge') => void;
};

const MyPageEditProfile: React.FC<MyPageEditProfileProps> = ({ setSelectedTab }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(DEFAULT_IMAGE.src);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // console.log(file); //test

      // 파일 형식 확인
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(ERROR_MESSAGES.IMAGE_TYPE_INVALID);
        return;
      }
      // 파일 크기 확인
      if (file.size > MAX_SIZE) {
        alert(ERROR_MESSAGES.IMAGE_SIZE_TOO_LARGE);
        return;
      }

      const imageUrl = URL.createObjectURL(file); // 업로드된 파일의 URL 생성
      setPreviewImage(imageUrl);
    }
  };

  const challenges = [
    { label: '오늘의 챌린지', count: COUNT_TODAYS_CHALLENGE },
    { label: '참여 중인 챌린지', count: COUNT_TODAYS_CHALLENGE },
    { label: '완료한 챌린지', count: COUNT_TODAYS_CHALLENGE }
  ];

  return (
    <section className="mt-5 flex w-full flex-col items-center sm:gap-10">
      <form className="flex flex-col items-center gap-3 sm:gap-5">
        <div onClick={handleClick} className="cursor-pointer">
          <RoundedImage
            src={previewImage}
            fallback="Profile"
            alt="Profile"
            className="mt-3 h-52 w-52 rounded-full sm:mt-5"
          />
        </div>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />
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

/** common constants */
const ALLOWED_TYPES = ['image/png', 'image/jpeg'];
const MAX_SIZE = 3 * 1024 * 1024;

/** ERROR_MESSAGES */
const ERROR_MESSAGES = {
  IMAGE_TYPE_INVALID: '허용되지 않는 파일 형식입니다. PNG 또는 JPEG 이미지를 업로드해주세요.',
  IMAGE_SIZE_TOO_LARGE: '이미지 크기는 3MB 이하로 업로드 가능합니다.'
};
