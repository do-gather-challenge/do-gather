import ChallengePostForm from '@/components/features/challenges/post/challenge-post-form';
import { fetchGetChallengeById } from '@/lib/api/challenge.api';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: number } }): Promise<Metadata> {
  const challenge = await fetchGetChallengeById(Number(params.id));

  return {
    title: challenge ? `${challenge.title} - 챌린지 수정 |DOGATHER` : '챌린지 수정 | DOGATHER',
    description: challenge
      ? `${challenge.title} 챌린지 정보를 수정하는 페이지입니다.`
      : '챌린지 정보를 수정하는 페이지입니다.',
    openGraph: {
      title: challenge ? `${challenge.title} - 챌린지 수정 | DOGATHER` : '챌린지 수정 | DOGATHER',
      description: challenge
        ? `${challenge.title} 챌린지 정보를 수정하는 페이지입니다.`
        : '챌린지 정보를 수정하는 페이지입니다.',
      images: challenge?.challengeImage || '/images/logo.png'
    }
  };
}

const ChallengeEditPage = async ({ params }: { params: { id: string } }) => {
  const challenge = await fetchGetChallengeById(Number(params.id));
  return challenge ? <ChallengePostForm mode="edit" initialData={challenge} /> : <div>챌린지를 찾을 수 없습니다</div>;
};

export default ChallengeEditPage;
