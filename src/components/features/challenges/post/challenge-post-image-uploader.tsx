'use client';

import { ChallengePostSetters } from '@/lib/hooks/use-challenge-form';
import Image from 'next/image';
import { useRef, useState } from 'react';

type ChallengePostImageUploaderProps = {
  setters: ChallengePostSetters;
};

const ChallengePostImageUploader = ({ setters }: ChallengePostImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setters.setChallengeImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <section className="flex flex-col items-center justify-center gap-2">
      <label className="text-lg font-semibold" htmlFor="image-upload">
        챌린지 이미지
      </label>
      <div
        className="border-border flex items-center justify-center rounded-lg border-1 border-dashed p-1 hover:cursor-pointer"
        onClick={handleClick}
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleFileChange}
          ref={inputRef}
        />
        {previewImage ? (
          <Image
            src={previewImage}
            alt="미리보기 이미지"
            width={240}
            height={140}
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="bg-muted flex h-[140px] w-[240px] items-center justify-center">
            <p className="text-muted-foreground">이미지를 업로드하세요</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ChallengePostImageUploader;
