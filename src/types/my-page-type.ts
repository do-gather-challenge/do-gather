export type TabType = 'profile' | 'challenge';

/** 프로필 수정 */
export type MyPageEditProfileProps = {
  setSelectedTab: (tab: 'profile' | 'challenge') => void;
};

/** 마이 챌린지 */
export type MyChallengeAlias = 'Today' | '참여중' | '완료';

export type MyPageMyChallenges = {
  label: string;
  alias: MyChallengeAlias;
};
