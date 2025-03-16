import path from '@/constants/path';

export const GENERAL_ASIDE_MENU = [
  { label: 'MY홈', value: '/user', items: [], icon: 'Home24x24' },
  {
    label: '이력서',
    value: path.USER_RESUME,
    items: [],
  },
  {
    label: '지원현황',
    value: path.USER_APPLICATION_HISTORY,
    items: [],
  },
  // { label: '북마크', value: path.USER_BOOKMARK, items: [] },
  // { label: '받은제안', value: '/user/offer', items: [] },
  // { label: '결제내역', value: '/user/payment', items: [] },
  {
    label: '회원정보',
    value: path.USER_PROFILE,
    items: [],
  },
];

export const EMPLOYER_ASIDE_MENU = [
  { label: '대시보드', value: path.EMPLOYER, items: [], icon: 'Widget24x24' },

  {
    label: '업체정보 관리',
    value: path.EMPLOYER_BUSINESS,
    icon: 'Buildings24x24',
    items: [],
  },

  {
    label: '채용공고 · 지원자 관리',
    value: path.EMPLOYER_RECRUITMENT,
    icon: 'UserRounded24x24',
    items: [],
  },

  {
    label: '채용상품',
    value: '',
    icon: 'Shop24x24',
    items: [
      { label: '채용광고', value: path.EMPLOYER_PRODUCT_RECRUITMENT },
      // { label: '이력서 열람 서비스', value: path.EMPLOYER_PRODUCT_RESUME },
    ],
  },

  {
    label: '상품 · 결제관리',
    value: '',
    icon: 'Card24x24',
    items: [
      { label: '결제내역', value: path.EMPLOYER_PAYMENT },
      { label: '쿠폰', value: path.EMPLOYER_COUPON },
      // { label: '포인트', value: path.EMPLOYER_POINT },
    ],
  },

  // {
  //   label: '문의',
  //   value: '',
  //   icon: 'Question24x24',
  //   items: [],
  // },

  {
    label: '계정설정',
    value: '',
    icon: 'Settings24x24',
    items: [
      { label: '계정정보', value: path.EMPLOYER_ACCOUNT },
      { label: '비밀번호 변경', value: path.EMPLOYER_ACCOUNT_RESET },
      // { label: '알림설정', value: path.EMPLOYER_ACCOUNT_NOTIFICATION },
    ],
  },
];
