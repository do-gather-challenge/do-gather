'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import ChallengePostSelector from '@/components/features/challenges/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/challenges/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/challenges/post/challenge-post-input';
import ChallengePostButtonGroup from '@/components/features/challenges/post/challenge-post-button-group';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import { fetchGetChallengeById } from '@/lib/api/challenge.api';

const ChallengeEditPage: React.FC = () => {
  const { id } = useParams();
  const { challenge, challengeImageFile, setters, handleChange, setChallenge } = useChallengeForm();

  useEffect(() => {
    if (id) {
      (async () => {
        const data = await fetchGetChallengeById(Number(id));
        if (data) {
          setChallenge({
            ...data,
            startDate: data.startDate,
            finishDate: data.finishDate
          });
        }
      })();
    }
  }, [id, setChallenge]);

  return (
    <section className="mx-auto mb-6 max-w-[320px] p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 수정</h1>
      <ChallengePostInput challenge={challenge} handleChange={handleChange} />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChallengePostSelector challenge={challenge} setters={setters} />
        <ChallengePostImageUploader setters={setters} challenge={challenge} />
      </section>

      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup
          challenge={challenge}
          challengeImageFile={challengeImageFile}
          isEditMode={true}
          challengeId={Number(id)}
        />
      </div>
    </section>
  );
};

export default ChallengeEditPage;
