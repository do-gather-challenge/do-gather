import { Button } from '@/components/ui/button';
import APP_URL from '@/constants/app-url.constant';
import URL from '@/constants/app-url.constant';
import useChallengePostMutation from '@/lib/hooks/use-challenge-post-mutation';
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
  const { mutateAsync, isPending } = useChallengePostMutation({
    isEditMode,
    challenge,
    challengeImageFile,
    challengeId
  });

  const handleSubmitChallenge = async () => {
    try {
      const result = await mutateAsync();
      if (result.success) {
        alert(isEditMode ? '챌린지 수정 완료!' : '챌린지 생성 완료!');
        router.push(isEditMode ? APP_URL.CHALLENGES_ID(challengeId!) : APP_URL.HOME);
      } else {
        alert(`오류: ${result.message}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : '알 수 없는 오류';
      alert(`오류 발생: ${message}`);
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(URL.HOME);
    }
  };

  return (
    <div className="mb-6 flex justify-center gap-6">
      <Button variant="secondary" onClick={handleGoBack}>
        뒤로가기
      </Button>
      <Button variant="secondary" onClick={handleSubmitChallenge} disabled={isPending}>
        {isEditMode ? '챌린지 수정' : '챌린지 생성'}
      </Button>
    </div>
  );
};

export default ChallengePostButtonGroup;
