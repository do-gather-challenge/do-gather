import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const useCloseModal = () => {
  const router = useRouter();
  const backdropRef = useRef(null);
  const handleCloseModal = () => {
    router.back();
  };
  // ESC 누를 시 모달 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  // 백드롭 영역 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (backdropRef.current && event.target === backdropRef.current) {
        handleCloseModal();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [router]);

  return { backdropRef, handleCloseModal };
};

export default useCloseModal;
