const environment = {
  isLocal: process.env.NEXT_PUBLIC_APP_ENV === 'local',
  isDev: process.env.NEXT_PUBLIC_APP_ENV === 'development',
  isProd: process.env.NEXT_PUBLIC_APP_ENV === 'production',

  baseUrl: process.env.NEXT_PUBLIC_BASE_URL!,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,

  cryptoKey: process.env.NEXT_PUBLIC_CRYPTO_KEY!,

  kakaoClientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
  kakaoRedirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,
  kakaoJavascriptKKey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,

  googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  googleRedirectUrl: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,

  nationTextServiceKey: process.env.NEXT_PUBLIC_NATIONAL_TAX_SERVICE_KEY!,
  nationBusinessUrl: process.env.NEXT_PUBLIC_NATIONAL_BUSINESS_URL!,

  test: process.env.TEST,
};

export default environment;
