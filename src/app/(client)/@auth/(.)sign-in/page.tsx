'use client';
import SignInForm from '@/components/features/auth/auth-sign-in-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const SignInPageModal = () => {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs">
      <div className="relative mx-10 mt-30 flex min-h-[380px] w-full min-w-[260px] flex-col items-center justify-evenly rounded-lg border-2 bg-white p-4 shadow-lg md:h-[575px] md:w-[335px]">
        <Button
          type="button"
          className="absolute top-5 right-5 shadow-none bg-transparent  text-black"
          onClick={handleCloseModal}
        >
          X
        </Button>
        <h1 className="text-9xl">logo</h1>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignInPageModal;
