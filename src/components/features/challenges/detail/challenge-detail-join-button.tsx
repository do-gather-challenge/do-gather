'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { fetchCreateParticipant, fetchDeleteParticipant } from '@/lib/api/participant.api';
import browserClient from '@/lib/supabase/client';

type ChallengeDetailJoinButtonProps = {
  challengeId: number;
  isParticipating: boolean;
};
const ChallengeDetailJoinButton = ({ challengeId, isParticipating }: ChallengeDetailJoinButtonProps) => {
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    browserClient.auth.getUser().then(({ data }) => setUserId(data.user?.id || ''));
  }, []);

  const handleJoinButtonClick = () => {
    if (!userId) return;
    fetchCreateParticipant(challengeId);
  };

  const handleQuitButtonClick = () => {
    if (!userId) return;
    fetchDeleteParticipant(challengeId, userId);
  };

  if (!isParticipating)
    return (
      <Button
        onClick={handleJoinButtonClick}
        variant="secondary"
        className={`w-full ${!userId && 'group cursor-not-allowed'}`}
      >
        <span className={`block ${!userId && 'group-hover:hidden'}`}>참여하기</span>
        <span className={`hidden ${!userId && 'group-hover:block'}`}>로그인이 필요합니다!</span>
      </Button>
    );

  return (
    <Button onClick={handleQuitButtonClick} variant="destructive" className="w-full">
      포기하기
    </Button>
  );
};

export default ChallengeDetailJoinButton;
