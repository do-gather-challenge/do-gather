import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

const useCloseModal = () => {
  const router = useRouter();
  const backdropRef = useRef(null);
  const handleCloseModal = useCallback(() => {
    router.back();
  }, [router]);

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
  }, [handleCloseModal]);

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
  }, [handleCloseModal]);

  return { backdropRef, handleCloseModal };
};

export default useCloseModal;
