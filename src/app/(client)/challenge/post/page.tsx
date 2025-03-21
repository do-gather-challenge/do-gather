'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Input = dynamic(() => import('@/components/ui/input').then((mod) => mod.Input), { ssr: false });
const Textarea = dynamic(() => import('@/components/ui/textarea').then((mod) => mod.Textarea), { ssr: false });

const PostPage = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleDayClick = (day: string) => {
    setSelectedDays((prev) => (prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]));
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="mx-auto mt-[100px] mb-6 max-w-[320px] bg-white p-6 md:max-w-[640px]">
      <h1 className="mb-6 text-2xl font-bold">챌린지 생성</h1>

      {/* 제목 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 제목</h2>
        <Input
          type="text"
          placeholder="챌린지 제목을 입력해 주세요(30자 이내)"
          className="w-[260px] text-[14px] md:w-[580px]"
        />
      </section>

      {/* 소개 */}
      <section className="mb-6">
        <h2 className="mb-2 text-lg font-semibold">챌린지 소개</h2>
        <Textarea
          placeholder="챌린지에 대한 소개를 구체적으로 적어주세요(500자 이내)"
          className="w-[260px] text-[14px] md:w-[580px]"
          rows={4}
        />
      </section>

      <section className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          {/* 반복 일정 */}
          <section className="mb-6">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="mb-2 text-lg font-semibold">반복 일정</h2>
              <div>
                <input type="checkbox" id="every-day" className="mr-2" />
                <label htmlFor="every-day" className="mr-6">
                  매일
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              {['월', '화', '수', '목', '금', '토', '일'].map((day) => (
                <button
                  key={day}
                  type="button"
                  className={`h-[32px] w-[32px] rounded-full border ${
                    selectedDays.includes(day)
                      ? 'bg-primary border-red-700' // 선택된 상태
                      : 'border-border hover:bg-primary hover:border-red-700' // 기본 상태 + 호버 효과
                  }`}
                  onClick={() => handleDayClick(day)}
                >
                  {day}
                </button>
              ))}
            </div>
          </section>

          {/* 유형 */}
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">챌린지 유형</h2>
            <div className="grid grid-cols-3 gap-2">
              {['운동', '학습', '예술', '소비', '기타'].map((category) => (
                <button
                  key={category}
                  type="button"
                  className={`h-[28px] w-[56px] rounded-full ${
                    selectedCategory === category
                      ? 'border border-red-700' // 선택된 상태
                      : 'bg-muted hover:border hover:border-red-700' // 기본 상태 + 호버 효과
                  }`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </section>

          {/* 시작/종료 날짜 */}
          <section className="mb-6">
            <h2 className="mb-2 text-lg font-semibold">시작/종료 날짜</h2>
            <div className="flex gap-1">
              <input type="date" className="border-border h-[24px] w-[124px] rounded-md border" />
              <span>~</span>
              <input type="date" className="border-border h-[24px] w-[124px] rounded-md border" />
            </div>
          </section>
        </div>

        {/* 이미지 업로드 */}
        <section>
          <h2 className="mb-2 text-lg font-semibold">챌린지 이미지</h2>
          <div className="border-border flex items-center justify-center rounded-lg border-1 border-dashed p-1">
            <input type="file" accept="image/*" className="hidden" id="image-upload" />
            <label htmlFor="image-upload" className="cursor-pointer text-center">
              <div className="bg-muted flex h-[140px] w-[240px] items-center justify-center">
                <p className="text-muted-foreground">이미지를 업로드하세요</p>
              </div>
            </label>
          </div>
        </section>
      </section>

      {/* 버튼 */}
      <div className="flex justify-center gap-6">
        <button
          type="button"
          className="bg-secondary hover:bg-secondary-foreground h-[40px] w-[84px] rounded-md px-4 py-2 text-[12px] text-white"
        >
          뒤로가기
        </button>
        <button
          type="button"
          className="bg-secondary hover:bg-secondary-foreground h-[40px] w-[84px] rounded-md px-4 py-2 text-[12px] text-white"
        >
          챌린지생성
        </button>
      </div>
    </div>
  );
};

export default PostPage;
