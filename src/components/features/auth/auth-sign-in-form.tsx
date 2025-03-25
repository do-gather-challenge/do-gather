'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSignInForm } from '@/lib/hooks/use-sign-in-form';
import browserClient from '@/lib/supabase/client';
import Image from 'next/image';
import Link from 'next/link';
import AuthInputField from './auth-input-field';
import ICON_GITHUB from '@/../public/images/icon-github.png';
import ICON_GOOGLE from '@/../public/images/icon-google.png';

const AuthSignInForm = () => {
  const { form } = useSignInForm();

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

  const onSubmit = async () => {
    const values = form.getValues();
    const { data } = await browserClient.auth.signInWithPassword(values);
    window.location.href = '/home';
  };

  return (
    <Form {...form}>
      <form action={onSubmit} className="w-full space-y-4">
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
        <Button type="submit" variant="secondary" className="bg-secondary w-full text-white">
          Login
        </Button>
        <div className="flex items-center justify-between gap-4">
          <Button type="button" className="bg-gray hover:bg-gray/60 flex-1" onClick={signInWithGoogle}>
            <Image src={ICON_GOOGLE} alt="google-logo" width={24} height={24} className="rounded" />
          </Button>
          <Button type="button" className="bg-gray hover:bg-gray/60 flex-1" onClick={signInWithGithub}>
            <Image src={ICON_GITHUB} alt="github-logo" width={24} height={24} className="rounded" />
          </Button>
        </div>
        <div className="flex justify-center gap-4">
          <span>계정이 없으신가요?</span>
          <Link href="/sign-up" className="text-blue hover:scale-105 hover:underline">
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
    placeholder: '비밀번호(6~16자)',
    type: 'password'
  }
] as const;
