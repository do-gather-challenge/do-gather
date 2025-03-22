'use client';

import SignUpForm from '@/components/features/auth/auth-sign-up-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

/**
 * @function handleCloseModal : 이전에 있던 화면으로 돌아가는 라우팅 함수
 * @returns void
 */

const SignUpPageModal = () => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="relative mx-10 mt-30 flex min-h-[380px] w-full min-w-[260px] flex-col items-center justify-evenly rounded-lg border-2 bg-white p-4 shadow-lg md:h-[575px] md:w-[335px]">
        <Button
          type="button"
          className="hover:none absolute top-5 right-5 bg-transparent text-black shadow-none"
          onClick={handleCloseModal}
        >
          X
        </Button>
        <h1 className="h-24 text-center align-middle text-6xl md:text-9xl">logo</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPageModal;
