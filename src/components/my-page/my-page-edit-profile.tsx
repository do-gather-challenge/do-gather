'use client';
/**
 * 마이페이지 프로필 수정 컴포넌트
 * @param {Object} props - 컴포넌트 프로퍼티
 * @param {Function} props.setSelectedTab - 탭 선택 핸들러
 */
import React, { useEffect, useRef, useState } from 'react';
import browserClient from '@/lib/supabase/client';
import Link from 'next/link';
import Image from 'next/image';
import DEFAULT_IMAGE from '/public/images/default_profile.png';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import { generateFileName } from '@/lib/utils/post.util';
import { ErrorMessage } from '@/constants/error-message.constant';
import { FILES } from '@/constants/files.constant';
import { FETCH_MESSAGES } from '@/constants/challenge-post.constants';
import { getUserInfo } from '@/lib/api/user-Info.api';
import { TOAST_MESSAGES } from '@/constants/my-page-constant';

import type { MyPageEditProfileProps } from '@/types/my-page-type';
import { useGetMyCompletedChallengesQuery } from '@/lib/queries/use-get-my-completed-challenges-query';
import { useGetMyInProgressChallengesQuery } from '@/lib/queries/use-get-my-in-progress-challenges-query';
import { useGetMyChallengesCompletionsTodayQuery } from '@/lib/queries/use-get-my-challenges-completions-today-query';

const MyPageEditProfile = ({ setSelectedTab }: MyPageEditProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(DEFAULT_IMAGE.src);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState<string>('nickname');
  const inputRef = useRef<HTMLInputElement>(null);

  /** 기존 닉네임 및 프로필 이미지 불러오기 */
  useEffect(() => {
    setIsLoading(true);
    getUserInfo()
      .then((data) => {
        const { nickname, profile_image } = data.userInfo;
        setNickname(nickname);
        setPreviewImage(profile_image || '');
      })
      .finally(() => setIsLoading(false));
  }, []);

  /** 마이 챌린지 현황 count 불러오기  */
  const { total: countToday } = useGetMyChallengesCompletionsTodayQuery();
  const { countInProgress } = useGetMyInProgressChallengesQuery();
  const { countCompleted } = useGetMyCompletedChallengesQuery();
  const challenges = [
    { label: '오늘의 챌린지', count: countToday },
    { label: '참여 중인 챌린지', count: countInProgress },
    { label: '완료한 챌린지', count: countCompleted }
  ];

  /** 이미지 파일 선택 핸들러 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // 파일 검증
      if (!FILES.ALLOWED_TYPES.includes(file.type)) return alert(FETCH_MESSAGES.IMAGE_TYPE_INVALID);
      if (file.size > FILES.MAX_SIZE) return alert(FETCH_MESSAGES.IMAGE_SIZE_TOO_LARGE);

      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // 미리보기 업데이트
    }
  };

  /** 닉네임 입력 핸들러 */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  /** 프로필 업데이트 핸들러 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await browserClient.auth.getUser();
    if (error || !data.user) return alert(ErrorMessage.NOT_AUTHENTICATED);

    let profileImageUrl = previewImage;

    // 새 이미지가 선택되었으면 업로드 처리
    if (selectedFile) {
      const filePath = generateFileName(selectedFile);
      const { error: uploadError } = await browserClient.storage
        .from('profile-images')
        .upload(filePath, selectedFile, { upsert: true });

      if (uploadError) return alert(ErrorMessage.NOT_UPDATED_PROFILE_IMAGE);
      profileImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${filePath}`;
    }

    // 닉네임 및 프로필 이미지 업데이트
    const { error: updateError } = await browserClient
      .from('users')
      .update({ nickname: nickname, profile_image: profileImageUrl })
      .eq('id', data.user.id);

    if (updateError) return alert(ErrorMessage.NOT_UPDATED_PROFILE);
    alert(TOAST_MESSAGES.SUCCESS_PROFILE_UPDATE);
    setNickname(nickname);
  };

  if (isLoading) return;

  return (
    <section className="mt-3 flex w-full flex-col items-center sm:gap-10">
      <form className="flex flex-col items-center gap-3 sm:gap-5" onSubmit={handleSubmit}>
        {/* 프로필 이미지 */}
        <div onClick={() => inputRef.current?.click()} className="cursor-pointer">
          <Image
            src={previewImage || DEFAULT_IMAGE}
            alt="profile Image"
            width={200}
            height={200}
            className="mt-3 rounded-full sm:mt-5"
            priority
          />
        </div>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />

        {/* 닉네임 입력 */}
        <div className="mt-3 flex w-60 flex-col gap-1 sm:mt-5 sm:w-80">
          <Label>Nickname</Label>
          <Input value={nickname} onChange={handleNicknameChange} />
        </div>

        {/* 제출 버튼 */}
        <Button variant="secondary" className="w-60" type="submit">
          프로필 수정하기
        </Button>
      </form>

      {/* 챌린지 네비게이션 */}
      <nav className="mt-5 flex flex-col gap-2 sm:flex-row sm:gap-15">
        {challenges.map((challenge, index) => (
          <Link
            key={index}
            href="#"
            onClick={() => setSelectedTab('challenge')}
            className="bg-primary hover:bg-primary-foreground flex w-60 items-center justify-between rounded-md p-5 text-sm transition-all hover:text-black/50 sm:h-12"
          >
            <p>{challenge.label}</p>
            <p className="font-bold">{challenge.count}</p>
          </Link>
        ))}
      </nav>
    </section>
  );
};

export default MyPageEditProfile;
