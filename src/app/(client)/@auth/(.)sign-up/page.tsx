'use client';

import SignUpForm from '@/components/features/auth/auth-sign-up-form';
import useCloseModal from '@/lib/hooks/use-close-modal';
import Image from 'next/image';
import { IoClose } from 'react-icons/io5';
const SignUpPageModal = () => {
  const { backdropRef, handleCloseModal } = useCloseModal();

  return (
    <section ref={backdropRef} className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      {/* Modal 영역 */}
      <div className="md: relative mx-10 flex min-h-[540px] w-full min-w-[260px] flex-col items-center justify-evenly gap-12 rounded-lg border-2 bg-white p-4 shadow-lg md:w-[600px]">
        <button
          type="button"
          className="hover:text-destructive absolute top-5 right-5 bg-transparent shadow-none"
          onClick={handleCloseModal}
        >
          <IoClose size="24" />
        </button>
        <div className="bg-primary relative my-6 flex h-52 w-52 items-center justify-center rounded-full">
          <Image src="/images/logo.png" alt="logo" width={162} height={162} />
        </div>
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUpPageModal;
