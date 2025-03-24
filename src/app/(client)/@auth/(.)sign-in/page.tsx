'use client';
import SignInForm from '@/components/features/auth/auth-sign-in-form';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const SignInPageModal = () => {
  const router = useRouter();
  const backdropRef = useRef(null);

  const handleCloseModal = () => {
    router.back();
  };

  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  // 백드롭 영역 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [router]);

  return (
    <div ref={backdropRef} className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      {/* Modal 영역*/}
      <div className="relative mx-10 mt-30 flex min-h-[540px] w-full min-w-[260px] flex-col items-center justify-evenly rounded-lg border-2 bg-white p-4 shadow-lg md:h-[575px] md:w-[335px]">
        <Button
          type="button"
          className="absolute top-5 right-5 bg-transparent text-black shadow-none"
          onClick={handleCloseModal}
        >
          X
        </Button>
        <div className="bg-primary relative my-12 flex h-44 w-44 items-center justify-center rounded-full md:my-1">
          <Image src="/images/logo.png" alt="logo" width={32 * 4} height={32 * 4} />
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPageModal;
