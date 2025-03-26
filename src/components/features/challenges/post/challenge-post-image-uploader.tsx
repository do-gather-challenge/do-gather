import { cn } from '@/lib/utils';
import { ChallengePostSetters } from '@/types/challenge-post.type';
import { ChallengePost } from '@/types/challenge.type';
import { UploadIcon } from 'lucide-react';
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
    <section className="flex flex-col items-center justify-center gap-3">
      <label
        htmlFor="image-upload"
        className="text-foreground hover:text-primary text-lg font-semibold transition-colors"
      >
        챌린지 이미지
      </label>

      {/* 이미지 업로드*/}
      <div
        className={cn(
          'group relative flex items-center justify-center rounded-lg border-2 border-dashed',
          'border-border hover:border-secondary hover:bg-accent/10',
          'cursor-pointer transition-colors duration-200',
          'h-[150px] w-[250px]'
        )}
        onClick={handleClick}
        role="button"
        aria-labelledby="image-upload-label"
      >
        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleFileChange}
          ref={inputRef}
        />

        {/* 미리보기 */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[calc(0.5rem-2px)]">
          {previewImage ? (
            <Image
              src={previewImage}
              alt="업로드된 챌린지 이미지"
              fill
              className="object-cover object-center"
              priority
            />
          ) : (
            <div className="flex flex-col items-center gap-2 p-4 text-center">
              <UploadIcon className="text-muted-foreground group-hover:text-secondary h-8 w-8" />
              <p className="text-muted-foreground group-hover:text-secondary">이미지를 업로드하세요</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChallengePostImageUploader;
