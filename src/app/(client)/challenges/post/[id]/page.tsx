'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import ChallengePostSelector from '@/components/features/challenges/post/challenge-post-selector';
import ChallengePostImageUploader from '@/components/features/challenges/post/challenge-post-image-uploader';
import ChallengePostInput from '@/components/features/challenges/post/challenge-post-input';
import ChallengePostButtonGroup from '@/components/features/challenges/post/challenge-post-button-group';
import { useChallengeForm } from '@/lib/hooks/use-challenge-form';
import { fetchGetChallengeById } from '@/lib/api/challenge.api';

const ChallengePostPage: React.FC = () => {
  const router = useRouter();
  const { id } = useParams();

  const { challenge, challengeImageFile, setters, handleChange, setChallenge } = useChallengeForm();

  useEffect(() => {
    if (id) {
      fetchGetChallengeById(Number(id)).then((data) => {
        if (data) {
          setChallenge(data);
        } else {
          alert('챌린지 데이터를 불러오지 못했습니다.');
          router.push('/home');
        }
      });
    }
  }, [id, router, setChallenge]);

  return (
    <section className="mx-auto mb-6 max-w-[320px] p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 수정</h1>
      <ChallengePostInput challenge={challenge} handleChange={handleChange} />

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <ChallengePostSelector challenge={challenge} setters={setters} />
        <ChallengePostImageUploader setters={setters} challenge={challenge} />
      </section>

      <div className="flex justify-center gap-6">
        <ChallengePostButtonGroup challenge={challenge} challengeImageFile={challengeImageFile} isEditMode={true} />
      </div>
    </section>
  );
};

export default ChallengePostPage;
