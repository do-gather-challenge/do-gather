'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import browserClient from '@/lib/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{6,16}$/;

const SignInForm = () => {
  const signFormSchema = z.object({
    email: z.string().email({
      message: '유효한 이메일 형식이 아닙니다.'
    }),
    password: z
      .string()
      .min(6, {
        message: '비밀번호는 6자리 이상 입력해주세요.'
      })
      .max(16, {
        message: '비밀번호는 16자리 이하 입력해주세요.'
      })
      .regex(passwordRegex, {
        message: '영문, 숫자, 특수문자를 최소 1개이상 포함하여주세요.'
      })
  });

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const signInWithGithub = async () => {
    await browserClient.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: window.origin + '/auth/callback'
      }
    });
  };

  const onSubmit = (values: z.infer<typeof signFormSchema>) => {
    console.log('Form submitted => ', values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-secondary w-full text-white">
          Login
        </Button>
        <div className="flex items-center justify-between gap-4">
          <Button type="button" className="flex-1 bg-slate-200" onClick={signInWithGithub}>
            <Image src="/images/google_icon.png" alt="google logo" width={24} height={24} className="rounded" />
          </Button>
          <Button type="button" className="flex-1 bg-slate-200" onClick={signInWithGithub}>
            <Image src="/images/github_icon.png" alt="google logo" width={24} height={24} className="rounded" />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SignInForm;
