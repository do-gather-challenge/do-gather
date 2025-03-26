'use client';
/**
 * 마이페이지 프로필 수정 컴포넌트
 * @param {Object} props - 컴포넌트 프로퍼티
 * @param {Function} props.setSelectedTab - 탭 선택 핸들러
 */
import React, { useEffect, useRef, useState } from 'react';
import DEFAULT_IMAGE from '/public/images/default_profile.png';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import RoundedImage from '../ui/rounded-image';
import browserClient from '@/lib/supabase/client';
import { fetchUserNicknameById } from '@/lib/api/my-page-edit-profile.api';
import { generateFileName } from '@/lib/utils/post.util';
import { ErrorMessage } from '@/constants/error-message.constant';
import { FILES } from '@/constants/files.constant';
import { FETCH_MESSAGES } from '@/constants/challenge-post.constants';

type MyPageEditProfileProps = {
  setSelectedTab: (tab: 'profile' | 'challenge') => void;
};

const MyPageEditProfile = ({ setSelectedTab }: MyPageEditProfileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(DEFAULT_IMAGE.src);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState<string | null>(null);
  const [newNickname, setNewNickname] = useState<string>('');

  /** 기존 닉네임 및 프로필 이미지 불러오기 */
  useEffect(() => {
    const fetchProfileData = async () => {
      const { data, error } = await browserClient.auth.getUser();
      if (error || !data.user) return;

      const userNickname = await fetchUserNicknameById(data.user.id);
      setNickname(userNickname);
      setNewNickname(userNickname ?? '');

      // 기존 프로필 이미지 가져오기
      const { data: userData, error: userError } = await browserClient
        .from('users')
        .select('profile_image')
        .eq('id', data.user.id)
        .single();

      if (!userError && userData?.profile_image) {
        setPreviewImage(userData.profile_image);
      }
    };

    fetchProfileData();
  }, []);

  /** 이미지 파일 선택 핸들러 */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일 검증
      if (!FILES.ALLOWED_TYPES.includes(file.type)) return alert(FETCH_MESSAGES.IMAGE_TYPE_INVALID);

      if (file.size > FILES.MAX_SIZE) {
        alert(FETCH_MESSAGES.IMAGE_SIZE_TOO_LARGE);
        return;
      }

      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file)); // 미리보기 업데이트
    }
  };

  /** 닉네임 입력 핸들러 */
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
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

      if (uploadError) {
        console.error('이미지 업로드 실패:', uploadError);
        return alert('이미지 업로드에 실패했습니다.');
      }

      // 업로드된 이미지 URL 가져오기
      profileImageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/profile-images/${filePath}`;
    }

    // 닉네임 및 프로필 이미지 업데이트
    const { error: updateError } = await browserClient
      .from('users')
      .update({ nickname: newNickname, profile_image: profileImageUrl })
      .eq('id', data.user.id);

    if (updateError) {
      console.error('프로필 업데이트 실패:', updateError);
      alert('프로필 업데이트에 실패했습니다.');
    } else {
      alert('프로필이 성공적으로 업데이트되었습니다.');
      setNickname(newNickname);
    }
  };

  return (
    <section className="mt-5 flex w-full flex-col items-center sm:gap-10">
      <form className="flex flex-col items-center gap-3 sm:gap-5" onSubmit={handleSubmit}>
        {/* 프로필 이미지 */}
        <div onClick={() => inputRef.current?.click()} className="cursor-pointer">
          <RoundedImage
            src={previewImage}
            fallback="Profile"
            alt="Profile Image"
            className="mt-3 h-52 w-52 rounded-full sm:mt-5"
          />
        </div>
        <input type="file" accept="image/*" ref={inputRef} onChange={handleFileChange} className="hidden" />

        {/* 닉네임 입력 */}
        <div className="mt-3 flex w-60 flex-col gap-1 sm:mt-5 sm:w-80">
          <Label>Nickname</Label>
          <Input value={newNickname} onChange={handleNicknameChange} />
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

/** 챌린지 카운트 상수 (임시) */
const COUNT_TODAYS_CHALLENGE = 0;

/** 챌린지 데이터 */
const challenges = [
  { label: '오늘의 챌린지', count: COUNT_TODAYS_CHALLENGE },
  { label: '참여 중인 챌린지', count: COUNT_TODAYS_CHALLENGE },
  { label: '완료한 챌린지', count: COUNT_TODAYS_CHALLENGE }
];
