'use client';

import { ChallengeCategoryType } from '@/types/challenge-category.type';
import { ChallengePost } from '@/types/challenge.type';
import { useEffect, useState } from 'react';

export type ChallengePostSetters = {
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setStartDate: (date: string) => void;
  setFinishDate: (date: string) => void;
  setCategory: (category: ChallengeCategoryType) => void;
  setExecuteDays: (executeDays: string[]) => void;
  setChallengeImage: (file: File) => void;
};

// 챌린지 폼 상태 관리 훅
export const useChallengeForm = () => {
  const [challenge, setChallenge] = useState<ChallengePost>({
    createdAt: '',
    startDate: '',
    finishDate: '',
    title: '',
    description: '',
    category: '',
    challengeImage: '',
    executeDays: []
  });

  //hydration 경고를 방지하기 위해, startDate와 finishDate가 없을 경우 오늘 날짜로 초기화
  useEffect(() => {
    setChallenge((prev) => ({
      ...prev,
      startDate: prev.startDate || new Date().toISOString().split('T')[0],
      finishDate: prev.finishDate || new Date().toISOString().split('T')[0]
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target;
    const id = target.id as keyof ChallengePost;

    // 타입 안전성 검증
    if (!(id in challenge)) {
      console.error(`Invalid id: ${id}`);
      return;
    }

    if (target instanceof HTMLInputElement && (target.type === 'checkbox' || target.type === 'radio')) {
      setChallenge((prev) => ({ ...prev, [id]: target.checked }));
    } else {
      setChallenge((prev) => ({ ...prev, [id]: target.value }));
    }
  };

  const setTitle = (value: string) => setChallenge((prev) => ({ ...prev, title: value }));
  const setDescription = (value: string) => setChallenge((prev) => ({ ...prev, description: value }));
  const setStartDate = (date: string) => setChallenge((prev) => ({ ...prev, startDate: date }));
  const setFinishDate = (date: string) => setChallenge((prev) => ({ ...prev, finishDate: date }));
  const setCategory = (category: ChallengeCategoryType) => setChallenge((prev) => ({ ...prev, category }));
  const setExecuteDays = (executeDays: string[]) => setChallenge((prev) => ({ ...prev, executeDays }));
  const setChallengeImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setChallenge((prev) => ({ ...prev, challengeImage: imageUrl }));
  };

  return {
    challenge,
    setters: {
      setTitle,
      setDescription,
      setStartDate,
      setFinishDate,
      setCategory,
      setExecuteDays,
      setChallengeImage
    },
    handleChange
  };
};
