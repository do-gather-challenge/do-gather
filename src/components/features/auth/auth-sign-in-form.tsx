'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSignInForm } from '@/lib/hooks/use-sign-in-form';
import browserClient from '@/lib/supabase/client';
import Image from 'next/image';
import AuthInputForm from './auth-input-form';

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
      </form>
    </Form>
  );
};

export default AuthSignInForm;
