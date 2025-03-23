'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import AuthInputField from './auth-input-field';
import { useSignUpForm } from '@/lib/hooks/use-sign-up-form';

const AuthSignUpForm = () => {
  const { form, onSubmit } = useSignUpForm();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {SignUpInputField.map((input) => {
          return (
            <AuthInputField
              control={form.control}
              label={input.label}
              name={input.name}
              type={input.type}
              placeholder={input.placeholder}
            />
          );
        })}

        <Button type="submit" className="bg-secondary w-full text-white">
          회원가입 완료
        </Button>
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
    placeholder: '비밀번호(6~12자)',
    type: 'password'
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: '입력하신 비밀번호(6~12자)',
    type: 'password'
  }
] as const;
