'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSignInForm } from '@/lib/hooks/use-sign-in-form';
import browserClient from '@/lib/supabase/client';
import Image from 'next/image';
import AuthInputField from './auth-input-field';
import ICON_GITHUB from '@/../public/images/icon-github.png';
import ICON_GOOGLE from '@/../public/images/icon-google.png';
import AuthToggleLink from './auth-toggle-link';

/**
 * @function useSignInForm : 로그인 제출 Form 관리 훅
 * @returns {form, onSubmit} : form {email, password} , onSubmit 일반 로그인 제출 함수
 */

const AuthSignInForm = () => {
  const { form, onSubmit } = useSignInForm();

  // Github 로그인
  const signInWithGithub = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.origin + 'api/auth/callback'
      }
    });
  };
  // Google 로그인
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
        {/* 일반 로그인 버튼 */}
        <Button type="submit" variant="secondary" className="bg-secondary w-full text-white">
          Login
        </Button>
        <div className="flex items-center justify-between gap-4">
          {/* 구글 로그인 버튼 */}
          <Button type="button" className="bg-gray hover:bg-gray/60 flex-1" onClick={signInWithGoogle}>
            <Image src={ICON_GOOGLE} alt="google-logo" width={24} height={24} className="rounded" />
          </Button>
          {/* 깃허브 로그인 버튼 */}
          <Button type="button" className="bg-gray hover:bg-gray/60 flex-1" onClick={signInWithGithub}>
            <Image src={ICON_GITHUB} alt="github-logo" width={24} height={24} className="rounded" />
          </Button>
        </div>
        <AuthToggleLink mode="signUp" />
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
