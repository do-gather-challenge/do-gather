'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useSignInForm } from '@/lib/hooks/use-sign-in-form';
import browserClient from '@/lib/supabase/client';
import Image from 'next/image';
import AuthInputForm from './auth-input-field';
import Link from 'next/link';

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <AuthInputForm
          control={form.control}
          label="이메일"
          name="email"
          type="email"
          placeholder="email@example.com"
        />
        <AuthInputForm control={form.control} label="비밀번호" name="password" type="password" placeholder="password" />
        <Button type="submit" className="bg-secondary w-full text-white">
          Login
        </Button>
        <div className="flex items-center justify-between gap-4">
          <Button type="button" className="flex-1 bg-slate-200" onClick={signInWithGithub}>
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
        ㅋ
      </form>
    </Form>
  );
};

export default AuthSignInForm;
