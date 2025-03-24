import { Button } from '@/components/ui/button';
import { fetchCreatePost } from '@/lib/api/challenge-post.api';

import { ChallengePost } from '@/types/challenge.type';
import { useRouter } from 'next/navigation';

type ChallengePostButtonGroupProps = {
  challenge: ChallengePost;
  challengeImageFile: File | null;
};

const ChallengePostButtonGroup = ({ challenge, challengeImageFile }: ChallengePostButtonGroupProps) => {
  const router = useRouter();

  const handleSubmitChallenge = async () => {
    const result = await fetchCreatePost(challenge, challengeImageFile);
    if (result.success) {
      alert(result.message);
      // console.log('챌린지 생성 데이터:', challenge);
    } else {
      alert(result.message);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/home');
    }
  };
  return (
    <div className="flex justify-center gap-6">
      <Button variant="secondary" onClick={handleGoBack}>
        뒤로가기
      </Button>
      <Button variant="secondary" onClick={handleSubmitChallenge}>
        챌린지생성
      </Button>
    </div>
  );
};

export default ChallengePostButtonGroup;
