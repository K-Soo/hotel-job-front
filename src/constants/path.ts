const path = {
  HOME: "/", //홈

  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up", //기업 가입
  SIGN_UP_COMPLETE: "/sign-up/complete",

  RECRUIT: "/recruit", // 채용정보 메인 페이지
  RECRUIT_HOTEL: "/recruit/hotel", // 호텔 채용정보
  RECRUIT_PENSION: "/recruit/pension", // 펜션 인재정보
  RECRUIT_PART_TIME: "/recruit/part-time", // 알바 채용정보

  TALENT: "/talent", // 인재정보 메인 페이지
  TALENT_HOTEL: "/talent/hotel", // 호텔 인재정보
  TALENT_PENSION: "/talent/pension", // 펜션 인재정보
  TALENT_PART_TIME: "/talent/part-time", // 알바 or 파출부 인재정보

  SEARCH: "/search",

  CHECKOUT: "/checkout",

  ACCOUNT: "/account", //내 정보

  SERVICE_QNA: "/account/qna", //1:1문의
  SERVICE_QNA_CREATE: "/account/qna/create", //1:1문의 등록

  SERVICE_LAUNCHING: "/service/launching", //입점/제휴 문의
  SERVICE_NOTICE: "/service/notice", //공지사항
  SERVICE_FAQ: "/service/faq", //FAQ

  SERVICE_TERMS_AGREEMENT: "/service/terms/agreement", //이용약관
  SERVICE_TERMS_PRIVACY: "/service/terms/privacy", //개인 정보 취급방침

  ACCOUNT_RECOVER_USER: "/account/recover/user", //이메일 찾기
  ACCOUNT_RECOVER_RESET: "/account/recover/reset", //비밀번호 찾기
  ACCOUNT_RECOVER_RESET_SUCCESS: "/account/recover/reset/success", //비밀번호 찾기 결과

  ACCOUNT_POINT: "/account/point", //포인트
  ACCOUNT_USER: "/account/user", //회원정보 수정
} as const;

export default path;
