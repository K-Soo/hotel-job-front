const path = {
  HOME: '/', //홈

  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up', //기업 가입
  SIGN_UP_COMPLETE: '/sign-up/complete',

  LANDING_EMPLOYER: '/landing/employer', //랜딩 사업자

  RECRUIT: '/recruit', // 채용정보 메인 페이지
  RECRUIT_HOTEL: '/recruit/hotel', // 호텔 채용정보
  RECRUIT_PENSION: '/recruit/pension', // 펜션 채용정보
  RECRUIT_PART_TIME: '/recruit/part-time', // 알바 채용정보

  TALENT: '/talent', // 인재정보 메인 페이지
  TALENT_HOTEL: '/talent/hotel', // 호텔 인재정보
  TALENT_PENSION: '/talent/pension', // 펜션 인재정보
  TALENT_PART_TIME: '/talent/part-time', // 알바 or 파출부 인재정보

  SEARCH: '/search',

  CHECKOUT: '/checkout',

  SUPPORT_NOTICE: '/support/notice', //공지사항
  SUPPORT_FAQ: '/support/faq', //FAQ

  POLICY_TERMS: '/policy/terms', //서비스 이용약관
  POLICY__PRIVACY: '/policy/privacy', //개인정보 처리방침

  // USER
  USER: '/user', //마이페이지
  USER_RESUME_REGISTER: '/user/resume/register', // 이력서 등록
  USER_USER: '/user/profile', //프로필 페이지
  USER_POINT: '/user/point', //포인트

  // EMPLOYER
  EMPLOYER: '/employer', //기업 - 홈
  EMPLOYER_SETUP_COMPANY: '/employer/setup/company', //초기화 - 회사정보

  EMPLOYER_CANDIDATE: '/employer/candidate', //지원자
  EMPLOYER_SCHEDULE: '/employer/schedule', //일정

  EMPLOYER_RECRUITMENT: '/employer/recruitment', //채용 공고

  EMPLOYER_PRODUCT_MAIN: '/employer/product/main', //상품 메인광고
  EMPLOYER_PRODUCT_SECTION: '/employer/product/section', //상품 섹션광고
  EMPLOYER_PRODUCT_RESUME: '/employer/product/resume', //상품 이력서 열람
  EMPLOYER_PRODUCT_CHECKOUT: '/employer/product/checkout', //기업 - 결제

  EMPLOYER_ACCOUNT: '/employer/account', // 기업 - 계정 · 업체정보
  EMPLOYER_ACCOUNT_MARKETING: '/employer/account/marketing', // 기업 - 마케팅 수신 설정
  EMPLOYER_ACCOUNT_AUTHENTICATION: '/employer/account/authentication', // 기업 - 비밀번호 변경

  // ACCOUNT_RECOVER_RESET_SUCCESS: '/account/recover/reset/success', //비밀번호 찾기 결과
  // ACCOUNT_RECOVER_USER: '/account/recover/user', //이메일 찾기
  // ACCOUNT_RECOVER_RESET: '/account/recover/reset', //비밀번호 찾기
} as const;

export default path;

export const EXCLUDED_PATHS = ['/oauth/kakao/callback', '/oauth/google/callback', '/sign-in'];
