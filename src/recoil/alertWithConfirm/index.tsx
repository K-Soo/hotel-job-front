import { atom, selector } from 'recoil';

const TITLE_TEXT = {
  TITLE_1: '본인인증으로 모든 서비스에 액세스하세요!',
  TITLE_2: '회사 정보가 성공적으로 등록되었습니다!',
  TITLE_3: '채용 공고가 성공적으로 등록되었습니다!',
  TITLE_4: '선택된 공고를 삭제하시겠습니까?',
  TITLE_5: '채용공고 수정완료!',
  TITLE_6: '이력서를 삭제하시겠습니까?',
  TITLE_7: '정말 탈퇴하시겠습니까?',
  TITLE_8: '진행중인 공고입니다. 수정하시겠습니까?',
  TITLE_9: '공고등록이 완료되었습니다.  🎉',
  TITLE_10: '입력하신 내용으로 즉시 발표를 진행하시겠습니까?',
  TITLE_11: '진행중인 공고입니다. \n 정말 마감하시겠습니까?',
  TITLE_12: '지원을 취소하시겠습니까?',
  TITLE_13: '비밀번호 변경이 완료되었습니다.',
  TITLE_14: '수정하신 내용으로 저장하시겠습니까?',
  TITLE_15: '수정이 완료되었습니다.',
  TITLE_16: '최소한의 정보 입력으로 바로 시작!',
  TITLE_17: '본인인증 후 서비스 등록이 가능합니다.',
  TITLE_18: '해당 공고를 복사하시겠습니까?',
  TITLE_19: '회원 탈퇴를 위해 본인 인증이 필요합니다.',
} as const;

const DESCRIPTION_TEXT = {
  DESC_1: '첫 공고를 무료로 등록할 수 있는 \n 특별한 할인 쿠폰을 드립니다. 🎁',
  DESC_2: '이제 채용 공고를 등록해 더 많은 인재를 만나보세요. 🎉',
  DESC_3: '채용 상품을 결제하고 공고를 게시하세요!\n 빠르게 최고의 인재를 만날 준비가 되셨나요? 🚀',
  DESC_4: '이 작업은 선택한 공고를 영구적으로 삭제합니다.',
  DESC_5: '채용 효과를 높이기 위한 상품을 만나보세요.',
  DESC_6: '지금 본인인증하시겠습니까?',
  DESC_7: '이력서를 삭제해도 기존 입사지원내역은 유지됩니다.',
  DESC_8:
    '계정을 삭제하면 등록된 정보와 이력, 혜택이 30일 뒤 모두 삭제되며 복구가 불가능합니다.\n 또한, 동일 계정으로 다시 가입할 수 없습니다. 신중하게 결정해주세요.',
  DESC_9: '최대 10분 이내에 채용공고 페이지에 반영됩니다.',
  DESC_10: '공고 목록에서 상태를 확인하고 편집할 수 있습니다.',
  DESC_11: '"확인" 선택시 지원자에게 즉시 발송됩니다.',
  DESC_12: '마감 시 해당 공고는 다시 되돌릴 수 없습니다.',
  DESC_13: '정보 입력 후, 바로 채용 공고를 등록하고 \n 필요한 인재를 만나보세요! 😊',
  DESC_14: '가입 시 등록한 본인 인증 정보와 일치해야 합니다. \n 본인인증을 진행하시겠습니까?',
};

type TTextKeys = keyof typeof TITLE_TEXT;
type TDescKeys = keyof typeof DESCRIPTION_TEXT;

interface AlertWithConfirmAtom {
  type?: 'ALERT' | 'CONFIRM';
  title?: TTextKeys;
  subTitle?: TDescKeys;
  image: 'Document' | undefined;
  confirmLabel: string;
  cancelLabel: string;
  confirmVariant: 'primary100' | 'cancel' | 'delete';

  onClickConfirm: (...args: any) => void;
  onClickCancel: (...args: any) => void;
}

export const alertWithConfirmAtom = atom<AlertWithConfirmAtom>({
  key: 'alertWithConfirmAtom',
  default: {
    type: undefined,
    title: undefined,
    subTitle: undefined,
    image: undefined,
    confirmLabel: '',
    cancelLabel: '',
    confirmVariant: 'primary100',

    onClickConfirm: () => {},
    onClickCancel: () => {},
  },
});

export const alertWithConfirmSelector = selector({
  key: 'alertWithConfirmSelector',
  get: ({ get }) => {
    const getModalState = get(alertWithConfirmAtom);
    return {
      type: getModalState.type,

      title: getModalState.title && TITLE_TEXT[getModalState.title],
      subTitle: getModalState.subTitle && DESCRIPTION_TEXT[getModalState.subTitle],
      image: getModalState.image,
      confirmVariant: getModalState.confirmVariant,

      confirmLabel: getModalState.confirmLabel,
      cancelLabel: getModalState.cancelLabel,

      onClickConfirm: getModalState.onClickConfirm,
      onClickCancel: getModalState.onClickCancel,
    };
  },
});
