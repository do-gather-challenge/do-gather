export const ChallengeStatus = {
  UPCOMING: 'UPCOMING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED'
};

export type ChallengeStatusType = keyof typeof ChallengeStatus;
