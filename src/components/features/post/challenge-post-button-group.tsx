import { Button } from '@/components/ui/button';
import { Challenge } from '@/types/challenge.type';

type ButtonGroupProps = {
  challenge: Challenge;
  onBackClick: () => void;
};

const ChallengePostButtonGroup = ({ challenge, onBackClick }: ButtonGroupProps) => {
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
    <div className="flex justify-center gap-6">
      <Button
        type="button"
        className="bg-secondary hover:bg-secondary-foreground h-[40px] w-[84px] rounded-md px-4 py-2 text-[12px] text-white"
        onClick={onBackClick}
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
  );
};

export default ChallengePostButtonGroup;
