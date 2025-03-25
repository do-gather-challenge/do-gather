'use client';

import Image from 'next/image';
import KAKAO_TALK_IMAGE from '@/../public/images/icon-kakao-talk.png';
import { IoIosLink } from 'react-icons/io';
import { KAKAO_API_KEY } from '@/constants/env.constant';

type ChallengeDetailShareButtonProps = {
  title: string;
  description: string;
  challengeImage: string;
};
const ChallengeDetailShareButton = ({ title, description, challengeImage }: ChallengeDetailShareButtonProps) => {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleKakaoShareClick = () => {
    const { Kakao } = window;
    if (!Kakao.isInitialized()) Kakao.init(KAKAO_API_KEY);

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `[습관 형성 챌린지] ${title}`,
        description: description,
        imageUrl: challengeImage || defaultKakaoFeedImage,
        link: {
          mobileWebUrl: shareUrl
        }
      },
      buttons: [
        {
          title: '참여하러 가기',
          link: {
            mobileWebUrl: shareUrl
          }
        }
      ]
    });
  };

  const handleCopyLinkClick = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // TODO: toastify로 변경하기
      alert('링크 복사 완료!');
    } catch {
      // TODO: toastify로 변경하기
      alert('링크 복사 실패..');
    }
  };

  return (
    <div className="flex flex-1 items-center justify-end gap-2">
      <button onClick={handleKakaoShareClick} className="h-8 w-8 overflow-hidden rounded-sm">
        <Image src={KAKAO_TALK_IMAGE} alt="카카오톡 이미지" />
      </button>
      <button onClick={handleCopyLinkClick} className="bg-gray hover:bg-gray/60 h-8 w-8 overflow-hidden rounded-sm">
        <IoIosLink className="m-auto text-2xl font-semibold" />
      </button>
    </div>
  );
};
export default ChallengeDetailShareButton;

// TODO: 배포된 사이트로 수정하기
const defaultKakaoFeedImage =
  'https://github.com/do-gather-challenge/do-gather/blob/develop/public/images/logo.png?raw=true';
