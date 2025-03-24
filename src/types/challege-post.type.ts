import { ChallengeCategoryType } from "./challenge-category.type";

export type ChallengePostSetters = {
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setStartDate: (date: string) => void;
  setFinishDate: (date: string) => void;
  setCategory: (category: ChallengeCategoryType) => void;
  setExecuteDays: (executeDays: string[]) => void;
  setChallengeImage: (file: File) => void;
};
