import ChallengePostPage from '@/components/features/challenges/post/challenge-post-page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '챌린지 생성 | DOGATHER',
  description: '새로운 챌린지를 생성하는 페이지입니다.',
  openGraph: {
    title: '챌린지 생성 | DOGATHER',
    description: '새로운 챌린지를 생성하는 페이지입니다.',
    images: '/images/logo.png'
  }
};

const page = () => {
  return <ChallengePostPage />;
};

export default page;
