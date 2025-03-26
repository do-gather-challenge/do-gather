import ChallengePostForm from '@/components/features/challenges/post/challenge-post-form';
import { fetchGetChallengeById } from '@/lib/api/challenge.api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  const challenge = await fetchGetChallengeById(Number(params.id));
  if (!challenge) {
    return {
      title: '챌린지 수정 | DOGATHER',
      description: '챌린지 정보를 수정하는 페이지입니다.',
      openGraph: {
        title: '챌린지 수정 | DOGATHER',
        description: '챌린지 정보를 수정하는 페이지입니다.',
        images: '/images/logo.png'
      }
    };
  }
  return {
    title: `${challenge.title} - 챌린지 수정 | DOGATHER`,
    description: `${challenge.title} 챌린지 정보를 수정하는 페이지입니다.`,
    openGraph: {
      title: `${challenge.title} - 챌린지 수정 | DOGATHER`,
      description: `${challenge.title} 챌린지 정보를 수정하는 페이지입니다.`,
      images: challenge?.challengeImage || '/images/logo.png'
    }
  };
}

const ChallengeEditPage = async ({ params }: { params: { id: string } }) => {
  const challenge = await fetchGetChallengeById(Number(params.id));
  if (!challenge) return notFound();
  // const { user } = await getSession();
  // console.log('유저:',user?.id); // 디버깅용으로 배포직전 삭제할게요
  return challenge ? <ChallengePostForm mode="edit" initialData={challenge} /> : <div>챌린지를 찾을 수 없습니다</div>;
};

export default ChallengeEditPage;
