import { ChallengeCategory, ChallengeCategoryType } from '@/types/challenge-category.type';

type TagProps = {
  category: ChallengeCategoryType;
};

const tagBackground = {
  EXERCISE: 'bg-tag-exercise',
  CONSUME: 'bg-tag-consume',
  STUDY: 'bg-tag-study',
  ART: 'bg-tag-art',
  ETC: 'bg-tag-etc'
};

const Tag = ({ category }: TagProps) => {
  return (
    <div
      className={`${tagBackground[category]} flex h-6 w-12 items-center justify-center rounded-full text-center text-sm text-white`}
    >
      {ChallengeCategory[category]}
    </div>
  );
};

export default Tag;
