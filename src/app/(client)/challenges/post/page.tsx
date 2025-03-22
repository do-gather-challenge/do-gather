'use client';

import ChallengePostSelector from '@/components/features/challenges/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/challenges/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/challenges/post/challenge-post-input';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import ChallengePostButtonGroup from '@/components/features/challenges/post/challenge-post-button-group';

const ChallengePostPage: React.FC = () => {
  const { challenge, setters, handleChange } = useChallengeForm();

  return (
    <section className="mx-auto mt-[100px] mb-6 max-w-[320px] p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 생성</h1>

      {/* 타이틀 및 소개 입력 */}
      <ChallengePostInput />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* 반복 일정, 유형, 날짜 선택, */}
        <ChallengePostSelector />

        {/* 이미지 업로드 */}
        <ChallengePostImageUploader />
      </section>

      {/* 버튼 */}
      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup />
      </div>
    </section>
  );
};

export default ChallengePostPage;
