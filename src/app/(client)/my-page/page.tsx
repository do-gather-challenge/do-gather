'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyPageEditProfile from '../../../components/features/my-page/my-page-edit-profile';
import MyPageMyChallenge from '../../../components/features/my-page/my-page-my-challenge';

import type { TabType } from '@/types/my-page-type';

const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState<TabType>('profile');

  return (
    <section className="flex items-center justify-center">
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value as 'profile' | 'challenge')}
        className="mt-7 flex w-full flex-col items-center"
      >
        <TabsList className="mx-auto">
          <TabsTrigger value="profile" className="cursor-pointer">
            마이페이지
          </TabsTrigger>
          <TabsTrigger value="challenge" className="cursor-pointer">
            마이챌린지
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="flex w-full justify-center">
          <MyPageEditProfile setSelectedTab={setSelectedTab} />
        </TabsContent>
        <TabsContent value="challenge" className="flex w-full justify-center">
          <MyPageMyChallenge />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyPage;
