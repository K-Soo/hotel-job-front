import { atom, selector } from 'recoil';

const TITLE_TEXT = {
  TITLE_1: '본인 인증으로 모든 서비스에 액세스하세요!',
  TITLE_2: '회사 정보가 성공적으로 등록되었습니다!',
} as const;

const DESCRIPTION_TEXT = {
  DESC_1: '지금 인증만 하면 첫 공고를 무료로 등록할 수 있는 특별 쿠폰을 드립니다. 빠르게 시작하세요!',
  DESC_2: '이제 채용 공고를 등록해 더 많은 인재를 만나보세요. 🎉',
};

type TTextKeys = keyof typeof TITLE_TEXT;
type TDescKeys = keyof typeof DESCRIPTION_TEXT;

interface AlertWithConfirmAtom {
  type?: 'ALERT' | 'CONFIRM';
  title?: TTextKeys;
  subTitle?: TDescKeys;
  image: string;
  confirmLabel: string;
  cancelLabel: string;

  onClickConfirm: (...args: any) => void;
  onClickCancel: (...args: any) => void;
}

export const alertWithConfirmAtom = atom<AlertWithConfirmAtom>({
  key: 'alertWithConfirmAtom',
  default: {
    type: undefined,
    title: undefined,
    subTitle: undefined,
    image: '',
    confirmLabel: '',
    cancelLabel: '',

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

      confirmLabel: getModalState.confirmLabel,
      cancelLabel: getModalState.cancelLabel,

      onClickConfirm: getModalState.onClickConfirm,
      onClickCancel: getModalState.onClickCancel,
    };
  },
});
