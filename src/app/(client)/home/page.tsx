import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import ChallengePopular from '@/components/features/challenges/home/challenge-popular';
import { getIsLogin } from '@/lib/supabase/server';

const HomePage = async () => {
  const isLogin = await getIsLogin();
  return (
    <>
      <ChallengePopular />
      {isLogin && <ChallengeHomeParticipation />}
    </>
  );
};

export default HomePage;
