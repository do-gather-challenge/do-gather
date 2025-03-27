import APP_URL from '@/constants/app-url.constant';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-primary-foreground text-secondary flex h-screen w-full flex-col items-center justify-center">
      <div className="mb-2 text-6xl font-bold tracking-widest">404</div>
      <div className="mb-4">페이지를 찾을 수 없습니다</div>
      <Link
        href={APP_URL.HOME}
        className="bg-secondary hover:bg-secondary-foreground active:bg-secondary-foreground rounded-md px-4 py-3 leading-none font-semibold text-white"
      >
        메인 화면으로 돌아가기
      </Link>
    </div>
  );
}
