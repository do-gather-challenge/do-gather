export type UserInfo = {
  id: string;
  created_at: string;
  nickname: string;
  profile_image: string | null;
  email: string;
};

export type User = {
  id: string;
  createdAt: string;
  email: string;
  nickname: string;
  profileImage: string | null;
};
