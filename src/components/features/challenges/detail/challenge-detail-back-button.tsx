'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ChallengeDetailBackButton = () => {
  const router = useRouter();

  return (
    <div className="mt-4 flex justify-center">
      <Button variant="black" size="lg" onClick={() => router.back()}>
        뒤로 가기
      </Button>
    </div>
  );
};
export default ChallengeDetailBackButton;
