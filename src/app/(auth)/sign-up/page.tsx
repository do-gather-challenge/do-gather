import AuthSignUpForm from '@/components/features/auth/auth-sign-up-form';
import Image from 'next/image';
import Link from 'next/link';

const SignUpPage = () => {
  return (
    <section className="bg-primary-foreground flex min-h-screen w-full items-center justify-center">
      <figure className="m-8 flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl bg-white shadow-2xl md:m-8 md:flex-row">
        <Link href="/home" className="flex w-full items-center justify-center md:w-1/2">
          {/* 이미지 컨테이너에 명확한 높이 지정 */}
          <div className="relative flex h-64 w-full items-center justify-center p-8 sm:h-72 md:h-96">
            <Image
              src="/images/logo.png"
              alt="logo"
              width={250}
              height={200}
              priority
              className="object-contain"
              style={{ width: 'auto' }}
            />
          </div>
        </Link>
        <div className="w-full p-6 md:w-1/2 md:max-w-md md:p-8">
          <AuthSignUpForm />
        </div>
      </figure>
    </section>
  );
};

export default SignUpPage;
