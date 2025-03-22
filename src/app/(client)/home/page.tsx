import Link from 'next/link';


/**
 * 로그인 test를 하기 위해 임시로 Link를 생성하였습니다.
 * 
 */
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
