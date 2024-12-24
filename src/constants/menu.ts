import path from '@/constants/path';

export const GENERAL_ASIDE_MENU = [
  { label: 'MY홈', value: '/user', items: [] },
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

const PARTNER_ASIDE_MENU = [
  { label: 'MY홈', value: '', items: [] },

  {
    label: '회원정보',
    value: '',
    items: [
      { label: '회원정보 수정', value: '/partner/profile' },
      { label: '메일 수신 설정', value: '/partner/email' },
    ],
  },

  {
    label: '채용',
    value: '/resume',
    items: [
      { label: '채용 등록', value: '/partner/' },
      { label: '이력서 등록', value: '/partner/' },
    ],
  },

  { label: '결제내역', value: '', items: [] },
];
