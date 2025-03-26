'use client';

import { Challenge } from '@/types/challenge.type';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import ChallengePostInput from './challenge-post-input';
import ChallengePostSelector from './challenge-post-selector';
import ChallengePostImageUploader from './challenge-post-image-uploader';
import ChallengePostButtonGroup from './challenge-post-button-group';

type ChallengeFormProps = {
  mode: 'create' | 'edit';
  initialData: Challenge;
};

const ChallengePostForm = ({ mode, initialData }: ChallengeFormProps) => {
  const { challenge, challengeImageFile, setters, handleChange } = useChallengeForm(initialData);

  return (
    <section className="mx-auto mb-6 max-w-[320px] p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">{mode === 'create' ? '챌린지 생성' : '챌린지 수정'}</h1>

      <ChallengePostInput challenge={challenge} handleChange={handleChange} />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChallengePostSelector challenge={challenge} setters={setters} />
        <ChallengePostImageUploader setters={setters} challenge={challenge} />
      </section>

      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup
          challenge={challenge}
          challengeImageFile={challengeImageFile}
          isEditMode={mode === 'edit'}
          challengeId={initialData?.id}
        />
      </div>
    </section>
  );
};

export default ChallengePostForm;
