'use client';

import ChallengePostSelector from '@/components/features/challenges/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/challenges/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/challenges/post/challenge-post-input';
import ChallengePostButtonGroup from '@/components/features/challenges/post/challenge-post-button-group';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';

const ChallengePostPage: React.FC = () => {
  const { challenge, challengeImageFile, setters, handleChange } = useChallengeForm();

  return (
    <section className="mx-auto mt-[100px] mb-6 max-w-[320px] p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 생성</h1>
      <ChallengePostInput challenge={challenge} handleChange={handleChange} />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChallengePostSelector challenge={challenge} setters={setters} />
        <ChallengePostImageUploader setters={setters} />
      </section>

      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup challenge={challenge} challengeImageFile={challengeImageFile} />
      </div>
    </section>
  );
};

export default ChallengePostPage;
