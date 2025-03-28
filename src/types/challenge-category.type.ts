export const ChallengeCategory = {
  EXERCISE: '운동',
  CONSUME: '소비',
  STUDY: '학습',
  ART: '예술',
  ETC: '기타'
} as const;

export type ChallengeCategoryType = keyof typeof ChallengeCategory;

export const categories = Object.keys(ChallengeCategory) as ChallengeCategoryType[];
