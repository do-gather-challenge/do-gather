import { Button } from '@/components/ui/button';
import useChallengePostMutation from '@/lib/hooks/use-challenge-post-mutation';
import browserClient from '@/lib/supabase/client';
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

  const { mutate: handleChallengeMutation, isPending } = useChallengePostMutation({
    isEditMode,
    challenge,
    challengeImageFile,
    challengeId
  });

  const handleSubmitChallenge = async () => {
    try {
      await browserClient.auth.refreshSession();
      handleChallengeMutation();
    } catch (error) {
      console.error(error);
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
      <Button variant="secondary" onClick={handleSubmitChallenge} disabled={isPending}>
        {isEditMode ? '챌린지 수정' : '챌린지 생성'}
      </Button>
    </div>
  );
};

export default ChallengePostButtonGroup;
