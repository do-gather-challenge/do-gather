'use client';

import ChallengePostSelector from '@/components/features/challenges/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/challenges/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/challenges/post/challenge-post-input';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import ChallengePostButtonGroup from '@/components/features/challenges/post/challenge-post-button-group';

const ChallengePostPage = () => {
  const { challenge, setters } = useChallengeForm();

  const handleDaySelection = (day: string) => {
    const newExecuteDays = challenge.executeDays.includes(day)
      ? challenge.executeDays.filter((d) => d !== day)
      : [...challenge.executeDays, day];
    setters.setExecuteDays(newExecuteDays);
  };

  const handleCategorySelection = (selectedCategory: string) => {
    setters.setCategory(selectedCategory);
  };

  const handleUploadImage = (file: File) => {
    setters.setChallengeImage(file);
  };

  return (
    <div className="mx-auto mb-6 mt-[100px] max-w-[320px] bg-white p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 생성</h1>

      {/* 타이틀 및 소개 입력 */}
      <ChallengePostInput
        title={challenge.title}
        description={challenge.description}
        onTitleChange={setters.setTitle}
        onDescriptionChange={setters.setDescription}
      />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 반복 일정, 유형, 날짜 선택, */}
        <ChallengePostSelector
          selectedDays={challenge.executeDays}
          selectedCategory={challenge.category}
          startDate={challenge.startDate}
          finishDate={challenge.finishDate}
          onSelectDay={handleDaySelection}
          onSelectCategory={handleCategorySelection}
          onChangeStartDate={setters.setStartDate}
          onChangeFinishDate={setters.setFinishDate}
        />

        {/* 이미지 업로드 */}
        <ChallengePostImageUploader onUploadImage={handleUploadImage} />
      </section>

      {/* 버튼 */}
      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup challenge={challenge} onBackClick={() => alert('뒤로가기')} />
      </div>
    </div>
  );
};

export default ChallengePostPage;
