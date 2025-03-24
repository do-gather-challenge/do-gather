import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MyPageEditProfile from '../../../components/my-page/my-page-edit-profile';
import MyPageMyChallenge from '../../../components/my-page/my-page-my-challenge';

const MyPage = () => {
  return (
    <section className="flex items-center justify-center">
      <Tabs defaultValue="profile" className="mt-10 flex w-full flex-col items-center">
        <TabsList className="mx-auto">
          <TabsTrigger value="profile">마이페이지</TabsTrigger>
          <TabsTrigger value="challenge">마이챌린지</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="flex w-full justify-center">
          <MyPageEditProfile />
        </TabsContent>
        <TabsContent value="challenge" className="flex w-full justify-center">
          <MyPageMyChallenge />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default MyPage;
