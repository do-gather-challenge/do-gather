'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSignInForm } from '@/lib/hooks/use-sign-in-form';
import browserClient from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import AuthInputField from './auth-input-field';

const AuthSignInForm = () => {
  const { form, onSubmit } = useSignInForm();

  const signInWithGithub = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.origin + 'api/auth/callback'
      }
    });
  };

  const signInWithGoogle = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.origin + 'api/auth/callback'
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {SignInInputField.map((input) => {
          return (
            <AuthInputField
              key={input.name}
              control={form.control}
              label={input.label}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
            />
          );
        })}
        <Button type="submit" className="bg-secondary w-full text-white">
          Login
        </Button>
        <div className="flex items-center justify-between gap-4">
          <Button type="button" className="flex-1 bg-slate-200" onClick={signInWithGoogle}>
            <Image src="/images/ICON_GOOGLE.png" alt="google logo" width={24} height={24} className="rounded" />
          </Button>
          <Button type="button" className="flex-1 bg-slate-200" onClick={signInWithGithub}>
            <Image src="/images/ICON_GITHUB.png" alt="google logo" width={24} height={24} className="rounded" />
          </Button>
        </div>
        <div className="flex justify-center gap-4">
          <span>계정이 없으신가요?</span>
          <Link href="/sign-up" className="font-bold hover:scale-115 hover:underline">
            가입하기
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthSignInForm;

const SignInInputField = [
  {
    name: 'email',
    label: '이메일',
    placeholder: 'mail@example.com',
    type: 'email'
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호(6~12자)',
    type: 'password'
  }
] as const;
