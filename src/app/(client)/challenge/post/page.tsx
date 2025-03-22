'use client';

import ChallengePostSelector from '@/components/features/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/post/challenge-post-input';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import ChallengePostButtonGroup from '@/components/features/post/challenge-post-button-group';

const PostPage = () => {
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
        onTitleChange={setters.setTitle}
        onDescriptionChange={setters.setDescription}
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
          onChangeStartDate={setters.setStartDate}
          onChangeFinishDate={setters.setFinishDate}
        />

        {/* 이미지 업로드 */}
        <ChallengePostImageUploader onUploadImage={handleUploadImage} />
      </section>

      {/* 버튼 */}
      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup challenge={challenge} setters={setters} onBackClick={() => alert('뒤로가기')} />
      </div>
    </div>
  );
};

export default PostPage;
