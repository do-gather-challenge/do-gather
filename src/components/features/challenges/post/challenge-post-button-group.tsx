import { Button } from '@/components/ui/button';
import { fetchCreateChallenge, fetchUpdateChallenge } from '@/lib/api/challenge-post.api';
import { ChallengePost } from '@/types/challenge.type';
import { useMutation } from '@tanstack/react-query';
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

  // 챌린지 생성
  const { mutate: createChallenge, isPending: createPending } = useMutation({
    mutationFn: () => fetchCreateChallenge(challenge, challengeImageFile),
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        router.push('/home');
      } else {
        alert(`${data.message}`);
      }
    },
    onError: (error) => {
      alert(`${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  });

  // 챌린지 수정
  const { mutate: updateChallenge, isPending: updatePending } = useMutation({
    mutationFn: () => {
      if (challengeId === undefined) throw new Error('challengeId가 없습니다.');
      return fetchUpdateChallenge(challengeId, challenge, challengeImageFile);
    },
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        router.push(`/challenges/${challengeId}`);
      } else {
        alert(` ${data.message}`);
      }
    },
    onError: (error) => {
      alert(`${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  });

  const isPending = createPending || updatePending;

  const handleSubmitChallenge = () => {
    if (isEditMode) {
      updateChallenge();
    } else {
      createChallenge();
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
      <Button variant="secondary" onClick={handleGoBack} disabled={isPending}>
        뒤로가기
      </Button>
      <Button variant="secondary" onClick={handleSubmitChallenge} disabled={isPending}>
        {isEditMode ? '챌린지 수정' : '챌린지 생성'}
      </Button>
    </div>
  );
};

export default ChallengePostButtonGroup;
