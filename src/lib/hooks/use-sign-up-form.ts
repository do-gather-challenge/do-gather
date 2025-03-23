import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import browserClient from '../supabase/client';
import { useRouter } from 'next/navigation';

const nicknameRegex = /^(?=.{2,12}$)[가-힣A-Za-z0-9]+$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!#@$%&*?]{6,16}$/;

export const useSignUpForm = () => {
  const router = useRouter();

  const signFormSchema = z
    .object({
      email: z.string().email({
        message: '유효한 이메일 형식이 아닙니다.'
      }),
      nickname: z
        .string()
        .min(2, {
          message: '2~12자 이하의 한글/영어/숫자만 가능'
        })
        .max(12, {
          message: '2~12자 이하의 한글/영어/숫자만 가능'
        })
        .regex(nicknameRegex, {
          message: '특수문자, 공백이 포함 될 수 없습니다.'
        }),
      password: z
        .string()
        .min(6, {
          message: '비밀번호(6~16자)가 너무 짧습니다.'
        })
        .max(16, {
          message: '비밀번호(6~16자)가 너무 깁니다. '
        })
        .regex(passwordRegex, {
          message: '영문, 숫자, 특수문자(!@$%^&*()를 최소 1개 이상 포함하여야 합니다. '
        }),
      confirmPassword: z.string()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword']
    });

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signFormSchema),
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof signFormSchema>) => {
    const { email, password } = values;

    const { data, error } = await browserClient.auth.signUp({
      email,
      password
    });

    if (error) {
      console.error(error.message);
      return alert('회원가입 실패');
    }

    if (!!data.user) {
      return router.back();
    }
  };

  return { form, onSubmit };
};
