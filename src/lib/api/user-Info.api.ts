'use server';
import { UserInfo } from '@/types/user-info.types';
import { createClient } from '../supabase/server';
import { redirect } from 'next/navigation';

const initialUserInfo = {
  id: '',
  created_at: '',
  nickname: '',
  profile_image: null,
  email: ''
};

export const getSession = async () => {
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError) {
    const status = userError.status;
    let message = '알 수 없는 오류가 발생했습니다.';

    switch (status) {
      case 400:
        message = '잘못된 요청입니다. 요청 파라미터를 확인해주세요.';
        break;
      case 401:
        message = '인증되지 않았습니다. 로그인 정보가 없거나 세션이 만료되었습니다.';
        break;
      case 403:
        message = '접근이 금지되었습니다. 권한이 없습니다.';
        break;
      case 404:
        message = '요청한 리소스를 찾을 수 없습니다.';
        break;
      case 500:
        message = '서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
        break;
      default:
        // error.message가 존재하면 fallback 메시지로 사용
        if (userError.message) {
          message = `에러: ${userError.message}`;
        }
    }
    const error = {
      status,
      message
    };

    return { error };
  }

  return { user };
};

export const getUserInfo = async () => {
  const { user } = await getSession();
  const supabase = createClient();

  // 초기값 선언
  let userId: UserInfo['id'] = '';
  let userInfo: UserInfo = initialUserInfo;

  const isLogin = !!user;

  if (user) {
    userId = user.id;

    // userId에 해당하는 유저 정보 가져오기
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();
    if (error) {
      console.error('Error fetching user data:', error.message);
    } else {
      userInfo = data;
    }
  }

  return { isLogin, userId, userInfo };
};

// 로그아웃 함수
export const signOut = async () => {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/home');
};
