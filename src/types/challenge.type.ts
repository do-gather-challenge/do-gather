import { ChallengeCategoryType } from '@/types/challenge-category.type';
import { ChallengeSortType } from '@/types/challenge-sort.type';
import { ChallengeStatusType } from '@/types/challenge-status.type';

export type Challenge = {
  id: number;
  createdAt: string;
  startDate: string;
  finishDate: string;
  title: string;
  description: string;
  category: ChallengeCategoryType;
  challengeImage: string;
  creatorId: string;
  executeDays: string[];
  participantCount: number;
};

export type ChallengeWithParticipation = Challenge & {
  isParticipating: boolean;
  isCompleted: boolean;
};

export type ChallengePost = Omit<Challenge, 'id' | 'creatorId' | 'participantCount' | 'category'> & {
  category: ChallengeCategoryType | '';
};

export type ChallengeFilterOptions = {
  category: ChallengeCategoryType;
  searchTerm: string;
  status: ChallengeStatusType;
  sortBy: ChallengeSortType;
};
