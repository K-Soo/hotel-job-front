import environment from "@/environment";

interface ISocialUrl {
  [index: string]: string;
}

export const SOCIAL_URL: ISocialUrl = {
  kakao: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${environment.kakaoClientId}&redirect_uri=${environment.kakaoRedirectUrl}`,
} as const;
