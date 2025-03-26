import { User, UserInfo } from '@/types/user-info.types';

export type ChallengeLog = {
  id: string;
  userId: string;
  challengeId: number;
  status: ChallengeLogStatus;
  createdAt: string;
  date: string;
};

export type ChallengeLogWithUser = ChallengeLog & {
  user: User;
};

export type ChallengeLogSnakeCase = {
  id: string;
  user_id: string;
  challenge_id: number;
  created_at: string;
  status: ChallengeLogStatus;
};

export type ChallengeLogWithUserSnakeCase = ChallengeLogSnakeCase & {
  users: UserInfo;
};

export type ChallengeLogStatus = 'ENTER' | 'EXIT' | 'DONE';
