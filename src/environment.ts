const environment = {
  isLocal: process.env.NEXT_PUBLIC_APP_ENV === 'local',
  isDev: process.env.NEXT_PUBLIC_APP_ENV === 'development',
  isProd: process.env.NEXT_PUBLIC_APP_ENV === 'production',

  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  kakaoRedirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
  kakaoClientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
};

export default environment;
