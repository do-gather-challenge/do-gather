'use client';

import SignUpForm from '@/components/features/auth/auth-sign-up-form';
import { useRouter } from 'next/navigation';

const SignUpPageModal = () => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center rounded-lg border-2 bg-white p-4 shadow-lg">
        <h1>SignUpPageModal 가로 채기 성공</h1>
        <button onClick={handleCloseModal}>닫기</button>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPageModal;
