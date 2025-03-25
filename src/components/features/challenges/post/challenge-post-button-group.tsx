import { Button } from '@/components/ui/button';
import { fetchCreateChallenge, fetchUpdateChallenge } from '@/lib/api/challenge-post.api';
import { ChallengePost } from '@/types/challenge.type';
import { useRouter } from 'next/navigation';

type ChallengePostButtonGroupProps = {
  challenge: ChallengePost;
  challengeImageFile: File | null;
  isEditMode?: boolean;
  challengeId?: number;
};

const ChallengePostButtonGroup = ({
  challenge,
  challengeImageFile,
  isEditMode = false,
  challengeId
}: ChallengePostButtonGroupProps) => {
  const router = useRouter();

  const handleSubmitChallenge = async () => {
    let result;
    if (isEditMode) {
      if (challengeId === undefined) {
        alert('challengeId가 없습니다.');
        return;
      }
      result = await fetchUpdateChallenge(challengeId, challenge, challengeImageFile);
    } else {
      result = await fetchCreateChallenge(challenge, challengeImageFile);
    }

    if (result.success) {
      alert(result.message);
      router.push(`/challenges/${challengeId}`);
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
        {isEditMode ? '챌린지 수정' : '챌린지 생성'}
      </Button>
    </div>
  );
};

export default ChallengePostButtonGroup;
