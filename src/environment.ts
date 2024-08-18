const environment = {
  isProduction: process.env.NEXT_PUBLIC_IS_PRODUCTION === "true",
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  kakaoRedirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,

  kakaoClientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
};

export default environment;
