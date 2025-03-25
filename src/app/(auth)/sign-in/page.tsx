import AuthSignInForm from '@/components/features/auth/auth-sign-in-form';
import Image from 'next/image';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <section className="bg-primary-foreground flex min-h-screen w-full items-center justify-center">
      <figure className="m-8 flex w-full max-w-4xl flex-col items-center justify-center rounded-2xl bg-white shadow-2xl md:m-8 md:flex-row">
        <Link href="/home" className="flex w-full items-center justify-center md:w-1/2">
          <div className="relative flex h-64 w-3/4 items-center justify-center p-4 sm:h-72 md:h-96 md:w-full md:p-0">
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
          <AuthSignInForm />
        </div>
      </figure>
    </section>
  );
};

export default SignInPage;
