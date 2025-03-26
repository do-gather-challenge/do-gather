import ChallengeHomeFind from '@/components/features/challenges/home/challenge-home-find';
import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import ChallengePopular from '@/components/features/challenges/home/challenge-popular';
import { getIsLogin } from '@/lib/supabase/server';
import Link from 'next/link';

const HomePage = async () => {
  const isLogin = await getIsLogin();
  return (
    <>
      <div>
        HomePage
        <Link href="/sign-in"> 로그인 하러가기</Link>
        <Link href="/sign-up"> 회원가입 하러가기 </Link>
        {/* <TestComponent /> */}
      </div>
      <ChallengePopular />
      {isLogin && <ChallengeHomeParticipation />}
      <ChallengeHomeFind />
    </>
  );
};

export default HomePage;
