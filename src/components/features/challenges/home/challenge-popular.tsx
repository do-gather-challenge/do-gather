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
    <section className="flex flex-col items-center justify-center">
      <h1 className="mb-3 flex items-center justify-center text-xl font-bold">🔥인기 챌린지</h1>
      <ChallengeCarouselCard data={popularChallenges} />
    </section>
  );
};
export default ChallengePopular;
