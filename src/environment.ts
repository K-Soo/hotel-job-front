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

  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  vapiKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
};

export default environment;
