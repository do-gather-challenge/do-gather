import ChallengeForm from '@/components/features/challenges/post/challenge-form';
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

const ChallengePostPage = () => {
  return <ChallengeForm mode="create" />;
};

export default ChallengePostPage;
