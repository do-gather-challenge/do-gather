import Link from 'next/link';
import { Button } from '@/components/ui/button';
import default1 from '../../public/images/default1.jpeg';
import default2 from '../../public/images/default2.jpg';
import default3 from '../../public/images/default3.webp';
import logo from '../../public/images/logo.png';
import Image from 'next/image';

const RootPage = () => {
  return (
    <article className="bg-primary flex h-full flex-col items-center justify-center gap-2">
      <figure className="mt-10">
        <Image src={logo} alt="로고" width={80} height={80} />
      </figure>

      <h1 className="text-secondary mt-10 text-3xl font-bold">챌린지 함께하기</h1>
      <p className="text-secondary mb-10">혼자하면 어려운 도전, 함께해요!</p>

      <Link href={'/home'}>
        <Button variant="black">더 많은 챌린지 보기 ➡</Button>
      </Link>

      {/* 소개이미지 3장 */}
      <div className="mt-5 grid items-center justify-center px-20 transition-all duration-700 ease-in-out sm:grid-cols-1 sm:gap-5 md:grid-cols-3 md:gap-20">
        {instructions.map((item) => {
          return (
            <figure key={item.title} className="relative mb-10 h-52 w-52 overflow-hidden rounded-full">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
              <figcaption className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-bold text-white">
                {item.title}
              </figcaption>
            </figure>
          );
        })}
      </div>

      <footer className="flex w-full flex-col items-center justify-center bg-gray-100">
        <h1 className="mt-20 text-3xl font-semibold text-black">{FOOTER_TITLE}</h1>
        <p className="mt-20 mb-20 flex px-20 text-center whitespace-pre-line">{FOOTER_CONTENT}</p>
      </footer>
    </article>
  );
};

export default RootPage;

const instructions = [
  {
    image: default1,
    title: 'STUDY'
  },
  {
    image: default2,
    title: 'HEALTH'
  },
  {
    image: default3,
    title: 'ETC'
  }
];

const FOOTER_TITLE = 'DO GATHER 소개';
const FOOTER_CONTENT = `Do-Gather는 혼자서는 어려운 도전들을 함께하고, 
서로 격려하며 성공을 나누는 플랫폼입니다. 

사용자는 자신만의 챌린지를 만들고, 같은 목표를 가진 사람들과 함께 도전할 수 있습니다. 

매일 또는 자신이 설정한 요일에 맞춰 인증 버튼을 눌러 진행 상황을 기록하고, 
다른 사람들의 챌린지 완료 소식도 로그를 통해 확인할 수 있어요.

도전은 혼자보다는 함께하는 것이 훨씬 더 즐겁고 의미가 깊습니다. 
Do-Gather는 이 모든 과정을 함께할 수 있는 공간을 제공합니다. 여러분의 도전을 기록하고, 
다른 사람들의 성취를 응원하며, 함께 성장해 보세요.

혼자서 도전하는 것이 어려운 순간, Do-Gather에서 함께할 친구들을 만나보세요! 도전의 즐거움과 성취감을 함께 나누는 경험을 제공합니다.`;
