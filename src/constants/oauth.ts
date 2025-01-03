import environment from '@/environment';

export const url = {
  KAKAO_OAUTH_URL: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${environment.kakaoClientId}&redirect_uri=${environment.kakaoRedirectUrl}`,
};
