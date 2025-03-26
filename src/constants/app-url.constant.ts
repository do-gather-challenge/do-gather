const APP_URL = {
  HOME: '/home',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  CHALLENGES: '/challenges',
  CHALLENGES_ID: (challengeId: number) => `/challenges/${challengeId}`,
  CHALLENGES_POST: '/challenges/post',
  CHALLENGES_POST_ID: (challengeId: number) => `/challenges/post/${challengeId}`,
  MY_PAGE: '/my-page'
};

export default APP_URL;
