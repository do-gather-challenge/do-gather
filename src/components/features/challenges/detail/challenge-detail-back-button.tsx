'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const ChallengeDetailBackButton = () => {
  const router = useRouter();

  return (
    <Button variant="black" size="lg" onClick={() => router.back()}>
      뒤로 가기
    </Button>
  );
};
export default ChallengeDetailBackButton;
