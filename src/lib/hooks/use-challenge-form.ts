import { useState } from 'react';
import { ChallengeCategoryType } from '@/types/challenge-category.type';
import { ChallengePost } from '@/types/challenge.type';

// 챌린지 폼 상태 관리 훅
export const useChallengeForm = (initialValues?: Partial<ChallengePost>) => {
  const [challenge, setChallenge] = useState<ChallengePost>({
    createdAt: '',
    startDate: '',
    finishDate: '',
    title: '',
    description: '',
    category: '',
    challengeImage: '',
    executeDays: [],
    ...initialValues
  });
  const [challengeImageFile, setChallengeImageFile] = useState<File | null>(null);

  // 입력 값 변경 핸들러 (제목, 소개)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    if (!(id in challenge)) {
      console.error(`Invalid id: ${id}`);
      return;
    }
    setChallenge((prev) => ({
      ...prev,
      [id]: value
    }));
  };

  // 날짜, 카테고리, 요일, 이미지 업데이트용 함수들
  const setStartDate = (date: string) => setChallenge((prev) => ({ ...prev, startDate: date }));
  const setFinishDate = (date: string) => setChallenge((prev) => ({ ...prev, finishDate: date }));
  const setCategory = (category: ChallengeCategoryType) => setChallenge((prev) => ({ ...prev, category }));
  const setExecuteDays = (executeDays: string[]) => setChallenge((prev) => ({ ...prev, executeDays }));
  const setChallengeImage = (file: File) => {
    setChallengeImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setChallenge((prev) => ({ ...prev, challengeImage: imageUrl }));
  };

  return {
    challenge,
    setChallenge,
    challengeImageFile,
    setters: {
      setStartDate,
      setFinishDate,
      setCategory,
      setExecuteDays,
      setChallengeImage
    },
    handleChange
  };
};
