import { ChallengePost } from '@/types/challenge.type';
import dynamic from 'next/dynamic';

const Input = dynamic(() => import('@/components/ui/input').then((mod) => mod.Input), { ssr: false });
const Textarea = dynamic(() => import('@/components/ui/textarea').then((mod) => mod.Textarea), { ssr: false });

type ChallengePostInputProps = {
  challenge: ChallengePost;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};

const ChallengePostInput = ({ challenge, handleChange }: ChallengePostInputProps) => {
  return (
    <>
      {/* 제목 */}
      <section className="mb-6">
        <label htmlFor="title" className="mb-2 block text-lg font-semibold">
          챌린지 제목
        </label>
        <Input
          id="title"
          type="text"
          placeholder="챌린지 제목을 입력해 주세요(30자 이내)"
          value={challenge.title}
          onChange={handleChange}
        />
      </section>

      {/* 소개 */}
      <section className="mb-6">
        <label htmlFor="description" className="mb-2 block text-lg font-semibold">
          챌린지 소개
        </label>
        <Textarea
          id="description"
          placeholder="챌린지에 대한 소개를 구체적으로 적어주세요(500자 이내)"
          rows={4}
          value={challenge.description}
          onChange={handleChange}
        />
      </section>
    </>
  );
};

export default ChallengePostInput;
