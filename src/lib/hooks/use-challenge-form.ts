import { Challenge } from '@/types/challenge.type';
import { useEffect, useState } from 'react';

// 챌린지 폼 상태 관리 훅
export const useChallengeForm = () => {
  const [challenge, setChallenge] = useState<Challenge>({
    id: 0,
    createdAt: '',
    startDate: '',
    finishDate: '',
    title: '',
    description: '',
    category: '',
    challengeImage: '',
    creatorId: '임시 챌린지 생성 ID',
    executeDays: [],
    participantCount: 0
  });

  //hydration 경고를 방지하기 위해, startDate와 finishDate가 없을 경우 오늘 날짜로 초기화
  useEffect(() => {
    setChallenge((prev) => ({
      ...prev,
      startDate: prev.startDate || new Date().toISOString().split('T')[0],
      finishDate: prev.finishDate || new Date().toISOString().split('T')[0]
    }));
  }, []);

  const setTitle = (value: string) => setChallenge((prev) => ({ ...prev, title: value }));
  const setDescription = (value: string) => setChallenge((prev) => ({ ...prev, description: value }));
  const setStartDate = (date: string) => setChallenge((prev) => ({ ...prev, startDate: date }));
  const setFinishDate = (date: string) => setChallenge((prev) => ({ ...prev, finishDate: date }));
  const setCategory = (category: string) => setChallenge((prev) => ({ ...prev, category }));
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
    }
  };
};
