import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { getUserInfo, signOut } from '@/lib/api/user-Info.api';
import LOGO_HORIZONTAL from '../../../public/images/logo-horizontal.png';
import DEFAULT_PROFILE_IMAGE from '../../../public/images/default_profile.png';

const Header = async () => {
  const { isLogin, userInfo } = await getUserInfo();

  return (
    <header className="bg-primary fixed top-0 z-10 flex h-15 w-full items-center justify-between px-20 md:h-20">
      <Link href="/home">
        <Image src={LOGO_HORIZONTAL} alt="헤더 로고 이미지" className="ml-3 h-auto w-[55%] object-contain" />
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
            <Link href="/sign-in">
              <Button variant="secondary">로그인</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="secondary">회원가입</Button>
            </Link>
          </div>
        )}
        {/* shadcn avatar */}
        {isLogin && (
          <Link href="/my-page">
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
