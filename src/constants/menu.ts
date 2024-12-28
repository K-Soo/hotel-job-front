import path from '@/constants/path';

export const GENERAL_ASIDE_MENU = [
  { label: 'MY홈', value: '/user', items: [], icon: 'Home24x24' },
  {
    label: '회원정보',
    value: '',
    items: [
      { label: '회원정보 수정', value: '/user/profile' },
      { label: '메일 수신 설정', value: '/user/email' },
    ],
  },
  {
    label: '이력서',
    value: '/resume',
    items: [
      { label: '이력서 목록', value: '/user/resume' },
      { label: '이력서 등록', value: path.USER_RESUME_REGISTER },
    ],
  },
  { label: '스크랩', value: '/user/scrap', items: [] },
  { label: '받은제안', value: '/user/offers', items: [] },
  { label: '결제내역', value: '/user/payments', items: [] },
];

export const EMPLOYER_ASIDE_MENU = [
  { label: '홈', value: path.EMPLOYER, items: [], icon: 'Home24x24' },

  {
    label: '업체정보 관리',
    value: '',
    icon: 'Buildings24x24',
    items: [],
  },

  {
    label: '지원자 · 공고 관리',
    value: '',
    icon: 'UserRounded24x24',
    items: [
      { label: '공고 목록', value: path.EMPLOYER_CANDIDATE },
      { label: '지원자 관리', value: path.EMPLOYER_CANDIDATE },
      { label: '일정 관리', value: path.EMPLOYER_CANDIDATE },
    ],
  },

  {
    label: '채용상품',
    value: '',
    icon: 'Shop24x24',
    items: [
      { label: '메인 광고', value: path.EMPLOYER_PRODUCT_MAIN },
      { label: '지면 광고', value: path.EMPLOYER_PRODUCT_SECTION },
      { label: '이력서 열람', value: path.EMPLOYER_PRODUCT_RESUME },
    ],
  },

  {
    label: '상품 · 결제관리',
    value: '',
    icon: 'Card24x24',
    items: [
      { label: '상품이용 내역', value: path.EMPLOYER },
      { label: '결제내역', value: path.EMPLOYER },
      { label: '쿠폰', value: path.EMPLOYER },
      { label: '포인트', value: path.EMPLOYER },
    ],
  },

  {
    label: '알림설정',
    value: '',
    icon: 'SolarBell24x24',
    items: [],
  },

  {
    label: '문의',
    value: '',
    icon: 'Question24x24',
    items: [],
  },

  {
    label: '계정설정',
    value: '',
    icon: 'Settings24x24',
    items: [
      { label: '계정정보', value: path.EMPLOYER_ACCOUNT },
      { label: '마케팅 수신 설정', value: path.EMPLOYER_ACCOUNT_MARKETING },
      { label: '비밀번호 변경', value: path.EMPLOYER_ACCOUNT_AUTHENTICATION },
    ],
  },

  {
    label: '로그아웃',
    value: '',
    icon: 'Logout24x24',
    items: [],
  },
];
