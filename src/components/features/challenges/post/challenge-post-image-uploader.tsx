import { ChallengePostSetters } from '@/types/challenge-post.type';
import { ChallengePost } from '@/types/challenge.type';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type ChallengePostImageUploaderProps = {
  setters: ChallengePostSetters;
  challenge: ChallengePost;
};

const ChallengePostImageUploader = ({ setters, challenge }: ChallengePostImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (challenge.challengeImage) {
      setPreviewImage(challenge.challengeImage);
    }
  }, [challenge.challengeImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setters.setChallengeImage(file);
      const newPreview = URL.createObjectURL(file);
      setPreviewImage(newPreview);
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
        <div className="bg-muted relative h-[140px] w-[240px] overflow-hidden rounded-lg">
          {previewImage ? (
            <Image
              src={previewImage}
              alt="미리보기 이미지"
              fill
              className="aspect-video w-full object-cover object-center"
            />
          ) : (
            <div className="bg-muted flex h-[140px] w-[240px] items-center justify-center">
              <p className="text-muted-foreground">이미지를 업로드하세요</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChallengePostImageUploader;
