
import { SUPABASE_ANON_KEY, SUPABASE_URL } from '@/constants/env.constant';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();

  return createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      }
    }
  });
}

export const getIsLogin = async () => {
  const serverClient = createClient();
  const {
    data: { session }
  } = await serverClient.auth.getSession();
  return !!session;
};
