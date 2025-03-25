import { Challenge, ChallengeSnakeCase } from '@/types/challenge.type';

/**
 * 챌린지 데이터를 스네이크 케이스에서 카멜 케이스로 변환합니다.
 * @param {ChallengeSnakeCase} challenge - 스네이크 케이스 형식의 챌린지 데이터
 * @returns {Challenge} 카멜 케이스로 변환된 챌린지 객체
 */
export const transformChallengeData = (challenge: ChallengeSnakeCase): Challenge => ({
  id: challenge.id,
  createdAt: challenge.created_at,
  startDate: challenge.start_date,
  finishDate: challenge.finish_date,
  title: challenge.title,
  description: challenge.description,
  category: challenge.category,
  challengeImage: challenge.challenge_image,
  creatorId: challenge.creator_id,
  executeDays: challenge.execute_days,
  participantCount: challenge.participant_count
});

/**
 * 챌린지 배열을 스네이크 케이스에서 카멜 케이스로 변환합니다.
 * @param {ChallengeSnakeCase[]} challenges - 스네이크 케이스 형식의 챌린지 데이터 배열
 * @returns {Challenge[]} 카멜 케이스로 변환된 챌린지 객체 배열
 */
export const transformChallengeDataArray = (challenges: ChallengeSnakeCase[] | null): Challenge[] => {
  return challenges?.map(transformChallengeData) || [];
};

/**
 * startDate, finishDate의 형식을 바꿉니다.
 * @param {string} date - 기존 Date 형식의 문자열 ex)2025-03-01
 * @returns {string} 바뀐 문자열 ex)25.03.01
 */
export const transformDate = (date: string) => {
  return date.slice(2).replaceAll('-', '.');
};
