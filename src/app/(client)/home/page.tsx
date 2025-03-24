import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import { getIsLogin } from '@/lib/supabase/server';
import Link from 'next/link';

const HomePage = async () => {
  const isLogin = await getIsLogin();
  return (
    <>
      {/* TEST CODE */}
      <div>
        HomePage
        <Link href="/sign-in"> 로그인 하러가기</Link>
        <Link href="/sign-up"> 회원가입 하러가기 </Link>
      </div>
      <div className="m-auto max-w-[1280px]">{isLogin && <ChallengeHomeParticipation />}</div>
    </>
  );
};

export default HomePage;
