import React from 'react';
import { ChallengeLogStatus, ChallengeLogWithUser } from '@/types/challenge-log.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ChallengeDetailLogContentProps = Pick<ChallengeLogWithUser, 'status' | 'user'>;

const ChallengeDetailLogContent = React.forwardRef<HTMLLIElement, ChallengeDetailLogContentProps>(
  ({ status, user }, ref) => {
    return (
      <li ref={ref}>
        <p className="flex items-center gap-2">
          <Avatar className="border-gray flex items-center justify-center border-2 text-sm">
            <AvatarImage src={user.profileImage || ''} alt={`${user.nickname} 프로필 이미지`} />
            <AvatarFallback>{user.nickname.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{user.nickname}</span>
        </p>
        <p className="ml-2 break-keep text-gray-600">
          {user.nickname}님이 {StatusMessage[status]}
        </p>
      </li>
    );
  }
);
ChallengeDetailLogContent.displayName = 'ChallengeDetailLogContent';
export default ChallengeDetailLogContent;

const StatusMessage: Record<ChallengeLogStatus, string> = {
  ENTER: '챌린지에 들어왔습니다.',
  EXIT: '챌린지에 나갔습니다.',
  DONE: '챌린지를 수행 완료했습니다.'
} as const;
