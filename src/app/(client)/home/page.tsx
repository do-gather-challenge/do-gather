import ChallengeHomeFind from '@/components/features/challenges/home/challenge-home-find';
import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import ChallengePopular from '@/components/features/challenges/home/challenge-popular';
import { getUserInfo } from '@/lib/api/user-Info.api';

const HomePage = async () => {
  const { isLogin } = await getUserInfo();
  return (
    <div className='py-10 space-y-16'>
      <ChallengePopular />
      {isLogin && <ChallengeHomeParticipation />}
      <ChallengeHomeFind />
    </div>
  );
};

export default HomePage;
