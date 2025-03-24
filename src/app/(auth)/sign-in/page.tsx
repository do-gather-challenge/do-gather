import AuthSignInForm from '@/components/features/auth/auth-sign-in-form';
import Image from 'next/image';
import Link from 'next/link';

const SignInPage = () => {
  return (
    <section className="bg-primary-foreground flex min-h-screen w-full items-center justify-center">
      <figure className="m-8 flex max-w-[680px] min-w-[260px] flex-col items-center justify-center rounded-2xl bg-white shadow-2xl md:w-4xl md:flex-row  md:p-0">
        <Link href="/home" className="relative flex min-h-[240px] w-[300px] p-8 md:h-auto">
          <Image src="/images/logo.png" className="object-contain p-8" fill alt="logo" />
        </Link>
        <div className="w-full max-w-[420px] min-w-[300px] p-8">
          <AuthSignInForm />
        </div>
      </figure>
    </section>
  );
};

export default SignInPage;
