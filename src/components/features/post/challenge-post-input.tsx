import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type ChallengePostInputProps = {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
};

const ChallengePostInput = ({ title, description, onTitleChange, onDescriptionChange }: ChallengePostInputProps) => {
  return (
    <>
      {/* 제목 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 제목</h2>
        <Input
          type="text"
          placeholder="챌린지 제목을 입력해 주세요(30자 이내)"
          className="w-[260px] text-[14px] md:w-[580px]"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
      </section>

      {/* 소개 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 소개</h2>
        <Textarea
          placeholder="챌린지에 대한 소개를 구체적으로 적어주세요(500자 이내)"
          className="w-[260px] text-[14px] md:w-[580px]"
          rows={4}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
        />
      </section>
    </>
  );
};

export default ChallengePostInput;
