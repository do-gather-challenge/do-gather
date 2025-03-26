import Link from 'next/link';
import ChallengeHomeFind from '@/components/features/challenges/home/challenge-home-find';
import ChallengeHomeParticipation from '@/components/features/challenges/home/challenge-home-participation';
import ChallengePopular from '@/components/features/challenges/home/challenge-popular';
import { Button } from '@/components/ui/button';
import { getUserInfo } from '@/lib/api/user-Info.api';
import { LuPencil } from 'react-icons/lu';
import APP_URL from '@/constants/app-url.constant';

const HomePage = async () => {
  const { isLogin } = await getUserInfo();
  return (
    <div className="space-y-16 py-8">
      <ChallengePopular />
      {isLogin && <ChallengeHomeParticipation />}
      <ChallengeHomeFind />
      <Link href={APP_URL.CHALLENGES_POST}>
        <Button variant="secondary" className="fixed right-10 bottom-10 h-14 w-14 rounded-full">
          <LuPencil />
        </Button>
      </Link>
    </div>
  );
};

export default HomePage;
