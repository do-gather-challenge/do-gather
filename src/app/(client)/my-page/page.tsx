import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MyPage = () => {
  return (
    <Tabs defaultValue="profile" className="mt-30 flex w-full items-center">
      <TabsList>
        <TabsTrigger value="profile">마이페이지</TabsTrigger>
        <TabsTrigger value="challenge">마이챌린지</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">마이페이지 내용</TabsContent>
      <TabsContent value="challenge">마이챌린지 내용</TabsContent>
    </Tabs>
  );
};

export default MyPage;
