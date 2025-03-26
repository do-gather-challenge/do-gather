export const ChallengeSort = {
  POPULAR: 'POPULAR',
  RECENT: 'RECENT'
} as const;

export type ChallengeSortType = keyof typeof ChallengeSort;
