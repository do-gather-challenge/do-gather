import {
  ChallengeLog,
  ChallengeLogSnakeCase,
  ChallengeLogWithUser,
  ChallengeLogWithUserSnakeCase
} from '@/types/challenge-log.type';
import { Challenge, ChallengeSnakeCase } from '@/types/challenge.type';
import { User, UserInfo } from '@/types/user-info.types';

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
 * @param {ChallengeSnakeCase[] | null} challenges - 스네이크 케이스 형식의 챌린지 데이터 배열
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

/**
 * 스네이크 케이스 형식의 사용자 정보를 카멜 케이스 형식으로 변환합니다.
 *
 * @param {UserInfo} user - 변환할 스네이크 케이스 형식의 사용자 정보
 * @returns {User} 카멜 케이스 형식으로 변환된 사용자 정보
 */
export const transformUserData = (user: UserInfo): User => ({
  id: user.id,
  createdAt: user.created_at,
  email: user.email,
  nickname: user.nickname,
  profileImage: user.profile_image
});

/**
 * 스네이크 케이스 형식의 챌린지 로그를 카멜 케이스 형식으로 변환합니다.
 *
 * @param {ChallengeLogSnakeCase} log - 변환할 스네이크 케이스 형식의 챌린지 로그
 * @returns {ChallengeLog} 카멜 케이스 형식으로 변환된 챌린지 로그 (날짜 정보 포함)
 */
export const transformChallengeLogData = (log: ChallengeLogSnakeCase): ChallengeLog => ({
  id: log.id,
  userId: log.user_id,
  challengeId: log.challenge_id,
  status: log.status,
  createdAt: log.created_at,
  date: log.created_at.split('T')[0]
});

/**
 * 사용자 정보를 포함한 챌린지 로그를 카멜 케이스 형식으로 변환합니다.
 *
 * @param {ChallengeLogWithUserSnakeCase} log - 사용자 정보를 포함한 스네이크 케이스 형식의 챌린지 로그
 * @returns {ChallengeLogWithUser} 카멜 케이스 형식으로 변환된 사용자 정보가 포함된 챌린지 로그
 */
export const transformChallengeLogWithUserData = (log: ChallengeLogWithUserSnakeCase): ChallengeLogWithUser => ({
  ...transformChallengeLogData(log),
  user: transformUserData(log.users)
});

/**
 * 사용자 정보를 포함한 챌린지 로그 배열을 카멜 케이스 형식으로 변환합니다.
 *
 * @param {ChallengeLogWithUserSnakeCase[] | null} logs - 변환할 스네이크 케이스 형식의 챌린지 로그 배열 또는 null
 * @returns {ChallengeLogWithUser[]} 카멜 케이스 형식으로 변환된 사용자 정보가 포함된 챌린지 로그 배열
 */
export const transformChallengeLogDataArray = (
  logs: ChallengeLogWithUserSnakeCase[] | null
): ChallengeLogWithUser[] => {
  return logs?.map(transformChallengeLogWithUserData) || [];
};
