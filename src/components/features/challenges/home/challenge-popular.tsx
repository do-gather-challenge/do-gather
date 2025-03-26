import { fetchGetChallengesByPage } from '@/lib/api/challenge.api';
import ChallengeCarouselCard from './challenge-carousel-card';
import { ChallengeSort } from '@/types/challenge-sort.type';
import { ChallengeStatus } from '@/types/challenge-status.type';

const ChallengePopular = async () => {
  // 인기 챌린지 가져오기 [4개] _ (참여자 많으면서 UPCOMING 인 챌린지)
  const { data: popularChallenges } = await fetchGetChallengesByPage(1, 4, {
    status: ChallengeStatus.UPCOMING,
    sortBy: ChallengeSort.POPULAR
  });

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">🔥인기 챌린지</h1>
      <section className="flex items-center justify-center">
        <ChallengeCarouselCard data={popularChallenges} />
      </section>
    </>
  );
};
export default ChallengePopular;
