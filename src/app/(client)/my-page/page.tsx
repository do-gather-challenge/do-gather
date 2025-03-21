import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EditProfile from './components/EditProfile';
import MyChallenge from './components/MyChallenge';

const MyPage = () => {
  return (
    <div className="flex items-center justify-center">
      <Tabs defaultValue="profile" className="mt-30 flex w-full flex-col items-center">
        <TabsList className="mx-auto">
          <TabsTrigger value="profile">마이페이지</TabsTrigger>
          <TabsTrigger value="challenge">마이챌린지</TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="flex w-full justify-center">
          <EditProfile />
        </TabsContent>
        <TabsContent value="challenge" className="flex w-full justify-center">
          <MyChallenge />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyPage;
