import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import browserClient from '../supabase/client';
import { useRouter } from 'next/navigation';
import AuthSchema from '@/constants/auth-schema.constant';
import { toast } from 'react-toastify';

const signUpDefaultValues = {
  email: '',
  nickname: '',
  password: '',
  confirmPassword: ''
};

export const useSignUpForm = () => {
  const router = useRouter();

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signFormSchema),
    defaultValues: signUpDefaultValues
  });

  const onSubmit = async (values: z.infer<typeof signFormSchema>) => {
    const { email, nickname, password } = values;

    const { data, error } = await browserClient.auth.signUp({
      email,
      password,
      options: {
        data: { nickname }
      }
    });

    if (error) {
      toast.error(`회원가입에 실패 하였습니다. ${error.message}`);
      return;
    }

    if (!!data.user) {
      return router.back();
    }
  };

  return { form, onSubmit };
};

const signFormSchema = z
  .object({
    email: AuthSchema.EMAIL_SCHEMA,
    nickname: AuthSchema.NICKNAME_SCHEMA,
    password: AuthSchema.PASSWORD_SCHEMA,
    confirmPassword: AuthSchema.CONFIRM_PASSWORD_SCHEMA
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword']
  });
