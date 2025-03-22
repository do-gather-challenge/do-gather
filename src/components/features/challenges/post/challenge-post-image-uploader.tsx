type ImageUploaderProps = {
  onUploadImage: (file: File) => void;
};

const ChallengePostImageUploader = ({ onUploadImage }: ImageUploaderProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUploadImage(e.target.files[0]);
    }
  };

  return (
    <section>
      <label className="mb-2 text-lg font-semibold" htmlFor="image-upload">
        챌린지 이미지
      </label>
      <div className="border-border flex items-center justify-center rounded-lg border-1 border-dashed p-1">
        <input type="file" accept="image/*" className="hidden" id="image-upload" onChange={handleChange} />
        <label htmlFor="image-upload" className="cursor-pointer text-center">
          <div className="bg-muted flex h-[140px] w-[240px] items-center justify-center">
            <p className="text-muted-foreground">이미지를 업로드하세요</p>
          </div>
        </label>
      </div>
    </section>
  );
};

export default ChallengePostImageUploader;
