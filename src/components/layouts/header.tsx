import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { getUserInfo, signOut } from '@/lib/api/user-Info.api';
import LOGO from '../../../public/images/logo.png';
import LOGO_HORIZONTAL from '../../../public/images/logo-horizontal.png';
import DEFAULT_PROFILE_IMAGE from '../../../public/images/default_profile.png';
import APP_URL from '@/constants/app-url.constant';

const Header = async () => {
  const { isLogin, userInfo } = await getUserInfo();

  return (
    <header className="bg-primary fixed top-0 z-10 flex h-15 w-full items-center justify-between px-20 md:h-20">
      <Link href={APP_URL.HOME}>
        <Image src={LOGO} alt="헤더 로고" className="h-auto w-14 object-contain md:hidden" />
        <Image src={LOGO_HORIZONTAL} alt="헤더 로고 가로형" className="hidden h-auto w-56 object-contain md:block" />
      </Link>

      <section className="flex items-center justify-center">
        {isLogin ? (
          <form action={signOut} className="flex">
            <Button type="submit" variant="secondary">
              로그아웃
            </Button>
          </form>
        ) : (
          <div className="flex gap-3">
            <Link href={APP_URL.SIGN_IN}>
              <Button variant="secondary">로그인</Button>
            </Link>
            <Link href={APP_URL.SIGN_UP}>
              <Button variant="secondary">회원가입</Button>
            </Link>
          </div>
        )}
        {/* shadcn avatar */}
        {isLogin && (
          <Link href={APP_URL.MY_PAGE}>
            <Avatar className="mr-3 ml-3">
              <AvatarImage
                src={userInfo.profile_image || DEFAULT_PROFILE_IMAGE.src}
                alt={`${userInfo.nickname} 이미지` || '게스트 이미지'}
              />
            </Avatar>
          </Link>
        )}
      </section>
    </header>
  );
};
export default Header;
