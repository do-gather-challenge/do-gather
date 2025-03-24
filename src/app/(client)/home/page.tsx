import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import { getIsLogin } from '@/lib/supabase/server';
import Link from 'next/link';

const HomePage = async () => {
  const isLogin = await getIsLogin();
  return <>{isLogin && <ChallengeHomeParticipation />}</>;
};

export default HomePage;
