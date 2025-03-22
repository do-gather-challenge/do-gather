'use client';

import { useEffect, useState } from 'react';
import { Challenge } from '@/types/challenge.type';
import ChallengePostSelector from '@/components/features/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/post/challenge-post-input';
import { Button } from '@/components/ui/button';

const PostPage = () => {
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

  useEffect(() => {
    setChallenge((prev) => ({
      ...prev,
      startDate: prev.startDate || new Date().toISOString().split('T')[0],
      finishDate: prev.finishDate || new Date().toISOString().split('T')[0]
    }));
  }, []);

  const handleDaySelection = (day: string) => {
    setChallenge((prev) => ({
      ...prev,
      executeDays: prev.executeDays.includes(day)
        ? prev.executeDays.filter((d) => d !== day)
        : [...prev.executeDays, day]
    }));
  };

  const handleCategorySelection = (selectedCategory: string) => {
    setChallenge((prev) => ({
      ...prev,
      category: prev.category === selectedCategory ? '' : selectedCategory
    }));
  };

  const handleUploadImage = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setChallenge((prev) => ({ ...prev, challengeImage: imageUrl }));
  };

  const handleSubmitChallenge = async () => {
    const { title, description, startDate, finishDate, category, executeDays } = challenge;
    if (!title || !description || !startDate || !finishDate || !category || executeDays.length === 0) {
      alert('모든 필수 정보를 입력해 주세요.');
      return;
    }

    try {
      console.log('챌린지 생성 데이터:', challenge);
      alert('챌린지가 성공적으로 생성되었습니다!');
    } catch (error) {
      console.error('챌린지 생성 중 오류 발생:', error);
      alert('챌린지 생성에 실패했습니다.');
    }
  };

  return (
    <div className="mx-auto mt-[100px] mb-6 max-w-[320px] bg-white p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 생성</h1>

      {/* 타이틀 및 소개 입력 */}
      <ChallengePostInput
        title={challenge.title}
        description={challenge.description}
        onTitleChange={(value) => setChallenge((prev) => ({ ...prev, title: value }))}
        onDescriptionChange={(value) => setChallenge((prev) => ({ ...prev, description: value }))}
      />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 반복 일정, 유형, 날짜 선택 */}
        <ChallengePostSelector
          selectedDays={challenge.executeDays}
          selectedCategory={challenge.category}
          startDate={challenge.startDate}
          finishDate={challenge.finishDate}
          onSelectDay={handleDaySelection}
          onSelectCategory={handleCategorySelection}
          onChangeStartDate={(date) => setChallenge((prev) => ({ ...prev, startDate: date }))}
          onChangeFinishDate={(date) => setChallenge((prev) => ({ ...prev, finishDate: date }))}
        />

        {/* 이미지 업로드 */}
        <ChallengePostImageUploader onUploadImage={handleUploadImage} />
      </section>

      {/* 버튼 */}
      <div className="flex justify-center gap-6">
        <Button
          type="button"
          className="bg-secondary hover:bg-secondary-foreground h-[40px] w-[84px] rounded-md px-4 py-2 text-[12px] text-white"
          onClick={() => alert('뒤로가기')}
        >
          뒤로가기
        </Button>
        <Button
          type="button"
          className="bg-secondary hover:bg-secondary-foreground h-[40px] w-[84px] rounded-md px-4 py-2 text-[12px] text-white"
          onClick={handleSubmitChallenge}
        >
          챌린지생성
        </Button>
      </div>
    </div>
  );
};

export default PostPage;
