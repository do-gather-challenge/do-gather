'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import browserClient from '@/lib/supabase/client';
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
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    browserClient.auth.getUser().then(({ data }) => setUserId(data.user?.id || ''));
  }, []);

  const handleCompletedButtonClick = () => {
    if (!isParticipating) return;
    fetchCreateChallengeCompleted(challengeId).catch((e) => console.log(e));
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
