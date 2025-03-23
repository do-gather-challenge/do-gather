'use client';

import Image from 'next/image';
import KAKAO_TALK_IMAGE from '@/../public/images/icon-kakao-talk.png';
import { IoIosLink } from 'react-icons/io';

const ChallengeDetailShareButton = () => {
  return (
    <div className="flex flex-1 items-center justify-end gap-2">
      <button className="h-8 w-8 overflow-hidden rounded-sm">
        <Image src={KAKAO_TALK_IMAGE} alt="카카오톡 이미지" sizes="100vw" />
      </button>
      <button className="bg-gray hover:bg-gray/60 h-8 w-8 overflow-hidden rounded-sm">
        <IoIosLink className="m-auto text-2xl font-semibold" />
      </button>
    </div>
  );
};
export default ChallengeDetailShareButton;
