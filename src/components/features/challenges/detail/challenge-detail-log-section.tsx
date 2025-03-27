'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import browserClient from '@/lib/supabase/client';
import { fetchGetAllChallengeLogs } from '@/lib/api/challenge-logs.api';
import { ChallengeLogSnakeCase, ChallengeLogWithUser } from '@/types/challenge-log.type';
import { fetchUserInfoById } from '@/lib/api/user-Info.api';
import { transformChallengeLogData } from '@/lib/utils/transform.util';
import LOADING_SPINNER from '@/../public/images/loading-spinner.svg';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ChallengeDetailLogContent from '@/components/features/challenges/detail/challenge-detail-log-content';

type ChallengeDetailLogSectionProps = {
  challengeId: number;
};
const ChallengeDetailLogSection = ({ challengeId }: ChallengeDetailLogSectionProps) => {
  const [logs, setLogs] = useState<ChallengeLogWithUser[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [newFlag, setNewFlag] = useState(false);
  const logListRef = useRef<HTMLOListElement>(null);

  const scrollToBottom = useCallback(() => {
    setNewFlag(false);
    if (logListRef.current) {
      logListRef.current.scrollTo({
        top: logListRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    fetchGetAllChallengeLogs(challengeId).then((logData) => {
      setLogs(logData);
      setIsPending(false);
    });
    const supabase = browserClient;
    const channel = supabase
      .channel('log_changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'logs', filter: `challenge_id=eq.${challengeId}` },
        async (payload) => {
          const newRecord = payload.new as ChallengeLogSnakeCase;
          const user = await fetchUserInfoById(newRecord.user_id);
          const log = transformChallengeLogData(newRecord);
          if (!!user) setLogs((prev) => [...prev, { ...log, user }]);
          if (!!user) setNewFlag(true);
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [challengeId]);

  useEffect(() => {
    if (logListRef.current) logListRef.current.scrollTop = logListRef.current.scrollHeight;
  }, [isPending]);

  return (
    <section className="border-secondary relative aspect-video flex-1 overflow-hidden rounded border">
      {isPending ? (
        <p className="flex h-full items-center justify-center">
          <Image src={LOADING_SPINNER} alt="로딩 스피너 이미지" height={100} width={100} />
        </p>
      ) : (
        <ol ref={logListRef} className="h-full space-y-3 overflow-scroll p-3">
          {logs.map((log) => (
            <ChallengeDetailLogContent key={log.id} {...log} />
          ))}
        </ol>
      )}
      {newFlag && (
        <Button onClick={scrollToBottom} className="absolute right-2 bottom-2 animate-bounce">
          new
        </Button>
      )}
    </section>
  );
};

export default ChallengeDetailLogSection;
