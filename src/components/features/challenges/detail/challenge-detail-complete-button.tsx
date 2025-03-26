'use client';

import { Button } from '@/components/ui/button';
import { fetchCreateChallengeCompleted } from '@/lib/api/challenge-completed.api';
import { useTransition } from 'react';

type ChallengeDetailCompleteButtonProps = {
  challengeId: number;
  isParticipating: boolean;
  isCompleted: boolean;
};
const ChallengeDetailCompleteButton = ({
  challengeId,
  isParticipating,
  isCompleted
}: ChallengeDetailCompleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleCompletedButtonClick = () => {
    if (!isParticipating) return;
    startTransition(() => {
      fetchCreateChallengeCompleted(challengeId);
    });
  };

  if (isCompleted)
    return (
      <Button variant="secondary" className="w-full" disabled>
        오늘의 인증 완료!
      </Button>
    );

  return (
    <Button
      onClick={handleCompletedButtonClick}
      variant="secondary"
      className={`w-full ${!isParticipating && 'group cursor-not-allowed'}`}
      disabled={isPending}
    >
      <span className={`block ${!isParticipating && 'group-hover:hidden active:hidden'}`}>인증하기</span>
      <span className={`hidden ${!isParticipating && 'group-hover:block active:block'}`}>
        챌린지 참여가 필요합니다!
      </span>
    </Button>
  );
};
export default ChallengeDetailCompleteButton;
