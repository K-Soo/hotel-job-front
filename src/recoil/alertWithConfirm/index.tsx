import { atom, selector } from 'recoil';

const TITLE_TEXT = {
  TITLE_1: '본인 인증으로 모든 서비스에 액세스하세요!',
  TITLE_2: '회사 정보가 성공적으로 등록되었습니다!',
  TITLE_3: '채용 공고가 성공적으로 등록되었습니다!',
  TITLE_4: '선택된 공고를 삭제하시겠습니까?',
  TITLE_5: '채용공고 수정완료!',
  TITLE_6: '이력서를 삭제하시겠습니까?',
} as const;

const DESCRIPTION_TEXT = {
  DESC_1: '지금 인증만 하면 첫 공고를 무료로 등록할 수 있는 특별 쿠폰을 드립니다. 빠르게 시작하세요!',
  DESC_2: '이제 채용 공고를 등록해 더 많은 인재를 만나보세요. 🎉',
  DESC_3: '채용 상품을 결제하고 공고를 게시하세요! 빠르게 최고의 인재를 만날 준비가 되셨나요? 🚀',
  DESC_4: '이 작업은 선택한 공고를 영구적으로 삭제합니다.',
  DESC_5: '채용 효과를 높이기 위한 상품을 만나보세요.',
  DESC_6: '지금 본인인증하시겠습니까?',
  DESC_7: '이력서를 삭제해도 기존 입사지원내역은 유지됩니다.',
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
