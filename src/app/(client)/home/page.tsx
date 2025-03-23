import ChallengeHomeParticipating from '@/components/features/challenges/home/challenge-home-participating';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <div>
        HomePage
        <Link href="/sign-in"> 로그인 하러가기</Link>
        <Link href="/sign-up"> 회원가입 하러가기 </Link>
        {/* <TestComponent /> */}
      </div>
      <div className="m-auto max-w-[1280px]">
        <ChallengeHomeParticipating />
      </div>
    </>
  );
};

export default HomePage;
