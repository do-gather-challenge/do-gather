import URL from '@/constants/app-url.constant';
import Link from 'next/link';

const authMode = {
  login: {
    title: '가입하기',
    description: '계정이 없으신가요?',
    url: URL.SIGN_UP
  },
  signUp: {
    title: '로그인하기',
    description: '이미 계정이 있으신가요?',
    url: URL.SIGN_IN
  }
};

type AuthToggleLinkProps = keyof typeof authMode;

const AuthToggleLink = ({ mode }: { mode: AuthToggleLinkProps }) => {
  return (
    <div className="flex justify-center gap-4">
      <span>{authMode[mode].description}</span>
      <Link href={authMode[mode].url} className="text-blue hover:scale-105 hover:underline">
        {authMode[mode].title}
      </Link>
    </div>
  );
};

export default AuthToggleLink;
