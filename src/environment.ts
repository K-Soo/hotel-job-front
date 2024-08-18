const environment = {
  isProduction: process.env.NEXT_PUBLIC_IS_PRODUCTION === "true",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  kakaoRedirectUrl: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URL,

  kakaoClientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
};

export default environment;
