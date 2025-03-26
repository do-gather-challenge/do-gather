'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AuthInputField from './auth-input-field';
import { useSignUpForm } from '@/lib/hooks/use-sign-up-form';
import Link from 'next/link';
import URL from '@/constants/app-url.constant';

const AuthSignUpForm = () => {
  const { form, onSubmit } = useSignUpForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {SignUpInputField.map((input) => {
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
        <Button type="submit" variant="secondary" className="w-full">
          회원가입 완료
        </Button>
        <div className="flex justify-center gap-4">
          <span>이미 계정이 있으신가요?</span>
          <Link href={URL.SIGN_IN} className="text-blue hover:scale-105 hover:underline">
            로그인하기
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default AuthSignUpForm;

const SignUpInputField = [
  {
    name: 'email',
    label: '이메일',
    placeholder: 'mail@example.com',
    type: 'email'
  },
  {
    name: 'nickname',
    label: '닉네임',
    placeholder: '닉네임(2~12자)',
    type: 'text'
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호(6~16자)',
    type: 'password'
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: '입력하신 비밀번호(6~16자)',
    type: 'password'
  }
] as const;
