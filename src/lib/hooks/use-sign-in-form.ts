import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import browserClient from '../supabase/client';
import { useRouter } from 'next/navigation';
import AuthSchema from '@/constants/auth-schema.constant';

const signInDefaultValues = {
  email: '',
  password: ''
};

export const useSignInForm = () => {
  const router = useRouter();

  const form = useForm({
    mode: 'onBlur',
    resolver: zodResolver(signFormSchema),
    defaultValues: signInDefaultValues
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
const signFormSchema = z.object({
  email: AuthSchema.EMAIL_SCHEMA,
  password: AuthSchema.PASSWORD_SCHEMA
});
