import { useMutation } from '@tanstack/react-query';
import { ChallengePost } from '@/types/challenge.type';
import { fetchCreateChallenge, fetchUpdateChallenge } from '../api/challenge-post.api';

type UseChallengePostMutationParams = {
  isEditMode: boolean;
  challenge: ChallengePost;
  challengeImageFile: File | null;
  challengeId?: number;
};

type ChallengeMutationResponse = {
  success: boolean;
  message: string;
};

const useChallengePostMutation = ({
  isEditMode,
  challenge,
  challengeImageFile,
  challengeId
}: UseChallengePostMutationParams) => {
  return useMutation<ChallengeMutationResponse, Error>({
    mutationFn: async () => {
      if (isEditMode) {
        if (challengeId === undefined) throw new Error('챌린지 ID가 없습니다.');
        return fetchUpdateChallenge(challengeId, challenge, challengeImageFile);
      }
      return fetchCreateChallenge(challenge, challengeImageFile);
    }
  });
};

export default useChallengePostMutation;
