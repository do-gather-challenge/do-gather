import Image from 'next/image';
import LOADING_SPINNER from '../../../public/images/loading-spinner.svg';

const LoadingSkeleton = () => {
  return (
    <div className="bg-primary flex h-screen flex-col items-center justify-center gap-2">
      <Image src={LOADING_SPINNER} alt="로딩 스피너 이미지" height={100} width={100} />
      <strong>Please wait...</strong>
    </div>
  );
};

export default LoadingSkeleton;
