import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { getUserInfo } from '@/lib/api/user-Info.api';
import LOGO_HORIZONTAL from '../../../public/images/logo-horizontal.png';

const Header = async () => {
  const { isLogin, userInfo } = await getUserInfo();
  console.log(userInfo);
  return (
    //헤더부분에 z-10 만으로도 shadcn 캐러셀 위로 배치 가능
    <header className="bg-primary fixed top-0 z-10 flex h-15 w-full items-center justify-around md:h-20">
      <Link href="/">
        <Image src={LOGO_HORIZONTAL} alt="헤더 로고 이미지" height={50} width={100} />
      </Link>

      <section className="flex items-center justify-center">
        {`로그인 상태 isLogin 값 ==> ${isLogin}`}
        {isLogin ? (
          <div className="flex gap-3">
            <Button variant={'secondary'}>로그아웃</Button>
          </div>
        ) : (
          <div>
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
          <figure className="ml-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt={userInfo.nickname} />
            </Avatar>
          </figure>
        )}
      </section>
    </header>
  );
};
export default Header;
