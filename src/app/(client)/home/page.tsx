import ChallengeHomeFind from '@/components/features/challenges/home/challenge-home-find';
import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import ChallengePopular from '@/components/features/challenges/home/challenge-popular';
import { getUserInfo } from '@/lib/api/user-Info.api';

const HomePage = async () => {
  const { isLogin } = await getUserInfo();
  return (
    <>
      <ChallengePopular />
      {isLogin && <ChallengeHomeParticipation />}
      <ChallengeHomeFind />
    </>
  );
};

export default HomePage;
