import ChallengePostForm from '@/components/features/challenges/post/challenge-post-form';
import { fetchRequiredData } from '@/lib/api/challenge-post.api';
import { fetchGetChallengeById } from '@/lib/api/challenge.api';
import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

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
  const { challenge, userId } = await fetchRequiredData(Number(params.id));

  if (!challenge) return notFound();
  if (challenge?.creatorId !== userId) {
    redirect('/home?error=no_permission');
  }

  return <ChallengePostForm mode="edit" initialData={challenge} />;
};

export default ChallengeEditPage;
