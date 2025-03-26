'use client';

import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { fetchCreateParticipant, fetchDeleteParticipant } from '@/lib/api/challenge-participant.api';
import browserClient from '@/lib/supabase/client';

type ChallengeDetailJoinButtonProps = {
  challengeId: number;
  isParticipating: boolean;
};
const ChallengeDetailJoinButton = ({ challengeId, isParticipating }: ChallengeDetailJoinButtonProps) => {
  const [userId, setUserId] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    browserClient.auth.getUser().then(({ data }) => setUserId(data.user?.id || ''));
  }, []);

  const handleJoinButtonClick = () => {
    if (!userId) return;
    startTransition(() => {
      fetchCreateParticipant(challengeId);
    });
  };

  const handleQuitButtonClick = () => {
    if (!userId) return;
    startTransition(() => {
      fetchDeleteParticipant(challengeId);
    });
  };

  if (!isParticipating)
    return (
      <Button
        onClick={handleJoinButtonClick}
        variant="secondary"
        className={`active:bg-secondary-foreground w-full ${!userId && 'group cursor-not-allowed'}`}
        disabled={isPending}
      >
        <span className={`block ${!userId && 'group-hover:hidden group-active:hidden'}`}>참여하기</span>
        <span className={`hidden ${!userId && 'group-hover:block group-active:block'}`}>로그인이 필요합니다!</span>
      </Button>
    );

  return (
    <Button onClick={handleQuitButtonClick} variant="destructive" className="w-full" disabled={isPending}>
      포기하기
    </Button>
  );
};

export default ChallengeDetailJoinButton;
