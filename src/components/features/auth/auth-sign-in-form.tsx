'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string(),
  password: z.string()
});

const AuthSignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = () => {};

  const signInWithGithub = () => {};

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
