import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProfile from './components/EditProfile';
import MyChallenge from './components/MyChallenge';

const MyPage = () => {
  return (
    <Tabs defaultValue="profile" className="mt-30 flex w-full items-center">
      <TabsList>
        <TabsTrigger value="profile">마이페이지</TabsTrigger>
        <TabsTrigger value="challenge">마이챌린지</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <EditProfile />
      </TabsContent>
      <TabsContent value="challenge">
        <MyChallenge />
      </TabsContent>
    </Tabs>
  );
};

export default MyPage;
