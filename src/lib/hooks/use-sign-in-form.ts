import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import browserClient from '../supabase/client';
import { useRouter } from 'next/navigation';
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$&*?!%])[A-Za-z\d!@$%&*?]{6,16}$/;
export const useSignInForm = () => {
  const router = useRouter();

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

  const onSubmit = async (values: z.infer<typeof signFormSchema>) => {
    const { email, password } = values;
    const { data, error } = await browserClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error(error.message);
      alert('로그인 실패');
    }
    if (!!data.user) {
      return router.back();
    }
  };

  return { form, onSubmit };
};
