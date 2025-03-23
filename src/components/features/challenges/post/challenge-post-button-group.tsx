'use client';

import { Button } from '@/components/ui/button';
import { ChallengePost } from '@/types/challenge.type';

type ChallengePostButtonGroupProps = {
  challenge: ChallengePost;
};

const ChallengePostButtonGroup = ({ challenge }: ChallengePostButtonGroupProps) => {
  const handleSubmitChallenge = async () => {
    const { title, description, startDate, finishDate, category, executeDays } = challenge;
    if (!title || !description || !startDate || !finishDate || !category || executeDays.length === 0) {
      return alert('모든 필수 정보를 입력해 주세요.');
    }

    try {
      // console.log('챌린지 생성 데이터:', challenge);
      alert('챌린지가 성공적으로 생성되었습니다!');
    } catch (error) {
      console.error('챌린지 생성 중 오류 발생:', error);
      alert('챌린지 생성에 실패했습니다.');
    }
  };

  return (
    <div className="flex justify-center gap-6">
      <Button variant="secondary" onClick={() => alert('뒤로가기')}>
        뒤로가기
      </Button>
      <Button variant="secondary" onClick={handleSubmitChallenge}>
        챌린지생성
      </Button>
    </div>
  );
};

export default ChallengePostButtonGroup;
