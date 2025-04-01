const path = {
  HOME: '/', //홈

  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up', //기업 가입
  SIGN_UP_COMPLETE: '/sign-up/complete',

  RECOVER: '/recover',
  RECOVER_ACCOUNT: '/recover/account', // 아이디 찾기
  RECOVER_RESET: '/recover/reset', // 비밀번호 찾기

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

  POLICY_TERMS: '/policy/terms', //서비스 이용약관
  POLICY__PRIVACY: '/policy/privacy', //개인정보 처리방침

  HELP__NOTICE: '/help/notice',
  HELP__FAQ: '/help/faq',

  // USER
  USER: '/user', //마이페이지
  USER_RESUME: '/user/resume', // 이력서 목록
  USER_APPLICATION_HISTORY: '/user/application/history', // 채용공고 지원현황
  USER_RESUME_REGISTER: '/user/resume/register', // 이력서 등록
  USER_PROFILE: '/user/profile', //프로필 페이지
  USER_POINT: '/user/point', //포인트
  USER_BOOKMARK: '/user/bookmark', //북마크

  // EMPLOYER
  EMPLOYER: '/employer', //기업 - 홈
  EMPLOYER_SETUP_COMPANY: '/employer/setup/company', //초기화 - 회사정보

  EMPLOYER_BUSINESS: '/employer/business', //업체정보

  EMPLOYER_RECRUITMENT: '/employer/recruitment', //채용공고
  EMPLOYER_RECRUITMENT_REGISTER: '/employer/recruitment/register', //채용공고 생성

  EMPLOYER_PRODUCT_RECRUITMENT: '/employer/product/recruitment', //상품
  EMPLOYER_PRODUCT_RESUME: '/employer/product/resume', //상품 이력서 열람
  EMPLOYER_CHECKOUT_RECRUITMENT: '/employer/checkout/recruitment', //기업 - 채용공고 결제

  EMPLOYER_PAYMENT: '/employer/payment', // 상품결제내역
  EMPLOYER_POINT: '/employer/point', // 포인트
  EMPLOYER_COUPON: '/employer/coupon', // 쿠폰

  EMPLOYER_ACCOUNT: '/employer/account', // 계정 · 업체정보
  EMPLOYER_ACCOUNT_NOTIFICATION: '/employer/account/notification', // 알림설정
  EMPLOYER_ACCOUNT_RESET: '/employer/account/reset', // 비밀번호 변경
  EMPLOYER_ACCOUNT_WITHDRAW: '/employer/account/withdraw', // 사업자 회원탈퇴

  // ACCOUNT_RECOVER_RESET_SUCCESS: '/account/recover/reset/success', //비밀번호 찾기 결과
  // ACCOUNT_RECOVER_USER: '/account/recover/user', //이메일 찾기
  // ACCOUNT_RECOVER_RESET: '/account/recover/reset', //비밀번호 찾기
} as const;

export default path;
