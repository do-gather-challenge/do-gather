import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='mt-24'>
      HomePage
      <Link href="/sign-in" className="border-2 border-amber-700 p-4">
        로그인하러가기
      </Link>
      <Link href="/sign-up" className="border-2 border-amber-700 p-4">
        회원가입하러가기
      </Link>
    </div>
  );
};
export default HomePage;
