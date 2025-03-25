'use client';

import { Button } from '@/components/ui/button';
import { fetchCreateChallengeCompleted } from '@/lib/api/completed.api';

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
  const handleCompletedButtonClick = () => {
    if (!isParticipating) return;
    fetchCreateChallengeCompleted(challengeId);
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
    >
      <span className={`block ${!isParticipating && 'group-hover:hidden'}`}>인증하기</span>
      <span className={`hidden ${!isParticipating && 'group-hover:block'}`}>챌린지 참여가 필요합니다!</span>
    </Button>
  );
};
export default ChallengeDetailCompleteButton;
