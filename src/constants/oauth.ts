import environment from '@/environment';

export const url = {
  KAKAO: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${environment.kakaoClientId}&redirect_uri=${environment.kakaoRedirectUrl}`,

  GOOGLE: `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${environment.googleClientId}&redirect_uri=${environment.googleRedirectUrl}&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`,
} as const;
