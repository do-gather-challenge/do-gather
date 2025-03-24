export const ChallengeStatus = {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
} as const;

export type ChallengeStatusType = keyof typeof ChallengeStatus;
