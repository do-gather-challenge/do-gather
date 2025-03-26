import { useMutation } from '@tanstack/react-query';
import { ChallengePost } from '@/types/challenge.type';
import { fetchCreateChallenge, fetchUpdateChallenge } from '../api/challenge-post.api';
import { useRouter } from 'next/navigation';

interface UseChallengePostMutationParams {
  isEditMode: boolean;
  challenge: ChallengePost;
  challengeImageFile: File | null;
  challengeId?: number;
}

const useChallengePostMutation = ({
  isEditMode,
  challenge,
  challengeImageFile,
  challengeId
}: UseChallengePostMutationParams) => {
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (isEditMode) {
        if (challengeId === undefined) throw new Error('챌린지 ID가 없습니다.');
        return fetchUpdateChallenge(challengeId, challenge, challengeImageFile);
      } else {
        return fetchCreateChallenge(challenge, challengeImageFile);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        alert(data.message);
        router.push(isEditMode ? `/challenges/${challengeId}` : '/home');
      } else {
        alert(`${data.message}`);
      }
    },
    onError: (error) => {
      alert(`${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }
  });

  return { mutate, isPending }; // mutate로 반환
};

export default useChallengePostMutation;
