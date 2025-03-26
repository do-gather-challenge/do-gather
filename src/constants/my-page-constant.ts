import { MyPageMyChallenges } from '@/types/my-page-type';
import MyPageMyTodaysCompletedChallenges from '@/components/my-page/my-page-my-challenges-completions-today';
import MyPageMyCompletedChallenges from '@/components/my-page/my-page-my-completed-challenges';
import MyPageMyInProgressChallenges from '@/components/my-page/my-page-my-in-progress-challenges';

/** 마이챌린지 */
export const MY_PAGE_MY_CHALLENGES_CATEGORY: MyPageMyChallenges[] = [
  { label: '오늘 인증한 챌린지', alias: 'Today' },
  { label: '참여 중인 챌린지', alias: '참여중' },
  { label: '완료한 챌린지', alias: '완료' }
] as const;

export const MY_PAGE_MY_CHALLENGES_COMPONENTS = {
  Today: {
    title: '오늘 인증한 챌린지',
    Component: MyPageMyTodaysCompletedChallenges
  },
  참여중: {
    title: '참여 중인 챌린지',
    Component: MyPageMyInProgressChallenges
  },
  완료: {
    title: '완료한 챌린지',
    Component: MyPageMyCompletedChallenges
  }
} as const;

export const TOAST_MESSAGES = {
  SUCCESS_PROFILE_UPDATE: '프로필이 성공적으로 업데이트되었습니다.'
};
