import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { getUserInfo, signOut } from '@/lib/api/user-Info.api';
import LOGO_HORIZONTAL from '../../../public/images/logo-horizontal.png';
import DEFAULT_PROFILE_IMAGE from '../../../public/images/default_profile.png';

const Header = async () => {
  const { isLogin, userInfo } = await getUserInfo();

  return (
    //헤더 부분에 z-10 만으로도 shadcn 캐러셀 위로 배치 가능
    <header className="bg-primary fixed top-0 z-10 flex h-15 w-full items-center justify-between px-20 md:h-20">
      <Link href="/home">
        <Image src={LOGO_HORIZONTAL} alt="헤더 로고 이미지" className="ml-3 h-auto w-[55%] object-contain" />
      </Link>

      <section className="flex items-center justify-center">
        {isLogin ? (
          <form action={signOut} className="flex gap-3">
            <Button type="submit" variant={'secondary'}>
              로그아웃
            </Button>
          </form>
        ) : (
          <div className="flex gap-3">
            <Link href="/sign-in">
              <Button variant={'secondary'}>로그인</Button>
            </Link>
            <Link href="/sign-up">
              <Button variant={'secondary'}>회원가입</Button>
            </Link>
          </div>
        )}
        {/* shadcn avatar */}
        {isLogin && (
          <Link href="/my-page">
            <Avatar className="mr-3 ml-3">
              <AvatarImage
                src={userInfo.profile_image || DEFAULT_PROFILE_IMAGE.src}
                alt={userInfo.nickname || '게스트'}
              />
              <AvatarFallback>{userInfo.nickname.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </Link>
        )}
      </section>
    </header>
  );
};
export default Header;
